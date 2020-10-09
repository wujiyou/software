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
                v-model="gasId"
              ></el-input>
            </el-col>
            <el-col style="margin-left:30px" :span="4">
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
                placeholder="请输入车牌号码"
                v-model="carNum"
              ></el-input>
            </el-col>
            <el-col style="margin-left:30px" :span="4">
              <el-select
                size="small"
                v-model="isCard"
                clearable
                @clear="loadUserList()"
                placeholder="请选择是否发卡"
              >
                <el-option
                  v-for="item in optionsle"
                  :key="item.id"
                  :label="item.lei"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
            <el-col style="margin-left:30px" :span="4">
              <el-button
                @click="search()"
                size="small"
                style=" width: 100%;"
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
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          border
          :data="carLabelList"
          style="width: 100%;padding-bottom:40px"
        >
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip></el-table-column>
          <el-table-column prop="regId" label="登记证号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="gasId" label="气瓶编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="appId" label="标签号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="carNum" label="车牌号码" show-overflow-tooltip></el-table-column>
          <el-table-column prop="inspectName" label="检验单位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="isCard" label="是否发卡" show-overflow-tooltip>
            <template slot-scope="scope">
              <p v-if="carLabelList[scope.$index].isCard==0">未发卡</p>
              <p v-if="carLabelList[scope.$index].isCard==1">已发卡</p>
            </template>
          </el-table-column>

          <el-table-column prop="checkData" label="检验日期" show-overflow-tooltip>
            <template slot-scope="socpe">{{socpe.row.checkData | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="nextCheckData" label="下次检验日期" show-overflow-tooltip>
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>

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
        :current-page="currpage"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <el-dialog title="添加用户" top="2vh" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form" :rules="rules">
          <el-col :span="24">
            <el-col :span="6">
              <el-form-item label="登记类别:" label-width="140px" prop="lei">
                <el-select v-model="form.lei" placeholder="请选择">
                  <el-option
                    v-for="item in optionslei"
                    :key="item.id"
                    :label="item.lei"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="2"></el-col> -->
            <el-col :span="18">
              <el-col :span="8">
                <el-form-item label="行政省份:" label-width="140px" prop="sheng">
                  <!-- {{id}} -->
                  <el-select v-model="form.sheng" @change="function2(form.sheng)" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="市级区域:" label-width="140px" prop="city">
                  <el-select v-model="form.city" @change="function1(form.city)" placeholder="请选择">
                    <el-option
                      v-for="item in level"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="区级:" label-width="140px" prop="country">
                  <el-select v-model="form.country" placeholder="请选择">
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
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备基本情况</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="设备代码:" label-width="140px" prop="sbdm">
                <el-input v-model="form.sbdm" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="气瓶数量:" label-width="140px" prop="num">
                <el-input v-model="form.num" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="监督机构名称:" label-width="140px" prop="supervisoryOrg">
                <el-input v-model="form.supervisoryOrg" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="定期检验名称:" label-width="140px" prop="checkName">
                <el-input v-model="form.checkName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">设备使用情况</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="使用单位名称:" label-width="140px" prop="useName">
                <el-select v-model="form.useName" placeholder="请选择">
                  <el-option
                    v-for="item in optionsuseName"
                    :key="item.id"
                    :label="item.usenames"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="form.useName" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="使用单位地址:" label-width="140px" prop="address">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="统一社会信用代码:" label-width="140px" prop="daima">
                <el-input v-model="form.daima" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="邮政编码:" label-width="140px" prop="email">
                <el-input v-model="form.email" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="投入使用日期:" label-width="140px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.initData"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.initData" autocomplete="off"></!-->
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="固定电话:" label-width="140px" prop="mobilePhone">
                <el-input v-model="form.mobilePhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="安全管理员:" label-width="140px" prop="useSafe">
                <el-input v-model="form.useSafe" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="联系电话:" label-width="140px" prop="telPhone">
                <el-input v-model="form.telPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">登记信息</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="登记机关:" label-width="140px" prop="certification">
                <el-input v-model="form.certification" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="登记人员:" label-width="140px" prop="certificationPerson">
                <el-input v-model="form.certificationPerson" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="登记证号:" label-width="140px" prop="regId">
                <el-input v-model="form.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="登记日期:" label-width="140px" prop="cretificationDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.cretificationDate"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.cretificationDate" autocomplete="off"></el-input> -->
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
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="editUserForm" :rules="rules">
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="登记证号:" label-width="140px" prop="regId">
                <el-input v-model="editUserForm.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="行政省份:" label-width="140px" prop="sheng">
                <!-- {{id}} -->
                <el-select
                  v-model="editUserForm.sheng"
                  @change="function2(editUserForm.sheng)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="区级:" label-width="140px" prop="city">
                <el-select
                  v-model="editUserForm.city"
                  @change="function1(editUserForm.city)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in level"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="区级区域:" label-width="140px" prop="country">
                <el-select v-model="editUserForm.country" placeholder="请选择">
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

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="登记类型:" label-width="140px" prop="regType">
                <el-input v-model="editUserForm.regType" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="气瓶数量:" label-width="140px" prop="num">
                <el-input v-model="editUserForm.num" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="监督机构名称:" label-width="140px" prop="supervisoryOrg">
                <el-input v-model="editUserForm.supervisoryOrg" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="定期检验名称:" label-width="140px" prop="checkName">
                <el-input v-model="editUserForm.checkName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="使用单位名称:" label-width="140px" prop="useName">
                <el-input v-model="editUserForm.useName" autocomplete="off"></el-input>
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
              <el-form-item label="投入使用日期:" label-width="140px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.initData"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.initData" autocomplete="off"></!-->
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item label="固定电话:" label-width="140px" prop="mobilePhone">
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
              <el-form-item label="登记机关:" label-width="140px" prop="certification">
                <el-input v-model="editUserForm.certification" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="登记日期:" label-width="140px" prop="cretificationDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.cretificationDate"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.cretificationDate" autocomplete="off"></el-input> -->
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
              <el-form-item label="联系电话:" label-width="140px" prop="telPhone">
                <el-input v-model="editUserForm.telPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">&nbsp;</el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="EditUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 查看信息 -->
      <el-dialog title="查看信息" :visible.sync="dialogTableVisible"></el-dialog>

      <!-- 登记证打印下载 -->
      <el-dialog width="80%" top="3vh" title="登记证预览下载" :visible.sync="dengdialogFormVisible">
        <el-form :model="dengform">
          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">原始自带数据</h3>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="登记证号:" label-width="140px" prop="regId">
                <el-input v-model="dengform.regId" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记人员:" label-width="140px" prop="certificationPerson">
                <el-input v-model="dengform.certificationPerson" autocomplete="off"></el-input>
              </el-form-item>
              <!-- <el-form-item label="移动电话:" label-width="140px" prop="telPhone">
              <el-input v-model="dengform.telPhone" autocomplete="off"></el-input>
              </el-form-item>-->
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记类型:" label-width="140px" prop="regType">
                <el-input v-model="dengform.regType" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="气瓶数量:" label-width="140px" prop="num">
                <el-input v-model="dengform.num" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="监督机构名称:" label-width="140px" prop="supervisoryOrg">
                <el-input v-model="dengform.supervisoryOrg" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="定期检验名称:" label-width="140px" prop="checkName">
                <el-input v-model="dengform.checkName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="使用单位名称:" label-width="140px" prop="useName">
                <el-input v-model="dengform.useName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="使用单位地址:" label-width="140px" prop="address">
                <el-input v-model="dengform.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="投入使用日期:" label-width="140px" prop="initData">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dengform.initData"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.initData" autocomplete="off"></!-->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="固定电话:" label-width="140px" prop="telPhone">
                <el-input v-model="dengform.telPhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="安全管理员:" label-width="140px" prop="useSafe">
                <el-input v-model="dengform.useSafe" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记机关:" label-width="140px" prop="certification">
                <el-input v-model="dengform.certification" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="登记日期:" label-width="140px" prop="cretificationDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="dengform.cretificationDate"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.cretificationDate" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8">&nbsp;</el-col>
          </el-col>

          <el-col :span="24">
            <h3 style="border-bottom:1px solid #ece8e8;padding-bottom:5px">手动填写下载word文档</h3>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="统一社会信用代码:" label-width="140px" prop="telPhone">
                <el-input v-model="dengform.creditCode" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="产品名称:" label-width="140px" prop="telPhone">
                <el-input v-model="dengform.productName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="设备使用地点:" label-width="140px" prop="telPhone">
                <el-input v-model="dengform.sbAddress" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="邮政编码:" label-width="140px" prop="telPhone">
                <el-input v-model="dengform.post" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话:" label-width="140px" prop="telPhone">
                <el-input v-model="dengform.mobilePhone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="使用单位填表人员:" label-width="140px" prop="telPhone">
                <el-input v-model="dengform.userFill" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="日期:" label-width="140px" prop="cretificationDate">
                <el-date-picker
                  type="date"
                  placeholder="日期"
                  v-model="dengform.fillDate"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.cretificationDate" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="使用单位安全管理人员:" label-width="140px" prop="telPhone">
                <el-input v-model="dengform.userSafePerson" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期2:" label-width="140px" prop="verifyDate">
                <el-date-picker
                  type="date"
                  placeholder="日期2"
                  v-model="dengform.verifyDate"
                  style="width: 100%;"
                ></el-date-picker>
                <!-- <el-input v-model="form.cretificationDate" autocomplete="off"></el-input> -->
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="登记机关管理人员:" label-width="140px" prop="telPhone">
                <el-input v-model="dengform.certificationPerson" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">&nbsp;</el-col>

            <el-col :span="8">&nbsp;</el-col>
          </el-col>
        </el-form>
        <p style="text-align: center;" slot="footer" class="dialog-footer">
          <el-button @click="dengdialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="savencftpget()">保存文件</el-button>
          <el-button type="primary" @click="ncftpget()">下载world文档</el-button>
        </p>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
// 气瓶信息管理
// import Message from "@/components/archives/message"
// import cityData from "@/components/archives/citydata.js";
import jwtDecode from "jwt-decode";
import {getCarLabel} from "../../utils/api"
export default {
  name: "cylinder",
  data() {
    return {
      unitName: "",
      select: "",
      regId: "",
      gasId: "",
      carNum: "",
      isCard: "",
      carLabelList: [],
      token: [],
      // cityData,
      //分页相关数据
      total: -1,
      currpage: 1,
      page: 1,
      pageSize: 10,
      id: -1,
      Id: -1,
      dengId: -1,
      options: [],
      level: [],
      levels: [],
      fakas: "",
      optionsle: [
        {
          id: 1,
          lei: "已发卡",
        },
        {
          id: 0,
          lei: "未发卡",
        },
      ],
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogTableVisible: false,
      dengdialogFormVisible: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      form: {
        regId: "",
        sheng: "",
        city: "",
        lei: "",
        country: "",
        regType: "",
        email: "",
        daima: "",
        num: "",
        supervisoryOrg: "",
        checkName: "",
        useName: "",
        address: "",
        initData: "",
        mobilePhone: "",
        sbdm: "",
        useSafe: "",
        certification: "",
        cretificationDate: "",
        certificationPerson: "",
        telPhone: "",
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
        regId: "",
        sheng: "",
        city: "",
        country: "",
        regType: "",
        num: "",
        supervisoryOrg: "",
        checkName: "",
        useName: "",
        address: "",
        initData: "",
        mobilePhone: "",
        useSafe: "",
        certification: "",
        cretificationDate: "",
        certificationPerson: "",
        telPhone: "",
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
        sheng: [
          { required: true, message: "省级区域代码不能为空", trigger: "blur" },
        ],
        city: [
          { required: true, message: "市级区域代码不能为空", trigger: "blur" },
        ],
        country: [
          { required: true, message: "区域代码不能为空", trigger: "blur" },
        ],
        regType: [
          { required: true, message: "登记类型不能为空", trigger: "blur" },
        ],
        num: [{ required: true, message: "气瓶数量不能为空", trigger: "blur" }],
        supervisoryOrg: [
          { required: true, message: "请输入监督机构", trigger: "blur" },
        ],
        checkName: [
          { required: true, message: "请输入定期检验名称", trigger: "blur" },
        ],

        useName: [
          { required: true, message: "请输入使用单位", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入使用地址", trigger: "blur" },
        ],
        initData: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
        mobilePhone: [
          { required: true, message: "固定电话不能为空", trigger: "blur" },
        ],
        useSafe: [
          { required: true, message: "请输入安全管理员", trigger: "blur" },
        ],
        certification: [
          { required: true, message: "请输入登记机关", trigger: "blur" },
        ],
        cretificationDate: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
        certificationPerson: [
          { required: true, message: "请输入登记人员", trigger: "blur" },
        ],
        telPhone: [
          { required: true, message: "联系电话不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "请输入正确的手机号码",
          },
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
      //   保存所有角色数据
    };
  },
 
  methods: {
    Editusertion() {
      this.getCarLabelList();
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
      this.$http
        .post(
          `/word/word?id=${this.dengId}&creditCode=${this.dengform.creditCode}&sbAddress=${this.dengform.sbAddress}&post=${this.dengform.post}&mobilePhone=${this.dengform.mobilePhone}&userFill=${this.dengform.userFill}&fillDate=${this.dengform.fillDate}&userSafePerson=${this.dengform.userSafePerson}&verifyDate=${this.dengform.verifyDate}&certificationPerson=${this.dengform.certificationPerson}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.code == 1) {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
          } else if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          }
        });
    },
    // 下载world文档
    ncftpget() {
      this.$http
        .post(
          `/word/download`,
          { headers: "application/x-download" },
          { responseType: "blob" }
        )
        .then((response) => {
          console.log(response);

          if (response.status === 200) {
            this.getCarLabelList();
            // 提示
            this.$message({
              type: "success",
              message: "下载成功",
            });
            const blob = new Blob([response.data], {
              type: "application/msword",
            });
            const fileName = "登记证打印模板.docx";

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
    registrationAddUserDia(row) {
      this.dengId = row.id;
      this.dengdialogFormVisible = true;
      this.dengform = row;
    },
    // 省级区域显示
    async provinceMessage() {
      const res = await this.$http.get(`/chinese/province`);
      console.log(res);
      this.options = res.data.data;
      // this.form.sheng=this.Id
    },

    //  市级
    async function2(val) {
      console.log(val);

      // this.id = val;
      // console.log(this.id);
      this.options.map((s, index) => {
        if (s.name === val) {
          this.id = this.options[index].id;
          console.log(this.id);
        }
      });

      const res = await this.$http.get(`/chinese/city/${this.id}`);
      console.log(res);
      this.level = res.data.data;
    },

    // 区域
    async function1(val) {
      this.level.map((s, index) => {
        if (s.name === val) {
          this.Id = this.level[index].id;
          console.log(this.Id);
        }
      });
      // this.Id = val;
      const res = await this.$http.get(`/chinese/area/${this.id}`);
      console.log(res);
      this.levels = res.data.data;
    },

    // 查看信息
    async lookEdituser(user) {
      // console.log(userId);
      console.log(user);

      // this.dialogTableVisible = true;
      this.$router.push({ path: "/message", query: { id: user.id } });
    },
    // 编辑用户
    // 编辑用户发送请求
    async EditUser() {
      //   users/:id
      this.dialogFormVisibleEdit = false;
      const res = await this.$http.post(`/doucument/update`, this.editUserForm);
      console.log(res);
      if (res.data.code === 0) {
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

    // 编辑对话框打开
    async showEdituser(user) {
      // console.log(user);
      let tokens = this.token;
      let token = sessionStorage.getItem("access_token");
      let unitId = sessionStorage.getItem("unitId");
      const res = await this.$http.post(`send/sendService`, tokens);
      console.log(res);
      if (res.data.code == 201) {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      } else {
        let http = res.data.data;
        window.open(`${http}/send/carTuckComb?unitId=${unitId}`, "_blank");
      }
      // 2.添加对话框
      // this.dialogFormVisibleEdit = true;
      // this.editUserForm = user;
      //user其实就是scope.row也就是userlist
    },

    //删除用户 打开消息盒子
    showDeleUserMsgBox(userId) {
      console.log(userId);

      // 提示框 点击确定走.then
      // 点取消 走.catch
      this.$confirm("删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 注意async的位置，最近的位置
          // 发送删除请求:id:用户id
          // 1.data中找userId
          // 2.把userID以showDeleUserMsgBox参数形式传进来
          const res = await this.$http.get(`/doucument/delete/${userId}`);
          console.log(res);
          this.getCarLabelList();
          // 提示
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          // if (res.data.status === 200) {
          //   // 回到第一页展示
          //   //this.pagenum = 1;
          //   // 重新请求数据
          //   this.getUserlist();
          //   // 提示
          //   this.$message({
          //     type: "success",
          //     message: res.data.msg
          //   });
          // }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //   添加用户发送请求
    async AddUser() {
      //   let test = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      //   if (this.form.mobilePhone !=test){
      //   this.$message({
      //     message: "手机号格式错误",
      //     type: "warning"
      //   });
      //   return false;
      // }
      // else if(this.form.telPhone !=test){
      //   this.$message({
      //     message: "手机号格式错误",
      //     type: "warning"
      //   });
      // }
      console.log(this.form);
      // 2.关闭对话框
      this.dialogFormVisibleAdd = false;
      const res = await this.$http.post(`/doucument/save`, this.form);

      console.log(res);
      if (res.data.code === 0) {
        // 回到第一页展示
        //this.pagenum = 1;
        // 重新请求数据
        this.getCarLabelList();
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
    // 添加用户显示对话框
    showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getCarLabelList();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
     search() {
       getCarLabel().then(res=>{

      })
      // const res = await this.$http.get(
      //   `/car/cylinder-card/findPage?regId=${this.regId}&pageSize=${this.pageSize}&currpage=${this.page}&carNum=${this.carNum}&gasId=${this.gasId}&isCard=${this.isCard}`
      // );
      console.log(res);

      this.carLabelList = res.data.data.list;
      this.total = res.data.data.totalCount;
      // console.log("aaaaaa");
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      this.currpage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getCarLabelList();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currpage = val;
      this.getCarLabelList();
    },
    async getCarLabelList() {
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

      getCarLabel().then(res=>{

      })

      // const res = await this.$http.get(
      //   `/car/cylinder-card/findPage?unitName=${this.unitName}&rows=${this.pageSize}&page=${this.currpage}`
      // );
      console.log(res);
      this.carLabelList = res.data.data.list;
      this.total = res.data.data.totalCount;
    },
  },
  created() {
    this.getCarLabelList();
    this.provinceMessage();
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
.input1 {
  width: 200px;
}
</style>
<style>
el-table td,
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