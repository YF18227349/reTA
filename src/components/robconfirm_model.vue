<template>
  <div class="robConfirm">
    <ul class="items">
      <li class="item1">
        <span>{{confirmInfo.title}}</span>
      </li>
      <li class="item2">
        <span class="info_text">
          <span>{{confirmInfo.name}}</span>
          <img :src="confirmInfo.logo" alt>
        </span>
        <span class="info_price">
          <span class="fc-red">¥{{confirmInfo.price}}</span>
          <span class="fc-red">/天</span>
        </span>
      </li>
      <li class="item3">
        <span class="info_detail">{{confirmInfo.detail}}</span>
      </li>
      <li class="item4">
        <a href="javascript:;">立即抢单</a>
      </li>
      <li class="item5">
        <a href="javascript:;">同意抢单</a>
        <a href="javascript:;">拒绝抢单</a>
      </li>
      <li class="item6">
        <router-link :to="'/payment/'+sid+'/'+0">平台支付</router-link>
        <a href="javascript:;">线下支付</a>
        <router-link :to="'/payment/'+sid+'/'+1">履约保证金</router-link>
      </li>
      <li class="item7">
        <span class="fc-red">注:邀约后可自行协商平台支付,线下支付和是否需要履约保证金</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sid: null,
      pay_code: null,
      confirmInfo: {
        title: "办公设备维修",
        name: "李师傅专业维修",
        logo: "./static/imgs/main/mark_card_1.png",
        price: "50",
        type: 0,
        detail:
          "负责批改教育机构假期学生考试作业以及教材资,工作内容,评阅小学1-6年级数学语文..."
      }
    };
  },
  created() {
    this.get_sid();
  },
  methods: {
    get_sid() {
      this.sid = this.getParams().sid;
    }
  }
};
</script>
<style>
</style>

