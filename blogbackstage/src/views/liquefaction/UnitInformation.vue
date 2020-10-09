<template>
  <div class="companyCon">
    <div class="serch">
      <h5 style="padding-bottom:15px;padding-left:15px; padding-top: 20px;">单位信息</h5>
    </div>
    <el-form :model="form" :rules="rules" ref="form" label-width="180px">
      <el-col :span="24">
        <el-col :span="8">
          <el-form-item prop="provinceCode" label="行政省份">
            <el-select
              style=" width: 80%;"
              v-model="form.provinceCode"
              @change="function1(form.provinceCode)"
              placeholder="请选择"
            >
              <el-option
                v-for="item in ProvinceId"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="cityCode" label="市级区域">
            <el-select
              style=" width: 80%;"
              v-model="form.cityCode"
              @change="function2(form.cityCode)"
              placeholder="请选择"
            >
              <el-option
                v-for="item in cityId"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="areaCode" label="区级">
            <el-select style=" width: 80%;" v-model="form.areaCode" placeholder="请选择">
              <el-option v-for="item in quId" :key="item.id" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-col>
      <el-col :span="24">
        <el-col :span="8">
          <el-form-item prop="name" label="单位名称">
            <el-input v-model="form.name" style=" width: 80%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="unitPhone" label="单位固定电话">
            <el-input v-model="form.unitPhone" style=" width: 80%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="bottleType" label="单位气瓶类型">
            <el-select
              size="small"
              clearable
              v-model="form.bottleType"
              placeholder="请选择气瓶类型"
              style=" width: 80%;"
            >
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-col>

      <el-col :span="24">
        <el-col :span="8">
          <el-form-item prop="address" label="单位地址">
            <el-input v-model="form.address" style=" width: 80%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="licence" label="充装许可证号">
            <el-input v-model="form.licence" style=" width: 80%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="isSafe" label="是否已购保险">
            <el-select
              size="small"
              clearable
              v-model="form.isSafe"
              placeholder="请选择"
              style=" width: 80%;"
            >
              <el-option
                v-for="item in optionsse"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-col>

      <el-col :span="24">
        <el-col :span="8">
          <el-form-item prop="postalCode" label="邮政编码">
            <el-input v-model="form.postalCode" style=" width: 80%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="personnelName" label="负责人">
            <el-input v-model="form.personnelName" style=" width: 80%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="phone" label="负责人联系电话">
            <el-input v-model="form.phone" style=" width: 80%;"></el-input>
          </el-form-item>
        </el-col>
      </el-col>

      <el-col :span="24">
        <el-col :span="8">
          <el-form-item prop="unitIssueTime" label="发证日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.unitIssueTime"
              style="width: 80%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="unitChangeTime" label="换证日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.unitChangeTime"
              style="width: 80%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="code" label="统一社会信用代码">
            <el-input v-model="form.code" style=" width: 80%;"></el-input>
          </el-form-item>
        </el-col>
      </el-col>
      <div class="box1">
        <div class="box2">
          <el-button type="success" @click="showEdituser()">硬件配置</el-button>
        </div>
        <div class="box3">
          <el-button type="primary" @click="showAddUserDia()">保存</el-button>
        </div>
      </div>
      <!-- 液化修改对话框 -->
      <el-col :span="24"></el-col>
    </el-form>
    <el-dialog
      title="硬件appid配置"
      :close-on-click-modal="false"
      width="90%"
      :visible.sync="dialogFormVisibleEdit"
    >
      <el-form :model="formYh" ref="formYh">
        <el-form-item label="control(控制器)：" label-width="200px" prop="controlId">
          <el-input v-model="formYh.controlId" autocomplete="off"></el-input>
          <span>(多个控制器用英文逗号隔开)</span>
        </el-form-item>

        <el-form-item label="手持机编号：" label-width="200px" prop="userId">
          <el-input v-model="formYh.userId" autocomplete="off"></el-input>
          <span>（多个手持机用英文逗号隔开）</span>
        </el-form-item>

        <el-form-item label="*手持机MEID：" label-width="200px" prop="macId">
          <el-input v-model="formYh.macId" autocomplete="off"></el-input>
          <span>（多个手持机用英文逗号隔开）</span>
        </el-form-item>

        <el-form-item label="gunId(加气枪号(1-32)：" label-width="200px" prop="gunId">
          <el-input v-model="formYh.gunId" autocomplete="off"></el-input>
          <span>（一个控制器对应两把枪用英文逗号隔开,不同控制器的枪号用分号隔开）</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="EditUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {
//   getAllGasBo,
//   getSheng,
//   getCity,
//   getQu,
//   getAllGasList1,
//   getAllGasList2,
//   getYin,
//   getShi,
//   getSqu
// } from "../../utils/api";
export default {
  data() {
    return {
      ProvinceId: [],
      cityId: [],
      quId: [],
      dialogFormVisibleEdit: false,
      options: [
        { id: 0, name: "液化气瓶" },
        { id: 1, name: "工业气瓶" },
        { id: 2, name: "车用气瓶" },
        { id: 3, name: "移动充装气瓶" }
      ],
      options1: [
        { id: 0, name: "未超期" },
        { id: 1, name: "即将超期" },
        { id: 2, name: "已超期" }
      ],
      options2: [
        { id: 0, name: "监管单位" },
        { id: 1, name: "制造单位" },
        { id: 2, name: "充装单位" },
        { id: 3, name: "检验单位" },
        { id: 4, name: "使用单位" },
        { id: 5, name: "配送单位" }
      ],
      optionsse: [
        { id: 0, name: "未购" },
        { id: 1, name: "已购" }
      ],
      form: {
        id: "",
        address: "",
        areaCode: "",
        bottleType: 0,
        cityCode: "",
        code: "",
        isSafe: 0,
        licence: "",
        name: "",
        personnelName: "",
        phone: "",
        postalCode: "",
        provinceCode: "",
        unitChangeTime: "",
        unitIssueTime: "",
        unitPhone: ""
      },
      formYh: {
        controlId: "",
        gunId: "",
        id: "",
        isDelete: 0,
        macId: "",
        note: "",
        unitId: "",
        userId: ""
      },
      unitId: "",
      rules: {
        address: [
          { required: true, message: "单位地址不能为空", trigger: "blur" }
        ],
        provinceCode: [
          { required: true, message: "省级区域不能为空", trigger: "blur" }
        ],
        cityCode: [
          { required: true, message: "市级区域不能为空", trigger: "blur" }
        ],
        areaCode: [
          { required: true, message: "区级不能为空", trigger: "blur" }
        ],
        code: [
          {
            required: true,
            message: "统一社会信用代码不能为空",
            trigger: "blur"
          }
        ],
        isSafe: [
          { required: true, message: "是否已购保险不能为空", trigger: "blur" }
        ],
        licence: [
          {
            required: true,
            message: "充装许可证号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "单位名称不能为空", trigger: "blur" }
        ],
        personnelName: [
          { required: true, message: "负责人不能为空", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            message: "负责人联系电话不能为空",
            trigger: "blur"
          }
        ],
        postalCode: [
          { required: true, message: "邮政编码不能为空", trigger: "blur" }
        ],
        unitChangeTime: [
          { required: true, message: "换证日期不能为空", trigger: "blur" }
        ],
        unitIssueTime: [
          { required: true, message: "发证日期不能为空", trigger: "blur" }
        ],
        unitPhone: [
          { required: true, message: "单位固定电话不能为空", trigger: "blur" }
        ],
        bottleType: [
          { required: true, message: "单位气瓶类型不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    getSheng().then(v => {
      console.log(v);
      this.ProvinceId = v.data;
    });
    //单位信息查看
    getAllGasList1().then(v => {
      this.form = v.data;
      console.log(v);

      getShi(this.form.cityCode).then(res => {
      console.log(res);
      this.form.cityCode = res.data.name;
    });

    getSqu(this.form.areaCode).then(res1 => {
      console.log(res1);
      this.form.areaCode = res1.data.name;
    });
    });
    
  },
  methods: {
    showAddUserDia() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 新增
          getAllGasBo(this.form).then(v => {
            console.log(v);
          });
        } else {
          this.$message({
            type: "error",
            message: "请填写完整再保存"
          });
        }
      });
    },
    function1(val) {
      console.log(val);
      getCity(val).then(v => {
        console.log(v);
        this.cityId = v.data;
      });
    },
    function2(val) {
      console.log(val);

      getQu(val).then(v => {
        console.log(v);
        this.quId = v.data;
        // this.cityId=v.data
      });
    },
    // 液化对话框打开
    showEdituser() {
      this.dialogFormVisibleEdit = true;
      getAllGasList2(this.form.id).then(v => {
        if (!v.data) {
        } else {
          this.formYh = v.data;
          this.unitId = v.data.id;
        }
        console.log(v);
      });
    },
    // 液化发送请求
    EditUser() {
      this.formYh.id = this.form.id;
      this.formYh.unitId = this.unitId;
      getYin(this.formYh).then(v => {
        console.log(this.formYh);
        console.log(v);
        this.dialogFormVisibleEdit = false;
      });
      // if (this.formYh.unitId) {
      //   console.log(this.formYh);
      //   getYin(this.formYh).then(v => {
      //     console.log("-------------------");
      //     console.log(v);
      //     this.dialogFormVisibleEdit = false;
      //   });
      // } else {
      //   this.formYh.id = this.form.id;
      //   getYin(this.formYh).then(v => {
      //     console.log(this.formYh);
      //     console.log(v);
      //     this.dialogFormVisibleEdit = false;
      //   });
      // }
    }
  }
};
</script>

<style scoped>
 .box1,
 .box2,
 .box3 {
   display: flex;
   width: 100%;
 }
 .box1{
   padding-top: 20%;
 }
  
 .box2 {
   margin-left: 72vw;
 }
 .companyCon{
   padding: 0 !important;
 }
 .serch{
   width: 100%;
   height: 76.3px;
    /* background: linear-gradient(to top, #b1d3ff, #ffffff); */
 }
</style>