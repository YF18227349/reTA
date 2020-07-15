<template>
  <div class="media_card">
    <span class="logos">
      <slot name="logo"></slot>
    </span>
    <div class="texts">
      <div class="text_left">
        <slot name="left"></slot>
      </div>
      <div class="text_right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["logo"]
};
</script>
<style lang="scss">
</style>
