import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    toastMsg: null
  },
  getters: {
    getterToastMsg: state => state.toastMsg
  },
  mutations: {
    SET_TOAST_MSG: (state, payload) => {
      state.toastMsg = payload
    }
  }
})

export default store
