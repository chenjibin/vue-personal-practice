import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0

}

const mutations = {
  INCREMENT (state, amount) {
    state.count = state.count + amount
  }
}
const actions = {
  incrementCounter({commit}) {
    commit('INCREMENT', 1)
  }
}

const getters = {
  getCount(state) {
    return state.count
  }
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
