<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view class="intro-wrapper">
			<view class="title">使用说明：</view>
			<view class="mes">本软件包含 智能报考(学校推荐、志愿池、指标表) 和 查询功能(选大学、选专业、测评、批次线)</view>
			
			<view class="title" style="margin-top: 20rpx;">智能报考功能使用方法：</view>
			<view class="mes">1. 用户登录状态下, 并完善省份成绩和分数(排名)等信息, 点击首页学校推荐，可以获取推荐学校列表</view>
			<view class="mes">2. 用户可以在推荐列表中勾选学校并点击加入到志愿池, 在志愿池中可以勾选多个学校进行横向对比</view>
			<view class="mes">3. 在首页进入志愿表功能, 可以选择在志愿池中学校, 并生成志愿的成功概率和评价以及完整的志愿表。</view>
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
