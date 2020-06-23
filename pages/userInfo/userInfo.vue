<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view class="basic-info">
			<view class="user-id">{{ userInfo.userId }}</view>
			<view v-if="userInfo.vip == 1" class="vip-flag">VIP</view>			
		</view>
		<view v-if="userInfo.score"  @click="jump2Page('fillIn')">
			<score-info scoreActive="true"></score-info>
		</view>
		<view>			
			<view @click="chooseValuating" class="module">
				<view>评测</view>				
			</view>
			<view v-if="showList" class="module-sub-list">
				<view v-for="couple of valuateResultList"
					@click="jump2ValuateResult(couple)" style="padding: 10rpx 0;">{{ couple }}</view>
			</view>
			<view @click="jump2SimulationResult" class="module">
				模拟填报结果
			</view>
			
		</view>
		<button @click="clear" style="margin-top: 20rpx;" type="primary" class="confirm">清除缓存</button>
		
		<uni-popup ref="popup" type="top">
			<view class="tips-message">
				{{msg}}
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				valuateResultList: [],
				showList: false,
				msg: ""
			}
		},
		methods: {
			clear() {
				uni.removeStorage({
					key: "recommandObj"
				})
				uni.removeStorage({
					key: "choicePool"
				})
				// uni.clearStorage()
				
				this.$refs.popup.open()
				this.msg = "缓存清除成功"
				setTimeout(() => {
					this.$refs.popup.close();			
					// this.$Router.push({name: "login"})
				}, 1500)
				
			},
			jump2SimulationResult() {
				let simulationResult = {}
				uni.getStorage({
					key: 'simulationResult',
					success: res => {
						this.$Router.push({name: 'simulationResult', params: {
							schoolList: null,
							history: true
						}})
					},
					fail: res => {
						this.$refs.popup.open()
						this.msg = "目前还没有模拟填报结果"
						setTimeout(() => {
							this.$refs.popup.close();
						}, 1500)
					}
				})
				
			},
			jump2Page(page) {
				console.log(page)				
				this.$Router.push({name: page})
			},
			jump2ValuateResult(valuateName) {
				this.$Router.push({name: "valuateResult", params: { valuateName: valuateName }})
			},
			chooseValuating() {
				this.showList = !this.showList
			},
			getValuateResultList() {
				uni.getStorage({
					key: 'userInfo',
					success: res => {
						this.userInfo = res.data
						let valuatingResultObj = JSON.parse(this.userInfo.valuatingResult)
						this.valuateResultList = Object.keys(valuatingResultObj)
						console.log("userInfo page >> userInfo::: ",this.userInfo)
						console.log("userInfo page >> valuateResultList::: ",this.valuateResultList)
					}
				})
			}
		},
		onLoad() {
			this.getValuateResultList()
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
	
	.basic-info {
		padding: 30rpx;
		text-align: center;
	}
	.user-id {
		display: inline-block;
		font-size: 50rpx;
		
	}
	.vip-flag {
		display: inline-block;
		margin-left: 20rpx;
		padding: 15rpx;
		color: white;
		font-size: 15rpx;
		background: gold;		
		border-radius: 25rpx;
		vertical-align: middle;
	}
	.module-sub-list {
		font-size: 30rpx;
		padding: 10rpx 20rpx;
		background-color: #eee;
		
	}
</style>
