import request from '@/utils/request'
const api_name = 'admin/course'
export default {
    saveCourseInfo(courseInfo) {
        return request({
            url: `${api_name}/saveCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },
    getCourseInfoById(id){
        return request({
            url: `${api_name}/${id}`,
            method: 'get'
        })
    },
    updateCourseInfo(courseInfo){
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: courseInfo
        })
    },
    getCoursePublishInfoById(id) {
        return request({
            url: `${api_name}/publishinfo/${id}`,
            method: 'get'
        })
    },

}