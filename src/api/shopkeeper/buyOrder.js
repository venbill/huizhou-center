import request from '@/utils/request'

export function getShopOrderList(params) {
    return request({
        url: '/order/shopkeeper/orderList',
        method: 'get',
        params
    })
}


export function getShopOrderDetail(detailId) {
    return request({
        url: '/order/shopkeeper/getOrderDetail/' + detailId,
        method: 'get'
    })
}


export function getShopGoodsList() {
    return request({
        url: '/goods/shopkeeper/getShopAllGoodsList',
        method: 'get'
    })
}


export function sendExpress(detailId, expressNo) {
    return request({
        url: '/order/shopkeeper/sendExpress/' + detailId + '/' + expressNo,
        method: 'get'
    })
}

export function getExpressInfo(expressNo) {
    return request({
        url: '/expressInfo/' + +expressNo,
        method: 'get'
    })
}