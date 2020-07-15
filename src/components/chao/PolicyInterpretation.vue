<template>
  <div class="PolicyInterpretation">
    <div class="PolicyInterpretation-ul">
      <ul>
        <li v-for="(tmp,i) in plList" :key="i">
           <router-link 
            :to="{path:'/PolicyInterpretationInfo',query:{id:tmp.id}}"
            >
         <img :src="tmp.img" class="carouselImg" width="100%" />
           </router-link>
        </li>
      </ul>
    </div>
   
    <div class="PolicyInterpretation-more">{{more}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      header_title: "险种分析",
      plList: [
        {id:1, title: "111", img: "http://static.sxtian.com/imgs/PolicyInterpretation/PolicyInterpretation1.png" },
        {id:2, title: "111", img: "http://static.sxtian.com/imgs/PolicyInterpretation/PolicyInterpretation2.png" },
        {id:3, title: "111", img: "http://static.sxtian.com/imgs/PolicyInterpretation/PolicyInterpretation3.png" },
        {id:4, title: "111", img: "http://static.sxtian.com/imgs/PolicyInterpretation/PolicyInterpretation4.png" },
        {id:5, title: "111", img: "http://static.sxtian.com/imgs/PolicyInterpretation/PolicyInterpretation5.png" },
      ],
      more:"没有更多哦！"
    };
  },
  mounted() {
    //设置标题
    this.$store.commit("setHeaderStyle", {
      txt: this.header_title,
      type: 1
    });
  }
};
</script>
<style lang="sass">

</style>
