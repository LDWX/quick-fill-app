<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view class="intro-wrapper">
			<view class="title">提示：</view>
			<view class="mes">1、软件数据均来源于各院校官网或者高考信息网公布数据，如遇到数据不能完全匹配问题，请以学校官网数据为准;</view>
			<view class="mes">2、由于各省市加分政策，院校官网对征集志愿数据的显示等原因，会与院校官网存在不一致情况，建议以各省考试院发布的数据为准。</view>
		</view>
		<button @click="jump2Page('index')" type="primary" style="margin-top: 20rpx">返回首页</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			jump2Page(page) {
				this.$Router.push({name: page})
			}
		}
	}
</script>

<style lang="scss">
	.intro-wrapper {
		.title {
			margin-top: 40rpx;
			font-size: 50rpx;
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
