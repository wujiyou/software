import service from './axios';

//液化气瓶模块

// 气瓶信息导入
//获取表格所有数据
export const getAllGasList = (val) => {
    console.log(val)
    return service({
        url:`/archives/select/all?currPage=${val.currpage}&pageSize=${val.pageSize}`,
        method: 'get',
    })
};
//查询搜索框内容
export const getSearchGasList = (val) => {
    console.log(val)
    return service({
        url:`/archives/select/all?currPage=${val.currpage}&pageSize=${val.pageSize}&gasId=${val.gasId}&rstatus=${val.medium}`,
        method: 'get',
    })
};
//添加信息
export const getAllGasBottle = (val) => {
    console.log(val)
    return service({
        url:`/archives/save`,
        method: 'post',
        headers:{'contentType': 'application/json;charset=UTF-8'},
        data: val
    })
};
//修改信息
export const putAllGasBottle = (val) => {
    console.log(val)
    return service({
        url:`/bottle`,
        method: 'put',
        headers:{'contentType': 'application/json;charset=UTF-8'},
        data: val
    })
};
//删除信息
export const deleteGasBottle = (val) => {
    console.log(val)
    return service({
        url:`/bottle/delete`,
        method: 'post',
        headers:{'contentType': 'application/json;charset=UTF-8'},
        data: val
    })
};

//下载模板
export const postExcelModd = (val) => {
    console.log(val)
    return service({
        url:`/file/download`,
        method: 'post',
        headers: {"Content-Type": "application/x-download"},
        responseType: "blob"
    })
};
//下载气瓶信息档案
export const postAllExcel = (val) => {
    console.log(val)
    return service({
        url:`/file/creat`,
        method: 'post',
        headers: {"Content-Type": "application/x-download"},
        responseType: "blob"
    })
};

//上传气瓶excel
export const postUploadFile = (val) => {
    console.log(val)
    return service({
        url:`/file/execlUpdate`,
        method: 'post',
        headers: {"Content-Type": "multipart/form-data"},
        data:val
       
    })
};
//工业设备代码生成
export const getEquipmentCode = (val) => {
    return service({
        url: `/bottle/IndustralCode?cityCode=${val.cityCode}&equType=${val.equType}&makeData=${val.makeData}`,
        method: 'get',
    })
};
//获取省
export const getSheng = () => {
    return service({
        url: "/chinese/province",
        method: 'get',
    })
};
//通过省code获取市
export const getCity = (val) => {
    return service({
        url: `/chinese/city/${val}`,
        method: 'get',
    })
};

//液化标签气瓶标签发卡
//获取所有标签信息
export const getLibLabel = (currpage,pageSize) => {
    return service({
        url:`cylinder-card/findPage?currPage=${currpage}&pageSize=${pageSize}`,
        method: 'get',
    })
};
//查询搜索框内容
export const getSearchLabel = (currpage,pageSize,obj) => {

    return service({
        url:`/cylinder-card/findPage?currPage=${currpage}&pageSize=${pageSize}&gasId=${obj.gasId}&regId=${obj.regId}&isCard=${obj.isCard}&buildingUser=${obj.buildingUser}`,
        method: 'get',
    })
};
//发卡补卡操作
export const postAppId = (objs) => {
    console.log(objs)
    return service({
        url:`cylinder-card/getAppId?appId=${objs.cardno}&type=1`,
        method: 'post',
        // data: {type: 1}
     
    })
};
//发卡补卡操作
export const postTuckComb = (objs,val) => {
    return service({
        url:`cylinder-card/updateTuckComb?appid=${objs.cardno}&id=${val}`,
        method: 'post',
     
    })
};


//液化气瓶检验
//获取表格数据
export const getLiqReport = (currpage,pageSize) => {
    return service({
        url:`/cylinder/select?currPage=${currpage}&pageSize=${pageSize}`,
        method: 'get',
    })
};
//查询搜索框内容
export const getSearchReport = (currpage,pageSize,val) => {
    return service({
        url:`/cylinder/select?currPage=${currpage}&pageSize=${pageSize}&gasId=${val.gasId}&reportStatus=${val.reportStatus}&appId=${val.appId}&buildingUser=${val.buildingUser}`,
        method: 'get',
    })
};
//检验报告
export const getLiqDetection = (gasId) => {
    return service({
        url:`/excel/select/detection?gasId=${gasId}`,
        method: 'get',
    })
};
//检验报告生成推荐编号
export const getLiqReportId = () => {
    return service({
        url:`/excel/reportId`,
        method: 'post',
    })
};
//检验报告保存到数据库
export const getLiqSave = (val) => {
    return service({
        url:`/excel/detection/insert`,
        method: 'post',
        data:val
    })
};
//保存检验报告文件
export const getLiqSaveFile = (gasId) => {
    return service({
        url:`excel/detection?gasId=${gasId}`,
        method: 'get',
      
    })
};
//下载检验报告文件
export const getDownFile = (gasId) => {
    return service({
        url:`/download/detection?gasId=${gasId}`,
        method: 'get',
        headers: {"Content-Type": "application/x-download"},
        responseType: "blob"
    })
};

//定检报告
export const getLiqInspection = (gasId) => {
    return service({
        url:`/inspection/show?gasId=${gasId}`,
        method: 'get',
    })
};
//定检报告保存到数据库
export const postLiqSaveInspection = (val) => {
    return service({
        url:`/inspection/insertYes`,
        method: 'post',
        data:val
    })
};
//定检报告保存文件
export const getLiqSaveFileInspection = (gasId) => {
    return service({
        url:`/inspection/YesOut?gasId=${gasId}`,
        method: 'get', 
    })
};
//下载定检报告文件
export const getDownFileInspection = (gasId) => {
    return service({
        url:`/download/yes/download?gasId=${gasId}`,
        method: 'get',
        headers: {"Content-Type": "application/x-download"},
        responseType: "blob"
    })
};
//判废报告inspection/no/show
export const getLiqAnnulment = (gasId) => {
    return service({
        url:`/inspection/no/show?gasId=${gasId}`,
        method: 'get',
    })
};
//判废报告保存到数据库
export const postLiqSaveAnnulment = (val) => {
    return service({
        url:`/inspection/insertNo`,
        method: 'post',
        data:val
    })
};
//判废报告保存文件
export const getLiqSaveFileAnnulment = (regId) => {
    return service({
        url:`/inspection/NoOut?regId=${regId}`,
        method: 'get', 
    })
};
//下载定检报告文件
export const getDownFileAnnulment = (regId) => {
    return service({
        url:`/download/no/download?regId=${regId}`,
        method: 'get',
        headers: {"Content-Type": "application/x-download"},
        responseType: "blob"
    })
};
















//工业气瓶模块
//标签发卡
//获取所有标签信息
export const getInduLabel = (currpage,pageSize) => {
    return service({
        url:`/cylinder-card/industrialFindPage?currPage=${currpage}&pageSize=${pageSize}`,
        method: 'get',
    })
};
//查询搜索框内容
export const getSearchInduList = (val) => {
    console.log(val)
    return service({
        url:`/industrial/select/all?currPage=${val.currpage}&pageSize=${val.pageSize}&gasId=${val.gasId}&,medium=${val.medium}`,
        method: 'get',
    })
};
//发卡补卡操作
export const postInduAppId = (objs) => {
    console.log(objs)
    return service({
        url:`cylinder-card/getAppId?appId=${objs.cardno}&type=3`,
        method: 'post',
        // data: {type: 1}
     
    })
};
//发卡补卡操作
export const postInduTuckComb = (objs,val) => {
    return service({
        url:`cylinder-card/updateIndustrialTuckComb?appId=${objs.cardno}&id=${val}`,
        method: 'post',
     
    })
};


//工业气瓶检验
//获取表格数据
export const getInduReport = (currpage,pageSize) => {
    return service({
        url:`/industrial/select?currPage=${currpage}&pageSize=${pageSize}`,
        method: 'get',
    })
};
//查询搜索框内容
export const getInduSearchReport = (currpage,pageSize,val) => {
    return service({
        url:`/industrial/select?currPage=${currpage}&pageSize=${pageSize}&gasId=${val.gasId}&reportStatus=${val.reportStatus}&appId=${val.appId}&buildingUser=${val.buildingUser}`,
        method: 'get',
    })
};
//检验报告
export const getInduDetection = (gasId) => {
    return service({
        url:`/industrial/Inspector/detection/show?gasId=${gasId}`,
        method: 'get',
    })
};
//检验报告生成推荐编号
export const getInduReportId = () => {
    return service({
        url:`/excel/reportId`,
        method: 'post',
    })
};
//检验报告保存到数据库
export const getInduSave = (val) => {
    return service({
        url:`/industrial/Inspector/detection/insert`,
        method: 'post',
        data:val
    })
};
//保存检验报告文件
export const getInduSaveFile = (gasId) => {
    return service({
        url:`/industrial/Inspector/detection?gasId=${gasId}`,
        method: 'get',
      
    })
};
//下载检验报告文件
export const getInduDownFile = (gasId) => {
    return service({
        url:`/industrial/download/inspection?gasId=${gasId}`,
        method: 'get',
        headers: {"Content-Type": "application/x-download"},
        responseType: "blob"
    })
};

//定检报告
export const getInduInspection = (gasId) => {
    return service({
        url:`/inspection/show?gasId=${gasId}`,
        method: 'get',
    })
};
//定检报告保存到数据库
export const postInduSaveInspection = (val) => {
    return service({
        url:`/inspection/insertYes`,
        method: 'post',
        data:val
    })
};
//定检报告保存文件
export const getInduSaveFileInspection = (gasId) => {
    return service({
        url:`/inspection/YesOut?gasId=${gasId}`,
        method: 'get', 
    })
};
//下载定检报告文件
export const getInduDownFileInspection = (gasId) => {
    return service({
        url:`/download/yes/download?gasId=${gasId}`,
        method: 'get',
        headers: {"Content-Type": "application/x-download"},
        responseType: "blob"
    })
};
//判废报告inspection/no/show
export const getInduAnnulment = (gasId) => {
    return service({
        url:`/inspection/no/show?gasId=${gasId}`,
        method: 'get',
    })
};
//判废报告保存到数据库
export const postInduSaveAnnulment = (val) => {
    return service({
        url:`/inspection/insertNo`,
        method: 'post',
        data:val
    })
};
//判废报告保存文件
export const getInduSaveFileAnnulment = (regId) => {
    return service({
        url:`/inspection/NoOut?regId=${regId}`,
        method: 'get', 
    })
};
//下载定检报告文件
export const getInduDownFileAnnulment = (regId) => {
    return service({
        url:`/download/no/download?regId=${regId}`,
        method: 'get',
        headers: {"Content-Type": "application/x-download"},
        responseType: "blob"
    })
};











//车用气瓶模块
//获取表格所有数据
export const getAllVehLabel = (currpage,pageSize) => {
    return service({
        url:`/cylinder-card/carFindPage?currPage=${currpage}&pageSize=${pageSize}`,
        method: 'get',
    })
};
//查询搜索框内容
export const getSearchVehList = (currpage,pageSize,val) => {
    return service({
        url:`/cylinder-card/carFindPage?currPage=${currpage}&pageSize=${pageSize}&gasId=${val.gasId}&regId=${val.regId}&isCard=${val.isCard}&carNum=${val.carNum}`,
        method: 'get',
    })
};
//发卡操作获取id
export const postCarAppId = (objs) => {
    console.log(objs)
    return service({
        url:`cylinder-card/getAppId?appId=${objs.cardno}&type=2`,
        method: 'post',
        // data: {type: 1}
     
    })
};
//发卡操作
export const postCarTuckComb = (objs,val) => {
    return service({
        url:`cylinder-card/updateCarTuckComb?appId=${objs.cardno}&id=${val}`,
        method: 'post',
     
    })
};
//补卡操作
export const postCarFillTuckComb = (val) => {
    return service({
        url:`cylinder-card/fillCarTuckComb?id=${val}`,
        method: 'post',
       
     
    })
};













































//车用气瓶标签发卡
//获取表格所有数据
export const getCarLabel = (val) => {
    console.log(val)
    return service({
        url:`/bottle/findPage?page=${val.currpage}&rows=${val.pageSize}`,
        method: 'get',
    })
};




//工业气瓶标签发卡
export const getIndustryLabel = (val) => {
    console.log(val)
    return service({
        url:`/bottle/findPage?page=${val.currpage}&rows=${val.pageSize}`,
        method: 'get',
    })
};




//液化气瓶标签发卡





//车用气瓶检验报告
export const getCarReport = (val) => {
    console.log(val)
    return service({
        url:`/bottle/findPage?page=${val.currpage}&rows=${val.pageSize}`,
        method: 'get',
    })
};






//工业气瓶检验报告
export const getIndustryReport = (val) => {
    console.log(val)
    return service({
        url:`/bottle/findPage?page=${val.currpage}&rows=${val.pageSize}`,
        method: 'get',
    })
};


















