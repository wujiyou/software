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
                placeholder="请输入气瓶编号"
                v-model="uegId"
              ></el-input>
            </el-col>
            <el-col style="padding-left:15px" :span="4">
              <el-input
                size="small"
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
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入使用单位"
                v-model="buildingUser"
              ></el-input>
            </el-col>
            <el-col style="padding-left:15px" :span="4">
              <el-select
                size="small"
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
            <el-col style="margin-left:30px" :span="4">
              <el-button
                size="small"
                style=" width: 100%;"
                @click="search()"
                class="el_button"
                icon="el-icon-search"
              >搜索</el-button>
            </el-col>
          </el-col>
        </el-col>
      </el-row>

      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 20px 0px;z-index:999"
        ></p>
      </el-col>
      <!-- 表格 -->
      <el-table
        :row-style="{height:'40px'}"
        :cell-style="{padding:'0px'}"
        border
        :data="liqReportList"
        style="width: 100%;margin:20px 0px;padding-bottom:40px;"
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="regId" label="登记证编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="gasId" label="气瓶编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="appid" label="标签号" show-overflow-tooltip></el-table-column>

        <el-table-column prop label="检验时间" show-overflow-tooltip>
          <template slot-scope="socpe">{{socpe.row.checkData | fmtdate}}</template>
        </el-table-column>
        <el-table-column prop label="下次检验时间" show-overflow-tooltip width="150">
          <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
        </el-table-column>

        <el-table-column prop="buildingUser" label="使用单位" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="reportStatus"
          label="报告状态"
          show-overflow-tooltip
          :formatter="ifendcase"
        ></el-table-column>
        <el-table-column prop="status" label="检测结果" show-overflow-tooltip :formatter="ifendcases"></el-table-column>

        <el-table-column prop="address" width="320" label="操 作">
          <template slot-scope="scope">
            <!-- size 调整按钮大小 -->
            <!-- 编辑 -->

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
                plainsss
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
              content="报废报告"
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
        :current-page="currpage"
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
        title="液化石油气瓶检验报告"
        :visible.sync="dialogFormVisibleEdit"
      >
        <el-form :model="editUserForm" :rules="rules" ref="editUserForm">
          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">原始标记</h3>
          </el-col>
          <el-col style="margin-top:10px" :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="使用单位" label-width="140px" prop="buildingUser">
                <el-input v-model="editUserForm.buildingUser" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="red_s" label="报告编号" label-width="150px" prop="ReportNumber">
                <el-input v-model="editUserForm.ReportNumber" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button
                style="margin-left:5px;margin-right:5px"
                @click="Registration()"
                type="primary"
              >生成推荐编号</el-button>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="气瓶编号" label-width="140px" prop="gasId">
                <el-input disabled v-model="editUserForm.gasId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="制造单位" label-width="140px" prop="makeInfo">
                <el-input v-model="editUserForm.makeInfo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="水压试验压力(MPa)" label-width="150px" prop="Hydraulic">
                <el-input v-model="editUserForm.Hydraulic" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="登记证号" label-width="140px" prop="regId">
                <el-input disabled v-model="editUserForm.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="原始容积(L)" label-width="140px" prop="volume">
                <el-input v-model="editUserForm.volume" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="制造日期" label-width="150px" prop="makeData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.makeData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="下次检验日期" label-width="140px" prop="nextCheckData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.nextCheckData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="上次检验日期" label-width="140px" prop="checkData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.checkData"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">&nbsp;</el-col>
            <el-col :span="8">&nbsp;</el-col>
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">外观初查</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="钢瓶制造标志完好:" label-width="200px" prop="Result1">
                <el-select v-model="editUserForm.Result1" placeholder="请选择">
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
              <el-form-item class="red_s" label="无纵向焊接:" label-width="200px" prop="Result2">
                <el-select v-model="editUserForm.Result2" placeholder="请选择">
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
              <el-form-item class="red_s" label="耳片护罩与钢瓶连接完好:" label-width="200px" prop="Result3">
                <el-select v-model="editUserForm.Result3" placeholder="请选择">
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
              <el-form-item class="red_s" label="底座支撑面与瓶底间距:" label-width="200px" prop="Result5">
                <el-select v-model="editUserForm.Result5" placeholder="请选择">
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
              <el-form-item class="red_s" label="底座无破裂磨损等影响钢瓶直立缺陷:" label-width="200px" prop="Result4">
                <el-select v-model="editUserForm.Result4" placeholder="请选择">
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
              <el-form-item class="red_s" label="无火焰过热过电弧烧伤现象:" label-width="200px" prop="Result6">
                <el-select v-model="editUserForm.Result6" placeholder="请选择">
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
              <el-form-item class="red_s" label="无瓶体倾斜变形或肉眼可见的容积变形:" label-width="200px" prop="Result7">
                <el-select v-model="editUserForm.Result7" placeholder="请选择">
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
              <el-form-item class="red_s" label="封头直边褶皱深小于钢瓶外径的0.25%:" label-width="200px" prop="Result8">
                <el-select v-model="editUserForm.Result8" placeholder="请选择">
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
              <el-form-item class="red_s" label="检验人员:" label-width="200px" prop="Inspector">
                <el-input v-model="editUserForm.Inspector" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="检验日期:" label-width="200px" prop="DateOfSurvey">
                <el-date-picker
                  v-model="editUserForm.DateOfSurvey"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">外观复查</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="剩余壁厚>设计壁厚的90%:" label-width="200px" prop="Result10">
                <el-select v-model="editUserForm.Result10" placeholder="请选择">
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
              <el-form-item class="red_s" label="不得有裂纹、气孔、孤坑、夹渣等缺陷:" label-width="200px" prop="Result11">
                <el-select v-model="editUserForm.Result11" placeholder="请选择">
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
              <el-form-item class="red_s" label="屏体一侧的焊缝不得有咬边缺陷:" label-width="200px" prop="Result12">
                <el-select v-model="editUserForm.Result12" placeholder="请选择">
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
              <el-form-item class="red_s" label="焊接不得低于母材不得有不规则的突变:" label-width="200px" prop="Result13">
                <el-select v-model="editUserForm.Result13" placeholder="请选择">
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
              <el-form-item class="red_s" label="主焊缝及两侧范围凹陷深<6mm:" label-width="200px" prop="Result14">
                <el-select v-model="editUserForm.Result14" placeholder="请选择">
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
              <el-form-item class="red_s" label="主焊缝及两侧范围凹陷内划伤深<0.5mm:" label-width="200px" prop="Result15">
                <el-select v-model="editUserForm.Result15" placeholder="请选择">
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
              <el-form-item class="red_s" label="阀座无裂痕，不允许陷入瓶底:" label-width="200px" prop="Result16">
                <el-select v-model="editUserForm.Result16" placeholder="请选择">
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
              <el-form-item class="red_s" label="阀座螺纹不得有裂痕，不得有超标缺陷:" label-width="200px" prop="Result17">
                <el-select v-model="editUserForm.Result17" placeholder="请选择">
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
              <el-form-item class="red_s" label="阀座内螺纹修复后经量规检验合格:" label-width="200px" prop="Result18">
                <el-select v-model="editUserForm.Result18" placeholder="请选择">
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
              <el-form-item class="red_s" label="瓶底无裂纹:" label-width="200px" prop="Result19">
                <el-select v-model="editUserForm.Result19" placeholder="请选择">
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
              <el-form-item class="red_s" label="同一截最大最小直径差小于钢瓶内径的1%:" label-width="200px" prop="Result20">
                <el-select v-model="editUserForm.Result20" placeholder="请选择">
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
              <el-form-item class="red_s" label="损伤部位剩余壁厚>设计壁厚的90%:" label-width="200px" prop="Result21">
                <el-select v-model="editUserForm.Result21" placeholder="请选择">
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
              <el-form-item class="red_s" label="凹陷深度<10mm:" label-width="200px" prop="Result22">
                <el-select v-model="editUserForm.Result22" placeholder="请选择">
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
              <el-form-item class="red_s" label="凹陷<6mm时，损伤深<0.4mm:" label-width="200px" prop="Result23">
                <el-select v-model="editUserForm.Result23" placeholder="请选择">
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
              <el-form-item class="red_s" label="孤立点腐蚀：剩余壁厚>设计壁厚的2/3:" label-width="200px" prop="Result24">
                <el-select v-model="editUserForm.Result24" placeholder="请选择">
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
              <el-form-item class="red_s" label="线腐蚀：剩余壁厚>设计壁厚的90%:" label-width="200px" prop="Result25">
                <el-select v-model="editUserForm.Result25" placeholder="请选择">
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
              <el-form-item class="red_s" label="检验人员:" label-width="200px" prop="Inspector1">
                <el-input autocomplete="off" v-model="editUserForm.Inspector1"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="检验日期:" label-width="200px" prop="DateOfSurvey1">
                <el-date-picker
                  type="date"
                  v-model="editUserForm.DateOfSurvey1"
                  placeholder="选择日期"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">水压试验和气密试验</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="12">
              <el-form-item
              class="red_s"
                label="3.2MPa压力下保持1分钟，无渗透变形压降:"
                label-width="200px"
                prop="WaterPressure"
              >
                <el-select v-model="editUserForm.WaterPressure" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="red_s" label="2.1MPa压力下保持1分钟，无渗透变形压降:" label-width="200px" prop="AirTightTest">
                <el-select v-model="editUserForm.AirTightTest" placeholder="请选择">
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
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">壁厚测定：剩余壁厚>设计壁厚的90%（单位：mm</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="上部壁厚（mm）:" label-width="200px" prop="Upper">
                <el-input v-model="editUserForm.Upper" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="中部壁厚（mm）:" label-width="200px" prop="Mid">
                <el-input v-model="editUserForm.Mid" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="下部壁厚（mm）:" label-width="200px" prop="Bottom">
                <el-input v-model="editUserForm.Bottom" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">容积测定</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="6">
              <el-form-item class="red_s" label="空瓶重量(Kg):" label-width="130px" prop="Weight">
                <el-input v-model="editUserForm.Weight" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="red_s" label="注水后总重量(Kg):" label-width="140px" prop="WaterWeight">
                <el-input v-model="editUserForm.WaterWeight" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="red_s" label="水温度(C):" label-width="100px" prop="water">
                <el-input v-model="editUserForm.water" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item class="red_s" label="测定容积（L）:" label-width="100px" prop="Determination">
                <el-input v-model="editUserForm.Determination" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">瓶阀检验与装配</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="2.1MPa通气保压1分钟无泄漏:" label-width="200px" prop="ValveExperiment">
                <el-select v-model="editUserForm.ValveExperiment" placeholder="请选择">
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
              <el-form-item class="red_s" label="外露螺纹不少于1-2牙:" label-width="200px" prop="ValveAssembly">
                <el-select v-model="editUserForm.ValveAssembly" placeholder="请选择">
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
              <el-form-item class="red_s" label="喷涂印记清晰:" label-width="200px" prop="SprayingTheMark">
                <el-select v-model="editUserForm.SprayingTheMark" placeholder="请选择">
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
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">检验信息</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="6">
              <el-form-item class="red_s" label="检验人员:" label-width="100px" prop="Inspector2">
                <el-input v-model="editUserForm.Inspector2" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item hidden label="最终结论:" label-width="100px" prop="Conclusion">
                <el-select v-model="editUserForm.Conclusion" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>-->
            <el-col :span="6">
              <el-form-item class="red_s" label="检验日期:" label-width="100px" prop="DateOfSurvey2">
                <el-date-picker
                  type="date"
                  v-model="editUserForm.DateOfSurvey2"
                  placeholder="选择日期"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="red_s" label="下次检验日期:" label-width="120px" prop="NextInspectionDate">
                <el-date-picker
                  type="date"
                  v-model="editUserForm.NextInspectionDate"
                  placeholder="选择日期"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <p style=" text-align: center;" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="SaveUserku()">保存到数据库</el-button>
          <el-button type="primary" :loading="loadingbut" @click="EditUser()">{{loadingbuttext}}</el-button>
          <el-button type="primary" :disabled="btnChangeEnable" @click="SaveUser()">下载保存文件</el-button>
          <el-button @click="dialogForm()">取 消</el-button>
        </p>
      </el-dialog>

      <!-- 定检报告对话框 -->
      <el-dialog
        width="80%"
        top="5vh"
        lock-scroll
        title="液化石油气瓶定检报告"
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
              <el-form-item class="red_s" label="充装介质" label-width="150px" prop="initData">
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
        title="液化石油气瓶判废报告"
        :visible.sync="dialogFormVisiblfei"
      >
        <el-form class="baofei" :model="feiUserForm" :rules="rules">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="报告编号" label-width="150px" prop="initData">
                <el-input disabled v-model="feiUserForm.reportNumber" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="产权所有者" label-width="150px" prop="initData">
                <el-input v-model="feiUserForm.propertyOwner" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="登记证编号" label-width="150px" prop="initData">
                <el-input disabled v-model="feiUserForm.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="气瓶编号" label-width="150px" prop="initData">
                <el-input disabled v-model="feiUserForm.gasId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="充装介质" label-width="150px" prop="initData">
                <el-input disabled v-model="feiUserForm.medium" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="检验单位" label-width="150px" prop="initData">
                <el-input v-model="feiUserForm.inspectionUnit" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="制造单位" label-width="150px" prop="initData">
                <el-input disabled v-model="feiUserForm.manufacturingUnit" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="red_s" label="报废原因" label-width="150px" prop="initData">
                <el-input v-model="feiUserForm.scrap" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="red_s" label="处理结果" label-width="150px" prop="initData">
                <el-input v-model="feiUserForm.result" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item class="red_s" label="检验日期" label-width="150px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="feiUserForm.checkData"
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
          <el-button type="primary" :loading="loadingbut" @click="EditUserfei()">{{loadingbuttext}}</el-button>
          <el-button type="primary" @click="SaveUserfei()">下载保存文件</el-button>
          <el-button @click="dialogFormVisiblfei = false">取 消</el-button>
        </p>
      </el-dialog>
    </el-card>
    <button @click="dd">点我滴一下</button>
  </div>
</template>
<script>
// import $ from "jquery";
// import {wsrProxy} from "../../assets/wsrProxy.min.js"
import {getLiqReport} from "../../utils/api"
export default {
  name: "report",
  data() {
    return {
      wsr:'',
      query: "",
      gasId: "",
      select: "",
      division: "",
      buildingUser: "",
      appId: "",
      orderanswer: "",
      baostaus: "",
      liqReportList: [],
      value: "",
      value1: "",
      value2: "",
      regId: "",
      //分页相关数据
      total: -1,
      currpage: 1,
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
      optionsuse: [
        { id: 0, name: "导入" },
        { id: 1, name: "在检" },
        { id: 2, name: "检测完成" },
      ],
      reportNumber: -1,

      uegId: "",
      // 添加对话框的属性
      // dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      btnChangeEnable: true,
      loadingbut: false, //审核提交加载中
      dialogFormVisiblreport: false,
      dialogFormVisiblfei: false,
      loadingbuttext: "保存文件",
      // 编辑
      rules: {
        buildingUser: [
          { required: true, message: "使用单位不能为空", trigger: "blur" },
        ],
        ReportNumber: [
          { required: true, message: "报告编号不能为空", trigger: "blur" },
        ],
        gasId: [
          { required: true, message: "气瓶编号不能为空", trigger: "blur" },
        ],
        makeInfo: [
          { required: true, message: "制造单位不能为空", trigger: "blur" },
        ],
        Hydraulic: [
          {
            required: true,
            message: "水压试验压力(MPa)不能为空",
            trigger: "blur",
          },
        ],
        regId: [
          { required: true, message: "登记证号不能为空", trigger: "blur" },
        ],
        volume: [
          { required: true, message: "原始容积不能为空", trigger: "blur" },
        ],
        makeData: [
          {
            required: true,
            message: "制造日期不能为空",
            trigger: "blur",
          },
        ],
        nextCheckData: [
          {
            required: true,
            message: "下次检验日期不能为空",
            trigger: "blur",
          },
        ],
        checkData: [
          {
            required: true,
            message: "上次检验日期不能为空",
            trigger: "blur",
          },
        ],
        Result1: [
          {
            required: true,
            message: "钢瓶制造标志完好不能为空",
            trigger: "blur",
          },
        ],
        Result2: [
          { required: true, message: "无纵向焊接不能为空", trigger: "blur" },
        ],
        Result3: [
          {
            required: true,
            message: "耳片护罩与钢瓶连接完好不能为空",
            trigger: "blur",
          },
        ],
        Result5: [
          {
            required: true,
            message: "底座支撑面与瓶底间距不能为空",
            trigger: "blur",
          },
        ],
        Result4: [
          {
            required: true,
            message: "底座无破裂磨损等影响钢瓶直立缺陷不能为空",
            trigger: "blur",
          },
        ],
        Result6: [
          {
            required: true,
            message: "无火焰过热过电弧烧伤现象不能为空",
            trigger: "blur",
          },
        ],
        Result7: [
          {
            required: true,
            message: "无瓶体倾斜变形或肉眼可见的容积变形不能为空",
            trigger: "blur",
          },
        ],
        Result8: [
          {
            required: true,
            message: "封头直边褶皱深小于钢瓶外径的0.25%不能为空",
            trigger: "blur",
          },
        ],
        Inspector: [
          { required: true, message: "检验人员不能为空", trigger: "blur" },
        ],
        DateOfSurvey: [
          {
            required: true,
            message: "检验日期不能为空",
            trigger: "blur",
          },
        ],
        Result10: [
          {
            required: true,
            message: "剩余壁厚>设计壁厚的90%不能为空",
            trigger: "blur",
          },
        ],
        Result11: [
          {
            required: true,
            message: "不得有裂纹、气孔、孤坑、夹渣等缺陷不能为空",
            trigger: "blur",
          },
        ],
        Result12: [
          {
            required: true,
            message: "屏体一侧的焊缝不得有咬边缺陷不能为空",
            trigger: "blur",
          },
        ],
        Result13: [
          {
            required: true,
            message: "焊接不得低于母材不得有不规则的突变不能为空",
            trigger: "blur",
          },
        ],
        Result14: [
          {
            required: true,
            message: "主焊缝及两侧范围凹陷深<6mm不能为空",
            trigger: "blur",
          },
        ],
        Result15: [
          {
            required: true,
            message: "主焊缝及两侧范围凹陷内划伤深<0.5mm不能为空",
            trigger: "blur",
          },
        ],
        Result16: [
          {
            required: true,
            message: "阀座无裂痕，不允许陷入瓶底不能为空",
            trigger: "blur",
          },
        ],

        Result17: [
          {
            required: true,
            message: "阀座螺纹不得有裂痕，不得有超标缺陷不能为空",
            trigger: "blur",
          },
        ],
        Result18: [
          {
            required: true,
            message: "阀座内螺纹修复后经量规检验合格不能为空",
            trigger: "blur",
          },
        ],
        Result19: [
          { required: true, message: "瓶底无裂纹不能为空", trigger: "blur" },
        ],

        Result20: [
          {
            required: true,
            message: "同一截最大最小直径差小于钢瓶内径的1%不能为空",
            trigger: "blur",
          },
        ],
        Result21: [
          {
            required: true,
            message: "损伤部位剩余壁厚>设计壁厚的90%不能为空",
            trigger: "blur",
          },
        ],

        Result22: [
          { required: true, message: "凹陷深度<10mm不能为空", trigger: "blur" },
        ],
        Result23: [
          {
            required: true,
            message: "凹陷<6mm时，损伤深<0.4mm不能为空",
            trigger: "blur",
          },
        ],
        Result24: [
          {
            required: true,
            message: "孤立点腐蚀：剩余壁厚>设计壁厚的2/3不能为空",
            trigger: "blur",
          },
        ],

        Result25: [
          {
            required: true,
            message: "线腐蚀：剩余壁厚>设计壁厚的90%不能为空",
            trigger: "blur",
          },
        ],
        DateOfSurvey1: [
          {
            required: true,
            message: "检验日期不能为空",
            trigger: "blur",
          },
        ],
        Inspector1: [
          { required: true, message: "检验人员不能为空", trigger: "blur" },
        ],
        WaterPressure: [
          {
            required: true,
            message: "3.2MPa压力下保持1分钟，无渗透变形压降不能为空",
            trigger: "blur",
          },
        ],

        AirTightTest: [
          {
            required: true,
            message: "2.1MPa压力下保持1分钟，无渗透变形压降不能为空",
            trigger: "blur",
          },
        ],
        Upper: [
          {
            required: true,
            message: "上部壁厚（mm）不能为空",
            trigger: "blur",
          },
        ],

        Mid: [
          {
            required: true,
            message: "中部壁厚（mm）不能为空",
            trigger: "blur",
          },
        ],
        Bottom: [
          {
            required: true,
            message: "下部壁厚（mm）不能为空",
            trigger: "blur",
          },
        ],
        Weight: [
          { required: true, message: "空瓶重量(Kg)不能为空", trigger: "blur" },
        ],
        WaterWeight: [
          {
            required: true,
            message: "注水后总重量(Kg)不能为空",
            trigger: "blur",
          },
        ],
        water: [
          { required: true, message: "水温度(C)不能为空", trigger: "blur" },
        ],
        Determination: [
          { required: true, message: "测定容积（L）不能为空", trigger: "blur" },
        ],
        ValveExperiment: [
          {
            required: true,
            message: "2.1MPa通气保压1分钟无泄漏不能为空",
            trigger: "blur",
          },
        ],
        ValveAssembly: [
          {
            required: true,
            message: "外露螺纹不少于1-2牙不能为空",
            trigger: "blur",
          },
        ],
        SprayingTheMark: [
          { required: true, message: "喷涂印记清晰不能为空", trigger: "blur" },
        ],
        Inspector2: [
          { required: true, message: "检验人员不能为空", trigger: "blur" },
        ],
        Conclusion: [
          { required: true, message: "最终结论不能为空", trigger: "blur" },
        ],
        DateOfSurvey2: [
          {
            required: true,
            message: "检验日期不能为空",
            trigger: "blur",
          },
        ],
        NextInspectionDate: [
          {
            required: true,
            message: "下次检验日期不能为空",
            trigger: "blur",
          },
        ],
      },
      //检测报告
      editUserForm: {
        buildingUser: "",
        ReportNumber: "",
        gasId: "",
        makeInfo: "",
        Hydraulic: "",
        regId: "",
        volume: "",
        makeData: "",
        nextCheckData: "",
        checkData: "",
        Result1: "合格",
        Result2: "合格",
        Result3: "合格",
        Result5: "合格",
        Result4: "合格",
        Result6: "合格",
        Result7: "合格",
        Result8: "合格",
        Inspector: "",
        DateOfSurvey: "",
        Result10: "合格",
        Result11: "合格",
        Result12: "合格",
        Result13: "合格",
        Result14: "合格",
        Result15: "合格",
        Result16: "合格",
        Result17: "合格",
        Result18: "合格",
        Result19: "合格",
        Result20: "合格",
        Result21: "合格",
        Result22: "合格",
        Result23: "合格",
        Result24: "合格",
        Result25: "合格",
        DateOfSurvey1: "",
        Inspector1: "",
        WaterPressure: "合格",
        AirTightTest: "合格",
        Upper: "",
        Mid: "",
        Bottom: "",
        Weight: "",
        WaterWeight: "",
        water: "",
        Determination: "",
        ValveExperiment: "合格",
        ValveAssembly: "合格",
        SprayingTheMark: "合格",
        Inspector2: "",
        Conclusion: "",
        DateOfSurvey2: "",
        NextInspectionDate: "",
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
      // 判废报告
      feiUserForm: {
        reportNumber: "",
        propertyOwner: "",
        regId: "",
        gasId: "",
        medium: "",
        inspectionUnit: "",
        manufacturingUnit: "",
        scrap: "",
        result: "",
        checkData: "",
      },
    };
  },
   created() {
    
    this.getLiqReportList();
    // this.dialogFormVisiblreport()
  },
   mounted(){
      this.wsr=wsrProxy;
     this.wsr.init();
   
    
  },
  watch: {
    dialogFormVisibleEdit: function (val, oldVla) {
      this.$refs["editUserForm"].resetFields();
    },
  },
  methods: {
      dd() {
                var rt = 0;               // 返回值 
                var port = 0;             // 端口号 

                var keyType = 0;          // 密码类型： 0 - A密码   1 - B密码 
                var key = "FFFFFFFFFFFF"; // 密码，16进制，6个字节，空白卡全F 

                var v1 = 5000, v2 = 0;
                var block = 5;            // 块号 

                var delaytime = 2;        // 蜂鸣时长 2*10ms = 20ms 
                var obj = {};

                // 打开端口 
                rt =this.wsr.ws_openPort(port);
                console.log("--------------------------------")
                console.log(rt)

                if (rt < 0)
                    return rt;


                try {

                    //------------------------------------------ 
                    // 设置通讯超时 
                    // 此处可以不设置，默认为100 
                    // 具体根据实际用户环境做调整 
                    //------------------------------------------ 
                    this.wsr.ws_set_mode(this.wsr.MODE_TIMEOUT, 300);


                    //  
                    // 设置设备操作卡型 ISO14443 TYPE A 模式 
                    // 
                    // 注意：只有当读卡设备支持不同类型卡的时候， 
                    // 才需要调用此函数；当设备只支持一种类型卡时， 
                    // 此处代码可以省略 
                    // 
                    this.wsr.ws_set_device_mode(port, parseInt("41", 16));

                    // 点名 
                    obj = { model: "", cputype: 0, version: 0.0, id: "", info: "" };
                    rt = this.wsr.ws_callDeviceE(port, obj);
                    if (rt < 0)
                        return rt;
                    console.log("device model:" + obj.model);
                    console.log("device cputype:" + obj.cputype);
                    console.log("device version:" + obj.version);

                    // 蜂鸣 
                    rt = this.wsr.ws_beep(port);
                    if (rt < 0)
                        return rt;

                    rt = this.wsr.ws_beepex(port, delaytime);
                    if (rt < 0)
                        return rt;

                    // 读取设备唯一序列号 
                    rt = this.wsr.ws_get_dev_id(port, obj);
                    if (rt < 0)
                        return rt;
                    console.log("device id:" + obj.id);

                    // 读取设备信息 
                    rt = this.wsr.ws_get_dev_info(port, obj);
                    if (rt < 0)
                        return rt;
                    console.log("device info:" + obj.info);

                    //------------------------------------- 
                    // 读卡号 
                    //------------------------------------- 

                    // 读取卡号 
                    // 
                    // 在以下情况，读卡会返回 -226： 
                    // 1.没有卡放在读卡器上; 
                    // 2.卡损坏无法让读卡器识别。 
                    // 
                    // 此时需要提醒用户放卡或换有效的卡 再继续后面的操作 
                    // 

                    for (var KEY in obj)
                        delete obj[KEY];

                    obj.cardno = 0;

                    rt = this.wsr.ws_getCardNo_DWORD(port, obj);
                    if (rt < 0 && rt != -226)
                        return rt;
                    console.log("CardNo (DWORD):" + obj.cardno);

                    rt = this.wsr.ws_getCardNo_String(port, obj);
                    if (rt < 0 && rt != -226)
                        return rt;
                    console.log("CardNo (String):" + obj.cardno);

                    rt = this.wsr.ws_getCardNo_Hex(port, obj);
                    if (rt < 0 && rt != -226)
                        return rt;
                    console.log("CardNo (Hex):" + obj.cardno);

                    rt = this.wsr.ws_getCardNo_Double(port, obj);
                    if (rt < 0 && rt != -226)
                        return rt;
                    console.log("CardNo (Double):" + obj.cardno);


                    // 装载密码 
                    rt = this.wsr.ws_loadKey(port, key, 0);
                    if (rt < 0)
                        return rt;

                    //------------------------------------- 
                    // 读写卡数据 
                    //------------------------------------- 

                    // 读写卡块数据 
                    // 读取1扇区0块的数据 
                    obj.data = "";
                    rt = this.wsr.ws_readBlock(port, 4, obj);
                    if (rt < 0)
                        return rt;
                    console.log("data of block #4:" + obj.data);

                    // 写块数据 
                    data = "2345AD6328290DE7" +
                        "F1833B1320DA3DF2";
                    rt = this.wsr.ws_writeBlock(port, 4, data);
                    if (rt < 0)
                        return rt;

                    //------------------------------------- 
                    // 电子钱包 
                    //------------------------------------- 

                    // 初始化块值 
                    rt = this.wsr.ws_initValue(port, block, v1);
                    if (rt < 0)
                        return rt;

                    // 减值 
                    rt = this.wsr.ws_decValue(port, block, 28);
                    if (rt < 0)
                        return rt;

                    // 增值 
                    rt = this.wsr.ws_incValue(port, block, 371);
                    if (rt < 0)
                        return rt;

                    // 读值 
                    obj.value = 0;
                    rt = this.wsr.ws_readValue(port, block, obj);
                    if (rt < 0)
                        return rt;
                    console.log("Value:" + obj.value);

                    return rt;


                }
                finally {
                    this.wsr.ws_closePort(port);
                }

            },
    async Registration() {
      const res = await this.$http.post(`IDGenerate/reportId`);
      console.log(res);
      this.editUserForm.ReportNumber = res.data;
    },
    dialogForm() {
      // this.editUserForm = {};

      this.dialogFormVisibleEdit = false;
      this.getLiqReportList();
    },
    // 判废报告弹框
    async baoEdituser(userss) {
      this.dialogFormVisiblfei = true;
      this.gasId = userss.gasId;
      this.regId = userss.regId;
      const res = await this.$http.get(
        `inspection/no/show?gasId=${this.gasId}`
      );
      console.log(res);
      // debugger;
      if (res.data.code === 201) {
        this.$message({
          type: "warning",
          message: "请先填写检验报告",
        });
        $(".baofei").hide();
      } else if (res.data.code === 200) {
        $(".baofei").show();
        this.feiUserForm = res.data.data;
        this.reportNumber = res.data.data.regId;
        this.$message({
          type: "success",
          message: res.data.msg,
        });
      } else if (res.data.code === 1) {
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
        $(".baofei").hide();
      }
    },

    // 判废报告保存到数据库
    async SaveUserrfei() {
      const res = await this.$http.post(
        `/inspection/insertNo`,
        this.feiUserForm
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
    // 判废报告保存文件
    async EditUserfei() {
      this.loadingbut = true;
      this.loadingbuttext = "加载中...";
      const res = await this.$http.get(
        `/inspection/NoOut?regId=${this.reportNumber}`
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
    // 判废报告下载文件
    async SaveUserfei() {
      const response = await this.$http.get(
        `/download/no/download?regId=${this.regId}`,
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
      this.dialogFormVisiblreport = true;
      this.regId = users.regId;

      this.gasId = users.gasId;

      // excel/detection/insert/yes
      const res = await this.$http.get(`/inspection/show?gasId=${this.gasId}`);
      console.log(res);
      // debugger;
      if (res.data.code === 201) {
        this.$message({
          type: "warning",
          message: "请先填写检验报告",
        });
        $(".dingreport").hide();
      } else if (res.data.code === 200) {
        $(".dingreport").show();
        this.reportUserForm = res.data.data;
        this.reportNumber = res.data.data.regId;
        this.$message({
          type: "success",
          message: res.data.msg,
        });
      } else if (res.data.code === 1) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        $(".dingreport").hide();
      }
    },

    // 定检报告保存到数据库
    async rePort() {
      // console.log(1);

      const res = await this.$http.post(
        `/inspection/insertYes`,
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
      const res = await this.$http.post(
        `/inspection/YesOut?regId=${this.reportNumber}`
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
      const response = await this.$http.get(
        `download/yes/download?regId=${this.regId}`,
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
        `/download/detection?gasId=${this.gasId}`,
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
      console.log(this.editUserForm.DateOfSurvey2);

      this.$refs.editUserForm.validate(async (valid) => {
        if (valid) {
          console.log(this.editUserForm);
          const res = await this.$http.post(
            `/excel/detection/insert`,
            this.editUserForm
          );
          console.log(res);
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.gasId = this.editUserForm.gasId;
            // console.log(this.editUserForm.gasId);
            console.log(this.gasId);
          } else {
            this.$message({
              type: "error",
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
      console.log("查询到gasId:" + this.gasId);

      this.loadingbut = true;
      this.loadingbuttext = "加载中...";
      const res = await this.$http.get(`/excel/detection?gasId=${this.gasId}`);
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
        return "在检";
      } else if (val.reportStatus == "2") {
        return "完成";
      }
    },
    ifendcases(val) {
      if (val.status == "0") {
        return "不合格";
      } else if (val.status == "1") {
        return "合格";
      } else if (val.status == "2") {
        return "超期未检";
      } else if (val.status == "3") {
        return "即将超期";
      }
    },

    // 编辑对话框打开
    async showEdituser(user) {
      console.log(user);
      console.log(user.gasId);

      this.dialogFormVisibleEdit = true;
      // console.log(user.gasId);
      const res = await this.$http.get(
        `/excel/select/detection?gasId=${user.gasId}`
      );
      console.log(res);

      if (res.data.code == 200) {
        this.editUserForm = res.data.data;
        this.gasId = res.data.data.gasId;
      } else if (res.data.code == 201) {
        console.log(user);
        this.editUserForm.gasId = user.gasId;
        this.editUserForm.ReportNumber = user.ReportNumber;
        this.editUserForm.buildingUser = user.buildingUser;
        this.editUserForm.makeInfo = user.makeInfo;
        this.editUserForm.Hydraulic = user.Hydraulic;
        this.editUserForm.regId = user.regId;
        const str1 = user.volume.toString();
        this.editUserForm.volume = str1;
        this.editUserForm.makeData = user.makeData;
        this.editUserForm.nextCheckData = user.nextCheckData;
        this.editUserForm.checkData = user.checkData;
      }

      // 2.添加对话框

      // this.editUserForm = user;
      //user其实就是scope.row也就是userlist
    },

    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getLiqReportList();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async search() {
      const res = await this.$http.get(
        `/cylinder/select?pageSize=${this.pageSize}&currpage=${this.page}&gasId=${this.uegId}&reportStatus=${this.reportStatus}&appId=${this.appId}&buildingUser=${this.buildingUser}`
      );
      console.log(res);
      this.liqReportList = res.data.data.list;
      this.total = res.data.data.totalCount;
    },

    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      this.currpage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getLiqReportList();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currpage = val;
      this.getLiqReportList();
    },
     getLiqReportList() {
       getLiqReport().then(res=>{

       })
      // const res = await this.$http.get(
      //   `/cylinder/select?pageSize=${this.pageSize}&currpage=${this.currpage}&gasId=${this.uegId}`
      // );
      console.log(res);
      this.liqReportList = res.data.data.list;
      this.total = res.data.data.totalCount;
    },
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
[class*="el-col-"] {
  margin-top: 5px;
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
<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
.red_s label {
  color: #f00 !important;
}
</style>