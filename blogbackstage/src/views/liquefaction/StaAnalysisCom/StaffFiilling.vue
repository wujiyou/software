
<template>
  <div class="barCon">
    <div ref="bar" id="bar" :style="barChartSty"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// import {getStaffFiilling} from '../../../utils/api'
export default {
  data() {
    return {
      dataAxis: [],
      myChart: "",
      data: [],
      // yMax:10,
      dataShadow: [],
    };
  },
  props: {
    y: {
      type: String,
      default: "50%",
    },
    barChartSty: {
      type: String,
      default: "width: 100%;height:26vh;",
    },
    doFontSize: {
      type: String,
    },
  },
  mounted(){
    
    getStaffFiilling().then((res)=>{
      console.log(res)
      res.data.forEach((v)=>{
        this.dataAxis.push(v.name)
        this.data.push(v.values)

      })
      this.initd()
    })
    console.log(this.$refs.bar)

  },
  methods: {
    initd() {
      this.myChart = echarts.init(document.getElementById("bar"));
      var _this = this;
      for (var i = 0; i < this.data.length; i++) {
        this.dataShadow.push(this.yMax);
      }
      var option = {
        title: {
          text: "员工充装次数统计",
          x: "10%",
          y: "5%",
          textStyle: {
            color: "#000",
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            return "姓名:"+params[0].name + "<br/>" + "充装次数:" + params[0].value;
          },
        },
        grid: {
          x: "20%",
          y: "24%",
          x2: "10%",
          y2: "23%",
          borderWidth: 1,
        },
        xAxis: {
          data: this.dataAxis,
          axisLabel: {
            textStyle: {
              color: "#000",
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#000",
            },
          },
        },
        dataZoom: [
          {
            show: true,
            height: 5,
            xAxisIndex: [0],
            bottom: 20,
            showDetail: false,
            showDataShadow: false,
            borderColor: "transparent",
            textStyle: {
              fontSize: 0,
            },
            endValue: 10, //从0开始的相当于5个
            //   backgroundColor: "rgba(0,0,0,0)",
            borderWidth: 0,

            handleSize: "0%",
            handleStyle: {
              color: "#d3dee5",
            },
          },
        ],
        series: [
          {
            // For shadow
            type: "bar",
            center: [0, _this.y],
            itemStyle: {
              color: "rgba(0,0,0,0.05)",
            },
            barGap: "-100%",
            // barCategoryGap: "40%",
            data: this.dataShadow,
            animation: false,
          },
          {
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
            data: this.data,
          },
        ],
      };

      this.myChart.setOption(option);
      window.addEventListener("resize", function () {
        _this.myChart.resize();
      });
    },
  },
};
</script>

<style>
.barCon {
  display: flex;
  padding-right: 10%;
  /* padding-left: 4%; */
}
.daCon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.barCon div .upDiv .num1 {
  font-size: 23px;
  flex: 1;
}
.barCon div .upDiv .num2 {
  flex: 1;
  font-size: 12px;
  color: #61a7fe;
}
.barCon div .upDiv .num2 span {
  display: inline-block;
  width: 4px;
  border: 1px solid red;
  background-color: red;
  height: 12px;
  margin-right: 4px;
}
.barCon div .downDiv {
  margin-top: 20%;
}
.barCon div .downDiv .num1 {
  font-size: 23px;
  /* flex: 1; */
}
.barCon div .downDiv .num2 {
  font-size: 12px;
  color: #61a7fe;
}
.barCon div .downDiv .num2 {
  font-size: 12px;
  color: #61a7fe;
}
.barCon div .downDiv .num2 span {
  display: inline-block;
  width: 4px;
  border: 1px solid #eacf19;
  background-color: #eacf19;
  height: 12px;
  margin-right: 4px;
}
</style>