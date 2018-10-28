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

export function createOrder(params) {
  return request({
    url: '/homestay/order/create',
    data: params,
    method: 'post'
  })
}

export function getOrderStatus(id) {
  return request({
    url: '/homestay/checkPayStatus/' + id,
    method: 'get'
  })
}

export function orderDetail(id) {
  return request({
    url: '/homestay/order/detail/' + id,
    method: 'get'
  })
}

export function getOrderList(params) {
  return request({
    url: '/homestay/getUserHomestayOrderByStatus',
    params,
    method: 'get'
  })
}

export function orderPay(id) {
  return request({
    url: '/homestay/order/pay/' + id,
    method: 'post'
  })
}

