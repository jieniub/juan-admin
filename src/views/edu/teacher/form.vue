<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="教师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >更换头像</el-button
        >
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="'oss/file/upload'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <!-- :url="BASE_API+'/oss/file/upload'" -->

      <el-form-item label="教师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="教师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          min="0"
        />
      </el-form-item>

      <el-form-item label="教师电话">
        <el-input v-model="teacher.phone" :rows="10" />
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate">保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import $axios from "../../../api";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        name: "",
        avatar: "",
        sort: 1,
        phone: "",
        avatar:
          "https://edu9605.oss-cn-beijing.aliyuncs.com/test/2023/03/12/d14a321a-9890-457a-a2b5-a78652a9209b.png",
      },
      saveBtnDisabled: false,

      BASE_API: process.env.BASE_API,
      imagecropperShow: false,
      imagecropperKey: 0,
    };
  },
  methods: {
    saveOrUpdate() {
      this.saveOrUpdate = true;
      if (!this.teacher.id) {
        this.saveData();
      } else {
        this.updateData();
      }
    },
    updateData() {
      $axios({
        method: "put",
        url: `/admin/teacher/${this.teacher.id}`,
        data: this.teacher,
      }).then((response) => {
        if (response.data.success === true) {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          this.$router.push("/edu/teacher/list");
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    saveData(teacher) {
      $axios({
        method: "post",
        url: `/admin/teacher/add`,
        data: this.teacher,
      }).then((response) => {
        if (response.data.success === true) {
          this.$message({
            message: "添加成功！",
            type: "success",
          });
          this.$router.push("/edu/teacher/list");
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    fetchDataById(id) {
      console.log("查找数据" + id);
      $axios({
        method: "get",
        url: `/admin/teacher/${id}`,
      }).then((response) => {
        if (response.data.success == true) {
          this.teacher = response.data.data.teacher;
        }
      });
    },

    cropSuccess(data) {
      console.log(data);
      this.imagecropperShow = false;
      this.teacher.avatar = data.url;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    close() {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
    },
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      const id = this.$route.params.id;
      this.fetchDataById(id);
    }
  },
};
</script>

<style>
</style>