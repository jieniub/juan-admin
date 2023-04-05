<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <a :href="'/excel/default.xls'">点击下载模版</a>
        </el-tag>
      </el-form-item>
      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :file-list="fileList"
          :action="BASE_API + '/admin/subject/addSubject'"
          name="file"
          accept="application/vnd.ms-excel"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button
          >
          <el-button
            :loading="loading"
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"

            >{{ this.fileUploadBtnText }}</el-button
          >
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import $axios from "../../../api";
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      fileList: [],
      fileUploadBtnText: "上传文件",
    };
  },
  methods: {
    submitUpload() {
      this.fileUploadBtnText = "正在上传";
      // $axios({
      //   method: "post",
      //   url: "/serviceedu/subject/addSubject",
      //   data: this.fileList[0],
      // }).then((response) => {
      //   if (response.data.success === true) {
      //     this.fileUploadSuccess(response);
      //   } else {
      //     this.fileUploadError(response);
      //   }
      // });
      this.$refs.upload.submit();
    },

    fileUploadSuccess(response) {
      if (response.success === true) {
        this.fileUploadBtnText = "导入成功";
        this.loading = false;
        this.$message({
          type: "success",
          message: response.message,
        });
      }
    },
    fileUploadError(response) {
      this.fileUploadBtnText = "导入失败";
      this.loading = false;
      this.$message({
        type: "error",
        message: "导入失败",
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>