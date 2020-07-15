<template>
  <div class="holder_info">
    <header class="holder_info_header bg-gray w-100 fc-dark">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark iconfont icon-previewleft"></a>
      <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
      <a href="javascript:;" class="last"></a>
    </header>
    <div class="clear-fixed"></div>
    <div class="holder_info_group">
      <ul class="holder_info_list bg-white mt-4">
        <li>
          <yd-cell-item>
            <span slot="left" class="item_title">您的姓名</span>
            <input class="item_input" type="text" slot="right" placeholder="请输入姓名">
          </yd-cell-item>
        </li>
        <li>
          <a href="javascript:;">
            <yd-cell-item arrow>
              <span slot="left" class="item_title">证件类型</span>
              <span slot="right" class="item_title">请选择</span>
            </yd-cell-item>
          </a>
        </li>
        <li>
          <yd-cell-item>
            <span slot="left" class="item_title">证件号码</span>
            <input class="item_input" type="text" slot="right" placeholder="请输入证件号码">
          </yd-cell-item>
        </li>
        <li>
          <a href="javascript:;">
            <yd-cell-item arrow>
              <span slot="left" class="item_title">居住地址</span>
              <span slot="right" class="item_title">陕西省西安市未央区</span>
            </yd-cell-item>
          </a>
        </li>
        <li>
          <yd-cell-item>
            <span slot="left" class="item_title">手机号码</span>
            <input class="item_input" type="text" slot="right" placeholder="请输入手机号码">
          </yd-cell-item>
        </li>
        <li>
          <yd-cell-item>
            <span slot="left" class="item_title">电子邮箱</span>
            <input class="item_input" type="text" slot="right" placeholder="请输入邮箱">
          </yd-cell-item>
        </li>
      </ul>
    </div>
    <a href="javascript:;" class="submitBtn btn-c bg-blue">
      <span class="fc-white fw-5">确认</span>
    </a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        title_list: ["投保人信息", "被投保人信息"],
        header_title: ""
      }
    };
  },
  created() {
    this.getPageInfo();
  },
  methods: {
    getPageInfo() {
      var type = this.getParams().type;
      this.pageInfo.header_title = this.pageInfo.title_list[type];
    }
  }
};
</script>
<style lang="scss">
</style>
