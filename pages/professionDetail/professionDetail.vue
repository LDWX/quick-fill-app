<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view class="school-info">
			<view class="title">{{ majorInfo.name }}</view>
		</view>		
		<view @click="chooseItem($event)" class="tab-group">
			<text data-id="basic" 
				:class="[activeItem == 'basic' ? 'active' : '']"
				class="tab">专业介绍</text>
			<text data-id="info" 
				:class="[activeItem == 'info' ? 'active' : '']"
				class="tab">职业信息</text>
			<text data-id="college"
				:class="[activeItem == 'college' ? 'active' : '']"
				class="tab">对应大学</text>
		</view>
		<view v-if="activeItem == 'basic'">
			<view v-if="majorInfo.description" class="module-wrapper">
				<view>
					<text class="title">专业描述</text>
					<text	class="chapter">{{ majorInfo.description }}</text>			
				</view>
			</view>			
			<view v-if="majorInfo.majorObjective" class="module-wrapper">
				<view>
					<text class="title">培养目标</text>
					<text	class="chapter">{{ majorInfo.majorObjective }}</text>	
				</view>
			</view>
			<view v-if="majorInfo.majorRequirement" class="module-wrapper">
				<view>
					<text class="title">专业需求</text>
					<text	class="chapter">{{ majorInfo.majorRequirement }}</text>	
				</view>
			</view>
			<view v-if="majorInfo.majorSubjectRequirement" class="module-wrapper">
				<view>
					<text class="title">专业要求</text>
					<text	class="chapter">{{ majorInfo.majorSubjectRequirement }}</text>	
				</view>
			</view>
			<view v-if="loreAbility.length && loreAbility.length > 0" class="module-wrapper">
				<view>
					<text class="title">知识能力</text>
					<text	
						v-for="ability of loreAbility"
						class="chapter">{{ ability }}</text>	
				</view>
			</view>
			<view v-if="majorInfo.progressionsTitle" class="module-wrapper">
				<view>
					<text class="title">职称</text>
					<text	class="chapter">{{ majorInfo.progressionsTitle }}</text>	
				</view>
			</view>
			<view v-if="majorInfo.course" class="module-wrapper">
				<view>
					<text class="title">主修课程</text>
					<text	class="chapter">{{ majorInfo.course }}</text>	
				</view>
			</view>
			<view v-if="majorInfo.career" class="module-wrapper">
				<view>
					<text class="title">对口职业</text>
					<text	class="chapter">{{ majorInfo.career }}</text>	
				</view>
			</view>
			<view class="module-wrapper">
				<view>
					<text class="title">其他</text>
				</view>
				<view class="module-content">
					<view>
						<text>专业代码：</text>
						<text>{{majorInfo.majorCode}}</text>
					</view>
					<view>
						<text>学历：</text>
						<text>{{majorInfo.level == 0 ? "本科" : "专科"}}</text>
					</view>
					<view>
						<text>学位：</text>
						<text>{{majorInfo.degree}}</text>
					</view>
					<view>
						<text>年限：</text>
						<text>{{majorInfo.los}}</text>
					</view>
					<view>
						<text>男女比例：</text>
						<text>{{majorInfo.sexRatio}}</text>
					</view>
					<view>
						<text>考研比例：</text>
						<text>{{majorInfo.subjectRatio}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="activeItem == 'info'">
			<view class="module-wrapper">
				<view>
					<text class="title">职业分布</text>
					<view class="module-content" style="padding: 0;">
						<view v-for="career of majorCareer.careerDistribution"
							class="career-dist">
							<view>
								<text>职业类型：</text>
								<text>{{ career.name }}</text>								
							</view>
							<view>
								<text>具体职位：</text>
								<text>{{ career.expands }}</text>								
							</view>
							<view>
								<text>占比：</text>
								<text>{{ ( (career.value / totalCareerD)*100 ).toFixed(2) }}%</text>								
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="module-wrapper">
				<view>
					<text class="title">行业分布</text>
					<view class="module-content" style="padding: 0;">
						<view v-for="industr of majorCareer.industrialDistribution"
							class="career-dist">
							<view>
								<text>行业类型：</text>
								<text>{{ industr.name }}</text>								
							</view>
							<view>
								<text>占比：</text>
								<text>{{ ( (industr.value / totalIndustryD)*100 ).toFixed(2) }}%</text>								
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="activeItem == 'college'">
			<single-search-component @search="searchCollege" showKind="true"></single-search-component>
			<view class="card-wrapper">
				<view 	
					@click="chooseSchool(school)"
					v-for="school of majorCollegeList"
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
					<text v-show="!isLoading && this.collegeParams.page < this.totalCollege">点击加载更多</text>
					<text v-show="isLoading">loading...</text>
				</view>
				
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
				isLoading: false,
				activeItem: "basic",
				majorInfo: {},
				major_code: "",
				loreAbility: [],
				majorCareer: {},
				majorCollegeList: [],
				collegeParams: {
					page: 1,
					major_code: '',
					province: '',
					school_type: '',
					run_property: '',
					edu_level: '',
					school_level: ''
				},
				totalCollege: 0,
				totalCareerD: 0,
				totalIndustryD: 0,
				showMessage: false,
				statusCode: "",
				provinceList: []
			}
		},
		computed: {
			...mapState("auth", {
				token: state => state.token
			})
		},
		methods: {
			searchMore() {
				if (this.isLoading || this.collegeParams.page >= this.totalCollege) {
					return
				}
				this.isLoading = true
				this.collegeParams.page++
				this.queryMajorCollege()
					.then(res => {
						this.majorCollegeList = res.schools
						this.totalCollege = res.page
					})
			},
			chooseSchool(school) {
				this.$Router.push({name: 'schoolDetail', params: {schoolId: school.cid}})
			},
			chooseItem(event) {	// 选择模块
				this.isLoading = false
				this.activeItem = event.target.dataset.id
				switch(this.activeItem) {
					case "basic":
						this.queryMajroInfo()
						break;
					case "info":
						this.queryMajorCareer()
						break;
					case "college":
						this.queryMajorCollege()
							.then(res => {
								this.majorCollegeList = res.schools
								this.totalCollege = res.page			
							})
						break;					
				}
			},
			searchCollege(queryObj) {
				this.collegeParams.province = queryObj.province
				this.collegeParams.school_type = queryObj.type
				this.collegeParams.run_property = queryObj.kind
				this.collegeParams.edu_level = queryObj.degree
				this.collegeParams.school_level = queryObj.level
				this.collegeParams.page = 1
				
				this.queryMajorCollege()
					.then(res => {
						this.majorCollegeList = res.schools
						this.totalCollege = res.page			
					})
			},
			queryMajorCollege() {
				this.collegeParams.major_code = this.major_code
				console.log("this.collegeParams::: ", this.collegeParams)
				return new Promise((resolve, reject) => {
					uni.request({
						url: this.apiHost + "/common/search/major/majorCollege",
						method: "GET",
						header: {
							Cookie: this.token
						},
						data: this.collegeParams,
						success: res => {
							if (res.statusCode == 200) {								
								resolve(res.data)												
							}else {
								this.showMessage = true
								this.statusCode = res.statusCode
							}
							console.log("professionDetail >> queryMajorCollege res::: ", res)
						}
					})
					
				})
			},
			queryMajorCareer() {
				uni.request({
					url: this.apiHost + "/common/search/major/majorCareer",
					method: "GET",
					header: {
						Cookie: this.token
					},
					data: {
						major_code: this.major_code
					},
					success: res => {
						if (res.statusCode == 200) {
							this.majorCareer = res.data									
							
							this.majorCareer.careerDistribution.map(item => {
								item.value = Number(item.value)
								this.totalCareerD += item.value
								return item
							})
							this.majorCareer.industrialDistribution.map(item => {
								item.value = Number(item.value)
								this.totalIndustryD += item.value
								return item
							})
							console.log("totalCareerD, totalIndustryD ::: ", this.totalCareerD, this.totalIndustryD)
							console.log("professionDetail >> queryMajorCareer majorCareer ::: ", this.majorCareer)
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("professionDetail >> queryMajorCareer res::: ", res)
					},
				})
			},
			queryMajroInfo() {
				uni.request({
					url: this.apiHost + "/common/search/major/majorInfo",
					method: "GET",
					header: {
						Cookie: this.token
					},
					data: {
						major_code: this.major_code
					},
					success: res => {
						if (res.statusCode == 200) {
							this.majorInfo = res.data
							this.loreAbility = res.data.loreAbility.split('\n')
							this.loreAbility = this.loreAbility.filter(item => {
								return item.trim()
							})
							console.log("loreAbility:: ",this.loreAbility)
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("professionDetail >> queryMajroInfo res::: ", res)
					}
				})
			}
		},
		onLoad() {
			this.major_code = this.$Route.query.major_code
			this.queryMajroInfo()
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
	
	.career-dist {
		padding: 10rpx;
		border-radius: 4rpx;
		&:nth-child(even) {
			background-color: rgba(0,0,0, .1);
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
			
			&:first-child {
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
	
	.load-more {
		color: #e3e3e3;
		text-align: center;
		padding: 10rpx 0 35rpx 0;
	}
	
</style>
