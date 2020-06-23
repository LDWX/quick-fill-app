<template>
	<view class="search-component">
		<view @click="activeModal($event)" class="search-group">
			<text data-id="province" :class="[activeTab=='province' ? 'active' : 'drop-list']" class="search-item">省份</text>
			<text data-id="kind" :class="[activeTab=='kind' ? 'active' : 'drop-list']" class="search-item">办学性质</text>
			<text data-id="type" :class="[activeTab=='type' ? 'active' : 'drop-list']" class="search-item">学校类型</text>
			<text data-id="level" :class="[activeTab=='level' ? 'active' : 'drop-list']" class="search-item">高校级别</text>
			<text data-id="degree" :class="[activeTab=='degree' ? 'active' : 'drop-list']" class="search-item">学历级别</text>
			<text @click="searchList" data-id="search" class="search-item btn">过滤</text>
		</view>
		<view class="select-list-wrapper">
			<select-list 
				v-show="showModal['province']" 
				:checkBoxList="provinceList"
				@getCheckedList="getPrinces"></select-list>
			<select-list 
				v-show="showModal['kind']" 
				:checkBoxList="kindList"
				@getCheckedList="getKinds"></select-list>
			<select-list
				v-show="showModal['type']" 
				:checkBoxList="typeList"
				@getCheckedList="getTypes"></select-list>
			<select-list
				v-show="showModal['level']" 
				:checkBoxList="levelList"
				@getCheckedList="getLevels"></select-list>
			<select-list
				v-show="showModal['degree']" 
				:checkBoxList="degreeList"
				@getCheckedList="getDegrees"></select-list>
			
		</view>
					
			
	</view>
</template>


<script>
	export default {
		props: ["provinceList", "typeList", "kindList", "levelList", "degreeList"],
		data() {
			return {					
				showModal: {
					province: false,
					kind: false,
					level: false,
					degree: false,
					type: false
				},
				activeTab: "",
				checkedProvinceList: [],
				checkedTypeList: [],
				checkedKindList: [],
				checkedLevelList: [],
				checkedDegreeList: [],
				
				// kindList: [
				// 	{
				// 		key: "公立",
				// 		value: "公立"
				// 	},{
				// 		key: "私立",
				// 		value: "私立"
				// 	}
				// ],
				// levelList: [
				// 	{
				// 		key: "211",
				// 		value: "211"
				// 	},{
				// 		key: "985",
				// 		value: "985"
				// 	},{
				// 		key: "11",
				// 		value: "双一流"
				// 	}
				// ],
				// degreeList: [
				// 	{
				// 		key: "0",
				// 		value: "本科学校"
				// 	},{
				// 		key: "1",
				// 		value: "专科学校"
				// 	},
				// ],
			}
		},
		methods: {
			activeModal(event) {
				// TODO: 通过不同的item展示不同的数据
				const target = event.target;
				const item = target.dataset.id;
				if (item && item != "search") {
					if (this.activeTab == item) {	// 点击已经选中的tab，则将下拉框收起
						this.showModal[item] = false
						this.activeTab = ""
					}else {
						for (let key in this.showModal) {
							this.showModal[key] = false
						}
						this.activeTab = item
						this.showModal[item] = true
					}
				}else {
					for (let key in this.showModal) {
						this.showModal[key] = false
					}
					this.activeTab = ""
				}
			},
			getPrinces(dataList) {
				this.checkedProvinceList = dataList
			},
			getKinds(dataList) {
				this.checkedKindList = dataList
			},
			getTypes(dataList) {
				this.checkedTypeList = dataList
			},
			getLevels(dataList) {
				this.checkedLevelList = dataList
			},
			getDegrees(dataList) {
				this.checkedDegreeList = dataList
			},
			searchList() {
				let queryData = {
					provinceList: [...this.checkedProvinceList],
					kindList: [...this.checkedKindList],
					typeList: [...this.checkedTypeList],
					levelList: [...this.checkedLevelList],
					degreeList: [...this.checkedDegreeList]	
				}
				this.$emit("search", queryData)
				for (let key in this.showModal) {
					this.showModal[key] = false
				}
			},
			ensureChoice() {
				this.showModal = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	$fontColor: #999999;
	
	$backgroundColor: #e7e7e7;
	$activeBackground: #d3d3d3;
	$borderColor: rgba(0,0,0,.1);
	
	$primaryColor: #007AFF;
	.search-component {
		position: relative;
		background: white;
		font-size: 25rpx;
	}
	
	
	.search-group {
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid $borderColor;
		.search-item {
			flex: 2 2 60rpx;
			text-align: center;
			padding: 40rpx 5rpx;
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
	.select-list-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
</style>
