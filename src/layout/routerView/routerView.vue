<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="includeList">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts" setup name="LayoutView">
import { useKeepAliveStore } from '@/store/modules/keepAlive'

const keepAliveStore = useKeepAliveStore()

const includeList = computed(() => keepAliveStore.includeList)
</script>

