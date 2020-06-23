<template>
	<view>	
		<view class="login-wrapper">
			<input v-model="account" class="uni-input" focus placeholder="请输入账号" />
			<input v-model="password" class="uni-input" type="password" placeholder="请输入密码" />
			<button @click="login" type="primary">登录系统</button>
		</view>
		<message-component v-if="showMessage" v-bind:showMessage.sync="showMessage" :code="statusCode"></message-component>
			
	</view>
</template>

<script>
	import Router from "@/router"
	import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				// account: 17621871016,
				// password: 12345678
				account: "",
				password: "",
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
			...mapMutations("auth", [
				"addToken"
			]),
			login() {
				const vm = this
				uni.request({
					url: vm.apiHost + "/common/login",
					data: {
						name: vm.account,
						password: vm.password
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					method: "POST",
					success: res => {
						console.log("login page login() >> header::: ", res.header)
						vm.addToken(res.header["Set-Cookie"])
						if (res.statusCode == 200) {
							uni.setStorageSync("userInfo", res.data)
							uni.setStorageSync("accountInfo", {
								account: this.account,
								password: this.password
							})
							Router.replace({name: 'index'})
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("success: ", res)
						console.log("token:: ", vm.token)
					}
				})
				
			}
		},
		onLoad() {
			// uni.getStorage({
			// 	key: 'userInfo',
			// 	success: (res) => {
			// 		const userInfo = res.data					
			// 		console.log("login page >> userInfo::: ",userInfo)
			// 	}
			// })
			uni.getStorage({
				key: 'accountInfo',
				success: (res) => {
					this.account = res.data.account
					this.password = res.data.password
					
				}
			})
			
		}
	}
</script>

<style lang="scss" scoped>
	$fontColor: #999999;
	
	$backgroundColor: #e7e7e7;
	$activeBackground: #d3d3d3;
	$borderColor: rgba(0,0,0,.1);
	
	$primaryColor: #007AFF;
	.login-wrapper {
		position: absolute;
		top: 30%;
		left: 0;
		right: 0;
		transform: translateY(-50%);
	}
	input {
		margin: 30rpx 0;
		padding: 20rpx;
		border: 1rpx solid $borderColor;
	}
</style>
