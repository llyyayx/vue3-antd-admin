import { defineStore } from 'pinia'
import { store } from '@/store'
import { constantRouterMap } from '@/router/basics.router'
import router from '@/router'


// tabs栏

export interface TabItem {
  title: string
  fullPath: string
  name?: string
}
export interface TabState {
  tabList: TabItem[]
}

export const useTabsStore = defineStore({
  id: 'app-tabs',
  state: (): TabState => ({
    tabList: [],
  }),
  getters: {
  },
  actions: {
    /**
     * @desc: 添加tab
     * @param { TabItem } item
     */
    steList(item: TabItem) {
      const tabList = this.tabList
      let result = true

      // 防止固定路由
      for (let m = 0; m < constantRouterMap.length; m++) {
        if (constantRouterMap[m].name === item.name) {
          result = false
          break
        }
      }

      // 防止重复添加
      for (let i = 0; i < tabList.length; i++) {
        if (tabList[i].fullPath === item.fullPath) {
          result = false
          break
        }
      }

      // 防止添加不存在的路由
      if (!router.hasRoute(item.name || ''))
        result = false

      if (result) tabList.push(item)
    },

    /**
   * @desc: 删除tab
   * @param { string } key tabkey
   */
    delList(key: string) {
      const tabList = this.tabList
      const route = router.currentRoute.value

      if (tabList.length <= 1)
        return

      for (let i = 0; i < tabList.length; i++) {
        if (tabList[i].fullPath === key) {
          if (route.fullPath === key) {
            if (tabList.length - 1 === i)
              router.push(tabList[i - 1].fullPath)

            else
              router.push(tabList[i + 1].fullPath)
          }
          tabList.splice(i, 1)
          break
        }
      }
    },

    /**
   * @desc: 删除右侧
   * @param { number } index 选择tab序号
   */
    delRight(index: number) {
      const tabList = this.tabList
      const route = router.currentRoute.value
      let current = 0

      if (tabList.length <= 1 || tabList.length - 1 === index)
        return

      for (let i = 0; i < tabList.length; i++) {
        if (tabList[i].fullPath === route.fullPath) {
          current = i
          break
        }
      }

      if (index < current)
        router.push(tabList[index].fullPath)

      tabList.splice(index + 1, tabList.length - 1)
    },

    /**
   * @desc: 删除左侧
   * @param { number } index 选择tab序号
   */
    delLeft(index: number) {
      const tabList = this.tabList
      const route = router.currentRoute.value
      let current = 0

      if (tabList.length <= 1 || index === 0)
        return

      for (let i = 0; i < tabList.length; i++) {
        if (tabList[i].fullPath === route.fullPath) {
          current = i
          break
        }
      }

      if (index > current)
        router.push(tabList[index].fullPath)

      tabList.splice(0, index)
    },

    /**
   * @desc: 删除其他
   * @param { number } index 选择tab序号
   */
    delOther(index: number) {
      router.push(this.tabList[index].fullPath)
      this.tabList = [this.tabList[index]]
    },
  },
})

// Need to be used outside the setup
export function useTabsStoreWithOut() {
  return useTabsStore(store)
}
