<template>
  <div class="pieCon">
      <div id="pie" :style="barChartSty"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
// import  'echarts/lib/chart/bar';
// import 'echarts/src/chart/pie';
// import {getNumOfCylinders} from '../../../utils/api'
export default {
    data(){
        return{
           datas:[
                // {value: 310, name: '邮件营销'},
                // {value: 274, name: '联盟广告'},
                // {value: 235, name: '视频广告'},
                // {value: 400, name: '搜索引擎'}
           ],
           da:[],
           da2:[]
        }
    },
    mounted(){
        getNumOfCylinders().then((res)=>{
           console.log(res)
           for(let key in res.data){
             this.datas.push({name:key,value:res.data[key]})
             }
             this.inits();
           })
    },
    props:{
      y:{
        type:String,
        default:"70%"
      },
       barChartSty:{
        type:String,
        default:"width: 100%;height:30vh;"
      },
      doFontSize:{
        type:String
      }

    },
    methods:{
      inits() {
        this.myChart = echarts.init(document.getElementById("pie"));
      var _this = this;
      this.myChart.setOption({
        title: {
          text: "气瓶状态占比统计",
          x: "10%",
          y: 16,
          textStyle: {
              color: "#000"
            }
        },
          tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
         
        series: [
          {
            name: "半径模式",
            zoom: 2,
            type: "pie",
            radius: [0, "40%"],//调整表的大小
            // center: ["50%", _this.y],
            
            data: _this.datas
          }
        ],
      
        roseType: "angle"
      });
      window.addEventListener("resize", function() {
        _this.myChart.resize();
      });
    }
    }

}
</script>

<style>
.pieCon {
  display: flex;
  padding-right: 10%;
}
.daCon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 80px;
}

.pieCon div .upDiv .num1 {
  font-size: 23px;
  flex: 1;
}
.pieCon div .upDiv .num2 {
  flex: 1;
  font-size: 12px;
  color: #61a7fe;
}
.pieCon div .upDiv .num2 span {
  display: inline-block;
  width: 4px;
  border: 1px solid red;
  background-color: red;
  height: 12px;
  margin-right: 4px;
}
.pieCon div .downDiv {
  margin-top: 20%;
}
.pieCon div .downDiv .num1 {
  font-size: 23px;
  /* flex: 1; */
}
.pieCon div .downDiv .num2 {
  font-size: 12px;
  color: #61a7fe;
}
.pieCon div .downDiv .num2 {
  font-size: 12px;
  color: #61a7fe;
}
.pieCon div .downDiv .num2 span {
  display: inline-block;
  width: 4px;
  border: 1px solid #eacf19;
  background-color: #eacf19;
  height: 12px;
  margin-right: 4px;
}

</style>