import { AxiosResponse } from 'axios'
import { ColumnProps, tableProps } from 'ant-design-vue/es/table/interface'

interface ResponseData<T = any> {
  code: number,
  message: string,
  data?: T
}

interface TableList extends ResponseData {
  total: number,
  current: number,
  pageSize: number,
  data: []
}

// 表单项类型_增改查
export interface FormItem {
  title: string,
  key: string,
  type: string,
  options?: any[],
  itemWidth?: string,
  defaultVal?: any,
  labelCol?: number,
  upload?: UploadFun,
  slotName?: string,
  optionKey?: string,
  disabled?: boolean
}

// 表单提交函数类型_增改删
export type SetData = (x?: any) => Promise<AxiosResponse<ResponseData>>

// 表单提交函数类型_修改数据查询结果
export type EditData = (x?: any) => Promise<AxiosResponse<{
  code: number,
  message: string,
  data: any
}>>

// 表单提交函数类型_查询
export type GetData = (x?: any) => Promise<AxiosResponse<TableList>>

// options选项查询函数
export type OptionsData = () => Promise<AxiosResponse<{
  code: number,
  message: string,
  data: any
}>>

// 文件上传组件
export interface UploadData extends ResponseData  {
  url: string
}

export type UploadFun = (x?: any) => Promise<AxiosResponse<UploadData>>   

export interface TableProps {
  columns: ColumnProps[],
  formItem: FormItem[],
  selectItem?: FormItem[],
  rules?: any,
  get: SetData,
  add?: SetData,
  editData?: EditData,
  edit?: SetData,
  del?: SetData,
  options?: OptionsData,
  rowkey?: string,
  page?: boolean,
  operationWidth?: number,
  operationShow?: boolean,

  addItem?: FormItem[],
  editItem?: FormItem[],
  editKey?: string,
  delKey?: string,
  addRules?: any,
  editRules?: any,
  params?: any,
  addToData?: any
}