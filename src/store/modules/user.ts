import { defineStore } from 'pinia'
import storage from 'store'
import { message } from 'ant-design-vue'
import { useMenuStore } from './menu'
import { store } from '@/store'
import type { RouterTable } from '@/types/api/login'
import type { LoginFrom } from '@/types/views/login'
import { info, login, logout, menu } from '@/api/login'
import { generator } from '@/utils/parsingRouter'

// 处理用户登录、登出、个人信息、权限路由

export interface UserState {
  token: string
  name: string
  avatar: string
  roles: string[]
  routers?: RouterTable
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // 标识
    token: storage.get('token'),
    // 昵称
    name: '',
    // 头像
    avatar: '',
    // 角色(鉴权)
    roles: [],
    // 路由表(原始未解析)
    routers: [],
  }),
  getters: {
  },
  actions: {
    // 设置用户信息
    setInfo(info: UserState) {
      const { name, avatar, roles } = info
      this.name = name
      this.avatar = avatar
      this.roles = roles
    },

    // 设置路由表(原始未解析)
    setRouters(routers: RouterTable) {
      this.routers = routers
    },

    // 用户退出登录
    clearState() {
      storage.remove('token')
      // 为了重新加载用户信息及路由组
      this.name = ''
    },

    // 登录
    async login(params: LoginFrom) {
      return new Promise((resolve, reject) => {
        login(params).then((res) => {
          const { data } = res
          storage.set('token', data.token)
          this.token = data.token
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
      })
    },

    // 获取用户信息
    async userInfo() {
      return new Promise((resolve, reject) => {
        info().then((e) => {
          const info = e.data.info
          this.setInfo(info)
          resolve(e)
        }).catch((err) => {
          message.error(err.message || err.data.message)
          if (err.data && err.data.code !== -401)
            reject(err)
        })
      })
    },

    // 获取菜单
    async menu() {
      return new Promise((resolve) => {
        menu().then((e) => {
          const routeTable = e.data.data
          this.setRouters(routeTable)
          // 初始化侧边菜单
          const menuStore = useMenuStore()
          menuStore.setId(routeTable[0].id)
          menuStore.setMenu(routeTable[0].children || [])

          resolve(generator(routeTable))
        }).catch((err) => {
          message.error(err.message || err.data.message)
        })
      })
    },

    // 退出登录
    async logout() {
      return new Promise((resolve, reject) => {
        logout().then((e) => {
          this.clearState()
          resolve(e)
        }).catch((err) => {
          message.error(err.message || err.data.message)
          reject(err)
        })
      })
    },

  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
