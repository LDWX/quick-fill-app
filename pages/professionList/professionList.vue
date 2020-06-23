<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view @click="chooseItem($event)" class="tab-group">
			<text data-id="0" 
				:class="[level == '0' ? 'active' : '']"
				class="tab">本科专业</text>
			<text data-id="1" 
				:class="[level == '1' ? 'active' : '']"
				class="tab">专科专业</text>
		</view>
		<view>
			<view class="nav-list">
				<view 
					v-for="pro of showSchoolList"
					:key="pro.sub"
					@click="chooseNav(pro.sub, pro.majorTypeList)"
					class="nav-item"
					:class="[activeNav == pro.sub ? 'active' : '']">
					{{pro.sub}}
				</view>
			</view>
			<view class="content-list">
				<view v-for="majorType of activeMajorTypeList">
					<view class="title">{{ majorType.majorType}}</view>
					<view class="major-list">
						<view v-for="major of majorType.majorList"
							@click="jump2MajorDetail(major.majorCode)"
							class="major">
							{{ major.major }}
						</view>
					</view>					
				</view>
			</view>
		</view>
		<message-component v-if="showMessage" v-bind:showMessage.sync="showMessage" :code="statusCode"></message-component>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeNav: "",
				activeMajorTypeList: {},
				showProfessionList: [],
				regularProfessionList: [],
				juniorProfessionList: [],
				level: "0",  // 0: 本科  1: 专科   默认0
				professionTree: [],
				showSchoolList: [],
				showMessage: false,
				statusCode: ""
			}
		},
		methods: {
			jump2MajorDetail(majorCode) {
				console.log(majorCode)
				this.$Router.push({name: "professionDetail", params: {major_code: majorCode}})
			},
			chooseNav(nav, profession) {
				this.activeNav = nav
				this.activeMajorTypeList = profession
				console.log(this.activeMajorTypeList)
			},
			chooseItem(event) {
				this.level = event.target.dataset.id
				this.queryProfessionList()
			},
			queryProfessionList() {
				uni.request({
					url: this.apiHost + "/common/search/major/searchTree?level=" + this.level,
					method: "GET",
					header: {
						Cookie: this.token
					},
					success: res => {
						if (res.statusCode == 200) {
							uni.setStorage({
								key: "professionTree",
								value: res.data
							})
							this.professionTree[this.level] = res.data
							this.showSchoolList = res.data
							this.chooseNav(this.showSchoolList[0].sub, this.showSchoolList[0].majorTypeList)
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("professionList >> queryProfessionList res:: ", res)
					}
				})
			}
		},
		onLoad() {
			const vm = this
			uni.getStorage({
				key: 'professionTree',
				success: res => {
					vm.professionTree = res.data
				},
				fail: res => {
					vm.queryProfessionList()					
				}
			})
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
	
	.tab-group {
		position: relative;
		top: auto;
		bottom: auto;		
		.tab {
			&.active {
				background: #4b90ff;
				color: white;
			}			
		}
		
	}
	
	.nav-list {
		position: absolute;
		top: 80.5rpx;
		left: 0;
		bottom: 0;
		overflow: auto;
		display: inline-block;
		width: 220rpx;
		font-size: 35rpx;		
		.nav-item {
			padding: 30rpx 20rpx;
			background: $backgroundColor;
			+ .nav-item {
				border-top: 1rpx solid $borderColor;
			}
		}
		.active {
			background: white;
		}
	}
	.content-list {
		position: absolute;
		top: 81rpx;
		left: 220rpx;
		right: 0;
		bottom: 0;
		overflow: auto;
		font-size: 25rpx;	
		color: #333;
		vertical-align: top;
		.title {
			padding: 33rpx 20rpx;
			font-size: 30rpx;
			font-weight: bold;			
		}
		.major-list {
			display: flex;
			flex-flow: row wrap;
			justify-content: flex-start;
			border-right: 1rpx solid $borderColor;
			border-bottom: 1rpx solid $borderColor;
			.major {
				flex: 1 1 50%;
				padding: 20rpx 20rpx;
				color: $primaryColor;
				border-top: 1rpx solid $borderColor;
				&:nth-child(even) {
					border-left: 1rpx solid $borderColor;					
				}
			}
		}
	}
</style>
