import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalAxios } from './request'

import '@unocss/reset/tailwind.css'
import 'uno.css'


const app = createApp(App)


// 使用全局axios
app.use(globalAxios)

// 使用vuex
app.use(store)

// 使用路由
app.use(router)

router.isReady().then(() => app.mount('#app'))
