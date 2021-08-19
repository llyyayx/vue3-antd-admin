<template>
  <div class="layout__header">
    <div class="header__left">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="$emit('update:collapsed', !collapsed)"
      />
      <menu-fold-outlined v-else class="trigger" @click="$emit('update:collapsed', !collapsed)" />
      <div class="group__tabs">
        <a-tabs :activeKey="activeKey" @tabClick="tabClick">
          <a-tab-pane v-for="item in routers" :key="item.id" :tab="item.name" />
        </a-tabs>
      </div>
    </div>
    <div class="header__right">
      <a-dropdown :trigger="['click', 'hover']">
        <div class="header__avatar">
          <a-avatar>
            <template #icon>
              <img :src="avatar" v-if="avatar.length > 0" />
              <img src="@/assets/layout/avatar.png" v-else />
            </template>
          </a-avatar>
          <div class="header__avatar-name">{{ name.length > 0 ? name : 'admin' }}</div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="logout()">
              <template #icon><a-icon type="PoweroffOutlined" /></template>
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import storage from 'store'
import router from '@/router'
import { mapState, useStore } from 'vuex'
import aIcon from '@/components/aicon/aicon.vue'
import { defineComponent, watch, computed, onBeforeMount } from "vue"
import { RouterObj, RouterTable } from '@/types/api/login'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'layoutHeader',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    aIcon
  },
  computed: {
    ...mapState({
      name: (state: any) => state.user.name,
      avatar: (state: any) => state.user.avatar,
      routers: (state: any) => state.user.routers
    })
  },
  emits: ['update:collapsed'],
  props: {
    collapsed: {
      required: true,
      type: Boolean
    }
  },
  setup() {

    const store = useStore()

    const activeKey = computed(() => store.state.menu.menuId)

    // 退出登录
    const logout = () => {
      store.commit('user/logout')
      router.push('/login')
    }

    // 切换tab
    const tabClick = (e: number) => {
      const routers = store.state.user.routers
      let menuRouter: RouterTable = []
      routers.forEach((item: RouterObj) => {
        if (item.id === e) {
          menuRouter = item.children || []
        }
      })
      store.commit('menu/setMenu', menuRouter)
      store.commit('menu/setId', e)
    }

    watch(activeKey, () => {
      tabClick(activeKey.value)
    })
    
    onBeforeMount(() => {
      tabClick(activeKey.value)
    })

    return { logout, tabClick, activeKey }

  }
})
</script>
<style lang="scss" scoped>
.layout__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px;
  font-size: 20px;
  & .header__left {
    display: flex;
    align-items: center;
    flex-grow: 1;
    & .group__tabs {
      margin-left: 22px;
      margin-right: 22px;
      flex-grow: 1;
    }
  }

  & .header__right {
    display: flex;
    align-items: center;
    & .header__avatar {
      display: flex;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;
      & .header__avatar-name {
        margin-left: 6px;
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }
}
</style>
<style lang="scss">
.layout__header {
  & .header__left {
    & .ant-tabs-bar {
      margin: 0;
      border: none;
    }
  }
}
</style>