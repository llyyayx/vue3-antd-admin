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
        <layoutTabs />
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
  }
}
</style>