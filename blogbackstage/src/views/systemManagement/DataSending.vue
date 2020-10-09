<template>
  <div class="dataSend">
    <el-row>
          <el-col :span="4">
             <el-input
                size="small"
                style=" width: 100%;"
                clearable
                class="input-serach"
                v-model="date"
              ></el-input>
          </el-col>
          <el-col :span="2">
            <el-button
             type="primary"
             size="small"
             style=" width:90%;"
             @click="save()"
            >保存</el-button>
          </el-col>
          <el-col :span="2">
             <el-button
             type="primary"
             size="small"
             style=" width:90%;"
             @click="send()"
            >传输数据</el-button>
          </el-col>

    </el-row>
      
  </div>
</template>

<script>
// import {getAllIPList,postModifyIPList,sendFillRecord} from "../../utils/api"
export default {
  data(){
    return{
      date:''

    }
  },
  created(){
    this.getAllIPData()

  },
  methods:{
    getAllIPData(){
      getAllIPList().then((res)=>{
        this.date=res.data
        console.log(res)
      })
    },

    save(){
      postModifyIPList(this.date).then((res)=>{
        console.log(res)
      })
    },
    send(){
      sendFillRecord().then((res)=>{
        console.log(res)
      })

    }

  }

}
</script>

<style scoped lang="less">
 .dataSend{
   margin: 0 auto;
 }

</style>