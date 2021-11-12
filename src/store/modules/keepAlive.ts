// 路由缓存(白)名单

export type keepAliveState = {
  includeList: string[]
}

const state: keepAliveState = {
  // 需缓存路由名称
  includeList: []
}

const keepAlive = {

  namespaced: true,

  state,

  mutations: {

    setKeepAlive (state: keepAliveState, routeName: string) {
      if (routeName && !state.includeList.includes(routeName)) {
        state.includeList.push(routeName)
      }
    }

  }

}

export default keepAlive