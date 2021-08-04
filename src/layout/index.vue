<template>
  <a-layout class="layout">

    <!-- 侧边 -->
    <a-layout-sider width="256" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <layout-menu :collapsed="collapsed" />
    </a-layout-sider>

    <a-layout>

      <!-- 头部 -->
      <a-layout-header class="header">
        <layout-header v-model:collapsed="collapsed" />
      </a-layout-header>

      <!-- 内容 -->
      <a-layout-content class="container">
        <layout-tabs />
      </a-layout-content>

    </a-layout>

  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import layoutMenu from './menu/menu.vue'
import layoutTabs from './tabs/tabs.vue'
import layoutHeader from './header/header.vue'
import aIcon from '@/components/aicon/aicon.vue'
export default defineComponent({
  name: 'layout',
  components: {
    layoutMenu,
    layoutHeader,
    layoutTabs,
    aIcon
  },
  setup() {
    const collapsed = ref<boolean>(false)
    return { collapsed }
  }
})
</script>
<style lang="scss" scoped>
.layout {
  overflow: hidden;
  height: 100vh;
  & .header {
    background-color: #FFF;
    padding: 0;
  }
  & .container {
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  & .container::-webkit-scrollbar {
    width: 6px;
  }
  & .container::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #C1C1C1;
  }
  & .container::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #ededed;
  }
}
</style>
<style lang="scss">
.layout {
  & .ant-layout-sider-children {
    overflow-y: auto;
    overflow-x: hidden;
  }
  & .ant-layout-sider-children::-webkit-scrollbar {
    width: 4px;
  }
  & .ant-layout-sider-children::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #535353;
  }
  & .ant-layout-sider-children::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #ededed;
  }
}
</style>