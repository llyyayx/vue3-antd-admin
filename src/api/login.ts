import request from '../request'
import { LoginFrom } from '@/types/views/login'

export const login = (data: LoginFrom) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}