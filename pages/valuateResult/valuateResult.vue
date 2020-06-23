<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view class="chapter-title">
			{{ valuateName }}
		</view>
		<view class="intro-wrapper">
			<view class="title">{{ valuateResult.title }}</view>
			<view 
				v-for="intro of valuateResult.content"
				class="mes">{{ intro }}</view>
		</view>
		<button @click="jump2Page('index')" style="margin-top: 20rpx;" type="primary" class="confirm">返回首页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				valuateResult: {},
				valuateName: ""
			}
		},
		methods: {
			jump2Page(page){
				this.$Router.replaceAll({name: page})
			}
		},
		onLoad() {
			this.valuateName = this.$Route.query.valuateName
			console.log("valuateResult >>> valuateName::: ", this.valuateName)
			uni.getStorage({
				key: "valuateResult-" + this.valuateName,
				success: res => {
					this.valuateResult = res.data
					console.log("valuateResult >> onload >> valuateResult::: ", this.valuateResult)
				}
			})
		}
	}
</script>

<style lang="scss">
	.chapter-title {
		font-size: 40rpx;
		font-weight: bold;
		padding: 30rpx 0;
		text-align: center;
	}
	.intro-wrapper {
		.title {
			// margin-top: 40rpx;
			font-size: 40rpx;
			line-height: 2;
			text-align: center;
		}
		.mes {
			padding: 10rpx 20rpx;
			line-height: 1.4;
		}
		.mes:first-child {
			color: red;
		}
	}
</style>
