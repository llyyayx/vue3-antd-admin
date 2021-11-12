<template>
  <a-tabs
    v-model:activeKey="activeKey"
    type="editable-card" 
    :tabBarGutter="6" 
    @tabClick="jump"
    @edit="deltab"
    hide-add
    class="tabs__view"
  >
    <a-tab-pane :key="item.fullPath" v-for="(item, index) in tabList">
      <template #tab>
        <a-dropdown :trigger="['contextmenu']">
          <div style="display: inline-block">{{ item.title }}</div>
          <template #overlay>
            <a-menu @click="condition(item, index, $event)">
              <a-menu-item key="current">关闭当前标签</a-menu-item>
              <a-menu-item key="right">关闭右侧</a-menu-item>
              <a-menu-item key="left">关闭左侧</a-menu-item>
              <a-menu-item key="other">关闭其他</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tab-pane>
  </a-tabs>
  <div class="main__container">
    <router-view v-slot="{ Component }">
      <keep-alive :include="includeList">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts">
import { mapState, useStore } from 'vuex'
import { TabItem } from '@/store/modules/tabs'
import { defineComponent, watch, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router'
export default defineComponent({
  name: 'layoutTabs',
  computed: {
    ...mapState({
      tabList: (state: any) => state.tabs.tabList as TabItem[],
      includeList: (state: any) => state.keepAlive.includeList
    })
  }, 
  setup () {

    // 激活的tab
    let activeKey = ref<string>()

    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    
    // 添加tab方法
    const addTab = (data: RouteLocationNormalizedLoaded) => {
      store.commit('tabs/steList', {
        fullPath: data.fullPath,
        name: data.name,
        title: data.meta.title
      })
    }

    // 设置路由缓存(白)名单方法
    const setKeepAlive = (data: RouteLocationNormalizedLoaded) => {
      if (data.meta.keepAlive) {
        store.commit('keepAlive/setKeepAlive', data.name as string)
      }
    }

    watch(route, to => {
      addTab(to)
      setKeepAlive(to)
      activeKey.value = to.fullPath
    })

    onBeforeMount(() => {
      addTab(route)
      setKeepAlive(route)
      activeKey.value = route.fullPath
    })

    /**
     * @desc：tab点击
     * @param { string } targetKey 点击的tabKey
     */
    const jump = (targetKey: string) => {
      if (route.fullPath !== targetKey) {
        router.push(targetKey)
      } 
    }

    /**
     * @desc：删除tab
     * @param { string } targetKey 点击的tabKey
     * @param { string } action 事件类型
     */
    const deltab = (targetKey: string, action: string) => {
      if (action === 'remove') {
        store.commit('tabs/delList', targetKey)
      }
    }

    /**
     * @desc: 条件删除
     * @param { TabItem } tab tab对象
     * @param { number } index 序号
     */
    const condition = (tab: TabItem, index: number, item: any) => {
      switch (item.key) {
        case 'current': store.commit('tabs/delList', tab.fullPath); break;
        case 'right': store.commit('tabs/delRight', index); break;
        case 'left': store.commit('tabs/delLeft', index); break;
        case 'other': store.commit('tabs/delOther', index); break;
      }
    }

    return { activeKey, jump, deltab, condition }
    
  }

})
</script>
<style lang="scss" scoped>
 .main__container {
  background-color: #FFF;
  min-height: 280px;
  overflow: hidden;
}
</style>
<style lang="scss">
.tabs__view {
  & .ant-tabs-tab {
    user-select: none;
    padding: 0 16px 0 0 !important;
    & .ant-dropdown-trigger {
      padding-left: 16px;
    }
  }
  & .ant-tabs-bar {
    margin: 0 0 8px 0;
  }
  & .ant-tabs-tab-active {
    font-weight: normal;
    border-bottom: 1px solid #f0f0f0 !important;
  }
}
</style>