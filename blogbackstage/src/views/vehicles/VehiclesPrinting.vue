<template>
  <div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
        </el-col>
        <el-col :span="22">
          <el-col style="padding-left:15px" :span="4">
            <el-input
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入气瓶编号"
              v-model="gasId"
            ></el-input>
          </el-col>
          <el-col style="padding-left:15px" :span="4">
            <el-input
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入气瓶标签号"
              v-model="appId"
            ></el-input>
          </el-col>
          <el-col style="padding-left:15px" :span="4">
            <el-input
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              v-model="buildingUser"
              placeholder="请输入制造单位"
            ></el-input>
          </el-col>
          <el-col style="padding-left:15px" :span="4">
            <el-input
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入车牌号"
              v-model="carNum"
            ></el-input>
          </el-col>
          <el-col style="padding-left:15px" :span="4">
            <el-select
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              v-model="reportStatus"
              placeholder="请选择报告状态"
            >
              <el-option
                v-for="item in optionsuse"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>

          <el-col style="padding-left:15px" :span="4">
            <el-button
              style=" width: 100%;"
              @click="search()"
              class="el_button"
              icon="el-icon-search"
            >搜索</el-button>
          </el-col>
        </el-col>
        <el-col :span="3">
          <!-- <el-button @click="showAddUserDia()" type="primary">
          <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>-->
        </el-col>
      </el-row>
      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 20px 0px;z-index:999"
        ></p>
      </el-col>

      <!-- 表格 -->
      <el-table
        border
        :data="carReportList"
        style="width: 100%;margin:20px 0px;padding-bottom:40px"
        :row-style="{height:'40px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="regId" label="登记证编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="equType" label="设备类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="gasId" label="气瓶编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="carNum" label="车牌号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="appId" label="标签号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="checkData" label="检验日期" show-overflow-tooltip width="150">
          <template slot-scope="socpe">{{socpe.row.checkData | fmtdate}}</template>
        </el-table-column>
        <el-table-column prop="nextCheckData" label="下次检验日期" show-overflow-tooltip width="150">
          <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
        </el-table-column>
        <el-table-column prop="makeInfo" label="制造单位" show-overflow-tooltip></el-table-column>
        <el-table-column prop="status" label="气瓶状态" show-overflow-tooltip :formatter="ifendcases"></el-table-column>
        <el-table-column
          prop="reportStatus"
          label="报告状态"
          show-overflow-tooltip
          :formatter="ifendcol"
        ></el-table-column>
        <el-table-column prop="address" width="400" label="操 作">
          <template slot-scope="scope">
            <!-- size 调整按钮大小 -->
            <!-- 编辑 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="水压试压"
              :enterable="false"
              placement="top"
            >
              <el-button
                type="danger"
                size="mini"
                title="水压试压"
                plain
                @click="shuiEdituser(scope.row)"
              >水压试压</el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="检验报告"
              :enterable="false"
              placement="top"
            >
              <el-button
                type="primary"
                size="mini"
                title="检验报告"
                plain
                @click="showEdituser(scope.row)"
              >检验报告</el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="定检报告"
              :enterable="false"
              placement="top"
            >
              <el-button
                type="success"
                size="mini"
                title="定检报告"
                plain
                @click="dingEdituser(scope.row)"
              >定检报告</el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              content="判废报告"
              :enterable="false"
              placement="top"
            >
              <el-button
                type="warning"
                size="mini"
                title="报废报告"
                plain
                @click="baoEdituser(scope.row)"
              >报废报告</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

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

      <!-- 检测报告对话框 -->
      <el-dialog
        width="80%"
        top="5vh"
        lock-scroll
        title="车用气瓶气瓶检验报告"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-form :model="editUserForm" :rules="rules" ref="editUserForm">
          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">原始标记</h3>
          </el-col>

          <el-col style="margin-top:10px" :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="气瓶编号" label-width="140px" prop="gasId">
                <el-input disabled v-model="editUserForm.gasId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="车辆使用性质" label-width="140px" prop="carNature">
                <el-input v-model="editUserForm.carNature" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="制造国别" label-width="140px" prop="manufacturingCountry">
                <el-input v-model="editUserForm.manufacturingCountry" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="使用单位:" label-width="140px" prop="buildingUser">
                <el-input v-model="editUserForm.buildingUser" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="车牌号:" label-width="140px" prop="carNum">
                <el-input v-model="editUserForm.carNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="记录编号:" label-width="140px" prop="recordNumber">
                <el-input v-model="editUserForm.recordNumber" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="制造单位" label-width="140px" prop="manufacturingUnit">
                <el-input v-model="editUserForm.manufacturingUnit" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="气瓶所属地(区县)" label-width="140px" prop="gasCounty">
                <el-input v-model="editUserForm.gasCounty" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="气瓶登记证编号" label-width="140px" prop="carRegId">
                <el-input v-model="editUserForm.carRegId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="公称工作压力(MPa)" label-width="140px" prop="nominalPressure">
                <el-input v-model="editUserForm.nominalPressure" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="水压试验压力(MPa)" label-width="140px" prop="waterPressure">
                <el-input v-model="editUserForm.waterPressure" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="气瓶公称容积(L)" label-width="140px" prop="cylinderPressure">
                <el-input v-model="editUserForm.cylinderPressure" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="设计壁厚(mm)" label-width="140px" prop="designWallThickness">
                <el-input v-model="editUserForm.designWallThickness" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="制造日期" label-width="140px" prop="makeMonthly">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.makeMonthly"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="安装日期" label-width="140px" prop="installationTime">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.installationTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="上次检验日期" label-width="140px" prop="lastSurveyDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.lastSurveyDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="瓶内介质处理" label-width="140px" prop="cylinderMedium">
                <el-input v-model="editUserForm.cylinderMedium" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="检测员" label-width="140px" prop="jiancea">
                <el-input v-model="editUserForm.jiancea" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">外观检验</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="仪器名称/编号/有效期" label-width="200px" prop="instrument">
                <el-input v-model="editUserForm.instrument" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="金属机械性损伤检验:" label-width="200px" prop="result1">
                <el-select v-model="editUserForm.result1" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="瓶体凹陷检验:" label-width="200px" prop="result2">
                <el-select v-model="editUserForm.result2" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="凹陷中带有划伤或磕伤:" label-width="200px" prop="result3">
                <el-select v-model="editUserForm.result3" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="热损伤检验:" label-width="200px" prop="result4">
                <el-select v-model="editUserForm.result4" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="腐蚀情况检验:" label-width="200px" prop="result5">
                <el-select v-model="editUserForm.result5" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="筒体圆度检验:" label-width="200px" prop="result6">
                <el-select v-model="editUserForm.result6" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="筒体直线度检验:" label-width="200px" prop="result7">
                <el-select v-model="editUserForm.result7" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="音响检验:" label-width="200px" prop="result8">
                <el-select v-model="editUserForm.result8" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="瓶口螺纹检验:" label-width="200px" prop="result9">
                <el-select v-model="editUserForm.result9" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="内部检验:" label-width="200px" prop="result10">
                <el-select v-model="editUserForm.result10" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="磁粉探伤:" label-width="200px" prop="result11">
                <el-select v-model="editUserForm.result11" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="超声波探伤:" label-width="200px" prop="result12">
                <el-select v-model="editUserForm.result12" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="检测员" label-width="200px" prop="jianceb">
                <el-input v-model="editUserForm.jianceb" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">重量与容积测定</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="仪器名称/编号/有效期:" label-width="200px" prop="instrumentName">
                <el-input v-model="editUserForm.instrumentName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="标记重量(Kg):" label-width="200px" prop="markWeight">
                <el-input v-model="editUserForm.markWeight" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="实测重量(Kg):" label-width="200px" prop="measuredWeight">
                <el-input v-model="editUserForm.measuredWeight" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="重量损失率(%):" label-width="200px" prop="weightLoss">
                <el-select v-model="editUserForm.weightLoss" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="标记容积(L):" label-width="200px" prop="makeVolume">
                <el-input v-model="editUserForm.makeVolume" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="实测容积(L):" label-width="200px" prop="measurementVolume">
                <el-input v-model="editUserForm.measurementVolume" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="容积增大率(%):" label-width="200px" prop="volumeBig">
                <el-select v-model="editUserForm.volumeBig" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检验员:" label-width="200px" prop="jiancec">
                <el-input v-model="editUserForm.jiancec" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--  -->
            </el-col>
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">水压试验及干燥检验</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="试验压力(MPa):" label-width="200px" prop="testPressure">
                <el-input v-model="editUserForm.testPressure" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="试验温度(C):" label-width="200px" prop="testTemperature">
                <el-input v-model="editUserForm.testTemperature" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="保压时间:" label-width="200px" prop="dwellTime">
                <el-input v-model="editUserForm.dwellTime" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item  class="red_s" label="容积全变形:" label-width="200px" prop="volumetricTotalDeformation">
                <el-input v-model="editUserForm.volumetricTotalDeformation" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="容积残余变形:" label-width="200px" prop="volumetricremnant">
                <el-input v-model="editUserForm.volumetricremnant" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="容积残余变形率(%):" label-width="200px" prop="volumetri">
                <el-input v-model="editUserForm.volumetri" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="水压试验结论:" label-width="200px" prop="waterTestResult">
                <el-input v-model="editUserForm.waterTestResult" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="干燥检验:" label-width="200px" prop="drying">
                <el-input v-model="editUserForm.drying" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="检验员:" label-width="200px" prop="jianced">
                <el-input v-model="editUserForm.jianced" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">瓶阀检验与装配</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="瓶阀制造厂:" label-width="200px" prop="valveManufacturing">
                <el-input v-model="editUserForm.valveManufacturing" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="瓶阀编号:" label-width="200px" prop="valveNum">
                <el-input v-model="editUserForm.valveNum" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="试验压力(MPa):" label-width="200px" prop="experimentalPressure">
                <el-input v-model="editUserForm.experimentalPressure" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="试验介质:" label-width="200px" prop="testMedium">
                <el-input v-model="editUserForm.testMedium" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="瓶阀检验:" label-width="200px" prop="cylinderValveInspection">
                <el-input v-model="editUserForm.cylinderValveInspection" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="瓶阀装配:" label-width="200px" prop="cylinderValveAssembly">
                <el-input v-model="editUserForm.cylinderValveAssembly" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="检验员:" label-width="200px" prop="jiancee">
                <el-input v-model="editUserForm.jiancee" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8"></el-col>
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">气密试验</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="试验方法:" label-width="200px" prop="testMethod">
                <el-input v-model="editUserForm.testMethod" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="试验介质:" label-width="200px" prop="medium">
                <el-input v-model="editUserForm.medium" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="试验介质温度(C):" label-width="200px" prop="temperature">
                <el-input v-model="editUserForm.temperature" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="试验压力(MPa):" label-width="200px" prop="pressure">
                <el-input v-model="editUserForm.pressure" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="保压时间:" label-width="200px" prop="pressureTime">
                <el-input v-model="editUserForm.pressureTime" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item  class="red_s"label="结论:" label-width="200px" prop="result">
                <el-input v-model="editUserForm.result" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="抽真空或充氮气:" label-width="200px" prop="vacuo">
                <el-input v-model="editUserForm.vacuo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="检验标记:" label-width="200px" prop="inspectionTag">
                <el-input v-model="editUserForm.inspectionTag" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="检测员:" label-width="200px" prop="jiancef">
                <el-input v-model="editUserForm.jiancef" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="缺陷性质位置及描述:" label-width="200px" prop="describe1">
                <el-input v-model="editUserForm.describe1" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="缺陷性质位置及描述:" label-width="200px" prop="describe2">
                <el-input v-model="editUserForm.describe2" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="最终结论:" label-width="200px" prop="finalResult">
                <el-select v-model="editUserForm.finalResult" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="下次检验日期：" label-width="200px" prop="nextInspectionDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.nextInspectionDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="检验人:" label-width="200px" prop="inspector1">
                <el-input v-model="editUserForm.inspector1" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="检验日期" label-width="200px" prop="inspectorDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.inspectorDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="审核人:" label-width="200px" prop="verifier">
                <el-input v-model="editUserForm.verifier" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="审核时间" label-width="200px" prop="verifierDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.verifierDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
          </el-col>
        </el-form>
        <p style=" text-align: center;" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="SaveUserku()">保存到数据库</el-button>
          <el-button type="primary" :loading="loadingbut" @click="EditUser()">{{loadingbuttext}}</el-button>
          <el-button type="primary" :disabled="btnChangeEnable" @click="SaveUser()">下载保存文件</el-button>
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        </p>
      </el-dialog>

      <!-- 定检报告对话框 -->
      <el-dialog
        width="80%"
        top="5vh"
        lock-scroll
        title="车用气瓶气瓶定检报告"
        :visible.sync="dialogFormVisiblreport"
      >
        <el-form class="dingreport" :model="reportUserForm" :rules="rules">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="报告编号" label-width="150px" prop="initData">
                <el-input disabled v-model="reportUserForm.reportNumber" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="产权所有者" label-width="150px" prop="initData">
                <el-input v-model="reportUserForm.propertyOwner" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="登记证编号" label-width="150px" prop="initData">
                <el-input disabled v-model="reportUserForm.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="气瓶编号" label-width="150px" prop="initData">
                <el-input disabled v-model="reportUserForm.gasId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s"  label="充装介质" label-width="150px" prop="initData">
                <el-input disabled v-model="reportUserForm.medium" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="检验单位" label-width="150px" prop="initData">
                <el-input v-model="reportUserForm.inspectionUnit" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="更换门数量" label-width="150px" prop="initData">
                <el-input v-model="reportUserForm.num" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="阀门制造单位" label-width="150px" prop="initData">
                <el-input v-model="reportUserForm.manufacturingUnit" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="检验日期" label-width="150px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="reportUserForm.checkData"
                  style="width: 100%;"
                  :picker-options="pickerOptions0"
                ></el-date-picker>
                <!-- <el-input v-model="editUserForm.regId" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="下次检验日期" label-width="150px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="reportUserForm.nextCheckData"
                  style="width: 100%;"
                  :picker-options="pickerOptions1"
                ></el-date-picker>
                <!-- <el-input v-model="editUserForm.makeInfo" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">&nbsp;</el-col>

            <el-col :span="8">&nbsp;</el-col>
          </el-col>
        </el-form>
        <p style=" text-align: center;" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="rePort()">保存到数据库</el-button>
          <el-button type="primary" @click="EditUserreport()">保存文件</el-button>
          <el-button type="primary" @click="SaveUserreport()">下载保存文件</el-button>
          <el-button @click="Visiblreport()">取 消</el-button>
        </p>
      </el-dialog>

      <!-- 判废报告对话框 -->
      <el-dialog
        width="80%"
        top="5vh"
        lock-scroll
        title="车用气瓶气瓶判废报告"
        :visible.sync="dialogFormVisiblfei"
      >
        <el-form class="baofei" :model="scrapped" :rules="rules">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="报告编号" label-width="150px" prop="initData">
                <el-input disabled v-model="scrapped.reportNumber" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="产权所有者" label-width="150px" prop="initData">
                <el-input v-model="scrapped.propertyOwner" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="登记证编号" label-width="150px" prop="initData">
                <el-input disabled v-model="scrapped.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="气瓶编号" label-width="150px" prop="initData">
                <el-input disabled v-model="scrapped.gasId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="充装介质" label-width="150px" prop="initData">
                <el-input disabled v-model="scrapped.medium" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="检验单位" label-width="150px" prop="initData">
                <el-input v-model="scrapped.inspectionUnit" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="制造单位" label-width="150px" prop="initData">
                <el-input v-model="scrapped.manufacturingUnit" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="报废原因" label-width="150px" prop="initData">
                <el-input v-model="scrapped.scrap" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="处理结果" label-width="150px" prop="initData">
                <el-input v-model="scrapped.result" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="检验日期" label-width="150px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="scrapped.checkData"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="editUserForm.makeInfo" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!-- <el-form-item label="下次检验日期" label-width="150px" prop="initData">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="feiUserForm.initData"
                style="width: 100%;"
              ></el-date-picker>
              </el-form-item>-->
            </el-col>

            <el-col :span="8">
              <!-- <el-form-item label="检验单位" label-width="150px" prop="initData">
              <el-input v-model="feiUserForm.inspectionUnit" autocomplete="off"></el-input>
              </el-form-item>-->
            </el-col>
          </el-col>
        </el-form>
        <p style=" text-align: center;" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="SaveUserrfei()">保存到数据库</el-button>
          <el-button type="primary" @click="EditUserfei()">保存文件</el-button>
          <el-button type="primary" @click="SaveUserfei()">下载保存文件</el-button>
          <el-button @click="dialogFormVisiblfei = false">取 消</el-button>
        </p>
      </el-dialog>

      <!-- 水压试压对话框 -->
      <el-dialog
        width="80%"
        top="5vh"
        lock-scroll
        title="车用气瓶水压试压"
        :visible.sync="shuidialogFormVisibl"
      >
        <el-form class="baofei" :model="feiUserForm" :rules="rules">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="产权单位" label-width="150px" prop="vehicleOwner">
                <el-input v-model="feiUserForm.vehicleOwner" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="气瓶编号" label-width="150px" prop="gasId">
                <el-input disabled v-model="feiUserForm.gasId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <!-- <el-col :span="8">
              <el-form-item label="制造单位" label-width="150px" prop="initData">
                <el-input disabled v-model="feiUserForm.makeInfo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>-->
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="制造日期" label-width="150px" prop="makeData">
                <el-date-picker
                  disabled
                  type="date"
                  placeholder="选择日期"
                  v-model="feiUserForm.makeData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="公称容积(L)" label-width="150px" prop="publicVolume">
                <el-input v-model="feiUserForm.publicVolume" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="公称压力(MPa)" label-width="150px" prop="publicPressure">
                <el-input v-model="feiUserForm.publicPressure" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="制造单位" label-width="150px" prop="makeInfo">
                <el-input disabled v-model="feiUserForm.makeInfo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="报告编号" label-width="150px" prop="reportId">
                <el-input v-model="feiUserForm.reportId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <!-- <el-form-item label="处理结果" label-width="150px" prop="initData">
                <el-input v-model="feiUserForm.result" autocomplete="off"></el-input>
              </el-form-item>-->
              <el-form-item class="red_s" label="实际重量(Kg)" label-width="150px" prop="realWeight">
                <el-input v-model="feiUserForm.realWeight" autocomplete="off"></el-input>
                <!-- <el-input v-model="editUserForm.makeInfo" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="试验温度(℃)" label-width="150px" prop="tremperature">
                <el-input v-model="feiUserForm.tremperature" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="试验压力(Mpa)" label-width="150px" prop="testPressure">
                <el-input v-model="feiUserForm.testPressure" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="保压时间(s)" label-width="150px" prop="holdTime">
                <el-input v-model="feiUserForm.holdTime" autocomplete="off"></el-input>
                <!-- <el-input v-model="editUserForm.makeInfo" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="全变形值(ml)" label-width="150px" prop="fullVolume">
                <el-input v-model="feiUserForm.fullVolume" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="残余变形值(ml)" label-width="150px" prop="cyVolume">
                <el-input v-model="feiUserForm.cyVolume" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="残余变形率(%)" label-width="150px" prop="cyRate">
                <el-input v-model="feiUserForm.cyRate" autocomplete="off"></el-input>
                <!-- <el-input v-model="editUserForm.makeInfo" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="是否合格" label-width="150px" prop="ifNormal">
                <el-select v-model="feiUserForm.ifNormal" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="试验日期" label-width="150px" prop="testDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="feiUserForm.testDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="实际容积(L)" label-width="150px" prop="realVolume">
                <el-input v-model="feiUserForm.realVolume" autocomplete="off"></el-input>
              </el-form-item>
              <!-- <el-form-item label="备注" label-width="150px" prop="initData">
                <el-input v-model="feiUserForm.inspectionUnit" autocomplete="off"></el-input>
              </el-form-item>-->
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="检验单位" label-width="150px" prop="inspectorName">
                <el-input v-model="feiUserForm.inspectorName" autocomplete="off"></el-input>
                <!-- <el-input v-model="editUserForm.makeInfo" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="检验员" label-width="150px" prop="inspector">
                <el-input v-model="feiUserForm.inspector" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="检验日期" label-width="150px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="feiUserForm.inspectorDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="审核人" label-width="150px" prop="verifier">
                <el-input v-model="feiUserForm.verifier" autocomplete="off"></el-input>
                <!-- <el-input v-model="editUserForm.makeInfo" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="审核日期" label-width="150px" prop="verifierDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="feiUserForm.verifierDate"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
          </el-col>
        </el-form>
        <p style=" text-align: center;" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="SaveUserrshui()">保存到数据库</el-button>
          <el-button type="primary" :loading="loadingbut" @click="EditUsershui()">{{loadingbuttext}}</el-button>
          <el-button type="primary" @click="SaveUsershui()">下载保存文件</el-button>
          <el-button @click="shuidialogFormVisibl = false">取 消</el-button>
        </p>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import $ from "jquery";
import {getCarReport} from "../../utils/api"
export default {
  name: "report",
  data() {
    return {
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.reportUserForm.nextCheckData != "") {
            return (
              time.getTime() >
              new Date(this.reportUserForm.nextCheckData).getTime()
            );
          }
        },
      }, //this.reportUserForm.nextCheckData    this.reportUserForm.checkData
      pickerOptions1: {
        disabledDate: (time) => {
          return (
            time.getTime() <
            new Date(this.reportUserForm.checkData).getTime() +
              1 * 24 * 60 * 60 * 1000
          ); //减去一天的时间代表可以选择同一天;
        },
      },
      gasdd: "",
      division: "",
      gasId: "",
      appId: "", //气瓶标签号
      buildingUser: "", //使用单位
      query: "",
      regId: "",
      select: "",
      carNum: "",
      orderanswer: "",
      baostaus: "",
      carReportList: [],
      value: "",
      value1: "",
      value2: "",
      //分页相关数据
      total: -1,
      currPage: 1,
      pageSize: 10,
      page: 1,
      reportStatus: "",
      options: [
        {
          value: 1,
          label: "合格",
        },
        {
          value: 2,
          label: "不合格",
        },
      ],
      reportNumber: -1,
      // 添加对话框的属性
      // dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      btnChangeEnable: true,
      loadingbut: false, //审核提交加载中
      dialogFormVisiblreport: false,
      dialogFormVisiblfei: false,
      shuidialogFormVisibl: false,
      loadingbuttext: "保存文件",
      // 编辑
      rules: {
        vehicleOwner: [
          { required: true, message: "产权单位不能为空", trigger: "blur" },
        ],
        gasId: [
          { required: true, message: "气瓶编号不能为空", trigger: "blur" },
        ],
        makeData: [
          {
            required: true,
            message: "制造日期不能为空",
            trigger: "blur",
          },
        ],
        carNature: [
          { required: true, message: "车辆使用性质不能为空", trigger: "blur" },
        ],
        manufacturingCountry: [
          { required: true, message: "制造国别不能为空", trigger: "blur" },
        ],
        buildingUser: [
          { required: true, message: "使用单位不能为空", trigger: "blur" },
        ],
        carNum: [
          { required: true, message: "车牌号不能为空", trigger: "blur" },
        ],
        recordNumber: [
          { required: true, message: "记录编号不能为空", trigger: "blur" },
        ],
        manufacturingUnit: [
          { required: true, message: "制造单位不能为空", trigger: "blur" },
        ],
        makeInfo: [
          { required: true, message: "制造单位不能为空", trigger: "blur" },
        ],
        reportId: [
          { required: true, message: "报告编号不能为空", trigger: "blur" },
        ],
        realWeight: [
          { required: true, message: "实际重量不能为空", trigger: "blur" },
        ],
        tremperature: [
          { required: true, message: "试验温度不能为空", trigger: "blur" },
        ],
        testPressure: [
          { required: true, message: "试验压力不能为空", trigger: "blur" },
        ],
        holdTime: [
          {
            required: true,
            message: "保压时间不能为空",
            trigger: "blur",
          },
        ],
        fullVolume: [
          {
            required: true,
            message: "全变形值不能为空",
            trigger: "blur",
          },
        ],
        cyVolume: [
          {
            required: true,
            message: "残余变形值不能为空",
            trigger: "blur",
          },
        ],
        cyRate: [
          {
            required: true,
            message: "残余变形率不能为空",
            trigger: "blur",
          },
        ],
        ifNormal: [
          {
            required: true,
            message: "请选择是否合格",
            trigger: "blur",
          },
        ],
        testDate: [
          {
            required: true,
            message: "试验日期不能为空",
            trigger: "blur",
          },
        ],
        realVolume: [
          {
            required: true,
            message: "实际容积不能为空",
            trigger: "blur",
          },
        ],
        inspectorName: [
          {
            required: true,
            message: "检验单位不能为空",
            trigger: "blur",
          },
        ],
        inspector: [
          {
            required: true,
            message: "检验员不能为空",
            trigger: "blur",
          },
        ],

        gasCounty: [
          { required: true, message: "气瓶所属地不能为空", trigger: "blur" },
        ],
        gasCounty: [
          {
            required: true,
            message: "气瓶登记证编号不能为空",
            trigger: "blur",
          },
        ],
        nominalPressure: [
          { required: true, message: "公称工作压力不能为空", trigger: "blur" },
        ],
        waterPressure: [
          { required: true, message: "水压试验压力不能为空", trigger: "blur" },
        ],
        cylinderPressure: [
          { required: true, message: "气瓶公称容积不能为空", trigger: "blur" },
        ],
        publicVolume: [
          { required: true, message: "气瓶公称容积不能为空", trigger: "blur" },
        ],
        publicPressure: [
          { required: true, message: "气瓶公称压力不能为空", trigger: "blur" },
        ],

        designWallThickness: [
          { required: true, message: "设计壁厚不能为空", trigger: "blur" },
        ],
        makeMonthly: [
          {
            required: true,
            message: "制造日期不能为空",
            trigger: "blur",
          },
        ],
        installationTime: [
          {
            required: true,
            message: "安装日期不能为空",
            trigger: "blur",
          },
        ],
        lastSurveyDate: [
          {
            required: true,
            message: "上次检验日期不能为空",
            trigger: "blur",
          },
        ],
        cylinderMedium: [
          { required: true, message: "瓶内介质处理不能为空", trigger: "blur" },
        ],
        jiancea: [
          { required: true, message: "检测员不能为空", trigger: "blur" },
        ],

        //外观检验
        instrument: [
          {
            required: true,
            message: "仪器名称/编号/有效期不能为空",
            trigger: "blur",
          },
        ],
        result1: [
          {
            required: true,
            message: "金属机械性损伤检验不能为空",
            trigger: "blur",
          },
        ],
        result2: [
          { required: true, message: "瓶体凹陷检验不能为空", trigger: "blur" },
        ],
        result3: [
          {
            required: true,
            message: "凹陷中带有划伤或磕伤不能为空",
            trigger: "blur",
          },
        ],
        result4: [
          { required: true, message: "热损伤检验不能为空", trigger: "blur" },
        ],
        result5: [
          { required: true, message: "腐蚀情况检验不能为空", trigger: "blur" },
        ],
        result6: [
          { required: true, message: "筒体圆度检验不能为空", trigger: "blur" },
        ],
        result7: [
          {
            required: true,
            message: "筒体直线度检验不能为空",
            trigger: "blur",
          },
        ],
        result8: [
          { required: true, message: "音响检验不能为空", trigger: "blur" },
        ],
        result9: [
          { required: true, message: "瓶口螺纹检验不能为空", trigger: "blur" },
        ],
        result10: [
          { required: true, message: "内部检验不能为空", trigger: "blur" },
        ],
        result11: [
          { required: true, message: "磁粉探伤不能为空", trigger: "blur" },
        ],
        result12: [
          { required: true, message: "超声波探伤不能为空", trigger: "blur" },
        ],
        jianceb: [
          { required: true, message: "检测员不能为空", trigger: "blur" },
        ],
        //重量与容积测定

        instrumentName: [
          {
            required: true,
            message: "仪器名称/编号/有效期不能为空",
            trigger: "blur",
          },
        ],
        markWeight: [
          { required: true, message: "标记重量不能为空", trigger: "blur" },
        ],
        measuredWeight: [
          { required: true, message: "实测重量不能为空", trigger: "blur" },
        ],
        weightLoss: [
          { required: true, message: "重量损失率不能为空", trigger: "blur" },
        ],
        makeVolume: [
          { required: true, message: "标记容积不能为空", trigger: "blur" },
        ],
        measurementVolume: [
          { required: true, message: "实测容积不能为空", trigger: "blur" },
        ],
        volumeBig: [
          { required: true, message: "容积增大率不能为空", trigger: "blur" },
        ],
        jiancec: [
          { required: true, message: "检验员不能为空", trigger: "blur" },
        ],

        //水压试验及干燥检验
        testPressure: [
          { required: true, message: "试验压力不能为空", trigger: "blur" },
        ],
        testTemperature: [
          { required: true, message: "试验温度不能为空", trigger: "blur" },
        ],
        dwellTime: [
          { required: true, message: "保压时间不能为空", trigger: "blur" },
        ],

        volumetricTotalDeformation: [
          { required: true, message: "容积全变形不能为空", trigger: "blur" },
        ],
        volumetricremnant: [
          { required: true, message: "容积残余变形不能为空", trigger: "blur" },
        ],
        volumetri: [
          {
            required: true,
            message: "容积残余变形率不能为空",
            trigger: "blur",
          },
        ],
        waterTestResult: [
          { required: true, message: "水压试验结论不能为空", trigger: "blur" },
        ],
        drying: [
          { required: true, message: "干燥检验不能为空", trigger: "blur" },
        ],

        jianced: [
          { required: true, message: "检验员不能为空", trigger: "blur" },
        ],

        //瓶阀检验与装配
        valveManufacturing: [
          { required: true, message: "瓶阀制造厂不能为空", trigger: "blur" },
        ],

        valveNum: [
          { required: true, message: "瓶阀编号不能为空", trigger: "blur" },
        ],
        experimentalPressure: [
          { required: true, message: "试验压力不能为空", trigger: "blur" },
        ],
        testMedium: [
          { required: true, message: "试验介质不能为空", trigger: "blur" },
        ],
        cylinderValveInspection: [
          { required: true, message: "瓶阀检验不能为空", trigger: "blur" },
        ],
        cylinderValveAssembly: [
          { required: true, message: "瓶阀装配不能为空", trigger: "blur" },
        ],
        jiancee: [
          { required: true, message: "检验员不能为空", trigger: "blur" },
        ],

        //气密试验
        testMethod: [
          { required: true, message: "试验方法不能为空", trigger: "blur" },
        ],
        medium: [
          { required: true, message: "试验介质不能为空", trigger: "blur" },
        ],
        temperature: [
          { required: true, message: "试验介质温度不能为空", trigger: "blur" },
        ],
        pressure: [
          { required: true, message: "试验压力不能为空", trigger: "blur" },
        ],
        pressureTime: [
          { required: true, message: "保压时间不能为空", trigger: "blur" },
        ],
        result: [{ required: true, message: "结论不能为空", trigger: "blur" }],
        vacuo: [
          {
            required: true,
            message: "抽真空或充氮气不能为空",
            trigger: "blur",
          },
        ],
        inspectionTag: [
          { required: true, message: "检验标记不能为空", trigger: "blur" },
        ],
        jiancef: [
          { required: true, message: "检测员不能为空", trigger: "blur" },
        ],

        //审核
        describe1: [
          {
            required: true,
            message: "缺陷性质位置及描述不能为空",
            trigger: "blur",
          },
        ],
        describe2: [
          {
            required: true,
            message: "缺陷性质位置及描述不能为空",
            trigger: "blur",
          },
        ],
        finalResult: [
          { required: true, message: "最终结论不能为空", trigger: "blur" },
        ],
        nextInspectionDate: [
          {
            required: true,
            message: "下次检验日期不能为空",
            trigger: "blur",
          },
        ],
        inspector1: [
          { required: true, message: "检验人不能为空", trigger: "blur" },
        ],
        inspectorDate: [
          {
            required: true,
            message: "检验日期不能为空",
            trigger: "blur",
          },
        ],
        verifier: [
          { required: true, message: "审核人不能为空", trigger: "blur" },
        ],
        verifierDate: [
          {
            required: true,
            message: "审核时间不能为空",
            trigger: "blur",
          },
        ],
      },
      optionsuse: [
        { id: 0, name: "导入" },
        { id: 1, name: "在检" },
        { id: 2, name: "检测完成" },
      ],
      //检验报告
      editUserForm: {
        //原始标记
        buildingUser: "", //使用单位
        carNum: "", //车牌号
        recordNumber: "", //记录编号
        gasId: "", //气瓶编号
        carNature: "", //车辆使用性质
        manufacturingCountry: "", //制造国别
        manufacturingUnit: "", //制 造 单位
        gasCounty: "", //气瓶所属地(区县)
        carRegId: "", //气瓶登记证编号
        nominalPressure: "", //公称工作压力
        waterPressure: "", //水压试验压力
        cylinderPressure: "", //气瓶公称容积
        designWallThickness: "", //设计壁厚
        makeMonthly: "", //制造年月
        installationTime: "", //安装日期
        lastSurveyDate: "", //上次检验日期
        cylinderMedium: "", //瓶内介质处理
        jiancea: "", //检验员

        //外观检验
        instrument: "", //仪器名称/编号/有效期
        result1: "合格", //金属机械性损伤检验
        result2: "合格", //瓶体凹陷检验
        result3: "合格", //凹陷中带有划伤或磕伤
        result4: "合格", //热损伤检验
        result5: "合格", //腐蚀情况检验
        result6: "合格", //筒体圆度检验
        result7: "合格", //筒体直线度检验
        result8: "合格", //音响检验
        result9: "合格", //瓶口螺纹检验
        result10: "合格", //内部检验
        result11: "合格", //磁粉探伤
        result12: "合格", //超声波探伤
        jianceb: "", //检测员

        //重量与容积测定
        instrumentName: "", //仪器名称/编号/有效期
        markWeight: "", //标记重量
        measuredWeight: "", //实测重量
        weightLoss: "合格", //重量损失率
        makeVolume: "合格", //标记容积
        measurementVolume: "", //实测容积
        volumeBig: "合格", //容积增大率
        jiancec: "", //检测员

        //水压试验及干燥检验
        testPressure: "", //试验压力
        testTemperature: "", //试验温度
        dwellTime: "", //保压时间
        volumetricTotalDeformation: "", //容积全变形
        volumetricremnant: "", //容积残余变形
        volumetri: "", //容积残余变形率
        waterTestResult: "", //水压试验结论
        drying: "", //干燥检验
        jianced: "", //检测员

        //瓶阀检验与装配
        valveManufacturing: "", //瓶阀制造厂
        valveNum: "", //瓶阀编号
        experimentalPressure: "", //试验压力
        testMedium: "", //瓶阀检验与装配试验介质
        cylinderValveInspection: "", //瓶阀检验
        cylinderValveAssembly: "", //瓶阀装配
        jiancee: "", //检测员

        //气密试验
        testMethod: "", //实验方法
        medium: "", //气密试验介质
        temperature: "", //试验介质温度
        pressure: "", //试验压力
        pressureTime: "", //试验时间
        result: "", //结论
        vacuo: "", //抽真空或充氮气
        inspectionTag: "", //检验标记
        jiancef: "", //检测员

        //审核
        describe1: "", //缺陷性质位置及描述
        describe2: "", //缺陷性质位置及描述
        finalResult: "合格", //最终结论
        nextInspectionDate: "", //下次检验日期
        inspector1: "", //检验人
        inspectorDate: "", //检验时间
        verifier: "", //审核人
        verifierDate: "", //审核时间
      },
      //  定检报告
      reportUserForm: {
        reportNumber: "",
        propertyOwner: "",
        regId: "",
        gasId: "",
        medium: "",
        inspectionUnit: "",
        num: "",
        manufacturingUnit: "",
        checkData: "",
        nextCheckData: "",
      },
      //报废报告
      scrapped: {
        gasId: "", //气瓶号
        inspectionUnit: "", //检测单位
        manufacturingUnit: "", //制造单位
        medium: "", //介质
        propertyOwner: "", //产权所有者
        regId: "", //登记证号
        reportNumber: "", //报告编号
        result: "", //处理结果
        scrap: "", //报废原因
        checkData: "",
      },
      // 水压试压
      feiUserForm: {
        gasId: "", //气瓶编号
        publicVolume: "", //公称容积
        publicPressure: "", //公称压力
        testDate: "", //试验日期
        realVolume: "", //实际容积
        realWeight: "", //实际重量
        tremperature: "", //实验温度
        testPressure: "", //试验压力
        holdTime: "", //保压时间
        fullVolume: "", //全变形
        cyVolume: "", //残余变形值
        cyRate: "", //残余变形率
        ifNormal: "", //是否合格
        makeInfo: "", //制造单位
        makeData: "", //制造日期
        vehicleOwner: "", //气瓶产权单位
        reportId: "", //报告编号
        inspector: "", //检验人
        inspectorDate: "", //检验时间
        verifier: "", //审核人
        verifierDate: "", //审核时间
        inspectorName: "", //检验单位
      },
    };
  },
  watch: {
    dialogFormVisibleEdit: function (val, oldVla) {
      this.$refs["editUserForm"].resetFields();
    },
  },
  methods: {
    async administrative() {
      const res = await this.$http.get(`/drop/liquefied`);
      console.log(res);
      this.division = res.data.data;
    },
    //生成报告编号
    async Registration() {
      const res = await this.$http.post(`IDGenerate/reportId`);
      console.log(res);
      this.editUserForm.ReportNumber = res.data;
    },
    // 水压试压报告
    async shuiEdituser(userss) {
      console.log(userss);
      var gads = userss.gasId;
      const res = await this.$http.get(`Inspector/show?gasId=${gads}`);
      console.log(res);
      this.feiUserForm = res.data.data;
      this.shuidialogFormVisibl = true;
    },

    // 水压试压保存到数据库
    async SaveUserrshui() {
      const res = await this.$http.post(`/Inspector/insert`, this.feiUserForm);
      console.log(res);
      if (res.data.code == 200) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });
      } else if (res.data.code == 201) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });
      }
    },
    // 水压试压保存文件
    async EditUsershui() {
      this.loadingbut = true;
      this.loadingbuttext = "加载中...";
      const res = await this.$http.get(`/Inspector/createReport`);
      console.log(res);
      if (res.data.code == 200) {
        // 访问接口获取成功以后再改变状态
        this.loadingbut = false;
        this.loadingbuttext = "保存文件";
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        // this.btnChangeEnable = false;
      } else if (res.data.code == 201) {
        // 访问接口获取成功以后再改变状态
        this.loadingbut = false;
        this.loadingbuttext = "保存文件";
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },
    // 水压试压下载文件
    async SaveUsershui() {
      const response = await this.$http.get(`CarInspector/water`, {
        responseType: "blob",
      });

      console.log(response);

      const blob = new Blob([response.data], {
        type: "application/vnd.ms-excel",
      });
      const fileName = "车用气瓶水压试压报告.xlsx";

      const elink = document.createElement("a");

      elink.download = fileName;

      elink.style.display = "none";

      elink.href = URL.createObjectURL(blob);

      document.body.appendChild(elink);

      elink.click();

      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    },

    // 判废报告弹框
    async baoEdituser(userss) {
      console.log(userss);

      console.log(userss.gasId);
      const res = await this.$http.post(
        `/carInspection/reminder/no/${userss.gasId}`
      );
      console.log(res);
      if (res.data.code == 200) {
        this.dialogFormVisiblfei = true;
        this.scrapped = res.data.data;
      } else if (res.data.code == 201) {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      }
      // debugger;
      // if (res.data.code === 201) {
      //   this.$message({
      //     type: "warning",
      //     message: "请先填写检验报告"
      //   });
      //   $(".baofei").hide();
      // } else if (res.data.code === 200) {
      //   $(".baofei").show();
      //   this.feiUserForm = res.data.data;
      //   this.reportNumber = res.data.data.regId;
      //   this.$message({
      //     type: "success",
      //     message: res.data.msg
      //   });
      // } else if (res.data.code === 1) {
      //   this.$message({
      //     type: "warning",
      //     message: res.data.msg
      //   });
      //   $(".baofei").hide();
      // }
    },

    // 判废报告保存到数据库
    async SaveUserrfei() {
      console.log(this.scrapped);
      const res = await this.$http.post(
        `/carInspection/insertNo`,
        this.scrapped
      );
      console.log(res);
      if (res.data.code == 200) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });
      } else if (res.data.code == 201) {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      }
    },
    // 判废报告保存文件
    async EditUserfei() {
      console.log(this.scrapped);

      const res = await this.$http.get(
        `/carInspection/NoOut?regId=${this.scrapped.regId}`
      );
      console.log(res);
      if (res.data.code == 200) {
        // 访问接口获取成功以后再改变状态
        // this.loadingbut = false;
        // this.loadingbuttext = "保存文件";
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        // this.btnChangeEnable = false;
      } else if (res.data.code == 201) {
        // 访问接口获取成功以后再改变状态
        // this.loadingbut = false;
        // this.loadingbuttext = "保存文件";
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },
    // 判废报告下载文件
    async SaveUserfei() {
      const response = await this.$http.get(
        `/CarInspector/excel/no?regId=${this.scrapped.regId}`,
        {
          responseType: "blob",
        }
      );

      console.log(response);

      const blob = new Blob([response.data], {
        type: "application/vnd.ms-excel",
      });
      const fileName = "报废报告打印.xlsx";

      const elink = document.createElement("a");

      elink.download = fileName;

      elink.style.display = "none";

      elink.href = URL.createObjectURL(blob);

      document.body.appendChild(elink);

      elink.click();

      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    },

    Visiblreport() {
      this.dialogFormVisiblreport = false;
      // this.reportUserForm = {};
    },

    // 定检报告弹框
    async dingEdituser(users) {
      console.log(users);
      // excel/detection/insert/yes
      const res = await this.$http.post(
        `/carInspection/reminder/yes/${users.gasId}`
      );
      console.log(res);
      if (res.data.code == 200) {
        this.dialogFormVisiblreport = true;
        this.reportUserForm = res.data.data;
        this.regId = res.data.data.regId;
        console.log(this.regId);

        // this.reportUserForm.reportNumber="";
        // this.reportUserForm.regId="";
        // this.reportUserForm.gasId="";
        // this.reportUserForm.medium="";
      } else if (res.data.code == 201) {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      }
      // // // debugger;
      // if (res.data.code === 201) {
      //   this.dialogFormVisiblreport = false;
      //   $(".dingreport").hide();
      //   this.$message({
      //     type: "warning",
      //     message: res.data.msg
      //   });
      // } else if (res.data.code === 200) {
      //
      //   $(".dingreport").show();
      //   this.reportUserForm = res.data.data;
      //   this.reportNumber = res.data.data.regId;
      //   this.$message({
      //     type: "success",
      //     message: res.data.msg
      //   });
      // } else if (res.data.code === 201) {
      //   this.$message({
      //     type: "success",
      //     message: res.data.msg
      //   });
      //   $(".dingreport").hide();
      // }
    },

    // 定检报告保存到数据库
    async rePort() {
      // console.log(1);

      const res = await this.$http.post(
        `/carInspection/insertYes`,
        this.reportUserForm
      );
      console.log(res);
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });
      } else if (res.data.code == 201) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });
      }
    },
    // 定检报告保存文件
    async EditUserreport() {
      const res = await this.$http.get(
        `/carInspection/YesOut?regId=${this.regId}`
      );
      console.log(res);
      if (res.data.code == 200) {
        // 访问接口获取成功以后再改变状态
        // this.loadingbut = false;
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        // this.btnChangeEnable = false;
      } else if (res.data.code == 201) {
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },

    // 定检报告下载文件
    async SaveUserreport() {
      console.log(this.regId);
      const response = await this.$http.get(
        `/CarInspector/excel/yes?regId=${this.regId}`,
        {
          responseType: "blob",
        }
      );

      console.log(response);

      const blob = new Blob([response.data], {
        type: "application/vnd.ms-excel",
      });
      const fileName = "定检报告打印.xlsx";

      const elink = document.createElement("a");

      elink.download = fileName;

      elink.style.display = "none";

      elink.href = URL.createObjectURL(blob);

      document.body.appendChild(elink);

      elink.click();

      URL.revokeObjectURL(elink.href); // 释放URL 对象
      document.body.removeChild(elink);
    },

    // 检测报告下载
    async SaveUser() {
      // console.log(1);

      const response = await this.$http.get(
        `CarInspector/excel/gpjc?gasId=${this.gasdd}`,
        { responseType: "blob" }
      );

      console.log(response);

      const blob = new Blob([response.data], {
        type: "application/vnd.ms-excel",
      });
      const fileName = "检验报告打印.xlsx";

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
    },
    // 检测报告保存到数据库
    async SaveUserku() {
      this.$refs.editUserForm.validate(async (valid) => {
        if (valid) {
          console.log(this.editUserForm);
          const res = await this.$http.post(
            `/CarInspector/insert`,
            this.editUserForm
          );
          console.log(res);
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          } else {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写所有内容再试",
          });
          this.dialogFormVisibleEdit = true;
        }
      });
    },
    //  检测报告保存文件
    async EditUser() {
      // this.gasId=user.gasId

      this.loadingbut = true;
      this.loadingbuttext = "加载中...";
      const res = await this.$http.get(
        `/CarInspector/file?gasId=${this.gasdd}`
      );
      console.log(res);
      if (res.data.code == 200) {
        // 访问接口获取成功以后再改变状态
        this.loadingbut = false;
        this.loadingbuttext = "保存文件";
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.btnChangeEnable = false;
      } else if (res.data.code == 201) {
        // 访问接口获取成功以后再改变状态
        this.loadingbut = false;
        this.loadingbuttext = "保存文件";
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },

    ifendcase(val) {
      if (val.reportStatus == "0") {
        return "导入";
      } else if (val.reportStatus == "1") {
        return "填写检验报告";
      }
    },
    ifendcases(val) {
      if (val.status == "0") {
        return "不合格";
      } else if (val.status == "1") {
        return "合格";
      } else if (val.status == "2") {
        return "即将超期";
      } else if (val.status == "3") {
        return "即将超期";
      }
    },
    ifendcol(val) {
      console.log(val);

      if (val.reportStatus == "0") {
        return "导入";
      } else if (val.reportStatus == "1") {
        return "在检";
      } else if (val.reportStatus == "2") {
        return "检测完成";
      }
    },
    // 编辑对话框打开
    async showEdituser(user) {
      console.log(user);
      this.gasdd = user.gasId;
      // console.log(this.gasId);
      // console.log(this.gasdd);
      this.dialogFormVisibleEdit = true;
      const res = await this.$http.get(
        `/carCylinder/Cylinder/two?id=${this.gasdd}`
      );
      console.log(res);
      if (res.data.code == 200) {
        this.editUserForm = res.data.data;
      } else if (res.data.code == 201) {
        this.editUserForm.buildingUser = res.data.data.buildingUser;
        console.log(this.editUserForm.buildingUser);
        this.editUserForm.carNum = res.data.data.carNum;
        this.editUserForm.carRegId = res.data.data.carRegId;
        this.editUserForm.cylinderMedium = res.data.data.cylinderMedium;
        this.editUserForm.cylinderPressure = res.data.data.cylinderPressure;
        this.editUserForm.gasId = res.data.data.gasId;
        this.editUserForm.nominalPressure = res.data.data.nominalPressure;
        this.editUserForm.manufacturingCountry =
          res.data.data.manufacturingCountry;
        this.editUserForm.gasCounty = res.data.data.gasCounty;
        this.editUserForm.makeMonthly = res.data.data.makeMonthly;
        this.editUserForm.lastSurveyDate = res.data.data.lastSurveyDate;
        this.editUserForm.manufacturingUnit = res.data.data.manufacturingUnit;
      }
    },

    //删除用户 打开消息盒子
    // showDeleUserMsgBox(userId) {
    //   // 提示框 点击确定走.then
    //   // 点取消 走.catch
    //   this.$confirm("删除用户, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       // 注意async的位置，最近的位置
    //       // 发送删除请求:id:用户id
    //       // 1.data中找userId
    //       // 2.把userID以showDeleUserMsgBox参数形式传进来
    //       const res = await this.$http.delete(`users/${userId}`);
    //       if (res.data.meta.status === 200) {
    //         // 回到第一页展示
    //         //this.pagenum = 1;
    //         // 重新请求数据
    //         this.getUserlist();
    //         // 提示
    //         this.$message({
    //           type: "success",
    //           message: res.data.meta.msg
    //         });
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // },

    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getCarReportList();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async search() {
      const res = await this.$http.get(
        `/carCylinder/selectAll?pageSize=${this.pageSize}&currPage=${this.page}&gasId=${this.gasId}&carNum=${this.carNum}&reportStatus=${this.reportStatus}&appId=${this.appId}&makeInfo=${this.buildingUser}`
      );
      console.log(res);
      this.carReportList = res.data.data.list;
      this.total = res.data.data.totalCount;
    },

    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      this.currPage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getCarReportList();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currPage = val;
      this.getCarReportList();
    },
    async getCarReportList() {
      getCarReport().then(res=>{

      })
      // const res = await this.$http.get(
      //   `/carCylinder/selectAll?pageSize=${this.pageSize}&currPage=${this.currPage}&gasId=${this.query}`
      // );
      console.log(res);
      this.carReportList = res.data.data.list;
      this.total = res.data.data.totalCount;
    },
  },
  created() {
    this.getCarReportList();
    this.administrative();
    // this.dialogFormVisiblreport()
  },
};
</script>
<style scoped>
.el-tooltip__popper {
  max-width: 0%;
}
body,
html,
h2,
h1 {
  margin: 0;
  padding: 0;
}
.el-dialog {
  width: 80% !important;
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
.el_button {
  background-color: #66b1ff !important;
  border-color: #66b1ff !important;
  color: #fff !important;
}
>>> .el-input--suffix .el-input__inner {
  height: 32px;
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
</style>