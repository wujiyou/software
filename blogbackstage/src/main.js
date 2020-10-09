import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'
import '@/assets/font/iconfont.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import moment from 'moment'
import $ from 'jquery'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'YqXDhQqktH1q9IW29OYtiC5NsjrOUL13'
})

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(NProgress)

/**
 * 引入axios网络请求
 */
import axios from 'axios';
import vueAxios from 'vue-axios';
Vue.use(vueAxios, axios);

//全局进度条配置
NProgress.configure({
  showSpinner: true,
  parent: 'body',
  easing: 'ease',
  speed: '500'
})
// 全局过滤器  处理日期
Vue.filter('fmtdate',(v)=>{
  // console.log(v);
  
  if(v=== null){
       return "0:0:0";
  }else{
    return moment(v).format('YYYY-MM-DD')
  }
  // return moment(v).format('YYYY-MM-DD')
 
})

/*
* 全局前置路由 在路由进入前start进度条
* */
router.beforeEach((to, from ,next) => {
  NProgress.start()
  next()
})

/*
* 全局后置路由 在路由完成时done进度条
* */
router.afterEach( () => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

