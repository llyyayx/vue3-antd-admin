<template>
  <a-config-provider :locale="zhCN" :get-popup-container="getPopupContainer">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup name="App">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

function getPopupContainer(el: any, dialogContext: any) {
  if (dialogContext)
    return dialogContext.getDialogWrap()
  else
    return document.body
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>
