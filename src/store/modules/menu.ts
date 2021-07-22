import { RouterTable } from '@/types/api/login'

// 侧边菜单

export type menuState = {
  menuRouter: RouterTable,
  // 顶层id(栏目)
  menuId: number
}

const state: menuState = {
  menuRouter: [],
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