<template>
	<view @click="hideModal" class="mask">
		<view class="modal-bottom">
			<view class="content-wrapper">
				<view class="checkbox-wrapper">
					<text 
						@click.stop="checkItem(item.key)"
						v-for="item in provinceList"
						:key="item.key"
						:class="[activeItem == item.key ? 'active' : '']"
						class="item">{{ item.value }}</text>
				</view>
				<view class="btn-group">
					<button @click.stop="confirm" type="primary">确定</button>
					<!-- <button @click="ensureChoice" class="mini-btn" size="mini" type="primary" >确定35所高校</button> -->
				</view>
				
			</view>
		</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeItem: "",
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
			}
		},
		methods: {
			checkItem(item) {
				this.activeItem = item
			},
			confirm() {
				this.$emit("confirm", {
					value: this.activeItem
				})
				this.hideModal()
			},
			hideModal() {
				console.log("hide")	
				this.$emit("hide")
			}
		}
	}
</script>

<style lang="scss">
	$fontColor: #999999;
	
	$backgroundColor: #e7e7e7;
	$activeBackground: #d3d3d3;
	$borderColor: rgba(0,0,0,.1);
	
	$primaryColor: #007AFF;
	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0,0,0,0.6);
	}
	.modal-bottom {
		position: absolute;
		left: 0;
		right: 0;
		// top: 0;
		bottom: 0;
		padding: 20rpx 10rpx;
		border-bottom: 1rpx solid $borderColor;
		box-shadow: 0 10rpx 10rpx $borderColor;
		background: white;
		z-index: 99;
		.content-wrapper {
			background: white;
		}
		.checkbox-wrapper {
			display: flex;
			flex-flow: row wrap;
			justify-content: flex-start;
			
			.item {
				margin: 10rpx;
				padding: 10rpx 8rpx;
				width: 160rpx;
				text-align: center;
				background: $backgroundColor;	
					
					&.active {
						background: $primaryColor;
						color: white;
					}
				
			}
		}
		.btn-group {
			margin-top: 20rpx;
			text-align: center;
			button {
				margin: 10rpx;
			}
		}
	}
</style>
