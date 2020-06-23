<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view @click="chooseItem($event)" class="tab-group">
			<text data-id="regularSchools" 
				:class="[activeItem == 'regularSchools' ? 'active' : '']"
				class="tab">本科</text>
			<text data-id="juniorSchools" 
				:class="[activeItem == 'juniorSchools' ? 'active' : '']"
				class="tab">专科</text>
		</view>
		<view style="margin-top: 40rpx;">
			<table>
				<thead>
					<tr>
						<th>填报</th>
						<th>院校名称</th>
						<th>地区</th>
					</tr>
				</thead>
				<tbody>
					<tr 
						@click="jump2SchoolDetail(school.cid)"
						v-for="school in showSchoolList"
						:key="school.ucode">
						<td			
							@click.stop="chooseSchool(school)"
							class="check-btn">
							<label class="radio"><radio :checked="selectedSchoolIdList[activeItem].includes(school.ucode)" /></label>
						</td>
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
		<button @click="confirm" type="primary" class="confirm">确认填报</button>
		<uni-popup ref="popup" type="top">
			<view class="tips-message">
				{{msg}}
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				activeItem: "regularSchools",
				showSchoolList: [], 		// 展示在列表中的数据
				regularSchools: [], // 本科
				juniorSchools: [],	// 专科
				selectedSchoolIdList: {	// 用户选中的学校列表
					regularSchools: [],
					juniorSchools: []
				},
				msg: ''
			}
		},
		computed: {
			...mapState("auth", {
				token: state => state.token
			})
		},
		methods: {
			jump2SchoolDetail(schoolId) {
				this.$Router.push({name: 'schoolDetail', params: {schoolId: schoolId}})
			},
			confirm() {
				const vm = this
				if ((this.selectedSchoolIdList.regularSchools.length + this.selectedSchoolIdList.juniorSchools.length) < 4) {
					vm.$refs.popup.open();
					vm.msg = "至少选择四所学校";
					setTimeout(() => {
						vm.$refs.popup.close();
					}, 1000)
					
					return
				}
				this.$Router.push({name: "simulationResult", params: {
					schoolList: {
						regular_ucode_list: JSON.stringify(vm.selectedSchoolIdList.regularSchools),
						jjunior_ucode_list: JSON.stringify(vm.selectedSchoolIdList.juniorSchools) 
					},
					history: false
				}})
				
			},
			chooseItem(event) {
				this.activeItem = event.target.dataset.id
				this.showSchoolList = this[this.activeItem]
				console.log("simulationPage >> chooseItem showSchoolList ::: ", this.showSchoolList)
			},
			chooseSchool(school) {
				const vm = this
				let index = this.selectedSchoolIdList[this.activeItem].indexOf(school.ucode)
				console.log("suggestChoice >> chooseItem >> index ::: ", index)
				if (index > -1) {
					this.selectedSchoolIdList[this.activeItem].splice(index, 1)
										
				}else {					
					if (this.activeItem == 'regularSchools' && this.selectedSchoolIdList.regularSchools.length < 16) {
						this.selectedSchoolIdList[this.activeItem].push(school.ucode)
					}else if (this.activeItem == 'juniorSchools' && this.selectedSchoolIdList.juniorSchools.length < 6) {
						this.selectedSchoolIdList[this.activeItem].push(school.ucode)
					}
				}
			}
		},
		onLoad() {
			const vm = this
			
			uni.getStorage({
				key: 'choicePool',
				success: res => {
					console.log("simulationPage >> onLoad >> getStorage choicePool ::: ", res.data)
					res.data.forEach(item => {
						switch(item.schoolInfo.level) {
							case "0": 
								vm.regularSchools.push(item)
								break;
							case "1":
								vm.juniorSchools.push(item)
								break;
						}
					}) 
					if (vm.regularSchools.length > 0) {
						this.showSchoolList = vm.regularSchools
					}else if (vm.juniorSchools.length > 0) {
						this.juniorSchools = vm.juniorSchools
					}
					console.log("simulationPage >> onLoad >> regularSchools::: ", vm.regularSchools)
				},
				fail: res => {
					vm.$refs.popup.open();
					vm.msg = "请先添加志愿池";
					setTimeout(() => {
						vm.$refs.popup.close();
					}, 1000)
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
		font-size: 30rpx;
		background: $backgroundColor;
	}
	td {
		font-size: 24rpx;
	}
	th,
	td {
		text-align: left;		
		padding: 20rpx 10rpx;
		border-top: 1rpx solid $borderColor;
		border-bottom: 1rpx solid $borderColor;
	}
	
</style>
