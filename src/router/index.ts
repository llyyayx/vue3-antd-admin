import { App } from 'vue'
import { permission } from './permission'
import { constantRouterMap } from './basics.router'
import { createRouter, createWebHistory } from 'vue-router'


// 实例化路由
const router = createRouter({
  history: createWebHistory('/talent'),
  routes: constantRouterMap
})

permission(router)

export default router