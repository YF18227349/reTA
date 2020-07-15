<template>
  <div class="main_loading bg-gray" v-if="show">
    <self-load-plate></self-load-plate>
  </div>
</template>
<script>
const LoadPlate = ()=>import("./load_data_plate");
export default {
  data() {
    return {};
  },
  created() {
    this.selfLoadOpen({
      font: 40,
      color: "fc-blue"
    });
  },
  watch: {
    show() {
      if (this.$store.state.main_load.show) {
        this.selfLoadOpen({
          font: 40,
          color: "fc-blue"
        });
      } else {
        this.selfLoadClose();
      }
    }
  },
  computed: {
    show() {
      return this.$store.state.main_load.show;
    }
  },
  components: {
    "self-load-plate": LoadPlate //引用Load组件
  }
};
</script>
<style lang="scss">
.main_loading {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
</style>
