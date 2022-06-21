import type { RouteRecordRaw } from 'vue-router'

// 基础路由

export const constantRouterMap: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('/src/views/login/login.vue'),
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('/src/layout/index.vue'),
  },
  {
    path: '/403',
    name: '403',
    component: () => import('/src/errorPages/403.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('/src/errorPages/404.vue'),
  },
  {
    path: '/500',
    name: '500',
    component: () => import('/src/errorPages/500.vue'),
  },
]

/** 动态路由 */
export const dynamicRouterMap: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    component: () => import('/src/layout/index.vue'),
    redirect: '/element/icon',
    meta: {
      title: '组件',
      keepAlive: false,
      hidden: false,
    },
    children: [
      {
        path: '/element',
        name: 'element',
        redirect: '/element/icon',
        component: () => import('/src/layout/routerView/routerView.vue'),
        meta: {
          title: '组件',
        },
        children: [
          {
            path: '/element/icon',
            name: 'icon',
            component: () => import('/src/views/element/icon.vue'),
            meta: {
              title: 'icon',
              keepAlive: false,
              hidden: false,
            },
          },
        ],
      },
    ],
  },
  {
    name: 'lan',
    path: '/update',
    redirect: '/update/issue',
    component: () => import('/src/layout/index.vue'),
    meta: {
      title: '更新日志',
      keepAlive: false,
      hidden: false,
    },
  },
]

// 白名单(路径)

export const whiteList = ['/login', '/403', '/404', '/500']
