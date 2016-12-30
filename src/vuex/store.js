import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  balls: [
    {show: false},
    {show: false},
    {show: false},
    {show: false},
    {show: false}
  ],
  dropBalls: []
}

const mutations = {
  INCREMENT: (state, amount) => {
    state.count = state.count + amount
  },
  DROP: (state, target) => {
    let balls = state.balls
    for (let i = 0; i < balls.length; i++) {
      let ball = balls[i]
      if (!ball.show) {
        let el = target
        ball.show = true
        ball.el = el
        state.dropBalls.push(ball)
        return
      }
    }
  }
}
const actions = {
  incrementCounter({commit}) {
    commit('INCREMENT', 1)
  },
  drop({commit}, target) {
    commit('DROP', target)
  }
}

const getters = {
  getCount(state) {
    return state.count
  },
  getBalls(state) {
    return state.balls
  },
  getDropBalls(state) {
    return state.dropBalls
  }
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
