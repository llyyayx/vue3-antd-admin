import { ResponseData } from './public'

export interface TableList extends ResponseData {
  total: number,
  current: number,
  pageSize: number,
  data: []
}

export interface EditData extends ResponseData {
  data: any
}

export interface UploadApi extends ResponseData {
  url: string
}

export interface OptionsData extends ResponseData {
  data: any
}