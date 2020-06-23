<template>
	<view class="page">		
		<quick-menus></quick-menus>
		<view 
		  v-if="!userInfo.province"
			@click="openModal"
			class="input location">		
			<text class="necessary">*</text>
			<view class="iconfont icon-dingwei"></view>
			<input v-model="province" class="uni-input location-input" disabled="true" placeholder="请选择地区" />
		</view>
		<view 
			v-if="userInfo.province"
			class="input-disable location">
			<view class="iconfont icon-dingwei"></view>
			<input v-model="province" class="uni-input location-input" disabled="true" placeholder="请选择地区" />
			<view class="iconfont icon-lock"></view>
		</view>
		
		<view class="item">
			<text class="title">学科<text class="necessary">*</text></text>
			<view 
				@click="chooseKind($event)"
				class="btn-wrapper">
				<text class="btn">
					<text 
						data-id="1"
						:class="[activeKind == '1' ? 'active' : '']"
						class="msg">文科</text></text>
				<text class="btn">
					<text 
						data-id="0"
						:class="[activeKind == '0' ? 'active' : '']"
						class="msg">理科</text></text>
			</view>
		</view>
		<view class="item">
			<text class="title">总分<text class="necessary">*</text></text>
			<input 
				v-model="score"
				class="uni-input input-score" 
				type="number"
				placeholder="请输入总分" />
		</view>
		<view class="item">
			<text class="title">排名</text>
			<input 
				v-model="rank"
				class="uni-input input-score" 
				type="number"
				placeholder="请输入排名" />
		</view>
		
		<button @click="confirm" type="primary" style="margin: 80rpx 60rpx 0 60rpx;">确定</button>
		
		<province-list 
			v-show="showProvinceList"
			@confirm="chooseProvince"
			@hide="closeModal"></province-list>
			
			<uni-popup ref="popup" type="top">
				<view class="tips-message">
					{{msg}}
				</view>
			</uni-popup>
		<message-component v-if="showMessage" v-bind:showMessage.sync="showMessage" :code="statusCode"></message-component>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
					showProvinceList: false,
					province: "",
					score: "",
					rank: "",
					activeKind: "0",
					userInfo: '',
					msg: "",
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
			confirm() {
				const vm = this
				const result_score = this.validateVariables(this.score, "请填写总分，且总分不能为0")
				const result_province = this.validateVariables(this.province, "请选择地区")
				if (result_province && result_score) {
					
					this.changeScoreInfo()
				}
			},
			changeScoreInfo() {
				const vm = this
				uni.request({
					url: vm.apiHost + "/common/auth/user/updateScore",
					method: "POST",
					header: {
						Cookie: vm.token,
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						score: vm.score,
						rank: vm.rank,
						subject: vm.activeKind
					},
					success: res => {
						if (res.statusCode == 200) {
							vm.setUserInfo(res.data)
							uni.removeStorage({
								key: 'recommandObj'
							})
							uni.removeStorage({
								key: 'choicePool'
							})
							setTimeout(() => {
								this.$Router.replaceAll({name: "index"})
							}, 1000)
							
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("fill-in >> changeScoreInfo userInfo::: ", res.data)
					}
				})
			},
			getUserInfo() {
				const vm = this
				uni.getStorage({
					key: 'userInfo',
					success: res => {
						vm.userInfo = res.data
						vm.province = this.userInfo.province
						vm.score = this.userInfo.score
						vm.activeKind = this.userInfo.subject
						vm.rank = this.userInfo.rank
						console.log("fill-in page >>getUserInfo userInfo::: ", vm.userInfo)
					}
				})
			},
			setUserInfo(userInfo) {
				const vm = this
				uni.setStorage({
					key: "userInfo",
					data: userInfo,
					success: res => {
						vm.$refs.popup.open();
						vm.msg = "信息提交成功";
						
						setTimeout(() => {
							vm.$refs.popup.close();
						}, 1000)
					}
				})
			},
			validateVariables(value, msg) {
				const vm = this
				if (!value) {
					vm.$refs.popup.open();
					vm.msg = msg;
					setTimeout(() => {
						vm.$refs.popup.close();
					}, 1000)
					return false
				}
				return true
			},
			chooseKind(event) {
				const id = event.target.dataset.id
				this.activeKind = id
				console.log("fill-in >> chooseKind >> target ::: ", id)
			},
			chooseProvince(data) {
				this.province = data.value
			},
			openModal() {
				this.showProvinceList =true
			},
			closeModal() {
				this.showProvinceList = false
			}
		},
		onLoad() {
			const vm = this
			this.getUserInfo()
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
	
	$inputHeight: 100rpx;
	@mixin s_input {
		position: relative;
		margin: 40rpx 60rpx;
		height: $inputHeight;
		border: 1rpx solid $borderColor;
	}
	.input-disable {
		@include s_input;
	}
	.input {
		@include s_input;
		&:active {
			background: darken($color: #fff, $amount: 10);			
		}
		.necessary {
			position: absolute;
			left: -40rpx;
			top: 35rpx;
			color: red;
		}
	}
	.location {
		
	}
	.icon-dingwei,
	.icon-lock{
		display: inline-block;
		line-height: $inputHeight;
		vertical-align: top;
		font-size: 35rpx;
		padding: 0 20rpx;
	}
		
	.location-input {
		display: inline-block;
		height: $inputHeight;
		line-height: $inputHeight;
		width: calc(100% - 150rpx);
	}
	
	.necessary {
		color: red;
	}
	
	.item {
		margin: 40rpx 60rpx;
		.btn-wrapper {
			margin: 20rpx 0;
			display: flex;
			flex-flow: row nowrap;
			
			.btn {
				flex: 1 1 50%;				
				text-align: center;
				padding: 0 10rpx;				
			}
			.msg {
				display: inline-block;
				padding: 20rpx;
				width: 100%;
				background: $backgroundColor;
				&.active {
					background: $primaryColor;
					color: white;
				}
			}
		}
	}
	
	.input-score {
		margin: 20rpx 0;
		height: $inputHeight;
		line-height: $inputHeight;
		text-indent: 20rpx;
		border: 1rpx solid $borderColor;
	}
</style>
