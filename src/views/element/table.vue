<template>
  <pre>tableLayout使用详情见使用文档，这其实是另一个小得开源项目。(tip: 文档编写中)</pre>
  <tableLayout 
    :columns="columns"
    :formItem="formItem"
    :selectItem="selectItem"
    :rules="rules"
    :get="getData"
    :add="addData"
    :edit="editData"
    :del="delData"
    ref="layout" 
  >
  </tableLayout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getData, addData, editData, delData } from '@/api/table'
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
      { title: '净资产(亿元)', dataIndex: 'wealth' },
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
    ]
    const selectItem = [
      { title: '姓名', key: 'name', type: 'input', itemWidth: '290px' }, { title: '年龄', key: 'age', type: 'number', itemWidth: '290px' },
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
    return { columns, formItem, selectItem, getData, addData, editData, delData, rules }
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
