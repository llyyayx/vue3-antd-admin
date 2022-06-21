import type { TableColumnType } from 'ant-design-vue'
import type { AxiosResponse } from 'axios'

interface baseResponse<T = any> {
  type: 'success' | 'error'
  msg: string
  data?: T
}
interface listData {
  docs: any[]
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: number
  page: number
  pagingCounter: number
  prevPage: number
  totalDocs: number
  totalPages: number
}

type TableList = baseResponse<Partial<listData>>

// 表单项类型_增改查
export interface FormItem {
  title: string
  key: string
  type: string
  options?: any[]
  itemWidth?: string
  defaultVal?: any
  labelCol?: number
  upload?: UploadFun
  slotName?: string
  optionKey?: string
  disabled?: boolean
}

// 表单提交函数类型_增改删
export type SetData = (x?: any) => Promise<AxiosResponse<baseResponse>>

// 表单提交函数类型_修改数据查询结果
export type EditData = (x?: any) => Promise<AxiosResponse<{
  code: number
  message: string
  data: any
}>>

// 表单提交函数类型_查询
export type GetData = (x?: any) => Promise<AxiosResponse<TableList>>

// options选项查询函数
export type OptionsData = () => Promise<AxiosResponse<{
  code: number
  message: string
  data: any
}>>

// 文件上传组件
export interface UploadData extends baseResponse {
  url: string
}

export type UploadFun = (x?: any) => Promise<AxiosResponse<UploadData>>

export interface TableProps {
  columns: TableColumnType[]
  formItem: FormItem[]
  selectItem?: FormItem[]
  rules?: any
  get: SetData
  add?: SetData
  editData?: EditData
  edit?: SetData
  del?: SetData
  options?: OptionsData
  rowKey?: string
  page?: boolean
  operationWidth?: number
  operationShow?: boolean

  addItem?: FormItem[]
  editItem?: FormItem[]
  editKey?: string
  delKey?: string
  addRules?: any
  editRules?: any
  params?: any
  addToData?: any
  replaceFields?: any
}
