import request from '@/utils/request'

export function getNews(params) {
  return request({
    url: '/system/news/type',
    params,
    method: 'get'
  })
}

export function newsDetail(id) {
  return request({
    url: '/system/news/detail/' + id,
    method: 'get'
  })
}

export function leaveMessage(params) {
  return request({
    url: '/system/leaveMessage',
    data: params,
    method: 'post'
  })
}

export function getBanner(type) {
  return request({
    url: '/system/banner/' + type,
    method: 'get'
  })
}

