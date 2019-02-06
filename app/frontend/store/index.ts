import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageLoading: false,
  },
  mutations: {
    setPageLoading: (state, v) => state.pageLoading = v,
  }
})
