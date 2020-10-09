<template>
  <div class="LiqPritingCon">
    <div class="headerSearrch">
      <el-row :gutter="10" class="searchCon">
        <el-col style="margin-bottom:10px;margin-top:10px" :span="24">
          <el-col :span="20"><img src=""/></el-col>
          <el-col :span="2">
            <el-button
              type="success"
              @click="showAddUserDia()"
              style="font-size:13px"
              size="small"
            >
              <i style="padding-right:10px" class="el-icon-plus"></i>新增
            </el-button>
          </el-col>

          <el-col :span="2">
            <el-button
              type="danger"
              size="small"
              style="font-size:13px"
              plain
              icon="el-icon-delete"
              @click="showDeleUserMsgBox"
              >删除</el-button
            >
          </el-col>
        </el-col>
      </el-row>
    </div>
    <el-table
      border
      :data="peopleList"
      style="width: 100%;margin:20px 5px;padding-bottom:40px"
      :row-style="{ height: '40px' }"
      :cell-style="{ padding: '0px' }"
      @selection-change="handleCurrentChanges"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="50"
        show-overflow-tooltip
      >
        <template slot-scope="socpe">
          <p style="cursor:pointer;" @click="showEdituser(socpe.row)">
            {{ socpe.$index + 1 }}
          </p>
        </template>
      </el-table-column>
      <!-- <el-table-column show-overflow-tooltip prop="code" label="角色编号"></el-table-column> -->
      <el-table-column
        prop="createdTime"
        label="创建时间"
        show-overflow-tooltip
      >
        <template slot-scope="socpe">{{
          socpe.row.createdTime | fmtdate
        }}</template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="角色类型"
        :formatter="ifendcase"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="note"
        label="备注"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        show-overflow-tooltip
      ></el-table-column>
      <!-- 表格操作 -->
      <!-- <el-table-column prop="address" width="150" label="操 作">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="授权管理"
            :enterable="false"
            placement="top"
          >
            <el-button
              type="success"
              size="mini"
              title="授权管理"
              plain
              icon="el-icon-s-order"
              @click="userNewRole(scope.row)"
              circle
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.currpage"
      :page-sizes="[10, 15, 20, 25, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加对话框 -->
    <el-dialog
      title="添加角色"
      :close-on-click-modal="false"
      ref="dialog__wrapper"
      :visible.sync="dialogFormVisibleAdd"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-col :span="24">
          <!-- <el-col :span="10">
              <el-form-item label="角色编号" label-width="100px" prop="code">
                <el-input v-model="form.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>-->
          <!-- <el-col :span="2">&nbsp;</el-col> -->
          <el-col :span="10">
            <el-form-item
              label="角色类型"
              class="red_s"
              label-width="100px"
              prop="type"
            >
              <el-select width="100%" v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in optionsname"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item label="角色名称" label-width="100px" prop="name">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="10">
            <el-form-item
              label="创建时间"
              label-width="100px"
              prop="createdTime"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.createdTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="备注" label-width="100px" prop="note">
              <el-input v-model="form.note" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="10">
            <el-form-item label="用户名" label-width="100px" prop="username">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="密码" label-width="100px" prop="password">
              <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系电话" label-width="100px" prop="phone">
              <el-input v-model="editUserForm.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog
      title="修改信息"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisibleEdit"
    >
      <el-form :model="editUserForm" :rules="rules">
        <el-col :span="24">
          <el-col :span="10">
            <el-form-item label="角色类型" label-width="100px" prop="type">
              <el-select v-model="editUserForm.type" placeholder="请选择">
                <el-option
                  v-for="item in optionsname"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="10">
            <el-form-item label="角色名称" label-width="100px" prop="name">
              <el-input
                v-model="editUserForm.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="10">
            <el-form-item
              label="创建时间"
              label-width="100px"
              prop="createdTime"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.createdTime"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="备注" label-width="100px" prop="node">
              <el-input
                v-model="editUserForm.note"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="用户名" label-width="100px" prop="username">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="密码" label-width="100px" prop="password">
              <el-input
                v-model="editUserForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系电话" label-width="100px" prop="phone">
              <el-input v-model="editUserForm.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-form-item hidden label="Id" label-width="100px" prop="id">
            <el-input v-model="editUserForm.id" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="EditUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加权限用户对话框 -->
    <el-dialog
      title="添加权限"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisiblesetrole"
    >
      <p style="margin:0px 20px 20px 20px">角色名称：{{ this.jiaoname }}</p>
      <el-tree
        top="1vh"
        ref="tree"
        :data="treeRole"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrcheck"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Visiblesetrole()">取 消</el-button>
        <el-button type="primary" @click="dialogsetrole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {
//   geAllPeopleList,
//   postAddpeople,
//   postDeletepeople,
//   putMouPeople,
// } from "../../utils/api";
export default {
  data() {
    return {
      dialogFormVisibleAdd: false, //是否显示添加对话框
      peopleList: [],
      params: {
        pageSize: 10, //每页10条数据
        currpage: 1, //当前页
      },
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisiblesetrole: false,
      jiaoname: "",
      treeRole: [],
      arrcheck: [],
      defaultProps: {
        label: "name",
        children: "children",
      },
      //角色类型
      optionsname: [
        {
          id: 0,
          label: "web管理员",
        },
        {
          id: 1,
          label: "企业",
        },
        {
          id: 2,
          label: "机构",
        },
      ],
      total: 4, //返回数据的总数
      rules: {
        type: [
          { required: true, message: "角色类型不能为空", trigger: "blur" },
        ],
      },
      tableData2: [],
      form: {
        // code: "",
        name: "",
        note: "",
        type: "",
        createdTime: "",
        password: "",
        phone:""
      },
      // 编辑
      editUserForm: {
        id: "",
        // code: "",
        name: "",
        note: "",
        type: "",
        createdTime: "",
        password: "",
        phone:""
      },
      delarr: [], //批量删除id
      multipleSelection: [], //批量删除数据
    };
  },
  created() {
    this.tableData2 = this.tableData;
    this.getAllPapleData();
  },
  methods: {
    //获取所有人员信息
    getAllPapleData() {
      geAllPeopleList(this.params).then((res) => {
        console.log(res);
        this.peopleList = res.data.list;
      });
    },
    handleCurrentChanges(val) {
      this.multipleSelection = val;
      // this.showDeleUserMsgBox = val.length;
    },
    //添加用户
    AddUser() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          postAddpeople(this.form).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "新增成功",
              });
              this.dialogFormVisibleAdd = false;
              this.getAllPapleData();
            } else if(res.code == 1){
              this.$message({
                type: "warning",
                message: res.msg,
              });
            }else{
              this.$message({
                type: "error",
                message: "新增失败",
              });

            }
          });
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAdd = true;
        }
      });
      // this.getAllPapleData();
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
          message: "请选择需要删除的角色",
        });
      } else {
        this.$confirm("是否删除角色?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            postDeletepeople(this.delarr).then((res) => {
              console.log(res);
              this.delarr = [];
              // 提示
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: res.msg,
                });
                this.getAllPapleData();
              } else if (res.code == 1) {
                this.$message({
                  type: "waring",
                  message: res.msg,
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
            this.delarr = [];
          });
      }
    },
    // 编辑对话框打开
    showEdituser(user) {
      // 2.添加对话框
      this.dialogFormVisibleEdit = true;
      this.editUserForm = user;

      this.getAllPapleData();
      //user其实就是scope.row也就是userlist
    },
    // 编辑用户
    // 编辑用户发送请求
    EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      putMouPeople(this.editUserForm).then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.getAllPapleData();
        } else {
          this.$message({
            type: "error",
            message: "新增失败",
          });
        }
      });
    },
    //角色类型的添加和修改显示
    ifendcase(val) {
      // console.log(val);
      if (val.type == 0) {
        return "web管理员";
      } else if (val.type == 1) {
        return "企业";
      } else if (val.type == 2) {
        return "机构";
      }
      //  else if (val.type == 3) {
      //   return "充装单位";
      // } else if (val.type == 4) {
      //   return "配送单位";
      // } else if (val.type == 5) {
      //   return "使用单位";
      // } else if (val.type == 6) {
      //   return "其他单位";
      // }
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.rows = val;
      // 回到第一页
      this.page = 1;

      this.getAllPapleData();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getAllPapleData();
    },
    // 添加用户显示对话框
    showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单
      this.dialogFormVisibleAdd = true;
    },
  },
};
</script>

<style lang="less" scoped>
//  /deep/.el-table th, .el-table tr{
//    border-bottom: 1px solid #ccc;
//  }
//  /deep/.el-table td, .el-table th.is-leaf{
//    border-bottom: 1px solid #ccc;
//  }
.LiqPritingCon {
  padding: 0 !important;
  .headerSearrch {
    overflow: hidden;
    // border: 1px solid #b1d3ff;
    // padding: 20px 0 20px !important;
    // background: linear-gradient(to top, #b1d3ff, #ffffff);
    .searchCon {
      padding-top: 20px;
      //  border: 1px solid #b1d3ff;
      //  background: linear-gradient(to top,#b1d3ff,#b1d3ff,#ffffff) ;
      min-width: 1580px;
      .rowSpa {
        margin-bottom: 10px;
        line-height: 40px;
        .textTitle {
          text-align: right;
        }
      }
      .btnSpa {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
