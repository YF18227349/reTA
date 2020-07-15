<template>
  <div class="social_substitute w-100">
    <header class="social_substitute_header bg-gray w-100 fc-dark">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark iconfont icon-previewleft"></a>
      <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
      <a href="javascript:;" class="last"></a>
    </header>
    <div class="clear-fixed"></div>
    <div class="social_substitute_group w-100">
      <ul class="social_substitute_list w-100">
        <li>
          <yd-cell-item>
            <span slot="left" class="item_title">请填写个人信息</span>
          </yd-cell-item>
        </li>
        <li class="bg-white">
          <yd-cell-item>
            <span slot="left" class="item_title">类别</span>
            <span
              slot="left"
              class="item_type"
              :class="pageInfo.typeCode==i?'fc-white bg-blue':''"
              v-for="(tmp,i) in pageInfo.type"
              :key="i"
              @click="pageInfo.typeCode=i"
            >{{tmp}}</span>
          </yd-cell-item>
        </li>
        <li class="bg-white">
          <yd-cell-item>
            <span slot="left" class="item_title">姓名</span>
            <input slot="right" class="item_input" type="text" placeholder="请输入您的姓名">
          </yd-cell-item>
        </li>
        <li class="bg-white">
          <yd-cell-item>
            <span slot="left" class="item_title">电话</span>
            <input slot="right" class="item_input" type="tel" placeholder="请输入电话号码" maxlength="11">
          </yd-cell-item>
        </li>
        <li>
          <span class="fc-red fw-5 fs-2">注：提交信息后请保持电话通畅，工作人员会在24小时内联系您</span>
        </li>
      </ul>
    </div>
    <a
      href="javascript:;"
      class="submitInfoBtn btn-c bg-blue mt-2"
      @click="pageInfo.open=!pageInfo.open"
    >
      <span class="fc-white fw-5 fm-1">提交信息</span>
    </a>
    <div class="submit_toast_group" v-if="pageInfo.open">
      <div class="tosat_list bg-white">
        <span class="tosat_logo iconfont icon-right8 bg-blue fc-white fw-6"></span>
        <span class="toast_text fc-blue fs-3">提交成功</span>
        <button class="toast_btn fc-white bg-red fm-1 fw-6" @click="pageInfo.open=!pageInfo.open">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "社会险代缴",
        type: ["新缴", "转移"],
        typeCode: 0,
        open: false
      }
    };
  }
};
</script>

<style lang="scss">
</style>
