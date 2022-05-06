<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="includeList">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>


<script lang="ts">
export default {
  name: 'layoutView',
};
</script>

<script lang="ts" setup>
import { useKeepAliveStore } from '@/store/modules/keepAlive'
const keepAliveStore = useKeepAliveStore()

const includeList = computed(() => keepAliveStore.includeList)
</script>
