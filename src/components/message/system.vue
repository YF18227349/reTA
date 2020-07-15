<template>
<div class="message_sys w-100">
  <!-- <p class="fm-1 mt-5 mb-5 fc-gray w-100 fw-6 text-center" v-if="emptyIsShow">暂无数据...</p> -->
  <a v-if="sysNewsList.length==0" href="javascript:;" class="no-data-box">
    <self-no-data title="暂无数据..." size="16"></self-no-data>
  </a>
  <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
    <div class="sys_news_list" slot="list">
      <ul class="self-sys-list">
        <li class="self-sys-item" v-for="(tmp,i) in sysNewsList" :key="i">
          <h3 class="self-sys-icon">
            <img :src="tmp.logo" alt="">
          </h3>
          <div class="self-sys-content">
            <span class="icon"></span>
            <h4 class="self-sys-type">{{tmp.title}}</h4>
            <span class="self-sys-msg">{{tmp.msg}}</span>
            <div class="self-sys-bottom">
              <a href="javascript:;">查看详情</a>
              <span class="fw-5 iconfont icon-previewright"></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 数据全部加载完毕显示 -->
    <!-- <span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span> -->
    <!-- 加载中提示，不指定，将显示默认加载中图标 -->
    <!-- <span slot="loadingTip" class="pt-5 pb-5 fm-2 fc-dark">加载中</span> -->
  </yd-infinitescroll>
</div>
</template>
<script>
const NoData = ()=>import("../sub/noDataModel");
export default {
  data() {
    return {
      pageInfo: {
        header_title: "系统消息"
      },
      sysNewsList: [],

      params: this.initParam(),
      param: this.initPage(),

      nextPage: 0,
      listCount: 0,
      emptyIsShow: false
    };
  },
  mounted() {
    this.selfMainLoadOpend();
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 1
    });
    this.init();
  },
  methods: {
    init() {
      this.$dialog.loading.close();
      this.getList();
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },
    /**
     * 获取列表数据
     */
    getList() {
      this.__initAction("Member-message", this.params, (res, s) => {
        if (s == 1) {
          var logo = this.getCache("APPLOGO", 2).val;
          for (let it of res.data) {
            var arr = {};
            arr.id = it.id;
            arr.msg = it.message;
            arr.time = it.create_time;
            arr.title = it.msgTitle;
            arr.logo = logo;
            this.sysNewsList.push(arr);
          }
          this.param.count = res.count;
          this.params.count = res.count;
        } else {
          this.emptyIsShow = true;
        }
      });
    },

    loadList() {
      this.param.Max = Math.ceil(this.param.count / this.param.length);
      if (this.param.page == this.param.Max) {
        this._msg("已经到底了", 200);
        // setTimeout(() => {
        //   this.selfLoadClosed({
        //     mes: ""
        //   });
        // }, 500);
        return false;
      } else {
        this.param.page++;
        this.params.page++;
        this.getList();
        this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
      }
    },
    docaht(id) {
      console.log(id);
    }
  },

  components: {
    "self-no-data": NoData
  }
};
</script>
<style lang="scss" scoped>
.message_sys {
    .yd-navbar {
        font-weight: 600;
    }
    .yd-back-icon:before,
    .yd-next-icon:before {
        font-size: 17px;
        margin: 10px;
    }
    .sys_news_list {
        .self-sys-list {
            padding-top: 10px;
        }
        .self-sys-item {
            margin-top:10px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
        }
        .self-sys-icon,
        .self-sys-icon img {
            width: 11vw;
            height: 11vw;
            border-radius: 50%;
        }
        .self-sys-content {
            width: 80vw;
            padding: 0.8rem 0.8rem 0;
            margin-left: 3vw;
            // margin-top: 0.5rem;
            background: #fff;
            border-radius: 0.3rem;
            position: relative;
            .icon {
                width: 10px;
                height: 10px;
                background: #fff;
                display: inline-block;
                transform: rotate(45deg);
                position: absolute;
                top: 18px;
                left: -5px;
            }
        }
        .self-sys-type {
            font-size: 1rem;
            margin-bottom: 0.4rem;
        }
        .self-sys-msg {
            color: #333;
            font-size: 0.5rem;
            display: block;
            margin-bottom: 1rem;
        }
        .self-sys-bottom {
            border-top: 0.001rem solid #f1eeee;
            font-size: 0.8rem;
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            a {
                color: #09f;
            }
        }
    }
    .no-data-box {
        display: block;
        padding-top: 15px;
    }
}
</style>
