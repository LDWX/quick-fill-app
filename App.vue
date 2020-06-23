<script>
export default {
	onLaunch: function() {
		// let accountInfo = {}
		// uni.getStorage({
		// 	key: 'accountInfo',
		// 	success: (res) => {
		// 		this.accountInfo = res.data
		// 	}
		// })
		// uni.clearStorage()
		
		// uni.setStorage({
		// 	key: "accountInfo",
		// 	data: accountInfo
		// })
		// console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style >	
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}
	/* #endif */
/* 	@import "@/assets/lib/iconfont/iconfont.css";
	@import "@/assets/scss/test.scss"; */
	
</style>
