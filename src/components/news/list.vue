<template>
<div class="news-box w-100">
  <div-push-up @callback="getMore" :ajaxUrl="pushUpParam.ajaxUrl" :pages="pushUpParam.param" :params="pushUpParam.params">
    <div class="news-list" slot="plate">

      <div v-for="(item,i) in pushUpParam.dataList" :key="i">
        <router-link :to="`/NewsInfo/${item.id}`" class="new-list-item">
          <div class="item-content">
            <span class="w-100 item-title">{{item.title}}</span>
            <span class="w-100 fc-gray">{{item.createTime}}</span>
          </div>
          <div class="item-image">
            <img :src="item.pic" class="cell-image">
          </div>
        </router-link>
      </div>
    </div>
  </div-push-up>
  <div class="margin-foorer"></div>
</div>
</template>

<script>
const PushUp = ()=>import("../sub/push_up_frame");
const LoadFrame = ()=>import("../sub/loading_frame");
const LoadPlate = ()=>import("../sub/load_data_plate");
export default {
  data() {
    return {
      header_title: "新闻公告",
      loadingStatus: true,
      pushUpParam: {
        param: this.initPage(),
        params: this.initParam(),
        ajaxUrl: "Index-getNoticeList",
        dataList: []
      }
    };
  },
  mounted() {
    this.selfMainLoadOpend();
    //设置标题
    this.$store.commit("setHeaderStyle", {
      txt: this.header_title,
      type: 1
    });
    this.pushUpParam.param.length = 16;
    this.pushUpParam.params.length = 16;
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.pushUpParam.params.pid = this.getParams().pid;
      this.pushUpParam.params = {
				token: this.getToken(),
        pid: 0,
        page:1,
        length:10
      };
      // var param = {
			// 	token: this.getToken(),
      //   pid: 0,
      //   length:20,
			// 	page:1
      // };
      console.log(this.pushUpParam.params.page)
      this.__initAction(
        this.pushUpParam.ajaxUrl,
        this.pushUpParam.params,
        (res, s) => {
          for (let it of res.data) {
            var arr = {};
            arr.id = it.id;
            arr.title = it.title;
            arr.createTime = it.create_time;
            arr.infos = it.infos;
            arr.pic = it.thumb;
            this.pushUpParam.dataList.push(arr);
          }
          this.pushUpParam.param.count = res.count;
        }
      );
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },

    docaht(id) {
      this.$router.push(`/NewsInfo/${id}`);
    },

    getMore(data) {
      if (data != false) {
        for (let it of data) {
          var arr = {};
          arr.id = it.id;
          arr.title = it.title;
          arr.createTime = it.create_time;
          arr.infos = it.infos;
          arr.pic = it.thumb;
          this.pushUpParam.dataList.push(arr);
        }
      }
    }
  },
  components: {
    "div-load-plate": LoadPlate,
    "div-push-up": PushUp,
    "self-load-frame": LoadFrame
  }
};
</script>

<style lang="scss">
.margin-foorer {
    height: 60px;
}
.news-list {
    padding-top: 0.5rem;
}
.new-list-item {
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    padding: 0.5rem;
    width: 100%;
    height: 7rem;
    display: flex;
    justify-content: space-between;
    .item-content {
        width: 57%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item-title {
            font-size: 16px;
            height: 4.5rem;
            overflow: hidden;
        }
    }
    .item-image {
        width: 40%;
        height: 100%;
        // background: #f40;
        .cell-image {
            width: 100%;
            height: 100%;
        }
    }
}

div.yd-list-loading {
    display: none;
}
</style>
