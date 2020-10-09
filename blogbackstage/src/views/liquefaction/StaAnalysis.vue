<template>
  <div class="staAnalysisCon">
    <div class="leftCon">
      <div><StaffFiilling></StaffFiilling></div>
      <div><NumOfCylinders></NumOfCylinders></div>
    </div>
    <!-- <div class="rightCon"> -->
      <div><WeekFilling></WeekFilling></div>
      <div><MonthFilling></MonthFilling></div>
    <!-- </div> -->
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import StaffFiilling from "./StaAnalysisCom/StaffFiilling"
import NumOfCylinders from './StaAnalysisCom/NumOfCylinders'
import WeekFilling from './StaAnalysisCom/WeekFilling'
import MonthFilling from './StaAnalysisCom/MonthFilling'
export default {
  components:{
    StaffFiilling,
    NumOfCylinders,
    WeekFilling,
    MonthFilling
  }

}
</script>

<style scoped lang='less'>
.staAnalysisCon{
  width: 100%;
  .leftCon{
    display: flex;
    div{
    flex: 1;
    }
  }
  
 
}

</style>