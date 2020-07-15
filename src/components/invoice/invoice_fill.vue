<template>
  <div class="invoice_fill w-100">
    <!-- <header class="invoice_fill_header bg-gray w-100 fc-dark">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark iconfont icon-previewleft"></a>
      <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
      <a href="javascript:;" class="last"></a>
    </header>-->
    <!-- <div class="clear-fixed"></div> -->
    <div class="invoice_fill_group w-100">
      <div class="invoice_fill_list w-100">
        <ul class="invoice_info bg-white">
          <li class="info_items" v-for="(tmp,i) in pageInfo.invoiceInfoList" :key="i">
            <router-link :to="tmp.url" class="cell_arrow_item">
              <div class="cell_txt">
                <span class="f-left fs-3 fw-6 fc-dark">{{tmp.title}}</span>
                <span class="f-right fs-3 fw-6 fc-dark">{{tmp.code?'已填写':'未填写'}}</span>
              </div>
              <span class="cell_arrow fs-3 fc-gray fw-5 iconfont icon-previewright"></span>
            </router-link>
          </li>
        </ul>
        <ul class="invoice_detail w-100">
          <li class="detail_items">
            <a href="javascript:;" class="line_input_item">
              <span class="fs-3 fw-5 fc-dark">发票金额</span>
              <input
                class="line_input fw-5 fs-3 fc-dark"
                type="number"
                placeholder="单位:(元)"
                v-model="invoiceDetail.amount"
              >
            </a>
          </li>
          <li class="detail_items">
            <a href="javascript:;" class="line_item">
              <span class="f-left fs-3 fw-5">服务费用</span>
              <span class="f-left fc-blue item_explain">(占发票金额的0.5%)</span>
              <span class="f-right fs-3  fc-red">{{service_charge}}元</span>
            </a>
          </li>
          <li class="detail_items">
            <a href="javascript:;" class="line_item">
              <span class="f-left fs-3 fw-5 fc-rdark">发票总额</span>
              <span class="f-right fs-3 fw-5 fc-red">{{invoiceDetail.total}}元</span>
            </a>
          </li>
        </ul>
        <div class="invoice_mail bg-white">
          <yd-cell-item type="label" class="mail_item">
            <div slot="left" class="mail_titile">是否邮寄</div>
            <yd-switch slot="right" v-model="mailCode"></yd-switch>
          </yd-cell-item>
        </div>
        <ul class="mail_group w-100 bg-white" v-if="mailCode">
          <li>
            <a href="javascript:;" class="line_item">
              <span class="mail_pay_title f-left">邮寄费用</span>
              <span class="fc-red mail_pay_count f-right">{{mail_pay}}</span>
            </a>
          </li>
          <li>
            <a href="javascript:;" class="line_item" @click="selcet_city()">
              <span class="mail_addr f-left">邮寄地址</span>
              <span class="fs-3 f-right mt-1 fc-gray fw-6 iconfont icon-previewright"></span>
              <span class="fs-3 fw-6 fc-dark f-right">{{!mail_addr?'请选择':mail_addr}}</span>
            </a>
          </li>
        </ul>
        
        <ul class="invoice_detail w-100">
          <li class="detail_items">
            <a href="javascript:;" class="line_input_item">
              <span class="fs-3 fw-5 fc-dark">联系邮箱</span>
              <input
                class="line_input fw-5 fs-3 fc-dark"
                type="text"
                placeholder="联系邮箱"
                v-model="invoiceDetail.email"
              >
            </a>
          </li>
        </ul>
        <div class="invoice_pay w-100 bg-white" @click.stop="pay_modal_show= !pay_modal_show">
          <a href="javascript:;" class="cell_arrow_item">
            <div class="cell_txt">
              <span class="pay_title fs-3 fw-6 fc-dark f-left">支付方式</span>
              <span class="payModel mr-1 f-right fw-6">{{pay_model}}</span>
              <span class="payLogo f-right mr-3">
                <img :src="pay_logo">
              </span>
            </div>
            <span class="cell_arrow fs-3 fc-gray fw-6 iconfont icon-previewright"></span>
          </a>
        </div>
        <div class="remark_msg w-100 bg-white">
          <p class="remark_title fc-dark fs-3 fw-6 mb-1">备注信息</p>
          <yd-textarea
            class="remark_text fw-6 fc-dark"
            placeholder="请输入:"
            maxlength="100"
            v-model="remark_txt"
          ></yd-textarea>
        </div>
      </div>
    </div>

    <div class="invoic_footer bg-gray w-100">
      <div class="invoic_footer_title">
        <span>合计:</span>
        <span class="fc-red invoic_footer_salary">{{invoiceTotalPrice}}</span>
      </div>
      <a href="javascript:;" class="footer_btn bg-blue" @click="pay_invoice()">
        <span class="fc-white fm-2 fw-6">支付</span>
      </a>
    </div>

    <!-- 底部弹框 -->
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
              <img :src="tmp.logo" alt>
              <span class="ml-3 fc-blue fw-5 fm-1">{{tmp.title}}</span>
            </a>
          </li>
        </ul>
        <a href="javascript:;" class="cancel_btn bg-white w-100" @click="modal_cancel()">
          <span class="fc-blue fw-7 fm-1">取消</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import District from "ydui-district/dist/jd_province_city_area_id";
// import { defaults } from "autoprefixer";
export default {
  data() {
    return {
      show: false, //地址弹框开关
      modal_value: "", //监听地址选择的值
      district: District,
      pageInfo: {
        token: "",
        // default_addr: "",
        header_title: "发票代开",
        invoiceInfoList: [
          { title: "发票信息", url: "/addinvoiceinfo", code: false },
          { title: "劳务者信息", url: "/addlaborsinfo", code: false }
        ],
        rules: "desc",
        fields: "create_time"
      },
      invoiceAll: false, //发票信息是否填写
      labourAll: false, //劳务者是否填写
      invoiceDetail: {
        amount: "",
        servicePrice: null,
        total: 0,
        salary: 0,
        email:'',
      },
      mailCode: false,
      mail_pay: 0,
      mail_addr: "",
      payValue: 0,
      pay_modal_show: false, //支付选择弹框开关
      remark_txt: "", //备注信息
      payModelList: [
        {
          title: "支付宝",
          logo: "./static/imgs/main/icon-zhifubao@2x.png"
        },
        {
          title: "微  信",
          logo: "./static/imgs/main/2icon-weixin@2x.png"
        }
      ]
    };
  },
  mounted() {
    var h = document.documentElement.clientHeight;
    $(".invoic_footer").css("height", `${h * 0.075}px`);
    $(".invoice_fill_group").css("height", `${h * 0.93}px`);
  },
  computed: {
    pay_model() {
      if (this.payValue == null) {
        return "请选择";
      } else {
        var i = parseInt(this.payValue);
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
    service_charge() {
      let total = this.invoiceDetail.amount * 0.005;
      this.invoiceDetail.servicePrice = total;
      this.invoiceDetail.salary = total + this.mail_pay;
      this.invoiceDetail.total = (
        this.invoiceDetail.amount *
        (1 + 0.005)
      ).toFixed(2);
      return total;
    },
    invoiceTotalPrice() {
      var count = this.mail_pay + this.invoiceDetail.servicePrice;
      this.invoiceDetail.salary = count.toFixed(2);
      return count.toFixed(2);
    }
  },
  created() {
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 0
    });
    this.getInfo();
  },
  methods: {
    selectCode() {
      this.select_code = true;
    },
    getInfo() {
      var info = this.getCache("userInvoiceInfo", 2);
      // console.log(info);
      if (info) {
        this.invoiceAll = info.invoiceAll;
        this.labourAll = info.labourAll;
        this.pageInfo.invoiceInfoList[0].code = info.invoiceAll;
        this.pageInfo.invoiceInfoList[1].code = info.labourAll;
      }
      var value = this.getSelectData();
      var addr = this.getSelectData().user;
      // console.log(addr.select_addr);
      if (addr.select_addr) {
        this.mailCode = true;
        this.mail_addr = addr.select_addr.addr;
      }
    },
    // 选择城市弹框
    selcet_city() {
      this.$router.push("/user_addr/user");
    },
    //返回选中的地址
    result(ret) {
      this.mail_pay = 15;
      this.modal_value =
        ret.itemName1 + " " + ret.itemName2 + " " + ret.itemName3;
    },
    modal_cancel() {
      this.pay_modal_show = false;
    },
    select_pay(i) {
      this.payValue = i;
      this.pay_modal_show = false;
    },

    // 支付
    pay_invoice() {
      var token = this.getToken();
      var invoiceAmount = this.invoiceDetail.amount;
      var servicePrice = this.invoiceDetail.servicePrice;
      var invoiceTotalPrice = this.invoiceDetail.total;
      if (this.mailCode) {
        var isZip = 1;
        var zipPrice = this.mail_pay;
      } else {
        var isZip = 0;
        var zipPrice = 0;
      }

      if (this.payValue != null) {
        var payType = this.payValue + 1;
      } else {
        var payType = this.payValue;
      }
      if (this.remark_txt) {
        var invoiceRemarks = this.remark_txt;
      } else {
        var invoiceRemarks = "加急";
      }

      // 判断数据是否填写
      if (!this.invoiceAll) {
        this.$dialog.toast({
          mes: "请填写发票信息",
          timeout: 1500
        });
        return;
      }
      if (!this.labourAll) {
        this.$dialog.toast({
          mes: "请填写劳务者信息",
          timeout: 1500
        });
        return;
      }
      if (!invoiceAmount) {
        this.$dialog.toast({
          mes: "发票金额不能为空",
          timeout: 1500,
          icon: "error"
        });
        return;
      }
      if (!payType) {
        this.$dialog.toast({
          mes: "请选择付款方式",
          timeout: 1500
        });
        return;
      }
      var info = this.getCache("userInvoiceInfo", 2);
      info.token = token;
      info.invoiceAmount = invoiceAmount;
      info.servicePrice = servicePrice;
      info.invoiceTotalPrice = invoiceTotalPrice;
      info.invoiceRemarks = invoiceRemarks;
      info.isZip = isZip;
      info.zipPrice = zipPrice;
      info.payType = payType;
      var url = this.Global.baseURL + "/Invoice-addMemberInvoice.jsp";
      this.$dialog.loading.open("正在支付请稍后...");
      this.axios
        .post(url, info)
        .then(res => {
          // console.log(res.data);
          if (res.data.status == 1) {
            this.$dialog.loading.close();
            this.$dialog.toast({
              mes: res.data.info,
              timeout: 1500,
              icon: "success"
            });
            setTimeout(() => {
              this.$router.push("/paycompleted");
            }, 1600);
          } else {
            this.$dialog.loading.close();
            if (res.data.code == "-1") {
              this.selfToast({
                mes: "登录超时请重试",
                timeout: 1500
              });
              this.goURL({
                url: "/login",
                timeout: 1600
              });
            } else {
              this.selfToast({
                mes: res.data.info,
                timeout: 1500
              });
            }
          }
        })
        .catch(e => {
          this.$dialog.loading.close();
          this.$dialog.toast({
            mes: "网络故障请重试...",
            timeout: 1500,
            icon: "error"
          });
        });
    },
    getDefaultAddr(params, url) {
      this.$dialog.loading.open("正在加载数据请稍后...");
      this.axios
        .post(url, params)
        .then(res => {
          // console.log(res.data);
          if (res.data.status == 1) {
            var data = res.data.data.addressDefaultData;
            if (data) {
              this.pageInfo.default_addr =
                data.province + data.city + data.area + data.address;
            } else {
              this.pageInfo.default_addr = "";
            }
            this.$dialog.loading.close();
          } else {
            this.$dialog.loading.close();
            this.$dialog.toast({
              mes: res.data.info,
              timeout: 1500,
              icon: "error"
            });
          }
        })
        .catch(err => {
          this.$dialog.loading.close();
          this.$dialog.toast({
            mes: "网络故障请重试...",
            timeout: 1500,
            icon: "error"
          });
        });
    }
  },
  watch: {
    mailCode() {
      if (this.mailCode) {
        if (this.mail_addr) {
          this.mail_pay = 15;
        }
      } else {
        this.mail_pay = null;
      }
    }
  }
};
</script>
<style lang="scss">
</style>
