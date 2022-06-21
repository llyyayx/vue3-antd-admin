import type { AxiosResponse } from 'axios'
import request from '../request'
import type { LoginFrom } from '@/types/views/login'
import type { ResponseData } from '@/types/api/public'
import type { LoginSuccess, RouterData, UserInfo } from '@/types/api/login'

type ConfigType<T = ResponseData> = Promise<AxiosResponse<T>>

/**
 * @desc: 登录
 * @param { Object } data 输入的账号密码
 */
export const login = (data: LoginFrom): ConfigType<LoginSuccess> => {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

/**
 * @desc: 获取用户信息
 * @returns data
 */
export const info = (): ConfigType<UserInfo> => {
  return request({
    url: '/info',
    method: 'get',
  })
}

/**
 * @desc: 获取菜单
 */
export const menu = (): ConfigType<RouterData> => {
  return request({
    url: '/menu',
    method: 'get',
  })
}

/**
 * @desc: 退出登录
 */
export const logout = (): ConfigType => {
  return request({
    url: '/logout',
    method: 'post',
  })
}
