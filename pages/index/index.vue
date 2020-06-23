<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view v-if="hasScoreInfo" @click="jump2Page('fillIn')">
			<score-info scoreActive="true"></score-info>
		</view>
		<view v-else @click="jump2Page('fillIn')" class="tips">			
			<text>请录入地区和成绩信息</text>
		</view>
		<view class="module-medium quick-wrapper">			
			<view @click="jump2Page('suggestBranch')">
				<view class="iconfont icon-jianyi" ></view>
				<text>报考建议</text>
			</view>
			<view @click="jump2Page('choicePool')">
				<view class="iconfont icon-zhiyuanchi"></view>
				<text>志愿池</text>
			</view>
			<view @click="jump2Page('simulationPage')">
				<view class="iconfont icon-tianbao"></view>
				<text>模拟填报</text>
			</view>
			
		</view>
		<view class="module">
			<view class="btn-menus-wrapper">
				<view @click="jump2Page('schoolList')" class="btn-menu">
					<view class="iconfont icon-xuexiao" ></view>
					<text>选学校</text>
				</view>
				<view @click="jump2Page('professionList')" class="btn-menu">
					<view class="iconfont icon-zhuanye" ></view>
					<text>选专业</text>					
				</view>
				<view @click="jump2Page('judgeList')" class="btn-menu">
					<view class="iconfont icon-pingce" ></view>
					评测
				</view>
				<view @click="jump2Page('batchLine')" class="btn-menu">
					<view class="iconfont icon-shengkongxian" ></view>
					省控线
				</view>
				<!-- <view class="btn-menu">
					<view class="iconfont icon-zhiyejieshao" ></view>
					职业介绍
					</view> -->
				<view @click="jump2Page('useIntroduce')" class="btn-menu">
					<view class="iconfont icon-shiyongshuoming" ></view>
					使用说明
				</view>
				<view @click="jump2Page('notice')" class="btn-menu">
					<view class="iconfont icon-gantanhao" ></view>
					提示
					</view>
				<view class="btn-menu"></view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasScoreInfo: false,
				userId: "1111",
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			jump2Page(page) {
				console.log(page)				
				this.$Router.push({name: page})
			},
			change(e) {
				console.log(e);
			}
		},
		onLoad() {
			const vm = this
			// uni.clearStorage()
			uni.getStorage({
				key: 'userInfo',
				success: res => {
					const userInfo = res.data
					vm.userId = userInfo.userId	
					if (userInfo.score) {
						vm.hasScoreInfo = true
					}
					let valuatingResultObj = JSON.parse(userInfo.valuatingResult)
					let coupleList = Object.entries(valuatingResultObj)
					coupleList.forEach(couple => {
							uni.setStorage({
								key: "valuateResult-" + couple[0],
								data: couple[1]
							})
							console.log("index page >> userInfo >> couple:: ", couple)
					})
					console.log("index page >> userInfo::: ",userInfo)
					console.log("index page >> valuatingResultList::: ", valuatingResultObj)
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
	
	
	
	.quick-wrapper {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		text-align: center;
		.iconfont {
			margin-bottom: 15rpx;
			color: #97CBFF;
			font-size: 80rpx;
		}
	}
	
	.btn-menus-wrapper {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		text-align: center;
		.iconfont {
			margin-bottom: 15rpx;
			color: #97CBFF;
			font-size: 50rpx;
		}
		
		.btn-menu {
			flex: 1 1 33%;
			padding: 15rpx 10rpx;
		}
	}
	



</style>
