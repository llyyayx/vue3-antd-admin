import { defineStore } from 'pinia'
import storage from 'store'
import { message } from 'ant-design-vue'
import type { RouteRecordRaw } from 'vue-router'
import { useMenuStoreWithOut } from './menu'
import { store } from '@/store'
import type { LoginFrom } from '@/types/views/login'
import { info, login, logout, menu } from '@/api/login'
import { generator } from '@/utils/parsingRouter'
import { isBackend } from '@/router'
import { setFilterHasRolesMenu } from '@/router/util'
import { dynamicRouterMap } from '@/router/basics.router'

// 处理用户登录、登出、个人信息、权限路由

export interface UserState {
  token: string
  name: string
  avatar: string
  roles: string[]
  routers?: RouteRecordRaw[]
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
    // 路由表
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

    // 设置路由表
    setRouters(routers: RouteRecordRaw[]) {
      this.routers = routers
    },

    // 用户退出登录
    clearState() {
      storage.remove('token')
      // 为了重新加载用户信息及路由组
      this.name = ''
      this.routers = []
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
        // 判断是否是后端控制路由
        if (isBackend) {
          menu().then((e) => {
            const routeTable = e.data.data
            const generatoredRouter = generator(routeTable)
            this.setRouters(generatoredRouter)

            // 初始化侧边菜单
            const menuStore = useMenuStoreWithOut()
            menuStore.setMenuTab(generatoredRouter[0].name as string)
            menuStore.setMenu(generatoredRouter[0].children || [])

            resolve(generator(routeTable))
          }).catch((err) => {
            message.error(err.message || err.data.message)
          })
        }
        else {
          const routes = setFilterHasRolesMenu(dynamicRouterMap, this.roles)
          this.setRouters(routes)

          // 初始化侧边菜单
          const menuStore = useMenuStoreWithOut()
          menuStore.setMenuTab(routes[0].name as string)
          menuStore.setMenu((routes[0].children as any) || [])

          resolve(routes)
        }
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
