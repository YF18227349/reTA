<template>
  <div class="info">
    <div class="info-t">
      <h3>{{title}}</h3>
      <p>{{createTime}}</p>
    </div>
    <div class="info-main">
      <div v-html="content"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      header_title: "详情",
      title: null,
      createTime: null,
      content: null
    };
  },
  created() {
    this.selfMainLoadOpend();
    //设置标题
    this.$store.commit("setHeaderStyle", {
      txt: this.header_title,
      type: 1
    });
    this.init();
  },
  methods: {
    init() {
      this.initPage();
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },
    initPage() {
      var param = {
        token: this.getToken(),
        id: this.getParams().id
      };
      this.__initAction("LnsuranceInfo-getInfo", param, (res, s) => {
        if (s == 1) {
          console.log(res.data[0]);
          var data = res.data[0];
          this.title = data.title;
          this.createTime = data.create_time;
          this.content = data.remarks;
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