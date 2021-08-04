<template>
  <div class="join__container">
    <div class="join">目前该框架只是做了基础的建设，更多的功能还需要更多人参与进来，bug的测试提出与修复工作更少不了更多人的参与，git上提出issue可以帮助我来发现问题，
    进行Pull request即可加入维护，只要提交的代码合理可靠，简洁有效就会被合并加入。你的github名字也会进入成员名单，项目获得的奖励也会得到分享，这一系列的前提是我们做的更好。</div>
    <p class="title">成员名单(github用户名)</p>
    <ul>
      <li>llyyayx</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'join',
  setup() {
    
  }
});
</script>
<style lang="scss" scoped>
.join__container {
  padding: 10px;
  font-size: 14px;
  & .title {
    display: block;
    font-weight: 700;
    margin: 10px 0;
  }
  & ul {
    margin: 0;
  }
}
</style>
