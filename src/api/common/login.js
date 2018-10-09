import request from '@/utils/request'

export function login(username, password) {
  const data = {
    loginName: username,
    password: password,
    rememberMe: false
  }
  return request({
    url: '/system/authenticate',
    method: 'post',
    data
  })
}
export function getCurrentUser() {
  return request({
    url: '/system/getCurrentUser',
    method: 'get'
  })
}
