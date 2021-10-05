<template>
  <a-card class="table__layout">
    <template #title>
      <div class="table__top" v-if="selectItem && selectItem.length > 0">
        <Form 
          ref="selectForm"
          :formItem="selectItem || []"
          :setData="selectFun"
          @succeed="selectComplete"
        >
          <template v-slot:[formSlot(item)]="{ formData, key }" v-for="item in (selectItem ? selectItem : [])">
            <slot :name="item.slotName" :formData="formData" :key="key"  v-if="item.type === 'slot'" />
          </template>
        </Form>
        <div class="table__top_select">
          <a-button type="primary" @click="selectForm.onSubmit()">查询</a-button>
          <a-button class="top_btn" @click="resetQuery">重置</a-button>
        </div>
      </div>
      <div class="table__btn">
        <a-button type="primary" @click="defaultAdd" v-if="add">新增</a-button>
        <slot name="button" />
      </div>
    </template>
    <a-table
      v-bind="tableProps"
      :rowKey='rowkey'
      :dataSource="dataSource"
      :pagination="page === true ? paging : false"
      :loading="loading"
      @change="tableChange"
    >
      <template #operation="item">
        <div class="operation">
          <a @click="defaultEdit(item)" v-if="edit">编辑</a>
          <a-divider type="vertical" v-if="edit" />
          <a class="danger" @click="defaultDel(item)" v-if="del">删除</a>
          <slot name="operationMore" :value="item" />
        </div>
      </template>
      <template v-slot:[key]="item" v-for="(value, key) in $slots">
        <slot :name="key" :value="item"></slot>
      </template>
    </a-table>
  </a-card>
  <Modal
    ref="addModal" 
    title="添加数据" 
    @ok="addSubmit"
    @cancel="addForm.reset()"
    v-if="add"
  >
    <Form 
      ref="addForm"
      :formItem="addItem ? addItem : formItem"
      :rules="addRules ? addRules : rules"
      :setData="add"
      @succeed="addComplete"
      @fail="addModal.loading(false)"
    >
      <template v-slot:[formSlot(item)]="{ formData, key }" v-for="item in (addItem ? addItem : formItem)">
        <slot :name="item.slotName" :formData="formData" :key="key"  v-if="item.type === 'slot'" />
      </template>
    </Form>
  </Modal>
  <Modal 
    ref="editModal" 
    title="编辑数据" 
    @ok="editSubmit"
    @cancel="editForm.reset()"
    v-if="edit"
  >
    <Form 
      ref="editForm"
      :dataKey="editKey ? editKey : rowkey"
      :formItem="editItem ? editItem : formItem"
      :rules="editRules ? editRules : rules"
      :setData="edit"
      :defaultData="editDefData"
      @succeed="editComplete"
      @fail="editModal.loading(false)"
    >
      <template v-slot:[formSlot(item)]="{ formData, key }" v-for="item in (editItem ? editItem : formItem)">
        <slot :name="item.slotName" :formData="formData" :key="key"  v-if="item.type === 'slot'" />
      </template>
    </Form>
  </Modal>
</template>
<script lang="ts">
import util from '@/utils'
import Form from './form.vue'
import Modal from './modal.vue'
import { FormItem, SetData, GetData, EditData, OptionsData } from './type'
import { message, Modal as antModal } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { ColumnProps } from 'ant-design-vue/es/table/interface'
import { defaultTableProps } from 'ant-design-vue/es/table/Table'
import { defineComponent, ref, reactive, createVNode, computed, onBeforeMount, onMounted, PropType } from 'vue'
export default defineComponent({
  name: 'comTable',
  components: {
    Form,
    Modal
  },
  emits: [ 'editOpen', 'addOpen', 'editSuccess', 'addSuccess' ],
  props: {
    ...defaultTableProps,
    // 重置ant-design的columns数据类型(属于ant的ts类型定义bug,他定义的是ColumnProps对象,实质为数组嵌套ColumnProps)
    columns: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    },
    // 添加/修改_条目
    formItem: {
      type: Array as PropType<FormItem[]>,
      required: false,
      default: []
    },
    // 查询条目
    selectItem: {
      type: Array as PropType<FormItem[]>,
      required: false,
      default: undefined
    },
    // 添加/查询_规则
    rules: {
      type: Object,
      required: false,
      default: undefined
    },
    // 查询接口
    get: {
      type: Function as PropType<GetData>,
      required: true
    },
    // 添加接口_false不展示
    add: {
      type: Function as PropType<SetData>,
      required: false,
      default: undefined
    },
    // 拉取修改数据接口_false修改前不调用
    editData: {
      type: Function as PropType<EditData>,
      required: false,
      default: undefined
    },
    // 修改接口_false不展示
    edit: {
      type: Function as PropType<SetData>,
      required: false,
      default: undefined
    },
    // 删除接口_false不展示
    del: {
      type: Function as PropType<SetData>,
      required: false,
      default: undefined
    },
    // 取远程多选项接口
    options: {
      type: Function as PropType<OptionsData>,
      required: false,
      default: undefined
    },
    // 列表/编辑/删除_主键
    rowkey: {
      type: String,
      required: false,
      default: 'id'
    },
    // 分页显隐
    page: {
      type: Boolean,
      required: false,
      default: true
    },
    // 默认操作栏宽度
    operationWidth: {
      type: Number,
      required: false,
      default: 200
    },

    // 自定义设置项

    // 添加条目
    addItem: {
      type: Array as PropType<FormItem[]>,
      required: false,
      default: undefined
    },
    // 编辑条目
    editItem: {
      type: Array as PropType<FormItem[]>,
      required: false,
      default: undefined
    },
    // 编辑主键
    editKey: {
      type: String,
      required: false,
      default: undefined
    },
    // 删除主键
    delKey: {
      type: String,
      required: false,
      default: undefined
    },
    // 添加规则
    addRules: {
      type: Object,
      required: false,
      default: undefined
    },
    // 编辑规则
    editRules: {
      type: Object,
      required: false,
      default: undefined
    },
    // 固定参数
    params: {
      type: Object,
      required: false,
      default: undefined
    }

  },
  setup (props, context) {

    /**** 表单初始化 ****/

    // 初始化数据源
    const dataSource = ref<any[]>([])

    // 初始化表单配置
    const tableKeys = Object.keys(defaultTableProps)
    const tableProps = computed(() => {
      const dataProps = reactive({})
      Object.keys(props).forEach(key => {
        if (tableKeys.includes(key)) {
          dataProps[key] = props[key]
        }
      }) 
      return dataProps
    })

    // 初始化操作栏
    onBeforeMount(() => {
      if (props.del || props.edit) {
        const action: ColumnProps = {
          title: '操作',
          width: props.operationWidth,
          key: 'operation',
          fixed: 'right',
          slots: { customRender: 'operation' }
        }
        // 防止多次插入
        if (!util.arrIsKey(props.columns, 'key', 'operation')) props.columns.push(action)
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
      showQuickJumper: true
    })

    // 加载loading
    const loading = ref(false)

    // 拉取表单数据
    const selectForm = ref()
    const getData = () => {
      loading.value = true
      const selectData = selectForm.value ? selectForm.value.formData : {}
      const params: any = {}
      Object.keys(selectData).forEach(key => {
        if (selectData[key]) {
          params[key] = selectData[key]
        }
      })
      if (props.page) {
        params.current = paging.current
        params.pageSize = paging.pageSize
      }
      if (props.params) {
        Object.assign(params, props.params)
      }
      props.get(params).then(e => {
        dataSource.value = e.data.data
        const { current, total, pageSize } = e.data
        paging.current = current
        paging.total = total
        paging.pageSize = pageSize
        loading.value = false
      }).catch(err => {
        message.error(err.message || err.data.message)
        loading.value = false
      }) 
    }

    // 取远程多选选项
    const getOptions = () => {
      if (props.options) {
        props.options().then(e => {
          props.selectItem && setOptions(props.selectItem, e.data.data)
          props.formItem && setOptions(props.formItem, e.data.data)
          props.addItem && setOptions(props.addItem, e.data.data)
          props.editItem && setOptions(props.editItem, e.data.data)
        }).catch(err => {
          message.error(err.message || err.data.message)
        })
      }
    }

    // 设置远程选项到配置项内
    const setOptions = (items: FormItem[], data: any) => {
      items.forEach(item => {
        if (item.optionKey) {
          item.options = data[item.optionKey] || []
        }
      })
    }

    onMounted(() => {
      getData()
      getOptions()
    })
    

    /**** 表单主动事件 ****/

    // 表格分页、排序、筛选变化时触发
    const tableChange = (pagination: any, filters: any, sorter: any, currentDataSource: any) => {
      const { current, pageSize } = pagination
      paging.current = current
      paging.pageSize = pageSize
      getData()
    }

    /**** 查询数据 ****/

    const selectFun: SetData = async (selectData: any): Promise<any> => {
      const params = {
        current: 1,
        pageSize: paging.pageSize,
        ...selectData
      }
      if (props.params) {
        Object.assign(params, props.params)
      }
      loading.value = true
      try {
        const e = await props.get(params)
        loading.value = false
        return e
      } catch (error) {
        loading.value = false
        return error
      }
    }

    // 查询提交完成
    const selectComplete = (e: any) => {
      dataSource.value = e.data.data
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

    /**** 编辑数据 ****/

    const editForm = ref()
    const editModal = ref()
    let editDefData: any = reactive({})

    // 点击表单编辑按钮
    const defaultEdit = (e: any) => {
      if (props.editData === undefined) {
        editModal.value.open()
        const data = e.text
        Object.keys(data).forEach(key => {
          editDefData[key] = data[key]
        })
        context.emit('editOpen', editDefData)
      } else {
        loading.value = true
        const editKey = props.editKey || props.rowkey
        props.editData({ [editKey]: e.text[editKey] }).then(e => {
          const data = e.data.data
          Object.keys(data).forEach(key => {
            editDefData[key] = data[key]
          })
          context.emit('editOpen', e.data)
          loading.value = false
          editModal.value.open()
        }).catch(err => {
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
      context.emit('editSuccess')
      getData()
      getOptions()
    }

    /**** 删除数据 ****/

    // 删除事件
    const defaultDel = (e: any) => {
      const delFun = props.del as SetData
      const data = {}
      const key = props.delKey ? props.delKey : props.rowkey
      data[key] = e.text[key]
      antModal.confirm({
        title: '您确定删除该条数据么？',
        content: '请谨慎选择此操作不可逆',
        icon: createVNode(QuestionCircleOutlined),
        onOk () {
          return delFun(data).then(e => {
            message.success(e.data.message)
            getData()
            getOptions()
          }).catch(err => {
            message.error(err.message || err.data.message)
          })
        }
      })
    }

    /**** 添加数据 ****/

    const addForm = ref()
    const addModal = ref()

    // 点击表单添加按钮 
    const defaultAdd = () => {
      addModal.value.open()
      context.emit('addOpen')
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
      context.emit('addSuccess')
      getData()
      getOptions()
    }

    //
    const formSlot = (item: FormItem) => {
      return item.slotName ? item.slotName : 'noSlot'
    }
    
    return { 
      dataSource, tableProps, paging, loading, tableChange,
      selectForm, selectFun, selectComplete, resetQuery,
      editDefData, editForm, editModal, defaultEdit, editSubmit, editComplete,
      defaultDel,
      addForm, addModal, defaultAdd, addSubmit, addComplete,
      getData, formSlot
    }

  }
})
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