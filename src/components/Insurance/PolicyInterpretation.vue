<template>
  <div class="PolicyInterpretation">
    <div class="PolicyInterpretation-ul">
      <ul>
        <li v-for="(tmp,i) in plList" :key="i" style="height:auto;">
          <router-link :to=" '/PolicyInterpretationInfo/' + tmp.id ">
            <img :src="tmp.img" class="carouselImg" width="100%">
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      header_title: "社保政策解读",
      plList: [],
      param: this.initPage(),
      params: this.initParam()
    };
  },
  mounted() {
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
      this.getPageInfo();
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },
    getPageInfo() {
      this.__initAction("LnsuranceInfo-getList", this.params, (res, s) => {
        if (s == 1) {
          this.plList = res.data;
        }
      });
    }
  }
};
</script>
<style lang="sass">
</style>
