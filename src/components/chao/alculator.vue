<template>
  <div class="alculator">
    <input
      class="input-inner"
      type="text"
      placeholder="请输入标题"
      v-model="initInputValue"
      @focus="onFocus()"
      @blur="onBlur()"
      v-on:input="onInput"
      ref="inputDom"
    >
    社保计算器
    <table class="alculator-table">
      <thead>
        <tr>
          <th>缴纳项目</th>
          <th>单位缴纳</th>
          <th>个人缴纳</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td align="center"> 养老</td>
          <td align="center">{{this.yanglaoPriceEn}}</td>
           <td align="center">{{this.yanglaoPricePo}}</td>
        </tr>
        <tr>
          <td align="center"> 医疗</td>
          <td align="center">{{this.yiliaolPriceEn}}</td>
           <td align="center">{{this.yiliaoPricePo}}</td>
        </tr>
        <tr>
          <td align="center"> 生育,工商,实业</td>
          <td align="center">{{this.shiyelPriceEn}}</td>
           <td align="center">{{this.shiyePricePo}}</td>
        </tr>
      </tbody>
    </table>
   
    <!-- <div></div> -->
    <!-- <div></div>医疗 -->
    <!-- <div>{{this.yiliaolPriceEn}}</div> -->
    <!-- <div>{{this.yiliaoPricePo}}</div> -->
    <!-- 生育
    工商 -->
    
    <!-- <div>{{this.shiyelPriceEn}}</div>
    <div>{{this.shiyePricePo}}</div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      header_title: "社保计算器",
      initInputValue: 0,
      min: 3372,
      max: 19443,
      yanglaoPriceEn: 0,
      yanglaoPricePo: 0,
      yiliaolPriceEn: 0,
      yiliaoPricePo: 0,
      shiyelPriceEn: 0,
      shiyePricePo: 0
    };
  },
  mounted() {
    //设置标题
    this.$store.commit("setHeaderStyle", {
      txt: this.header_title,
      type: 1
    });
  },
  created() {},
  methods: {
    onInput(e) {
      var val = parseInt(e.target.value);
      this.initInputValue = val ? val : 0;
      //   if (val < this.min) {
      //     this.initInputValue = this.min;
      //   } else if (val > this.max) {
      //     this.initInputValue = this.max;
      //   } else {
      //     this.initInputValue = val;
      //   }
    },
    onFocus() {
      //   console.log(this.initInputValue);
    },
    onBlur() {
      var val = parseInt(this.initInputValue);
      if (val < this.min) {
        this.initInputValue = this.min;
      } else if (val > this.max) {
        this.initInputValue = this.max;
      }
      this.yanglaoPriceEn = parseFloat(this.initInputValue * 0.16).toFixed(2);
      this.yanglaoPricePo = parseFloat(this.initInputValue * 0.08).toFixed(2);

      this.yiliaolPriceEn = parseFloat(
        (this.initInputValue + 517) * 0.07
      ).toFixed(2);
      this.yiliaoPricePo = parseFloat(
        (this.initInputValue + 517) * 0.02
      ).toFixed(2);

      this.shiyelPriceEn = parseFloat(
        (this.initInputValue + 517) * 0.007
      ).toFixed(2);
      this.shiyePricePo = parseFloat(
        (this.initInputValue + 517) * 0.003
      ).toFixed(2);
    }
  }
};
</script>
<style lang="scss">
.alculator-table{
  width: 100%
  
}
.alculator-table th,td{
  border: 1px solid #dedede;
    height: 35px;
  }
.input-inner {
  width: 200px;
  height: 30px;
  line-height: 30px;
  background-color: red;
  color: #ffffff;
}
</style>

