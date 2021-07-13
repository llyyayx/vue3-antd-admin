import { createStore } from 'vuex'
import { App } from 'vue'
import user from './modules/user'

export type IndexState = {
  count: number
}

const state: IndexState = {
  count: 1
}

// 实例化
const store = createStore({

  state,

  mutations: {
    increment (state: IndexState) {
      state.count++
    }
  },

  modules: {
    user
  }

})

export default store
