import request from '@/utils/request'
export default {
    getPage(page,limit,type){
        return request({
            url: `/admin/notice/${page}/${limit}`,
            method: 'get'
        })
    },
    getInfo(id){
        return request({
            url: `/admin/notice/info/${id}`,
            method: 'get'
        })
    },
    addNotice(info){
        return request({
            url: `/admin/notice/add`,
            method: 'post',
            data: info
        })
    },
    publishNotice(info){
        return request({
            url: `/admin/notice/publish`,
            method: 'post',
            data: info
        })
    },
    publish(id){
        return request({
            url: `admin/notice/publish/${id}`,
            method: 'get'
        })
    }

}
