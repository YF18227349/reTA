<template>
  <div class="select_addr w-100">
    <header class="select_addr_header bg-gray w-100">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
      <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
      <a href="javascript:;" class="last">
        <span class="fw-5 fc-fark fs-3">保存</span>
      </a>
    </header>
    <div class="clear-fixed"></div>
    <div class="select_addr_group">
      <ul class="select_addr_list bg-white mt-4">
        <li class="item_addr">
          <span class="mr-5">地 址:</span>
          <span>{{pageInfo.addr}}</span>
        </li>
        <li class="item_trash">
          <span class="mui-icon mui-icon-trash">&nbsp;&nbsp;删除</span>
        </li>
      </ul>
    </div>
    <a href="javascript:;" class="edit_btn bg-blue w-100">
      <span class="fm-1 fw-6 fc-white">编辑地址</span>
    </a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "地址选择",
        addr: "陕西省西安市未央区"
      }
    };
  }
};
</script>
<style lang="scss">
</style>
