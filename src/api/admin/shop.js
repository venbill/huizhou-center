import request from '@/utils/request'

export function getShopList(params) {
    return request({
        url: '/shop/system/list',
        method: 'get',
        params
    })
}

export function addShop(params) {
    return request({
        url: '/shop/system/add',
        method: 'post',
        data: params
    })
}
export function updateShop(params) {
    return request({
        url: '/shop/system/update',
        method: 'put',
        data: params
    })
}
export function deleteShop(id) {
    return request({
        url: '/shop/system/delete/' + id,
        method: 'delete'

    })
}
export function getShopDetail(id) {
    return request({
        url: '/shop/get/' + id,
        method: 'get'
    })
}