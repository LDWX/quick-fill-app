<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view class="intro-wrapper">
			<view class="title">{{ introObj.title }}</view>
			<view 
				v-for="intro of introObj.context"
				class="mes">{{ intro }}</view>
		</view>
		<button @click="startValuating" type="primary" style="margin-top: 20rpx">马上开始答题</button>
		<message-component v-if="showMessage" v-bind:showMessage.sync="showMessage" :code="statusCode"></message-component>
			
	</view>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	export default {
		data() {
			return {
				introObj: [],
				valuating_id: "",
				valuateName: "",
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
			startValuating () {
				this.$Router.push({name: 'valuatePage', params: {
						valuating_id: this.valuating_id,
						valuateName: this.valuateName
					},
				})
			},
			getValuatingIntro() {
				uni.request({
					url: this.apiHost + "/common/auth/vip/valuating/introduce",
					method: "GET",
					header: {
						Cookie: this.token
					},
					data: {
						valuating_id: this.valuating_id
					},
				  success: res => {
						if (res.statusCode == 200) {
							this.introObj = res.data							
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("judgeIntroduce >> getValuatingIntro res::: ", res)
				  }
				})
			}
		},
		onLoad() {
			this.valuating_id = this.$Route.query.valuating_id
			this.valuateName = this.$Route.query.valuateName
			this.getValuatingIntro()
		}
	}
</script>

<style lang="scss">
	
	.intro-wrapper {
		.title {
			margin-top: 40rpx;
			font-size: 50rpx;
			line-height: 2;
			text-align: center;
		}
		.mes {
			padding: 10rpx 20rpx;
			line-height: 1.4;
		}
		.mes:first-child {
			color: red;
		}
	}
</style>
