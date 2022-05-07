<template>
  <div>
    <a-form ref="formRef" :rules="rules" :model="formData" :name="name" layout="inline" class="thecomform">
      <template v-for="item in formItem" :key="item.key">
        <a-form-item :label="item.title" :name="item.key" :style="{ width: item.itemWidth || 'calc(50% - 20px)' }"
          :label-col="{ span: item.labelCol ? item.labelCol : 6 }"
          :wrapper-col="{ span: item.labelCol ? 24 - item.labelCol : 18 }" class="form__item">
          <!-- 输入框 -->
          <a-input v-if="item.type === 'input'" v-model:value="formData[item.key]" :allow-clear="true"
            autocomplete="off" :placeholder="`请输入${item.title}`" :disabled="item.disabled ? true : false" />
          <!-- 下拉选择框 -->
          <a-select v-if="item.type === 'select'" v-model:value="formData[item.key]" :placeholder="`请选择${item.title}`"
            :allow-clear="true" :disabled="item.disabled ? true : false">
            <a-select-option v-for="option in item.options" :key="option" :value="option.value">
              {{ option.label }}
            </a-select-option>
          </a-select>
          <!-- 时间选择框 -->
          <a-date-picker v-if="item.type === 'datePicker'" v-model:value="formData[item.key]" :allow-clear="true"
            value-format="YYYY-MM-DD" style="width: 100%;" :disabled="item.disabled ? true : false" />
          <!-- 时间范围选择框 -->
          <a-range-picker v-if="item.type === 'rangePicker'" v-model:value="formData[item.key]" :allow-clear="true"
            value-format="YYYY-MM-DD" style="width: 100%;" :disabled="item.disabled ? true : false" />
          <!-- 多行文本输入 -->
          <a-textarea v-if="item.type === 'textarea'" v-model:value="formData[item.key]" :allow-clear="true"
            autocomplete="off" :placeholder="`请输入${item.title}`" style="width: 100%;"
            :disabled="item.disabled ? true : false" />
          <!-- 树形下拉选择框 -->
          <a-tree-select v-if="item.type === 'treeSelect'" v-model:value="formData[item.key]"
            :placeholder="`请选择${item.title}`" :allow-clear="true" :tree-data="item.options"
            :dropdown-style="{ maxHeight: '500px' }" style="width: 100%;" :disabled="item.disabled ? true : false" />
          <!-- 数值输入框 -->
          <a-input-number v-if="item.type === 'number'" v-model:value="formData[item.key]" autocomplete="off"
            :placeholder="`请输入${item.title}`" style="width: 100%;" :disabled="item.disabled ? true : false" />
          <!-- 密码输入框 -->
          <a-input-password v-if="item.type === 'password'" v-model:value="formData[item.key]" autocomplete="off"
            :placeholder="`请输入${item.title}`" style="width: 100%;" :disabled="item.disabled ? true : false" />
          <!-- 开关 -->
          <a-switch v-if="item.type === 'switch'" v-model:checked="formData[item.key]" checked-children="开"
            un-checked-children="关" :disabled="item.disabled ? true : false" />
          <!-- 单选框 -->
          <a-radio-group v-if="item.type === 'radio'" v-model:value="formData[item.key]" :options="item.options"
            :disabled="item.disabled ? true : false" />
          <!-- 多选框 -->
          <a-checkbox-group v-if="item.type === 'checkbox'" v-model:value="formData[item.key]" :options="item.options"
            :disabled="item.disabled ? true : false" />
          <!-- 图片上传 -->
          <Upload v-if="item.type === 'upload'" v-model:value="formData[item.key]" :upload="item.upload"
            :disabled="item.disabled ? true : false" />
          <!-- 文件上传 -->
          <UploadFile v-if="item.type === 'uploadFile'" v-model:value="formData[item.key]" :upload="item.upload"
            :disabled="item.disabled ? true : false" />
          <!-- 自定义插槽 -->
          <slot v-if="item.type === 'slot'" :key="item.key" :name="item.slotName" :form-data="formData" />
        </a-form-item>
      </template>
    </a-form>
  </div>
</template>

<script lang="ts" name="ComForm">
import { message } from 'ant-design-vue'
import type { PropType } from 'vue'
import utils from './utils'
import Upload from './upload.vue'
import UploadFile from './uploadFile.vue'
import type { FormItem, SetData } from './type'

export default defineComponent({
  props: {
    // 表单项
    formItem: {
      type: Array as PropType<FormItem[]>,
      required: true,
    },
    // 提交数据的api接口
    setData: {
      type: Function as PropType<SetData>,
      required: true,
    },
    // 表单名称
    name: {
      type: String,
      required: false,
      default: 'form',
    },
    // 修改数据的key
    dataKey: {
      type: String,
      required: false,
      default: undefined,
    },
    // 规则
    rules: {
      type: Object,
      required: false,
      default: {},
    },
    // 初始化数据(编辑)
    defaultData: {
      type: Object,
      required: false,
      default: {},
    },
    // 表单额外追加数据
    additional: {
      type: Object,
      required: false,
      default: {},
    },
  },
  emits: ['succeed', 'fail'],
  setup(props, { emit }) {
    // 表单数据
    const formData = computed(() => {
      const data = reactive({})
      if (Object.keys(props.defaultData).length > 0) {
        props.formItem.forEach((item) => {
          data[item.key] = props.defaultData[item.key] || undefined
        })
        if (props.dataKey)
          data[props.dataKey] = props.defaultData[props.dataKey] || undefined
      }
      else {
        utils.initData(props.formItem, data)
      }
      return data
    })

    const formRef = ref()

    /**
   * @desc: 表单提交
   */
    const onSubmit = () => {
      formRef.value.validate().then(() => {
        Object.assign(formData.value, props.additional)
        props.setData(formData.value).then((e) => {
          message.success(e.data.message)
          emit('succeed', e)
        }).catch((err) => {
          message.error(err.message || err.data.message)
          emit('fail', 'api返回错误')
        })
      }).catch(() => {
        emit('fail', '规则验证未通过')
      })
    }

    /**
   * @desc: 表单重置
   */
    const reset = () => {
      formRef.value.resetFields()
    }

    return {
      formData,
      formRef,
      onSubmit,
      reset,
    }
  },
})
</script>

<style  lang="scss" scoped>
.thecomform {
  & .form__item {
    margin-bottom: 16px;

    & .ant-form-item-label {
      flex-grow: 1 !important;
      flex-shrink: 0;
    }
  }
}
</style>

<style  lang="scss">
.comform {
  & .form__item {
    & .ant-form-item-label {
      flex-grow: 1;
      flex-shrink: 0;
    }
  }
}
</style>
