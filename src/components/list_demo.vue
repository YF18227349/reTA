<template>
  <div class="message_sys w-100">
    <!-- <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
      <div class="sys_news_list" slot="list">
        <div class="sys_news_item w-100" v-for="(item,i) in sysNewsList" :key="i" @click="docaht()">
          <span class="news_item_time">{{item.time}}</span>
          <div class="news_item_info w-100 bg-white">
            <span class="mb-3">系统通知</span>
            <span>{{item.msg}}</span>
          </div>
        </div>
    </div>-->

    <!-- 数据全部加载完毕显示 -->
    <!-- <span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span> -->

    <!-- 加载中提示，不指定，将显示默认加载中图标 -->
    <!-- <span slot="loadingTip" class="pt-5 pb-5 fm-2 fc-dark">加载中</span> -->
    <!-- </yd-infinitescroll> -->

    <self-push-up @callback="getMore1" :url="url" :pages="param" :params="params">
      <div class="sys_news_list" slot="plate">
        <div class="sys_news_item w-100" v-for="(item,i) in sysNewsList" :key="i" @click="docaht()">
          <span class="news_item_time">{{item.time}}</span>
          <div class="news_item_info w-100 bg-white">
            <span class="mb-3">系统通知</span>
            <span>{{item.msg}}</span>
          </div>
        </div>
      </div>
    </self-push-up>
    <!-- <div class="zhezhao" v-if="load_show"></div>
    <self-load-plate v-if="load_show" class="self_load_plate fc-blue"></self-load-plate>-->
  </div>
</template>

<script>
const PushUp = ()=>import("../components/sub/push_up_frame");
const LoadPlate = ()=>import("../components/sub/load_data_plate");
export default {
  data() {
    return {
      pageInfo: {
        header_title: "系统消息"
      },
      param: {
        page: null,
        length: null,
        count: null
      },
      params: {},
      count: 0,
      url: "",
      load_show: false,
      sysNewsList: [
        {
          time: "2019-03-19  12:00",
          msg:
            "积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦。"
        },
        {
          time: "2019-03-18  13:30",
          msg:
            "积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦。"
        },
        {
          time: "2019-03-10  14:10",
          msg:
            "积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦。"
        },
        {
          time: "2019-03-19  12:00",
          msg:
            "积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦。"
        },
        {
          time: "2019-03-18  13:30",
          msg:
            "积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦。"
        },
        {
          time: "2019-03-10  14:10",
          msg:
            "积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦。"
        },
        {
          time: "2019-03-19  12:00",
          msg:
            "积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦。"
        }
      ]
    };
  },
  mounted() {
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 1
    });
  },
  created() {
    this.url = "path.com";
    this.getPageInfo();
  },
  methods: {
    getPageInfo() {
      this.param.page = this.Global.page_num;
      this.param.length = this.Global.length_num;
      setTimeout(() => {
        this.param.count = 21;
      }, 1000);
    },
    loadList() {
      this.load_show = true;
      this.selfLoadOpen({
        mes: "",
        color: "fc-blue",
        font: 40,
        status: true
      });
      setTimeout(() => {
        // this.load_show = false;
        this.getMore();
      }, 2000);
    },
    docaht() {
      console.log("ok");
    },
    // getMore() {
    //   var list = [
    //     {
    //       time: "2019-03-19  12:00",
    //       msg:
    //         "积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦。"
    //     },
    //     {
    //       time: "2019-03-18  13:30",
    //       msg:
    //         "积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦。"
    //     },
    //     {
    //       time: "2019-03-10  14:10",
    //       msg:
    //         "积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦。"
    //     },
    //     {
    //       time: "2019-03-19  12:00",
    //       msg:
    //         "积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦。"
    //     },
    //     {
    //       time: "2019-03-18  13:30",
    //       msg:
    //         "积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦，积分到账啦。"
    //     }
    //   ];
    //   if (this.count == 3) {
    //     this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
    //     this.load_show = false;
    //     this.selfLoadOpen({
    //       mes: "没有更多数据了",
    //       status: false
    //     });
    //     setTimeout(() => {
    //       this.selfLoadClose({
    //         mes: ""
    //       });
    //     }, 1000);
    //     return;
    //   }
    //   this.load_show = false;
    //   this.count++;
    //   this.sysNewsList = this.sysNewsList.concat(list);
    //   this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
    // },
    getMore1(data) {
      this.sysNewsList = this.sysNewsList.concat(data);
    }
  },
  components: {
    "self-load-plate": LoadPlate,
    "self-push-up": PushUp
  }
};
</script>
<style lang="scss">
.yd-navbar {
  font-weight: 600;
}
.yd-back-icon:before,
.yd-next-icon:before {
  font-size: 17px;
  margin: 10px;
}
</style>
