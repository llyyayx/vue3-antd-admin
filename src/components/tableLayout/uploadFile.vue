<template>
  <div class="uploadFile__component">
    <a-upload
      name="file"
      class="file-uploader"
      :show-upload-list="false"
      :custom-request="customRequest"
      :disabled="disabled"
    >
      <a-button type="primary" :loading="loading">
        <CloudUploadOutlined v-show="!loading" /> 上传文件
      </a-button>
    </a-upload>
    <a :href="fileUrl" target="_blank">{{ fileUrl }}</a>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { CloudUploadOutlined } from '@ant-design/icons-vue'
import type { UploadFun } from './type'
export default defineComponent({
  name: 'UploadFile',
  components: {
    CloudUploadOutlined,
  },
  emits: ['update:value', 'change'],
  props: {
    value: {
      type: String,
      required: false,
    },
    // 上传文件的api接口
    upload: {
      type: Function as PropType<UploadFun>,
      required: false,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, context) {
    const loading = ref<boolean>(false)
    const fileUrl = ref<string | undefined>('')

    if (props.value)
      fileUrl.value = props.value

    watch(props, (data) => {
      fileUrl.value = data.value
    })

    /**
     * @Desc: 自定义上传头像
     * @param { Object } data FormData对象
     */
    const customRequest = (data: any) => {
      if (props.upload) {
        loading.value = true
        const formdata = new FormData()
        formdata.append('file', data.file)
        props.upload(formdata).then((e) => {
          loading.value = false
          context.emit('update:value', e.data.url)
        }).catch((err) => {
          loading.value = false
          context.emit('update:value', '')
          message.error(err.message || err.data.message)
        })
      }
      else {
        message.error('请添加上传图片的接口')
      }
    }

    return { loading, fileUrl, customRequest }
  },
})
</script>

<style lang="scss" scoped>
.uploadFile__component {
  display: flex;
  align-items: flex-end;
  & a {
    flex-shrink: 1;
    flex-grow: 1;
    margin-left: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
