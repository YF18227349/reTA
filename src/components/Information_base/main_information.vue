<template>
  <div class="main_information w-100">
    <self-select-tabbar
      :list="tabbarList"
      :height="50"
      :arrow="true"
      :font="'14px'"
      :index="0"
      @callBack="select_tab_value"
    ></self-select-tabbar>
    <div class="clear_fixed"></div>
    
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
      <div class="info_content" v-if="pageInfo.types == 1" slot="list">
        <router-link
          :to="{path:'/service_detail',query:{id:tmp.id,code:0,lng:tmp.lng,lat:tmp.lat}}"
          class="cards w-100 bg-white mb-1"
          v-for="(tmp,i) in demandList"
          :key="i"
        >
          <self-info-card :data="tmp"></self-info-card>
        </router-link>
      </div>
      <div class="info_content" v-if="pageInfo.types == 3" slot="list">
        <router-link
          :to="/post_info/+item.id"
          class="post_info_cards bg-white w-100 mb-1"
          v-for="(item,i) in interviewerList"
          :key="i"
        >
          <self-post-card :data="item" class="bg-white"></self-post-card>
        </router-link>
      </div>
      <div class="info_content" v-if="pageInfo.types == 2" slot="list">
        <router-link
          :to="{ path: '/skill_detail', query: {id:tmp.id,code:1,lng:tmp.lng,lat:tmp.lat}}"
          class="cards mb-1 w-100 bg-white"
          v-for="(tmp,i) in skillList"
          :key="i"
        >
          <self-info-card :data="tmp"></self-info-card>
        </router-link>
      </div>

      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span>
      <!-- 加载中提示，不指定，将显示默认加载中图标 -->
      <!-- <span slot="loadingTip" class="pt-5 pb-5 fm-2 fc-dark">加载中</span> -->
    </yd-infinitescroll>
    <self-load-frame></self-load-frame>
  </div>
</template>
<script>
const SelectTabbar = ()=>import("../sub/select_tabbar");
const PostCard = ()=>import("../sub/post_card");
const InfoCard = ()=>import("../sub/info_card");
const LoadFrame = ()=>import("../sub/loading_frame");
export default {
  data() {
    return {
      pageInfo: {
        header_title: "",
        types: null
      },
      param: {
        page: null,
        length: null,
        count: null
      },
      tabbarList: [
        {
          title: "推荐",
          labels: [
            { value: "价格高", id: 5 },
            { value: "价格低", id: 6 },
            { value: "信用分高", id: 3 },
            { value: "信用分低", id: 4 }
          ]
        },
        {
          title: "技能分类",
          url: "/demand_group/Classtype-getListSkill.jsp/info_skill"
        },
        {
          title: "时间",
          labels: [
            { value: "当天", id: 1 },
            { value: "三天", id: 2 },
            { value: "一周", id: 3 },
            { value: "一月", id: 4 }
          ]
        }
      ],
      demandList: [], //抢单赚钱数组
      interviewerList: [], //企业招聘信息数组;
      skillList: [] //主页三级技能数组;
    };
  },
  created() {
    this.getPageInfo(0);
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 0
    });
  },
  methods: {
    //获取页面信息{参数}
    getPageInfo(x) {
      this.selfMainLoadOpend();
      var id = this.getParams().mid;
      var types = this.getParams().type;
      var token = this.getToken();
      var cityId = this.getUserInfo().location.cityId;
      var lat = this.getUserInfo().location.lat;
      var lon = this.getUserInfo().location.lng;
      if (x == 0) {
        this.pageInfo.types = types;
        this.pageInfo.header_title = this.getParams().name;
        this.param.page = this.Global.page_num;
        this.param.length = this.Global.length_num;
        var page = this.param.page;
      } else {
        var page = x;
      }
      var length = this.param.length;
      if (id == -1) {
        var params = { token, types, cityId, lat, lon, page, length };
        var url = this.Global.baseURL + "/Hotnews-preview.jsp";
        if (types == 3) {
          var list = this.interviewerList;
        } else if (types == 1) {
          var list = this.demandList;
        }
      } else {
        var params = { token, id, lat, lon, page, length };
        var url = this.Global.baseURL + "/Index-getNavigationList.jsp";
        var list = this.skillList;
      }
      // console.log(params);
      this.getDataList(url, params, types, list);
    },

    //请求数据
    getDataList(url, params, type, list) {
      this.axios
        .post(url, params)
        .then(res => {
          console.log(res.data);
          if (res.data.status == 1) {
            this.param.count = res.data.count;

            if (type == 1) {
              var data = res.data.data;
              for (let it of data) {
                var arr = {};
                arr.title = it.title;
                arr.name = it.lastName;
                arr.logo = it.portrait;
                arr.imgs = it.prices;
                arr.hot = it.view;
                arr.lng = it.lon;
                arr.lat = it.lat;
                arr.distance = it.distance;
                arr.time = it.create_time;
                arr.detail = it.infos;
                arr.id = it.id;
                arr.salary = it.serviceDatd;
                list.push(arr);
              }
            }

            //获取主页技能skill数组
            if (type == 2) {
              var data = res.data.data.lists;
              for (let it of data) {
                var arr = {};
                arr.title = it.title;
                arr.name = it.lastName;
                arr.logo = it.portrait;
                arr.imgs = it.images;
                arr.hot = it.view;
                arr.lng = it.lon;
                arr.lat = it.lat;
                arr.distance = it.distance;
                arr.time = it.create_time;
                arr.detail = it.infos;
                arr.id = it.id;
                arr.salary = it.price;
                list.push(arr);
              }
            }

            //获取interviewer数组
            if (type == 3) {
              var data = res.data.data;
              for (let it of data) {
                var arr = {};
                arr.title = it.title;
                arr.name = it.lastName;
                arr.logo = it.portrait;
                arr.addr = it.addressInfo;
                arr.hot = it.view;
                arr.lng = it.lon;
                arr.lat = it.lat;
                arr.position = "人事经理";
                arr.distance = it.distance;
                arr.time = it.create_time;
                arr.id = it.id;
                arr.salary = it.prices;
                arr.education = it.education;
                arr.experience = it.exp;
                list.push(arr);
              }
            }
            this.$refs["infinitescrollDemo"].$emit(
              "ydui.infinitescroll.finishLoad"
            );
            this.param.page++;
            this.selfMainLoadClosed();
          } else {
            if (res.data.code == -1) {
              this.selfToast({
                mes: "登录超时请重试",
                timeout: 1500,
                icon: "error"
              });
              this.goURL({
                url: "/login",
                timeout: 1600
              });
              setTimeout(() => {
                this.selfMainLoadClosed();
              }, 1600);
            } else {
              this.selfToast({
                mes: res.data.info,
                timeout: 1500,
                icon: "error"
              });
              setTimeout(() => {
                this.selfMainLoadClosed();
                this.selfLoadOpend({
                  mes: "暂无数据",
                  status: false
                });
              }, 1600);
            }
          }
        })
        .catch(err => {
          this.selfToast({
            mes: "网络故障请重试",
            timeout: 1500,
            icon: "error"
          });
          setTimeout(() => {
            this.selfMainLoadClosed();
            window.history.go(-1);
          }, 1600);
          console.error(err);
        });
    },

    loadList() {
      var MaxPage = Math.ceil(this.param.count / this.param.length);
      var next = this.param.page + 1;
      if (MaxPage == next) {
        this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
        this.selfLoadOpend({
          mes: "没有更多数据了",
          status: false
        });
        setTimeout(() => {
          this.selfLoadClosed();
        }, 1500);
        return;
      } else {
        this.selfLoadOpend({
          mes: "加载数据中...",
          color: "fc-blue",
          font: 30,
          status: true
        });
        // var page = next * this.param.length;
        this.getPageInfo(next);
      }
    },

    select_tab_value(v) {
      if (v) {
        console.log(v);
      }
    }
  },
  components: {
    "self-select-tabbar": SelectTabbar, //引用选择导航栏组件
    "self-post-card": PostCard, //引用岗位信息组件
    "self-load-frame": LoadFrame, //引用load提示框组件
    "self-info-card": InfoCard //引用兼职/技能信息组件
  }
};
</script>
<style lang="scss">
.clear_fixed {
  height: 50px;
}

.info_content {
  padding-top: 5px;
  padding-bottom: 20%;
  overflow: scroll;

  .cards {
    display: inline-block;
    text-decoration: none;
    padding: 10px;
  }

  .post_info_cards {
    display: inline-block;
    width: 100%;
    text-decoration: none;
    padding: 15px;
  }

  .resume_items {
    display: inline-block;
    text-decoration: none;
    width: 100%;
    padding: 10px 15px;
  }
}
</style>
