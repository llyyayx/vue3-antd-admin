<template>
  <a-modal
    :title="title"
    :width="width + 'px'"
    :visible="show"
    :confirm-loading="modalLoading"
    @ok="modalOk"
    @cancel="modalCancel"
  >
    <slot />
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'comModal',
  emits: ['ok', 'cancel'],
  props: {
    // 弹框标题（必填）
    title: {
      type: String,
      required: true
    },
    // 弹框宽度（选填）
    width: {
      type: [Number, String],
      required: false,
      default: 900
    }
  },
  setup (props, context) {

    // 弹框显隐
    let show = ref<boolean>(false)
    // 弹框路由loading
    let modalLoading = ref<boolean>(false)

    // @desc: 弹框确认事件(回调)
    const modalOk = () => {
      context.emit('ok')
    }

    // @desc: 弹框取消事件(回调)
    const modalCancel = () => {
      context.emit('cancel')
      show.value = false
      modalLoading.value = false
    }

    // @Desc: 弹框打开方法(供父组件调用)
    const open = () => {
      show.value = true
    }

    // @Desc: 弹框关闭方法(供父组件调用)
    const close = () => {
      show.value = false
      modalLoading.value = false
    }

    /**
     * @desc: 控制按钮loading方法(供父组件调用)
     * @param { Boolean } status 打开true关闭false
     */
    const loading = (status: boolean) => {
      modalLoading.value = status
    }

    return { show, modalLoading, modalOk, modalCancel, open, close, loading }

  }
})
</script>