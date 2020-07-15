<template>
  <div class="map_group w-100" id="allmap">
    <div class="map_box bg-darkGray w-100">
      <baidu-map
        class="map"
        :center="center"
        :zoom="zoom"
        @ready="handler"
        :pinch-to-zoom="true"
        :auto-resize="true"
        @click="get"
      >
        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>
      </baidu-map>
    </div>
  </div>
</template>
<script >
const BaiduMap = ()=>import("vue-baidu-map/components/Map/Map.vue");
const BmGeolocation = ()=>import("vue-baidu-map/components/controls/Geolocation.vue");
export default {
  data() {
    return {
      pageInfo: {
        header_title: "地址选择",
        lat: null,
        lng: null,
        type: ""
      },
      center: { lng: 0, lat: 0 },
      zoom: 3,
      show: false
    };
  },
  mounted() {
    var h = document.documentElement.clientHeight;
    $(".map_group").css("height", `${h * 0.93}px`);
  },
  created() {
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 1
    });
    this.getLocationInfo();
    this.pageInfo.type = this.getParams().type;
  },
  methods: {
    getLocationInfo() {
      var info = this.getSelectData();
      if (info) {
        if (info.select_city) {
          var data = info.select_city;
          this.pageInfo.lng = data.lng;
          this.pageInfo.lat = data.lat;
          return;
        }
      }
      var value = this.getUserInfo();
      if (value.location) {
        var data = value.location;
        this.pageInfo.lng = data.lng;
        this.pageInfo.lat = data.lat;
      }
    },
    //获取定位信息
    handler({ BMap, map }) {
      // console.log(BMap, map);
      // var geolocation = new BMap.Geolocation();
      // geolocation.getCurrentPosition(function(r) {});

      this.center.lng = this.pageInfo.lng;
      this.center.lat = this.pageInfo.lat;
      this.zoom = 28;
    },
    get(e) {
      var type = this.pageInfo.type;
      const { lng, lat } = e.target.getCenter();
      var point = e.target.getCenter();
      var geocoder = new BMap.Geocoder();
      geocoder.getLocation(point, function(result) {
        if (result) {
          // console.log(result);
          var info = this.getSelectData();
          if (!info) {
            info = {};
          }
          if (!info[type]) {
            info[type] = {};
          }
          info[type].select_addr = {};
          info[type].select_addr.addr = result.address;
          info[type].select_addr.point = result.point;
          console.log(info[type]);
          this.setCache("select_data", JSON.stringify(info));
          setTimeout(() => {
            window.history.go(-1);
          }, 300);
        }
      });
    }
  },

  components: {
    BaiduMap, //指定组件模板,
    BmGeolocation
  }
};
</script>
<style lang="scss">
</style>
