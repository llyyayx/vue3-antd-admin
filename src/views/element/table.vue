<template>
  <pre>tableLayout使用详情见使用文档，这其实是另一个小得开源项目。(tip: 文档编写中)</pre>
  <tableLayout 
    :columns="columns"
    :formItem="formItem"
    :selectItem="selectItem"
    :rules="rules"
    :get="getData"
    :add="addData"
    :editData="editGetData"
    :edit="editData"
    :del="delData"
    :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    ref="layout" 
  >
    <template v-slot:status="item">
      测试-{{ item.value.text.name }}
    </template>
    <template #operationMore="item">
      <a-divider type="vertical" />
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>更多</a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a @click="editPassword(item)">修改密码</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
  </tableLayout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getData, addData, editGetData, editData, delData, upload } from '@/api/table'
import tableLayout from '@/components/tableLayout/tableLayout.vue'
export default defineComponent({
  name: 'el_table',
  components: {
    tableLayout
  },
  setup () {
    const columns = [ 
      { title: '序号', dataIndex: 'id' }, {  title: '姓名', dataIndex: 'name' },
      { title: '年龄', dataIndex: 'age' }, { title: '住址', dataIndex: 'addr' },
      { title: '手机号', dataIndex: 'phone' }, { title: '行业', dataIndex: 'industry' },
      { title: '净资产(亿元)', dataIndex: 'wealth' }, {  title: '状态', slots: { customRender: 'status' } },
    ]
    const formItem = [
      { title: '姓名', key: 'name', type: 'input' }, { title: '年龄', key: 'age', type: 'number' },
      { title: '住址', key: 'addr', type: 'input' }, { title: '手机号', key: 'phone', type: 'input' },
      { title: '行业', key: 'industry', type: 'input' }, { title: '净资产', key: 'wealth', type: 'select', 
        options: [
          {value: 10, title: '10亿'},{value: 20, title: '20亿'},
          {value: 30, title: '30亿'},{value: 40, title: '40亿'},
          {value: 999, title: '50亿+'}
        ]
      },
      { title: '头像', key: 'avatar', type: 'upload', upload: upload },
      { title: '车型', key: 'cat', type: 'checkbox', options: [
        { label: '奥迪', value: 'aodi' },
        { label: '宝马', value: 'baoma' },
        { label: '沃尔沃', value: 'oero' },
        { label: '丰田', value: 'fengt' },
        { label: '本田', value: 'bent' }
      ] },
      { title: '备注', key: 'content', type: 'textarea', itemWidth: 'calc(100% - 20px)', labelCol: 3 },
    ]
    const selectItem = [
      { title: '姓名', key: 'name', type: 'input', itemWidth: '290px' }, { title: '年龄', key: 'age', type: 'number', itemWidth: '290px', defaultVal: 20 },
      { title: '住址', key: 'addr', type: 'input', itemWidth: '290px' }
    ]
    const rules = {
      name: [{required: true, message: '请输入姓名', trigger: 'change'}],
      age: [{required: true, message: '请输入年龄', trigger: 'change',type:'number'}],
      addr: [{required: true, message: '请输入地址', trigger: 'change'}],
      phone: [{required: true, message: '请输入手机号', trigger: 'change'}],
      industry: [{required: true, message: '请输入行业', trigger: 'change',type:'string'}],
      wealth: [{required: true, message: '请输入净资产', trigger: 'change',type:'number'}]
    }
    const editPassword = (item: any) => {
      console.log(item)
    }
    const selectedRowKeys = ref<any[]>([])
    const onSelectChange = (keys: []) => {
      selectedRowKeys.value.splice(0)
      keys.forEach(key => {
        selectedRowKeys.value.push(key)
      })
    }
    return { columns, formItem, selectItem, getData, addData, editGetData, editData, delData, rules, selectedRowKeys, onSelectChange, editPassword }
  }
})
</script>
<style lang="scss" scoped>
pre {
  background-color: #f6f6f6;
  padding: 10px;
  margin: 10px;
  display: block;
}
</style>
