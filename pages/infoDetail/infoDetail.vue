<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view class="intro-wrapper">
			<view class="title">{{ title }}</view>
			<view 
				v-for="content of contentList"			
				class="mes">{{ content }}</view>
		</view>
		<message-component v-if="showMessage" v-bind:showMessage.sync="showMessage" :code="statusCode"></message-component>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				contentList: "",
				showMessage: false,
				statusCode: ""
			}
		},
		methods: {
			queryInfoDetail() {
				uni.request({
					url: this.apiHost + "/common/search/info/infoDetail",
					method: "GET",
					header: {
						Cookie: this.token
					},
					data: {
						id: this.infoId
					},
					success: res => {
						if (res.statusCode == 200) {
							this.title = res.data.title
							this.contentList = res.data.content.split('\\n')
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("infoDetail >> queryInfoDetail res::: ", res)
					}
				})
			}
		},
		onLoad() {
			this.infoId = this.$Route.query.infoId
			this.queryInfoDetail()
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
