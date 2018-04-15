import Vue from 'vue/dist/vue.esm'
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
