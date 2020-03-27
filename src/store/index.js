import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  color: '#fb7299',
  historyDm: []
}
const mutations = {
  setColors (state, color) {
    state.color = color
  },
  setHistoryDm (state, dm) {
    state.historyDm.push(dm)
  }
}
const actions = {
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
