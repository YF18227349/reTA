<template>
<div class="payment_completed">
  <div class="pay_completed_logo">
    <!-- <img :src="pageInfo.logo" alt> -->
    <span>{{pageInfo.msg}}</span>
  </div>
  <div class="pay_completed_btn w-100">
    <!-- <router-link to="/" class="myOrderBtn bg-blue"> -->
    <!-- <span class="fc-white fm-2 fw-6">我的订单</span> -->
    <!-- </router-link> -->
    <router-link to="/main" class="backBtn bg-white br-blue">
      <span class="fc-dark fm-2 fw-6">返回首页</span>
    </router-link>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "发票申请",
        msg: "发票申请成功！"
        // logo: "http://static.sxtian.com/imgs/main/nofound.png"
      }
    };
  },
  created() {
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 0
    });
  }
};
</script>
<style lang="scss">
</style>
