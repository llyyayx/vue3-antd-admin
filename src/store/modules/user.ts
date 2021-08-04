import storage from 'store'
import { AllState } from '../index'
import { ActionContext } from 'vuex'
import { message } from 'ant-design-vue'
import { LoginFrom } from '@/types/views/login'
import { RouterTable } from '@/types/api/login'
import { login, info, menu } from '@/api/login'
import { generator } from '@/utils/parsingRouter'

// 处理用户登录、登出、个人信息、权限路由

export type UserState = {
  token: string,
  name: string,
  avatar: string,
  roles: string[],
  routers?: RouterTable
}

const state: UserState = {
  // 标识
  token: storage.get('token'),
  // 昵称
  name: '',
  // 头像
  avatar: '',
  // 角色(鉴权)
  roles: [],
  // 路由表(原始未解析)
  routers: []
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
      const { name, avatar, roles } = info
      state.name = name
      state.avatar = avatar
      state.roles = roles
    },

    // 设置路由表(原始未解析)
    setRouters (state: UserState, routers: RouterTable) {
      state.routers = routers
    },

    // 用户退出登陆
    logout (state: UserState) {
      storage.remove('token')
      // 为了重新加载用户信息及路由组
      state.name = ''
    }
  
  },

  actions: {

    // 登陆
    login (context: ActionContext<UserState, AllState>, params: LoginFrom) {
      return new Promise((resolve, reject) => {
        login(params).then(e => {
          const data = e.data
          storage.set('token', data.token)
          context.commit('setToken', data.token)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 获取用户信息
    userInfo (context: ActionContext<UserState, AllState>) {
      return new Promise((resolve, reject) => {
        info().then(e => {
          const info = e.data.info 
          context.commit('setInfo', info)
          resolve(e)
        }).catch(err => {
          message.error(err.message || err.data.message)
          if (err.data && err.data.code !== -401) {
            reject(err)
          }
        })
      })
    },

    // 获取菜单
    menu (context: ActionContext<UserState, AllState>) {
      return new Promise((resolve) => {
        menu().then(e => {
          const routeTable = e.data.data
          context.commit('setRouters', routeTable)
          // 初始化侧边菜单
          context.rootState.menu.menuRouter = routeTable[0]['children'] || []
          context.rootState.menu.menuId = routeTable[0]['id']
          resolve(generator(routeTable))
        }).catch(err => {
          message.error(err.message || err.data.message)
        })
      })
    }

  }

}

export default user