<template>
  <a-result status="404" title="404" sub-title="对不起，您访问的页面不存在.">
    <template #extra>
      <a-button type="primary" @click="home">返回主页</a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: '404',
  setup() {

    const router = useRouter()

    const home = () => { router.replace('/') }

    return { home }

  }
})
</script>
