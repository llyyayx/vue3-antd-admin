<template>
  <div class="issue__container">
    <div class="title">2021年08月04日</div>
    <ul>
      <li>刷新页面输出警告：No match found for location with path，这是发生在beforeEach之前，所以不知道是不是Router 4x自身的问题，在动态添加路由时无法避免</li>
      <li>目前还没有适配手机端，需要适配手机端</li>
      <li>输出警告：evTools failed to load SourceMap: Could not load content for http://localhost:3000/talent/update/antd.css.map</li>
      <li>依赖外部接口，自身还没有mock数据</li>
      <li>antd全量引入，a-icon全量引入没有按需加载，导致打包后体积达到3M</li>
    </ul>
    <div class="title">2021年08月08日</div>
    <ul>
      <li class="solve">没有查询条件时，查询和重置按钮依然显示</li>
      <li class="solve">增删改功能没有自定义显示隐藏</li>
      <li class="solve">自定义插入表单slot</li>
    </ul>
    <div class="title">2021年08月09日</div>
    <ul>
      <li class="solve">formItem不应为必填prop</li>
      <li class="solve">操作栏左右内边距去除</li>
      <li class="solve">操作栏可插入slot</li>
      <li class="solve">添加编辑数据时，规则验证失败按钮loading未取消</li>
      <li class="solve">多文本框独占一行</li>
    </ul>
    <div class="title">2021年08月10日</div>
    <ul>
      <li class="solve">表单没有图片上传组件</li>
      <li class="solve">需要增加开源许可证，避免风险</li>
    </ul>
    <div class="title">2021年08月11日</div>
    <ul>
      <li class="solve">查询初始条件，首次取数据没有被添加</li>
      <li class="solve">操作栏slots没有返回行数据</li>
    </ul>
    <div class="title">2021年08月12日</div>
    <ul>
      <li class="solve">添加表单在点击取消后无法重置内容</li>
      <li class="solve">考虑增加编辑前查询数据接口</li>
    </ul>
    <div class="title">2021年09月21日</div>
    <ul>
      <li class="solve">参数链接页面刷新参数丢失，tab切换参数丢失</li>
      <li class="solve">隐藏页面侧边菜单不做选中（看看主流的怎么处理）</li>
    </ul>
    <div class="title">2021年09月30日</div>
    <ul>
      <li class="solve">栏目超出没隐藏滚动</li>
    </ul>
    <div class="title">2021年10月19日</div>
    <ul>
      <li class="solve">头像上传、文件上传验证规则时，明明有值却提示请上传</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'issue'
});
</script>
<style lang="scss" scoped>
.issue__container {
  padding: 20px;
  font-size: 14px;
  & .title {
    display: block;
    font-weight: 700;
    margin: 30px 0 10px;
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
