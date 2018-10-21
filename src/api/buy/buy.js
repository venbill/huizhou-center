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

export function getShopTypeList(id) {
  return request({
    url: '/shopGoodsType/all/' + id,
    method: 'get'
  })
}

export function getShop(id) {
  return request({
    url: '/shop/get/' + id,
    method: 'get'
  })
}

export function goodsSearch(params) {
  return request({
    url: '/goods/search',
    params,
    method: 'get'
  })
}

// 收货地址
export function getAddress() {
  return request({
    url: '/deliveryAddress/list/user',
    method: 'get'
  })
}

export function deleteAddress(id) {
  return request({
    url: '/deliveryAddress/user/delete/' + id,
    method: 'delete'
  })
}

export function addAddress(params) {
  return request({
    url: '/deliveryAddress/user/insert',
    data: params,
    method: 'post'
  })
}

export function editAddress(params) {
  return request({
    url: '/deliveryAddress/user/update',
    data: params,
    method: 'put'
  })
}

export function defaultAddress(id) {
  return request({
    url: '/deliveryAddress/user/setDefault/' + id,
    method: 'get'
  })
}

// 购物车
export function addGoods(params) {
  return request({
    url: '/buyCar/user/addGoods',
    data: params,
    method: 'post'
  })
}

export function getGoodsNum() {
  return request({
    url: '/buyCar/user/GoodsNum',
    method: 'get'
  })
}

export function getGoodsList(params) {
  return request({
    url: '/buyCar/user/GoodsList',
    params,
    method: 'get'
  })
}

export function singleDelete(id) {
  return request({
    url: '/buyCar/user/deleteGoods/' + id,
    method: 'delete'
  })
}

export function someDelete(params) {
  return request({
    url: '/buyCar/user/deleteGoods/some',
    data: params,
    method: 'delete'
  })
}

export function numChenge(buyCarId, num) {
  return request({
    url: '/buyCar/user/updateGoodsNum/' + buyCarId + '/' + num,
    method: 'put'
  })
}

