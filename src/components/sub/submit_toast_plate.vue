<template>
  <div class="submit_toast_group" v-if="show">
    <div class="tosat_list bg-white">
      <span
        class="tosat_logo iconfont fc-white fw-6"
        :class="status?'icon-duihao4 bg-blue':'bg-red con-chahao1'"
      ></span>
      <span class="toast_text fc-dark fm-2">{{status ? '提交成功':'提交失败'}}</span>
      <button class="toast_btn fc-white bg-red fm-1 fw-6" @click.prevent="cancel">返回</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.state.submit_toast.show = false;
    this.$store.state.submit_toast.value = false;
  },
  methods: {
    cancel() {
      this.$store.state.submit_toast.value = true;
      this.$store.state.submit_toast.show = false;
      this.$store.state.submit_toast.opt();
    }
    // cancel1() {
    //   this.cancel();
    // }
  },
  watch: {
    show() {
      if (this.$store.state.submit_toast.show) {
        setTimeout(() => {
          this.$store.state.submit_toast.value = true;
          this.$store.state.submit_toast.show = false;
        }, 3000);
      }
    }
  },
  computed: {
    show() {
      return this.$store.state.submit_toast.show;
    },
    status() {
      return this.$store.state.submit_toast.status;
    }
  }
};
</script>
<style lang="scss">
</style>
