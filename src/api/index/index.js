import request from '@/utils/request'

export function getNews(type) {
  return request({
    url: '/system/news/' + type,
    method: 'get'
  })
}

