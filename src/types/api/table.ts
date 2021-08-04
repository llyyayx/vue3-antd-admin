import { ResponseData } from './public'

export interface TableList extends ResponseData {
  total: number,
  current: number,
  pageSize: number,
  data: []
}
