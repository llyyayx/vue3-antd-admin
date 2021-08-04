import request from '../request'
import { AxiosResponse } from 'axios'
import { TableList } from '@/types/api/table'
import { ResponseData } from '@/types/api/public'

type ConfigType<T=ResponseData> = Promise<AxiosResponse<T>>

export const getData = (params: any): ConfigType<TableList> => {
  return request({
    url: '/table',
    method: 'get',
    params
  })
}

export const addData = (data: any): ConfigType => {
  return request({
    url: '/table/add',
    method: 'post',
    data
  })
}

export const editData = (data: any): ConfigType => {
  return request({
    url: '/table/edit',
    method: 'post',
    data
  })
}

export const delData = (data: any): ConfigType => {
  return request({
    url: '/table/del',
    method: 'post',
    data
  })
}