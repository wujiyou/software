<template>
  <div class="up_con"> 
      <p>特使</p>
      <!-- <el-col style="padding: 10px 0 20px;">
    <el-button
     class="pull-right"
     icon="el-icon-upload"
     type="primary"
     size="mini"
     @click="importFile()"
    >批量导入</el-button>
    <el-button
     class="pull-right right-10"
     icon="el-icon-download"
     type="primary"
     size="mini"
     @click="downloadFile('档案模板')"
    >模板下载</el-button> -->
    <!-- <el-button
     size="mini"
     type="primary"
     icon="el-icon-plus"
     class="pull-right"
     @click="addRow"
    >新增</el-button> -->
    <!-- <div class="pull-right">
     <el-input
      placeholder="请输入编码,名称"
      prefix-icon="el-icon-search"
      v-model="FinQueryParams.archiveFilter"
      size="mini"
     ></el-input>
    </div> -->
   </el-col>
　　
 <!-- 批量导入Dialog开始 -->
  <!-- <uploadTemp
   :apiURL="fileUploadUrl"
   ref="refFileUpload"
   :Refresh="Refresh"
   :OtherParams="{brandId: QueryParams.BrandID}"
  ></uploadTemp> -->
  <!-- 批量导入Dialog结束 -->
  </div>
</template>

<script>
export default {
    methods:{
       importFile() {
            this.$refs.refFileUpload.open();
        },
        //文件上传
       submitFile() {
             const _this = this;
             if (!_this.files.name) {
                 _this.$message.warning("请选择要上传的文件！");
                 return false;
             }
             let fileFormData = new FormData();
             //filename是键，file是值，就是要传的文件
             fileFormData.append("file", _this.files, _this.files.name);
             if(_this.OtherParams){
              const keys=Object.keys(_this.OtherParams);
              keys.forEach(e=>{
               fileFormData.append(e, _this.OtherParams[e]);
              })
             }
             let requestConfig = {
              headers: {
               "Content-Type": "multipart/form-data"
              }
             };
             AjaxHelper.post(_this.apiURL, fileFormData, requestConfig)
              .then(res => {
               console.log(res);
               if (res.success) {
                const result = res.result;
                if (result.errorCount == 0 && result.successCount > 0) {
                 _this.$message({
                  message: `导入成功,成功${result.successCount}条`,
                  type: "success"
                 });
                 _this.closeFileUpload();
                 _this.Refresh();
                } else if (result.errorCount > 0 && result.successCount >= 0) {
                 _this.Refresh();
                 _this.tableData = result.uploadErrors;
                 _this.successCount = result.successCount;
                 _this.innerVisible = true;
                } else if (result.errorCount == 0 && result.successCount == 0) {
                 _this.$message({
                  message: `上传文件中数据为空`,
                  type: "error"
                 });
                }
               }
              })
              .catch(function(error) {
               console.log(error);
              });
            },　
       },
       //文件下载
       downloadFile(name) {
          let requestConfig = {
           headers: {
            "Content-Type": "application/json;application/octet-stream"
           }
          };
          AjaxHelper.post(this.downLoadUrl, requestConfig, {
           responseType: "blob"
          }).then(res => {
           // 处理返回的文件流
           const content = res.data;
           const blob = new Blob([content]);
           var date =
            new Date().getFullYear() +
            "" +
            (new Date().getMonth() + 1) +
            "" +
            new Date().getDate();
           const fileName = date + name + ".xlsx";
           if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
           } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
           }
          });
  },

}
</script>

<style lang="less" scoped>
.up_con{
    p{
        font-size: 20px;
        color: brown;

    }
}

</style>