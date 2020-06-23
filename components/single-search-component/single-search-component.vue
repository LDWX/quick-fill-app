<template>
	<view class="search-component">
		<view @click="activeModal($event)" class="search-group">
			<text data-id="province" :class="[activeTab=='province' ? 'active' : 'drop-list']" class="search-item">省份</text>
			<text v-if="showKind" data-id="kind" :class="[activeTab=='kind' ? 'active' : 'drop-list']" class="search-item">办学性质</text>
			<text data-id="type" :class="[activeTab=='type' ? 'active' : 'drop-list']" class="search-item">学校类型</text>
			<text data-id="level" :class="[activeTab=='level' ? 'active' : 'drop-list']" class="search-item">高校级别</text>
			<text data-id="degree" :class="[activeTab=='degree' ? 'active' : 'drop-list']" class="search-item">学历级别</text>
			<!-- <text @click="searchList" data-id="search" class="search-item btn">搜索</text> -->
		</view>
		<view class="select-list-wrapper">
			<single-select-list
				v-show="showModal['province']"
				:checkBoxList="provinceList"
				@getCheckedList="getPrinces"></single-select-list>
			<single-select-list
				v-show="showModal['kind']"
				:checkBoxList="kindList"
				@getCheckedList="getKinds"></single-select-list>
			<single-select-list
				v-show="showModal['type']"
				:checkBoxList="typeList"
				@getCheckedList="getTypes"></single-select-list>
			<single-select-list
				v-show="showModal['level']"
				:checkBoxList="levelList"
				@getCheckedList="getLevels"></single-select-list>
			<single-select-list
				v-show="showModal['degree']"
				:checkBoxList="degreeList"
				@getCheckedList="getDegrees"></single-select-list>
				
		</view>
					
			
	</view>
</template>


<script>
	export default {
		props: {
			showKind: {
				default: false
			}
		},
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
				checkedProvince: "",
				checkedKind: '',
				checkedType: "",
				checkedLevel: "",
				checkedDegree: "",
				provinceList: [
					{
						key: "北京",
						value: "北京"
					},{
						key: "天津",
						value: "天津"
					},{
						key: "上海",
						value: "上海"
					},{
						key: "重庆",
						value: "重庆"
					},{
						key: "河北",
						value: "河北"
					},{
						key: "河南",
						value: "河南"
					},{
						key: "山东",
						value: "山东"
					},{
						key: "山西",
						value: "山西"
					},{
						key: "安徽",
						value: "安徽"
					},{
						key: "江西",
						value: "江西"
					},{
						key: "江苏",
						value: "江苏"
					},{
						key: "浙江",
						value: "浙江"
					},{
						key: "湖北",
						value: "湖北"
					},{
						key: "湖南",
						value: "湖南"
					},{
						key: "广东",
						value: "广东"
					},{
						key: "广西",
						value: "广西"
					},{
						key: "云南",
						value: "云南"
					},{
						key: "贵州",
						value: "贵州"
					},{
						key: "四川",
						value: "四川"
					},{
						key: "陕西",
						value: "陕西"
					},{
						key: "青海",
						value: "青海"
					},{
						key: "宁夏",
						value: "宁夏"
					},{
						key: "黑龙江",
						value: "黑龙江"
					},{
						key: "吉林",
						value: "吉林"
					},{
						key: "辽宁",
						value: "辽宁"
					},{
						key: "西藏",
						value: "西藏"
					},{
						key: "新疆",
						value: "新疆"
					},{
						key: "内蒙古",
						value: "内蒙古"
					},{
						key: "海南",
						value: "海南"
					},{
						key: "福建",
						value: "福建"
					},{
						key: "甘肃",
						value: "甘肃"
					},
				],
				levelList: [
					{
						key: "211",
						value: "211"
					},{
						key: "985",
						value: "985"
					},{
						key: "11",
						value: "双一流"
					}
				],
				degreeList: [
					{
						key: "0",
						value: "本科学校"
					},{
						key: "1",
						value: "专科学校"
					},
				],
				typeList: [
					{
						key: "体育",
						value: "体育"
					},
					{
						key: "军事",
						value: "军事"
					},{
						key: "农业",
						value: "农业"
					},{
						key: "医药",
						value: "医药"
					},{
						key: "工科",
						value: "工科"
					},{
						key: "师范",
						value: "师范"
					},{
						key: "政法",
						value: "政法"
					},{
						key: "林业",
						value: "林业"
					},{
						key: "民族",
						value: "民族"
					},{
						key: "综合",
						value: "综合"
					},{
						key: "艺术",
						value: "艺术"
					},{
						key: "语言",
						value: "语言"
					},{
						key: "财经",
						value: "财经"
					},
				],
				kindList: [
					{
						key: "公立",
						value: "公立"
					},{
						key: "私立",
						value: "私立"
					}
				],
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
			getPrinces(data) {
				this.checkedProvince = data
				this.searchList()
			},
			getKinds(data) {
				this.checkedKind = data
				this.searchList()
			},
			getTypes(data) {
				this.checkedType = data
				this.searchList()
			},
			getLevels(data) {
				this.checkedLevel = data
				this.searchList()
			},
			getDegrees(data) {
				this.checkedDegree = data
				this.searchList()
			},
			searchList() {
				this.activeTab = ""
				let queryData = {
					province: this.checkedProvince,
					kind: this.checkedKind,
					type: this.checkedType,
					level: this.checkedLevel,
					degree: this.checkedDegree	
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
