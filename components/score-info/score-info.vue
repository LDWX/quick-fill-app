<template>
	<view class="">
		<view 
			:class="[scoreActive ? 'score-active' : 'score-info']">
			<text class="score">分数:</text>
			<text class="flag">{{ userInfo.score || "-" }}</text>
			<text class="score">位次:</text>
			<text class="flag">{{ userInfo.rank || "-"}}</text>
			<text class="flag">{{ userInfo.subject == 0 ? "理科" : "文科" }}</text>
			<text class="flag">{{ userInfo.province || "-" }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			scoreActive: {
				default: false,				
			}
		},
		data() {
			return {
				userInfo: {}
			}
		},
		methods: {
			
		},
		created() {
			console.log("score-info loaded")
			const vm = this
			uni.getStorage({
				key: 'userInfo',
				success: res => {
					console.log("score-info >> onLoad >> getStorage >> userInfo::: ", res.data)
					vm.userInfo = res.data
				}
			})
		}
	}
</script>

<style lang="scss">
	$fontColor: #999999;
	
	$backgroundColor: #e7e7e7;
	$activeBackground: #d3d3d3;
	$borderColor: rgba(0,0,0,.1);
	
	$primaryColor: #007AFF;
	
	.score-info {
		margin: 20rpx 30rpx;
		font-size: 35rpx;
		color: $fontColor;
		
	}
	.score-active{
		text-align: center;
		color: $primaryColor;
		font-size: 40rpx;
		margin: 40rpx 0;
	}
	.flag {
		margin-right: 20rpx;
	}
</style>
