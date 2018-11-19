import request from '@/utils/request'

export function getNewsList(params) {
  return request({
    url: '/system/news/type/all',
    method: 'get',
    params
  })
}

export function addNews(params) {
  return request({
    url: '/system/news/add',
    method: 'post',
    data: params
  })
}
export function updateNews(params) {
  return request({
    url: '/system/news/update',
    method: 'put',
    data: params
  })
}
export function deleteNews(id) {
  return request({
    url: '/system/news/delete/' + id,
    method: 'delete'

  })
}
export function getNewsDetail(id) {
  return request({
    url: '/system/news/detail/' + id,
    method: 'get'
  })
}
