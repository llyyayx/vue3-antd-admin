<template>
  <a-result status="403" title="403" sub-title="对不起，您没有权限访问此页面.">
    <template #extra>
      <a-button type="primary">返回主页</a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '403',
  setup() {
    
  },
})
</script>
