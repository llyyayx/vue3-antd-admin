import { defineStore } from 'pinia'
import { store } from '@/store'
import type { RouterTable } from '@/types/api/login'

// 侧边菜单

export interface menuState {
  menuRouter: RouterTable
  menuId: number
}

export const useMenuStore = defineStore({
  id: 'app-menu',
  state: (): menuState => ({
    // 侧边菜单
    menuRouter: [],
    // 顶层id(栏目)
    menuId: 1,
  }),
  getters: {
  },
  actions: {
    setMenu(router: RouterTable) {
      this.menuRouter = router
    },

    setId(id: number) {
      this.menuId = id
    },

  },
})

// Need to be used outside the setup
export function useMenuStoreWithOut() {
  return useMenuStore(store)
}
