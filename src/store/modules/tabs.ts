import router from '@/router'
import { constantRouterMap } from '@/router/basics.router'

// tabs栏

export interface TabItem {
  title: string,
  path: string,
  name?: string
}

export type TabState = {
  tabList: TabItem[]
}

const state: TabState = {
  tabList: []
}

const tabs = {

  namespaced: true,

  state,

  mutations: {

    /**
     * @desc: 添加tab
     * @param { TabItem } item
     */
    steList (state: TabState, item: TabItem) {

      const tabList = state.tabList
      let result = true

      // 防止固定路由
      for (let m = 0; m < constantRouterMap.length; m++) {
        if (constantRouterMap[m]['name'] === item.name) {
          result = false
          break 
        }
      }

      // 防止重复添加
      for (let i = 0; i < tabList.length; i++) {
        if ( tabList[i]['path'] === item.path ) {
          result = false
          break
        }
      }

      // 防止添加不存在的路由
      if (!router.hasRoute(item.name || '')) {
        result = false
      }

      if (result) tabList.push(item)

    },

    /**
     * @desc: 删除tab
     * @param { string } key tabkey
     */
    delList (state: TabState, key: string) {

      const tabList = state.tabList
      const route = router.currentRoute.value

      if (tabList.length <= 1) {
        return
      }

      for (let i = 0; i < tabList.length; i++) {
        if (tabList[i]['path'] === key) {
          if (route.path === key) {
            if (tabList.length-1 === i) {
              router.push(tabList[i-1]['path'])
            } else {
              router.push(tabList[i+1]['path'])
            }
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
    delRight (state: TabState, index: number) {

      const tabList = state.tabList
      const route = router.currentRoute.value
      let current = 0

      if (tabList.length <= 1 || tabList.length-1 === index) {
        return
      }

      for(let i = 0; i < tabList.length; i++) {
        if (tabList[i]['path'] === route.path) {
          current = i
          break
        }
      }

      if (index < current) {
        router.push(tabList[index]['path'])
      }

      tabList.splice(index + 1, tabList.length-1)

    },

    /**
     * @desc: 删除左侧
     * @param { number } index 选择tab序号
     */
     delLeft (state: TabState, index: number) {

      const tabList = state.tabList
      const route = router.currentRoute.value
      let current = 0

      if (tabList.length <= 1 || index === 0) {
        return
      }

      for(let i = 0; i < tabList.length; i++) {
        if (tabList[i]['path'] === route.path) {
          current = i
          break
        }
      }

      if (index > current) {
        router.push(tabList[index]['path'])
      }

      tabList.splice(0, index)

    },

    /**
     * @desc: 删除其他
     * @param { number } index 选择tab序号
     */
    delOther (state: TabState, index: number) {
      router.push(state.tabList[index]['path'])
      state.tabList = [state.tabList[index]]
    }
  }

}

export default tabs