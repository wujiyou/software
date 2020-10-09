<template>
  <!-- <el-container>
  <el-header>
   <headerTitle></headerTitle>
    </el-header>
  <el-container>
    <el-aside width="200px">
      <Aside></Aside>
      </el-aside>
    <el-main>
       <AsideTitle></AsideTitle>
       <keep-alive>
            <router-view :style="{padding: '0 20px', marginTop: '55px'}"></router-view>
        </keep-alive>
    </el-main>
  </el-container>
</el-container> -->
  <el-container>
    <el-header class="headerPos">
       <headerTitle></headerTitle>
    </el-header>
    <el-container class="container-aside" :style="{paddingLeft: (getCollapseState == false?'200px':'64px')}">
      <el-aside style="width: auto" class="aside aside-flex"
              :class="{'aside-show': getCollapseState == false?true:false,
                      'aside-hide':getCollapseState == true?true:false}">
      <Aside></Aside>
    </el-aside>
      <el-main :style="{ paddingLeft: '0', paddingRight: '0'}">
        <AsideTitle></AsideTitle>
        <transition name="compAnimate" appear>
          <keep-alive>
            <router-view :style="{padding: '0 20px', marginTop: '23px'}"></router-view>
          </keep-alive>
        </transition>
      </el-main>
      <Footer></Footer>
    </el-container> 
  </el-container>
</template>

<script>
  import Aside from "../views/layout/leftAside/Aside"
  import Header from "../views/layout/rightMain/Header"
   import headerTitle from "../views/layout/headerTitle/headerTitle"
  import GlbSetting from "./GlbSetting"
  import AsideTitle from "../views/layout/rightMain/AsideTitle";
  import Crumbs from "../views/layout/rightMain/Crumbs"
  import Footer from "../views/layout/rightMain/Footer";
  import {mapGetters} from 'vuex'
  import style from "../assets/css/public.css"

  export default {
    name: "Home",
    computed: {
      /*
      * 在VUEX中获得asideColor颜色值
      * */
      ...mapGetters({
        getCollapseState: 'header/CollapseState',
        getNavs: 'header/Navs',
        getAsideTitle: 'header/AsideTitle',
        getCount: 'header/Count'
      })
    },
    watch: {
      '$route': function (to) {
        console.log(to)
        this.createTabs(to.path)
      }
    },
    methods: {
      /**
       * 动态添加标题标签函数
       * path：当前点击左侧导航的path
       * 1.首先会处理welcome（首页）页，welcome页已在vuex中初始化了，所以，当用户再次点击时，直接定位到首页即可
       * 2.如果不是首页，则会通过当前导航的path去和左侧导航数据比对，如果path相等存入vuex asideTitle
       * 3.如果vuex的asideTitle已有数据，再次点击时，只定位，不新增
       * 注意：vuex中的count（标题标签的增值变量，可以保证每次添加的标题标签不重复，作用于后面的标题标签定位），count每次进来都需要自增，保证唯一，默认为0
       * vuex中的asideTitle格式：
       * {
            title: '主控制台', // title name
            path: '/welcome',  //title the path
            activeIndex: 0 //default value
          }
       *
       * */
      createTabs(path) {
        if (path !== '/welcome') {
          let asideItem = new Object()
          //得到当前点击的左侧导航的名字，存入vuex的header/asideTitle中
          let nav = this.getNavs.nav
          for (let i = 0; i < nav.length; i++) {
            const parentTitle = nav[i].title
            //判断是否存在子导航，如果存在则取子导航的名字，如果没有，则取当前的导航名字
            if (nav[i].child) {
              for (let j = 0; j < nav[i].child.length; j++) {
                if (nav[i].child[j].path === path) {
                  const childTitle = nav[i].child[j].title
                  //判断vuex中是否已经存在当前标题，如果存在则不处理，否则添加入vuex中
                  let result = this.getAsideTitle.filter(item => {
                    return item.title === nav[i].child[j].title
                  })
                  if (result.length == 0) {
                    //添加标题标签
                    let count = this.getCount
                    count++
                    this.$store.commit('header/setCount', count)
                    asideItem.title = nav[i].child[j].title
                    asideItem.path = nav[i].child[j].path
                    asideItem.activeIndex = count
                    this.$store.commit('header/setAside', asideItem)
                    this.$store.commit('header/setActiveIndex', count)
                    this.setCrumbs(parentTitle, childTitle)
                    return
                  } else {
                    //定位到当前标题标签
                    if (nav[i].child[j].path === path) {
                      let result = this.getAsideTitle.filter( item => {
                        return item.title === nav[i].child[j].title
                      })
                      this.$store.commit('header/setActiveIndex', result[0].activeIndex)
                      this.setCrumbs(parentTitle, childTitle)
                    }
                  }
                }
              }
            } else {
              if (nav[i].path === path) {
                //判断vuex中是否已经存在当前标题，如果存在则不处理，否则添加入vuex中
                let result = this.getAsideTitle.filter(item => {
                  return item.title === nav[i].title
                })
                const childTitle = nav[i].title
                //添加标题标签
                if (result.length == 0) {
                  let count = this.getCount
                  count++
                  this.$store.commit('header/setCount', count)
                  asideItem.title = nav[i].title
                  asideItem.path = nav[i].path
                  asideItem.activeIndex = count
                  this.$store.commit('header/setAside', asideItem)
                  this.$store.commit('header/setActiveIndex', count)
                  this.setCrumbs(childTitle, '')
                  return
                } else {
                  //定位到当前标题标签
                  if (nav[i].path === path) {
                    let result = this.getAsideTitle.filter( item => {
                      return item.title === nav[i].title
                    })
                    this.$store.commit('header/setActiveIndex', result[0].activeIndex)
                    this.setCrumbs(childTitle, '')
                  }
                }
              }
            }
          }
        } else {
          this.$store.commit('header/setActiveIndex', 0)
          this.setCrumbs('控制台','气瓶档案管理')
        }
      },
      setCrumbs(pt,ct) {
        let crumbs = new Array()
        crumbs.push(pt,ct)
        this.$store.commit('header/setCrumbs', crumbs)
      }
    },
    components: {
      Aside,
      Header,
      GlbSetting,
      AsideTitle,
      Crumbs,
      Footer,
      headerTitle
    }
  }
</script>

<style scoped>
 .headerPos{
   position: sticky;
   top: 0;
   z-index: 10;
 }
  .aside{
    box-shadow: none;
  }

  .el-aside {
    color: #333;
    margin-top: 70px;
  }

  .el-tabs--card > .el-tabs__header {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 1000;
    opacity: 1;
    background-color: #FFFFFF;
    margin: 0;
    padding-right: 20px;
  }
  .el-header{
    height: 70px !important;
    padding: 0;
  }

  .el-row {
    margin-bottom: 15px;
  }

  /*组件过渡动画*/
  .compAnimate-enter {
    opacity: 0;
    transform: translateY(-60px);
  }

  .compAnimate-leave-to {
    opacity: 0;
  }

  .compAnimate-enter-active {
    transition: all .8s ease-in-out;
  }
  .compAnimate-leave-active {
    transition: all .2s ease;
  }






  /* .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  } */

</style>