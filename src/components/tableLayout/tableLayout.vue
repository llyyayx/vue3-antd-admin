<template>
  <a-card class="table__layout">
    <template v-if="(selectItem && selectItem.length > 0) || add || $slots.button" #title>
      <div v-if="selectItem && selectItem.length > 0" class="table__top">
        <Form ref="selectForm" name="select" :form-item="selectItem || []" :set-data="selectFun"
          @succeed="selectComplete">
          <template v-for="item in (selectItem ? selectItem : [])" #[formSlot(item)]="{ formData, key }"
            :key="item.key">
            <slot v-if="item.type === 'slot'" :key="key" :name="item.slotName" :form-data="formData" />
          </template>
        </Form>
        <div class="table__top_select">
          <a-button type="primary" @click="selectForm.onSubmit()">
            查询
          </a-button>
          <a-button class="top_btn" @click="resetQuery">
            重置
          </a-button>
        </div>
      </div>
      <div class="table__btn">
        <a-button v-if="add" type="primary" @click="defaultAdd">
          新增
        </a-button>
        <slot name="button" />
      </div>
    </template>
    <a-table v-bind="tableProps" :row-key="rowKey" :data-source="dataSource"
      :pagination="page === true ? paging : false" :loading="loading" @change="tableChange">
      <template #bodyCell="{ column, record }">
        <!-- 操作 -->
        <template v-if="column.key === 'operation'">
          <div class="operation">
            <a v-if="edit" @click="defaultEdit(record)">编辑</a>
            <a-divider v-if="del" type="vertical" />
            <a v-if="del" class="danger" @click="defaultDel(record)">删除</a>
            <slot name="operationMore" :value="record" />
          </div>
        </template>

        <!-- 遍历其他slot -->
        <template v-for="(value, key) in $slots">
          <template v-if="column.key === key">
            <slot :name="key" :value="record" />
          </template>
        </template>
      </template>
    </a-table>
  </a-card>

  <Modal v-if="add" ref="addModal" title="添加数据" @ok="addSubmit" @cancel="addForm.reset()">
    <Form ref="addForm" name="add" :form-item="addItem ? addItem : formItem" :rules="addRules ? addRules : rules"
      :set-data="add" :additional="addToData" @succeed="addComplete" @fail="addModal.loading(false)">
      <template v-for="item in (addItem ? addItem : formItem)" :key="item.key" #[formSlot(item)]="{ formData, key }">
        <slot v-if="item.type === 'slot'" :key="key" :name="item.slotName" :form-data="formData" />
      </template>
    </Form>
  </Modal>
  <Modal v-if="edit" ref="editModal" title="编辑数据" @ok="editSubmit" @cancel="enditCancel">
    <Form ref="editForm" name="edit" :data-key="editKey ? editKey : rowKey" :form-item="editItem ? editItem : formItem"
      :rules="editRules ? editRules : rules" :set-data="edit" :default-data="editDefData" @succeed="editComplete"
      @fail="editModal.loading(false)">
      <template v-for="item in (editItem ? editItem : formItem)" :key="item.key" #[formSlot(item)]="{ formData, key }">
        <slot v-if="item.type === 'slot'" :key="key" :name="item.slotName" :form-data="formData" />
      </template>
    </Form>
  </Modal>
</template>

<script lang="ts" setup name="comTable">
import { Modal as antModal, message } from 'ant-design-vue'
import { tableProps as aTableProps } from 'ant-design-vue/lib/table'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import type { TableColumnsType } from 'ant-design-vue'
import type { PropType } from 'vue'
import { createVNode } from 'vue'
import type { ColumnProps } from 'ant-design-vue/es/table'
import type { EditData, FormItem, GetData, OptionsData, SetData } from './type'
import Modal from './modal.vue'
import Form from './form.vue'
import utils from './utils'

const props = defineProps(
  {
    ...aTableProps(),
    columns: {
      type: Object as PropType<TableColumnsType>,
      required: true,
    },
    // 添加/修改_条目
    formItem: {
      type: Array as PropType<FormItem[]>,
      required: false,
      default: [] as FormItem[],
    },
    // 查询条目
    selectItem: {
      type: Array as PropType<FormItem[]>,
      required: false,
      default: undefined,
    },
    // 添加/查询_规则
    rules: {
      type: Object,
      required: false,
      default: undefined,
    },
    // 查询接口
    get: {
      type: Function as PropType<GetData>,
      required: true,
    },
    // 添加接口_false不展示
    add: {
      type: Function as PropType<SetData>,
      required: false,
      default: undefined,
    },
    // 拉取修改数据接口_false修改前不调用
    editData: {
      type: Function as PropType<EditData>,
      required: false,
      default: undefined,
    },
    // 修改接口_false不展示
    edit: {
      type: Function as PropType<SetData>,
      required: false,
      default: undefined,
    },
    // 删除接口_false不展示
    del: {
      type: Function as PropType<SetData>,
      required: false,
      default: undefined,
    },
    // 取远程多选项接口
    options: {
      type: Function as PropType<OptionsData>,
      required: false,
      default: undefined,
    },
    // 列表/编辑/删除_主键
    rowKey: {
      type: String,
      required: false,
      default: 'id',
    },
    // 分页显隐
    page: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 默认操作栏宽度
    operationWidth: {
      type: Number,
      required: false,
      default: 200,
    },
    // 默认操作显隐
    operationShow: {
      type: Boolean,
      required: false,
      default: true,
    },

    // 自定义设置项

    // 添加条目
    addItem: {
      type: Array as PropType<FormItem[]>,
      required: false,
      default: undefined,
    },
    // 编辑条目
    editItem: {
      type: Array as PropType<FormItem[]>,
      required: false,
      default: undefined,
    },
    // 编辑主键
    editKey: {
      type: String,
      required: false,
      default: undefined,
    },
    // 删除主键
    delKey: {
      type: String,
      required: false,
      default: undefined,
    },
    // 添加规则
    addRules: {
      type: Object,
      required: false,
      default: undefined,
    },
    // 编辑规则
    editRules: {
      type: Object,
      required: false,
      default: undefined,
    },
    // 固定参数
    params: {
      type: Object,
      required: false,
      default: undefined,
    },
    // 添加表单额外数据
    addToData: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    // 列表数据键名自定义映射
    replaceFields: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
)

const emit = defineEmits(['editOpen', 'addOpen', 'editSuccess', 'addSuccess'])

/** ** 表单初始化 ****/

// 初始化数据源
const dataSource = ref<any[]>([])

// 初始化表单配置
const tableKeys = Object.keys(aTableProps())
const tableProps = computed(() => {
  const dataProps = reactive({})
  Object.keys(toRaw(props)).forEach((key) => {
    if (tableKeys.includes(key))
      dataProps[key] = props[key]
  })
  return dataProps
})

// 初始化操作栏,插入一个operation列
onBeforeMount(() => {
  const hasApi = Boolean(props.del || props.edit)
  const hasSlots = Boolean(useSlots().operationMore)
  if (props.operationShow && (hasApi || hasSlots)) {
    const action: ColumnProps = {
      title: '操作',
      width: props.operationWidth,
      key: 'operation',
      fixed: 'right',
    }
    // 防止多次插入
    if (props.columns && (!utils.arrIsKey(props.columns, 'key', 'operation')))
      // eslint-disable-next-line vue/no-mutating-props
      props.columns.push(action)
  }
})

// 初始化分页
const paging = reactive({
  current: 1,
  pageSize: 10,
  pageSizeOptions: ['10', '20', '50', '100'],
  total: 0,
  showTotal: (total: number) => `共${total}条`,
  showSizeChanger: true,
  showQuickJumper: true,
})

// 加载loading
const loading = ref(false)

// 拉取表单数据
const selectForm = ref()
const getData = () => {
  loading.value = true
  const selectData = selectForm.value ? selectForm.value.formData : {}
  const params: any = {}
  Object.keys(selectData).forEach((key) => {
    if (selectData[key])
      params[key] = selectData[key]
  })
  if (props.page) {
    params.current = paging.current
    params.pageSize = paging.pageSize
  }
  if (props.params)
    Object.assign(params, props.params)

  if (props.get) {
    props.get(params).then((e) => {
      // 解析数据
      if (!e.data.data)
        return

      console.log('get', e.data.data)
      const docs = e.data.data.docs as any[]
      dataSource.value = utils.addKeyIsReplace(docs, props.replaceFields)
      const { page: current, totalDocs: total, limit: pageSize } = e.data.data
      paging.current = current!
      paging.total = total!
      paging.pageSize = pageSize!
      loading.value = false
    }).catch((err) => {
      message.error(err.message || err.data.message)
      loading.value = false
    })
  }
}

// 设置远程选项到配置项内
const setOptions = (items: FormItem[], data: any) => {
  items.forEach((item) => {
    if (item.optionKey)
      item.options = data[item.optionKey] || []
  })
}

// 取远程多选选项
const getOptions = () => {
  if (props.options) {
    props.options().then((e) => {
      props.selectItem && setOptions(props.selectItem, e.data.data)
      props.formItem && setOptions(props.formItem, e.data.data)
      props.addItem && setOptions(props.addItem, e.data.data)
      props.editItem && setOptions(props.editItem, e.data.data)
    }).catch((err) => {
      message.error(err.message || err.data.message)
    })
  }
}

onMounted(() => {
  getData()
  getOptions()
})

/** ** 表单主动事件 ****/

// 表格分页、排序、筛选变化时触发
const tableChange = (pagination: any) => {
  const { current, pageSize } = pagination
  paging.current = current
  paging.pageSize = pageSize
  getData()
}

/** ** 查询数据 ****/

const selectFun: SetData = async (selectData: any): Promise<any> => {
  const params = {
    current: 1,
    pageSize: paging.pageSize,
    ...selectData,
  }
  if (props.params)
    Object.assign(params, props.params)

  loading.value = true
  try {
    const e = await props.get(params)
    loading.value = false
    return e
  }
  catch (error) {
    loading.value = false
    return error
  }
}

// 查询提交完成
const selectComplete = (e: any) => {
  dataSource.value = utils.addKeyIsReplace(e.data.data, props.replaceFields)
  const { current, total, pageSize } = e.data
  paging.current = current
  paging.total = total
  paging.pageSize = pageSize
}

// 重置查询条件
const resetQuery = () => {
  selectForm.value.reset()
  paging.current = 1
  getData()
}

/** ** 编辑数据 ****/

const editForm = ref()
const editModal = ref()
const editDefData: any = reactive({})

// 点击表单编辑按钮
const defaultEdit = (record: any) => {
  if (props.editData === undefined) {
    editModal.value.open()

    Object.keys(record).forEach((key) => {
      editDefData[key] = record[key]
    })
    emit('editOpen', editDefData)
  }
  else {
    loading.value = true
    const editKey = props.editKey || props.rowKey
    props.editData({ [editKey]: record[editKey] }).then((e) => {
      const data = utils.objKeyIsReplace(e.data.data, props.replaceFields)
      Object.keys(data).forEach((key) => {
        editDefData[key] = data[key]
      })
      emit('editOpen', editDefData)
      loading.value = false
      editModal.value.open()
    }).catch((err) => {
      message.error(err.message || err.data.message)
      loading.value = false
    })
  }
}

// 提交编辑好的数据
const editSubmit = () => {
  editModal.value.modalLoading = true
  editForm.value.onSubmit()
}

// 表单编辑提交完成回调
const editComplete = () => {
  editModal.value.close()
  emit('editSuccess')
  utils.initData(props.editItem || props.formItem, editDefData)
  getData()
  getOptions()
}

// 编辑弹框取消事件
const enditCancel = () => {
  utils.initData(props.editItem || props.formItem, editDefData)
}

/** ** 删除数据 ****/

// 删除事件
const defaultDel = (record: any) => {
  const delFun = props.del as SetData
  const data = {}
  const key = props.delKey ? props.delKey : props.rowKey
  data[key] = record[key]
  console.log('del', data)
  antModal.confirm({
    title: '您确定删除该条数据么？',
    content: '请谨慎选择此操作不可逆',
    icon: createVNode(QuestionCircleOutlined),
    onOk() {
      return delFun(data).then((e) => {
        message.success(e.data.msg)
        getData()
        getOptions()
      }).catch((err) => {
        message.error(err.message || err.data.message)
      })
    },
  })
}

/** ** 添加数据 ****/

const addForm = ref()
const addModal = ref()

// 点击表单添加按钮
const defaultAdd = () => {
  addModal.value.open()
  emit('addOpen')
}

// 提交添加的数据
const addSubmit = () => {
  addModal.value.modalLoading = true
  addForm.value.onSubmit()
}

// 表单添加提交完成回调
const addComplete = () => {
  addModal.value.close()
  addForm.value.reset()
  emit('addSuccess')
  getData()
  getOptions()
}

// 解析表单插槽名
const formSlot = (item: FormItem) => {
  return item.slotName ? item.slotName : 'noSlot'
}
</script>

<style lang="scss" scoped>
.table__layout {
  padding: 0;

  & .table__top {
    display: flex;

    .ant-form {
      flex-shrink: 1;
      flex-grow: 1;
    }

    & .table__top_select {
      width: 226px;
      flex-shrink: 0;
      flex-grow: 0;

      & .top_btn {
        margin-left: 10px;
      }
    }
  }

  & .table__btn {
    display: flex;
  }

  & .operation {
    color: #1890FF;

    & .danger {
      color: #FF4D4F
    }
  }
}
</style>
