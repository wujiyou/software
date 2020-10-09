<template>
  <div>
    <div id="MonthFilling" :style="zexianSty"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// import {getMonthNum} from '../../../utils/api'
export default {
  data() {
    return {
      myChart: "",

      yMax: 500,
      dataShadow: [],
      data:[]
      // data:[]
    };
  },
  props: {
    zexianSty: {
      type: String,
      default: "width: 100%;height:25vh;",
    },
  },
  mounted() {
      getMonthNum().then((res)=>{
          for(let key in res.data){
              this.data.push(key)
              this.dataShadow.push(res.data[key])
          }
          this.init()
      })
      

  },
  methods: {
    init() {
      this.myChart = echarts.init(document.getElementById("MonthFilling"));
      var _this = this;
      var option = {
        title: {
          text: "每月充装次数统计",
          x: "5%",
          y: 0,
          textStyle: {
            color: "#000",
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            return params[0].name +'月'+ "<br/>" + "充装次数:" + params[0].value;
          },
        },
        grid: {
          x: "10%",
          y: "20%",
          x2: "10%",
          y2: "20%",
          borderWidth: 1,
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              color: "#000",
            },
          },
          type: "category",
          boundaryGap: false,
          data: this.data,
        },
        yAxis: {
          axisLabel: {
            textStyle: {
              color: "#000",
            },
          },
          type: "value",
        },
        series: [
          {
            data: this.dataShadow,
            // radius: [0, "80%"],//调整表的大小
            center: ["50%", "50%"],
            type: "line",
            textStyle: {
              fontSize: 15,
              color: "#fff",
            },
            areaStyle: {
              normal: {
                color: "green", //改变区域颜色
              },
            },
            itemStyle: {
              normal: {
                color: "#8cd5c2", //改变折线点的颜色
                lineStyle: {
                  color: "green", //改变折线颜色
                },
              },
            },
          },
        ],
      };
      window.addEventListener("resize", function () {
        _this.myChart.resize();
      });
      this.myChart.setOption(option);
    },
  },
};
</script>

<style>
</style>