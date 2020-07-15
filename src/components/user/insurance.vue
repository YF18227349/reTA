<template>
<div class="user_insurance">
  <ul class="user_insurance_tabs bg-white">
    <li v-for="(item,i) in tabList" :key="i" class="tab_item">
      <a href="javascript:;" class="item" @click="tabCode=i">
        <span class="item_code" :class="tabCode==i?'selectTab':'unSelectTab'">{{item.title}}</span>
      </a>
    </li>
  </ul>
  <div class="clear-fixed"></div>
  <div class="user_insurance_group w-100">
    <a href="javascript:;">
      <self-no-data title="暂无数据..."></self-no-data>
    </a>
    <div v-if="false">
      <yd-cell-group class="user_insurance_info">
        <yd-cell-item class="info_items brb-gary" arrow>
          <span slot="left" class="item1">{{insurance_type}}</span>
          <span slot="left" class="item1">{{userInsuranceInfo.telcode}}</span>
        </yd-cell-item>
        <yd-cell-item class="info_items">
          <span slot="left" class="info_title">{{userInsuranceInfo.title}}</span>
        </yd-cell-item>
        <yd-cell-item class="info_items">
          <span slot="left">投保计划:</span>
          <span slot="left">{{userInsuranceInfo.telcode}}天</span>
        </yd-cell-item>
        <yd-cell-item class="info_items">
          <span slot="left">保险期间:</span>
          <span slot="left">{{userInsuranceInfo.start_time}} 至 {{userInsuranceInfo.end_time}}</span>
        </yd-cell-item>
        <yd-cell-item class="info_items">
          <span slot="left">被保险人:</span>
          <span slot="left">{{userInsuranceInfo.uname}}</span>
        </yd-cell-item>
        <yd-cell-item class="info_items">
          <span slot="left">保费:</span>
          <span slot="left">¥ {{userInsuranceInfo.salary}}</span>
        </yd-cell-item>
        <yd-cell-item class="info_items">
          <span slot="left">投保人数:</span>
          <span slot="left">{{userInsuranceInfo.count}}</span>
        </yd-cell-item>
        <yd-cell-item class="info_items">
          <span slot="left">实付款:</span>
          <span slot="left" class="item-pay fw-5">¥{{userInsuranceInfo.pay}}</span>
          <img slot="right" :src="userInsuranceInfo.logo" class="info_logo">
        </yd-cell-item>
        <yd-cell-item class="info_items">
          <a href="javascript:;" class="item_btn fc-gray br-gray fw-5" slot="right">{{itemBtnName}}</a>
          <a href="javascript:;" class="item_btn fc-white bg-blue fw-5" slot="right" v-if="tabCode==0">立即付款</a>
        </yd-cell-item>
      </yd-cell-group>
    </div>
  </div>
</div>
</template>
<script>
const NoData = ()=>import("../sub/noDataModel");
export default {
  data() {
    return {
      pageInfo: {
        header_title: "我的保险"
      },
      tabCode: 0,
      tabList: [{
          title: "代付款",
          btn: "撤销订单"
        },
        {
          title: "已承保",
          btn: "查看保单"
        },
        {
          title: "核保中",
          btn: "审核中"
        },
        {
          title: "被拒保",
          btn: "联系客服"
        }
      ],
      userInsuranceInfo: {
        title: "新一站-太平洋保险计划",
        telcode: "18111111111",
        days: 3,
        start_time: "2018-10-22 00时",
        end_time: "2019-12-22 24时",
        uname: "刘小姐",
        salary: 100,
        count: 1,
        pay: 100,
        logo: "./static/imgs/user_center/cpic.png"
      }
    };
  },
  created() {
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 1
    });
    // this.selfMainLoadOpend();
    // this.init();
  },
  methods: {
    init() {
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    }
  },
  computed: {
    insurance_type() {
      return this.tabList[this.tabCode].title;
    },
    itemBtnName() {
      return this.tabList[this.tabCode].btn;
    }
  },

  components: {
    "self-no-data": NoData
  }
};
</script>
<style lang="scss">
</style>
