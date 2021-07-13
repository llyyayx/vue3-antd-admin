import { createRouter, createWebHistory } from 'vue-router'
import { App } from 'vue'
import { constantRouterMap } from './basics.router'
import { permission } from './permission'

// 实例化路由
const router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap
})

permission(router)

export default router