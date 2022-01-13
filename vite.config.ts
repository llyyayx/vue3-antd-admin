import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://lelebk.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
