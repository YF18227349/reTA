<template>
<div class="down-load">
  <a href="javascript:;">
    <self-button title="下载" size="16" class="mt-5"></self-button>
  </a>
</div>
</template>
<script>
import Button from "./sub/Button.vue";
export default {
  data() {
    return {
      pageInfo: {
        title: "下载app",
      }
    }
  },

  created() {
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.title,
      type: 1
    });
  },

  components: {
    "self-button": Button
  }
}
</script>
<style scoped>

</style>
