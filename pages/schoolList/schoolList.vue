<template>
	<view class="page">		
		<view class="uni-form-item uni-column" style="margin-bottom: 20rpx;">
			<input v-model="companyName" @confirm="quickSearch" class="uni-input quick-search" placeholder="按学校名称搜索" />
		</view>
		<view v-if="showList" @click="closeList" class="quick-mask">
			<view class="result-wrapper">
				<view 
					v-for="item of resultList"
					:key="item.cid"
					@click="chooseItem(item)"
					class="result">{{ item.name }}</view>				
			</view>
		</view>
		<single-search-component @search="searchData"></single-search-component>
		<quick-menus></quick-menus>
		
		<view class="card-wrapper">
			<view 	
				@click="chooseItem(school)"
				v-for="school of showSchoolList"
				:key="school.cid"
				class="module-medium school-card">
				<view class="main-info">
					<text class="school-name">{{ school.name }}</text>
					<view class="flag-group">
						<text class="flag">{{ school.runProperty }}</text>
						<text class="flag">{{ school.schoolType }}</text>
						<text class="flag">{{ school.level == 0 ? "本科" : "专科" }}</text>
						<text v-show="+school.is985" class="flag">985</text>
						<text v-show="+school.is211" class="flag">211</text>
						<text v-show="+school.is11" class="flag">双一流</text>
					</view>
				</view>
			</view>
			<view @click="searchMore" class="load-more">
				<text v-show="!isLoading && this.params.page < this.totalPage">点击加载更多</text>
				<text v-show="isLoading">loading...</text>
			</view>
			
		</view>
		<message-component v-if="showMessage" v-bind:showMessage.sync="showMessage" :code="statusCode"></message-component>
			
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	class Query {
		constructor() {
		  this.province = ""
		  this.school_type = ""
		  this.edu_level = ""
		  this.school_level = ""
		  this.page = 1 
		}
	}
	export default {
		data() {
			return {
				isLoading: false,
				totalPage: 0,
				showSchoolList: [],
				params: new Query(),
				showList: false,
				resultList: [],
				companyName: "",
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
			closeList() {
				this.showList = false
				this.resultList = []
				this.companyName = ""
			},
			quickSearch() {
				console.log("this is quick search")
				uni.request({
					url: this.apiHost + "/common/search/college/key",
					method: "GET",
					header: {
						Cookie: this.token
					},
					data: {
						key: this.companyName
					},
					success: res => {
						if (res.statusCode == 200) {
							this.resultList = res.data
							if (res.data.length && res.data.length > 0) {
								this.showList = true
							}
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("schoolList >> quickSearch res ::: ", this.resultList)
					}
				})
			},
			searchData(queryObj) {				
				console.log("schoolList >> searchData queryObj::: ", queryObj)
				this.params.province = queryObj.province
				this.params.school_type = queryObj.type
				this.params.edu_level = queryObj.degree
				this.params.school_level = queryObj.level
				this.params.page = 1
				this.doSearchData(this.params)
					.then(res => {
						this.totalPage = res.totalPage
						this.params.page = res.page
						this.showSchoolList = res.schools
					})
			},
			searchMore() {
				if (this.isLoading || this.params.page >= this.totalPage) {
					return
				}
				this.isLoading = true
				this.params.page++
				this.doSearchData(this.params)
					.then(res => {
						this.showSchoolList = [...this.showSchoolList, ...res.schools]
						console.log(this.showSchoolList.length)
					})
			},
			doSearchData(params) {
				return new Promise(resolve => {
					uni.request({
						url: this.apiHost + "/common/search/college/list",
						method: "GET",
						header: {
							Cookie: this.token
						},
						data: params,
						success: res => {
							console.log("schoolList >> doSearchData res::: ", res)
							if (res.statusCode == 200) {								
								resolve(res.data)
							}else {
								this.showMessage = true
								this.statusCode = res.statusCode
							}
						},
						complete: res => {
							this.isLoading = false
						}
					})
					
				})
			},
			chooseItem(school) {
				this.$Router.push({name: 'schoolDetail', params: {schoolId: school.cid}})
			},
			removeItem() {
			
			}
		},
		onLoad() {
			this.doSearchData()
				.then(res => {
					this.totalPage = res.totalPage
					this.page = res.page
					this.showSchoolList = res.schools
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
	
	.card-wrapper {
		position: fixed;
		top: 240rpx;
		bottom: 80rpx;
		left: 0;
		right: 0;
		overflow: auto;
	}
	.flag-group {
		margin-bottom: 20rpx;
		margin-top: 20rpx;
	}
	
	.load-more {
		color: #e3e3e3;
		text-align: center;
		padding: 10rpx 0 35rpx 0;
	}
	
	.quick-search {
		height: 100rpx;
		text-indent: 20rpx;
		background-color: white;
		border: 1rpx solid $borderColor;
	}
	
	.quick-mask {
		position: absolute;
		top: 100rpx;
		left: 0;
		right: 0;
		bottom: 0rpx;
		background: rgba(0,0,0, .06);
		z-index: 99;
		
		.result-wrapper {
			max-height: 80%;
			padding: 20rpx 0;
			background-color: white;
			border-bottom: 1rpx solid $borderColor;
			overflow: auto;
		}
		.result {
			padding: 10rpx 20rpx;
			color: $primaryColor;
			background: white;
			+ .result {
				border-top:1rpx solid $borderColor;
			}
		}
	}
	
	
</style>
