<template>
  <div class="insurance_payment w-100">
    <header class="insurance_payment_header bg-blue w-100 fc-dark">
      <a
        href="javascript:history.go(-1)"
        class="arrow-logo fc-white fw-5 iconfont icon-previewleft"
      ></a>
      <span class="header_title fc-white">{{pageInfo.header_title}}</span>
      <a href="javascript:;" class="last"></a>
    </header>
    <div class="clear-fixed"></div>
    <div class="insurance_payment_group w-100">
      <div class="payment_info w-100 bg-white">
        <p class="fw-5">需要支付金额(元)</p>
        <p class="payment_cost fc-dark fm-2 fw-5 mt-4">199.00</p>
      </div>

      <ul class="payment_list w-100 bg-white mt-5">
        <li class="payment_title">选择支付方式</li>
        <li class="payment_type" v-for="(tmp,i) in pageInfo.paymentList" :key="i">
          <a class="w-100" href="javascript:;" @click.prevent="selectPay(i)">
            <yd-cell-item>
              <span slot="left" class="payment_logo">
                <img :src="tmp.logo" alt>
              </span>
              <span slot="left" class="payment_txt fw-5 ml-3">{{tmp.title}}</span>
              <a
                href="javascript:;"
                slot="right"
                class="payment_checkbox"
                :class="tmp.code?'bg-green':'bg-white br-dark'"
              >
                <span class="iconfont icon-right8 fc-white"></span>
              </a>
            </yd-cell-item>
          </a>
        </li>
      </ul>
    </div>
    <a href="javascript:;" class="submitBtn btn-c bg-blue">
      <span class="fc-white fw-5">立即支付</span>
    </a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "支付方式",
        paymentList: [
          {
            title: "微信支付",
            logo: "./static/imgs/main/2icon-weixin@2x.png",
            code: false
          },
          {
            title: "支付宝支付",
            logo: "./static/imgs/main/icon-zhifubao@2x.png",
            code: false
          },
          {
            title: "支付宝支付",
            logo: "./static/imgs/main/icon-zhifubao@2x.png",
            code: false
          },
          {
            title: "支付宝支付",
            logo: "./static/imgs/main/icon-zhifubao@2x.png",
            code: false
          }
        ]
      }
    };
  },
  methods: {
    selectPay(x) {
      this.pageInfo.paymentList[x].code = !this.pageInfo.paymentList[x].code;
      let list = this.pageInfo.paymentList;
      for (var i = 0; i < list.length; i++) {
        if (x != i) {
          if (list[i].code) {
            list[i].code = false;
          }
        }
      }
    }
  }
};
</script>
<style lang="scss">
</style>
