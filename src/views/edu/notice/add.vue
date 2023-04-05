<template>
  <el-form label-width="120px">
    <el-form-item label="通知标题">
      <el-input v-model="noticeForm.title" placeholder=" 示例"></el-input>
    </el-form-item>
    <!-- 所属分类 TODO -->
    <!-- 课程封面-->
    <el-form-item label="通知封面">
      <el-upload
        class="avatar-uploader"
        :action="BASE_API + '/oss/file/upload'"
        :show-file-list="false"
        :on-success="handleCoverSuccess"
        :before-upload="beforeCoverUpload"
      >
        <img v-if="noticeForm.cover" :src="noticeForm.cover" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="部门">
      <el-select v-model="noticeForm.type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="通知内容">
      <el-input
        v-model="noticeForm.contant"
        type="textarea"
        rows="10"
      ></el-input>
    </el-form-item>
    <el-form-item label="是否在首页展示">
      <el-switch
        v-model="noticeForm.isShow"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
    </el-form-item>

    <el-form-item>
      <el-button :disabled="saveBtnDisabled" @click="save">保存</el-button>
      <el-button :disabled="publishBtnDisabled" type="primary" @click="publish"
        >发布</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import notice from "@/api/edu/notice";
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      noticeForm: {
        title: "",
        contant: "",
        isShow: null,
        cover: null,
        type: null,
      },
      options: [
        { value: "1", label: "教务科" },
        { value: "2", label: "教学秩序科" },
        { value: "3", label: "教材科" },
        { value: "4", label: "考务科" },
        { value: "5", label: "信息科" },
        { value: "6", label: "教学培养科" },
        { value: "7", label: "实践教学科" },
      ],
      saveBtnDisabled: false,
      publishBtnDisabled: false,
    };
  },
  methods: {
    handleCoverSuccess(res, file) {
      this.noticeForm.cover = res.data.url;
    },
    beforeCoverUpload() {},
    save() {
      notice.addNotice(this.noticeForm).then((response) => {
        if (response.code == 20000) {
          this.$message({
            type: "success",
            message: "保存成功",
          });
        } else {
          this.$message({
            type: "error",
            message: "操作失败！",
          });
        }
      });
      this.$router.push("/edu/notice/list");
    },
    publish() {
      notice.publishNotice(this.noticeForm).then((response) => {
        if (response.code == 20000) {
          this.$message({
            type: "success",
            message: "发布成功",
          });
        } else {
          this.$message({
            type: "error",
            message: "操作失败！",
          });
        }
      });
      this.$router.push("/edu/notice/list" );
    //   this.$router.push("/edu/course/list");
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>