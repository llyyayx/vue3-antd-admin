import storage from 'store'
import type { RouteRecordRaw, Router } from 'vue-router'
import { whiteList } from './basics.router'
import { useUserStoreWithOut } from '@/store/modules/user'

const loginPath = '/login'
const defultPath = '/'

// 权限验证

export const permission = (router: Router) => {
  router.beforeEach((to, from, next) => {
    if (storage.get('token')) {
      if (to.path === loginPath) {
        next({ path: defultPath })
      }
      else {
        const userStore = useUserStoreWithOut()
        if (userStore.name.length === 0) {
          userStore.userInfo().then(() => {
            userStore.menu().then((e) => {
              e.forEach((item) => {
                router.addRoute(item as unknown as RouteRecordRaw)
              })
              router.addRoute({ path: '/:pathMatch(.*)*', redirect: '/404' })
              const redirect = from.query.redirect as string | undefined
              if (redirect && to.fullPath === redirect)
                next({ ...to, replace: true })
              else
                next({ ...to })
            })
          }).catch(() => {
            storage.remove('token')
            next({ path: loginPath, query: { redirect: to.fullPath } })
          })
        }
        else {
          next()
        }
      }
    }
    else {
      if (whiteList.includes(to.path))
        next()
      else
        next({ path: loginPath, query: { redirect: to.fullPath } })
    }
  })
}
