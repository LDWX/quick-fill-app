<template>
	<view class="page">
		<quick-menus></quick-menus>
		
		<view class="school-info">
			<view class="title">{{schoolInfo.name}}</view>
			<view class="subtitle">
				<text>所属：</text>
				<text>{{schoolInfo.belong}}</text>
			</view>
			<view class="flag-group">
				<text class="flag">{{ schoolInfo.runProperty }}</text>
				<text class="flag">{{ schoolInfo.schoolType }}</text>
				<text class="flag">{{ schoolInfo.level == 0 ? "本科" : "专科" }}</text>
				<text v-show="+schoolInfo.is985" class="flag">985</text>
				<text v-show="+schoolInfo.is211" class="flag">211</text>
				<text v-show="+schoolInfo.is11" class="flag">双一流</text>
			</view>
		</view>
		
		<view @click="chooseItem($event)" class="tab-group">
			<text data-id="basic" 
				:class="[activeItem == 'basic' ? 'active' : '']"
				class="tab">学校概况</text>
			<text data-id="plan" 
				:class="[activeItem == 'plan' ? 'active' : '']"
				class="tab">招生计划</text>
			<text data-id="info"
				:class="[activeItem == 'info' ? 'active' : '']"
				class="tab">招录信息</text>
		</view>
		
		<view v-if="activeItem == 'basic'">			
			<view class="module-wrapper">
				<view 
					:class="[expandInfoModal ? 'introduce-active' : 'introduce']">
					<text class="title">学校介绍</text>
					<text 
						v-for="content in introductionList"
						class="chapter">{{ content }}</text>			
				</view>
				<view class="button-group">
					<text v-show="!expandInfoModal" @click="expandInfo" class="button">展开全部</text>
					<text v-show="expandInfoModal" @click="expandInfo" class="button">收起信息</text>
				</view>			
			</view>
			
			<view class="module-wrapper">
				<view>
					<text class="title">联系方式</text>
				</view>
				<view class="module-content">
					<view>
						<text>电话：</text>
						<text>{{schoolInfo.tel}}</text>
					</view>
					<view>
						<text>地址：</text>
						<text>{{schoolInfo.address}}</text>
					</view>
					<view>
						<text>官方网站：</text>
						<text @click="jump2Link(schoolInfo.site)" class="link">{{schoolInfo.site}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="activeItem == 'info'">
			<view class="info-title">学校历年招生信息</view>
			<view @click="chooseSubject($event)" class="tab-group">
				<text data-id="0" 
					:class="[activeSubject == '0' ? 'active' : '']"
					class="tab">理科</text>
				<text data-id="1" 
					:class="[activeSubject == '1' ? 'active' : '']"
					class="tab">文科</text>
			</view>
			<view class="container">				
				<table class="table-wrapper">
					<thead>
						<tr>
							<th>年份</th>
							<th>招生方向</th>
							<th>批次</th>
							<th>批次线</th>
							<th>最高分</th>
							<th>最低分</th>
							<th>平均分</th>
							<th>最低位次</th>						
							<th>录取人数</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item of enrollList">
							<td>{{item.year}}</td>
							<td>{{item.tag}}</td>
							<td>{{item.batch}}</td>
							<td>{{item.lineScore}}</td>
							<td>{{item.highestScore}}</td>
							<td>{{item.lowestScore}}</td>
							<td>{{item.avgScore}}</td>
							<td>{{item.lowestRank}}</td>
							<td>{{item.enrollNumber}}</td>
						</tr>
					</tbody>
				</table>
			</view>
			<view class="info-title">专业历年招生信息</view>
			<view class="search-wrapper">
				<view @click="choosePro($event)" class="search-group">
					<text data-id="subject" :class="[activePro=='subject' ? 'active' : 'drop-list']" class="search-item">学科</text>
					<text data-id="year" :class="[activePro=='year' ? 'active' : 'drop-list']" class="search-item">年份</text>
					<!-- <text @click="searchProList" data-id="search" class="search-item btn">搜索</text> -->
				</view>
				<view class="select-list-wrapper">
					<single-select-list
						v-show="showModal['subject']"
						:checkBoxList="subjectList"
						@getCheckedList="getSubject"></single-select-list>
					<single-select-list
						v-show="showModal['year']"
						:checkBoxList="yearList"
						@getCheckedList="getYear"></single-select-list>						
				</view>
			</view>
			<view class="container">
				<table class="table-wrapper">
					<thead>
						<tr>
							<th style="min-width: 400rpx;">专业名称</th>
							<th>招生方向</th>
							<th>学科</th>
							<th>招生年份</th>						
							<th>最高分</th>
							<th>最低分</th>
							<th>平均分</th>
							<th>最低位次</th>						
							<th>录取人数</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item of proList">
							<td>{{item.majorName}}</td>
							<td>{{item.tag}}</td>
							<td>{{item.subject == "0" ? "理科" : "文科"}}</td>
							<td>{{item.year}}</td>
							<td>{{item.highestScore}}</td>
							<td>{{item.lowestScore}}</td>
							<td>{{item.avgScore}}</td>
							<td>{{item.lowestRank}}</td>
							<td>{{item.enrollNumber}}</td>
						</tr>
					</tbody>
				</table>
			</view>
		</view>
		<view v-if="activeItem == 'plan'">
			<view class="search-wrapper">
				<view @click="choosePlanPro($event)" class="search-group">
					<text data-id="subject" :class="[activePlanPro=='subject' ? 'active' : 'drop-list']" class="search-item">学科</text>
					<text data-id="year" :class="[activePlanPro=='year' ? 'active' : 'drop-list']" class="search-item">年份</text>
					<!-- <text @click="getPlanInfo" data-id="search" class="search-item btn">搜索</text> -->
				</view>
				<view class="select-list-wrapper">
					<single-select-list
						v-show="showPlanModal['subject']"
						:checkBoxList="subjectList"
						@getCheckedList="getPlanSubject"></single-select-list>
					<single-select-list
						v-show="showPlanModal['year']"
						:checkBoxList="yearPlanList"
						@getCheckedList="getPlanYear"></single-select-list>						
				</view>
			</view>
			<view class="container">
				<table class="table-wrapper">
					<thead>
						<tr>
							<th style="min-width: 400rpx;">专业名称</th>
							<th>招生方向</th>
							<th>学科</th>
							<th>招生年份</th>						
							<th>批次</th>
							<th>录取人数</th>
							<th>学费</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item of planList">
							<td>{{item.majorName}}</td>
							<td>{{item.tag}}</td>
							<td>{{item.subject == "0" ? "理科" : "文科"}}</td>
							<td>{{item.year}}</td>
							<td>{{ item.batch }}</td>
							<td>{{item.enrollNumber}}</td>
							<td>{{item.fee}}</td>
						</tr>
					</tbody>
				</table>
			</view>
		</view>
		<message-component v-if="showMessage" v-bind:showMessage.sync="showMessage" :code="statusCode"></message-component>
			
	</view>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				activeItem: "basic",
				expandInfoModal: false,
				activeSubject: "0",
				schoolId: "",
				schoolInfo: {},
				introductionList: [],
				enrollList: [], 		// 历年招生信息
				// 专业报考信息相关
				showModal: {
					subject: false,
					year: false
				},
				activePro: "",
				majorEnrollQuery: {
					subject: "",
					year: "",
					cid: ""
				},
				subjectList: [
					{
						key: "0",
						value: "理科"
					},
					{
						key: "1",
						value: "文科"
					}
				],
				yearList: [
					
				],
				proList: [],
				// 招生计划相关
				activePlanPro: "",
				showPlanModal: {
					subject: false,
					year: false
				},
				majorPlanEnrollQuery: {
					subject: "",
					year: "",
					cid: ""
				},
				yearPlanList: [
					
				],
				planList: [],
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
			choosePlanPro(event) {
				const target = event.target;
				const item = target.dataset.id;
				if (item && item != "search") {
					if (this.activePlanPro == item) {	// 点击已经选中的tab，则将下拉框收起
						this.showPlanModal[item] = false
						this.activePlanPro = ""
					}else {
						for (let key in this.showPlanModal) {
							this.showPlanModal[key] = false
						}
						this.activePlanPro = item
						this.showPlanModal[item] = true
					}
				}else {
					for (let key in this.showPlanModal) {
						this.showPlanModal[key] = false
					}
					this.activePlanPro = ""
				}		
			},
			getPlanSubject(data) {
				this.majorPlanEnrollQuery.subject = data
				this.getPlanInfo()
			},
			getPlanYear(data) {
				this.majorPlanEnrollQuery.year = data
				this.getPlanInfo()
			},		
			
			chooseItem(event) {	// 选择模块
				this.activeItem = event.target.dataset.id
				switch(this.activeItem) {
					case "basic":
						this.getSchoolInfo()
						break;
					case "plan":
						this.getPlanInfo()
						break;
					case "info":
						this.getEnrollInfo()
						this.searchProList()
							break;
					
				}
			},
			chooseSubject(event) {	// 选择文理科
				this.activeSubject = event.target.dataset.id
				this.getEnrollInfo()
			},
			choosePro(event) {	// 专业报考筛选条件
				const target = event.target;
				const item = target.dataset.id;
				if (item && item != "search") {
					if (this.activePro == item) {	// 点击已经选中的tab，则将下拉框收起
						this.showModal[item] = false
						this.activePro = ""
					}else {
						for (let key in this.showModal) {
							this.showModal[key] = false
						}
						this.activePro = item
						this.showModal[item] = true
					}
				}else {
					for (let key in this.showModal) {
						this.showModal[key] = false
					}
					this.activePro = ""
				}
			},
			searchProList() {
				this.majorEnrollQuery.cid = this.schoolId
				console.log("schoolDetail >> searchProList params::: ", this.majorEnrollQuery)
				uni.request({
					url: this.apiHost + "/common/search/college/majorEnrollScore",
					method: "GET",
					header: {
						Cookie: this.token
					},
					data: this.majorEnrollQuery,
					success: res => {
						if (res.statusCode == 200) {
							this.yearList = res.data.yearRange.map(item => {
								return {
									key: item,
									value: item
								}
							})
							console.log("yearList::: ", this.yearList)
							this.proList = res.data.dataList
						} else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("schoolDetail >> searchProList res::: ", res)
					}
				})
			},
			getSubject(data) {
				this.majorEnrollQuery.subject = data
				this.searchProList()
			},
			getYear(data) {
				this.majorEnrollQuery.year = data
				this.searchProList()
			},
			expandInfo() {
				this.expandInfoModal = !this.expandInfoModal
			},			
			getEnrollInfo() {
				uni.request({
					url: this.apiHost + "/common/search/college/enrollScore",
					method: "GET",
					header: {
						Cookie: this.token
					},
					data: {
						subject: this.activeSubject,
						cid: this.schoolInfo.cid
					},
					success: res => {
						if (res.statusCode == 200)  {
							this.enrollList = res.data
							
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("schoolDetail >> getEnrollInfo res::: ", res)
					}
				})
			},
			getPlanInfo() {
				this.majorPlanEnrollQuery.cid = this.schoolId
				uni.request({
					url: this.apiHost + "/common/search/college/enrollSchedule",
					method: "GET",
					header: {
						Cookie: this.token
					},
					data: this.majorPlanEnrollQuery,
					success: res => {
						if (res.statusCode == 200) {
							this.yearPlanList = res.data.yearRange.map(item => {
								return {
									key: item,
									value: item
								}
							})
							this.planList = res.data.dataList
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("schoolDetail >> getPlanInfo res::: ", res)
					}
				})
			},
			getSchoolInfo() {
				uni.request({
					url: this.apiHost + "/common/search/college/info",
					method: "GET",
					header: {
						Cookie: this.token
					},
					data: {
						cid: this.schoolId
					},
					success: res => {
						if (res.statusCode == 200) {
							uni.setStorage({
								key: this.schoolId + "-info",
								data: res.data
							})
							this.schoolInfo = res.data
							this.introductionList = this.schoolInfo.introduction.split("\n")
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("schoolDetail >> getSchoolInfo res::: ", res)
					}
				})
			},
			jump2Link(site) {
				plus.runtime.openURL(site);
			}
		},
		onLoad() {
			this.schoolId = this.$Route.query.schoolId
			this.getSchoolInfo()
			
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
	
	.school-info {
		padding: 30rpx 20rpx;
		.title {
			text-align: center;
			font-size: 50rpx;
			font-weight: bold;
			color: $primaryColor;
		}
		.subtitle {
			font-size: 40rpx;
			color: #666;
			margin: 20rpx 0
		}
		
		.flag-group {
			margin: 20rpx 0;
		}
	}
	
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
	
	
	.module-wrapper {
		display: inline-block;
		// margin: 20rpx 0;
		width: calc(100%);
		background-color: white;
		border-radius: 4rpx;
		box-shadow: 0 0 10rpx $borderColor;
		+ .module-wrapper {
			margin-top: 20rpx;
		}
		.title {
			display: block;
			font-size: 40rpx;
			line-height: 45rpx;
			
			vertical-align: bottom;
			font-weight: bold;
			padding: 20rpx 0;
			border-bottom: 1rpx solid $borderColor;
			&::before {
				content: "";
				display: inline-block;
				position: relative;
				top: 7rpx;
				margin-right: 20rpx;
				width: 8rpx;
				height: 45rpx;
				background-color: $primaryColor;
			}
		}
	}
	
	.introduce {
		height: 300rpx;
		overflow: hidden;
	}
	.introduce-active {
		height: auto;
		overflow: auto;
	}
	.chapter {
		display: block;
		padding: 10rpx;
		text-indent: 5rpx;
		font-size: 30rpx;
		line-height: 1.4;		
	}
	
	.button-group {
		text-align: center;
		color: $primaryColor;
		margin-top: 20rpx;
		padding: 20rpx 0 30rpx 0;
		border-top: 1rpx solid $borderColor;
		
		.button {
			font-size: 30rpx;
			vertical-align: middle;
			
			&:active {
				color: lighten($primaryColor, 10);
			}
		}
	}
	.module-content {
		padding: 10rpx;
		font-size: 30rpx;
		line-height: 1.5;
		
		.link {
			color: $primaryColor;
		}
	}
	
	.info-title {
		font-size: 50rpx;
		text-align: center;
		line-height: 3;
	}
	
	.container {
		width: 100%;
		overflow: auto;
		margin-bottom: 20rpx;
	}
	.table-wrapper {
		position: relative;
		width: auto;
		text-align: center;
		color: $fontColor;
		border-collapse: collapse;
		
		th,
		td {
			padding: 15rpx 25rpx;
			border: 1rpx solid $borderColor;
		}
		
		th {
			min-width: 190rpx;
			color: black;
			font-size: 35rpx;
			font-weight: bold;
			background: $backgroundColor;
			
			&:nth-child(2) {
				min-width: 300rpx;
			}
		}
		
		td {
			font-size: 30rpx;
		}	
	
	}
	
	.search-wrapper {
		position: relative;
	}
	
	.select-list-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.search-group {
		display: flex;
		align-items: center;
		border-top: 1rpx solid $borderColor;
		.search-item {
			flex: 2 2 60rpx;
			text-align: center;
			padding: 10rpx 5rpx;
			&:first-child {
				flex: 1 1 35rpx;
			}
		
		}		
		.btn {
			flex: 0 0 100rpx;
			color: white;
			background: #007AFF;
			border-radius: 4rpx;
			
			&:active {
				background: #0772ff;
			}
		}
		.active {
			color: $primaryColor;
			&::after {
				content: "";
				position: relative;
				top: 5rpx;
				left: 5rpx;
				display: inline-block;				
				border-bottom: 8rpx solid transparent;
				border-top: 8rpx solid $primaryColor;
				border-left: 8rpx solid transparent;
				border-right: 8rpx solid transparent;
			}
		}
		.drop-list {
			&::after {
				content: "";
				position: relative;
				top: -5rpx;
				left: 5rpx;
				display: inline-block;
				
				border-bottom: 8rpx solid $fontColor;
				border-top: 8rpx solid transparent;
				border-left: 8rpx solid transparent;
				border-right: 8rpx solid transparent;
			}
		}
	}
</style>
