<!-- 暂无数据提示 -->
<template >
<h1 class="no-data" :style="`background:${bgColor}`">
  <span calss="no-data-text" v-text="title" :style="`color:${color};`"></span>
</h1>
</template>
<script>
export default {
  props: ["title", "color", "bgColor"],
  data() {
    return {

    }
  },
};
</script>
<style lang="scss" scoped>
.no-data {
    width: 100%;
    margin: 1rem 0;
    font-size: 16px;
    text-align: center;
}
.no-data span {
    color: #ccc;
}
</style>
