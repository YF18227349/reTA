<template>
<div class="load_data_frame" v-if="show">
  <span class="load_icon iconfont fw-6" :class="status ? `icon-loading ${load_class}` :`${load_class}`" :style="loading"></span>
  <span class="load_text fm-2 fw-6">{{mes}}</span>
</div>
</template>
<script>
export default {
  data() {
    return {
      loading: "",
      timer: "",
      x: 0
    };
  },
  created() {
    var x = this.x;
    var size = this.$store.state.loading_frame.font;
    this.$store.state.loading_frame.status = true;
    this.timer = setInterval(() => {
      x += 360;
      this.loading = `transform:rotate(${x}deg);font-size:${size}px`;
    }, 1000);
  },
  watch: {
    // show() {
    //   if (!this.$store.state.loading_frame.show) {
    //     clearInterval(this.timer);
    //     // this.x = 0;
    //   } else {
    //     var x = this.x;
    //     var size = this.$store.state.loading_frame.font;
    //     this.timer = setInterval(() => {
    //       x += 360;
    //       this.loading = `transform:rotate(${x}deg);font-size:${size}px`;
    //     }, 800);
    //   }
    // }
  },
  computed: {
    load_class() {
      var color = this.$store.state.loading_frame.color;
      var loadClass = `${color} `;
      return loadClass;
    },
    status() {
      return this.$store.state.loading_frame.status;
    },
    show() {
      return this.$store.state.loading_frame.show;
    },
    mes() {
      return this.$store.state.loading_frame.mes;
    },
    color() {
      var color = this.$store.state.loading_frame.color;
      if (color) {
        return color;
      } else {
        return "fc-gray";
      }
    }
  }
};
</script>
<style lang="scss">
.load_data_frame {
    width: 100%;
    padding: 25px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .load_icon {
        font-size: 30px;
        transition: all 1s;
    }
    .load_text {
        color: #ccc;
    }
}
</style>
