<template>
  <div>

    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!-- 面包屑 -->
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right " class="arrow_right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>-->

      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
        </el-col>

        <el-col style="padding-left:15px" :span="22">
          <el-col :span="4">
            <el-input
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入登记证编号"
              v-model="regId"
            ></el-input>
          </el-col>
          <el-col style="margin-left:30px" :span="4">
            <el-input
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入使用单位"
              v-model="buildingUser"
            ></el-input>
          </el-col>
          <el-col style="margin-left:30px" :span="4">
            <el-select
              size="small"
              clearable
              style=" width: 100%;"
              v-model="isCard"
              placeholder="请选择是否发卡"
            >
              <el-option
                v-for="item in optionslei"
                :key="item.id"
                :label="item.lei"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-input
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入气瓶编号"
              v-model="gasId"
            ></el-input>
          </el-col>
          <el-col :span="3">
            <!-- <el-button @click="showAddUserDia()" type="primary">
          <i style="padding-right:10px" class="el-icon-plus"></i>新增
            </el-button>-->
          </el-col>
          <el-col style="margin-top:15px" :span="24">
            <el-col :span="4">
              <el-select
                @clear="loadUserList()"
                clearable
                size="small"
                style=" width: 100%;"
                v-model="medium"
                placeholder="请选择介质"
              >
                <el-option
                  v-for="item in selects2"
                  :key="item.id"
                  :label="item.orders"
                  :value="item.orders"
                ></el-option>
              </el-select>
            </el-col>
            <el-col style="padding-left:15px" :span="4">
              <el-button
                size="small"
                style=" width: 100%;"
                @click="searchUser()"
                class="el_button"
                icon="el-icon-search"
              >搜索</el-button>
            </el-col>
          </el-col>
        </el-col>
      </el-row>

      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>

      <el-col style="margin-bottom:15px;margin-top:15px" :span="24">
        <el-col :span="20">&nbsp;</el-col>
        <el-col :span="2">
          <el-button style="font-size:14px;" type="info" @click="Editusertion()" size="small">刷新</el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            style="font-size:13px;"
            type="success"
            @click="showEdituser()"
            size="small"
          >标签卡发卡</el-button>
        </el-col>
      </el-col>

      <!-- 表格 -->
      <template>
        <el-table
          border
          :data="IndustryLabelList"
          style="width: 100%;margin:20px 0px;padding-bottom:40px;"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <el-table-column show-overflow-tooltip type="index" label="序号" width="50"></el-table-column>
          <el-table-column show-overflow-tooltip prop="regId" label="登记证编号"></el-table-column>

          <el-table-column show-overflow-tooltip prop="gasId" label="气瓶编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="appid" label="标签号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="medium" label="介质"></el-table-column>
          <el-table-column show-overflow-tooltip prop="checkData" label="检验日期">
            <template slot-scope="socpe">{{socpe.row.checkData | fmtdate}}</template>
          </el-table-column>

          <el-table-column show-overflow-tooltip prop="nextCheckData" label="下次检验日期">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="inspectName" label="检验单位"></el-table-column>
          <el-table-column prop="isCard" label="是否发卡" show-overflow-tooltip>
            <template slot-scope="scope">
              <p v-if="IndustryLabelList[scope.$index].isCard==0">未发卡</p>
              <p v-if="IndustryLabelList[scope.$index].isCard==1">已发卡</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="buildingUser" label="使用单位"></el-table-column>

          <!-- <el-table-column prop="create_time" label="创建时间"></el-table-column> -->
          <!-- <el-table-column label="创建时间"> -->
          <!-- main.js写了一个全局过滤器 -->
          <!-- 如果单元格内显示的内容不是字符串（文本）
          需要给被显示的内容包裹一个template-->
          <!-- template内部要用数据 设置slot-scope属性
          该属性的值是要用数据create_time的数据源userlist-->
          <!-- slot-scope的值userlist其实就是el-table绑定的数据userlist
          userlist.row >数组中的每个对象-->
          <!-- slot-scope自动去找上一级所绑定的数据 userlist-->
          <!-- <template slot-scope="socpe">{{socpe.row.create_time | fmtdate}}</template> -->
          <!-- </el-table-column> -->

          <!-- <el-table-column label="用户状态">
          <template slot-scope="socpe">-->
          <!-- 找到开关@change="changeMgStatus(scope.row)" -->
          <!-- changeMgStatus  发送put请求 -->
          <!-- users/:uId/state/:type uid用户id -->
          <!-- <el-switch
              @change="changeMgStatus(socpe.row)"
              v-model="socpe.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
          </el-table-column>-->
          <!-- 表格操作 -->
        </el-table>
      </template>
      <!-- 4.分页 -->
      <!-- 》该接口支持分页 url参数中有pagenum，pagesize
          @size-change 每页显示条数变化时触发
          @current-change当前页改变时触发
          :current-page 设置当前页是第几页
           :page-sizes="[5, 10, 15, 20]"每页多少条的数据组
           :page-size="5"设置显示多少条
           :total="400"分页总数
      -->
      <el-pagination
        style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <!-- <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="员工编号" label-width="100px" prop="email">
          <el-input v-model="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="100px" prop="mobile">
          <el-input v-model="editUserForm.sex" autocomplete="off"></el-input>
        </el-form-item>

       

        <el-form-item label="电话" label-width="100px" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="所属单位" label-width="100px" prop="mobile">
          <el-input v-model="form.mond" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddUser()">确 定</el-button>
      </div>
      </el-dialog>-->

      <!-- 编辑对话框 -->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="editUserForm">
          <el-form-item label="用户名" label-width="100px" prop="username">
            <el-input disabled v-model="editUserForm.username" autocomplete="off"></el-input>
            <!-- disabled实现用户名禁止改动 -->
          </el-form-item>

          <el-form-item label="员工编号" label-width="100px" prop="email">
            <el-input v-model="editUserForm.number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="100px" prop="mobile">
            <el-input v-model="editUserForm.sex" autocomplete="off"></el-input>
          </el-form-item>

          <!-- <el-form-item label="特别设备行政许可证" label-width="100px" prop="mobile">
          <el-input v-model="editUserForm.licence" autocomplete="off"></el-input>
          </el-form-item>-->

          <el-form-item label="电话" label-width="100px" prop="mobile">
            <el-input v-model="editUserForm.mobile" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="所属单位" label-width="100px" prop="mobile">
            <el-input v-model="editUserForm.mond" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="EditUser()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import jwtDecode from "jwt-decode";
import {getIndustryLabel} from "../../utils/api"
export default {
  name: "tagboard",
  data() {
    return {
      query: "",
      select: "",
      faka: "",
      buildingUser: "",
      regId: "",
      gasId: "",
      isCard: "",
      medium: "",
      IndustryLabelList: [],
      token: [],
      //分页相关数据
      total: -1,
      pagenum: 1,
      pagesize: 10,
      // 添加对话框的属性
      // dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        username: "",
        number: "",
        sex: "",
        mobile: "",
        mond: "",
      },
      // 编辑
      editUserForm: {
        username: "",
        number: "",
        sex: "",
        mobile: "",
        mond: "",
      },
      optionslei: [
        {
          id: 1,
          lei: "已发卡",
        },
        {
          id: 0,
          lei: "未发卡",
        },
      ],
      selects2: [
        {
          id: 1,
          orders: "CNG",
        },
        {
          id: 2,
          orders: "LPG",
        },
        {
          id: 3,
          orders: "LNG",
        },
        {
          id: 4,
          orders: "H2",
        },
        {
          id: 5,
          orders: "N2",
        },
      ],
      // 分配角色,
      currRoleId: -1,
      //   分配当前用户id
      currusrId: -1,
      roles: [],
      currUsername: "",
      //   保存所有角色数据
    };
  },

  methods: {
    Editusertion() {
      this.getIndustryLabelList();
    },
    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.put(
        `users/${this.editUserForm.id},this.editUserForm`
      );
      //  const { data: res } = await this.$http.get(`users/` + id)
      if (res.data.meta.status !== 200) {
        return this.$message.error("查询用户信息失败！");
      }
    },

    // 标签发卡
    async showEdituser(user) {
      let tokens = this.token;
      let token = sessionStorage.getItem("access_token");
      let unitId = sessionStorage.getItem("unitId");
      console.log(unitId);
      const res = await this.$http.post(`send/sendService`, tokens);
      console.log(res);
      if (res.data.code == 201) {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      } else {
        let http = res.data.data;
        // 2.添加对话框
        window.open(
          `${http}/send/industrialTuckComb?unitId=${unitId}`,
          "_blank"
        );
        //user其实就是scope.row也就是userlist
      }
    },

    //删除用户 打开消息盒子
    showDeleUserMsgBox(userId) {
      // 提示框 点击确定走.then
      // 点取消 走.catch
      this.$confirm("删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 注意async的位置，最近的位置
          // 发送删除请求:id:用户id
          // 1.data中找userId
          // 2.把userID以showDeleUserMsgBox参数形式传进来
          const res = await this.$http.delete(`users/${userId}`);
          if (res.data.meta.status === 200) {
            // 回到第一页展示
            //this.pagenum = 1;
            // 重新请求数据
            this.getIndustryLabelList();
            // 提示
            this.$message({
              type: "success",
              message: res.data.meta.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    qingshowAddUserDia() {
      console.log(1);
    },
    // 添加用户显示对话框
    // showAddUserDia() {
    //   // 先点编辑 再点添加 打开表单清空表单
    //   this.form = {};
    //   this.dialogFormVisibleAdd = true;
    // },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getIndustryLabelList();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/industrial/findPage?&page=${this.pagenum}&rows=${this.pagesize}&buildingUser=${this.buildingUser}&regId=${this.regId}&gasId=${this.gasId}&isCard=${this.isCard}&medium=${this.medium}`
      );
      console.log(res);
      this.IndustryLabelList = res.data.data.list;
      this.total = res.data.data.totalCount;
      // console.log("aaaaaa");
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pagesize = val;
      // 回到第一页
      this.pagenum = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getIndustryLabelList();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getIndustryLabelList();
    },
    async getIndustryLabelList() {
      //需要授权的API ，必须在请求头中使用Authorization 字段token令牌
      //pagenum当前页面   pagesize每页显示条数
      //接口文档中 除了登录接口之外的所有请求都需要进行授权，设置请求头
      //找axios中关于请求头的代码  写在了http.js中
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      let access_token = sessionStorage.getItem("access_token");
      let decode = jwtDecode(access_token);
      console.log(decode);
      this.token = decode.authorities;
      getIndustryLabel().then(res=>{
        
      })
      // const res = await this.$http.get(
      //   `/industrial/findPage?&page=${this.pagenum}&rows=${this.pagesize}`
      // );
      console.log(res);
      this.IndustryLabelList = res.data.data.list;
      this.total = res.data.data.totalCount;
      // const {
      //   meta: { status, msg },
      //   data: { users, total }
      // } = res.data;
      // if (status === 200) {
      //   // 1.给表格数据赋值
      //   // 给总数赋值
      //   // 提示
      //   // 表格通过prop进行赋值展示一般数据
      //   this.userlist = users;
      //   this.total = total;
      //   this.$message.success(msg);
      // } else {
      //   this.$message.warning(msg);
      // }
    },
  },
  created() {
    this.getIndustryLabelList();
  },
};
</script>
<style scoped>
.el-tooltip__popper {
  max-width: 0%;
}
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
[class*="el-col-"] {
  margin-top: 5px;
}
.el_button {
  background-color: #66b1ff !important;
  border-color: #66b1ff !important;
  color: #fff !important;
}
</style>