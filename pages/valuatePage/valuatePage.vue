<template>
	<view class="page">
		<quick-menus></quick-menus>
		<view v-for="(question, index) of questionList"
			class="module-wrapper">
			<view class="title">{{index + 1}}.{{ question.question }}</view>
			<view>
				<radio-group 
					@change="chooseAnswer">
					<view v-for="choice of Object.entries(question.select)"
						class="question-wrapper">
						<radio :value="choice[0]+'-'+ question.qid" />
						<view class="label">{{ choice[0] }}.</view>
						<view class="desc">{{ choice[1] }}</view>						
					</view>
				</radio-group>				
			</view>
		</view>
		<button @click="submit" type="primary" class="confirm">提交答案</button>
		<uni-popup ref="popup" type="top">
			<view class="tips-message">
				{{msg}}
			</view>
		</uni-popup>
		<message-component v-if="showMessage" v-bind:showMessage.sync="showMessage" :code="statusCode"></message-component>
			
	</view>
</template>

<script>
	import { mapState, mapMutations } from "vuex";
	export default {
		data() {
			return {
				msg: "",
				valuateName: "",
				valuating_id: "",
				questionList: "",
				answerObj: {},
				showMessage: false,
				statusCode: "",
				account: "",
				password: ""
			}
		},
		computed: {
			...mapState("auth", {
				token: state => state.token
			})
		},
		methods: {
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
						if (res.statusCode == 200) {
							uni.setStorageSync("userInfo", res.data)
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("success: ", res)
						console.log("token:: ", vm.token)
					}
				})
				
			},
			submit() {
				let entries = Object.entries(this.answerObj)
				if (entries.length < this.questionList.length) {
					this.$refs.popup.open();
					this.msg = "有题目还没有回答";
					setTimeout(() => {
						this.$refs.popup.close();
					}, 1000)
					return
				}
				let answerList = entries.map( arr => {
					return {
						id: arr[0],
						answer: arr[1]
					}
				})
				console.log(this.valuating_id ,answerList)
				uni.request({
					url: this.apiHost + "/common/auth/vip/valuating/answer",
					method: "POST",
					header: {
						Cookie: this.token,
						"Content-Type": "application/x-www-form-urlencoded"
					},
					data: {
						valuating_id: this.valuating_id,
						answer_list: JSON.stringify(answerList)
					},
					success: res => {
						if (res.statusCode == 200) {
							// uni.getStorage({
							// 	key: 'accountInfo',
							// 	success: (res) => {
							// 		this.account = res.data.account
							// 		this.password = res.data.password
							// 		this.login()									
							// 	}
							// })
							console.log("valuatePage >>> submit valuateName:::  ", this.valuateName)
							uni.setStorage({
								key: "valuateResult-" + this.valuateName,
								data: res.data
							})
							this.$Router.push({name: "valuateResult", params: { valuateName: this.valuateName }})
							
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("valuatePage >> submit res::: ", res)
					}
				})
			},
			chooseAnswer(event) {
				let value = event.target.value
				let arr = value.split("-")
				
				this.answerObj[arr[1]] = arr[0]
				
				console.log("valuatePage >> chooseAnswer:: ", this.answerObj)
			},
			getValuatingQuestions() {
				uni.request({
					url: this.apiHost + "/common/auth/vip/valuating/question",
					method: "GET",
					header: {
						Cookie: this.token
					},
					data: {
						valuating_id: this.valuating_id
					},
					success: res => {
						if (res.statusCode == 200) {
							this.questionList = res.data							
						}else {
							this.showMessage = true
							this.statusCode = res.statusCode
						}
						console.log("valuatePage >> getValuatingQuestions res::: ", res)
					}
				})
			}
		},
		onLoad() {
			this.valuating_id = this.$Route.query.valuating_id
			this.valuateName = this.$Route.query.valuateName
			console.log("valuatePage >> onLoad valuating_id: , valuateName: ", this.valuating_id, this.valuateName)
			this.getValuatingQuestions()
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
	.module-wrapper {
		padding: 20rpx 10rpx;
		
		.question-wrapper {
			display: flex;
			flex-flow: row nowrap;
			padding: 0 20rpx;
			.label {
				margin: 0 20rpx 0 40rpx;
			}
			.desc {
				color: #333;
			}
		}
	}
</style>
