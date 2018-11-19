import request from '@/utils/request'

export function getOrderList(params) {
    return request({
        url: '/order/system/orderList',
        method: 'get',
        params
    })
}


export function getOrderDetail(type, id) {
    return request({
        url: '/order/system/detail/' + type + '/' + id,
        method: 'get'
    })
}



export function getShopListByName(name) {
    return request({
        url: '/shop/system/getShopByName/' + name,
        method: 'get'
    })
}
export function getGoodsListByName(name) {
    return request({
        url: '/goods/system/getGoodsListByName/' + name,
        method: 'get'
    })
}