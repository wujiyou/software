<template>
<el-pagination
        style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
        background
        @size-change="handleSizeChange"
        @current-change="currentC"
        :current-page="page"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
  <!-- <el-pagination
    :page-size="10"
    layout="total, prev, pager, next"
    :total="total"
    @current-change="currentC"
    :style="{textAlign: 'center'}">
  </el-pagination> -->
</template>

<script>
  export default {
    name: "Paging",
    props: {
      total: {
        type: Number,
        required: true,
      },
       page:{
         type:Number,
         default:1

       }
    },
    methods: {
      //当前页发生改变时触发
      currentC(page) {
        this.$emit('curr-page', page)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
       
    },
    }
  }
</script>

<style scoped>

</style>