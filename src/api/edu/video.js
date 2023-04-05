import request from '@/utils/request'
const api_name = '/admin/video'
export default {
    saveVideoInfo(videoInfo) {
        return request({
            url: `${api_name}/save`,
            method: 'post',
            data: videoInfo
        })
    },
    getVideoInfoById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'get'
        })
    },
    updateVideoInfoById(videoInfo) {
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: videoInfo
        })
    },
    removeById(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'delete'
        })
    }
}