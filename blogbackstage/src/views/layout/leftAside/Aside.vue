<template>
  <div class="aside_con" style="height: 100%">
    <!--logo栏位-->
    <!-- <div
      v-if="nav[0].LOGO && this.nav[0].LOGO.id === '1'"
      class="avatar avatar-flex bg"
      :style="{ width: getCollapseState == false ? '200px' : '64px' }"
    >
      <div>
        <a href="javascript:;">
          {{test}}
          <img
            :src="require('@/assets' + nav[0].LOGO.img)"
            alt=""
            :style="{ width: '50px', height: '50px' }"
          />
          <span>{{ nav[0].LOGO.title }}</span>
        </a>
      </div>
    </div> -->
     <div class="tabCon">
       <div class="tabsbody">
         <div class="tabbd1" v-show="tabNum==0">
           <el-menu
             :default-active="String(activeNav)"
             class="el-menu-vertical"
             :collapse="getCollapseState"
             :background-color="getAsideColor"
             :text-color="getATextColor"
             :active-text-color="getActiveColor"
             :unique-opened="getDoubleOpen"
             :default-openeds="defaultOpen"
             ref="menu"
             router
           >
          <!--动态生成sideItem-->
          <template v-for="(item, parentIndex) in nav[0].nav">
            <SideNav
              :item="item"
              :index="parentIndex"
              :state="getCollapseState"
              :key="parentIndex"
            ></SideNav>
           </template>
         </el-menu>
         </div>
         <div class="tabbd2" v-show="tabNum==1">
           <el-menu
             :default-active="String(activeNav)"
             class="el-menu-vertical"
             :collapse="getCollapseState"
             :background-color="getAsideColor"
             :text-color="getATextColor"
             :active-text-color="getActiveColor"
             :unique-opened="getDoubleOpen"
             :default-openeds="defaultOpen"
             ref="menu"
             router
           >
       
          <template v-for="(item, parentIndex) in nav2[0].nav">
            <SideNav
              :item="item"
              :index="parentIndex"
              :state="getCollapseState"
              :key="parentIndex"
            ></SideNav>
           </template>
         </el-menu>
         </div>
          <div class="tabbd2" v-show="tabNum==2">
           <el-menu
             :default-active="String(activeNav)"
             class="el-menu-vertical"
             :collapse="getCollapseState"
             :background-color="getAsideColor"
             :text-color="getATextColor"
             :active-text-color="getActiveColor"
             :unique-opened="getDoubleOpen"
             :default-openeds="defaultOpen"
             ref="menu"
             router
           >
          <!--动态生成sideItem-->
          <template v-for="(item, parentIndex) in nav3[0].nav">
            <SideNav
              :item="item"
              :index="parentIndex"
              :state="getCollapseState"
              :key="parentIndex"
            ></SideNav>
           </template>
         </el-menu>
         </div>
         <div class="tabbd2" v-show="tabNum==3">
           <el-menu
             :default-active="String(activeNav)"
             class="el-menu-vertical"
             :collapse="getCollapseState"
             :background-color="getAsideColor"
             :text-color="getATextColor"
             :active-text-color="getActiveColor"
             :unique-opened="getDoubleOpen"
             :default-openeds="defaultOpen"
             ref="menu"
             router
           >
          <!--动态生成sideItem-->
          <template v-for="(item, parentIndex) in nav4[0].nav">
            <SideNav
              :item="item"
              :index="parentIndex"
              :state="getCollapseState"
              :key="parentIndex"
            ></SideNav>
           </template>
         </el-menu>
         </div>
       </div>
    </div>
    
  </div>
</template>

<script>
import SideNav from "./SideNav";
import { mapGetters,mapState} from "vuex";
import Axios from "axios";
import style from "@/assets/css/public.css";
import { getNav,test } from "../../../utils/api";

export default {
  name: "Aside",
  data() {
    return {
      nav: [
        {
          nav: [
            {
              title: "工业气瓶标签发卡",
              path: "/IndustyLabel",
              iconn:'icon-bingzhuangtu'
            },
           
            {
              title: "气瓶信息导入",
              path: "/IndustyLending",
              iconn:'icon-guanyuwomen1'
            },
            
            {
              title: "气瓶打印",
              path: "/IndustyPrinting",
              iconn:'icon-data'
            },
            {
              title: "气瓶检验",
              path: "/IndustyTest",
            },
            
          ],
        },
      ], //左侧导航数据数组
      nav2: [
        {
          nav: [
            {
              title: "日志查询",
              path: "/LogQuery",
              iconn:"icon-rizhiguanli"
            },
            // {
            //   title: "版本更新",
            //   path: "/VersionUpadte",
            // },
            {
              title: "关于我们",
              path: "/AboutUs",
              iconn:'icon-guanyuwomen1'
            },
            
            {
              title: "数据发送地址",
              path: "/DataSending",
              iconn:'icon-data'
            }
          ],
        },
      ], //左侧导航数据数组
      nav3: [
        {
          nav: [
            {
              title: "车用气瓶发标签",
              path: "/VehiclesLabel",
              iconn:"icon-rizhiguanli"
            },
         
            {
              title: "气瓶信息导入",
              path: "/VehiclesLending",
              iconn:'icon-guanyuwomen1'
            },
            
            {
              title: "气瓶打印",
              path: "/VehiclesPrinting",
              iconn:'icon-data'
            },
            {
              title: "气瓶检验",
              path: "/VehiclesTest",
            },
          ],
        },
      ], //车用检验左侧导航数据数组
      nav4: [
        {
          nav: [
             {
              title: "液化气瓶标签发卡",
              path: "/LibLabel",
              iconn:'icon-bingzhuangtu'
            },
           
            {
              title: "气瓶信息导入",
              path: "/LiqLending",
              iconn:'icon-guanyuwomen1'
            },
            
            {
              title: "气瓶打印",
              path: "/LiqPrinting",
              iconn:'icon-data'
            },
            {
              title: "气瓶检验",
              path: "/LiqTest",
            },
          ],
        },
      ], //液化检验左侧导航数据数组
    defaultOpen: ["0"],
      test:"",
      activeName: 'second',
      tabsTitle:[
        {
          id:0,
          name:'液化气瓶'
        },
        {
          id:1,
          name:'系统管理'
        }
      ],
  
    };
  },
  watch:{
    tabNum(){
      if(this.tabNum==0){
      this.$store.dispatch("header/setNavs", {
        nav:this.nav[0].nav,
      });
    }else if(this.tabNum==1){
      this.$store.dispatch("header/setNavs", {
        nav:this.nav2[0].nav,
      });
    }else if(this.tabNum==2){
      this.$store.dispatch("header/setNavs", {
        nav:this.nav3[0].nav,
      });
    }else if(this.tabNum==3){
      this.$store.dispatch("header/setNavs", {
        nav:this.nav4[0].nav,
      });
    }

    }
   
  },
  computed: {
    activeNav() {
      //当前激活的导航
      return this.$route.path;
    },
    /*
     * 在VUEX中获得asideColor颜色值
     * */
    ...mapState(["tabNum"]),
    ...mapGetters({
      getAsideColor: "globalSetting/AsideColor",
      getATextColor: "globalSetting/ATextColor",
      getActiveColor: "globalSetting/ActiveColor",
      getDoubleOpen: "globalSetting/DoubleOpen",
      getCollapseState: "header/CollapseState",
    }),
  },
  created() {
    if(this.tabNum==0){
      this.$store.dispatch("header/setNavs", {
        nav:this.nav[0].nav,
      });
    }else if(this.tabNum==1){
      this.$store.dispatch("header/setNavs", {
        nav:this.nav2[0].nav,
      });
    }else if(this.tabNum==2){
      this.$store.dispatch("header/setNavs", {
        nav:this.nav3[0].nav,
      });
    }else if(this.tabNum==3){
      this.$store.dispatch("header/setNavs", {
        nav:this.nav4[0].nav,
      });
    }
      
    //获得导航的json数据
    console.log(location);
    // getNav().then(res=>{
    //   console.log(res)
    //  //把导航数据存入vuex中
    //     this.$store.dispatch('header/setNavs', {
    //     nav : res.nav
    //   })
    //   this.nav = res
    //   console.log(res.nav)
    // })

    // Axios({
    //   url: "/api/nav.json?t=" + new Date().getTime().toString(),
    //   headers: {},
    //   emulateJSON: true,
    //   method: "get",
    // }).then((res) => {
    //   //把导航数据存入vuex中
    //   console.log(res.data);
    //   this.$store.dispatch("header/setNavs", {
    //     nav: res.data.nav,
    //   });
    //   this.nav = res.data;
    // });
  },
  methods:{
      handleTab(val){
        this.tabChange=val
        console.log(val)
      }
  },
  components: {
    SideNav,
  },
};
</script>

<style scoped lang='less'>
// @import "~font-awesome/css/font-awesome.min.css";
 /deep/.el-menu-item{
   background-color: transparent !important;

 }

.el-menu-vertical:not(.el-menu--collapse) {
  padding-top: 60px;
  width: 200px;
  min-height: 400px;
  height: calc(100% - 60px);
}

.aside-show {
  width: 200px;
  max-width: 200px;
  min-height: 400px;
  height: 100%;
}

.aside-hide {
  width: 64px;
  max-width: 64px;
  min-height: 400px;
  height: 100%;
}

.el-menu--collapse {
  height: 100%;
  margin-top: 60px;
}

.el-submenu [class^="fa"] {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 16px;
}
.el-menu{
  background-color: transparent !important;
}

.aside_con {
  border-right: 1px solid #b1d3ff;
  // background: linear-gradient(to top,#b1d3ff,#b1d3ff,#ffffff) !important;
}
</style>
