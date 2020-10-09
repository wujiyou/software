<template>
  <div class="side_con" :class="{'menu-wrapper': state}">
    <!--没有子导航-->
    <el-menu-item v-if="!item.child" :index="item.path">
      <i v-if="item.icon" :class="item.icon" :style="{color: getTextColor}"></i>
      <span slot="title"><i class="iconfont  iconI" :class="item.iconn"></i>{{item.title}}</span>
    </el-menu-item>
    <!--有子导航-->
    <el-submenu v-else :index="String(index+1)">
      <template slot="title">
        <!--如果item有icon才添加icon图标-->
        <i v-if="item.icon" :class="item.icon" :style="{color: getTextColor}"></i>
        <span slot="title">{{item.title}}</span>
      </template>
      <!--判断子导航是否存在下一级的子导航，如果没有则渲染自己，如果有则递归组件-->
      <!--如果子导航中没有存在下一级的子导航 则是<el-menu-item> 否则为<el-submenu>-->
      <template v-for="(cItem, cIndex) in item.child" :index="String(index+1+'-'+cIndex+1)">
        <!-- :style="{color: getTextColor}" -->
        <el-menu-item v-if="!cItem.child" :index="cItem.path"><i v-if="item.icon" :class="item.icon" ></i>{{cItem.title}}</el-menu-item>
        <el-submenu v-else :index="String(index+1+'-'+cIndex+1)">
          <i v-if="item.icon" :class="cItem.icon"></i>
          <span slot="title">{{cItem.title}}</span>
          <!--递归自己 遍历子..导航-->
          <template v-for="(item, parentIndex) in cItem.child">
            <SideNav :item="item" :index="parentIndex"></SideNav>
          </template>
        </el-submenu>
      </template>
    </el-submenu>
  </div>
</template>

<script>
 import {mapGetters} from "vuex"
  export default {
    name: "SideNav",
    props: {
      item: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      state: {
        type: Boolean,
        required: true
      }
    },
    computed: {
        ...mapGetters({
        getCollapseState: 'header/CollapseState'
      }),
      getTextColor() { //图标颜色 对应文字的颜色
        return this.$store.state.globalSetting.aTextColor
      }
    }
  }
</script>

<style scoped lang='less'>
  .el-submenu [class^=fa] {
    vertical-align: middle;
    /* margin-right: 5px; */
    width: 24px;
    text-align: center;
    font-size: 16px;
  }
  .menu-wrapper span[slot="title"] {
    display: none;
  }
  .el-menu-item.is-active{
    color: #fff !important;
    background: #20A2FF !important;
   
  }

  .el-menu-item{
    background-color: #fff !important;
    height: 48px !important;
    line-height: 48px;
    height: 48px;
    // width: 159px;
    margin: 0 auto;
    margin-bottom: 20px;
    border-radius: 8px;
    color: #343434;
    font-size: 16px;
  }

 
   .iconI{
     margin-right: 20px;
   }
</style>