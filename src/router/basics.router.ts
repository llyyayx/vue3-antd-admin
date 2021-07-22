import { RouteRecordRaw } from 'vue-router'

// 基础路由

export const constantRouterMap: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('/src/views/login/login.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('/src/layout/index.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('/src/errorPages/403.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('/src/errorPages/404.vue')
  },
  {
    path: '/500',
    name: '500',
    component: () => import('/src/errorPages/500.vue')
  }
]


// 白名单(路径)

export const whiteList = ['/login', '/403', '/404', '/500']