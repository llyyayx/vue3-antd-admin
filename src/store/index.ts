import { createStore, ModuleTree } from 'vuex'
import user, { UserState } from './modules/user'
import tabs, { TabState } from './modules/tabs'
import menu, { menuState } from './modules/menu'

export interface AllState {
  user: UserState,
  tabs: TabState,
  menu: menuState
}


// 实例化
const store = createStore<AllState>({

  modules: {
    user,
    tabs,
    menu
  }

})

export default store
