import request from '@/utils/request'

export function homestayList() {
  return request({
    url: '/homestay/remainder/list',
    method: 'get'
  })
}

export function discountList() {
  return request({
    url: '/homestay/cheap/list',
    method: 'get'
  })
}

export function homestayDetai(id) {
  return request({
    url: '/homestay/detail/' + id,
    method: 'get'
  })
}

export function homestaySearch(params) {
  return request({
    url: '/homestay/search/list',
    params,
    method: 'get'
  })
}

export function homestayComments(params) {
  return request({
    url: '/homestay/comments/getPage',
    params,
    method: 'get'
  })
}

export function getScenicSpotList() {
  return request({
    url: '/scenicSpot/list',
    method: 'get'
  })
}

