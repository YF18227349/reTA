<template>
  <div class="lesson_group w-100">
    <header class="lesson_group_header bg-gray shadow-dark w-100">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
      <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
      <a href="javascript:;" class="last"></a>
    </header>
    <div class="clear-fixed"></div>
    <div class="c1" style="overflow-y: auto;">
      <yd-scrollnav height="44px" color="#8f8f94" current-color="#028ce4" :callback="back_value">
        <yd-scrollnav-panel index :label="item.title" v-for="(item, key) in tabList" :key="key"></yd-scrollnav-panel>
      </yd-scrollnav>
    </div>

    <div class="clear-fixed"></div>
    <div class="lesson_group_list w-100">
      <p class="w-100 text-center fc-dark fm-3 fw-6" v-if="emptyIsShow">暂无数据...</p>

      <div class="lesson_video mb-3" v-for="(item,i) in video_list" :key="i" @click="open_video(i)">
        <img :src="item.thumb" alt>
        <div class="lesson_info">
          <span class="mb-3 ml-2">{{item.title}}</span>
          <yd-cell-item>
            <span slot="left">{{tabList[tab_code].label}}</span>
            <span slot="right">{{item.videoScore}}</span>
          </yd-cell-item>
        </div>
      </div>
    </div>
    <div class="play_modal" v-if="play_show">
      <a
        href="javascript:;"
        class="w-100 p-r play_container"
        @click="play_btn_show = !play_btn_show"
      >
        <a href="javascript:;" class="play_plate p-a"></a>
        <video
          :src="video_url"
          autoplay
          controls
          class="video_data w-100"
          @focus="play_btn_show = !play_btn_show"
        ></video>
        <a
          href="javascript:;"
          class="play_close_btn p-a"
          @click="play_show=false"
          v-if="play_btn_show"
        >
          <span class="iconfont icon-error fw-7 fc-white"></span>
        </a>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "课程分类"
      },
      play_height: "",
      play_show: false,
      play_btn_show: false,
      video_list: [],
      video_url: "",

      tab_code: 0,
      tabList: [],
      emptyIsShow: false,
        params:this.initParam(),
    };
  },
  mounted() {
    var h = document.documentElement.clientHeight;
    this.play_height = h + "px";
  },
  created() {
    this.getPageInfo();
    this.params.fields = "create_time";
  },
  methods: {
    getPageInfo() {
      var url = this.Global.baseURL + "/-.jsp";
      
      this.__initAction("Videotype-getTypeVideo", { token:this.params.token }, (res, s) => {
        if (s == 1) {
          this.tabList = res.data;
          var id = res.data[0].id;
          this.getDataList(id);
        } else {
          this._msg(res.info);
        }
      });
    },
    getDataList(id) {
      this.params.id = id;
      this.video_list=[];
      this.__initAction("Video-getlistVideo", this.params, (res, s) => {
        if (s == 1) {
          this.video_list = res.data;
        } else {
          this._msg(res.info);
        }
      });
    },
    select_tab(x) {
      this.pageInfo.tab_code = x;
      var token = this.getToken();
      var id = this.pageInfo.tabList[x].id;
      this.getVideoList(token, id);
    },
    back_value(v) {
      var token = this.getToken();
      var id = this.pageInfo.tabList[v].id;
      this.getVideoList(token, id);
    },
    open_video(i) {
      this.play_show = true;
      this.video_url = this.video_list[i].url;
    }
  }
};
</script>
<style lang="scss">
.c1 {
  width: 100%;
  height: 44px;
  background: #fff;
  position: fixed;
}
ul.yd-scrollnav-tab-item {
  li {
    font-size: 14px;
    font-weight: 600;
    margin-right: 15px;
    padding: 0 5px;
    span {
      margin-left: 10px;
      height: 40px;
    }
  }
}
.yd-scrollnav-current {
  span {
    border-bottom: 2px solid #028ce4;
  }
}
ul.yd-scrollnav-tab-item > li.yd-scrollnav-current > i {
  display: none;
}
div.yd-scrollnav-toggle {
  width: 50px;
  display: none;
}
</style>
