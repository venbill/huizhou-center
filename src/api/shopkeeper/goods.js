import request from '@/utils/request'

/**
 * 
 * @param {店主搜索} params 
 */
export function getGoodsList(params) {
    return request({
        url: '/goods/shopkeeper/getGoodsList',
        method: 'get',
        params
    })
}

/**
 * 
 * @param {添加商品} params 
 */
export function addGoods(params) {
    return request({
        url: '/goods/shopkeeper/addGoods',
        method: 'post',
        data: params
    })
}
export function updateGoods(params) {
    return request({
        url: '/goods/shopkeeper/updateGoods',
        method: 'put',
        data: params
    })
}
export function deleteGoods(id) {
    return request({
        url: '/goods/shopkeeper/deleteGoods/' + id,
        method: 'delete'

    })
}
export function getGoodsDetail(id) {
    return request({
        url: '/goods/shopkeeper/getGoodsDetail/' + id,
        method: 'get'
    })
}

export function getGoodsTypes() {
    return request({
        url: '/goodsType/detailTypes',
        method: 'get'
    })
}
export function getShopTypeList() {
    return request({
        url: '/shopGoodsType/list',
        method: 'get'
    })
}