<template>
  <a :href="href" class="line_item" @click="click">
    <slot></slot>
  </a>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    click() {
      this.$emit("callBack", this.value);
    }
  },
  props: ["href", "value"]
};
</script>
<style lang="scss">
</style>
