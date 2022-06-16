import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { permission } from './permission'
import { constantRouterMap } from './basics.router'

// 实例化路由
const router = createRouter({
  history: createWebHistory('/'),
  routes: constantRouterMap,
})

permission(router)

export default router
