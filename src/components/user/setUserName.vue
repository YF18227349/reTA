<template>
<div class="set_user_name w-100">
  <div class="set_name_group w-100">
    <a href="javascript:;" class="line_input_item bg-white p-r">
      <span class="f-left"></span>
      <input type="text" class="line_input fs-3 fw-5" placeholder="请输入昵称" v-model="lastName">
      <a href="javascript:;" class="clearBtn p-a" :class="name_code?'bg-lightdark':'bg-white'" @click="update_name=''">
        <span class="fw-7 fc-white iconfont icon-error"></span>
      </a>
    </a>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "设置昵称"
      },
      lastName: "",
      name_code: false,
      userSetting: null,
    };
  },
  mounted() {
    $(".header_right>span").html("确定").addClass("fw-6 fc-gray fs-3");
    $(".header_right").click(() => {
      this.do_update();
    });
  },
  created() {
    this.selfMainLoadOpend();
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 0
    });
    this.init();
  },
  methods: {
    init() {
      this.getPageInfo();
      // 获取菜单数据
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },
    getPageInfo() {
      this.userSetting = this.getCache("userSetting", 2);
      this.lastName = this.userSetting.lastName ? this.userSetting.lastName : '';
    },
    do_update() {
      var lastName = this.lastName;
      if (!lastName) {
        this.$dialog.toast({
          mes: "昵称不能为空",
          timeout: 1500
        });
        return;
      }
      this.userSetting.lastName = lastName;
      this.setCache("userSetting", JSON.stringify(this.userSetting));
      setTimeout(() => {
        window.history.go(-1);
      }, 200);
    }
  },
  destroyed() {
    $(".header_right>span").html("");
    $(".header_right").unbind("click");
  },
  watch: {
    update_name() {
      if (this.update_name) {
        this.name_code = true;
      } else {
        this.name_code = false;
      }
    }
  }
};
</script>
<style lang="scss">
a.clearBtn {
    top: 50%;
    margin-top: -9px;
    right: 5%;
    width: 18px;
    height: 18px;
    span {
        font-size: 14px;
        font-weight: 600;
    }
}
.line_input {
    padding-left: 10px !important;
}
</style>
