<template>
  <div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
        </el-col>

        <el-col style="padding-left:15px" :span="22">
          <el-col :span="24">
            <el-col :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入发证机关"
                v-model="certification"
              ></el-input>
            </el-col>
            <el-col style="margin-left:15px" :span="4">
              <el-select
                size="small"
                style=" width:100%;"
                @clear="loadUserList()"
                clearable
                v-model="zoneName"
                placeholder="请选择行政区划"
              >
                <el-option v-for="item in division" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
            <el-col style="margin-left:15px" :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入登记证号"
                v-model="regId"
              ></el-input>
            </el-col>
            <el-col style="margin-left:15px" :span="4">
              <!-- <el-input
                size="small"
                style=" width: 90%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入使用单位"
                v-model="useName"
              ></el-input>-->
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入使用单位"
                v-model="useName"
              ></el-input>
            </el-col>
            <el-col style="margin-left:15px" :span="3">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入车牌号码"
                v-model="carNum"
              ></el-input>
            </el-col>
            <el-col style="margin-left:15px" :span="3">
              <el-button
                @click="searchUser()"
                size="small"
                style=" width:90%;"
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

      <el-col style="margin-bottom:5px;margin-top:5px" :span="24">
        <el-col :span="11">&nbsp;</el-col>
        <el-col :span="2">
          <el-button style="font-size:13px" type="success" @click="showAddUserDia()" size="small">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            type="success"
            plain
            size="small"
            style="margin-left:10px;font-size:13px"
            @click="downTemplate()"
          >
            <i style="padding-right:10px;" class="el-icon-download"></i>下载excel模板
          </el-button>
        </el-col>
        <el-col :span="2" style="margin-left:40px;">
          <el-button
            type="success"
            plain
            size="small"
            style="font-size:13px"
            @click="downtemplatee()"
          >
            <i style="padding-right:10px" class="el-icon-download"></i>气瓶信息批量下载
          </el-button>
        </el-col>
        <el-col :span="2" style="margin-left:50px;">
          <el-upload
            class="upload-demo"
            action
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :http-request="uploadFile"
            multiple
            :limit="1"
          >
            <el-button
              type="success"
              plain
              size="small"
              style="font-size:13px"
              @click="handlePreview"
            >
              <i style="padding-right:10px" class="el-icon-upload2"></i>点击数据批量上传
            </el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传Excel文件</div> -->
          </el-upload>
        </el-col>
        <el-col :span="2" style="margin-left:50px;">
          <el-button
            type="danger"
            size="small"
            plain
            icon="el-icon-delete"
            style="font-size:14px;"
            @click="showDeleUserMsgBox"
          >删除</el-button>
        </el-col>
      </el-col>
      <!-- 表格 -->
      <template>
        <el-table
          border
          :data="VehGasList"
          style="width: 100%;padding-bottom:40px;margin:10px 0px;"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          @selection-change="handleCurrentChanges"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="regId" label="登记证号" show-overflow-tooltip>
            <template slot-scope="socpe">
              <p style="cursor:pointer;" @click="showAddUserDiaaa(socpe.row)">{{socpe.row.regId}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="zoneName" label="行政区划" show-overflow-tooltip></el-table-column>
          <el-table-column prop="carNum" label="车牌号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="num" label="气瓶数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="supervisoryOrg" label="监督检验检测机构" show-overflow-tooltip></el-table-column>
          <el-table-column prop="useName" label="使用单位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="certification" label="发证机关" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="certification" label="发证机关" show-overflow-tooltip></el-table-column> -->
          <el-table-column prop="cretificationDate" label="发证日期" show-overflow-tooltip>
            <template slot-scope="socpe">{{socpe.row.cretificationDate | fmtdate}}</template>
          </el-table-column>

          <el-table-column prop="address" fixed="right" width="180" label="操 作">
            <template slot-scope="scope">
              <!-- size 调整按钮大小 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="登记证打印"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  size="mini"
                  title="登记证打印"
                  plain
                  icon="el-icon-folder"
                  @click="registrationAddUserDia(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>
              <!-- 查看信息 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="查看信息"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="info"
                  icon="el-icon-message"
                  size="mini"
                  title="查看"
                  plain
                  @click="lookEdituser(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>
              <!-- 编辑 -->

              <!-- <el-tooltip
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
              </el-tooltip>-->
              <!-- 删除 -->

              <!-- <el-tooltip
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
              </el-tooltip>-->
            </template>
          </el-table-column>
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
        :current-page="currPage"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <el-dialog width="60%" title="添加信息" top="2vh" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form" :rules="rules" ref="form">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="登记类别:" label-width="140px" prop="regType">
                <el-select style=" width: 100%" v-model="form.regType" :validate-event="false">
                  <el-option
                    v-for="item in selects3"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">&nbsp;</el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="车辆类型:" label-width="140px" prop="carType">
                <el-select style=" width: 100%" v-model="form.carType" :validate-event="false">
                  <el-option
                    v-for="item in selects4"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" prop="sheng" label-width="140px" label="行政省份:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.sheng"
                  @change="function2(form.sheng)"
                  @input="searchUser()"
                  placeholder="请选择省份"
                  :disabled="showCmd"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" prop="zoneId" label-width="140px" label="市级区域:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.zoneId"
                  @input="searchUser()"
                  @change="function1(form.zoneId)"
                  placeholder="请选择城市"
                  :disabled="showCmd_1"
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
            <el-col :span="8">
              <el-form-item class="red_s" prop="zoneName" label-width="140px" label="区级:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.zoneName"
                  @input="searchUser()"
                  placeholder="请选择区域"
                  :disabled="showCmds"
                >
                  <el-option
                    v-for="item in levels"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备基本情况</h3>
          <el-col :span="24">
            <el-col :span="11">
              <!-- <el-form-item hidden label="档案号:" label-width="140px" prop="regId">
                <el-input v-model="form.regId" autocomplete="off"></el-input>
              </el-form-item>-->
              <el-form-item class="red_s" label="设备品种:" label-width="140px" prop="equType">
                <el-select style=" width: 100%" v-model="form.equType" :validate-event="false">
                  <el-option
                    v-for="item in selects1"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="产品名称:" label-width="140px" prop="productName">
                <el-select
                  disabled
                  style=" width: 100%;color:#ff0;"
                  v-model="form.productName"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects5"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="监督检验机构名称:" label-width="140px" prop="checkName">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.checkName"
                  placeholder="请选择监督检验机构"
                >
                  <el-option
                    v-for="item in optionsuse"
                    :key="item.inspectId"
                    :label="item.inspectName"
                    :value="item.inspectName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button style="font-size:13px" type="success" @click="tiaozhuan()">添加单位</el-button>
            </el-col>
            <el-col :span="11"></el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11"></el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11"></el-col>
          </el-col>

          <template>
            <el-table
              border
              :data="unlist"
              style="width: 100%;padding-bottom:40px;margin:10px 0px;"
              :row-style="{height:'40px'}"
              :cell-style="{padding:'0px'}"
              class="inst"
            >
              <el-table-column prop="sbCode" label="设备代码" show-overflow-tooltip></el-table-column>
              <el-table-column prop="gasId" label="产品编号" show-overflow-tooltip></el-table-column>
              <el-table-column prop="makeInfo" label="制造单位" show-overflow-tooltip></el-table-column>

              <el-table-column prop="makeData" label="制造年月" show-overflow-tooltip>
                <template slot-scope="socpe">{{socpe.row.cretificationDate | fmtdate}}</template>
              </el-table-column>
              <el-table-column prop="medium" label="充装介质" show-overflow-tooltip></el-table-column>
              <el-table-column prop="pressure" label="公称工作压力(MPa)" show-overflow-tooltip></el-table-column>
              <el-table-column prop="volume" label="容积(L)" show-overflow-tooltip></el-table-column>
              <el-table-column prop="checkData" label="最近一次检验日期" show-overflow-tooltip>
                <template slot-scope="socpe">{{socpe.row.cretificationDate | fmtdate}}</template>
              </el-table-column>
              <el-table-column prop="nextCheckData" label="下次检验日期" show-overflow-tooltip>
                <template slot-scope="socpe">{{socpe.row.cretificationDate | fmtdate}}</template>
              </el-table-column>
              <el-table-column prop="selfId" label="单位内编号" show-overflow-tooltip></el-table-column>
              <el-table-column prop="address" fixed="right" width="180" label="操 作">
                <template slot-scope="scope">
                  <!-- 编辑 -->
                  <!-- <el-tooltip
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
                  </el-tooltip>-->
                  <!-- 删除 -->

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
                      @click="showDeleUserMsgBoxx(scope.row)"
                    ></el-button>
                    <!-- @click="showDeleUserMsgBox(scope.row.id)" -->
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              type="success"
              :disabled="haofan"
              class="instt"
              @click="showAddUserDiaa()"
              size="small"
            >
              <i style="padding-right:10px" class="el-icon-plus"></i>新增
            </el-button>
          </template>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备使用情况</h3>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="使用单位名称:" label-width="140px" prop="useName">
                <el-select
                  style=" width: 100%;"
                  filterable
                  v-model="form.useName"
                  @input="a"
                  placeholder="请选择单位名称"
                >
                  <el-option
                    v-for="(item , i) in selects6"
                    :key="i"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="使用单位地址:" label-width="140px" prop="address">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="统一社会信用代码:" label-width="140px" prop="creditCode">
                <el-input v-model="form.creditCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="邮政编码:" label-width="140px">
                <el-input v-model="form.postNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="车牌号:" label-width="140px" prop="carNum">
                <el-input v-model="form.carNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="车辆VIN码:" label-width="140px" prop="vinNum">
                <el-input v-model="form.vinNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="投入使用日期:" label-width="140px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.initData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="单位固定电话:" label-width="140px" prop="mobilePhone">
                <el-input v-model="form.mobilePhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="安全管理员:" label-width="140px" prop="useSafe">
                <el-input v-model="form.useSafe" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="移动电话:" label-width="140px" prop="telPhone">
                <el-input v-model="form.telPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">登记信息</h3>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="登记机关:" label-width="140px" prop="certification">
                <el-input v-model="form.certification" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item
                class="red_s"
                label="登记人员:"
                label-width="140px"
                prop="certificationPerson"
              >
                <el-input v-model="form.certificationPerson" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="10">
              <el-form-item
                class="red_s"
                label="登记证编号:"
                style="margin-left:10px"
                label-width="140px"
                prop="regId"
              >
                <el-input v-model="form.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button
                style="margin-left:5px;margin-right:5px"
                @click="Registration()"
                type="primary"
              >生成登记证号</el-button>
            </el-col>
            <el-col :span="10 ">
              <el-form-item
                class="red_s"
                label="发证日期:"
                label-width="140px"
                prop="cretificationDate"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.cretificationDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 第二个添加对话框 -->
      <el-dialog width="60%" title="添加信息" top="2vh" :visible.sync="dialogFormVisibleAdds">
        <el-form :model="last" :rules="rules" ref="form">
          <el-col :span="24">
            <el-col :span="6">
              <el-form-item class="red_s" label="设备代码:" label-width="140px" prop="sbCode">
                <el-input v-model="last.sbCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button
                style="margin-left:5px;margin-right:5px"
                @click="Regtion()"
                type="primary"
              >生成设备代码</el-button>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="产品编号:" label-width="140px" prop="gasId">
                <el-input v-model="last.gasId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="制造单位:" label-width="140px" prop="makeInfo">
                <el-select style=" width: 100%" v-model="last.makeInfo">
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
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="制造日期:" label-width="140px" prop="makeData">
                <el-date-picker
                  type="date"
                  placeholder="填写日期"
                  v-model="last.makeData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="气瓶公称压力:" label-width="140px" prop="pressure">
                <el-input v-model="last.pressure" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="容积:" label-width="140px" prop="volume">
                <el-input v-model="last.volume" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="检验日期:" label-width="140px" prop="checkData">
                <el-date-picker
                  type="date"
                  placeholder="填写日期"
                  v-model="last.checkData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="下次检验日期:" label-width="140px" prop="nextCheckData">
                <el-date-picker
                  type="date"
                  placeholder="填写日期"
                  v-model="last.nextCheckData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="单位内编号:" label-width="140px" prop="selfId">
                <el-input v-model="last.selfId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="充装介质:" label-width="140px" prop="medium">
                <el-select style=" width: 100%" v-model="last.medium" :validate-event="false">
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
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdds = false">取 消</el-button>
          <el-button type="primary" @click="AddUsers()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 修改对话框 -->
      <el-dialog width="60%" title="修改信息" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="editUserForm" :rules="rules" ref="editUserForm">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="登记类别:" label-width="140px" prop="regType">
                <el-select
                  style=" width: 100%"
                  v-model="editUserForm.regType"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects3"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">&nbsp;</el-col>
            <el-col :span="8">
              <el-form-item label="车辆类型:" label-width="140px" prop="carType">
                <el-select
                  style=" width: 100%"
                  v-model="editUserForm.carType"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects4"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label-width="140px" label="行政省份:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="editUserForm.sheng"
                  @change="function2(editUserForm.sheng)"
                  @input="searchUser()"
                  placeholder="请选择省份"
                  :disabled="showCmd"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="cityId" label-width="140px" label="市级区域:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="editUserForm.zoneId"
                  @input="searchUser()"
                  @change="function1(editUserForm.zoneId)"
                  placeholder="请选择城市"
                  :disabled="showCmd_1"
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
            <el-col :span="8">
              <el-form-item prop="zoneName" label-width="140px" label="区级:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="editUserForm.zoneName"
                  @input="searchUser()"
                  placeholder="请选择区域"
                  :disabled="showCmds"
                >
                  <el-option
                    v-for="item in levels"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备基本情况</h3>
          <el-col :span="24">
            <el-col :span="11">
              <!-- <el-form-item hidden label="档案号:" label-width="140px" prop="regId">
                <el-input v-model="form.regId" autocomplete="off"></el-input>
              </el-form-item>-->
              <el-form-item label="设备品种:" label-width="140px" prop="equType">
                <el-select
                  style=" width: 100%"
                  v-model="editUserForm.equType"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects1"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="产品名称:" label-width="140px" prop="productName">
                <el-select
                  disabled
                  style=" width: 100%"
                  v-model="editUserForm.productName"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects5"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="监督检验机构名称:" label-width="140px" prop="checkName">
                <el-input v-model="editUserForm.checkName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">&nbsp;</el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11"></el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11"></el-col>
          </el-col>

          <template>
            <el-table
              border
              :data="userlists"
              style="width: 100%;padding-bottom:40px;margin:10px 0px;"
              :row-style="{height:'40px'}"
              :cell-style="{padding:'0px'}"
              class="inst"
            >
              <el-table-column prop="sbCode" label="设备代码" show-overflow-tooltip></el-table-column>
              <el-table-column prop="gasId" label="产品编号" show-overflow-tooltip></el-table-column>
              <el-table-column prop="makeInfo" label="制造单位" show-overflow-tooltip></el-table-column>
              <el-table-column prop="makeData" label="制造年月" show-overflow-tooltip>
                <template slot-scope="socpe">{{socpe.row.cretificationDate | fmtdate}}</template>
              </el-table-column>
              <el-table-column prop="medium" label="充装介质" show-overflow-tooltip></el-table-column>
              <el-table-column prop="pressure" label="公称工作压力(MPa)" show-overflow-tooltip></el-table-column>
              <el-table-column prop="volume" label="容积(L)" show-overflow-tooltip></el-table-column>
              <el-table-column prop="checkData" label="最近一次检验日期" show-overflow-tooltip>
                <template slot-scope="socpe">{{socpe.row.cretificationDate | fmtdate}}</template>
              </el-table-column>
              <el-table-column prop="nextCheckData" label="下次检验日期" show-overflow-tooltip>
                <template slot-scope="socpe">{{socpe.row.cretificationDate | fmtdate}}</template>
              </el-table-column>
              <el-table-column prop="selfId" label="单位内编号" show-overflow-tooltip></el-table-column>
            </el-table>
          </template>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备使用情况</h3>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="使用单位名称:" label-width="140px" prop="useName">
                <el-select
                  style=" width: 100%;"
                  clearable
                  filterable
                  v-model="editUserForm.useName"
                  @input="aa"
                  placeholder="请选择单位名称"
                >
                  <el-option
                    v-for="(item , i) in selects6"
                    :key="i"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="使用单位地址:" label-width="140px" prop="address">
                <el-input v-model="editUserForm.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="使用单位统一社会信用代码:" label-width="140px" prop="creditCode">
                <el-input v-model="editUserForm.creditCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="邮政编码:" label-width="140px" prop="postNum">
                <el-input v-model="editUserForm.postNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="车牌号:" label-width="140px" prop="carNum">
                <el-input v-model="editUserForm.carNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="车辆VIN码:" label-width="140px" prop="vinNum">
                <el-input v-model="editUserForm.vinNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="投入使用日期:" label-width="140px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.initData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="单位固定电话:" label-width="140px" prop="mobilePhone">
                <el-input v-model="editUserForm.mobilePhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="安全管理员:" label-width="140px" prop="useSafe">
                <el-input v-model="editUserForm.useSafe" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="移动电话:" label-width="140px" prop="telPhone">
                <el-input v-model="editUserForm.telPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">登记信息</h3>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="登记机关:" label-width="140px" prop="certification">
                <el-input v-model="editUserForm.certification" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="登记人员:" label-width="140px" prop="certificationPerson">
                <el-input v-model="editUserForm.certificationPerson" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="登记证编号:" label-width="140px" prop="regId">
                <el-input disabled v-model="editUserForm.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="发证日期:" label-width="140px" prop="cretificationDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.cretificationDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="EditUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 第二个修改对话框 -->

      <el-dialog width="60%" title="添加信息" top="2vh" :visible.sync="dialogFormVisibleEdits">
        <el-form :model="lasts" :rules="rules" ref="form">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="设备代码:" label-width="140px" prop="sbCode">
                <el-input v-model="lasts.sbCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品编号:" label-width="140px" prop="gasId">
                <el-input v-model="lasts.gasId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="制造单位:" label-width="140px" prop="makeInfo">
                <el-input v-model="lasts.makeInfo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="制造日期:" label-width="140px" prop="makeData">
                <el-date-picker
                  type="date"
                  placeholder="填写日期"
                  v-model="lasts.makeData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="气瓶公称压力:" label-width="140px" prop="pressure">
                <el-input v-model="lasts.pressure" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="容积:" label-width="140px" prop="volume">
                <el-input v-model="lasts.volume" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="检查日期:" label-width="140px" prop="checkData">
                <el-date-picker
                  type="date"
                  placeholder="填写日期"
                  v-model="lasts.checkData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="下次检查日期:" label-width="140px" prop="nextCheckData">
                <el-date-picker
                  type="date"
                  placeholder="填写日期"
                  v-model="lasts.nextCheckData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位内编号:" label-width="140px" prop="selfId">
                <el-input v-model="lasts.selfId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="充装介质:" label-width="140px" prop="medium">
                <el-select style=" width: 100%" v-model="lasts.medium" :validate-event="false">
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
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdds = false">取 消</el-button>
          <el-button type="primary" @click="EditUsers()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 查看信息 -->
      <el-dialog title="查看信息" :visible.sync="dialogTableVisible"></el-dialog>

      <!-- 登记证打印下载 -->
      <el-dialog width="60%" top="3vh" title="登记证预览下载" :visible.sync="dengdialogFormVisible">
        <el-form :model="dengform" :rules="rules" ref="dengform">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="登记类别:" label-width="140px" prop="regType">
                <el-select style=" width: 100%" v-model="dengform.regType" :validate-event="false">
                  <el-option
                    v-for="item in selects3"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">&nbsp;</el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="车辆类型:" label-width="140px" prop="carType">
                <el-select style=" width: 100%" v-model="dengform.carType" :validate-event="false">
                  <el-option
                    v-for="item in selects4"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label-width="140px" label="行政省份:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="dengform.sheng"
                  @change="function2(dengform.sheng)"
                  @input="searchUser()"
                  placeholder="请选择省份"
                  :disabled="showCmd"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" prop="zoneId" label-width="140px" label="市级区域:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="dengform.zoneId"
                  @input="searchUser()"
                  @change="function1(dengform.zoneId)"
                  placeholder="请选择城市"
                  :disabled="showCmd_1"
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
            <el-col :span="8">
              <el-form-item class="red_s" prop="zoneName" label-width="140px" label="区级:">
                <el-select
                  style=" width: 100%;"
                  @clear="loadUserList()"
                  clearable
                  v-model="dengform.zoneName"
                  @input="searchUser()"
                  placeholder="请选择区域"
                  :disabled="showCmds"
                >
                  <el-option
                    v-for="item in levels"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备基本情况</h3>
          <el-col :span="24">
            <el-col :span="11">
              <!-- <el-form-item hidden label="档案号:" label-width="140px" prop="regId">
                <el-input v-model="form.regId" autocomplete="off"></el-input>
              </el-form-item>-->
              <el-form-item class="red_s" label="设备品种:" label-width="140px" prop="equType">
                <el-select style=" width: 100%" v-model="dengform.equType" :validate-event="false">
                  <el-option
                    v-for="item in selects1"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.orders"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="产品名称:" label-width="140px" prop="productName">
                <el-select
                  style=" width: 100%"
                  v-model="dengform.productName"
                  :validate-event="false"
                >
                  <el-option
                    v-for="item in selects5"
                    :key="item.id"
                    :label="item.orders"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="监督检验机构名称:" label-width="140px" prop="checkName">
                <el-input v-model="dengform.checkName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11"></el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备使用情况</h3>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="使用单位名称:" label-width="140px" prop="useName">
                <el-select
                  style=" width: 100%;"
                  filterable
                  v-model="dengform.useName"
                  @input="a"
                  placeholder="请选择单位名称"
                >
                  <el-option
                    v-for="(item , i) in selects6"
                    :key="i"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="使用单位地址:" label-width="140px" prop="address">
                <el-input v-model="dengform.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="统一社会信用代码:" label-width="140px" prop="creditCode">
                <el-input v-model="dengform.creditCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="邮政编码:" label-width="140px">
                <el-input v-model="dengform.postNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="车牌号:" label-width="140px" prop="carNum">
                <el-input v-model="dengform.carNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="车辆VIN码:" label-width="140px" prop="vinNum">
                <el-input v-model="dengform.vinNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="投入使用日期:" label-width="140px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dengform.initData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="单位固定电话:" label-width="140px" prop="mobilePhone">
                <el-input v-model="dengform.mobilePhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="安全管理员:" label-width="140px" prop="useSafe">
                <el-input v-model="dengform.useSafe" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="移动电话:" label-width="140px" prop="telPhone">
                <el-input v-model="dengform.telPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">登记信息</h3>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="登记机关:" label-width="140px" prop="certification">
                <el-input v-model="dengform.certification" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="登记人员:" label-width="140px" prop="certificationPerson">
                <el-input v-model="dengform.certificationPerson" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item class="red_s" label="登记证编号:" label-width="140px" prop="regId">
                <el-input v-model="dengform.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item class="red_s" label="发证日期:" label-width="140px" prop="cretificationDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dengform.cretificationDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <p style="text-align: center;" slot="footer" class="dialog-footer">
          <el-button @click="dengdialogFormVisible = false">取 消</el-button>
          <el-button :loading="loadingbut" type="primary" @click="savencftpget()">{{loadingbuttext}}</el-button>
          <el-button type="primary" @click="ncftpget()">下载pdf文档</el-button>
          <el-button type="primary" @click="previewFile()">预览</el-button>
        </p>
      </el-dialog>

      <el-dialog title="PDF图片预览" :visible.sync="pdfindex">
        <div class="indexs">
          <p class="imgs">
            <img :src="this.url" alt />
          </p>
        </div>
        <div class="indexs">
          <p class="imgs">
            <img :src="this.urls" alt />
          </p>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import {getAllVehGasList} from "../../utils/api"

export default {
  name: "cylinder",
  data() {
    return {
      regId: "",
      reportStatus: "",
      haofan: false,
      certification: "",
      useName: "",
      zoneName: "",
      unitName: "",
      division: [], //获取行政区划
      tyPe: "",
      username: "",
      carNum: "",
      select: "",
      VehGasList: [],
      ProvinceId: [], //省
      CityId: "", //市
      AreaId: [], //区
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      pageSize: 10,
      id: -1,
      Id: -1,
      dengId: -1,
      options: [],
      level: [],
      levels: [],
      optionsuse: [],
      url: "",
      urls: "",
      userlists: [],
      selecttion: [],
      regsId: "",
      codes: "",
      showCmd: true,
      showCmd_1: true,
      showCmds: true,
      // 添加对话框的属性

      dialogFormVisibleAdd: false,
      dialogFormVisibleAdds: false,
      dialogFormVisibleAddss: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleEdits: false,
      dialogTableVisible: false,
      dengdialogFormVisible: false,
      loadingbuttext: "保存文件",
      loadingbut: false, //审核提交加载中
      pdfindex: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      //设备类型
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
      //充装介质
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
      //登记类别
      selects3: [
        {
          id: 1,
          orders: "新设备首次启动",
        },
        {
          id: 2,
          orders: "改造",
        },
        {
          id: 3,
          orders: "使用单位更名",
        },
        {
          id: 4,
          orders: "使用地址变更",
        },
        {
          id: 5,
          orders: "过户",
        },
        {
          id: 6,
          orders: "移装",
        },
        {
          id: 7,
          orders: "达到设计使用年限",
        },
      ],
      //车辆类型
      selects4: [
        {
          id: 1,
          orders: "出租车",
        },
        {
          id: 2,
          orders: "公交车",
        },
        {
          id: 3,
          orders: "教练车",
        },
        {
          id: 4,
          orders: "社会车辆",
        },
      ],
      //产品名称
      selects5: [
        {
          id: 1,
          orders: "车用气瓶",
        },
        {
          id: 2,
          orders: "液化气瓶",
        },
        {
          id: 3,
          orders: "工业气瓶",
        },
      ],
      optionsse: [
        { id: 0, name: "合格" },
        { id: 1, name: "不合格" },
        { id: 2, name: "超期未检" },
        { id: 3, name: "即将超期" },
      ],
      selects6: [],
      form: {
        regType: "", //登记类别
        carType: "", //车辆类型
        regId: "", //登记证编号
        sheng: "", //省级编号
        zoneId: "", //市区编号
        zoneName: "", //区级标号
        equType: "", //设备品种
        productName: "", //产品名称
        num: "", //气瓶数量
        constructionName: "", //施工单位名称
        checkName: "", //监督检验机构名称
        useName: "", //使用单位名称
        address: "", //单位地址
        creditCode: "", //信用代码
        initData: "", //投入使用时间
        mobilePhone: "", //固定电话
        postNum: "", //邮政编码
        telPhone: "", //手机电话
        useName: "", //单位名称
        useSafe: "", //安全管理员
        carNum: "", //车牌号
        vinNum: "", //车辆vin码
        certification: "", //登记机关
        cretificationDate: "", //发证日期
        certificationPerson: "", //登记人员
        departmentId: "", //所属单位id
        medium: "", //介质
      },
      unlist: [],
      Idd: "",
      last: {
        sbCode: "", //设备代码
        gasId: "", //产品编号
        makeInfo: "", //制造单位
        makeData: "", //制造日期
        pressure: "", //气瓶公称压力
        volume: "", //容积
        checkData: "", //检查日期
        nextCheckData: "", //下次检查日期
        selfId: "", //单位内部编号
        medium: "", //介质
      },
      lasts: {
        sbCode: "", //设备代码
        gasId: "", //产品编号
        makeInfo: "", //制造单位
        makeData: "", //制造日期
        pressure: "", //气瓶公称压力
        volume: "", //容积
        checkData: "", //检查日期
        nextCheckData: "", //下次检查日期
        selfId: "", //单位内部编号
        medium: "", //介质
      },
      dengform: {
        regId: "",
        regType: "",
        num: "",
        supervisoryOrg: "",
        checkName: "",
        useName: "",
        address: "",
        initData: "",

        useSafe: "",
        certification: "",
        cretificationDate: "",

        telPhone: "",
        creditCode: "",
        // productName:"",
        sbAddress: "",
        post: "",
        mobilePhone: "",
        userFill: "",
        fillDate: "",
        userSafePerson: "",
        verifyDate: "",
        certificationPerson: "",
      },

      // 编辑
      editUserForm: {
        regType: "", //登记类别
        carType: "", //车辆类型
        regId: "", //登记证编号
        sheng: "", //省级编号
        zoneId: "", //市区编号
        zoneName: "", //区级标号
        equType: "", //设备品种
        productName: "", //产品名称
        num: "", //气瓶数量
        constructionName: "", //施工单位名称
        checkName: "", //监督检验机构名称
        useName: "", //使用单位名称
        address: "", //单位地址
        creditCode: "", //信用代码
        initData: "", //投入使用时间
        mobilePhone: "", //固定电话
        postNum: "", //邮政编码
        telPhone: "", //手机电话
        useSafe: "", //安全管理员
        carNum: "", //车牌号
        vinNum: "", //车辆vin码
        certification: "", //登记机关
        cretificationDate: "", //发证日期
        certificationPerson: "", //登记人员
        departmentId: "", //所属单位id
        medium: "", //介质
        departmentId: "",
      },
      optionsuseName: [
        {
          id: 1,
          usenames: "待定1",
        },
        {
          id: 2,
          usenames: "待定2",
        },
      ],
      optionslei: [
        {
          id: 1,
          lei: "新设备首次启用",
        },
        {
          id: 2,
          lei: "改造",
        },
        {
          id: 3,
          lei: "使用单位更名",
        },
        {
          id: 4,
          lei: "使用地址变更",
        },
        {
          id: 5,
          lei: "过户",
        },
        {
          id: 6,
          lei: "移装",
        },
        {
          id: 7,
          lei: "达到设计使用年限",
        },
      ],

      rules: {
        regId: [{ required: true, message: "档案号不能为空", trigger: "blur" }],
        sheng: [{ required: true, message: "省级不能为空", trigger: "blur" }],
        zoneId: [{ required: true, message: "市级不能为空", trigger: "blur" }],
        zoneName: [
          { required: true, message: "区级不能为空", trigger: "blur" },
        ],
        regType: [
          { required: true, message: "注册类型不能为空", trigger: "blur" },
        ],
        equType: [
          { required: true, message: "气瓶类型不能为空", trigger: "blur" },
        ],
        num: [{ required: true, message: "气瓶数量不能为空", trigger: "blur" }],
        supervisoryOrg: [
          { required: true, message: "监督机构名称不能为空", trigger: "blur" },
        ],
        checkName: [
          { required: true, message: "检测机构名称不能为空", trigger: "blur" },
        ],
        useName: [
          { required: true, message: "使用单位名称不能为空", trigger: "blur" },
        ],

        address: [
          { required: true, message: "使用单位地址不能为空", trigger: "blur" },
        ],
        creditCode: [
          {
            required: true,
            message: "统一社会信用代码不能为空",
            trigger: "blur",
          },
        ],
        // initData: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择时间",
        //     trigger: "blur"
        //   }
        // ],
        postNum: [
          { required: true, message: "邮政编码不能为空", trigger: "blur" },
        ],
        carNum: [{ required: true, message: "车牌号不能空", trigger: "blur" }],
        vinNum: [
          { required: true, message: "车辆vin码不能为空", trigger: "blur" },
        ],
        initData: [
          {
            required: true,
            message: "请选择投入使用时间",
            trigger: "blur",
          },
        ],
        certificationPerson: [
          { required: true, message: "请输入登记人员", trigger: "blur" },
        ],
        mobilePhone: [
          { required: true, message: "固定电话不能为空", trigger: "blur" },
        ],
        useSafe: [
          { required: true, message: "安全管理员不能为空", trigger: "blur" },
        ],
        useFill: [
          { required: true, message: "填表人员不能为空", trigger: "blur" },
        ],

        fillData: [
          {
            required: true,
            message: "请选择填表日期",
            trigger: "blur",
          },
        ],

        certification: [
          { required: true, message: "登记机关不能为空", trigger: "blur" },
        ],

        cretificationDate: [
          {
            required: true,
            message: "请选择发证日期",
            trigger: "blur",
          },
        ],
        certificationPerson: [
          { required: true, message: "登记人员不能为空", trigger: "blur" },
        ],
        carType: [
          { required: true, message: "车辆类型不能为空", trigger: "blur" },
        ],
        telPhone: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
        ],
        sbCode: [
          { required: true, message: "设备代码不能为空", trigger: "blur" },
        ],
        gasId: [
          { required: true, message: "产品编号不能为空", trigger: "blur" },
        ],
        makeInfo: [
          { required: true, message: "制造单位不能为空", trigger: "blur" },
        ],
        makeData: [
          { required: true, message: "请填写制造日期", trigger: "blur" },
        ],
        pressure: [
          { required: true, message: "请填写气瓶公称压力", trigger: "blur" },
        ],
        volume: [{ required: true, message: "请填写容积", trigger: "blur" }],
        checkData: [
          { required: true, message: "请填写检查日期", trigger: "blur" },
        ],
        nextCheckData: [
          { required: true, message: "请填写下次检查日期", trigger: "blur" },
        ],
        selfId: [
          { required: true, message: "单位内编号不能为空", trigger: "blur" },
        ],
        useSafePerson: [
          {
            required: true,
            message: "使用单位安全管理员不能为空",
            trigger: "blur",
          },
        ],

        kind: [
          { required: true, message: "气瓶种类不能为空", trigger: "blur" },
        ],

        // type: [
        //   {
        //     type: "array",
        //     required: true,
        //     message: "请至少选择一个活动性质",
        //     trigger: "change"
        //   }
        // ],
      },
      // 分配角色,
      currRoleId: -1,
      //   分配当前用户id
      currusrId: -1,
      roles: [],
      currUsername: "",
      country: [],
      arealeve: 1,
      multipleSelection: [], //批量删除数据
      delarr: [], //批量删除id
      jaflak: "",
      //   保存所有角色数据
    };
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },
  },
  methods: {
    tiaozhuan() {
      this.$router.push("/unit/unit/checkout");
    },
    async downtemplatee() {
      console.log(this.regId);
      this.xiazai = this.$route.query.regId;
      this.loadingbut = true;
      this.loadingbuttext = "加载中...";
      var arr = {
        certification: this.certification,
        zoneName: this.zoneName,
        regId: this.regId,
        useName: this.useName,
        carNum: this.carNum,
      };
      console.log(arr);
      const res = await this.$http
        .post(
          `/car/down/excel`,
          arr,
          // {
          //   headers: "application/x-download",
          //   Authorization: localStorage.getItem("access_token"),
          // },
          { responseType: "blob" }
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.getAllVehGasListData();
            // 提示
            this.$message({
              type: "success",
              message: "下载成功",
            });
            this.loadingbut = false;
            this.loadingbuttext = "气瓶信息批量下载";
            const blob = new Blob([response.data], {
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
            this.dengdialogFormVisible = false;
          } else if (res.data.code == 201) {
            this.$message({
              type: "error",
              message: "生成失败",
            });
            this.loadingbut = false;
            this.loadingbuttext = "气瓶信息批量下载";
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "error",
            message: "生成失败",
          });
          //         _toastr.error(err)
          this.loadingbut = false;
          this.loadingbuttext = "气瓶信息批量下载";
        });
    },

    async previewFile() {
      if (this.codes == 200) {
        this.pdfindex = true;
      } else {
        this.$message({
          type: "error",
          message: "请先保存文件再预览",
        });
      }
    },
    handleCurrentChanges(val) {
      this.multipleSelection = val;
    },
    async Regtion() {
      let city = sessionStorage.getItem("cityCode"); //市code
      console.log(this.last.makeData);
      if (this.last.makeData == "") {
        this.$message({
          type: "error",
          message: "请先填写制造日期",
        });
      } else {
        const data =
          this.last.makeData.getFullYear() +
          "-" +
          0 +
          (this.last.makeData.getMonth() + 1) +
          "-" +
          this.last.makeData.getDate();
        // let data=new Date(this.last.makeData).toLocaleDateString().replace(/\//g, '-')
        const res = await this.$http.get(
          `/IDGenerate/carCode?city=${city}&equType=${this.form.equType}&makeData=${data}`
        );
        console.log(res);
        this.last.sbCode = res.data;
      }
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
            console.log(this.delarr);
            const res = await this.$http.post(
              `/carDoucument/delete`,
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
              this.getAllVehGasListData();
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
    showDeleUserMsgBoxx(user) {
      console.log(user);
      this.unlist.splice(user, 1);
      if (this.unlist.length == 0) {
        this.haofan = false;
      }
    },
    async a() {
      for (var key in this.selects6) {
        if (this.form.useName == this.selects6[key].name) {
          const res = await this.$http.get(`/unit/${this.selects6[key].id}`);
          console.log(res);
          this.form.address = res.data.data.address;
          this.form.creditCode = res.data.data.code;
          this.form.mobilePhone = res.data.data.unitPhone;
          this.form.initData = res.data.data.unitIssueTime;
          this.form.postNum = res.data.data.postalCode;
          this.form.telPhone = res.data.data.phone;
          this.form.useName = res.data.data.name;
          this.form.useSafe = res.data.data.personnelName;
          this.form.departmentId = res.data.data.id;
        }
      }
      // console.log(res);

      // console.log(this.form);
    },
    async aa() {
      console.log(this.form.useName);
      for (var key in this.selects6) {
        if (this.editUserForm.useName == this.selects6[key].name) {
          const res = await this.$http.get(`/unit/${this.selects6[key].id}`);
          console.log(res);
          this.editUserForm.address = res.data.data.address;
          this.editUserForm.creditCode = res.data.data.code;
          this.editUserForm.mobilePhone = res.data.data.unitPhone;
          this.editUserForm.departmentId = res.data.data.id;
          this.editUserForm.initData = res.data.data.unitIssueTime;
          this.editUserForm.postNum = res.data.data.postalCode;
          this.editUserForm.telPhone = res.data.data.phone;
          this.editUserForm.useName = res.data.data.name;
          this.editUserForm.useSafe = res.data.data.useSafe;
          this.editUserForm.departmentId = res.data.data.id;
        }
      }
    },
    //上传excel
    async uploadFile(item) {
      let file = item.file;
      console.log(file);
      let blod = new Blob([file]);
      let file1 = new File([blod], file.name, { type: file.type });
      let form = new FormData();
      form.append("file", file1);
      console.log(`看这里${JSON.stringify(this.form)}`);
      console.log(`这里${JSON.stringify(item)}`);
      await this.$http({
        method: "post",
        url: `/carExcel/template/analysis`,
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
          //  Authorization: localStorage.getItem("access_token")
        },
      }).then((res) => {
        console.log(res);
        this.getAllVehGasListData();
        // 提示
        this.$message({
          type: "success",
          message: res.data.msg,
        });
      });
      // console.log(`数据${JSON.stringify(res)}`)
    },
    // 生成登记号
    async Registration() {
      let sheng = sessionStorage.getItem("provinceCode"); //省code
      let city = sessionStorage.getItem("cityCode"); //市code
      if (this.tyPe == 2) {
        if (
          this.form.sheng == "" ||
          this.form.zoneId == "" ||
          this.form.equType == ""
        ) {
          this.$message({
            type: "error",
            message: "请先选择省市区和设备类型再试",
          });
        } else {
          const res = await this.$http.get(
            `/IDGenerate/carCreate?zoneId=${city}&equipmentCode=${this.form.equType}`
          );
          console.log(res);
          // $(".dengji").text(res.data);
          this.form.regId = res.data;
          console.log(this.form.regId);
        }
      } else if (this.tyPe == 1) {
        // console.log(1);
        console.log(this.form.sheng);
        console.log(this.form.zoneId);
        if (
          this.form.sheng == "" ||
          this.form.zoneId == "" ||
          this.form.equType == ""
        ) {
          this.$message({
            type: "error",
            message: "请先选择省市区和设备类型再试",
          });
        } else {
          const res = await this.$http.get(
            `/IDGenerate/carCreate?zoneId=${city}&equipmentCode=${this.form.equType}`
          );
          console.log(res);
          // $(".dengji").text(res.data);
          this.form.regId = res.data;
          console.log(this.form.regId);
        }
      } else if (this.tyPe == 0) {
        if (
          this.form.sheng == "" ||
          this.form.zoneId == "" ||
          this.form.equType == ""
        ) {
          this.$message({
            type: "error",
            message: "请先选择省市区和设备类型再试",
          });
        } else {
          const res = await this.$http.get(
            `/IDGenerate/carCreate?zoneId=${this.form.zoneId}&equipmentCode=${this.form.equType}`
          );
          console.log(res);
          // $(".dengji").text(res.data);
          this.form.regId = res.data;
          console.log(this.form.regId);
        }
      } else if (this.tyPe == 3) {
        if (
          this.form.sheng == "" ||
          this.form.zoneId == "" ||
          this.form.equType == ""
        ) {
          this.$message({
            type: "error",
            message: "请先选择省市区和设备类型再试",
          });
        } else {
          const res = await this.$http.get(
            `/IDGenerate/carCreate?zoneId=${this.form.zoneId}&equipmentCode=${this.form.equType}`
          );
          console.log(res);
          // $(".dengji").text(res.data);
          this.form.regId = res.data;
          console.log(this.form.regId);
        }
      }
    },
    //下载模板
    downTemplate() {
      this.$http
        .post(
          `/carExcel/template/download`,
          { headers: "application/x-download" },
          { responseType: "blob" }
        )
        .then((response) => {
          console.log(response.data);
          const blob = new Blob([response.data], {
            type: "application/vnd.ms-excel",
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

          //  const url = URL.createObjectURL(blob);
          //   window.location.href = url;
          //  window.location.href = response.data;
        })
        .catch((err) => {
          //         _toastr.error(err)
        });
    },

    // file形参里面相关操作的文件
    handlePreview(file) {
      console.log(file);

      // this.picPreviewPath = file.response.data.url;
      // this.previewDialogVisible = true;
    },
    //行政区划的获取
    async administrative() {
      const res = await this.$http.get(`drop/car`);
      console.log(res);
      this.division = res.data.data;
    },
    handleRemove(file) {
      console.log(file);

      // 1.获取将要删除图片的临时路径
      // const filePath = file.response.data.tmp_path;
      // 2.从pics数组中，找到图片对应的索引值
      // const i = this.addForm.pics.findIndex(x => x.pic === filePath);
      // 3.调用splice方法，移除图片信息
      // this.addForm.splice(i, 1);
      //file.response.data.tmp_path 图片临时上传的路径
      //   从this.form.pics 移除当前数据x掉的图片
      // 先获取该图片的索引
      // findIndex ((item)=>{})遍历数组 把符合条件的元素的索引进行返回
      //   let Index = this.form.pics.findIndex(item => {
      //     item.pic === file.response.data.tmp_path;
      //   });
      //   this.form.pics.splice(Index, 1);
      // console.log("失败");
      // console.log(file);
    },
    handleSuccess(response) {
      console.log(response);

      // 1.拼接得到一个图片信息对象 临时路径
      // const picInfo = { pic: response.data.tmp_path };
      // 2.将图片信息对象，push到pics数组中
      // this.addForm.pics.push(picInfo);
      // file.data.tem_path 图片临时上传的路径
      //console.log("成功");
      //   this.form.pics.push({
      //     pic: file.data.tep_path
      //   });
      //console.log(file);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    // 保存文件
    savencftpget() {
      this.loadingbut = true;
      this.loadingbuttext = "加载中...";
      this.$http.get(`/carword/word?id=${this.dengId}`).then((res) => {
        console.log(res);
        if (res.data.code == 1) {
          this.$message({
            type: "warning",
            message: res.data.msg,
          });
          this.loadingbut = false;
          this.loadingbuttext = "保存文件";
        } else if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.codes = res.data.code;
          this.url = res.data.data[0];
          this.urls = res.data.data[1];
          this.loadingbut = false;
          this.loadingbuttext = "保存文件";
        }
      });
    },
    // 下载world文档
    async ncftpget() {
      console.log(this.regsId);

      const res = await this.$http
        .post(
          `/CarInspector/word/${this.regsId}`,
          { headers: "application/x-download" },
          { responseType: "blob" }
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.getAllVehGasListData();
            // 提示
            this.$message({
              type: "success",
              message: "下载成功",
            });
            const blob = new Blob([response.data], {
              type: "application/msword",
            });
            const fileName = "登记证打印模板.pdf";

            const elink = document.createElement("a");

            elink.download = fileName;

            elink.style.display = "none";

            elink.href = URL.createObjectURL(blob);

            document.body.appendChild(elink);

            elink.click();

            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
            this.dengdialogFormVisible = false;
          } else if (res.data.code == 201) {
            this.$message({
              type: "danger",
              message: "请填写所需要的内容",
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "danger",
            message: "请填写所需要的内容",
          });
          //         _toastr.error(err)
        });
    },
    async registrationAddUserDia(row) {
      // this.regId = row.regId;
      this.regsId = row.regId;
      // console.log(row);
      this.dengId = row.id;
      const ress = await this.$http.get(
        `/carword/showTable?&id=${this.dengId}`
      );
      console.log(ress);
      this.dengform = ress.data.data;
      this.dengdialogFormVisible = true;
    },
    // 省级区域显示
    // async provinceMessage() {

    // },

    //  市级
    async function2(val) {
      console.log(val);
      this.code = val;
      this.form.zoneId = "";
      this.form.zoneName = "";
      this.editUserForm.zoneId = "";
      this.editUserForm.zoneName = "";
      this.dengform.zoneId = "";
      this.dengform.zoneName = "";
      const res = await this.$http.get(`/chinese/city/${this.code}`);
      console.log(res);
      this.level = res.data.data;
    },

    // 区域
    async function1(val) {
      console.log(val);

      this.Idd = val;
      // this.level.map((s, index) => {
      //   if (s.code === val) {
      //     this.Idd = this.level[index].id;
      //   }
      // });
      const res = await this.$http.get(`/chinese/area/${this.Idd}`);
      console.log(res);
      this.levels = res.data.data;
    },

    // 查看信息
    async lookEdituser(user) {
      // console.log(userId);
      console.log(user);

      // this.dialogTableVisible = true;
      this.$router.push({ path: "/cinmessage", query: { id: user.id } });
    },
    // 编辑用户
    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.post(
        `/carDoucument/update`,
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
      } else {
        this.$message({
          type: "danger",
          message: "修改失败",
        });
      }
    },
    //第二个修改
    async EditUsers() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.unlist.push(this.lasts);
          console.log(this.unlist);
          this.dialogFormVisibleEdits = false;
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleEdits = true;
        }
      });
    },

    // 编辑对话框打开
    async showEdituser(user) {
      console.log(user);
      // 2.添加对话框
      this.dialogFormVisibleEdit = true;
      const res = await this.$http.get(`carDoucument/show?regId=${user.regId}`);
      const es = await this.$http.get(`/unitdrop/select?bottleType=0`);
      console.log(res);
      this.userlists = res.data.data;
      this.editUserForm = user;
      //user其实就是scope.row也就是userlist
      console.log(es);
      this.selects6 = es.data.data;
    },
    //第二个修改对话框
    showEditusers(user) {
      this.dialogFormVisibleEdits = true;
      this.lasts = user;
    },
  

    //   添加用户发送请求
    async AddUser() {
      // 2.关闭对话框
      this.$refs.form.validate(async (valid) => {
        const user = Object.assign(this.form, this.last);
        if (valid) {
          if (this.tyPe == 1) {
            this.form.sheng = sessionStorage.getItem("provinceCode"); //省code
            this.form.zoneId = sessionStorage.getItem("cityCode"); //市code
            this.form.zoneName = sessionStorage.getItem("country");
            const res = await this.$http.post(`/carDoucument/save`, user);
            if (res.data.code === 200) {
              // 回到第一页展示
              //this.pagenum = 1;
              // 重新请求数据
              this.getAllVehGasListData();
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });

              this.dialogFormVisibleAdd = false;
              this.administrative();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 2) {
            this.form.sheng = sessionStorage.getItem("provinceCode"); //省code
            this.form.zoneId = sessionStorage.getItem("cityCode"); //市code
            const res = await this.$http.post(`/carDoucument/save`, user);
            if (res.data.code === 200) {
              // 回到第一页展示
              //this.pagenum = 1;
              // 重新请求数据
              this.getAllVehGasListData();
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });

              this.dialogFormVisibleAdd = false;
              this.administrative();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 3) {
            this.form.sheng = sessionStorage.getItem("provinceCode"); //省code
            const res = await this.$http.post(`/carDoucument/save`, user);
            if (res.data.code === 200) {
              // 回到第一页展示
              //this.pagenum = 1;
              // 重新请求数据
              this.getAllVehGasListData();
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });

              this.dialogFormVisibleAdd = false;
              this.administrative();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
          } else {
            const res = await this.$http.post(`/carDoucument/save`, user);
            if (res.data.code === 200) {
              // 回到第一页展示
              //this.pagenum = 1;
              // 重新请求数据
              this.getAllVehGasListData();
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });

              this.dialogFormVisibleAdd = false;
              this.administrative();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg,
              });
            }
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

    //  添加用户发送请求 2
    async AddUsers() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          var a = this.last.volume;
          var b = this.last.pressure;
          this.last.volume = Number(a);
          this.last.pressure = Number(b);
          console.log(typeof this.last.pressure);
          console.log(typeof this.last.volume);
          this.unlist.push(this.last);
          console.log(this.unlist);
          if (this.unlist.length == 1) {
            this.haofan = true;
            console.log(12);
          }
          // console.log(this.unlist);
          this.dialogFormVisibleAdds = false;
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAdds = true;
        }
      });
    },

    // 添加用户显示对话框
    async showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单
      // this.form = {};
      this.form.postNum = "";
      this.dialogFormVisibleAdd = true;
      const res = await this.$http.get(`/unitdrop/select?bottleType=0`);
      const ress = await this.$http.get(`/unitdrop/show`);
      const resss = await this.$http.get(`unitdrop/detection?bottleType=0`);
      console.log(resss);
      this.optionsuse = resss.data.data;
      this.form.certification = ress.data.data.certification;
      this.form.certificationPerson = ress.data.data.certificationPerson;
      this.form.cretificationDate = ress.data.data.cretificationDate;
      console.log(res);
      this.selects6 = res.data.data;
    },
    // 添加用户显示对话框 2
    async showAddUserDiaa() {
      // 先点编辑 再点添加 打开表单清空表单
      // this.form = {};
      this.dialogFormVisibleAdds = true;
      const res = await this.$http.get(`unitdrop/manufacturer?bottleType=0`);
      console.log(res);
      this.selecttion = res.data.data;
    },
    //查看信息的显示对话框
    async showAddUserDiaaa() {
      this.dialogFormVisibleAddss = true;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getAllVehGasListData();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/carDoucument/select?carNum=${this.carNum}&pageSize=${this.pageSize}&currPage=1&regId=${this.regId}&unit=${this.unitName}&useName=${this.useName}&certification=${this.certification}&zoneName=${this.zoneName}`
      );
      console.log(res);
      if (res.data.code == 1) {
        this.$message({
          type: "danger",
          message: res.data.msg,
        });
        this.unitName = "";
      } else {
        this.VehGasList = res.data.data.list;
        this.total = res.data.data.totalCount;
      }
      // console.log("aaaaaa");
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      this.currPage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getAllVehGasListData();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currPage = val;
      this.getAllVehGasListData();
    },
    getAllVehGasListData() {
      getAllVehGasList(ress=>{
          console.log(ress);
      this.tyPe = ress.data.data.type; //type
      console.log(this.tyPe);
      if (ress.data.data.type == 2) {
        sessionStorage.setItem("provinceCode", ress.data.data.provinceCode);
        sessionStorage.setItem("cityCode", ress.data.data.cityCode);
        sessionStorage.setItem("sheng", ress.data.data.province);
        sessionStorage.setItem("zoneId", ress.data.data.city);
        this.form.sheng = ress.data.data.province;
        this.form.zoneId = ress.data.data.city;
        this.levels = ress.data.data.area;
        this.showCmd = true;
        this.showCmds = false;
        this.showCmd_1 = true;
      } else if (ress.data.data.type == 1) {
        sessionStorage.setItem("provinceCode", ress.data.data.provinceCode);
        sessionStorage.setItem("cityCode", ress.data.data.cityCode);
        sessionStorage.setItem("areaCode", ress.data.data.areaCode);
        sessionStorage.setItem("sheng", ress.data.data.province);
        sessionStorage.setItem("zoneId", ress.data.data.city);
        sessionStorage.setItem("country", ress.data.data.area);
        this.form.sheng = ress.data.data.province;
        this.form.zoneId = ress.data.data.city;
        this.form.zoneName = ress.data.data.area;
        this.showCmd = true;
        this.showCmds = true;
        this.showCmd_1 = true;
      } else if (ress.data.data.type == 0) {
        this.options = ress.data.data.provinces;
        this.showCmd = false;
        this.showCmds = false;
        this.showCmd_1 = false;
      } else if (ress.data.data.type == 3) {
        //省监管
        sessionStorage.setItem("provinceCode", ress.data.data.provinceCode);
        sessionStorage.setItem("sheng", ress.data.data.province);
        this.provinceCode = ress.data.data.province; //省搜索name
        // this.codes = ress.data.data.provinceCode; //省code
        this.form.sheng = ress.data.data.province; //省表单name
        this.level = ress.data.data.city; //市数组
        // this.AreaId = res.data.data.area; //区数组
        //
        this.showCmds = false; //区按钮
        this.showCmd = true; //省按钮
        this.showCmd_1 = false; //市按钮
      }

      })
    
    
      //需要授权的API ，必须在请求头中使用Authorization 字段token令牌
      //pagenum当前页面   pagesize每页显示条数
      //接口文档中 除了登录接口之外的所有请求都需要进行授权，设置请求头
      //找axios中关于请求头的代码  写在了http.js中
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      
      // const res = await this.$http.get(
      //   `/carDoucument/select?pageSize=${this.pageSize}&currPage=${this.currPage}`
      // );
      // console.log(res);
      // this.VehGasList = res.data.data.list;
      // this.total = res.data.data.totalCount;
    },
  },
  created() {
    this.getAllVehGasListData();
    this.administrative();
    this.form.regType = this.selects3[0].orders;
    this.form.carType = this.selects4[0].orders;
    this.form.equType = this.selects1[0].orders;
    this.form.productName = this.selects5[0].orders;
    // this.Municipal();
    // this.Municipals();
  },
  //   弹框组件
  // components:{
  //    Message
  // }
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
.inst {
  position: relative;
}
.instt {
  display: block;
  float: right;
}
.font-color {
  color: red;
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
.imgs {
  text-align: center;
}
.input1 {
  width: 200px;
}
</style>
<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
.el-table .warning-row {
  background: rgb(250, 249, 249) !important;
}

.el-table .success-row {
  background: rgb(250, 249, 249) !important;
}
[class*="el-col-"] {
  margin-top: 5px;
}
</style>
<style>
.red_s label {
  color: #f00 !important;
}
</style>