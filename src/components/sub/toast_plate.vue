<template>
  <div
    class="toast_plate"
    :class="toastShow ?'toast_plate_show':'toast_plate_hidden'"
    :style="text_style"
  >
    <div class="toast_message_box">
      <span class="toast_message_text fm-2 fc-white">{{message}}</span>
      <span class="toast_message_icon iconfont fc-white" :class="icon"></span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    var time = this.$store.state.toast.timeout;
    if (!time) {
      time = 1000;
    }
    setTimeout(() => {
      this.$store.state.toast.show = false;
    }, time);
  },
  watch: {
    toastShow() {
      if (this.$store.state.toast.show) {
        var time = this.$store.state.toast.timeout;
        if (!time) {
          time = 1000;
        }
        setTimeout(() => {
          this.$store.state.toast.show = false;
        }, time);
      }
    }
  },
  computed: {
    toastShow() {
      return this.$store.state.toast.show;
    },
    message() {
      return this.$store.state.toast.mes;
    },
    icon() {
      if (this.$store.state.toast.icon == "success") {
        var icon = "icon-duihaocheckmark17 mt-4";
      } else if (this.$store.state.toast.icon == "error") {
        var icon = "icon-chahao2 mt-4";
      } else {
        var icon = "";
      }
      return icon;
    },
    text_style() {
      var postion = this.$store.state.toast.postion;
      if (!postion) {
        postion = "center";
      } else if (postion == "top") {
        postion = "flex-start";
      }
      return `align-items: ${postion};`;
    }
  }

  // props: ["message", "icon"]
};
</script>
<style lang="scss">
.toast_plate {
  width: 100%;
  position: fixed;
  height: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s;

  .toast_message_box {
    padding: 20px 40px;
    max-width: 80%;
    z-index: 101;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .toast_message_icon {
      font-size: 54px;
    }
  }
}
.toast_plate_show {
  opacity: 1;
  z-index: 101;
}
.toast_plate_hidden {
  opacity: 0;
  z-index: -1;
}
</style>
