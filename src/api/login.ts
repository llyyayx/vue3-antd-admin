import request from '../request'
import { LoginFrom } from '@/types/views/login'

/**
 * @desc: 登陆
 * @param { Object } data 输入的账号密码
 */
export const login = (data: LoginFrom) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**
 * @desc: 获取用户信息
 * @returns data
 */
export const info = () => {
  return request({
    url: '/info',
    method: 'get'
  })
}

/**
 * @desc: 获取菜单
 */
export const menu = () => {
  return request({
    url: '/menu',
    method: 'get'
  })
}