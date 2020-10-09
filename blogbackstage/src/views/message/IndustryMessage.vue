<template>
  <div class="GasManagementCon">
    <div class="headerSearrch">
      <el-card class="box-card" >
        <!--搜索  -->
        <el-row>
          <el-col :span="24">
            <h5 style="padding-bottom:15px;padding-left:15px">查询信息</h5>
          </el-col>
          <el-col style="padding-left:15px" :span="22">
            <el-col :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                clearable
                class="input-serach"
                placeholder="请输入产品编号"
                v-model="params.gasId"
              ></el-input>
            </el-col>
            <el-col style="margin-left:30px;" :span="4">
              <el-select
                size="small"
                style=" width: 80%;"
                clearable
                v-model="params.medium"
                placeholder="请选择气瓶状态"
              >
                <el-option
                  v-for="item in optionsse"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-col>
            <el-col style="margin-left:30px" :span="4">
              <el-button
                size="small"
                style=" width:90%;"
                type="primary"
                icon="el-icon-search"
                @click="searchUser()"
                >搜索</el-button
              >
            </el-col>
          </el-col>
        </el-row>

        <el-col :span="24">
          <p
            style="width:100%;height:1px;margin:20px 0px 0px 0px;z-index:999"
          ></p>
        </el-col>

        <el-col style="margin-bottom:5px;margin-top:5px" :span="24">
          <el-col :span="10"><img src=""/></el-col>
          <el-col :span="2">
            <el-button
              type="success"
              style="font-size:13px"
              size="small"
              @click="showAddUserDia()"
            >
              <i style="padding-right:10px" class="el-icon-plus"></i>新&nbsp;增
            </el-button>
          </el-col>

          <!-- <el-col :span="2">
            <el-button
              type="info"
              size="small"
              style="margin-left:-5px; font-size:13px;"
             
            >
              <i style="padding-right:10px" class="el-icon-top"></i>返回上一界面
            </el-button>
          </el-col> -->

          <el-col :span="2" style="margin-left:20px;">
            <el-button
              type="success"
              plain
              size="small"
              style="font-size:13px;"
              @click="downTemplate()"
            >
              <i style="padding-right:10px" class="el-icon-download"></i
              >下载excel模板
            </el-button>
          </el-col>

          <el-col :span="2" style="margin-left:40px;">
            <el-button type="success" plain size="small" @click="downtemplatee()" style="font-size:13px">
              <i style="padding-right:10px" class="el-icon-download"></i>
              {{loadingbuttext}}
            </el-button>
          </el-col>

          <el-col :span="3" style="margin-left:45px;">
            <el-upload
              class="upload-demo"
              style="margin-left:20px;"
              action
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              multiple
              :limit="1"
              :http-request="uploadFile"
            >
              <el-button
                type="success"
                plain
                size="small"
                style="font-size:13px"
              >
                <i style="padding-right:10px" class="el-icon-upload2"></i
                >点击数据批量上传
              </el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传Excel文件</div> -->
            </el-upload>
          </el-col>
          <el-col :span="2" style="margin-left:20px">
            <el-button
              type="danger"
              size="small"
              plain
              style="font-size:13px;"
              icon="el-icon-delete"
              @click="showDeleUserMsgBox"
              >批量删除</el-button
            >
          </el-col>
        </el-col>
      </el-card>
    </div>
    <el-table
      :row-style="{ height: '40px' }"
      :cell-style="{ padding: '0px' }"
      border
      :data="gasList"
      style="width: 100%;margin:20px 0px;padding-bottom:40px"
      @selection-change="handleCurrentChanges"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="70"
        show-overflow-tooltip
      >
        <template slot-scope="socpe">
          <p style="cursor:pointer;" @click="showEdituser(socpe.row)">
            {{ socpe.$index + 1 }}
          </p>
        </template>
      </el-table-column>
      <!-- <el-table-column type="index" label="序号" width="70"></el-table-column> -->
      <el-table-column
        show-overflow-tooltip
        prop="equType"
        label="设备类型"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="medium"
        label="充装介质"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="gasId"
        label="产品编号"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="makeInfo"
        label="生产(制造)单位"
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="makeData" label="制造年月">
        <template slot-scope="socpe">{{
          socpe.row.makeData | fmtdate
        }}</template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="pressure"
        label="公称工作压力（MPa）"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="volume"
        label="容积（L）"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="checkData"
        label="最近一次检验日期"
        width="100"
      >
        <template slot-scope="socpe">{{
          socpe.row.checkData | fmtdate
        }}</template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="nextCheckData"
        label="下次检验日期"
      >
        <template slot-scope="socpe">{{
          socpe.row.nextCheckData | fmtdate
        }}</template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="selfId"
        label="单位内编号"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="changeStatus"
        label="变更或者停用情况"
      >
        <template slot-scope="scope">
          <p v-if="gasList[scope.$index].changeStatus == 1">新增</p>
          <p v-if="gasList[scope.$index].changeStatus == 0">停用</p>
          <p v-if="gasList[scope.$index].changeStatus == 2">注销</p>
          <p v-if="gasList[scope.$index].changeStatus == 3">报废</p>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.currpage"
      :page-sizes="[5, 10, 15, 20, 25, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加对话框 -->
    <el-dialog
      width="60%"
      title="添加信息"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisibleAdd"
    >
      <!-- :rules="ruless" ref="form" -->
      <el-form :model="form">
        <el-col :span="24">
          <el-col :span="8">
              <el-form-item class="red_s" prop="sheng" label-width="100px" label="行政省份:">
                <el-select
                  style=" width: 100%;"
                  clearable
                  v-model="form.sheng"
                  @change="changeSheng(form.sheng)"
                  placeholder="请选择省份"
                  
                >
                  <el-option
                    v-for="item in shengList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="8">
              <el-form-item class="red_s" prop="city" label-width="100px" label="市级区域:">
                <el-select
                  style=" width: 100%;"
                  clearable
                  v-model="form.city"
                  @change="changCity(form.city)"
                  placeholder="请选择城市"
                >
                  <el-option
                    v-for="item in level"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
          </el-col>

      </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item
              class="red_s"
              label="设备类型"
              label-width="140px"
              prop="equType"
            >
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
            <el-form-item
              class="red_s"
              label="充装介质"
              label-width="140px"
              prop="medium"
            >
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
            <el-form-item
              class="red_s"
              label="产品编号"
              label-width="140px"
              prop="gasId"
            >
              <el-input v-model="form.gasId" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              class="red_s"
              label="制造年月"
              label-width="140px"
              prop="makeData"
            >
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
            <el-form-item
              class="red_s"
              label="公称工作压力（MPa）"
              label-width="140px"
              prop="pressure"
            >
              <el-input v-model="form.pressure" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              class="red_s"
              label="容积（L）"
              label-width="140px"
              prop="volume"
            >
              <el-input v-model="form.volume" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item
              class="red_s"
              label="最近一次检验日期"
              label-width="140px"
              prop="checkData"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.checkData"
                style="width: 100%;"
               
              ></el-date-picker>
              <!--  :picker-options="pickerOptions2" -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              class="red_s"
              label="下次检验日期"
              label-width="140px"
              prop="nextCheckData"
            >
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.nextCheckData"
                style="width: 100%;"
               
              ></el-date-picker>
              <!--  :picker-options="pickerOptions3" -->
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
            <el-form-item
              class="red_s"
              label="变更或者停用情况"
              label-width="140px"
              prop="changeStatus"
            >
              <el-select
                style="width: 100%;"
                :validate-event="false"
                v-model="form.changeStatus"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, i) in options"
                  :key="i"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="12">
            <el-form-item
              class="red_s"
              label="生产(制造)单位"
              label-width="140px"
              prop="makeInfo"
            >
             <el-input v-model="form.makeInfo" autocomplete="off"></el-input>
              <!-- <el-select style=" width: 100%" v-model="form.makeInfo">
                <el-option
                  v-for="item in selecttion"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item
              class="red_s"
              label="设备代码:"
              label-width="140px"
              prop="sbCode"
            >
              <el-input v-model="form.sbCode" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button
              style="margin-left:5px;margin-right:5px;widht:60px;"
              @click="Regtion()"
              type="primary"
              >生成设备代码</el-button
            >
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
        <el-form :model="editUserForm" :rules="ruless">
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
                 
                ></el-date-picker>
                 <!-- :picker-options="pickerOptions2" -->
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
                 
                ></el-date-picker>
                 <!-- :picker-options="pickerOptions3" -->
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
                  v-model="editUserForm.changeStatus"
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
            <el-col :span="12">
              <el-form-item label="生产(制造)单位" label-width="140px" prop="makeInfo">
                 <el-input v-model="editUserForm.makeInfo" autocomplete="off"></el-input>
                <!-- <el-select style=" width: 100%" v-model="editUserForm.makeInfo">
                  <el-option
                    v-for="item in selecttion"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select> -->
              </el-form-item>
            </el-col>
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
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="EditUser()">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { getAllGasList,
         getAllGasBottle,
         postExcelMod,
         postUploadFile,
         getEquipmentCode,
         getSheng,getCity,
         postExcelModd,
         deleteGasBottle,
         getSearchGasList,
         putAllGasBottle,
         postAllExcel
        } from "../../utils/api";
export default {
  data() {
    return {
      ruless: {
        equType: [
          { required: true, message: "设备类型不能为空", trigger: "blur" },
        ],
        medium: [{ required: true, message: "介质不能为空", trigger: "blur" }],
        gasId: [{ required: true, message: "气瓶号不能为空", trigger: "blur" }],
        makeInfo: [
          { required: true, message: "生产厂家不能为空", trigger: "blur" },
        ],
        makeData: [
          {
            type: "date",
            required: true,
            message: "生产日期不能为空",
            trigger: "blur",
          },
        ],
        pressure: [
          { required: true, message: "气瓶公称压力不能为空", trigger: "blur" },
          {
            pattern: /^[0-9].*$/,
            message: "请输入正确的气瓶公称压力单位",
          },
        ],
        volume: [
          { required: true, message: "容积不能为空", trigger: "blur" },
          {
            pattern: /^[0-9].*$/,
            message: "请输入正确的容积单位",
          },
        ],
        checkData: [
          {
            type: "date",
            required: true,
            message: "检查日期不能为空",
            trigger: "blur",
          },
        ],
        nextCheckData: [
          {
            type: "date",
            required: true,
            message: "下次检查日期时间不能为空",
            trigger: "blur",
          },
        ],
        selfId: [
          { required: true, message: "单位内编号不能为空", trigger: "blur" },
        ],

        changeStatus: [
          { required: true, message: "停用情况", trigger: "blur" },
        ],
      },
      gasId: "",
      status: "",
      loadingbuttext: "气瓶信息批量下载",
      gasList: [],
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      params: {
        pageSize: 10, //每页10条数据
        currpage: 1, //当前页
        gasId:'',
        medium:''
      },
      options: [
        { id: 0, name: "停用" },
        { id: 1, name: "新增" },
        { id: 2, name: "注销" },
        { id: 3, name: "报废" },
      ],
      shengList:[],
      level:[],
      cityCode:'',
      optionsse: [
        { id: 0, name: "CNG" },
        { id: 1, name: "LPG" },
        { id: 2, name: "LNG" },
        { id: 3, name: "H2" },
        { id: 4, name: "N2" },
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
      selects1: [
        {
          id: 1,
          orders: "特种气瓶",
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
      selecttion: [],
      //添加用户的表单的数据
      form: {
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
        changeStatus: 1,
        sbCode: "",
        sheng:"",
        city:"",
        country:""
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
        changeStatus: "",
        sbCode: "",
      },
      total: 0,
      multipleSelection: [], //批量删除数据
      delarr: [], //批量删除id
    };
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      this.getAllGasListData()
      this.getShengData()
    },
     // 搜索用户 给搜索框绑定query v-model="query"
    searchUser() {
      console.log(this.params)
      getSearchGasList(this.params).then((res)=>{
        console.log(res)
        this.gasList=res.data.list
        this.total=res.data.totalCount
      })
    
      // console.log(res);
      // this.userlist = res.data.data.list;
      // this.total = res.data.data.totalCount;
     
    },
    //获取省
    getShengData(){
      getSheng().then((v)=>{
        this.shengList=v.data
        console.log(v)
      })
    },
    //选择的省份获取市code
    changeSheng(val){
      getCity(val).then((v)=>{
        this.level=v.data
      })
    },
    changCity(val){
      this.cityCode=val
    },
    //获取表格数据
    getAllGasListData(){
      getAllGasList(this.params).then((v) => {
      this.gasList = v.data.list;
      this.total = v.data.totalCount;
      console.log(v);
    });
    },
    // 添加用户显示对话框
    showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单
      this.dialogFormVisibleAdd = true;
    },
    //添加用户
    AddUser() {
      console.log(this.form)
      // 新增
      getAllGasBottle(this.form).then((v) => {
        console.log(v);
         this.$message({
            type: "success",
            message: "添加成功",
          });
          this.getAllGasListData()
      });
      this.dialogFormVisibleAdd=false
    },
    //展示修改用户
    showEdituser(v){
       this.dialogFormVisibleEdit = true;
       this.editUserForm=v
    },
    //修改用户
    EditUser(){
      this.dialogFormVisibleEdit = false;
      putAllGasBottle(this.editUserForm).then((val)=>{
        console.log(val)
         if (val.code === 200) {
           this.$message({
             type: "success",
             message: val.msg,
          });
          this.getAllGasListData()
         }else{
           this.$message({
             type: "error",
             message: val.msg,
          });
         }
      })

    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.params.pageSize = val;
      // 回到第一页
      this.params.currpage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
     this.getAllGasListData()
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.params.currpage = val;
      this.getAllGasListData()
    },
    //下载模板
    downTemplate() {
     postExcelModd().then((response) => {
          console.log(response);
          const blob = new Blob([response], {
            type: "application/vnd.ms-excel;charset=utf-8",
          });
          const fileName = "气瓶基本信息导入模板.xlsx";

          const elink = document.createElement("a");

          elink.download = fileName;

          elink.style.display = "none";

          elink.href = URL.createObjectURL(blob);

          document.body.appendChild(elink);

          elink.click();

          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        })
        // .catch((err) => {
        
        // });
    },
    //下载表格信息
    downtemplatee(){
      postAllExcel().then((response)=>{
        this.getAllGasListData()
        console.log(response)
         const blob = new Blob([response], {
              type: "application/msword",
            });
         const fileName = "气瓶基本信息.xlsx";

            const elink = document.createElement("a");

            elink.download = fileName;

            elink.style.display = "none";

            elink.href = URL.createObjectURL(blob);

            document.body.appendChild(elink);

            elink.click();

            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
            // this.dengdialogFormVisible = false;
      })

    },

    //上传excel
    uploadFile(item) {
      let file = item.file;
      console.log(item)
      console.log(file);
      let blod = new Blob([file]);
      let file1 = new File([blod], file.name, { type: file.type });
      let form = new FormData();
      form.append("file", file1);
      postUploadFile(form)
      .then((res) => {
        console.log(res);
        if(res.code==0){
          this.$message({
            type: "success",
            message: res.msg,
          });
        }else{
          this.$message({
            type: "error",
            message: res.msg,
          });
        }
          this.getAllGasListData()
       
      });
    },
      // 多选
    handleCurrentChanges(val) {
      this.multipleSelection = val;
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
          .then(() => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            deleteGasBottle(this.delarr).then((res)=>{
                  this.delarr = [];
                  console.log(res)
                  if (res.code == 0) {
                  this.$message({
                    type: "success",
                    message: res.msg,
                  });
                }
                this.getAllGasListData()
            }).catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
            this.delarr = [];
          });
          this.getAllGasListData()
          })
      }
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    //新增中生产设备代码
    Regtion() {
      // let regId = this.$route.query.regId;
      console.log(this.form.equType);
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
          let params={
            equType:this.form.equType,
            makeData:data,
            cityCode:this.cityCode
          }
        // let data=new Date(this.last.makeData).toLocaleDateString().replace(/\//g, '-')
        // const res = await this.$http.get(
        //   `IDGenerate/CylinderCode?regId=${regId}&makeData=${data}`
        // );
        getEquipmentCode(params).then((v)=>{
          console.log(v)
          this.form.sbCode = v

        })
      
        // this.form.sbCode = res.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-card {
  background-color: transparent;
}
.box-card {
  border: none;
  // height: 100%;
  // width: 100vw;
  // background: linear-gradient(to top,#b1d3ff,#b1d3ff,#ffffff);
}
.GasManagementCon {
  padding: 0 !important;
  min-width: 1380px;
  .headerSearrch {
    // background: linear-gradient(to top, #b1d3ff, #b1d3ff, #ffffff);
  }
}
</style>
