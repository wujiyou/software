<template>
  <div class="LiqDetectionCon">
    <div class="headerSearrch">
      <el-row>
       <el-col :span="22">
          <el-col :span="24">
            <h5 style="padding-bottom:15px;padding-left:15px">充装记录</h5>
          </el-col>

          <!-- <el-col style="padding-left:15px" :span="24">
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

            <el-col style="padding-left:30px" :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入加气枪号"
                v-model="gunId"
              ></el-input>
            </el-col>

            <el-col style="padding-left:30px" :span="4">
              <el-date-picker
                size="small"
                style=" width: 100%;"
                type="date"
                placeholder="加气时间"
                @clear="loadUserList()"
                value-format="yyyy-MM-dd"
                v-model="createTime"
                @input="searchUser()"
              ></el-date-picker>
            </el-col>

            <el-col style="padding-left:20px" class="line" :span="1">
              <p style="margin-top:8px;">至</p>
            </el-col>
            <el-col :span="4">
              <el-date-picker
                type="date"
                placeholder="加气时间"
                value-format="yyyy-MM-dd"
                v-model="createTime2"
                size="small"
                style=" width: 100%;"
                @input="searchUser()"
              ></el-date-picker>
            </el-col>

            <el-col style="padding-left:30px" :span="4">
              <el-button
                size="small"
                type="primary"
                style=" width: 100%;"
                @click="searchUser()"
                class="el_button"
                icon="el-icon-search"
              >搜索</el-button>
            </el-col>
          </el-col> -->
        </el-col>
      </el-row>

      <!-- <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>
      <el-col style="margin-bottom:5px;margin-top:5px" :span="24">
        <el-col :span="21">&nbsp;</el-col>

        <el-col :span="2">
          <el-button
            type="success"
            plain
            size="small"
            style="margin-left:10px;font-size:13px"
            @click="downtemplatee()"
          >
            <i style="padding-right:10px;" class="el-icon-download"></i>批量下载excel
          </el-button>
        </el-col>
      </el-col> -->
     </div>
      <!-- 表格 -->
      <template>
        <el-table
          border
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          :data="recordList"
          style="width: 100%;margin:20px 0px;padding-bottom:40px"
        >
          <el-table-column type="index" label="序号" width="50" show-overflow-tooltip></el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="充装站名称" width="200"></el-table-column>
          <el-table-column show-overflow-tooltip prop="regId" label="登记证号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="gasId" label="气瓶编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="appId" label="标签号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="gunId" label="充装枪号"></el-table-column>
          <el-table-column sortable show-overflow-tooltip prop="createTime" label="充装时间">
            <!-- <template slot-scope="socpe">{{socpe.row.createTime | fmtdate}}</template> -->
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="fillingVolume" label="充装量(kg)"></el-table-column>
          <el-table-column show-overflow-tooltip prop="userName" label="充装员"></el-table-column>

          <el-table-column sortable show-overflow-tooltip prop="nextCheckData" label="下次检验时间">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
          </el-table-column>
        </el-table>
      </template>

      <el-pagination
        style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.currPage"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
  </div>
  
</template>

<script>
 import Paging from "../../components/Paging"
//  import {geAllFillingList} from "../../utils/api"
export default {
  data(){
    return{
      gunId: "",
      gasId: "",
      createTime: "",
      createTime2: "",
      recordList:[],
      params:{
        pageSize: 10, //每页10条数据
        currpage: 1, //当前页
      },
      total: 0,
      
    }
  },
  created(){
    this.getAllFillingData()
    this.tableData2=this.tableData

  },
  methods:{
    getAllFillingData(){
      geAllFillingList(this.params).then((res)=>{
        this.recordList=res.data.list
        console.log(res)

      })
    },
     //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.params.pageSize = val;
      // 回到第一页
      this.params.currPage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
     this.getAllFillingData()
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.params.currPage = val;
      this.getAllFillingData()
      //this.userlist=res.data.data.list
    },
  },
  components:{
    Paging
  }

}
</script>

<style lang='less' scoped>
//  /deep/.el-table th, .el-table tr{
//    border-bottom: 1px solid #ccc;
//  }
//  /deep/.el-table td, .el-table th.is-leaf{
//    border-bottom: 1px solid #ccc;
//  }
 .LiqDetectionCon{
   padding: 0 !important; 
   .headerSearrch{
     overflow: hidden;
    //  border: 1px solid #b1d3ff;
    //  padding:  20px 0 20px !important;
    //  background: linear-gradient(to top,#b1d3ff,#ffffff) ;
     .searchCon{
       padding-top: 20px;
      //  border: 1px solid #b1d3ff;
      //  background: linear-gradient(to top,#b1d3ff,#b1d3ff,#ffffff) ;
       min-width: 1580px;
      .rowSpa{
       margin-bottom: 10px;
       line-height: 40px;
       .textTitle{
          text-align: right;
        }
      }
      .btnSpa{
        margin-bottom: 10px;

      }
    }
  }
 }
 
</style>