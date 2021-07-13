import { ActionContext } from 'vuex'
import { IndexState } from '../index'
import storage from 'store'
import { LoginFrom } from '@/types/views/login'
import { loginSuccess, loginError } from '@/types/api/login'
import { login } from '@/api/login'

// 处理用户登录、登出、个人信息、权限路由

export type UserState = {
  token: string,
  name: string,
  avatar: string,
  roles: string[]
}

const state: UserState = {
  // 标识
  token: storage.get('token'),
  // 昵称
  name: '',
  // 头像
  avatar: '',
  // 角色(鉴权)
  roles: []
}

const user = {

  namespaced: true,

  state,

  mutations: {

    // 设置token
    setToken (state: UserState, token: string) {
      state.token = token
    },
    
    // 设置用户信息
    setInfo (state: UserState, info: UserState) {
      state = info
    }
  
  },

  actions: {

    // 登陆
    login (context: ActionContext<UserState, IndexState>, params: LoginFrom) {
      return new Promise((resolve, reject) => {
        login(params).then(e => {
          const data: loginSuccess = e.data
          storage.set('token', data.token)
          context.commit('setToken', data.token)
          resolve(data) 
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 获取用户信息
    userInfo (context: ActionContext<UserState, IndexState>) {
      return new Promise((resolve, reject) => {
        if (context.state.token) {
          const userInfo = {
            name: '赛罗奥特曼',
            avatar: 'http://img.duoziwang.com/2018/17/05282053232079.jpg',
            roles: ['admin'],
            token: context.state.token
          }
        } else {
          reject({code: -60, message: '请重新登陆'})
        }
      })
    }

  }

}

export default user