import request from '@/utils/request'
const api_name = 'admin/publish'
export default {
    publishCourse(id) {
        return request({
            url: `${api_name}/${id}`,
            method: 'put'
        })
    },
}