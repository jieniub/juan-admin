<template>
  <div class="app-container">
    <el-button type="primary" @click="showDialog = true" plain
      >添加banner</el-button
    >

    <el-dialog
      title="提示"
      :visible.sync="showDialog"
      width="30%"
      :before-close="handleClose"
    >
      <span>功能开发中。。。。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="showDialog = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-table :data="list" border style="width: 100%">
      <el-table-column fixed prop="imageUrl" label="图片" width="185px">
        <template slot-scope="scope">
          <img
            slot="reference"
            :src="scope.row.imageUrl"
            style="width: 180px; height: 120px"
          />
        </template>
      </el-table-column>
      <el-table-column fixed prop="title" label="标题" width="150">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="removeById(scope.row.id)"
            >删除</el-button
          >
          <router-link :to="'/edu/teacher/edit/' + scope.row.id">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>
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
      showDialog: false,
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
        url: `/front/admin/${this.limit}/${this.page}`,
        data: this.searchObj,
      }).then((respone) => {
        if (respone.data.success == true) {
          this.total = respone.data.data.total;
          this.list = respone.data.data.items;
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
    removeById(teacherId) {
      $axios({
        method: "delete",
        url: `/admin/teacher/${teacherId}`,
      }).then((respone) => {
        if (respone.data.success === true) {
          this.fatchData();
          this.$message({
            message: "删除成功！",
            type: "success",
          });
        } else {
          this.$message.error("删除失败！");
        }
      });
    },
  },
};
</script>

<style>
</style>