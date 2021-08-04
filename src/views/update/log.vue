<template>
  <div class="log__container">
    <div class="title">2021年08月04日</div>
    <ul>
      <li>通用框架的基础路由、鉴权、无限嵌套菜单、tableLayout组件、登陆退出完成，正式上线github</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'log',
  setup() {
    
  }
});
</script>
<style lang="scss" scoped>
.log__container {
  padding: 20px;
  font-size: 14px;
  & .title {
    display: block;
    font-weight: 700;
    margin: 10px 0 20px;
  }
  & ul {
    margin: 0;
    & li {
      margin: 10px 0;
    }
    & .solve {
      text-decoration: line-through;
    }
  }
}
</style>
