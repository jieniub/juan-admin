<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="3"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>
    <div class="ccInfo">
      <img :src="coursePublish.cover" />
      <div class="main">
        <h2>{{ coursePublish.title }}</h2>
        <p class="gray">
          <span>共{{ coursePublish.lessonNum }}课时</span>
        </p>
        <p>
          <span
            >所属分类：{{ coursePublish.subjectLevelOne }} —
            {{ coursePublish.subjectLevelTwo }}</span>
        </p>
        <p>课程讲师：{{ coursePublish.teacherName }}</p>
      </div>
    </div>
    <div>
      <el-button @click="previous">返回修改</el-button>
      <el-button @click="save">保存</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish()"
        >发布课 程</el-button
      >
    </div>
  </div>
</template>

<script>
import course from "@/api/edu/course"
import publish from "@/api/edu/publish"
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId: "", // 所属课程
      coursePublish: {},
    };
  },
  created() {
    this.init();
  },
  methods: {

    save(){
      this.$router.push("/edu/course/list");
    },


    previous() {
      this.$router.push(`/edu/course/chapter/${this.courseId}`);
    },
    publish() {
      publish.publishCourse(this.courseId).then((response)=>{
        if(response.code === 20000){
          this.$message({
            type: "success",
            message: "发布成功!",
          });
          this.$router.push("/edu/course/list");
        }
        else{
          this.$message({
            type: "error",
            message: "发布失败!",
          });
        }
      })
      
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
        // 根据id获取课程基本信息
        this.fetchCoursePublishInfoById();
      }
    },
    fetchCoursePublishInfoById() {
      course.getCoursePublishInfoById(this.courseId).then((response) => {
        this.coursePublish = response.data.item;
      });
    },
  },
};
</script>

<style scoped>
.ccInfo {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #ddd;
  margin-bottom: 40px;
  position: relative;
}
.ccInfo img {
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}
.ccInfo .main {
  margin-left: 520px;
}
.ccInfo .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main h3 {
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>