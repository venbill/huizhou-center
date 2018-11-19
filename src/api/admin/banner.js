import request from '@/utils/request'

export function getBanner(type) {
  return request({
    url: '/system/banner/' + type,
    method: 'get'
  })
}

export function addBanner(params) {
  return request({
    url: '/system/banner/add',
    method: 'post',
    data: params
  })
}
export function updateBanner(params) {
  return request({
    url: '/system/banner/update',
    method: 'put',
    data: params
  })
}
export function deleteBanner(id) {
  return request({
    url: '/system/banner/delete/' + id,
    method: 'delete'

  })
}
export function getBannerDetail(id) {
  return request({
    url: '/system/banner/detail/' + id,
    method: 'get'
  })
}
