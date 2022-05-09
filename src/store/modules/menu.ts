import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { store } from '@/store'

// 侧边菜单

export interface menuState {
  menuRouter: RouteRecordRaw[]
  menuTabName: string
}

export const useMenuStore = defineStore({
  id: 'app-menu',
  state: (): menuState => ({
    // 侧边菜单
    menuRouter: [],
    // 顶层id(栏目)
    menuTabName: '',
  }),
  getters: {
  },
  actions: {
    setMenu(routers: RouteRecordRaw[]) {
      this.menuRouter = routers
    },

    setMenuTab(name: string) {
      this.menuTabName = name
    },

  },
})

// Need to be used outside the setup
export function useMenuStoreWithOut() {
  return useMenuStore(store)
}
