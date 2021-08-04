<template>
  <div class="issue__container">
    <div class="title">2021年08月04日</div>
    <ul>
      <li>刷新页面输出警告：No match found for location with path，这是发生在beforeEach之前，所以不知道是不是Router 4x自身的问题，在动态添加路由时无法避免</li>
      <li>目前还没有适配手机端，需要适配手机端</li>
      <li>输出警告：evTools failed to load SourceMap: Could not load content for http://localhost:3000/talent/update/antd.css.map</li>
      <li>依赖外部接口，自身还没有mock数据</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'issue',
  setup() {
    
  }
});
</script>
<style lang="scss" scoped>
.issue__container {
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
