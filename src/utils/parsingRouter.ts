import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import BasicLayout from '@/layout/index.vue'
import type { RouterTable } from '@/types/api/login'
import { RouterObj } from '@/types/api/login'
import RouteView from '@/layout/routerView/routerView.vue'

const modules = import.meta.glob('/src/views/**/*.vue')

/**
 * @desc: 解析路由
 * @param { Array } routerMap 后台返回的路由表
 * @param { Object } 可选 路由对象
 * @return 返回RouteRecordRaw
 */
export const generator = (routerMap: RouterTable, parent?: RouteRecordRaw) => {
  interface basic {
    BasicLayout: Component
    RouteView: Component
  }
  const constantRouterComponents: basic = { BasicLayout, RouteView }
  return routerMap.map((item) => {
    const currentRouter: RouteRecordRaw = {
      path: item.path || `${parent && parent.path || ''}/${item.key}`,
      name: item.key || '',
      component: (constantRouterComponents[item.component || item.key]) || (modules[`/src/views${item.component}.vue`]),
      meta: {
        id: item.id,
        title: item.name,
        keepAlive: item.keepAlive || false,
        hidden: item.hidden || false,
      },
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    if (!currentRouter.path.startsWith('http'))
      currentRouter.path = currentRouter.path.replace('//', '/')

    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0)
      currentRouter.children = generator(item.children, currentRouter)

    return currentRouter
  })
}
