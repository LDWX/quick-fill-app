const state = {
	token: ""
}

const mutations = {
	addToken(state, value) {
		state.token = value
	}
}

export default {
	namespaced: true,
	state,
	mutations
}