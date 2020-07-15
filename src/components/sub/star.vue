<template>
<div class="icon">
  <div class="icon1" :style="`width:${len}%;`">
    <span class="mr-1" v-for="(item1,i) of list1" :key="i" :style="`font-size:${size};`" v-html="item1"></span>
  </div>
  <div class="icon2">
    <span class="mr-1" v-for="(item2,i) of list2" :key="i" :style="`font-size:${size};`" v-html="item2"></span>
  </div>
</div>
</template>
<script>
export default {
  props: ["len", "size"],
  data() {
    return {
      star1: `<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2101"><path d="M956 398.496q-8-23.488-26.496-39.008t-42.496-19.488l-204.992-31.008-92-195.008q-11.008-24-32.992-36.992Q536.032 64 512.032 64t-44.992 12.992q-22.016 12.992-32.992 36.992l-92 195.008-204.992 31.008q-24 4-42.496 19.488t-26.496 39.008-2.496 47.008 22.496 41.504l151.008 154.016-36 218.016q-6.016 40 20 70.496t66.016 30.496q22.016 0 42.016-11.008l180.992-100 180.992 100q20 11.008 42.016 11.008 40 0 66.016-30.496t20-70.496l-36-218.016 151.008-154.016q16.992-18.016 22.496-41.504t-2.496-47.008z" p-id="2102"></path></svg>`,
      star2: `<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2013"><path d="M512 147.2l121.6 243.2L896 428.8l-192 185.6 44.8 262.4L512 755.2l-236.8 121.6L320 614.4 128 428.8l262.4-38.4L512 147.2M512 83.2c-25.6 0-44.8 12.8-57.6 38.4L352 326.4 121.6 364.8C96 364.8 76.8 384 64 403.2c-6.4 25.6 0 51.2 19.2 64l166.4 166.4-38.4 230.4c-6.4 25.6 6.4 51.2 25.6 64 12.8 6.4 25.6 12.8 38.4 12.8 12.8 0 19.2 0 32-6.4L512 825.6l204.8 108.8c6.4 6.4 19.2 6.4 32 6.4 12.8 0 25.6-6.4 38.4-12.8 19.2-12.8 32-38.4 25.6-64l-38.4-230.4 166.4-166.4c19.2-19.2 25.6-44.8 19.2-64-6.4-25.6-25.6-38.4-51.2-44.8l-230.4-32L569.6 121.6C556.8 96 537.6 83.2 512 83.2L512 83.2z" p-id="2014"></path></svg>`,
      list1: [],
      list2: []
    }
  },

  created() {
    this.handel();
  },
  methods: {
    handel() {
      for (var i = 0; i < 5; i++) {
        this.list1.push(this.star1);
        this.list2.push(this.star2);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
    width: 90%;
    height: 16px;
    position: relative;
    .icon1,
    .icon2 {
        overflow: hidden;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: left;
        font-size: 16px;
    }
    .icon1 {
        font-size: 16px;
        color: #ffcc00;
    }
}
</style>
