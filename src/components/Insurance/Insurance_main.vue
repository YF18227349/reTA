<template>
  <div class="insurance_main w-100">
    <a href="javascript:history.go(-1)" class="header_logo">
      <span class="iconfont icon-previewleft fc-white fw-6"></span>
    </a>
    <div class="insurance_main_banner w-100">
      <img src="/static/imgs/baoxian/main_banner.png" alt>
    </div>
    <ul class="insurance_main_info bg-white">
      <li>
        <yd-cell-item>
          <span slot="left" class="fs-3 fc-dark">适用人群：身体健康、能正常生活和工作的人士</span>
        </yd-cell-item>
      </li>
      <li>
        <yd-cell-item>
          <span slot="left" class="fs-3 fc-dark">保险期间：1年</span>
        </yd-cell-item>
      </li>
    </ul>
    <div class="guarantee_info w-100 bg-white mt-4">
      <p class="guarantee_title">保障内容</p>
      <ul class="guarantee_list" v-for="(tmp,i) in infoList" :key="i">
        <li class="item_title">
          <yd-cell-item>
            <span slot="left" class="fs-3 fc-dark">{{tmp.title}}</span>
          </yd-cell-item>
        </li>
        <li v-for="(item,j) in tmp.list" :key="j" class="item_detail">
          <yd-cell-item>
            <span slot="left" class="fs-3 fc-gray">{{item.title}}</span>
            <span slot="right" class="fs-3 fc-red">{{item.total}}</span>
          </yd-cell-item>
        </li>
      </ul>
    </div>
    <div class="main_img w-100 mt-4">
      <img src="/static/imgs/baoxian/main_img.png" alt class="w-100">
    </div>
    <div class="insurance_main_btns">
      <a href="javascript:;" class="service_btn bg-yellow">
        <span class="icon-logo mui-icon-extra mui-icon-extra-custom fm-3 fc-white"></span>
        <span class="fc-white fs-3">客服</span>
      </a>
      <a href="javascript:;" class="total_btn bg-white">
        <span class="insurance_total fc-red fm-1 fw-5">199.00</span>
      </a>
      <router-link to="/insurance_info" class="submit_btn bg-blue">
        <span class="fc-white fw-5 fm-1">立即投保</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoList: [
        {
          title: "意外伤害保障",
          list: [{ title: "意外伤害", total: "50万元" }]
        },
        {
          title: "医疗保险",
          list: [
            { title: "突发疾病身故保险金", total: "20万元" },
            { title: "意外医疗", total: "2万元" }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="scss">
</style>
