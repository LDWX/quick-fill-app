<template>
	<view class="select-modal">
		<view class="content-wrapper">
			<view class="checkbox-wrapper">
				<text 
					@click="checkItem(item.key)"
					v-for="item in checkBoxList"
					:key="item.key"
					:class="[activeItem == item.key ? 'active' : '']"
					class="item">{{ item.value }}</text>
			</view>
			<view class="btn-group">
				<!-- <button class="mini-btn" size="mini" type="default">重置</button> -->
				<!-- <button @click="ensureChoice" class="mini-btn" size="mini" type="primary" >确定35所高校</button> -->
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		props: ['checkBoxList', 'type'],
		data() {
			return {
				activeItem: "",
				selectedList: []
			}
		},
		methods: {				
			checkItem(item) {
				if (this.activeItem == item) {
					this.activeItem = ""
				}else {
					this.activeItem = item
				}
				this.$emit("getCheckedList", this.activeItem)
				// console.log("checkedItems::: ", this.selectedList)
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
	.select-modal {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		// bottom: 0;
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
