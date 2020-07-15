<template>
  <div class="key-container">
    <div class="input-box">
      <p>请输入安全密码</p>
      <ul class="input-wrap">
        <li>{{ sum[0] }}</li>
        <li>{{ sum[1] }}</li>
        <li>{{ sum[2] }}</li>
        <li>{{ sum[3] }}</li>
      </ul>
      <span class="this_close iconfont fc-black fw-6 bg-black icon-chahao1" @click="close2()"></span>
    </div>
    <div class="keyboard" @click.stop="_handleKeyPress">
      <div class="title"><yd-icon class="verifycode" name="verifycode"></yd-icon>天安安全键盘</div>
      <div class="key-row">
        <div class="key-cell" data-num="7">7</div>
        <div class="key-cell" data-num="8">8</div>
        <div class="key-cell" data-num="9">9</div>
      </div>
      <div class="key-row">
        <div class="key-cell" data-num="4">4</div>
        <div class="key-cell" data-num="5">5</div>
        <div class="key-cell" data-num="6">6</div>
      </div>
      <div class="key-row">
        <div class="key-cell" data-num="1">1</div>
        <div class="key-cell" data-num="2">2</div>
        <div class="key-cell" data-num="3">3</div>
      </div>
      <div class="key-row">
        <div class="key-cell" data-num="S">确认</div>
        <div class="key-cell" data-num="0">0</div>
        <div class="key-cell" data-num="D">C</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sum: []
    };
  },
  methods: {
    //处理按键
    _handleKeyPress(e) {
      let num = e.target.dataset.num;
      //不同按键处理逻辑
      // -1 代表无效按键，直接返回
      if (num == -1) return false;
      switch (String(num)) {
        //删除键
        case "D":
          this._handleDeleteKey();
          break;
        //确认键
        case "S":
          this._handleConfirmKey();
          break;
        default:
          this._handleNumberKey(num);
          break;
      }
    },
    //处理删除键
    _handleDeleteKey() {
      let S = this.money;
      //如果没有输入，直接返回
      if (!S.length) return false;
      //否则删除最后一个
      this.money = S.substring(0, S.length - 1);
    },
    //处理数字
    _handleNumberKey(num) {
      if (this.sum.length < 4) {
        this.sum += num;
      } else {
        console.log("超出限制");
      }
      console.log(this.sum);
    },
    //提交
    _handleConfirmKey() {
      let S = this.sum;
      //未输入
      if (!S.length) {
        console("请输入");
        return false;
      }
      this.$emit("confirmEvent", S);
    },
    close2() {
      console.log("点击了关闭");
    },
  }
};
</script>

<style scoped>
.key-container {
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 200;
  background-color: rgb(0, 0, 0 ,.2);
  /* opacity: 0.5; */
}
.input-box {
  height: 250px;
  width: 90%;
  background-color: #fff;
  position: fixed;
  top: 10%;
  border-radius: 8px;
  color: #666;
  z-index: 555;
      padding: 15px;
}
.input-box p { 
    text-align: center;
line-height: 50px;
font-size: 15px;
}
.input-box .input-wrap {
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;

}
.input-box .input-wrap li{
    width: 45px;
    height: 45px;
    border: 1px solid #666;
    font-size: 18px;
    line-height: 45px;
    text-align: center;
}
.keyboard {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 250px;
  width: 100%;
  background-color: #fff;
}
.keyboard .title{
    height: 30pox;
    line-height: 30px;
    text-align: center;
}
.keyboard .title .verifycode {
    color: green;
}
.keyboard .key-row {
  display: flex;
  display: -webkit-flex;
  position: relative;
  height: 55px;
  line-height: 55px;
}
.keyboard .key-row::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #d5d5d6;
  color: #d5d5d6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.keyboard .key-cell {
  flex: 1;
  -webkit-box-flex: 1;
  font-weight: 700;
  font-size: 24px;
  color: #666;
  text-align: center;
  position: relative;
}
.keyboard .key-cell::after {
  content: "";
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  height: 200%;
  border-right: 1px solid #d5d5d6;
  color: #d5d5d6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.keyboard .key-cell:nth-last-child(1)::after {
  border-right: 0;
}
.keyboard .disabled {
  background: rgba(0, 0, 0, 0.2);
}
.keyboard .key-confirm {
  position: absolute;
  text-align: center;
  height: 118px;
  width: 25%;
  line-height: 118px;
  background: #fff;
  z-index: 5;
  right: 0;
  bottom: 1px;
}
</style>