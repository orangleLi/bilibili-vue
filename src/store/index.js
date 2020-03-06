import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  color: '#fb7299'
}
const mutations = {
  setColors (state, color) {
    state.color = color
    console.log(color)
  }
}
const actions = {
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
