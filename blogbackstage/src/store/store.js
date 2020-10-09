import Vue from 'vue'
import Vuex from 'vuex'
import globalSetting from "./modules/globalSetting"
import header from "./modules/header"
import code from "./modules/code"

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    tabNum:0
  },
  mutations:{
    changeTab(state,value){
      console.log(value)
      state.tabNum=value
    }
  },
  modules: {
    globalSetting,
    header,
    code
  }
})