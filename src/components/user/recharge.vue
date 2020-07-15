<template>
  <div class="recharge">
    <div class="recharge_select_group bg-white">
      <p class="recharge_select_title">{{pageInfo.group_title}}</p>
      <div class="recharge_btns">
        <a
          class="btn_item"
          v-for="(item,i) in rechargeList"
          :key="i"
          :class="item.code ? 'blueBtn':'noneBtn'"
          @click.prevent="select_value(i)"
          :data-value="item.value"
        >
          <span :class="item.code?'fc-white':'fc-dark'">¥ {{item.value}}</span>
        </a>
      </div>
      <div class="input_value">
        <input type="text" placeholder="请输入其他金额" @input="oninput" @focus="shiFocus" v-model="self_pay_value" />
      </div>
    </div>

    <div class="payType bg-white">
      <a href="javascript:;" class="line_arrow_item bg-white" @click="pay_modal_show = true">
        <span class="fs-3 fw-6 fc-dark f-left">支付方式</span>
        <span class="fc-gray f-right fw-5 item_arrow iconfont icon-previewright"></span>
        <span class="fs-3 fc-dark ml-2 f-right fw-6">{{pay_model}}</span>
        <img :src="pay_logo" alt class="pay_logo f-right" />
      </a>
    </div>

    <a class="submitBtn btn-c bg-green" href="javascript:;" @click="do_pay()">
      <span class="fm-2 fc-white fw-6">立即充值</span>
    </a>

    <div class="modal_frame_group w-100">
      <div
        class="modal_plate w-100"
        v-if="pay_modal_show"
        :class="pay_modal_show?'modal_plate_show':'modal_plate_hid'"
        @click="modal_cancel()"
      ></div>
      <div class="modal_list w-100" :class="pay_modal_show?'modal_up':'modal_down'">
        <ul class="pay_model_list w-100 bg-white mb-3">
          <li v-for="(tmp,i) in payModelList" :key="i">
            <a href="javascript:;" class="pay_item" @click="select_pay(i)">
              <img :src="tmp.logo" alt />
              <span class="ml-3 fc-blue fw-5 fm-1">{{tmp.title}}</span>
            </a>
          </li>
        </ul>
        <a href="javascript:;" class="cancel_btn bg-white w-100" @click="modal_cancel()">
          <span class="fc-blue fw-7 fm-1">取消</span>
        </a>
      </div>
    </div>
    <!-- <self-alert-box></self-alert-box> -->
  </div>
</template>

<script>
// const AlertBox = ()=>import("../components/sub/alert_messagebox");
export default {
  data() {
    return {
      pageInfo: {
        header_title: "充值",
        group_title: "充值金额"
      },
      btn_code: null,
      pay_type: 1,
      self_pay_value: "",
      select_pay_value: "",
      rechargeList: [
        {
          value: 200,
          code: true
        },
        {
          value: 100,
          code: false
        },
        {
          value: 50,
          code: false
        },
        {
          value: 20,
          code: false
        }
      ],
      selectPayList: [
        {
          name: "微信支付",
          url: "./static/imgs/main/2icon-weixin@2x.png",
          title: "推荐已安装微信的用户使用",
          isSelected: false
        },
        {
          name: "支付宝支付",
          url: "./static/imgs/main/icon-zhifubao@2x.png",
          title: "推荐已安装支付宝的用户使用",
          isSelected: false
        }
      ],

      payValue: 0,
      pay_modal_show: false, //支付选择弹框开关
      payModelList: [
        {
          title: "支付宝",
          logo: "./static/imgs/main/icon-zhifubao@2x.png"
        },
        {
          title: "微  信",
          logo: "./static/imgs/main/2icon-weixin@2x.png"
        }
      ],
      params: null,
      payToken: null
    };
  },
  created() {
    this.selfMainLoadOpend();
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 1
    });
    // this.withDrawalsAmount = this.withDrawalsAmount.toString().match(/^\d*(\.?\d{0,2})/g)[0] || null
    this.select_pay_value = this.rechargeList[0].value;
    this.init();

    
  },
  methods: {
    init() {
      // 获取菜单数据
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },
    shiFocus() {
      this.rechargeList.forEach(function(item, index) {
        if (item.code != false) {
          item.code = false;
        };
      });
    },
    oninput(e) {
      var str = e.target.value.toString().match(/^\d*(\.?\d{0,2})/g)[0];
      this.self_pay_value = str || null;
    },
    changePay(x) {
      this.selectPayList[x].isSelected = !this.selectPayList[x].isSelected;
      if (this.selectPayList[x].isSelected) {
        this.pay_type = x;
        for (let i in this.selectPayList) {
          if (x != i) {
            this.selectPayList[i].isSelected = false;
          }
        }
      }
    },
    select_value(x) {
      // this.btn_code = x;
      this.rechargeList[x].code = !this.rechargeList[x].code;
      if (this.rechargeList[x].code) {
        this.select_pay_value = this.rechargeList[x].value;
        // console.log(this.select_pay_value);
        this.self_pay_value = "";
        for (let i in this.rechargeList) {
          if (x != i) {
            this.rechargeList[i].code = false;
          }
        }
      }
    },

    do_pay() {
      var that = this;
      var value = this.select_pay_value;
      var type = this.pay_type;
      var token = this.getToken();
      if (!value) {
        this.$dialog.alert({
          mes: "请选择充值金额"
        });
        return;
      }
      if (type === null) {
        this.$dialog.alert({
          mes: "请选择支付方式"
        });
        return;
      }
      var params = {
        token,
        price: value,
        payType: type
      };
      this.selfAlertBox({
        mes: "您的充值金额:" + this.select_pay_value,
        alert: true,
        cancel: true,
        opt: () => {
          this.do_recharge(params);
        }
      });
    },

    do_recharge(params) {
      //支付
      var url = "balance-rechargeMemberBalance";
      this.__initAction(url, params, (res, s) => {
        if (s == 1) {
          var data = res.data;
          var url = data.httpStr;
          window.location.href = url;
        }
      });
    },

    select_pay(i) {
      this.payValue = i;
      this.pay_type = i + 1;
      this.pay_modal_show = false;
    },

    modal_cancel() {
      this.pay_modal_show = false;
    }
  },
  created() {

  },
  watch: {
    // 判断提示框的值
    // alert_value() {
    //   if (this.$store.state.alert.value) {
    //     if (this.params) {
    //       this.do_recharge(this.params);
    //     }
    //   }
    //   this.$store.state.alert.value = false;
    // },

    self_pay_value() {
      if (this.self_pay_value != "") {
        for (let i of this.rechargeList) {
          if (i.code) {
            i.code = false;
          }
        }
        this.select_pay_value = this.self_pay_value;
      }
    }
  },
  computed: {
    pay_model() {
      if (this.payValue == null) {
        return "请选择";
      } else {
        var i = parseInt(this.payValue);
        // this.pay_modal_show = false;
        return this.payModelList[i].title;
      }
    },
    pay_logo() {
      if (this.payValue == null) {
        return "";
      } else {
        var i = parseInt(this.payValue);
        this.select_code = false;
        return this.payModelList[i].logo;
      }
    },

    // 提示框的返回值
    alert_value() {
      return this.$store.state.alert.value;
    }
  },
  components: {
    // "self-alert-box": AlertBox
  }
};
</script>

<style lang="scss">
.blueBtn {
  background: #4c83ff;
  color: #fff;
  border: 1px solid #4c83ff;
}
.noneBtn {
  background: #fff;
  color: #000;
  border: 1px solid #e0e0e0;
}
</style>
