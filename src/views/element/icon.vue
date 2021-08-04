<template>
  <div class="icon__container">
    <p class="tip">说明：直接输入icon名称即可使用，简化了各个图标引入步骤。但是目前是全部引入icon的方案，后续会按需引入减少包的体积</p>
    <pre>&lta-icon type="AndroidOutlined" /&gt</pre>
    <ul class="icons">
      <li><a-icon type="AndroidOutlined" /></li>
      <li><a-icon type="AppleOutlined" /></li>
      <li><a-icon type="TwitterOutlined" /></li>
      <li><a-icon type="DropboxOutlined" /></li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import aIcon from '@/components/aicon/aicon.vue'
export default defineComponent({
  name: 'el_icon',
  components: {
    aIcon
  }
})
</script>
<style lang="scss" scoped>
.icon__container {
  padding: 20px;
  & .tip {
    font-size: 14px;
    font-weight: bold;
  }
  & pre {
    background-color: #f6f6f6;
    padding: 10px
  }
  & .icons {
    display: flex;
    margin: 0;
    padding: 0;
    & li {
      margin-right: 10px;
      list-style: none;
      font-size: 24px;
      cursor: pointer;
    }
  }
}
</style>