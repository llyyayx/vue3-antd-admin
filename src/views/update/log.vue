<template>
  <div class="log__container">
    <div class="title">2021年08月04日</div>
    <ul>
      <li>通用框架的基础路由、鉴权、无限嵌套菜单、tableLayout组件、登陆退出完成，正式上线github</li>
    </ul>
    <div class="title">2021年08月09日</div>
    <ul>
      <li>解决了没有查询条件时，查询和重置按钮依然显示</li>
      <li>增删改功能可以自主设置显示隐藏</li>
      <li>增加自定义插入表单slot配置</li>
      <li>formItem改为非必填，默认为[]</li>
      <li>去除操作栏左右内边距，a-button换为a标签</li>
      <li>操作栏增加operationMore插槽</li>
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
