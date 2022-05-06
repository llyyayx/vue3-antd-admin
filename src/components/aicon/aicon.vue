<template>
  <component :is="type" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as antIcons from '@ant-design/icons-vue'
export default defineComponent({
  name: 'Aicon',
  components: antIcons,
  props: {
    type: {
      required: true,
      type: String,
    },
  },
})
</script>

<style lang="scss" scoped>
</style>
