<template>
  <div class="menu__logo">
    <div class="menu__logo-icon">
      <img src="@/assets/layout/logo.svg" />
    </div>
    <span v-show="!collapsed">通用后台</span>
  </div>
  <a-menu
    theme="dark"
    mode="inline"
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
  >
    <create :router="item" v-for="item in menuRouter" :key="item.id" />
  </a-menu>
</template>
<script lang="ts">
import create from './menu-create'
import { useRoute } from 'vue-router'
import { mapState, useStore } from 'vuex'
import aIcon from '@/components/aicon/aicon.vue'
import { defineComponent, ref, watch, onBeforeMount } from "vue"
export default defineComponent({
  name: 'layoutMenu',
  computed: {
    ...mapState({
      menuRouter: (state: any) => state.menu.menuRouter
    })
  },
  components: {
    create,
    aIcon
  },
  props: {
    collapsed: {
      required: true,
      type: Boolean
    }
  },
  setup() {

    const store = useStore()
    const route = useRoute()
    const selectedKeys = ref<string[]>([])
    const openKeys = ref<string[]>([])

    const setMenuKey = () => {
      if (!route.meta.hidden) {
        selectedKeys.value = [route.name as string]
        openKeys.value = []
        route.matched.forEach(item => {
          openKeys.value.push(item.name as string)
        })
        // 设置顶部tab(栏目)切换
        store.commit('menu/setId', route.matched[0]['meta']['id'])
      }
    }

    onBeforeMount(setMenuKey)
    watch(route, setMenuKey)

    return { selectedKeys, openKeys }
    
  }
})
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