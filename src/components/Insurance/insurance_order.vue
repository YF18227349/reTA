<template>
  <div class="insurance_order w-100">
    <header class="insurance_info_header bg-gray w-100 fc-dark">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
      <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
      <a href="javascript:;" class="last"></a>
    </header>
    <div class="clear-fixed"></div>
    <div class="insurance_order_group w-100">
      <ul class="insurance_order_list w-100">
        <li class="item item_title">投保信息</li>
        <li class="item">
          <span>{{insuranceInfoList.title}}</span>
        </li>
        <li class="item">
          <span>保障内容</span>
        </li>
        <li class="item">
          <span>投保时间</span>
          <span>{{insuranceInfoList.term}}</span>
        </li>
        <li class="item">
          <span>保险期间</span>
          <div>
            <span>{{insuranceInfoList.startTime}}</span>
            <span>&nbsp;至&nbsp;</span>
            <span>{{insuranceInfoList.endTime}}</span>
          </div>
        </li>
        <li class="item">
          <span>投保人</span>
          <span>{{insuranceInfoList.holder}}</span>
        </li>
        <li class="item">
          <span>被保人</span>
          <span>{{insuranceInfoList.holded}}</span>
        </li>
        <li class="item mt-4 mb-4">
          <span>保费</span>
          <span class="item_cost">{{insuranceInfoList.cost}}</span>
        </li>
        <li class="item item_orderDetail">
          <div class="item_order_oid">
            <span>订单号 :</span>
            <span>{{insuranceInfoList.oid}}</span>
          </div>
          <div class="item_order_create">
            <span>创建时间 :</span>
            <span>{{insuranceInfoList.createTime}}</span>
          </div>
        </li>
        <li class="item">
          <a
            href="javascript:;"
            class="item_checkbox"
            :class="pageInfo.checkBox_code?'bg-green':'bg-white br-dark'"
            @click="pageInfo.checkBox_code = !pageInfo.checkBox_code"
          >
            <span class="iconfont icon-right8"></span>
          </a>
          <span class="item_agreement ml-2">
            我已阅读并同意
            <a href="javascript:;">投保声明</a>
          </span>
        </li>
      </ul>
    </div>
    <div class="insurance_order_footer w-100">
      <div class="footer_text bg-white w-70">
        <span class="insurance_total fc-red fw-5">199.00</span>
      </div>
      <router-link to="/insurance_payment" class="footer_Btn bg-blue w-30">
        <span class="fc-white fw-5 fm-1">支付</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "订单详情",
        checkBox_code: true
      },
      insuranceInfoList: {
        title: "大金刚个人综合保险B计划",
        term: "1年",
        holder: "张先生",
        holded: "刘女士",
        startTime: "2018-11-30 00时",
        endTime: "2019-11-30 24时",
        cost: 199.0,
        oid: 123123123,
        createTime: "2018-11-09 17:13:04"
      }
    };
  }
};
</script>
<style lang="scss">
</style>
