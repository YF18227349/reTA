<template>
<div class="info">
  <div class="info-t">
    <h3>{{pageData.title}}</h3>
    <p>{{pageData.createTime}}</p>
    <p>{{pageData.name}}</p>
  </div>
  <div class="info-main">
    <img :src="pageData.headerPic" alt="">
    <h1>1.背景资料</h1>
    <div class="" v-html="pageData.content">
    </div>
    <h1>2.个人历程</h1>
    <div class="" v-html="pageData.description">

    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      header_title: "专家详情",
      pageData: {
        title: null,
        createTime: null,
        content: null,
        name: null,
        headerPic: null,
        description: null
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
      this.__initAction("Expert-getInfoExpert", param, (res, s) => {
        if (s == 1) {
          var data = res.data[0];
          this._log(data);
          this.pageData.title = data.nickname;
          this.pageData.name = data.realname;
          this.pageData.headerPic = data.avatar;
          this.pageData.description = data.description;
          this.pageData.createTime = res.data.createTime;
          this.pageData.content = data.content;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.info {
    padding: 0 15px;
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
