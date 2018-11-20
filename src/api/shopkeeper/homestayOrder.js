import request from '@/utils/request'

export function getShopOrderList(params) {
    return request({
        url: '/homestayOrder/shopkeeper/orderList',
        method: 'get',
        params
    })
}


export function getShopOrderDetail(orderId) {
    return request({
        url: '/homestayOrder/shopkeeper/getOrderDetail/' + orderId,
        method: 'get'
    })
}


export function getShopHomestayList() {
    return request({
        url: '/homestay/shopkeeper/getShopAllHomestayList',
        method: 'get'
    })
}


export function customerIn(orderId) {
    return request({
        url: '/homestayOrder/shopkeeper/customerIn/' + orderId,
        method: 'get'
    })
}