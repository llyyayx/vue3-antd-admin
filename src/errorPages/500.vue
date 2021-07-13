<template>
  <a-result status="500" title="500" sub-title="对不起，服务器内部错误.">
    <template #extra>
      <a-button type="primary">返回主页</a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: '500',
  setup() {
    
  },
})
</script>
