<template>
  <div class="city_list w-100">
    <div class="location_city w-100 bg-white shadow-dark">
      <a href="javascript:;" @click="getLocation()">
        <self-cell-item href="javascript:;" arrow="true">
          <a href="javascript:;" slot="left" class="location_logo">
            <span class="iconfont icon-dingwei2 fc-gary fw-5"></span>
            <span class="fm-1 fw-6 fc-dark">当前城市</span>
          </a>
          <span slot="right" class="fm-1 fw-6 fc-gray">{{pageInfo.location_province}}</span>
          <span slot="right" class="fm-1 fw-6 fc-gray">{{pageInfo.location_city}}</span>
        </self-cell-item>
      </a>
    </div>
    <!-- <div class="clear_location_city"></div> -->
    <div class="city_list_group w-100">
      <ul class="citys w-100 bg-white">
        <li class="items p-r" v-for="(tmp,i) in addr_list" :key="i">
          <a href="javascript:;" @click="addr_code = i">
            <self-cell-item href="javascript:;" arrow="true" class="brb-gray bg-gray">
              <span slot="left" class="fm-2 fc-dark fw-5">{{tmp.name}}</span>
            </self-cell-item>
          </a>
          <div class="city_container w-100 bg-white" v-if="addr_code == i">
            <a
              href="javascript:;"
              class="city_items pt-1 pb-1 pl-2 pr-2 mb-3 mr-5 br-gray bg-white"
              v-for="(item,j) in tmp.findnemus"
              :key="j"
              :style="addr_code == i?'opacity:1':'opacity:0'"
              @click="select_city_value(item.id,item.name)"
            >
              <span class="fs-3 fw-6 fc-blue">{{item.name}}</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
const CellItem = () => import("../sub/cell_arrow_item");
const location = () => import("location");
export default {
  data() {
    return {
      pageInfo: {
        header_title: "选择城市",
        token: "",
        location_city: "",
        lng: null,
        lat: null
      },
      //地址列表
      addr_code: null,
      addr_list: [],
      params: this.initParam()
    };
  },

  mounted() {
    var h = document.documentElement.clientHeight;
    var location_h = document.querySelector(".location_city").clientHeight;
    $(".clear_location_city").css("height", `${location_h}px`);
  },
  created() {
    this.selfMainLoadOpend();
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 1
    });

    this.init();
  },
  methods: {
    init() {
      this.getPageInfo();
      var location = this.getCache("location", 2);
      this.pageInfo.location_city = location.location_city;
      this.pageInfo.lng = location.lon;
      this.pageInfo.lat = location.lat;
      // 获取菜单数据
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },
    getLocation() {
      // var token = this.getToken();
      this.$dialog.loading.open("正在定位中...");

      var location = this.getCache("location", 2);
      if (!location) {
        location = {};
      }

      var info = this.getSelectData();
      if (!info) {
        info = {};
      }

      this.__initAction("Tools-getLatLon", {}, (res, s) => {
        if (s == 1) {
          console.log(res)
          var select_city = {};
          select_city.city_name = res.data.content["city"];
          select_city.city_id = res.data.cityId;
          select_city.lng = res.data.point["x"];
          select_city.lat = res.data.point["y"];
          info.select_city = {};
          info.select_city = select_city;
          this.setCache("select_data", JSON.stringify(info));

          location = {};
          location.cityId = res.data.cityId;
          location.address = res.data.address;
          location.location_city = res.data.content["city"];
          location.city = res.data.content["city"];
          location.province = res.data.content["province"];
          location.lat = res.data.point["y"];
          location.lon = res.data.point["x"];
          this.setCache("location", JSON.stringify(location));

          var user_info = this.getUserInfo();
          if (!user_info) {
            user_info = {};
          }
          var isLogin = this.getCache("user_info", 2);
          if(isLogin) {
              user_info.location = {};
              user_info.location.cityId = res.data.cityId;
              user_info.location.address = res.data.address;
              user_info.location.lng = res.data.point["x"];
              user_info.location.lat = res.data.point["y"];
              user_info.location.city = res.data.content["city"];
              user_info.location.province = res.data.content["province"];
              user_info.location.street = "";
              this.setCache("user_info", JSON.stringify(user_info));
          }

          this.$dialog.loading.close();
          this.__Sleep(e => {
            window.history.go(-1);
          });
        }
      });
    },
    getPageInfo() {
      this.__initAction("Area-listAll", this.params, (res, s) => {
        if (s == 1) {
          var data = res.data;
          this.addr_list = data;
        }
      });
    },
    select_city_value(id, name) {
      var param = {
        t: 1,
        val: id
      };
      this.$dialog.loading.open("获取地址信息中...");
      this.__initAction("Tools-getAreaData", param, (res, s) => {
        if (s == 1) {
          var data = res.data;
          var info = this.getSelectData();
          if (!info) {
            info = {};
          }
          var select_city = {};
          select_city.city_name = data.name;
          select_city.city_id = data.id;
          console.log(data)
          // select_city.lng = data.lng;
          select_city.lng = data.longitude;
          // select_city.lat = data.lat;
          select_city.lat = data.latitude;
          info.select_city = {};
          info.select_city = select_city;
          this.setCache("select_data", JSON.stringify(info));
          var location = this.getCache("location", 2);
          if (!location) {
            location = {};
          }

          location.cityId = res.data.id;
          location.address =  res.data.parent.name + name;
          location.location_city = res.data.name;
          location.city = res.data.name;
          location.province = name;
          // location.lat = res.data.lat;
          // location.lon = res.data.lng;
           location.lat = data.latitude;
          location.lon = data.longitude;
          this.setCache("location", JSON.stringify(location));
          var user_info = this.getUserInfo();
          if (!user_info) {
            user_info = {};
          }
          var isLogin = this.getCache("user_info", 2);
          if(isLogin) {
            user_info.location = {};
            user_info.location.cityId = res.data.id;
            user_info.location.address = res.data.parent.name + name;
            user_info.location.lng = res.data.longitude;
            user_info.location.lat = res.data.latitude;
            user_info.location.city = res.data.name;
            user_info.location.province = name;
            user_info.location.street = "";
            this.setCache("user_info", JSON.stringify(user_info));
          }
          this.$dialog.loading.close();
          this.__Sleep(e => {
            window.history.go(-1);
          });
        }
      });
    }
  },
  components: {
    "self-cell-item": CellItem
  }
};
</script>
<style lang="scss">
.city_list .city_list_group .citys .items {
  background: #fff;
}

.cell_arrow_item {
  .location_logo {
    width: 110px;
  }
  .text-right {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.city_list {
  .location_city {
    position: static !important;
  }
}
</style>
