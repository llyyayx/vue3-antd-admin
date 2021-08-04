import { RouterTable } from '@/types/api/login'

// 侧边菜单

export type menuState = {
  menuRouter: RouterTable,
  menuId: number
}

const state: menuState = {
  // 侧边菜单
  menuRouter: [],
  // 顶层id(栏目)
  menuId: 1
}

const menu = {

  namespaced: true,

  state,

  mutations: {

    setMenu (state: menuState, router: RouterTable) {
      state.menuRouter = router
    },

    setId (state: menuState, id: number) {
      state.menuId = id
    }
    
  }

}

export default menu