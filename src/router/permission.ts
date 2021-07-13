import { Router } from 'vue-router'
import { whiteList } from './basics.router'
import storage from 'store'

const loginPath = '/login'
const defultPath = '/'

// 权限验证

export const permission = (router: Router) => {

  router.beforeEach((to, from, next) => {

    if (storage.get('token')) {

      if (to.path === loginPath) {
        next({ path: defultPath })
      } else {
        next()
      }

    } else {

      if (whiteList.includes(to.path)) {
        next()
      } else {
        next({ path: loginPath, query: { redirect: to.fullPath } })
      }
  
    }
    
  })

}
