<template>
  <div class="billFlowCon">
    <el-row class="headerCon">
        <el-col :span="24">
          <h5 style="padding-left:20px">交易记录</h5>
        </el-col>
        <el-col :span="24" style="padding-bottom:20px">
          <el-col style="padding-left:20px" :span="4">
            <el-input
              size="small"
              style=" width: 100%;"
              @clear="loadBillList()"
              clearable
              class="input-serach"
              placeholder="请输入订单编号"
              v-model="orderNo"
            ></el-input>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-button
              style=" width:80%;"
              type="primary"
              size="small"
              @click="searchBill()"
              class="el_button"
              icon="el-icon-search"
            >搜索</el-button>
          </el-col> 
          <el-col :span="12">&nbsp;</el-col>
          <el-col :span="2">
            <!-- <el-button size="small" style="font-size:13px" plain icon="el-icon-delete" @click="showDeleUserMsgBox" type="danger">删除</el-button> -->
          </el-col>
        </el-col>
      </el-row>
      <!-- 表单 -->
      <el-table
        border
        :data="billList"
        style="width: 100%;margin:20px 0px"
        :row-style="{height:'40px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
          <template slot-scope="socpe">
            <p style="cursor:pointer;" @click="showEdituser(socpe.row)">{{socpe.$index+1}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="customerName" label="姓名" ></el-table-column>
        <el-table-column show-overflow-tooltip prop="orderNumber" label="订单编号" ></el-table-column>
        <el-table-column show-overflow-tooltip prop="address" label="地址"></el-table-column>
        <el-table-column show-overflow-tooltip prop="createdTime" :formatter="dateFormat" label="接单时间">
          <!-- <template slot-scope="socpe">{{socpe.row.createdTime | fmtdate}}</template> -->
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="配送站点"></el-table-column>
        <el-table-column show-overflow-tooltip prop="phone" label="联系电话"></el-table-column>

        <el-table-column show-overflow-tooltip prop="sitePersonnelName" label="接单员"></el-table-column>
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
  </div>
</template>

<script>
// import {getOrder} from '../../utils/api'
export default {
  data(){
    return{
      billList:[],
      orderNo:'',
      total: -1,
      currPage: 1,
      pageSize: 10,
      page: 1,
    }

  },
  created(){
    getOrder(this.currPage,this.pageSize).then((res)=>{
      this.billList=res.data.list
      this.total=res.data.totalPage
      console.log(res)
    })

  },
  methods:{
    getBillList(){

    },
    loadBillList(){
      this.getBillList()
    },
    searchBill(){

    },
    showEditBill(){

    },
     dateFormat: function(row, column) {
      var date = row[column.property];
      if (date === null) {
        return "0:0:0";
      }
      var moment = require("moment");
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
      //HH:mm:ss
    },
        //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      this.currPage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getBillList();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currPage = val;
      this.getBillList();
    },
  }

}
</script>

<style scoped>
 .billFlowCon{
   padding: 0 !important;
   
 }
 .headerCon{
    /* background: linear-gradient(to top, #b1d3ff, #b1d3ff, #ffffff); */
 }

</style>