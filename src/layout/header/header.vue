<template>
  <div class="layout__header">
    <div class="header__left">
      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="$emit('update:collapsed', !collapsed)" />
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
              <img :src="userStore.avatar" v-if="userStore.avatar.length > 0" />
              <img src="@/assets/layout/avatar.png" v-else />
            </template>
          </a-avatar>
          <div class="header__avatar-name">{{ userStore.name.length > 0 ? userStore.name : 'admin' }}</div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="logout()">
              <template #icon>
                <a-icon type="PoweroffOutlined" />
              </template>
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'layoutHeader',
};
</script>

<script lang="ts" setup>
import aIcon from '@/components/aicon/aicon.vue'
import { defineComponent, watch, computed, onBeforeMount } from "vue"
import { RouterObj, RouterTable } from '@/types/api/login'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/store/modules/user'
import { useMenuStore } from '@/store/modules/menu'

defineProps({
  collapsed: {
    required: true,
    type: Boolean
  }
});
defineEmits(['update:collapsed']);

const userStore = useUserStore()
const menuStore = useMenuStore()
const router = useRouter()


const activeKey = computed(() => menuStore.menuId)
const routers = computed(() => {
  const array: any[] = []
  userStore.routers?.forEach((item: any) => { if (!item.hidden) array.push(item) })
  return array
})

// 退出登录
const logout = async () => {
  await userStore.logout()
  router.push('/login')
}
// 切换tab
const tabClick = (active: any) => {
  const routers = userStore.routers || []
  let menuRouter: RouterTable = []
  routers.forEach((item: RouterObj) => {
    if (item.id === active)
      menuRouter = item.children || []
  })

  menuStore.setId(active)
  menuStore.setMenu(menuRouter)
}

watch(activeKey, () => {
  tabClick(activeKey.value)
})

onBeforeMount(() => {
  tabClick(activeKey.value)
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

    & :deep(.ant-tabs-nav::before) {
      display: none;
    }

    & :deep(.ant-tabs-nav) {
      margin-bottom: 0;
    }

    & .group__tabs {
      width: 500px;
      margin-left: 22px;
      margin-right: 22px;
      flex-grow: 1;
    }
  }

  & .header__right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    flex-grow: 0;

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
