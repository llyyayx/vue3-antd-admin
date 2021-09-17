import request from '../request'
import { AxiosResponse } from 'axios'
import { TableList, EditData, UploadApi, OptionsData } from '@/types/api/table'
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

export const editGetData = (params: any): ConfigType<EditData> => {
  return request({
    url: '/table/editGetData',
    method: 'get',
    params
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

export const upload = (data: any): ConfigType<UploadApi> => {
  return request({
    url: '/table/upload',
    method: 'post',
    data
  })
}

export const options = (): ConfigType<OptionsData> => {
  return request({
    url: '/table/options',
    method: 'get'
  })
}