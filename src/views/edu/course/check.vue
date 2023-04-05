<template>
  <div class="app-container">
    <el-table :data="list" border style="width: 100%">
      <el-table-column fixed prop="cover" label="封面" width="200">
        <template slot-scope="scope">
          <img
            slot="reference"
            :src="scope.row.cover"
            style="width: 190px; height: 120px"
          />
        </template>
      </el-table-column>
      <el-table-column fixed prop="title" label="课程名" width="180">
      </el-table-column>
      <el-table-column
        prop="courseDescription"
        label="简介"
        :show-overflow-tooltip="true"
        width="300"
      >
      </el-table-column>

      <el-table-column prop="teacher" label="教师" width="80">
      </el-table-column>
      <el-table-column prop="lessonNum" label="总课时" width="50">
      </el-table-column>
      <el-table-column prop="status" label="课程状态" width="90">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="pass(scope.row.id)"
            >通过</el-button
          >
          <el-button @click="back(scope.row.id)" type="text" size="small"
            >驳回</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="limit"
      @prev-click="subPage()"
      @next-click="addPage()"
      :current-page.sync="cur"
      @current-change="jumpPage()"
    >
    </el-pagination>

    <!-- <el-button :plain="true" >成功</el-button> -->
  </div>
</template>

<script>
import $axios from "../../../api/index";
export default {
  data() {
    return {
      listLoading: true,
      list: null,
      total: 0,
      page: 1,
      limit: 5,
      cur: 1,
    };
  },
  created() {
    this.fatchData();
  },
  methods: {
    fatchData() {
      console.log("加载列表");
      $axios({
        method: "get",
        url: `/admin/course/uncheck/${this.page}/${this.limit}`,
        // url: `/serviceedu/teacher/${1}/${20}`,
        data: this.searchObj,
      }).then((respone) => {
        if (respone.data.success == true) {
          // console.log(respone);
          this.total = respone.data.data.total;
          this.list = respone.data.data.row;
        }
        this.listLoading = false;
      });
    },
    addPage() {
      this.page = this.page + 1;
      this.fatchData();
    },
    subPage() {
      if (this.page > 0) {
        this.page = this.page - 1;
      }
      this.fatchData();
    },
    jumpPage() {
      console.log(this.cur);
      this.page = this.cur;
      this.fatchData();
    },
    resetData() {
      this.searchObj = {};
      this.fatchData();
    },
    pass(courseId) {
      $axios({
        method: "put",
        url: `/admin/course/pass/${courseId}`,
      }).then((respone) => {
        if (respone.data.success === true) {
          this.fatchData();
          this.$message({
            message: "操作成功",
            type: "success",
          });
        } else {
          this.$message.error("操作失败！请联系系统管理员！！！");
        }
      });
    },
    back(courseId) {
      $axios({
        method: "put",
        url: `/admin/course/back/${courseId}`,
      }).then((respone) => {
        if (respone.data.success === true) {
          this.fatchData();
          this.$message({
            message: "操作成功",
            type: "success",
          });
        } else {
          this.$message.error("操作失败！请联系系统管理员！！！");
        }
      });
    },
  },
};
</script>

<style>
</style>