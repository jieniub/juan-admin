<template>
  <div>
    <el-steps
      :active="active"
      finish-status="success"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="课程基本信息"></el-step>
      <el-step title="课程大纲"></el-step>
      <el-step title="提交审核"></el-step>
    </el-steps>
    <!-- <el-form label-width="120px">
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >保存并下一步</el-button
        >
      </el-form-item> -->
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视"
        ></el-input>
      </el-form-item>
      <!-- 所属分类 TODO -->
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API + '/oss/file/upload'"
          class="avatar-uploader"
        >
          <img style="width: 400px" :src="courseInfo.cover" />
        </el-upload>
      </el-form-item>
      <!-- 课程讲师 TODO -->
      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="123"
        />
      </el-form-item>
      <!-- 课程封面 TODO -->
      <el-form-item label="课程类别">
        <el-select
          v-model="courseInfo.subjectParentId"
          @change="subjectLevelOneChanged"
          placeholder="请选择"
        >
          <el-option
            v-for="subject in subjectNestedList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <el-select v-model="courseInfo.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in subSubjectList"
            :key="subject.value"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <el-input
          v-model="courseInfo.courseDescription"
          placeholder="description"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from "@/api/edu/teacher";
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";
const defaultForm = {
  title: "",
  subjectId: "",
  subjectParentId: "",
  teacherId: "",
  lessonNum: 0,
  courseDescription: "",
  cover: "https://edu9605.oss-cn-beijing.aliyuncs.com/default.png",
};
export default {
  data() {
    return {
      BASE_API: process.env.VUE_APP_BASE_API,
      teacherList: [], // 讲师列表
      subjectNestedList: [], //一级分类列表
      subSubjectList: [], //二级分类列表
      courseInfo: defaultForm,
      saveBtnDisabled: false,
      active: 0,
    };
  },

  watch: {
    $route(to, from) {
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res); // 上传响应
      console.log(URL.createObjectURL(file.raw)); // base64编码
      this.courseInfo.cover = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    subjectLevelOneChanged(value) {
      console.log(value);
      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (this.subjectNestedList[i].id === value) {
          this.subSubjectList = this.subjectNestedList[i].children;
          this.courseInfo.subjectId = "";
        }
      }
    },
    initTeacherList() {
      teacher.getList().then((response) => {
        this.teacherList = response.data.items;
      });
    },
    init() {
      this.initSubjectList();
      this.initTeacherList();
      if (this.$route.params && this.$route.params.id) {
        console.log("test:" + this.$route.params.id);
        const id = this.$route.params.id;
        //子目录回显TODO
        this.fetchCourseInfoById(id);
        this.subjectLevelOneChanged(this.courseInfo.subjectId);

      } else {
        this.courseInfo = { ...defaultForm };
      }
    },

    fetchCourseInfoById(id){
      course.getCourseInfoById(id).then(response =>{
        this.courseInfo = response.data.item
      }).catch((response) => {
        this.$message({
          type: 'error',
          message: response.message 
        })
      });
    },


    initSubjectList() {
      subject.getNestedTreeList().then((response) => {
        this.subjectNestedList = response.data.items;
      });
    },

    next() {
      this.saveBtnDisabled = true;
      // todo 请求后端
      if (!this.courseInfo.id) {

        console.log("save");
        this.saveData();
      } else {
        console.log("update");
        this.updateData();
      }
    },
    // 保存
    saveData() {
      course
        .saveCourseInfo(this.courseInfo)
        .then((response) => {
          this.$message({
            type: "success",
            message: "保存成功!",
          });
          return response; // 将响应结果传递给then
        })
        .then((response) => {
          this.$router.push({
            path: "/edu/course/chapter/" + response.data.id,
          });
        })
        .catch((response) => {
          this.$message({
            type: "error",
            message: response.message,
          });
        });
    },

    updateData() {
      course.updateCourseInfo(this.courseInfo).then(response =>{
        if(response.success == true){
          this.$message({
            type: "success",
            message: "保存成功!",
          });
        }else{
          this.$message({
            type: "error",
            message: response.message,
          });
        }
      });
      this.$router.push({ path: `/edu/course/chapter/${this.courseInfo.id}`});
    },

  },
};
</script>

<style>
</style>