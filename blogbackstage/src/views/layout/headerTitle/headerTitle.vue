<template>
  <div class="headerCon">
      <div class="tabTitle">
         <div class="tab1" v-for="(item,i) in tabsTitle" :key="i"  @click="handleTab(item.id)">
           <img :src="item.url"/>
           <span class="sysName">{{item.name}}</span>
          </div>
          <div class="rightBox">
            <div class="title">检测气瓶管理系统</div>
            <div class="refsh">
                <el-tooltip class="item" effect="dark" content="刷新页面" placement="bottom">
                <p multiBtn @click="$router.go(0)"><i class="el-icon-refresh"></i></p>
               </el-tooltip> 
            </div>
          </div>
          
       </div>
     
  </div>
</template>

<script>
 import {mapMutations} from 'vuex'
export default {
    data(){
        return{
          tabsTitle:[
            {
              id:0,
              name:'工业气瓶',
              url:require('../../../assets/imgs/qp.png')
            },
            {
              id:2,
              name:'车用气瓶',
              url:require('../../../assets/imgs/qp.png')
            },
            {
              id:3,
              name:'液化气瓶',
              url:require('../../../assets/imgs/qp.png')
            },
            {
              id:1,
              name:'系统管理',
              url:require('../../../assets/imgs/manag.png')
            }
        ],
        }
    },
    methods:{
        // ...mapMutations("changeTab"),
        handleTab(val){
           this.$store.commit("changeTab",val)
      },
   
    }

}
</script>

<style scoped lang='less'>
 .refsh{
  //  margin-left: 80%;
 }
 .headerCon{
     height: 100%;
     width: 100vw;
     background: #20A2FF;
     width: 100%;
     padding-left: 50px;
     color: black;
     .tabTitle{
        display: flex;
        .tab1{
          width: 100px;
          background: #fff;
          height: 65px;
          margin-right: 30px;
          border: 1px solid #b1d3ff;
          border-radius: 5px;
          cursor: pointer;
          box-shadow:4px 5px 6px 0px rgba(10, 133, 204, 0.5) ;
          .sysName{
            display: inline-block;
            width: 16px;
            font-size: 12px;
            color: #20A2FF;
          }
        }
       }
      .rightBox{
        width: 100%;
        display: flex;
       align-items: center;
        .title{
          flex: 10;
          text-align: center;
          font-size: 24px;
          color: #fff;
        }
        .refsh{
         text-align: center;
          flex: 1;
          color: #fff;
        }
      }
 }
</style>
