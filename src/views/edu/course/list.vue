<template>
    <div class="app-container">

        <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-input v-model="searchObj.name" placeholder="讲师名"/>
        </el-form-item>
        <el-form-item label="添加时间">
        <el-date-picker
        v-model="searchObj.begin"
        type="datetime"
        placeholder="选择开始时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        default-time="00:00:00"
        />
        </el-form-item>
        <el-form-item>
            <el-date-picker 
            v-model="searchObj.end"
            type="datetime"
            placeholder="选择截止时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
        />
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fatchData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
        
        <el-table
        :data="list"
        border
        style="width: 100%"
        >
        <el-table-column
        fixed
        prop="cover"
        label="封面"
        width="200">

        <template slot-scope="scope" >
                <img slot="reference" :src="scope.row.cover" style="width: 190px;height: 120px">
        </template>
        </el-table-column>
        <el-table-column
        fixed
        prop="title"
        label="课程名"
        width="180">
        </el-table-column>
        <el-table-column
        prop="courseDescription"
          label="简介"
          :show-overflow-tooltip='true'
          width="300">
        </el-table-column>

        <el-table-column
        prop="teacher"
        label="教师"
        width="80">
        </el-table-column>
        <el-table-column
          prop="lessonNum"
          label="总课时"
          width="50">
        </el-table-column>
        <el-table-column
        prop="status"
        label="课程状态"
        width="90">
        <template slot-scope="scope">
            {{ scope.row.status === 'Normal'?'已发布':'未发布'}}
          </template>
        </el-table-column>

        

        <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="text" size="small" @click="removeById(scope.row.id)" >删除</el-button>
            <router-link :to="'/edu/course/info/'+scope.row.id">
                <el-button type="text" size="small" >编辑</el-button>
            </router-link>
        </template>
        </el-table-column>
    </el-table>
    
        <el-pagination
        layout="prev, pager, next"
        :total='total'
        :page-size='limit'
        @prev-click='subPage()'
        @next-click='addPage()'
        :current-page.sync="cur"
        @current-change='jumpPage()'>
        </el-pagination>

        <!-- <el-button :plain="true" >成功</el-button> -->
    </div>
</template>

<script>
import $axios from '../../../api/index'
export default {
    data(){
        return {
            listLoading: true,
            list: null,
            total: 0,
            page: 1,
            limit: 5,
            cur: 1,
            searchObj: {}
        }
    },
    created(){
        this.fatchData();
    },
    methods: {
        fatchData(){
            console.log("加载列表");
            $axios({
                method: 'post',
                url: `/admin/course/${this.page}/${this.limit}`,
                // url: `/serviceedu/teacher/${1}/${20}`,
                data: this.searchObj
            }).then(respone =>{
                if(respone.data.success == true){
                    // console.log(respone);
                    this.total = respone.data.data.total;
                    this.list = respone.data.data.row;
                }
                this.listLoading = false;
            });
            
        },
        addPage(){
            this.page = this.page+1;
            this.fatchData();
        },
        subPage(){
            if(this.page > 0){
                this.page = this.page-1;
            }
            this.fatchData();
        },
        jumpPage(){
            console.log(this.cur);
            this.page = this.cur;
            this.fatchData();
        },
        resetData(){
            this.searchObj = {}
            this.fatchData()
        },
        removeById(teacherId){
            console.log("courseid" + teacherId);
            $axios({
                method: 'delete',
                url: `/admin/course/${teacherId}`,
            }).then(respone =>{
                if(respone.data.success === true){
                    this.fatchData();
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                }else{
                    this.$message.error('删除失败！')
                }
                
            });
        }

    }
}
</script>

<style>

</style>