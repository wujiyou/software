<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="气瓶登记" level2="车用气瓶信息查看"></my-bread>
    </div>
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
              placeholder="请输入气瓶号"
              v-model="gasId"
            ></el-input>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
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
        <el-col :span="16">&nbsp;</el-col>
        <el-col :span="2">
          <el-button type="success" style="font-size:13px" size="small" @click="showAddUserDia()">
            <i style="padding-right:10px" class="el-icon-plus"></i>新&nbsp;增
          </el-button>
        </el-col>

        <el-col :span="2">
          <el-button
            type="info"
            size="small"
            style="margin-left:-5px; font-size:13px;"
            @click="firstAddUserDia()"
          >
            <i style="padding-right:10px" class="el-icon-top"></i>返回上一界面
          </el-button>
        </el-col>

        <el-col :span="2">
          <el-button
            type="danger"
            size="small"
            plain
            icon="el-icon-delete"
            style="margin-left:20px;font-size:13px"
            @click="showDeleUserMsgBox"
          >批量删除</el-button>
        </el-col>
      </el-col>
      <!-- 表格 -->
      <template>
        <el-table
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          border
          :data="userlist"
          style="width: 100%;margin:20px 0px;padding-bottom:40px"
          @selection-change="handleCurrentChanges"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="equType" label="设备类型"></el-table-column>
          <el-table-column show-overflow-tooltip prop="medium" label="充装介质"></el-table-column>
          <el-table-column show-overflow-tooltip prop="gasId" label="产品编号"></el-table-column>

          <el-table-column show-overflow-tooltip prop="makeInfo" label="生产(制造)单位"></el-table-column>
          <el-table-column show-overflow-tooltip prop="makeData" label="制造年月">
            <template show-overflow-tooltip slot-scope="socpe">{{socpe.row.makeData | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="pressure" label="公称工作压力（MPa）"></el-table-column>

          <el-table-column show-overflow-tooltip prop="volume" label="容积（L）"></el-table-column>
          <el-table-column show-overflow-tooltip prop="checkData" label="最近一次检验日期">
            <template slot-scope="socpe">{{socpe.row.checkData | fmtdate}}</template>
          </el-table-column>

          <el-table-column show-overflow-tooltip prop="nextCheckData" label="下次检验日期">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>

          <el-table-column show-overflow-tooltip prop="selfId" label="单位内编号"></el-table-column>

          <el-table-column prop="useStatus" label="变更或者停用情况">
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].useStatus==1">新增</p>
              <p v-if="userlist[scope.$index].useStatus==0">停用</p>
              <p v-if="userlist[scope.$index].useStatus==2">注销</p>
              <p v-if="userlist[scope.$index].useStatus==3">报废</p>
            </template>
          </el-table-column>

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
          <!-- <el-table-column prop="address" width="150" label="操 作">
            <template slot-scope="scope">
             
              <el-tooltip
                class="item"
                effect="dark"
                content="修改信息"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="primary"
                  size="mini"
                  title="修改"
                  plain
                  icon="el-icon-edit"
                  @click="showEdituser(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>
              
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="danger"
                  size="mini"
                  plain
                  icon="el-icon-delete"
                  circle
                  @click="showDeleUserMsgBox(scope.row.id)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>-->
        </el-table>
      </template>
      <el-pagination
        style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <el-dialog width="60%" title="添加信息" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form" :rules="rules" ref="form">
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item class="red_s" label="设备类型" label-width="140px" prop="equType">
                <el-select style=" width: 100%" v-model="form.equType">
                  <el-option
                    v-for="item in selects1"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="editUserForm.equType" autocomplete="off"></el-input> -->
                <!-- disabled实现用户名禁止改动 -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="red_s" label="充装介质" label-width="140px" prop="medium">
                <el-select style=" width: 100%" v-model="form.medium">
                  <el-option
                    v-for="item in selects2"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item class="red_s" label="产品编号" label-width="140px" prop="gasId">
                <el-input v-model="form.gasId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="red_s" label="制造年月" label-width="140px" prop="makeData">
                <!-- <el-input v-model="form.makeData" autocomplete="off"></el-input> -->
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.makeData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item class="red_s" label="公称工作压力（MPa）" label-width="140px" prop="pressure">
                <el-input v-model="form.pressure" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="red_s" label="容积（L）" label-width="140px" prop="volume">
                <el-input v-model="form.volume" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item class="red_s" label="最近一次检验日期" label-width="140px" prop="checkData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.checkData"
                  style="width: 100%;"
                  :picker-options="pickerOptions2"
                ></el-date-picker>
                <!-- <el-input v-model="form.checkData" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="red_s" label="下次检验日期" label-width="140px" prop="nextCheckData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.nextCheckData"
                  style="width: 100%;"
                  :picker-options="pickerOptions3"
                ></el-date-picker>
                <!-- <el-input v-model="form.nextCheckData" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item class="red_s" label="单位内编号" label-width="140px">
                <el-input v-model="form.selfId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="red_s" label="变更或者停用情况" label-width="140px" prop="useStatus">
                <el-select
                  style="width: 100%;"
                  :validate-event="false"
                  v-model="form.useStatus"
                  placeholder="请选择"
                >
                  <el-option
                    v-for=" (item,i) in options"
                    :key="i"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="9">
              <el-form-item class="red_s" label="设备代码:" label-width="140px" prop="sbCode">
                <el-input v-model="form.sbCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-left:5px;margin-right:5px;widht:60px;"
                @click="Regtion()"
                type="primary"
              >生成设备代码</el-button>
            </el-col>
            <el-col :span="12">
              <el-form-item class="red_s" label="生产(制造)单位" label-width="140px" prop="makeInfo">
                <el-select style=" width: 100%" v-model="form.makeInfo">
                  <el-option
                    v-for="item in selecttion"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
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
      <el-dialog width="60%" title="修改信息" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="editUserForm" :rules="rules">
          <el-form-item hidden label="ID" label-width="140px" prop="equType">
            <el-input v-model="editUserForm.id" autocomplete="off"></el-input>
            <!-- disabled实现用户名禁止改动 -->
          </el-form-item>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="设备类型" label-width="140px" prop="equType">
                <el-select style=" width: 100%" v-model="editUserForm.equType">
                  <el-option
                    v-for="item in selects1"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="editUserForm.equType" autocomplete="off"></el-input> -->
                <!-- disabled实现用户名禁止改动 -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="充装介质" label-width="140px" prop="medium">
                <el-select style=" width: 100%" v-model="editUserForm.medium">
                  <el-option
                    v-for="item in selects2"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="产品编号" label-width="140px" prop="gasId">
                <el-input v-model="editUserForm.gasId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="制造年月" label-width="140px" prop="makeData">
                <!-- <el-input v-model="form.makeData" autocomplete="off"></el-input> -->
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.makeData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="公称工作压力（MPa）" label-width="140px" prop="pressure">
                <el-input v-model="editUserForm.pressure" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="容积（L）" label-width="140px" prop="volume">
                <el-input v-model="editUserForm.volume" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="最近一次检验日期" label-width="140px" prop="checkData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.checkData"
                  style="width: 100%;"
                  :picker-options="pickerOptions2"
                ></el-date-picker>
                <!-- <el-input v-model="form.checkData" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下次检验日期" label-width="140px" prop="nextCheckData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.nextCheckData"
                  style="width: 100%;"
                  :picker-options="pickerOptions3"
                ></el-date-picker>
                <!-- <el-input v-model="form.nextCheckData" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="12">
              <el-form-item label="单位内编号" label-width="140px">
                <el-input v-model="editUserForm.selfId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="变更或者停用情况" label-width="140px" prop="changeStatus">
                <el-select
                  style="width: 100%;"
                  :validate-event="false"
                  v-model="editUserForm.useStatus"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item,i) in options"
                    :key="i"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="9">
              <el-form-item label="设备代码:" label-width="140px" prop="sbCode">
                <el-input v-model="editUserForm.sbCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-left:5px;margin-right:5px;widht:60px;"
                @click="Regtions()"
                type="primary"
              >生成设备代码</el-button>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生产(制造)单位" label-width="140px" prop="makeInfo">
                <el-select style=" width: 100%" v-model="editUserForm.makeInfo">
                  <el-option
                    v-for="item in selecttion"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
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
export default {
  name: "cinmessage",
  data() {
    return {
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.form.nextCheckData != "") {
            return time.getTime() > new Date(this.form.nextCheckData).getTime();
          }
        },
      },
      pickerOptions1: {
        disabledDate: (time) => {
          return (
            time.getTime() <
            new Date(this.form.checkData).getTime() + 1 * 24 * 60 * 60 * 1000
          ); //减去一天的时间代表可以选择同一天;
        },
      },
      pickerOptions2: {
        disabledDate: (time) => {
          if (this.editUserForm.nextCheckData != "") {
            return (
              time.getTime() >
              new Date(this.editUserForm.nextCheckData).getTime()
            );
          }
        },
      },
      pickerOptions3: {
        disabledDate: (time) => {
          return (
            time.getTime() <
            new Date(this.editUserForm.checkData).getTime() +
              1 * 24 * 60 * 60 * 1000
          ); //减去一天的时间代表可以选择同一天;
        },
      },
      query: "",
      gasId: "",
      userlist: [],
      selecttion: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      pageSize: 10,
      // id:1,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      selects1: [
        {
          id: 1,
          orders: "特种气瓶(内装填料气瓶、纤维缠绕气瓶、低温绝热气瓶)",
        },
        {
          id: 2,
          orders: "无缝气瓶",
        },
        {
          id: 3,
          orders: "焊接气瓶",
        },
      ],
      options: [
        { id: 0, name: "停用" },
        { id: 1, name: "新增" },
        { id: 2, name: "注销" },
        { id: 3, name: "报废" },
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
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        regId: "",
        equType: "", //设备类型
        medium: "", //充装介质
        gasId: "", //产品编号
        makeInfo: "",
        makeData: "", //制造年月
        pressure: "", //公称工作压力（MPa）
        volume: "", //容积（L）
        checkData: "", //最近一次检验日期
        nextCheckData: "", //下次检验日期
        selfId: "", //自身编号
        useStatus: "",
        changeStatus: "",
        sbCode: "",
      },

      rules: {
        equType: [{ required: true, message: "设备类型不能为空" }],
        medium: [{ required: true, message: "介质不能为空" }],
        gasId: [{ required: true, message: "气瓶号不能为空" }],
        makeInfo: [{ required: true, message: "生产厂家不能为空" }],
        makeData: [
          {
            type: "date",
            required: true,
            message: "生产日期不能为空",
          },
        ],

        pressure: [
          { required: true, message: "气瓶公称压力不能为空" },
          { pattern: /^[0-9].*$/, message: "请输入正确的气瓶公称压力单位" },
        ],
        volume: [
          { required: true, message: "容积不能为空" },
          { pattern: /^[0-9].*$/, message: "请输入正确的容积单位" },
        ],
        checkData: [
          {
            type: "date",
            required: true,
            message: "检验日期不能为空",
          },
        ],
        nextCheckData: [
          {
            type: "date",
            required: true,
            message: "下次检验日期时间不能为空",
          },
        ],
        selfId: [{ required: true, message: "单位内编号不能为空" }],
        useStatus: [{ required: true, message: "停用情况请选择" }],
      },
      // 编辑
      editUserForm: {
        id: "",
        equType: "",
        medium: "",
        gasId: "",
        makeInfo: "",
        makeData: "",
        pressure: "",
        volume: "",
        checkData: "",
        nextCheckData: "",
        selfId: "",
        checkStatus: "",
        useStatus: "",
        sbCode: "",
      },

      ids: -1,

      roles: [],
      currUsername: "",
      file: {},
      multipleSelection: [], //批量删除数据
      delarr: [], //批量删除id

      //   保存所有角色数据
    };
  },
  created() {
    this.getUserlist();
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },
  },
  methods: {
    async Regtion() {
      let regId = this.$route.query.id;
      console.log(this.form.makeData);
      if (this.form.makeData == "") {
        this.$message({
          type: "error",
          message: "请先填写制造日期",
        });
      } else {
        const data =
          this.form.makeData.getFullYear() +
          "-" +
          0 +
          (this.form.makeData.getMonth() + 1) +
          "-" +
          this.form.makeData.getDate();
        // let data=new Date(this.last.makeData).toLocaleDateString().replace(/\//g, '-')
        const res = await this.$http.get(
          `IDGenerate/carCylinderCode?id=${regId}&makeData=${data}`
        );
        console.log(res);
        this.form.sbCode = res.data;
      }
    },
    async Regtions() {
      let regId = this.$route.query.id;
      console.log(this.editUserForm.makeData);
      if (this.editUserForm.makeData == "") {
        this.$message({
          type: "error",
          message: "请先填写制造日期",
        });
      } else {
        const data =
          this.editUserForm.makeData.getFullYear() +
          "-" +
          0 +
          (this.editUserForm.makeData.getMonth() + 1) +
          "-" +
          this.editUserForm.makeData.getDate();
        // let data=new Date(this.last.makeData).toLocaleDateString().replace(/\//g, '-')
        const res = await this.$http.get(
          `IDGenerate/carCylinderCode?id=${regId}&makeData=${data}`
        );
        console.log(res);
        this.editUserForm.sbCode = res.data;
      }
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
          message: "请选择需要删除的数据",
        });
      } else {
        this.$confirm("是否删除这条气瓶信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            const res = await this.$http.post(
              `/carCylinder/delete`,
              this.delarr
            );
            console.log(res);
            this.delarr = [];
            // 提示
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getUserlist();
            } else if (res.data.code == 201) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
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
    firstAddUserDia() {
      this.$router.push({ name: "cindustrial" });
    },
    // 编辑用户
    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.post(
        `/carCylinder/update`,
        this.editUserForm
      );
      console.log(res);
      if (res.data.code === 200) {
        // 回到第一页展示
        //this.pagenum = 1;
        // 重新请求数据
        // this.getUserlist();
        // 提示
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.getUserlist();
      } else {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      }
      //  const { data: res } = await this.$http.get(`users/` + id)
      // if (res.data.meta.status !== 200) {
      //   return this.$message.error("查询用户信息失败！");
      // }
    },

    // 编辑对话框打开
   async showEdituser(user) {
      // 2.添加对话框
      console.log(user);

      this.dialogFormVisibleEdit = true;
      const res = await this.$http.get(`unitdrop/manufacturer?bottleType=0`);
      console.log(res);
      this.selecttion = res.data.data;
      this.editUserForm = user;

      //user其实就是scope.row也就是userlist
    },

    //   添加用户发送请求
    AddUser() {
      // 2.关闭对话框
      console.log(this.form.useStatus);
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 向后台发送请求
          const res = await this.$http.post(`/carCylinder/save`, this.form);
          if (res.data.code === 200) {
            // 回到第一页展示
            //this.pagenum = 1;
            // 重新请求数据
            // 提示
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.getUserlist();
            this.dialogFormVisibleAdd = false;
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
            });
            this.getUserlist();
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAdd = true;
        }
      });
    },
    // 添加用户显示对话框
    async showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单
      console.log(this.ids);
      this.dialogFormVisibleAdd = true;
      const res = await this.$http.get(`unitdrop/manufacturer?bottleType=0`);
      console.log(res);
      this.selecttion = res.data.data;
      this.form.regId = this.ids;
      this.form.equType = this.selects1[0].orders;
      this.form.medium = this.selects2[0].orders;
      this.form.useStatus = 1;
      console.log(this.form.regId);
      // const res = await this.$http.get(`/carCylinder/saveId?id=${this.ids}`);

      // console.log(res);
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/carCylinder/select?id=${this.ids}&pageSize=${this.pageSize}&currPage=1&gasId=${this.gasId}`
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      // console.log("aaaaaa");``
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      this.currPage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currPage = val;
      this.getUserlist();
    },

    getUserlist() {
      this.ids = this.$route.query.id;
      console.log(this.ids);
      this.$http
        .get(
          `/carCylinder/select?id=${this.ids}&pageSize=${this.pageSize}&currPage=${this.currPage}`
        )
        .then((res) => {
          console.log(res);
          this.userlist = res.data.data.list;
          this.total = res.data.data.totalCount;
        });
    },
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
.el-button--mini,
.el-button--mini.is-round {
  padding: 9px 15px;
  margin-left: 8px;
}
</style>
<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
[class*="el-col-"] {
  margin-top: 5px;
}
.red_s label {
  color: #f00 !important;
}
</style>