<template>
  <div class="menu__logo">
    <div class="menu__logo-icon">
      <img src="@/assets/layout/logo.svg">
    </div>
    <span v-show="!collapsed">通用后台</span>
  </div>
  <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" :theme="theme" mode="inline">
    <create v-for="item in menuRouter" :key="item.name" :router="item" />
  </a-menu>
</template>

<script lang="ts" setup name="layoutMenu">
import { useRoute } from 'vue-router'
import create from './menu-create'
import aIcon from '@/components/aicon/aicon.vue'
import { useMenuStore } from '@/store/modules/menu'
defineProps({
  collapsed: {
    required: true,
    type: Boolean,
  },
})

const theme = inject('theme')
const menuStore = useMenuStore()
const route = useRoute()
const selectedKeys = ref<string[]>([])
const openKeys = ref<string[]>([])
const menuRouter = computed(() => {
  return menuStore.menuRouter
})
const setMenuKey = () => {
  if (!route.meta.hidden) {
    selectedKeys.value = [route.name as string]
    openKeys.value = []
    route.matched.forEach((item) => {
      openKeys.value.push(item.name as string)
    })
    // 设置顶部tab(栏目)切换
    menuStore.setMenuTab((route.matched[0].name as string))
  }
}

onBeforeMount(setMenuKey)
watch(route, setMenuKey)
</script>

<style lang="scss" scoped>
.menu__logo {
  display: flex;
  align-items: center;
  padding-left: 24px;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;

  & .menu__logo-icon {
    width: 32px;

    margin-right: 8px;

    img {
      display: block;
      width: 100%;

    }
  }

  & span {
    display: inline-block;
    font-size: 20px;
    color: #fff;

  }
}
</style>
