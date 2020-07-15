<template>
  <a :href="href" class="cell_arrow_item">
    <div class="cell_txt">
      <slot name="left"></slot>
    </div>
    <div class="cell_txt text-right">
      <slot name="right"></slot>
    </div>
    <span class="cell_arrow iconfont icon-previewright fc-gray fm-1 fw-6" v-if="arrow"></span>
  </a>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  props: ["arrow", "href"]
};
</script>
<style lang="scss">
</style>
