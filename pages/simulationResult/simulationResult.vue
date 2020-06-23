<template>
	<view class="page">
		<quick-menus></quick-menus>
		<score-info></score-info>
		<view class="evaluate-wrapper">
			<view class="evaluate">
				<text class="title">风险等级：</text>
				<text class="content">{{ simulationResult.evaluateResult.riskLevel }}</text>
			</view>
			<view class="evaluate">
				<text class="title">录取率：</text>
				<text class="content">{{ simulationResult.evaluateResult.successRate }}</text>
			</view>
			
		</view>
		<school-table
			v-show="simulationResult.regularSchools.length > 0"
			title="本科"
			:showSchoolList="simulationResult.regularSchools"></school-table>
			
		<school-table
			v-show="simulationResult.juniorSchools.length > 0"
			title="专科"
			:showSchoolList="simulationResult.juniorSchools"></school-table>
			
		<view class="recommand">
			<text class="title">志愿评价：</text>
			<view
			 v-for="recommand in simulationResult.evaluateResult.recommend"
			 class="content">{{ recommand }}</view>
		</view>
		<message-component v-if="showMessage" v-bind:showMessage.sync="showMessage" :code="statusCode"></message-component>
			
	</view>
</template>
 
<script>
 import { mapState } from 'vuex'
export default {
  data () {
    return {
			simulationResult: {
				regularSchools: [],
				juniorSchools: [],
				evaluateResult: {
					recommend: []
				}
			},
			showMessage: false,
			statusCode: ""
    }
  },
	computed: {
		...mapState("auth", {
			token: state => state.token
		})
	},
	methods: {
		getSimulationResult(schoolList) {
			uni.request({
				url: this.apiHost + "/common/auth/vip/evaluateTable",
				method: "POST",
				header: {
					Cookie: this.token,
					"Content-Type": "application/x-www-form-urlencoded"
				},
				data: schoolList,
				success: res => {
					if(res.statusCode == 200) {
						console.log("simulationResult >> getSimulation res::: ", res.data)
						this.simulationResult.regularSchools = res.data.regularSchools
						this.simulationResult.juniorSchools = res.data.juniorSchools
						this.simulationResult.evaluateResult = res.data.evaluateResult
						let recommand = this.simulationResult.evaluateResult.recommend.split("\n")
						console.log(recommand)
						this.simulationResult.evaluateResult.recommend = recommand
						this.simulationResult.evaluateResult.successRate = Math.floor(this.simulationResult.evaluateResult.successRate * 100)  + "%"
						uni.setStorage({
							key: 'simulationResult',
							data: this.simulationResult
						})
					}else {
						this.showMessage = true
						this.statusCode = res.statusCode
					}
					console.log("simulationResult >> getSimulationResult res::: ", res)
				}
			})
		}
	},
	onLoad() {
		const schoolList = this.$Route.query.schoolList
		const history = this.$Route.query.history
		console.log("simulationResult onLoad >> schoolList::: ", schoolList)
		console.log("simulationResult onLoad >> history::: ", history)
		if (history) {
			uni.getStorage({
				key: 'simulationResult',
				success: res => {
					this.simulationResult = res.data
				},
				fail: res => {
					this.$Route.push({name: 'simulationPage'})
				}
			})
		}else {
			this.getSimulationResult(schoolList)			
		}
	}
}
</script>
 
<style lang="scss">
	@import "@/assets/scss/common.scss";
	$fontColor: #999999;
	
	$backgroundColor: #e7e7e7;
	$activeBackground: #d3d3d3;
	$borderColor: rgba(0,0,0,.1);
	
	$primaryColor: #007AFF;
	
	.recommand {
		margin: 30rpx;
		font-size: 30rpx;
		.title {
			font-weight: bold;
		}
		.content {
			line-height: 1.5;
			padding: 10rpx 0;
		}
	}
	
	.evaluate-wrapper {
		display: flex;
		margin: 30rpx;
		font-size: 40rpx;
		color: $fontColor;
		
		.evaluate {
			margin-right: 20rpx;
			.title {
				margin-right: 10rpx;
			}
			.content {
				color: black;
				font-weight: bold;
			}
		}
	}
</style>