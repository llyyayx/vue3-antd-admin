import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { message } from 'ant-design-vue'
import { regAxios } from './install'
import storage from 'store'

// 创建axios实例

const request = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL as string,
  timeout: 6000
})

/**
 * @desc: 异常拦截处理器
 * @param { Object } error 错误信息
 */
const errorHandler = (error: AxiosError): AxiosError | Promise<AxiosError> => {
  message.error(error.message)
  return Promise.reject(error)
}

/**
 * @desc: 请求发送前拦截
 * @param { Object } config 配置参数
 */
request.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers['token'] = storage.get('token') || ''
  return config
}, errorHandler)


/**
 * @desc: 服务端响应后拦截
 * @param { Object } response 返回的数据
 */
request.interceptors.response.use((response: AxiosResponse): AxiosResponse | Promise<AxiosResponse> => {
  if (response.data.code === 200) {
    return response
  } else {
    return Promise.reject(response)
  }
}, errorHandler)

export const globalAxios = {
  install (app: any) {
    app.use(regAxios, request)
  }
}

export default request