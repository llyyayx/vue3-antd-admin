import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import '@/assets/css/reset.css'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './router'
import store from './store'
import { globalAxios } from './request'

const app = createApp(App)

// 使用antd
app.use(Antd)

// 使用全局axios
app.use(globalAxios)

// 使用vuex
app.use(store)

// 使用路由
app.use(router)

router.isReady().then(() => app.mount('#app'))
