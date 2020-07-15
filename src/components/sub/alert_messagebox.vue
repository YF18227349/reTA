<template>
  <div class="alert_messagebox w-100">
    <div class="alert_plate" :class="alert?'alert_show':'alert_hidden'">
      <ul class="message_box bg-white shadow-dark">
        <li>
          <span class="message_box_icon iconfont icon-tanhaotishi fc-yellow"></span>
        </li>
        <li>
          <span class="message fm-1 fc-gray fw-6">{{message}}</span>
        </li>
        <li :style="cancel?'justify-content:space-around':'justify-content: center'">
          <a
            href="javascript:;"
            class="message_box_btn"
            :class="tmp.style"
            v-for="(tmp,i) in btn_list"
            :key="i"
            @click.prevent="tmp.fn"
          >
            <span class="fm-1 fw-6">{{tmp.title}}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.state.alert.value = false;
  },
  methods: {
    do_cancel() {
      // this.$store.state.alert.value = false;
      this.$store.state.alert.alert = false;
    },
    done() {
      // this.$store.state.alert.value = true;
      this.$store.state.alert.alert = false;
      this.$store.state.alert.opt();
    }
  },
  computed: {
    alert() {
      return this.$store.state.alert.alert;
    },
    message() {
      return this.$store.state.alert.mes;
    },
    cancel() {
      return this.$store.state.alert.cancel;
    },
    btn_list() {
      if (this.$store.state.alert.cancel) {
        return [
          {
            title: "取消",
            fn: () => {
              this.do_cancel();
            },
            style: "bg-white br-gray fc-gray"
          },
          {
            title: "确定",
            fn: () => {
              this.done();
            },
            style: "bg-blue br-blue fc-white"
          }
        ];
      } else {
        return [
          {
            title: "确定",
            fn: () => {
              this.do_cancel();
            },
            style: "bg-white br-gray fc-gray"
          }
        ];
      }
    }
  }
};
</script>
<style lang="scss">
.alert_messagebox {
  .alert_plate {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    transition: all, 0.5s;
    display: flex;
    justify-content: center;

    align-items: center;
    .message_box {
      list-style: none;
      width: 75%;
      padding: 15px 0 0;
      border-radius: 8px;
      overflow: hidden;
      li {
        padding: 10px 0;
        display: flex;
        justify-content: center;
      }
      .message_box_icon {
        font-size: 3rem;
      }
      li:last-child {
        padding: 8px 0 0;
      }
      .message_box_btn {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
      }
    }
  }
  .alert_show {
    opacity: 1;
    z-index: 100;
  }
  .alert_hidden {
    opacity: 0;
    z-index: -1;
  }
}
</style>
