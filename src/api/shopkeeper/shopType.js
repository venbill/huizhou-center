import request from '@/utils/request'

export function getShopTypeList() {
    return request({
        url: '/shopGoodsType/list',
        method: 'get'
    })
}
export function updateShopType(params) {
    return request({
        url: '/shopGoodsType/update',
        method: 'put',
        data: params
    })
}
export function addShopType(params) {
    return request({
        url: '/shopGoodsType/add',
        method: 'post',
        data: params
    })
}
export function deleteShopType(id) {
    return request({
        url: '/shopGoodsType/delete/' + id,
        method: 'delete'
    })
}