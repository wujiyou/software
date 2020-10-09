<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <!-- <my-bread level1="预警管理" level2="系统监管" level3="系统操作日志"></my-bread> -->
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索-->
      <!-- <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
        </el-col>
        <el-col :span="22">
          <el-col style="margin-left:10px" :span="4">
            <el-date-picker
              @clear="loadUserList()"
              clearable
              size="small"
              style=" width: 100%;"
              type="date"
              placeholder="操作时间"
              @input="searchUser"
              v-model="createdTime"
            ></el-date-picker>
          </el-col>

          <el-col style="margin-left:10px" :span="4">
            <el-input
              @clear="loadUserList()"
              clearable
              size="small"
              style=" width: 100%;"
              class="input-serach"
              placeholder="请输入操作人"
              v-model="username"
            ></el-input>
          </el-col>

          <el-col :span="4" style="margin-left:15px;">
            <el-button
              size="small"
              style=" width: 100%;"
              @click="searchUser()"
              class="el_button"
              icon="el-icon-search"
            >搜索</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>
      <el-col style="margin-bottom:5px;margin-top:5px" :span="24">
        <el-col :span="22">&nbsp;</el-col>

        <el-col :span="2">

          <el-button type="danger" size="small" style="font-size:13px" plain icon="el-icon-delete" @click="showDeleUserMsgBox">删除</el-button>

        </el-col>
      </el-col> -->
      <!-- 表格 -->
      <template>
        <el-table
          border
          :data="logList"
          style="width: 100%;margin:20px 0px;padding-bottom:40px;"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          @selection-change="handleCurrentChanges"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <!-- <el-table-column prop="username" label="操作人" width="120" show-overflow-tooltip></el-table-column> -->

          <!-- <el-table-column type="level" label="日志等级" width="120" show-overflow-tooltip></el-table-column> -->
          <el-table-column prop="operationType" label="操作类型"  show-overflow-tooltip></el-table-column>
          <el-table-column prop="createdTime" label="操作时间" show-overflow-tooltip>
            <template slot-scope="socpe">{{socpe.row.createdTime | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="note" label="日志描述" show-overflow-tooltip>
            <template slot-scope="scope">{{aa(scope.row.note)}}</template>
          </el-table-column>
        </el-table>
      </template>
    
      <el-pagination
        style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
// import {getAllLogList} from "../../utils/api"
export default {
  name: "accounts",
  data() {
    return {
      logList: [],
      //分页相关数据
      total: -1,
      rows: 10,
      page: 1,
      createdTime: "",
      // username: "",
      multipleSelection: [], //批量删除数据
      delarr: [] //批量删除id
    };
  },
   created() {
    // this.getUserlist();
    this.getAllLogData()
  },

  methods: {
    getAllLogData(){
      getAllLogList(this.page,this.rows).then((res)=>{
        this.logList=res.data.list
        console.log(res)
      })

    },
    // 多选
    handleCurrentChanges(val) {
      this.multipleSelection = val;
      // this.showDeleUserMsgBox = val.length;
    },

    // 批量删除请求数据
    showDeleUserMsgBox() {
      for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
        this.delarr.push(this.multipleSelection[i].id);
      }
      console.log(this.delarr);
      if (this.delarr == "") {
        this.$message({
          type: "error",
          message: "请选择需要删除的日志"
        });
      } else {
        this.$confirm("是否删除这条日志?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            // let ids={
            //   'ids':this.delarr
            // }
            const res = await this.$http.post(
              `/operation-logs/delete`,
              this.delarr
            );
            console.log(res);
            this.delarr = [];

            // 提示
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.getUserlist();
            } else if (res.data.code == 1) {
              this.$message({
                type: "warning",
                message: res.data.msg
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
            this.delarr = [];
          });
      }
    },
    aa(note) {
      let arr = note.substring(22, note.length);
      var str = "";
      switch (note) {
        default:
          str = arr;
      }
      return str;
    },
    
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const dering = this.createdTime;
      if (dering == "") {
        this.getUserlist();
      } else if (dering === null) {
        this.createdTime = "";
        this.getUserlist();
      } else {
        const resDate =
          dering.getFullYear() +
          "-" +
          (dering.getMonth() + 1) +
          "-" +
          dering.getDate();
        const res = await this.$http.get(
          `/operation-logs/findPage?page=${this.page}&rows=${this.rows}&createdTime=${resDate}&username=${this.username}&&type=0`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        this.page = 1;
      }

      // console.log("aaaaaa");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.rows = val;
      // 回到第一页
      this.page = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getUserlist();
    },
    async getUserlist() {
      const res = await this.$http.get(
        `/operation-logs/findPage?page=${this.page}&rows=${this.rows}&username=${this.username}&createdTime=${this.createdTime}&type=0`
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    }
  },
 
};
</script>
<style scoped>
.arrow_right {
  padding: 10px 0px;
  margin-bottom: 10px;
}
/* .pp{
   justify-content: flex-end;
} */
.input-serach {
  width: 400px;
}
.el_button {
  background-color: #66b1ff !important;
  border-color: #66b1ff !important;
  color: #fff !important;
}
</style>