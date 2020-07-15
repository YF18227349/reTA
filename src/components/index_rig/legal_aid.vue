<template>
  <div class="legal_aid w-100">
    <!-- <header class="legal_aid_header bg-gray w-100">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-8 iconfont icon-previewleft"></a>
      <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
      <a href="javascript:;" class="last"></a>
    </header>-->
    <!-- <div class="clear-fixed"></div> -->
    <div class="legal_aid_group w-100">
      <ul class="legal_aid_list w-100">
        <li>
          <a href="javascript:;" class="line_input_item">
            <span class="f-left fs-3 fw-6 fc-dark">标题</span>
            <input
              type="text"
              class="line_input fs-3 fw-5 fc-dark"
              placeholder="请输入标题"
              v-model="title"
            >
          </a>
        </li>
        <li>
          <a href="javascript:;" class="line_input_item">
            <span class="f-left fs-3 fw-6 fc-dark">姓名</span>
            <input
              type="text"
              class="line_input fs-3 fw-5 fc-dark"
              placeholder="请输入姓名"
              v-model="userName"
            >
          </a>
        </li>
        <li>
          <a href="javascript:;" class="line_input_item">
            <span class="f-left fs-3 fw-6 fc-dark">电话</span>
            <input
              type="tel"
              class="line_input fs-3 fw-5 fc-dark"
              maxlength="11"
              placeholder="请输入电话"
              v-model="userTel"
            >
          </a>
        </li>
        <li class="sketch_item">
          <p class="fc-dark fs-3 fw-6">兼职简述</p>
          <yd-textarea
            class="fs-3 fw-6 fc-dark"
            placeholder="请输入兼职简述"
            maxlength="300"
            v-model="sketch"
          ></yd-textarea>
        </li>
      </ul>
    </div>
    <p class="fs-3 fw-6 fc-gray p-5">注：提交后请保持电话畅通，24小时内会有工作人员联系您。</p>
    <a href="javascript:;" class="submitBtn btn-c bg-blue" @click="do_submit()">
      <span class="fc-white fw-6 fm-2">确认提交</span>
    </a>

    <div class="submit_toast_group" v-if="openDom.status">
      <div class="tosat_list bg-white">
        <span
          class="tosat_logo iconfont fc-white fw-6"
          :class="openDom.status?'icon-duihao4 bg-blue':'bg-red con-chahao1'"
        ></span>
        <span class="toast_text fc-dark fm-2">{{openDom.status ? '提交成功':'提交失败'}}</span>
        <button class="toast_btn fc-white bg-red fm-1 fw-6" @click="alertBack(openDom.type)">返回</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "法律援助",
        open: false,
        status: true,
        toast_msg: ""
      },
      title: "",
      userTel: null,
      userName: "",
      sketch: "",

      openDom: {
        status: false,
        type: 1
      }
    };
  },
  mounted() {},
  created() {
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 1
    });

    if (this.deBug()) {
      this.title = "测试法律援助";
      this.userTel = "13333333333";
      this.userName = "测试姓名";
      this.sketch = "测试需求描述";
    }
  },
  methods: {
    do_submit() {
      var token = this.getToken();
      var title = this.title;
      var userName = this.userName;
      var userTel = this.userTel;
      var sketch = this.sketch;
      if (!title) {
        this._msg("标题不能为空");
        return;
      }
      if (!userName) {
        this._msg("请输入姓名");
        return;
      }
      var reg = this.Global.reg_phone;
      if (!this.checkPhone(userTel, reg)) {
        this._msg("联系电话输入有误");
        return;
      }
      if (!sketch) {
        this._msg("需求简述不能为空");
        return;
      }
      var params = { token, title, sketch, userName, userTel };
      this.__initAction("Law-addLaw", params, (res, s) => {
        if (s == 1) {
          this.openDom.status = true;
          this.openDom.type = 2;
          setTimeout(() => {
            this.pageInfo.open = false;
            window.history.go(-1);
          }, 10000);
        } else {
          this._msg(res.info);
        }
      });
    },
    alertBack(t) {
      this.pageInfo.open = false;
      window.history.go(-1);
    }
  }
};
</script>
<style lang="scss">
</style>
