<template>
  <div class="info">
    <div class="info-t">
      <h3>测试标题</h3>
      <p>2019-11-11</p>
    </div>
    <div class="info-main">
      <p>
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
        测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      header_title: "xxxxxxxx",
      pageData: {
        title: null,
        createTime: null,
        content: null
      }
    };
  },
  mounted() {
    //设置标题
    this.$store.commit("setHeaderStyle", {
      txt: this.header_title,
      type: 1
    });
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      this.title = "title";
      this.createTime = "createTime";
      this.content = "content";
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