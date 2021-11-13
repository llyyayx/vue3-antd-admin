<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="includeList">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script lang="ts">
import { mapState } from 'vuex'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'layoutView',
  computed: {
    ...mapState({
      includeList: (state: any) => state.keepAlive.includeList
    })
  }
})
</script>