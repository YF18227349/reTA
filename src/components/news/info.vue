<template>
  <div class="info">
    <div class="info-t">
      <h3>{{pageData.title}}</h3>
      <p>{{pageData.createTime}}</p>
    </div>
    <div class="info-main">
      <p v-html="pageData.content"></p>
    </div>
    <div class="bottom-height"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      header_title: "新闻详情",
      pageData: {
        title: null,
        createTime: null,
        content: null
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
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getArtInfo();
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },
    getArtInfo() {
      var param = {
        token: this.getToken(),
        id: this.getParams().id
      };
      this.__initAction("Index-getListNoticeShow", param, (res, s) => {
        if (s == 1) {
          console.log(res);
          let data = res.data[0];
          this.pageData.title = data.title;
          this.pageData.createTime = data.create_time;
          this.pageData.content = data.notice;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.info {
  width:100vw;
  padding: 0 15px;
  box-sizing: border-box;
  overflow: hidden;
  // margin-bottom:60px;
  // padding-bottom: 60px;
  div{
    width:100%;
    word-wrap: wrap;
  }
  .bottom-height {
    height: 60px;
    width: 100%;
  }
}
.info-t {
  margin-bottom: 15px;
  border-bottom: 1px dashed #dedede;
  padding: 15px 0;
  line-height: 1.5;
  text-align: center;
}
.info-t h3 {
  font-size: 18px;
}
.info-t p {
  font-size: 13px;
}
.info-main {
  line-height: 1.7;
}
.info-main img {
  width: 100%;
}
</style>