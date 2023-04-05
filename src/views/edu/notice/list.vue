  <template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="title" label="标题" width="450"> </el-table-column>
      <el-table-column label="科室">
        <template slot-scope="scope">
          <span>{{ typeClass[scope.row.type] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a style="color: cornflowerblue" href="#" v-if="scope.row.status == 0"
            >发布</a
          >
          <span v-if="scope.row.status != 0">已发布</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px" class="block">
      <el-pagination
        @next-click="cur+1"
        @prev-click="cur-1"
        @current-change="getPage(cur)"
        :current-page.sync="cur"
        :page-size="10"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

  <script>
import notice from "@/api/edu/notice";
export default {
  data() {
    return {
      cur: 1,
      page: 1,
      total: 0,
      limit: 10,
      tableData: [],
      typeClass: [
        "教务科",
        "学籍管理科",
        "教学秩序科",
        "教材科",
        "考务科",
        "信息科",
        "教学培养科",
        "实践教学科",
      ],
    };
  },
  methods: {
    getPage(page){
      notice.getPage(page, this.limit).then((res) => {
      this.tableData = res.data.items;
      this.total = res.data.total;
    });
    }
  },
  mounted() {
    notice.getPage(this.page, this.limit).then((res) => {
      this.tableData = res.data.items;
      this.total = res.data.total;
    });
  },
};
</script>