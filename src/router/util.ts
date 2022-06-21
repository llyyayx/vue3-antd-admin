import type { Router, RouteRecordRaw } from 'vue-router'
import storage from 'store'
import { dynamicRouterMap } from './basics.router'
import { useUserStoreWithOut } from '@/store/modules/user'

export async function initFrontendRouter(router: Router) {
  const userStore = useUserStoreWithOut()
  if (!storage.get('token'))
    return false

  if (userStore.name.length === 0)
    await userStore.userInfo()

  const routes = setFilterHasRolesMenu(dynamicRouterMap, userStore.roles)

  routes.forEach((item) => {
    const name = item.name as string
    if (!router.hasRoute(name))
      router.addRoute(item)
  })
}

export function hasRoles(roles: string[], route: RouteRecordRaw) {
  if (route.meta && route.meta.roles)
    return roles.some((role: any) => (route.meta!.roles as string[]).includes(role))
  else return true
}

/**
 * 获取当前用户权限标识去比对路由表，设置递归过滤有权限的路由
 * @param routes 当前路由 children
 * @param roles 用户权限标识，在 userInfos（用户信息）的 roles（登录页登录时缓存到浏览器）数组
 * @returns 返回有权限的路由数组 `meta.roles` 中控制
 */
export function setFilterHasRolesMenu(routes: RouteRecordRaw[], roles: string[]) {
  const menu: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const item = { ...route }
    if (hasRoles(roles, item)) {
      if (item.children)
        item.children = setFilterHasRolesMenu(item.children, roles)
      menu.push(item)
    }
  })
  return menu
}
