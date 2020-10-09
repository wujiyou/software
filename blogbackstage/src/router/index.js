import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const welcome = () => import('../views/Welcome')
const nav = () => import('../views/SetNav')
const mineInfo = () => import('../views/MineInfo')
const quillEditor = () => import('../views/QuillEditor')
const articleManager = () => import('../views/ArticleManager')
const mail = () => import('../views/Mail')
const homeUpdatePass = () => import('../views/HomeUpdatePass')
const login = () => import('../views/Login')
const register = () => import('../views/Register')
const home = () => import('../components/Home')
const profile = () => import('../views/Profile')
const notPath = () => import('../views/error/NotPath_404')
const slider = () => import('../views/base/Slider')
const uploadFile = () => import('../views/base/UploadFile')
const uplo = () => import('../views/uplo')


//系统管理
const LogQuery = () => import('../views/systemManagement/LogQuery')
const AboutUs = () => import('../views/systemManagement/AboutUs')
const DataSending = () => import('../views/systemManagement/DataSending')
// 车用气瓶检测
const VehiclesLabel = () => import('../views/vehicles/VehiclesLabel')
const VehiclesLending = () => import('../views/vehicles/VehiclesLending')
const VehiclesPrinting = () => import('../views/vehicles/VehiclesPrinting')
const VehiclesTest = () => import('../views/vehicles/VehiclesTest')
//液化气瓶检测
const LibLabel = () => import('../views/liquefaction/LibLabel')
const LiqLending = () => import('../views/liquefaction/LiqLending')
const LiqPrinting = () => import('../views/liquefaction/LiqPrinting')
const LiqTest = () => import('../views/liquefaction/LiqTest')
//工业气瓶检测
const IndustyLabel = () => import('../views/industy/IndustyLabel')
const IndustyLending = () => import('../views/industy/IndustyLending')
const IndustyPrinting = () => import('../views/industy/IndustyPrinting')
const IndustyTest = () => import('../views/industy/IndustyTest')





const CarMessage = () => import('../views/message/CarMessage')
const IndustryMessage = () => import('../views/message/IndustryMessage')
const LibMessage = () => import('../views/message/LibMessage')
const CarReport = () => import('../views/report/CarReport')
const IndustryReport = () => import('../views/report/IndustryReport')
const LiqReport = () => import('../views/report/LiqReport')
const CarLabel = () => import('../views/superviseLabel/CarLabel')
const IndustryLabel = () => import('../views/superviseLabel/IndustryLabel')



const routes = [
  {
    path: '/',
    redirect: '/VehiclesLabel',
    
  },
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  // { //注册页面
  //   path: '/register',
  //   meta: {
  //     title: '注册页面'
  //   },
  //   component: register
  // },
  // {
  //   path: '/login',
  //   meta: {
  //     title: '登录页面'
  //   },
  //   component: login
  // },
  {
    path: '/404',
    meta: {
      title: '错误页面-404'
    },
    component: notPath
  },
  {
    path: '/home',
    redirect: '/welcome',
    component: home,
    children: [
      //系统管理
      {
        path:'/LogQuery',
        meta:{
          title:"日志查询"
        },
        component:LogQuery
      },
      {
        path:'/AboutUs',
        meta:{
          title:"关于我们"
        },
        component:AboutUs
      },
      {
        path:'/DataSending',
        meta:{
          title:"数据发送地址"
        },
        component:DataSending
      },
      
      //车用气瓶检测
      {
        path:'/VehiclesLabel',
        meta:{
          title:"车用气瓶发标签"
        },
        component:VehiclesLabel
      },
      {
        path:'/VehiclesLending',
        meta:{
          title:"气瓶信息导入"
        },
        component:VehiclesLending
      },
      {
        path:'/VehiclesPrinting',
        meta:{
          title:"气瓶打印"
        },
        component:VehiclesPrinting
      },
      {
        path:'/VehiclesTest',
        meta:{
          title:"气瓶检验"
        },
        component:VehiclesTest
      },
      //液化气瓶检测LiqTest
      {
        path:'/LiqLending',
        meta:{
          title:"液化气瓶信息导入"
        },
        component:LiqLending
      },
      { 
        path: '/LibLabel',
        meta: {
          title: '液化气瓶标签发卡'
        },
        component: LibLabel
      },
      {
        path:'/LiqPrinting',
        meta:{
          title:"气瓶打印"
        },
        component:LiqPrinting
      },
      { 
        path: '/LiqTest',
        meta: {
          title: '液化气瓶检测'
        },
        component: LiqTest
      },
      //工业气瓶检测LiqTest
      {
        path:'/IndustyLending',
        meta:{
          title:"工业气瓶信息导入"
        },
        component:IndustyLending
      },
      { 
        path: '/IndustyLabel',
        meta: {
          title: '工业气瓶标签发卡'
        },
        component: IndustyLabel
      },
      {
        path:'/IndustyPrinting',
        meta:{
          title:"气瓶打印"
        },
        component:IndustyPrinting
      },
      { 
        path: '/IndustyTest',
        meta: {
          title: '工业气瓶检测'
        },
        component: IndustyTest
      },

    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

/*
* 全局前置路由
* */
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title
//   if (to.matched.length === 0) {
//     next('/404')
//   }
//   //校验是否登录，防止不登录，直接进入其他页面
//   if ((to.path == '/login' && from.path === '/') || (to.path == '/welcome' && from.path === '/login')) {
//     next()
//   } else {
//     if (sessionStorage.getItem('profile') === null) {
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })


//重写路由的push方法
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router
