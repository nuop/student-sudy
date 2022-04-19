import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储登录用户的数据
    user: JSON.parse(window.localStorage.getItem('eduMobileUser') || null)
  },
  getters: {
  },
  mutations: {
    // 用于修改user
    setUser (state, payload) {
      // payload为请求到的用户数据，JSON格式，不方便操作
      // 转换为对象存储
      state.user = JSON.parse(payload)
      window.localStorage.setItem('eduMobileUser', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
