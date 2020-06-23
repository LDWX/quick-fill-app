<template>
	<view class="tab-group">
		<view @click="jump2page('index')" class="tab">首页</view>
		<view @click="jump2page('infoList')" class="tab">资讯</view>
		<!-- <view class="tab">广场</view> -->
		<view @click="jump2page('userInfo')" class="tab">我的</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			jump2page(page) {
				this.$Router.replaceAll({name: page})
			}
		}
	}
</script>

<style lang="scss">
	@import "@/assets/scss/common.scss";
</style>
