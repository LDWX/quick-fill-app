<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view class="card-wrapper">
			<view 
				v-for="card of valuatingList"
				class="module-medium">
				<view 		
					@click="chooseJudge(card.no, card.title)"
					class="branch-card">					
					<view class="main-info">
						<text class="title">{{ card.title }}</text>
					</view>
					<view class="num-wrapper">
						<view class="iconfont icon-jiantou" ></view>
					</view>					
				</view>		
				
			</view>
		</view>
		<message-component v-if="showMessage" v-bind:showMessage.sync="showMessage" :code="statusCode"></message-component>
			
	</view>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	export default {
		data() {
			return {
				valuatingList: [],
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
			chooseJudge(valuatingId, valuateName) {
				console.log("judgeList >> chooseJudge >> valuatingId, valuateName", valuatingId, valuateName)
				this.$Router.push({name: 'judgeIntroduce', params: {
						valuating_id: valuatingId,
						valuateName: valuateName
					},
				})
			},
			getValuatingList() {
				uni.request({
					url: this.apiHost + "/common/auth/vip/valuating/list",
					method: "GET",
					header: {
						Cookie: this.token
					},
				  success: res => {
						if (res.statusCode == 200) {
							this.valuatingList = res.data							
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("judgeList >> getValuatingList res::: ", res)
				  }
				})
			}
		},
		onLoad() {
			this.getValuatingList()
		}
	}
</script>

<style lang="scss">
	@import "@/assets/scss/common.scss";
	@import "@/assets/lib/iconfont/iconfont.css";
	$fontColor: #999999;
	
	$backgroundColor: #e7e7e7;
	$activeBackground: #d3d3d3;
	$borderColor: rgba(0,0,0,.1);
	
	$primaryColor: #007AFF;
	.card-wrapper {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		transform: translateY(-50%);
	}

	.module-medium {
		margin-top: 50rpx;
		margin-bottom: 50rpx;
		padding: 50rpx 20rpx 50rpx 0;
		box-shadow: 0 0rpx 10rpx $borderColor;
	}
	.branch-card {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
		.main-info {
			display: inline-block;
			margin-left: 30rpx;
			.title {
				display: block;
				font-size: 50rpx;
				font-weight: bold;
			}
			.title-sub {
				display: block;
				font-size: 24rpx;
				color: $fontColor;
				margin-top: 15rpx;
			}
			
		}
		.num-wrapper {
			display: inline-block;
			margin-left: auto;
			color: $fontColor;
			font-size: 24rpx;
			.num {
				display: inline-block;
				font-size: 40rpx;
				color: black;
				font-weight: bold;
				padding: 0 10rpx;
			}
			.iconfont {
				display: inline-block;
				margin-left: 20rpx;
				font-size: 30rpx;
				color: $fontColor;
			}
			
		}
	}
</style>
