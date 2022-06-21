import { createRouter, createWebHistory } from 'vue-router'
import { permission } from './permission'
import { constantRouterMap } from './basics.router'
// import { initFrontendRouter } from './util'

/** 是否开启后端控制路由 */
// export const isBackend = true
export const isBackend = false

// 实例化路由
const router = createRouter({
  history: createWebHistory('/'),
  routes: constantRouterMap,
})

permission(router)

// if (!isBackend)
// initFrontendRouter(router)

export default router

