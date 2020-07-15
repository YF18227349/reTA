<template>
  <div class="add_new_addr w-100">
    <div class="add_new_addr_group w-100">
      <ul class="add_new_addr_list w-100">
        <li class="p-r">
          <a href="javascript:;" class="line_input_item">
            <span class="item_title f-left fs-3 fw-6 fc-dark">姓名</span>
            <input
              type="text"
              class="line_input f-left fs-3 fw-6 fc-dark"
              v-model="name"
              placeholder="必填"
            />
          </a>
          <a
            href="javascript:;"
            v-if="nameShow"
            class="clearBtn p-a"
            :class="nameShow?'bg-lightdark':'bg-white'"
            @click="name"
          >
            <span class="fw-7 fc-white iconfont icon-error"></span>
          </a>
        </li>
        <li class="p-r">
          <a href="javascript:;" class="line_input_item">
            <span class="item_title f-left fs-3 fw-6 fc-dark">电话</span>
            <input
              type="tel"
              class="line_input f-left fs-3 fw-6 fc-dark"
              v-model="telNum"
              placeholder="必填"
              maxlength="11"
            />
          </a>
          <a
            href="javascript:;"
            v-if="telNumShow"
            class="clearBtn p-a"
            :class="telNumShow?'bg-lightdark':'bg-white'"
            @click="telNum=''"
          >
            <span class="fw-7 fc-white iconfont icon-error"></span>
          </a>
        </li>
        <li class="p-r">
          <a href="javascript:;" class="line_arrow_item" @click="select_addr()">
            <span class="item_title f-left fs-3 fw-6 fc-dark">所在城市</span>
            <span class="item_arrow f-right fm-1 fw-6 fc-gray iconfont icon-previewright mt-1"></span>
            <span class="item_txt fs-3 fc-dark fw-6 f-right">{{addr1?addr1:'请选择' | addrHandle}}</span>
          </a>
        </li>
        <li class="p-r">
          <span class="fc-dark fw-6 fs-3 mb-3">所在街道</span>
          <yd-textarea class="fs-3 fw-6 fc-dark" placeholder="请输入" maxlength="100" v-model="addr2"></yd-textarea>
          <a
            href="javascript:;"
            v-if="addr2Show"
            class="clearBtn p-a"
            :class="addr2Show?'bg-lightdark':'bg-white'"
            @click="addr2=''"
          >
            <span class="fw-7 fc-white iconfont icon-error"></span>
          </a>
        </li>
      </ul>
    </div>

    <!-- 地址选择组件 -->
    <!-- <div class="select_addr_group w-100">
      <div
        class="select_addr_plate w-100"
        :class="addr_show?'addr_plate_show':'addr_plate_hidden'"
        @click="addr_cancel()"
      ></div>
      <div class="select_addr_container w-100" :class="addr_show?'addr_up':'addr_down'">
        <div class="w-100 select_value bg-white">
          <a class="addr_btn bg-white br-dark" href="javascript:;" @click="addr_cancel()">
            <span class="fc-dark fs-2 fw-6">取消</span>
          </a>
          <div class="value_list">
            <span>{{prvoice_value?prvoice_value:'未选择'}}</span>
            <span>{{city_value}}</span>
            <span>{{area_value}}</span>
          </div>
          <a class="addr_btn bg-blue" href="javascript:;" @click="addr_done()">
            <span class="fc-white fs-2 fw-6">确定</span>
          </a>
        </div>
        <div class="w-100 p-r addr_list_container bg-gray">
          <div class="p-a value_plate bg-black w-100"></div>
          <div class="container_item">
            <ul class="addr_list addr1" :style="skip1">
              <li class="addr_item" v-for="(add1,p) in addr_provice" :key="p">
                <a class="item" href="javascript:;" @click.prevent="select_provice(p)">
                  <span class="fs-3 fw-6 fc-dark">{{add1.name}}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="container_item p-r">
            <ul class="addr_list addr2" :style="skip2">
              <li class="addr_item" v-for="(add2,c) in addr_city" :key="c">
                <a class="item" href="javascript:;" @click.prevent="select_city(c)">
                  <span class="fs-3 fw-6 fc-dark">{{add2.name}}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="container_item p-r">
            <ul class="addr_list addr3" :style="skip3">
              <li class="addr_item" v-for="(add3,a) in addr_area" :key="a">
                <a class="item" href="javascript:;" @click.prevent="select_area(a)">
                  <span class="fs-3 fw-6 fc-dark">{{add3.name}}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>-->
    <a href="javascript:;" class="saveAddrBtn bg-blue mt-6" @click.prevent="do_save()">
      <span class="fc-white fm-2 fw-6">保存地址</span>
    </a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "",
        type: 1,
        id: null
      },
      addr_info: {},
      name: "",
      nameShow: false,
      telNum: null,
      telNumShow: false,
      addr1: "",
      addr1Show: false,
      addr2: "",
      addr2Show: false,
      lon: null,
      lat: null
      // 地址板块
      // addr1_code: 0,
      // addr2_code: 0,
      // addr3_code: 0,
      // addr_data: [],
      // addr_show: false,
      // addr_provice: [],
      // addr_city: [],
      // addr_area: [],
      // prvoice_value: "",
      // prvoice_id: null,
      // city_value: "",
      // city_id: null,
      // area_value: "",
      // area_id: null,
      // lon: null,
      // lat: null
    };
  },
  mounted() {
    var h = document.documentElement.clientHeight;
    $(".select_addr_container").css("height", `${h * 0.7}px`);
    $(".container_item").css("height", `${h * 0.7 - 44}px`);
    $(".saveAddrBtn").css("height", `${h * 0.07}px`);
  },
  created() {
    this.selfMainLoadOpend();
    this.getPageInfo();
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 0
    });
    this.init();
  },
  destroyed() {
    this.delAddrData();
    this.saveData();
  },
  methods: {
    init() {
      this.getPageInfo();
      // 获取菜单数据
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },
    getPageInfo() {
      var id = this.getParams().id;
      this.pageInfo.id = id;
      if (id >= 0) {
        this.pageInfo.header_title = "编辑地址";
        this.getAddrInfo(id);
      } else {
        this.pageInfo.header_title = "添加新地址";
        var addrs = this.getAddreInfo();
        if (addrs) {
          var str = addrs.addr;
          var index = str.indexOf("区");
          this.addr1 = str.substr(0, index + 1);
          this.addr2 = str.substr(index + 1);
          this.lon = addrs.point.lng;
          this.lat = addrs.point.lat;
        }
      }
    },
    getAddrInfo(id) {
      var token = this.getToken();
      var params = { token, id };
      this.__initAction("Address-getInfo", params, (res, s) => {
        if (s == 1) {
          var i = res.data[0];

          this.name = i.consignee;
          this.telNum = i.tel;
          this.addr1 = "";
          this.addr2 = "";
          this.addr1 = i.province + i.city + i.area;
          this.addr2 = i.address;
          this.lon = i.lon;
          this.lat = i.lat;

          var addrs = this.getAddreInfo();
          if (addrs) {
            var str = addrs.addr;
            var index = str.indexOf("区");
            this.addr1 = str.substr(0, index + 1);
            this.addr2 = str.substr(index + 1);
            this.lon = addrs.point.lng;
            this.lat = addrs.point.lat;
          }
        } else {
          this._msg(res.info);
        }
      });
    },
    select_addr() {
      var url = "/new_map_group";
      this.$router.push(url);
    },
    getAddreInfo() {
      var info = this.getSelectData();
      var obj;
      if (info) {
        // 如果没地址时，info = null
        if (info.select_addr) {
          return info.select_addr;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    saveData() {
      var name = this.name;
      var tel = this.telNum;
      if (name.trim() && tel.trim()) {
        var addrData = {
          name,
          tel
        };
        this.setCache("addressAdd", JSON.stringify(addrData));
      }
    },
    //销毁本地存储的地址
    delAddrData() {
      var info = this.getSelectData();
      info = {};
      this.setCache("select_data", JSON.stringify(info));
    },
    // select_addr() {
    //   var url="/new_map_group";
    //   this.$router.push(url);
    //   this.addr_show = true;
    //   var url = this.Global.baseURL + "/Area-listAll.jsp";
    //   this.axios.post(url).then(res => {
    //     // console.log(res.data.data);
    //     if (res.data.status == 1) {
    //       console.log(res);
    //       var data = res.data.data;
    //       this.addr_data = data;
    //       this.addr_provice = data;
    //       this.addr_city = data[0].findnemus;
    //       this.addr_area = data[0].findnemus[0].findnemus;
    //     }
    //   });
    // },
    // select_provice(p) {
    //   this.addr1_code = p;
    //   this.addr2_code = 0;
    //   this.addr3_code = 0;
    //   this.addr_city = this.addr_data[p].findnemus;
    //   this.addr_area = this.addr_city[0].findnemus;
    //   this.prvoice_value = this.addr_data[p].name;
    //   this.city_value = this.addr_city[0].name;
    //   this.area_value = this.addr_city[0].findnemus[0].name;
    //   this.prvoice_id = this.addr_data[p].id;
    //   this.city_id = this.addr_city[0].id;
    //   this.area_id = this.addr_city[0].findnemus[0].id;
    // },
    // select_city(c) {
    //   this.addr2_code = c;
    //   this.addr3_code = 0;
    //   this.addr_area = this.addr_city[c].findnemus;
    //   this.city_value = this.addr_city[c].name;
    //   this.area_value = this.addr_area[0].name;
    //   this.city_id = this.addr_city[c].id;
    //   this.area_id = this.addr_city[c].findnemus[0].id;
    // },
    // select_area(a) {
    //   this.addr3_code = a;
    //   this.area_value = this.addr_area[a].name;
    //   this.area_id = this.addr_area[a].id;
    // },
    // addr_cancel() {
    //   this.addr_show = false;
    //   this.prvoice_value = "";
    //   this.city_value = "";
    //   this.area_value = "";
    // },
    // addr_done() {
    //   this.addr_show = false;
    //   // console.log(this.prvoice_id, this.city_id, this.area_id);
    //   this.addr1 = this.prvoice_value + this.city_value + this.area_value;
    // },

    do_save() {
      var token = this.getToken();
      var reg = this.Global.reg_phone;
      var url;
      var params = {
        token,
        consignee: this.name,
        address: this.addr2,
        tel: this.telNum,
        lon: this.lon,
        lat: this.lat
      };
      if (this.pageInfo.id > 0) {
        url = "Address-getUpdate";
        params.id = this.pageInfo.id;
      } else {
        url = "Address-getAdd";
      }
      if (!this.name) {
        this.selfToast({ mes: "姓名不能为空", timeout: 1500 });
        return;
      }

      if (!this.checkPhone(this.telNum, reg)) {
        return;
      }

      if (!this.addr1) {
        this.selfToast({ mes: "地址不能为空", timeout: 1500 });
        return;
      }

      if (!this.addr2) {
        this.selfToast({ mes: "街道信息不能为空", timeout: 1500 });
        return;
      }

      this.__initAction(url, params, (res, s) => {
        if (s == 1) {
          this._msg(res.info);
          var addrsData = this.getCache("addressAdd", 2);
          if (addrsData) {
            addrsData = {};
            this.delCache("addressAdd");
            setTimeout(() => {
              this.$router.back(-1);
            }, 500);
          }
        }
      });

      // var token = this.getToken();
      // var consignee = this.name;
      // var country = 110000;
      // var province = this.prvoice_id;
      // var city = this.city_id;
      // var area = this.area_id;
      // var address = this.addr2;
      // var addr = this.addr1 + this.addr2;
      // var tel = this.telNum;
      // var reg = this.Global.reg_phone;
      // if (!consignee) {
      //   this.selfToast({ mes: "姓名不能为空", timeout: 1500 });
      //   return;
      // }
      // if (!this.checkPhone(tel, reg)) {
      //   return;
      // }
      // if (!province) {
      //   this.selfToast({ mes: "地址不能为空", timeout: 1500 });
      //   return;
      // }
      // if (!address) {
      //   this.selfToast({ mes: "街道信息不能为空", timeout: 1500 });
      //   return;
      // }
      // if (addr) {
      //   var url = this.Global.baseURL + "/Tools-addresstoip.jsp";
      //   var params = { addresss: addr };
      //   this.$dialog.loading.open("正在保存...");
      //   this.axios
      //     .post(url, params)
      //     .then(res => {
      //       console.log(res);
      //       if (res.data) {
      //         this.lon = res.data.lon;
      //         this.lat = res.data.lat;
      //         var params = {
      //           token,
      //           type: this.pageInfo.type,
      //           id: this.pageInfo.id,
      //           consignee,
      //           country,
      //           province,
      //           city,
      //           area,
      //           address,
      //           tel,
      //           lon: this.lon,
      //           lat: this.lat
      //         };
      //         if (this.pageInfo.id > 0) {
      //           var url = this.Global.baseURL + "/Address-getUpdate.jsp";
      //         } else {
      //           var url = this.Global.baseURL + "/Address-getAdd.jsp";
      //         }
      //         this.save_addr(url, params);
      //       } else {
      //         this.$dialog.loading.close();
      //         if (res.data.code == -1) {
      //           this.selfToast({
      //             mes: "登录超时请稍后",
      //             timeout: 1500
      //           });
      //           this.goURL({
      //             url: "/login",
      //             timeout: 1600
      //           });
      //         } else {
      //           this.selfToast({
      //             mes: "操作失败请重试",
      //             timeout: 1500
      //           });
      //         }
      //       }
      //     })
      //     .catch(e => {
      //       this.$dialog.loading.close();
      //       this.selfToast({
      //         mes: "网络故障请重试",
      //         timeout: 1500
      //       });
      //     });
      // }
    },

    save_addr(url, params) {
      this.axios
        .post(url, params)
        .then(res => {
          this.$dialog.loading.close();
          console.log(res.data);
          if (res.data.status == 1) {
            this.selfToast({
              mes: res.data.info,
              timeout: 1500,
              icon: "success"
            });
            setTimeout(() => {
              window.history.go(-1);
            }, 1600);
          } else {
            if (res.data.code == -1) {
              this.$dialog.toast({
                mes: "登录超时请重试",
                timeout: 1500,
                icon: "error"
              });
              this.goURL({
                url: "/login",
                timeout: 1600
              });
            } else {
              this.selfToast({
                mes: "操作失败请重试",
                timeout: 1500
              });
            }
          }
        })
        .catch(e => {
          this.selfToast({
            mes: "网络故障请重试",
            timeout: 1500
          });
        });
    }
  },
  watch: {
    name() {
      if (this.name) {
        this.nameShow = true;
      } else {
        this.nameShow = false;
      }
    },
    addr1() {
      if (this.addr1) {
        this.addr1Show = true;
      } else {
        this.addr1Show = false;
      }
    },
    addr2() {
      if (this.addr2) {
        this.addr2Show = true;
      } else {
        this.addr2Show = false;
      }
    },
    telNum() {
      if (this.telNum) {
        this.telNumShow = true;
      } else {
        this.telNumShow = false;
      }
    }
  },
  computed: {
    skip1() {
      var x = parseInt(this.addr1_code) - 0;
      var y = 150 - x * 44;
      return `marginTop:${y}px`;
    },
    skip2() {
      var x = parseInt(this.addr2_code) - 0;
      var y = 150 - x * 44;
      return `marginTop:${y}px`;
    },
    skip3() {
      var x = parseInt(this.addr3_code) - 0;
      var y = 150 - x * 44;
      return `marginTop:${y}px`;
    }
  }
};
</script>
<style lang="scss">
a.clearBtn {
  text-decoration: none;
  width: 16px;
  height: 16px;
  top: 50%;
  margin-top: -8px;
  right: 5%;
  span {
    font-size: 12px;
  }
}
input.line_input {
  padding-left: 30px;
}
</style>
