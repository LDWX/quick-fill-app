<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view class="card-wrapper">		
			<score-info></score-info>
			<view class="module-medium">
				<view 
					@click="jump2SuggestChoice(recommandObj['highRisk'], 'highRisk')"
					class="branch-card">
					<view class="arrow arrow-red">
						<text>冲</text>
					</view>
					<view class="main-info">
						<text class="title">可冲击的大学</text>
						<text class="title-sub">要多关注录取概率，建议选1~2所填报</text>
					</view>
					<view class="num-wrapper">
						<text class="num">{{ recommandObj["highRisk"].length  }}</text>
						所
						<view class="iconfont icon-jiantou" ></view>
					</view>
				</view>		
				
			</view>
			<view class="module-medium">
				<view 
					@click="jump2SuggestChoice(recommandObj['lowRisk'], 'lowRisk')"
					class="branch-card">
					<view class="arrow arrow-yellow">
						<text>稳</text>
					</view>
					<view class="main-info">
						<text class="title">较稳妥的大学</text>
						<text class="title-sub">要多关注填报建议，建议选3~4所填报</text>
					</view>
					<view class="num-wrapper">
						<text class="num">{{ recommandObj["lowRisk"].length  }}</text>
						所
						<view class="iconfont icon-jiantou" ></view>
					</view>
				</view>
			</view>
			<view class="module-medium">
				<view 
					@click="jump2SuggestChoice(recommandObj['safe'], 'safe')"
					class="branch-card">
					<view class="arrow arrow-green">
						<text>保</text>
					</view>
					<view class="main-info">
						<text class="title">可保底的大学</text>
						<text class="title-sub">可挑选热门的专业，建议选1~2所填报</text>
					</view>
					<view class="num-wrapper">
						<text class="num">{{ recommandObj["safe"].length  }}</text>
						所
						<view class="iconfont icon-jiantou" ></view>
					</view>
				</view>
			</view>
			<view class="module-medium">
				<view 
					@click="jump2SuggestChoice(recommandObj['steady'], 'steady')"
					class="branch-card">
					<view class="arrow arrow-grey">
						<text>垫</text>
					</view>
					<view class="main-info">
						<text class="title">可垫底的大学</text>
						<text class="title-sub">建议选本省份的学校，建议选1~2所填报</text>
					</view>
					<view class="num-wrapper">
						<text class="num">{{ recommandObj["steady"].length  }}</text>
						所
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
	// import Router from "@/router";
	export default {
		data() {
			return {
				recommandObj: {
					highRisk: [],
					lowRisk: [],
					safe: [],
					steady: []
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
			jump2SuggestChoice(schoolList, branchType) {
				this.$Router.push({ name: "suggestChoice", params: {schoolList: schoolList, branchType: branchType}})
			},
			getRecommendSchoolList() {
				const vm = this
				console.log(vm.token)
				uni.request({
					url: vm.apiHost + "/common/auth/vip/recommend",
					method: "GET",
					header: {
						Cookie: vm.token
					},
					success: res => {
						if (res.statusCode == 200) {
							uni.setStorage({
								key: "recommandObj",
								data: res.data
							})
							vm.recommandObj = res.data;
							
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("token::: ", this.token)
						console.log("suggestBranch >> RecommendSchoolList::: ", res.data)
					}
				})
			}
		},
		onLoad() {
			const vm = this
			uni.getStorage({
				key: "recommandObj",
				success: res => {
					console.log("suggestBranch >> OnLoad >> getStorage >> recommandObj ::: ", res.data)
					if (res.data) {
						vm.recommandObj = res.data
					}
				},
				fail: res => {
					this.getRecommendSchoolList()
					console.log("suggestBranch >> Onload getStrage fail >> getRecommendSchoolList")
				}
			})
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
	
	.score-info {
		margin: 20rpx 30rpx;
		font-size: 35rpx;
		color: $fontColor;
		.flag {
			padding: 0 15rpx;
		}
	}
	
	@mixin arrow-icon($color) {
		content: "";
		position: absolute;
		right: -28rpx;
		height: 0;
		border-left: 15rpx solid $color;
		border-right: 15rpx solid transparent;
		border-top: 30rpx solid transparent;
		border-bottom: 30rpx solid transparent;			
	}
	
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
		
		.arrow {
			position: relative;
			width: 80rpx;
			height: 60rpx;
			line-height: 60rpx;
			color: white;
			text-align: center;
			font-size: 30rpx;
			
			
		}
		.arrow-red {
			background-color: red;
			&::after {
				@include arrow-icon(red);
			}
		}
		.arrow-yellow {
			background-color: orange;
			&::after {
				@include arrow-icon(orange);
			}
		}
		.arrow-green {
			background-color: green;
			&::after {
				@include arrow-icon(green);
			}
		}
		.arrow-grey {
			background-color: grey;
			&::after {
				@include arrow-icon(grey);
			}
		}
		
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
