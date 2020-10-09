<template>
  <div>
    <div id="zx" :style="zexianSty"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// import {getWeekNum} from '../../../utils/api'
export default {
  data() {
    return {
      myChart: "",

      // yMax: 500,
      dataShadow: [],
      data:["周一","周二","周三","周四","周五","周六","周日"]
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
    getWeekNum().then(res=>{
      console.log(res)
      for(let key in res.data){
        this.dataShadow.push(res.data[key])
      }
      this.init()
      console.log(this.dataShadow)
    })
      

  },
  methods: {
    init() {
      this.myChart = echarts.init(document.getElementById("zx"));
      // for (var i = 0; i < this.data.length; i++) {
      //   this.dataShadow.push(this.yMax);
      // }
      var _this = this;
      var option = {
        title: {
          text: "上周订单活跃情况",
          x: "5%",
          y: 0,
          textStyle: {
            color: "#000",
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            console.log(params)
            return params[0].name + "<br/>" + "订单量:" + params[0].value;
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