import { App } from 'vue'
import { AxiosInstance  } from 'axios'

// 全局注册axios -> this.$axios

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

export const regAxios = {
  install (app: App, request: AxiosInstance) {
    Object.defineProperties(app.config.globalProperties, {
      $axios: {
        get: function get () {
          return request
        }
      }
    })
  }
}