<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view>
			<view v-for="(info,index) of infoList" :key="info.id"
				@click="jump2Detail(info.id)"
				class="info">
				{{index + 1}}.{{ info.title }}
				<view class="pub-time">
					<text>发布时间：</text>
					<text>{{info.pubTime}}</text>
				</view>
			</view>
			<view 
				v-if="page < totalPage"
				@click="loadMore" class="no-data">点击加载更多</view>
		</view>
		<message-component v-if="showMessage" v-bind:showMessage.sync="showMessage" :code="statusCode"></message-component>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infoList: [],
				page: 1,
				size: 20,
				totalPage: 0,
				showMessage: false,
				statusCode: ""
			}
		},
		methods: {
			jump2Detail(id) {
				console.log("infoList >> jump2Detail id::: ", id)
				this.$Router.push({name: 'infoDetail', params: {infoId: id}})
			},
			queryInfoList(loadMore) {
				uni.request({
					url: this.apiHost + "/common/search//info/infoList",
					method: "GET",
					header: {
						Cookie: this.token
					},
					data: {
						page: this.page
					},
					success: res => {
						if (res.statusCode == 200) {
							if (loadMore) {
								this.infoList = this.infoList.concat(res.data.info)
							}else {
								this.infoList = res.data.info
							}
							this.totalPage = res.data.totalPage
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
					}
				})
			},
			loadMore() {
				this.page++
				this.queryInfoList(true)
			}
		},
		onLoad() {
			this.queryInfoList()
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
	.info {
		display: block;
		width: 100%;
		padding: 20rpx;
		color: $primaryColor;
		background-color: white;
		border: 1rpx solid $borderColor;
		box-shadow: 0 0 10rpx $borderColor;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		+ .info {
			margin-top: 15rpx;
		}
	}
	
	.pub-time {
		text-align: right;
		color: black;
		font-size: 28rpx;
		padding: 10rpx;
	}
</style>
