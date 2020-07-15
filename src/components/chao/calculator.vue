<template>
  <div class="alculator">
   <div class="alculator-input">
     <div>
       <span>￥</span>
      <input
      class="input-inner"
      type="number"
      placeholder="请输入标题"
      v-model="initInputValue"
      @focus="onFocus()"
      @blur="onBlur()"
      ref="inputDom"
    >
     </div>
    <p>社保缴纳基数</p>
   </div>
   <div class="alculator-btn">
     <div class="alculator-max"  @click="onMaxclick()">最高</div>
     <div class="alculator-min"  @click="onMinclick()">最低</div>
   </div>
    <div class="alculator-t">
      社保计算器
    </div>
    <table class="alculator-table" cellspacing="0">
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
          <td align="center"> 生育</td>
          <td align="center">{{this.shengyuPriceEn}}</td>
           <td align="center">{{this.shengyuPricePo}}</td>
        </tr>
        <tr>
          <td align="center"> 工伤</td>
          <td align="center">{{this.gongshangPriceEn}}</td>
           <td align="center">{{this.gongshangPricePo}}</td>
        </tr>
        <tr>
          <td align="center"> 实业</td>
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
      shengyuPriceEn: "-",
      shengyuPricePo: "-",
      gongshangPriceEn: "-",
      gongshangPricePo: "-",
      shiyelPriceEn: 0,
      shiyePricePo: 0,
      isInputCode: false
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
  watch:{
    initInputValue() {  //监听Input
      this.setComputedsValue();
    }
  },
  methods: {
    setComputedsValue() {
      if(!this.initInputValue) this.initInputValue = 0;
      var val = parseInt(this.initInputValue);
      this.initInputValue = 0;
      this.initInputValue = val;
      if(val > this.max) this.initInputValue = this.max;
      return val;
    },
    //社保计算
    computeds(value) {
      if(!value){
        this.yanglaoPriceEn = 0;
        this.yanglaoPricePo = 0;
        this.yiliaolPriceEn = 0;
        this.yiliaoPricePo = 0;
        this.shiyelPriceEn = 0;
        this.shiyePricePo = 0;
        return;
      }else if(value < this.min){
        this._alert(`最小值为${this.min}`);
        this.initInputValue = this.min;
        value = this.min;
      }
      this.yanglaoPriceEn = parseFloat(value * 0.16).toFixed(2);
      this.yanglaoPricePo = parseFloat(value * 0.08).toFixed(2);

      this.yiliaolPriceEn = parseFloat(
        (value + 517) * 0.07
      ).toFixed(2);
      this.yiliaoPricePo = parseFloat(
        (value + 517) * 0.02
      ).toFixed(2);

      this.shiyelPriceEn = parseFloat(
        (value + 517) * 0.007
      ).toFixed(2);
      this.shiyePricePo = parseFloat(
        (value + 517) * 0.003
      ).toFixed(2);
    },
    // onInput(e) {
    //   var val = this.initInputValue;
    //   console.log(val);
    //   //   if (val < this.min) {
    //   //     this.initInputValue = this.min;
    //   //   } else if (val > this.max) {
    //   //     this.initInputValue = this.max;
    //   //   } else {
    //   //     this.initInputValue = val;
    //   //   }
    // },
    onFocus() {


    },
    onBlur() {
      //执行计算
      this.computeds(this.setComputedsValue());
      //var val = parseInt(this.initInputValue);
      // if (val < this.min) {
      //   this.initInputValue = this.min;
      // } else if (val > this.max) {
      //   this.initInputValue = this.max;
      // }
      // this.computeds(this.initInputValue);
    },
    onMaxclick(){
      this.initInputValue = this.max;
      this.computeds(this.initInputValue);
    },
     onMinclick(){
      this.initInputValue = this.min;
      this.computeds(this.initInputValue);
    }
  },
  computed: {
    computedHandel(val) {
      if(!val){
        this.yanglaoPriceEn = parseFloat(val * 0.16).toFixed(2);
        this.yanglaoPricePo = parseFloat(val * 0.08).toFixed(2);

        this.yiliaolPriceEn = parseFloat(
          (val + 517) * 0.07
        ).toFixed(2);
        this.yiliaoPricePo = parseFloat(
          (val + 517) * 0.02
        ).toFixed(2);

        this.shiyelPriceEn = parseFloat(
          (val + 517) * 0.007
        ).toFixed(2);
        this.shiyePricePo = parseFloat(
          (val + 517) * 0.003
        ).toFixed(2);
      }else{

      }
    }
  }

};
</script>
<style lang="scss">

.alculator-table{
  overflow: hidden;
  width: 96%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 5px;

}
.alculator-table thead{
   border-radius: 5px;
  color: #fff;  background-color: #fda430;
}
.alculator-table th,td{
  border-bottom: 1px solid #eee;
    height: 40px;
    font-size: 14px;
  }

.alculator-table th{
  font-size: 16px;
}
  .alculator-input div{
    padding: 0 15px;
    display: flex;
    justify-content: flex-start;
  }
    .alculator-input div span{
      display: block;
      font-size: 24px;
      line-height: 70px;
    }
.input-inner {
  width: 85%;
// flex: 1;
  display: block;
  // margin: 0  auto;
  background-color: transparent;
  height: 70px;
 border: none;
  line-height: 30px;
font-size: 30px;
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.alculator-t{
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}
.alculator-input{
  border-radius: 5px;
  color: #fff;
  width: 96%;
  margin: 15px auto;
background-color: #fda430;
}
.alculator-input p{
  font-size: 14px;
  padding-left:15px;
  line-height: 3;
}
.alculator-btn{

  width: 96%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
   margin-bottom: 15px;

}
.alculator-btn div{
  height: 40px;
  width: 40%;
  border-radius: 5px;
  color: #fda430;
  border: 1px solid #fda430;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
}
</style>
