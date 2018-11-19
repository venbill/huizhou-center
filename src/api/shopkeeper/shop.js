import request from '@/utils/request'

export function getShopDetail() {
    return request({
        url: '/shop/shopkeeper/getShop',
        method: 'get'
    })
}
export function updateShop(params) {
    return request({
        url: '/shop/shopkeeper/updateShop',
        method: 'put',
        data: params
    })
}