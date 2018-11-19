import request from '@/utils/request'

/**
 * 
 * @param {店主搜索} params 
 */
export function getHomestayList(params) {
    return request({
        url: '/homestay/shopkeeper/getHomestayList',
        method: 'get',
        params
    })
}

/**
 * 
 * @param {添加商品} params 
 */
export function addHomestay(params) {
    return request({
        url: '/homestay/shopkeeper/addHomestay',
        method: 'post',
        data: params
    })
}
export function updateHomestay(params) {
    return request({
        url: '/homestay/shopkeeper/updateHomestay',
        method: 'put',
        data: params
    })
}
export function deleteHomestay(id) {
    return request({
        url: '/homestay/shopkeeper/deleteHomestay/' + id,
        method: 'delete'

    })
}
export function getHomestayDetail(id) {
    return request({
        url: '/homestay/shopkeeper/getHomestayDetail/' + id,
        method: 'get'
    })
}


export function getAreaList() {
    return request({
        url: '/scenicSpot/list',
        method: 'get'
    })
}