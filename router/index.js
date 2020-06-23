import modules from './modules/index.js'
import Vue from 'vue'

import Router from 'uni-simple-router'

Vue.use(Router)

const router = new Router({
	routes: [...modules]
})

export default router;