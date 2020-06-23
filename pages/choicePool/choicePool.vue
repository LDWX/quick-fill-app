<template>
	<view class="page">
		<quick-menus></quick-menus>
		<score-info></score-info>
		<view class="card-wrapper">
			<view 	
				@click="jump2SchoolDetail(school.cid)"
				v-for="school of choicePool"
				:key="school.cid"
				class="module-medium school-card">
				<label @click.stop="chooseItem(school)" class="radio"><radio :checked="selectedSchoolIdList.includes(school.cid)" /></label>
				<view class="main-info">
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
				</view>
				<view 
					@click="removeItem($event, school)"
					class="iconfont icon-close close" ></view>
			</view>
			
		</view>
		<button @click.stop="compareSchools" type="primary" style="margin-top: 20rpx">马上对比</button>
		<uni-popup ref="popup" type="top">
			<view class="tips-message">
				{{msg}}
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: "",
				choicePool: [],
				selectedSchoolList: [], // 用户选中的学校列表
				selectedSchoolIdList: [],
			}
		},
		methods: {
			jump2SchoolDetail(schoolId) {
				this.$Router.push({name: 'schoolDetail', params: {schoolId: schoolId}})
			},
			compareSchools() {
				if (this.selectedSchoolList.length > 1) {
					console.log("selectedSchoolList");
					this.$Router.push({ name: "compareList", params: {schoolList: this.selectedSchoolList} });
				}else {
					this.$refs.popup.open();
					this.msg = "请选择两个及以上学校进行比较";
					setTimeout(() => {
						this.$refs.popup.close();
					}, 1000)
				}
			},
			chooseItem(school) {
				let index = this.selectedSchoolIdList.indexOf(school.cid)
				console.log("choicePool >> chooseItem >> index ::: ", index)
				if (index > -1) {
					this.selectedSchoolIdList.splice(index, 1)
					this.selectedSchoolList = this.selectedSchoolList.filter( item => {
						return item.cid != school.cid
					})
				}else {
					this.selectedSchoolIdList.push(school.cid)
					this.selectedSchoolList.push({...school})
				}
				console.log("choicePool >> chooseItem >> selectedSchoolIdList ::: ", this.selectedSchoolIdList)
			},
			removeItem(event, school) {
				console.log("event", event)
				let index = this.selectedSchoolIdList.indexOf(school.cid)
				console.log("choicePool >> removeItem >> index ::: ", index)
				if (index > -1) {
					this.selectedSchoolIdList.splice(index, 1)
					this.selectedSchoolList = this.selectedSchoolList.filter( item => {
						return item.cid != school.cid
					})
				}
				this.choicePool = this.choicePool.filter( item => {
					return item.cid != school.cid
				})
				
				uni.setStorage({
					key: "choicePool",
					data: this.choicePool,
					success: res => {
						console.log("移出志愿池::: ", res)
					}
				})
				
			}
		},
		onLoad() {
			const vm = this
			uni.getStorage({
				key: "choicePool",
				success: res => {
					vm.choicePool = res.data
					console.log("choicePool >> onLoad >> choicePool ::: ", res.data)
				}
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
	
	.module-medium {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		padding: 20rpx 20rpx;
		box-shadow: 0 0rpx 10rpx $borderColor;
	}
	.school-card {
		position: relative;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
	}
	.main-info {
		margin-left: 30rpx;
	}
	.school-name {
		font-size: 50rpx;
		font-weight: bold;
	}
	.flag-group {
		display: flex;
		flex-flow: row nowrap;
		margin-top: 20rpx;
		
		.flag {
			font-size: 24rpx;
			color: white;
			padding: 3rpx 10rpx;
			margin: 0 5rpx;
			background: $primaryColor;
			border-radius: 4rpx;
		}
	}
	.iconfont {
		font-size: 50rpx;
		color: $fontColor;
	}
	.close {
		position: absolute;
		top: 10rpx;
		right: 20rpx;
		&:active {
			color: lighten($color: $fontColor, $amount: 10);
		}
	}
</style>
