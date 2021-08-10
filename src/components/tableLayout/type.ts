import { AxiosResponse } from 'axios'
import { TableList } from '@/types/api/table'
import { ResponseData } from '@/types/api/public'
import { ColumnProps, tableProps } from 'ant-design-vue/es/table/interface'

// 表单项类型_增改查
export interface FormItem {
  title: string,
  key: string,
  type: string,
  options?: any[],
  itemWidth?: string,
  defaultVal?: any,
  labelCol?: number
}

// 表单提交函数类型_增改
export type SetData = (x?: any) => Promise<AxiosResponse<ResponseData>>

// 表单提交函数类型_查询
export type GetData = (x?: any) => Promise<AxiosResponse<TableList>>

export interface TableProps {
  columns: ColumnProps[],
  formItem: FormItem[],
  selectItem?: FormItem[],
  rules?: any,
  get: SetData,
  add?: SetData | boolean,
  edit?: SetData | boolean,
  del?: SetData | boolean,
  rowkey?: string,
  page?: boolean,

  addItem?: FormItem[],
  editItem?: FormItem[],
  editKey?: string,
  delKey?: string,
  addRules?: any,
  editRules?: any
}