<template>
  <div>
    <!--搜索  -->
    <el-row>
      <el-col :span="24">
        <h5
          style="
            border-bottom: 1px solid #ece8e8;
            padding-bottom: 15px;
            padding-left: 15px;
          "
        >
          查询信息
        </h5>
      </el-col>

      <el-col style="padding-left: 15px" :span="22">
        <el-col :span="4">
          <el-input
            size="small"
            style="width: 100%"
            @clear="loadUserList()"
            clearable
            class="input-serach"
            v-model="regId"
            placeholder="请输入登记证号"
          ></el-input>
        </el-col>

        <el-col style="margin-left: 30px" :span="4">
          <el-select
            size="small"
            clearable
            style="width: 100%"
            v-model="isCard"
            @clear="loadUserList()"
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

        <el-col style="margin-left: 30px" :span="4">
          <el-input
            size="small"
            style="width: 100%"
            @clear="loadUserList()"
            clearable
            class="input-serach"
            v-model="gasId"
            placeholder="请输入气瓶编号"
          ></el-input>
        </el-col>
        <el-col style="margin-left: 30px" :span="4">
          <el-input
            size="small"
            style="width: 100%"
            @clear="loadUserList()"
            clearable
            class="input-serach"
            v-model="buildingUser"
            placeholder="请输入使用单位"
          ></el-input>
        </el-col>

        <el-col style="padding-left: 15px" :span="4">
          <el-button
            size="small"
            style="width: 100%"
            type="primary"
            @click="searchUser()"
            class="el_button"
            icon="el-icon-search"
            >搜索</el-button
          >
        </el-col>
      </el-col>
    </el-row>

    <el-col :span="24">
      <p
        style="
          width: 100%;
          height: 1px;
          background: rgb(236, 232, 232);
          margin: 20px 0px 0px 0px;
          z-index: 999;
        "
      ></p>
    </el-col>

    <el-col style="margin-bottom: 15px; margin-top: 15px" :span="24">
      <el-col :span="20">&nbsp;</el-col>
      <el-col :span="2">
        <el-button
          style="font-size: 14px"
          type="info"
          @click="Editusertion()"
          size="small"
          >刷新</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button
          style="font-size: 13px"
          type="success"
          @click="ClearLabel()"
          size="small"
          >清空标签卡</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button
          style="font-size: 13px"
          type="success"
          @click="Clearstaff()"
          size="small"
          >清空员工卡</el-button
        >
      </el-col>
    </el-col>

    <!-- 表格 -->
    <template>
      <el-table
        border
        :data="libLabelList"
        style="width: 100%; margin: 20px 0px; padding-bottom: 40px"
        :row-style="{ height: '40px' }"
        :cell-style="{ padding: '0px' }"
      >
        <el-table-column
          show-overflow-tooltip
          type="index"
          label="序号"
          width="50"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="regId"
          label="登记证号"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="gasId"
          label="气瓶编号"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="appid"
          label="标签号"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="inspectName"
          label="检验单位"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="buildingUser"
          label="使用单位"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="checkStatus"
          label="检验结论"
        >
          <template slot-scope="scope">
            <p v-if="libLabelList[scope.$index].checkStatus == 0">不合格</p>
            <p v-if="libLabelList[scope.$index].checkStatus == 1">合格</p>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="checkStatus"
          label="是否发卡"
        >
          <template slot-scope="scope">
            <p v-if="libLabelList[scope.$index].isCard == 0">未发卡</p>
            <p v-if="libLabelList[scope.$index].isCard == 1">已发卡</p>
          </template>
        </el-table-column>

        <el-table-column
          show-overflow-tooltip
          prop="checkData"
          label="检验日期"
        >
          <template slot-scope="socpe">
            {{ socpe.row.checkData | fmtdate }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="nextCheckData"
          label="下次检验日期"
        >
          <template slot-scope="socpe">
            {{ socpe.row.nextCheckData | fmtdate }}
          </template>
        </el-table-column>
        <!-- 表格操作 -->
        <el-table-column prop="address" width="150" label="操 作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="发卡"
              :enterable="false"
              placement="top"
            >
              <el-button
                type="primary"
                size="mini"
                title="发卡"
                :disabled="scope.row.isCard != 0"
                plain
                @click="sendLabel(scope.row.id)"
                >发卡</el-button
              >
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="补卡"
              :enterable="false"
              placement="top"
            >
              <el-button
                :disabled="scope.row.isCard != 1"
                type="success"
                size="mini"
                title="补卡"
                plain
                @click="sendLabel(scope.row.id)"
                >补卡</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-pagination
      style="
        padding: 5px 15px 15px 15px;
        display: flex;
        justify-content: flex-end;
      "
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 15, 20, 25, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { getInduLabel, postInduAppId, postInduTuckComb } from "../../utils/api";
export default {
  data() {
    return {
      wsr: "",
      regId: "",
      isCard: "",
      gasId: "",
      buildingUser: "",
      //分页相关数据
      total: -1,
      page: 1,
      rows: 10,
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
      libLabelList: [],
    };
  },
  mounted() {
    this.wsr = wsrProxy;
    this.wsr.init();
    this.getInduLabelList();
  },
  methods: {
    //标签发卡补卡
    sendLabel(obj) {
      var rt = 0;
      var port = 0;
      var keyType = 0;
      var key = "FFFFFFFFFFFF";
      var v1 = 5000,
        v2 = 0;
      var block = 12;
      var delaytime = 2;
      var objs = { cardno: "", uid: "", len: 0 };
      rt = this.wsr.ws_openPort(port);
      console.log("open:" + rt);
      try {
        this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
        this.wsr.ws_beep(port);
        rt = this.wsr.ws_getCardNo_String(port, objs);
        if (rt < 0) {
          this.$message.warning("请放入卡片");
          return rt;
        }
        rt = this.wsr.ws_loadKey(port, key, 0);
        rt = this.wsr.ws_readBlock(port, 13 * 4, objs);
        if (rt < 0) {
          this.$message.error("卡类型错误或该卡已有数据");

          return rt;
        }
        rt = this.wsr.client_datatype = 1;
        postInduAppId(objs).then((res) => {
          if (res.data < 1) {
            postInduTuckComb(objs, obj).then((res) => {
              let regId = res.regId;
              let gasId = res.gasId;
              let unit = res.unit;
              let buildingUser = res.buildingUser;
              let checkStatus = res.status;
              let date = res.date;
              let checkCode = res.checkCode;
              rt = this.wsr.ws_openPort(port);
              rt = this.wsr.ws_verifyKey(port, key, 0);
              //  rt =this.wsr.ws_writeBlock(port, 4, checkCode)
              rt = this.wsr.ws_writeBlock(port, 8, regId);
              if (regId.length > 32) {
                regId = regId.substring(32);
                this.wsr.ws_writeBlock(port, 9, regId);
              } else if (regId.length > 64) {
                regId = regId.substring(64);
                this.wsr.ws_writeBlock(port, 10, regId);
              }
              rt = this.wsr.ws_writeBlock(port, 12, gasId);
              if (gasId.length > 32) {
                gasId = gasId.substring(32);
                this.wsr.ws_writeBlock(port, 13, gasId);
              } else if (gasId.length > 64) {
                gasId = gasId.substring(64);
                this.wsr.ws_writeBlock(port, 14, gasId);
              }
              rt = this.wsr.ws_writeBlock(port, 16, unit);
              if (unit.length > 32) {
                unit = unit.substring(32);
                this.wsr.ws_writeBlock(port, 17, unit);
              } else if (unit.length > 64) {
                unit = unit.substring(64);
                this.wsr.ws_writeBlock(port, 18, unit);
              }
              rt = this.wsr.ws_writeBlock(port, 20, buildingUser);
              if (buildingUser.length > 32) {
                buildingUser = buildingUser.substring(32);
                this.wsr.ws_writeBlock(port, 21, buildingUser);
              } else if (buildingUser.length > 64) {
                buildingUser = buildingUser.substring(64);
                this.wsr.ws_writeBlock(port, 22, buildingUser);
              }
              rt = this.wsr.ws_writeBlock(port, 24, checkStatus);
              if (checkStatus.length > 32) {
                checkStatus = checkStatus.substring(32);
                this.wsr.ws_writeBlock(port, 25, checkStatus);
              } else if (checkStatus.length > 64) {
                checkStatus = unit.substring(64);
                this.wsr.ws_writeBlock(port, 26, checkStatus);
              }
              rt = this.wsr.ws_writeBlock(port, 52, date);
              rt = this.wsr.ws_changeKey(
                port,
                2,
                "837210987622",
                "7F078869",
                "12BBADDAEA11"
              );
              this.wsr.ws_changeKey(
                port,
                3,
                "837210987622",
                "7F078869",
                "12BBADDAEA11"
              );
              this.wsr.ws_changeKey(
                port,
                4,
                "837210987622",
                "7F078869",
                "12BBADDAEA11"
              );
              this.wsr.ws_changeKey(
                port,
                5,
                "837210987622",
                "7F078869",
                "12BBADDAEA11"
              );
              this.wsr.ws_changeKey(
                port,
                6,
                "837210987622",
                "7F078869",
                "12BBADDAEA11"
              );
              this.wsr.ws_changeKey(
                port,
                13,
                "837210987622",
                "7F078869",
                "12BBADDAEA11"
              );
              if (rt > 0) {
                this.$message.success("发卡成功");
              }
            });
          } else {
            this.$message.warning("标签号已存在");
          }
        });
      } finally {
        this.wsr.ws_closePort(port);
      }
    },

    //清空标签卡数据
    ClearLabel() {
      var passworda = "837210987622";
      var passwordb = "12BBADDAEA11";
      var rt = 0;
      var port = 0;
      var keyType = 0;
      var key = passworda;
      var keyb = passwordb;
      var v1 = 5000,
        v2 = 0;
      var block = 12;
      var delaytime = 2;
      var obj = { cardno: "", uid: "", len: 0 };
      rt = this.wsr.ws_openPort(port);
      console.log("open:" + rt);
      try {
        this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
        this.wsr.ws_beep(port);
        rt = this.wsr.ws_getCardNo_String(port, obj);
        if (rt < 0) {
          this.$message.warning("请放入卡片！");
          return rt;
        }
        rt = this.wsr.ws_loadKey(port, key, 0);
        rt = this.wsr.ws_loadKey(port, keyb, 1);
        this.wsr.client_datatype = 1;
        rt = this.wsr.ws_readBlock(port, 13 * 4, obj);
        if (rt < 0) this.$message.error("卡片类型错误");
        else {
          rt = this.wsr.ws_initValue(port, block, v1);
          this.wsr.ws_writeBlock(
            port,
            2 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(port, 9, "00000000000000000000000000000000");
          this.wsr.ws_writeBlock(
            port,
            3 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(
            port,
            4 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(port, 17, "00000000000000000000000000000000");
          this.wsr.ws_writeBlock(
            port,
            5 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(
            port,
            6 * 4,
            "00000000000000000000000000000000"
          );
          this.wsr.ws_writeBlock(
            port,
            13 * 4,
            "00000000000000000000000000000000"
          );
          rt = this.wsr.ws_changeKey(
            port,
            2,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            3,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            4,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            5,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            6,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          this.wsr.ws_changeKey(
            port,
            13,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          if (rt > 0) {
            this.$message.success("清除成功");
          }
        }
      } finally {
        this.wsr.ws_closePort(port);
      }
    },

    //清除员工卡数据
    Clearstaff() {
      var passa = "ABCDEABBCC12";
      var passb = "CCABEAAAEE21";
      var rt = 0;
      var port = 0;
      var keyType = 0;
      var keytype2 = 1;
      var key = passa;
      var keyb = passb;
      var v1 = 5000,
        v2 = 0;
      var block = 12;
      var delaytime = 2;
      var obj = { cardno: "", uid: "", len: 0 };
      rt = this.wsr.ws_openPort(port);
      console.log("open:" + rt);
      try {
        this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);
        this.wsr.ws_beep(port);
        rt = this.wsr.ws_getCardNo_String(port, obj);
        if (rt < 0) {
          this.$message.warning("请放入卡片！");
          return rt;
        }
        rt = this.wsr.ws_loadKey(port, key, keyType);
        rt = this.wsr.ws_loadKey(port, keyb, keytype2);
        this.wsr.client_datatype = 1;
        rt = this.wsr.ws_readBlock(port, 12 * 4, obj);
        if (rt < 0) this.$message.error("卡片类型错误！");
        else {
          rt = this.wsr.ws_writeBlock(
            port,
            12 * 4,
            "00000000000000000000000000000000"
          );
          rt = this.wsr.ws_changeKey(
            port,
            12,
            "FFFFFFFFFFFF",
            "FF078069",
            "FFFFFFFFFFFF"
          );
          if (rt > 0) {
            this.$message.success("清除成功");
          }
        }
      } finally {
        this.wsr.ws_closePort(port);
      }
    },
    getInduLabelList() {
      getInduLabel(this.page, this.rows).then((res) => {
        this.libLabelList = res.data.list;
        this.total = res.data.totalCount;
        console.log(res);
      });
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.rows = val;
      // 回到第一页
      this.page = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getLibLabelList();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.page = val;
      thisgetLibLabelList();
    },
  },
};
</script>

<style></style>
