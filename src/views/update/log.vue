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
    <div class="title">2021年08月10日</div>
    <ul>
      <li>解决添加编辑数据时，规则验证失败按钮loading未取消</li>
      <li>多文本框独占一行提供给了解决方案，用户可以自行设置formItem的labelCol项，具体看示例</li>
    </ul>
    <div class="title">2021年08月11日</div>
    <ul>
      <li>增加表单上传图片组件upload，用户可以自行设置formItem的type为upload</li>
      <li>增加开源许可证</li>
    </ul>
    <div class="title">2021年08月12日</div>
    <ul>
      <li>解决查询初始条件，首次取数据没有被添加</li>
      <li>增加操作栏slots返回行数据</li>
      <li>全局刷新增加等待loading酷炫动画</li>
    </ul>
    <div class="title">2021年08月13日</div>
    <ul>
      <li>修复添加表单在点击取消后无法重置内容</li>
      <li>增加checkout组件</li>
      <li>增加路由菜单隐藏功能，routerTable->hidden设置为true隐藏，默认为false</li>
    </ul>
    <div class="title">2021年08月19日</div>
    <ul>
      <li>优化header tab的css样式</li>
    </ul>
    <div class="title">2021年09月08日</div>
    <ul>
      <li>增加编辑前数据拉取，不配置默认取该行数据</li>
    </ul>
    <div class="title">2021年09月09日</div>
    <ul>
      <li>修复page项无效问题</li>
    </ul>
    <div class="title">2021年09月10日</div>
    <ul>
      <li>修复重置筛选表单数组值异常问题</li>
      <li>重置筛选点击后自动再次拉取数据</li>
    </ul>
    <div class="title">2021年09月11日</div>
    <ul>
      <li>暴露getData内置方法</li>
      <li>增加筛选、添加、编辑表单的自定义插槽功能</li>
    </ul>
    <div class="title">2021年09月14日</div>
    <ul>
      <li>修复调用查询编辑数据接口未加主键问题</li>
    </ul>
    <div class="title">2021年09月17日</div>
    <ul>
      <li>添加通过接口拉取多选项功能</li>
    </ul>
    <div class="title">2021年09月18日</div>
    <ul>
      <li>添加查询接口固定参数配置</li>
    </ul>
    <div class="title">2021年09月20日</div>
    <ul>
      <li>筛选列表总数不变问题修复</li>
      <li>重置筛选流程优化</li>
    </ul>
    <div class="title">2021年09月22日</div>
    <ul>
      <li>修复参数链接页面刷新参数丢失</li>
      <li>优化隐藏页面侧边菜单不做选中</li>
      <li>优化路由鉴权防止query丢失</li>
      <li>登陆页面调整push(string)</li>
      <li>tab栏把route.path更改为route.fullPath</li>
    </ul>
    <div class="title">2021年09月23日</div>
    <ul>
      <li>添加(emit)编辑弹框打开事件、编辑提交成功事件、添加数据弹框打开事件、添加数据提交成功事件</li>
      <li>删除部分无用代码</li>
    </ul>
    <div class="title">2021年09月24日</div>
    <ul>
      <li>优化树形下拉框高度</li>
      <li>可自定义默认操作栏宽度</li>
    </ul>
    <div class="title">2021年09月27日</div>
    <ul>
      <li>统一了formItem多选项选择名称变量(统一为：label)</li>
    </ul>
    <div class="title">2021年09月29日</div>
    <ul>
      <li>修复params配置项筛选丢失问题</li>
    </ul>
    <div class="title">2021年09月30日</div>
    <ul>
      <li>修复栏目超出没隐藏滚动</li>
    </ul>
    <div class="title">2021年10月05日</div>
    <ul>
      <li>优化远程选项同步问题</li>
    </ul>
    <div class="title">2021年10月06日</div>
    <ul>
      <li>增加添加数据表单额外数据配置项</li>
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
