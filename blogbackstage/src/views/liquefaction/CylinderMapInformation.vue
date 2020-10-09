<template>
  <div class="box1">
    <!-- <div style="background:white;width:99.1%;padding:10px 0px 15px 15px">
      <my-bread level1="综合查询" level2="液化气瓶" level3="气瓶地图显示"></my-bread>
    </div> -->
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <div id="allmap" ref="allmap"></div>
    </el-card>
    <div class="box">
      <baidu-map
        class="map"
        :scroll-wheel-zoom="true"
        :center="center"
        :zoom="zoom"
        @ready="handler"
      >
        <bm-view style="width: 100%; height:100%; flex: 1"></bm-view>
        <!-- 比例尺的控件 -->
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
        <!-- 地图右侧的缩放 -->
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <!-- 定位 -->
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>
        <!-- 标记点 -->
        <!-- <bm-marker :position="{lng:center.lng,lat:center.lat}"></bm-marker> -->
        <!-- 添加自定义的点 -->
        <bm-marker
          v-for="(item,i) in markerPoint"
          :key="i"
          :position="{lng:item.x,lat:item.y}"
          :dragging="false"
          :icon="{url:item.status, size: {width:32, height: 32}}"
          @click="infoWindowOpen(i)"
        >
          <bm-info-window
            title="详情信息"
            :position="{lng:item.x,lat:item.y}"
            :show="i === text"
            @clickclose="infoWindowClose"
          >
            <p>
              <span>气瓶所属单位:</span>
              <span v-text="item.buildingUser"></span>
            </p>
            <p>
              <span>客户姓名:</span>
              <span v-text="item.customerName"></span>
            </p>
            <p>
              <span>客户电话:</span>
              <span v-text="item.customerTelephone"></span>
            </p>
            <p>
              <span>客户地址:</span>
              <span v-text="item.customerAddress"></span>
            </p>
          </bm-info-window>
        </bm-marker>
        <div class="tishi">
          <div>
            <!-- <h3 style="font-weight:bold;">气瓶状态:</h3> -->
            <div class="anchor1">
              <img :src="tishi.buhege" />
              <span>不合格</span>
            </div>
            <div class="anchor2">
              <img :src="tishi.hege" />
              <span style="color:#1afa29;">合格</span>
            </div>
          </div>
          <div class="anchor3">
            <img :src="tishi.chaoqi" />
            <span style="color:#f4ea2a">超期未检</span>
          </div>
          <div class="anchor4">
            <img :src="tishi.weijian" />
            <span style="color:#13227a">即将超期</span>
          </div>
        </div>
      </baidu-map>
    </div>
  </div>
</template>
<script>
import img0 from "../../assets/imgs/buhege.svg";
import img1 from "../../assets/imgs/hege.svg";
import img2 from "../../assets/imgs/chaoqi.svg";
import img3 from "../../assets/imgs/jijiang.svg";
export default {
  // name: "atlas",
  // import $ from "jquery";
  name: "mapNum",
  data() {
    return {
      center: {lng: 116.404844,lat: 39.911614}, //经纬度,
      zoom: 11, //地图展示级别
      // location: "长沙市",
      keyword: "请输入搜索关键字",
      markerPoint: [], //数据
      text: "", //传的单条数据
      tishi: {
        buhege: img0,
        hege: img1,
        chaoqi: img2,
        weijian: img3,
      },
    };
  },
  mounted(){
    // this.center = { lng: 28.225029,lat: 112.994732 };

  },
  created() {
    // var lat = sessionStorage.getItem("lat");
    // var lng = sessionStorage.getItem("lng");
    // if (lat == "" && lng == "") {
      // this.center = { lng: 28.225029,lat: 112.994732 };
    // } else {
    //   this.center = { lng: lng, lat: lat };
    // }

    // const res6 = await this.$http.get(`/stats/map`);
    // console.log(res6);
    // this.markerPoint = res6.data.data;
    // 根据后端状态码来判断显示不同的标点
    // this.markerPoint.forEach((e) => {
    //   if (e.status == "0") {
    //     e.status = img0;
    //   } else if (e.status == "1") {
    //     e.status = img1;
    //   } else if (e.status == "2") {
    //     e.status = img2;
    //   } else if (e.status == "3") {
    //     e.status = img3;
    //   }
    // });
  },
  methods: {
    //百度地图初始化
    handler({ BMap, map }) {},
    // 关闭信息窗口 @close 自带的方法
    infoWindowClose(e) {
      this.text = "";
    },
    //首先点击marker时开启信息窗口
    infoWindowOpen(e) {
      if (this.text !== e) {
        console.log(this.text);
        this.text = e;
      } else {
        console.log(this.text);
        this.text = "";
      }
    },
    //点击获取到当前经纬度
    getClickInfo(e) {
      console.log(e.point.lng);
      console.log(e.point.lat);
      this.center.lng = e.point.lng;
      this.center.lat = e.point.lat;
    },
    //双向绑定经纬度以及缩放尺寸
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter();
      this.center.lng = lng;
      this.center.lat = lat;
      // this.zoom = e.target.getZoom();
    },
    //经纬度同步
    baidumap() {
      this.baiduDevicelocationx = this.center.lng;
      this.baiduDevicelocationy = this.center.lat;
    },
  },
};
</script>
<style scoped>
.box1 {
  width: 100%;
  height: 100%;
  padding: 0 !important;
}
p {
  margin: 0;
  padding: 0;
}
.tishi {
  width: 600px;
  position: absolute;
  top: 50px;
  /* left: 10px; */
  /* bottom:800px; */
}
.anchor1,
.anchor2,
.anchor3,
.anchor4 {
  margin-top: 5px;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-between; */
  /* display: inline-block; */
  color: #f00;
  font-size: 13px;
  font-weight: bold;
  float: left;
}
#allmap {
  overflow: hidden;
}
.map {
  height: 800px;
}
.map  {
  display: block !important;
}
.box {
  margin-top: 20px;
}
</style>