<template>
  <a-result status="500" title="500" sub-title="对不起，服务器内部错误.">
    <template #extra>
      <a-button type="primary" @click="home">返回主页</a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: '500',
  setup() {

    const router = useRouter()

    const home = () => { router.replace('/') }

    return { home }

  }
})
</script>
