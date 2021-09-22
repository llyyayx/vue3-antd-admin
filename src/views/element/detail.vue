<template>
  <div class="detail__container">
    <p>query: {{ $route.query }}</p>
    <p>params: {{ $route.params }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'detail'
})
</script>
