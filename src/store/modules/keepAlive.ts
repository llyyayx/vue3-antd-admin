import { defineStore } from 'pinia'
import { store } from '@/store'

// 侧边菜单

export interface keepAliveState {
  includeList: string[]
}

export const useKeepAliveStore = defineStore({
  id: 'app-keepAlive',
  state: (): keepAliveState => ({
    // 需缓存路由名称
    includeList: [],
  }),
  getters: {
  },
  actions: {
    setKeepAlive(routeName: string) {
      if (routeName && !this.includeList.includes(routeName))
        this.includeList.push(routeName)
    },
  },
})

// Need to be used outside the setup
export function useKeepAliveStoreWithOut() {
  return useKeepAliveStore(store)
}
