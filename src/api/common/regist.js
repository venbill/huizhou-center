import request from '@/utils/request'

export function getCode(phone) {
  return request({
    url: '/system/getCodeMsg/' + phone,
    method: 'get'
  })
}
export function regist(params) {
  return request({
    url: '/system/register',
    data: params,
    method: 'post'
  })
}

export function resetPass(params) {
  return request({
    url: '/system/restPassword',
    data: params,
    method: 'post'
  })
}
