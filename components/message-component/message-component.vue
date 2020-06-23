<template>
	<view>
		<uni-popup ref="popup" type="top">
			<view class="tips-message">
				{{msg}}
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: ['code'],
		data() {
			return {
				msg: ""
			}
		},
		methods: {
			popMessage(code) {
				console.log("message-component code ::: ", code )
				switch(code) {
					case 451: 
						this.msg = "登录过期, 请重新登录"
						break;
					case 453:
						this.msg = "仅vip开放功能, 请购买vip"
						break;
					case 456:
						this.msg = "用户不存在, 或者密码错误"
						break;
					case 457:
						this.msg = "没有权限"
						break;
					case 459:
						this.msg = "分数、位次修改次数已达上限"
						break;
					case 460:
						this.msg = "用户信息未完善, 请先完善用户信息"
						break;
					case 0:
						this.msg = "服务异常"
						break;
				}
				this.$refs.popup.open();
				setTimeout(() => {
					this.$refs.popup.close();
					this.$emit('update:showMessage', false)
				}, 1500)
			}
		},
		mounted() {
			this.popMessage(this.code)
		}
	}
</script>

<style>
</style>
