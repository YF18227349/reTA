<template>
  <div class="load_data_plate" v-if="show">
    <span class="load_icon iconfont fw-6 icon-loading" :class="load_class" :style="loading"></span>
    <span class="load_text fc-gray fm-2 fw-6">{{mes}}</span>
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
    var size = this.$store.state.load_plate.font;
    this.timer = setInterval(() => {
      x += 360;
      this.loading = `transform:rotate(${x}deg);font-size:${size}px`;
    }, 600);
  },
  watch: {
    show() {
      if (!this.$store.state.load_plate.show) {
        clearInterval(this.timer);
        this.x = 0;
      } else {
        var x = this.x;
        var size = this.$store.state.load_plate.font;
        this.timer = setInterval(() => {
          x += 360;
          this.loading = `transform:rotate(${x}deg);font-size:${size}px`;
        }, 800);
      }
    }
  },
  computed: {
    load_class() {
      var color = this.$store.state.load_plate.color;
      if (this.$store.state.load_plate.show) {
        var loadClass = `${color}`;
      } else {
        var loadClass = `${color}`;
      }
      return loadClass;
    },

    show() {
      return this.$store.state.load_plate.show;
    },
    mes() {
      return this.$store.state.load_plate.mes;
    },
    color() {
      var color = this.$store.state.load_plate.color;
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
.load_data_plate {
  width: 100%;
  padding: 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .load_icon {
    font-size: 40px;
    transition: all 0.6s;
  }
}
</style>
