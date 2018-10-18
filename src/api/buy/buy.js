import request from '@/utils/request'

export function getActiveGoods() {
  return request({
    url: '/goodsActivity/get',
    method: 'get'
  })
}

export function getDetailTypes() {
  return request({
    url: '/goodsType/detailTypes',
    method: 'get'
  })
}

export function getTagAndGoods() {
  return request({
    url: '/goodsTag/getTagAndGoods',
    method: 'get'
  })
}

export function getBanner(type) {
  return request({
    url: '/system/banner/' + type,
    method: 'get'
  })
}

export function searchGoods(params) {
  return request({
    url: '/goods/search',
    params,
    method: 'get'
  })
}

export function getHotSearchList() {
  return request({
    url: '/hot-search/get',
    method: 'get'
  })
}

export function goodDetail(id) {
  return request({
    url: '/goods/detail/' + id,
    method: 'get'
  })
}

export function goodComments(params) {
  return request({
    url: '/shop/comments/getPage',
    params,
    // data: params,
    method: 'get'
  })
}
