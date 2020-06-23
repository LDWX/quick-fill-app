<template>
	<view class="page">
		<quick-menus></quick-menus>
		<search-component @search="filterList" 
			:provinceList='provinceList' 
			:typeList="typeList"
			:kindList="kindList"
			:levelList="levelList"
			:degreeList="degreeList"></search-component>
		<view style="margin-top: 20rpx;">
			<table>
				<thead>
					<tr>
						<th>加入<br/>志愿池</th>
						<th style="min-width: 60rpx;">录取概率</th>
						<th>院校名称</th>
						<th>地区</th>
					</tr>
				</thead>
				<tbody>
					<tr 
						@click="jump2SchoolDetail(school.cid)"						
						v-for="school in showSchoolList">
						<td 
							@click.stop="chooseItem(school)"
							class="check-btn">
							<label class="radio"><radio :checked="selectedSchoolIdList.includes(school.cid)" /></label>
						</td>
						<td>{{ Math.floor(school.enrollRate * 100) }}%</td>
						<td>
							<text class="school-name">{{ school.schoolInfo.name }}</text>
							<view class="sub-desc">{{ school.schoolInfo.tag }}</view>
							<view class="flag-group">								
								<text class="flag">{{ school.schoolInfo.runProperty }}</text>
								<text class="flag">{{ school.schoolInfo.schoolType }}</text>
								<text class="flag">{{ school.schoolInfo.level == 0 ? "本科" : "专科" }}</text>
								<text v-show="+school.schoolInfo.is985" class="flag">985</text>
								<text v-show="+school.schoolInfo.is211" class="flag">211</text>
								<text v-show="+school.schoolInfo.is11" class="flag">双一流</text>
							</view>
						</td>
						<td>{{ school.schoolInfo.province }}</td>
					</tr>
				</tbody>
			</table>
			<view v-if="!(showSchoolList.length > 0)" class="no-data">
				暂无数据					
			</view>
		</view>
		<button @click="addToChoicePool" type="primary" class="confirm">加入志愿池</button>
		
		<uni-popup ref="popup" type="top">
			<view class="tips-message">
				{{msg}}
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Router from "@/router";
	export default {
		data() {
			return {
				provinceList: [],
				typeList: [],
				kindList: [],
				levelList: [],
				degreeList: [],
				branchType: '',
				schoolList: [],	// 全量学校列表
				showSchoolList: [], // 筛选后的学校列表
				selectedSchoolList: [], // 用户选中的学校列表
				selectedSchoolIdList: [],
				msg: ""
			}
		},
		methods: {
			jump2SchoolDetail(schoolId) {
				this.$Router.push({name: 'schoolDetail', params: {schoolId: schoolId}})
			},
			filterList(queryObj) {
				console.log("queryObj::: ", JSON.stringify(queryObj))
				this.showSchoolList = this.schoolList.filter( item => {				
					let result_province = true
					let result_kind = true
					let result_type = true
					let result_level = true
					let result_degree = true
					if (!!queryObj.provinceList.length) {
						result_province = queryObj.provinceList.includes(item.schoolInfo.province)
					}
					if (!!queryObj.kindList.length) {
						result_kind = queryObj.kindList.includes(item.schoolInfo.runProperty)
					}
					if (!!queryObj.typeList.length) {
						result_type = queryObj.typeList.includes(item.schoolInfo.schoolType)
					}
					if (!!queryObj.levelList.length) {
						result_level = false
						queryObj.levelList.forEach(level => {
							switch(level) {
								case "211": 
									if (+item.schoolInfo.is211) result_level = true;
									break;
								case "985":
									if (+item.schoolInfo.is985) result_level = true;
									break;
								case "11":
									if (+item.schoolInfo.is11) result_level = true;
									break;
							}
						})	
					}
					if (!!queryObj.degreeList.length) {
						result_degree = queryObj.degreeList.includes(item.schoolInfo.level)				
					}
					
					return result_province && result_kind && result_type && result_level && result_degree						
				})
				console.log("suggestChoice >> filterList >> showSchoolList ::: ", this.showSchoolList)
			},
			chooseItem(school) {
				let index = this.selectedSchoolIdList.indexOf(school.cid)
				console.log("suggestChoice >> chooseItem >> index ::: ", index)
				if (index > -1) {
					this.selectedSchoolIdList.splice(index, 1)
					this.selectedSchoolList = this.selectedSchoolList.filter( item => {
						return item.cid != school.cid
					})
				}else {
					this.selectedSchoolIdList.push(school.cid)
					this.selectedSchoolList.push({...school})
				}
				console.log("suggestChoice >> chooseItem >> selectedSchoolIdList ::: ", this.selectedSchoolIdList)
			},
			addToChoicePool() {
				const vm = this
				if (!!this.selectedSchoolIdList.length) {
					uni.setStorage({
						key: `choicePool`,
						data: this.selectedSchoolList,
						success: res => {
							vm.$refs.popup.open();
							vm.msg = "添加志愿池成功";
							setTimeout(() => {
								vm.$refs.popup.close();
							}, 1000)
						}
					})
				}else {
					vm.$refs.popup.open()
					vm.msg = "请选择学校后再加入志愿池"
					setTimeout(() => {
						vm.$refs.popup.close();
					}, 1000)
				}
			}
		},
		onLoad() {
			const vm = this
			this.branchType = this.$Route.query.branchType;
			this.schoolList = this.$Route.query.schoolList;
			this.showSchoolList = [...this.schoolList]
			
			let provinceObj = {}
			let typeObj = {}
			let kindObj = {}
			let levelObj = {}
			let degreeObj = {}
			
			this.schoolList.forEach( item => {
				provinceObj[item.schoolInfo.province] = {
					key: item.schoolInfo.province,
					value: item.schoolInfo.province
				}
				typeObj[item.schoolInfo.schoolType] = {
					key: item.schoolInfo.schoolType,
					value: item.schoolInfo.schoolType
				}
				
				kindObj[item.schoolInfo.runProperty] = {
					key: item.schoolInfo.runProperty,
					value: item.schoolInfo.runProperty
				}
				
				if (item.schoolInfo.is985 == "1") {
					levelObj["985"] = {
						key: "985",
						value: "985"
					}
				}else if (item.schoolInfo.is211 == "1") {
					levelObj["211"] = {
						key: "211",
						value: "211"
					}
				}else if (item.schoolInfo.is11 == "1") {
					levelObj["双一流"] = {
						key: "11",
						value: "双一流"
					}
				}
				
				if (item.schoolInfo.level == "0") {
					degreeObj["本科"] = {
						key: "0",
						value: "本科学校"
					}
				}else {
					degreeObj["专科"] = {
						key: "1",
						value: "专科学校"
					}
				}
				
				
			})	
			this.provinceList = Object.values(provinceObj)
			this.typeList = Object.values(typeObj)
			this.kindList = Object.values(kindObj)
			this.levelList = Object.values(levelObj)
			this.degreeList = Object.values(degreeObj)
			
			uni.getStorage({
				key: `choicePool`,
				success: res => {
					res.data.forEach( item => {
						vm.selectedSchoolIdList.push(item.cid)
						vm.selectedSchoolList.push({...item})
					})
					console.log(`suggestChoice >> onLoad >> getStorage >> choicePool`, res.data)
				}
			})
			console.log("suggestChoice >> onLoad >> schoolList::: ", this.schoolList)
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
	
	
	table {
		width: 100%;
		background: white;
		border-collapse: collapse;
		.school-name {
			font-size: 30rpx;
			font-weight: bold;
		}
	}
	th {
		background: $backgroundColor;
	}
	th,
	td {
		text-align: left;
		font-size: 24rpx;
		padding: 20rpx 10rpx;
		border-top: 1rpx solid $borderColor;
		border-bottom: 1rpx solid $borderColor;
		&:first-child {
			text-align: center;
			width: 90rpx;
		}
	}
	
	
	
</style>
