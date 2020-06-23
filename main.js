import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import Router, { RouterMount } from 'uni-simple-router';
import store from './store/index.js';


Vue.config.productionTip = false
Vue.use(Router)

Vue.prototype.apiHost = "http://39.97.104.130:8080"

App.mpType = 'app'

const app = new Vue({
	...App,
	router,
	store
})
// app.$mount()

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	// RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
