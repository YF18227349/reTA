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
          <li class="info_items" v-for="(tmp,i) in invoiceInfoList" :key="i">
            <router-link :to="`${tmp.url}/${tmp.type}`" class="cell_arrow_item">
              <div class="cell_txt">
                <span class="f-left fs-3 fw-6 fc-dark">{{tmp.title}}</span>
                <span class="f-right fs-3 fw-6 fc-dark">{{tmp.code ? tmp.lobourName : '未填写'}}</span>
              </div>
              <span class="cell_arrow fs-3 fc-gray fw-6 iconfont icon-previewright"></span>
            </router-link>
          </li>
        </ul>
        <ul class="invoice_detail w-100">
          <li class="detail_items">
            <a href="javascript:;" class="line_input_item">
              <span class="fs-3 fw-6 fc-dark">发票金额</span>
              <input
                class="line_input fw-6 fs-3 fc-dark"
                type="number"
                placeholder="单位:(元)"
                v-model="invoiceDetail.amount"
              />
            </a>
          </li>
          <li class="detail_items">
            <a href="javascript:;" class="line_item">
              <span class="f-left fs-3 fw-6 fc-dark">服务费用</span>
              <span class="f-left fc-blue item_explain">(占发票金额的{{invoiceDetail.bili}}%)</span>
              <span class="f-right fs-3 fc-red">{{service_charge}}元</span>
            </a>
          </li>
          <li class="detail_items">
            <a href="javascript:;" class="line_item">
              <span class="f-left fs-3 fw-6 fc-dark">发票总额</span>
              <span class="f-right fs-3 fw-6 fc-red">{{fapiao}}元</span>
            </a>
          </li>
        </ul>
        <div class="invoice_mail bg-white">
          <yd-cell-item type="label" class="mail_item">
            <div slot="left" class="mail_titile fc-dark">是否邮寄</div>
            <yd-switch slot="right" v-model="mailCode"></yd-switch>
          </yd-cell-item>
        </div>
        <ul class="mail_group w-100 bg-white" v-if="mailCode">
          <li>
            <a href="javascript:;" class="line_item">
              <span class="mail_pay_title f-left fc-dark fs-3 fw-6">邮寄费用</span>
              <span class="fc-red mail_pay_count f-right">{{mail_pay}}</span>
            </a>
          </li>
          <li>
            <a href="javascript:;" class="line_item" @click="selcet_city()">
              <span class="mail_addr f-left fc-dark">邮寄地址</span>
              <span class="fs-3 f-right mt-1 fc-gray fw-6 iconfont icon-previewright fc-dark"></span>
              <span class="fs-3 fw-6 fc-dark f-right">{{!mail_addr?'请选择':mail_addr}}</span>
            </a>
          </li>
        </ul>

        <ul class="invoice_detail w-100">
          <li class="detail_items">
            <a href="javascript:;" class="line_input_item">
              <span class="fs-3 fw-6 fc-dark invoice_fill_email">邮&#12288;&#12288;箱</span>
              <input
                class="line_input fw-6 fs-3 fc-dark"
                type="text"
                placeholder="联系邮箱"
                v-model="invoiceDetail.email"
              />
            </a>
          </li>
        </ul>
        <div class="invoice_pay w-100 bg-white" @click.stop="pay_modal_show= !pay_modal_show">
          <a href="javascript:;" class="cell_arrow_item">
            <div class="cell_txt">
              <span class="pay_title fs-3 fw-6 fc-dark f-left">支付方式</span>
              <span class="payModel mr-1 f-right fw-6">{{pay_model}}</span>
              <span class="payLogo f-right mr-3">
                <img :src="pay_logo" />
              </span>
            </div>
            <span class="cell_arrow fs-3 fc-gray fw-6 iconfont icon-previewright"></span>
          </a>
        </div>
        <div class="remark_msg w-100 bg-white">
          <p class="remark_title fc-dark fs-3 fw-6 mb-1">备注信息</p>
          <yd-textarea
            class="remark_text fw-6 fc-dark"
            placeholder="请输入备注信息"
            maxlength="100"
            v-model="remark_txt"
          ></yd-textarea>
        </div>
      </div>
    </div>

    <div class="invoic_footer bg-gray w-100">
      <div class="invoic_footer_title">
        <span>合计:</span>
        <span class="fc-red invoic_footer_salary">{{sum}}</span>
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
              <img :src="tmp.logo" alt />
              <span class="ml-3 fc-blue fw-6 fm-1">{{tmp.title}}</span>
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
// import "../../../static/js/bignumber-8.1.1/bignumber.js";
// import District from "ydui-district/dist/jd_province_city_area_id";
// import { defaults } from "autoprefixer";
import { BigNumber } from "bignumber.js";
export default {
  data() {
    return {
      //   show: false, //地址弹框开关
      //   modal_value: "", //监听地址选择的值
      //   district: District,
      token: this.getToken(),
      header_title: "发票助手",
      invoiceInfoList: [
        {
          title: "发票信息",
          url: "/ListInvoiceInfo",
          code: false,
          type: 2,
          lobourName: ""
        },
        {
          title: "劳务者信息",
          url: "/addlaborsinfo",
          code: false,
		  type: 1, 
		
          lobourName: ""
        }
      ],
      invoiceAll: false, //发票信息是否填写
      invoiceAlls: [],
      labourAll: false, //劳务者是否填写
      default_addr: "", //默认地址
      invoiceDetail: {
        amount: "",
        servicePrice: null,
        total: 0,
        salary: 0,
        email: "",
        bili: ""
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
      ],
      addressId: 0
    };
  },
  created() {
    this.selfMainLoadOpend();
    this.$store.commit("setHeaderStyle", {
      txt: this.header_title,
      type: 0
    });
    this.init();
    this.invoiceDetail.bili = this.getCache("dataYF", 2).servers.Invoice.bili;
  },
  mounted() {
    var h = document.documentElement.clientHeight;
    $(".invoic_footer").css("height", `${h * 0.075}px`);
    $(".invoice_fill_group").css("height", `${h * 0.93}px`);
    var type = this.getParams().type;
    this.invoiceInfoList[0].type = type;
    if (type == 3) {
      var a = document.getElementsByClassName("header_left")[0];
      a.href = "javascript:;";
      var that = this;
      a.onclick = function() {
        that.$router.push("/usercenter");
      };
    } else if (type == 2) {
      var a = document.getElementsByClassName("header_left")[0];
      a.href = "javascript:;";
      var that = this;
      a.onclick = function() {
        that.$router.push("/service_main");
      };
    }
  },
  destroyed() {
    //do something after destroying vue instance
    var a = document.getElementsByClassName("header_left")[0];
    a.onclick = null;
    setTimeout(() => {
      a.href = "javascript:history.go(-1)";
    }, 500);
  },

  methods: {
    init() {
      this.$dialog.loading.close();
      if (this.deBug()) {
        this.invoiceDetail.email = null;
        // this.invoiceDetail.email = "13311111111@qq.com";
        // this.invoiceDetail.amount = 1000;
        this.invoiceDetail.amount = null;
        // this.remark_txt = "发票测试备注信息";
        this.remark_txt = null;
        // this.mailCode = true;
      }
      this.getInfo();
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },

    selectCode() {
      this.select_code = true;
    },

    getInfo() {
      var laborsinfo = this.getCache("laborsinfo", 2);
      if (laborsinfo) {
        this.labourAll = laborsinfo.labourAll;
        this.invoiceInfoList[1].lobourName = laborsinfo.labourName;
        this.invoiceInfoList[1].code = true;
      }
      var InfoData = this.getCache("InfoData", 2);
      if (InfoData) {
        this.invoiceAll = InfoData.invoiceAll;
        this.invoiceInfoList[0].lobourName = InfoData.invoiceTitle;
        this.invoiceInfoList[0].code = true;
      } else {
        // console.log('默认地址接口处')
        this.defaultAdd();
      }
      //新增我的地址信息?
      var addr = this.getCache("invoice_fill_user_addr", 2);
      if (addr) {
        this.mailCode = true;
        this.mail_addr = addr.addr;
        this.addressId = addr.id;
      } else {
        // this.getDefaultAddr();
      }
      // this.mail_pay = 10;
      this.mail_pay = null;
    },

    defaultAdd() {
      var param = {
        token: this.getToken()
      };
      this.__initAction("Invoice-getDefault", param, (res, s) => {
        if (s == 1) {
          this.invoiceAll = true;
          this.invoiceAlls = res.data;
          var arr = {
            invoiceAll: true
          };
          this.invoiceAlls = JSON.stringify(
            Object.assign(this.invoiceAlls, arr)
          );
          this.invoiceInfoList[0].lobourName = res.data.invoiceTitle;
          this.invoiceInfoList[0].code = true;
        }
      });
    },

    // getDefaultAddr(id = 0) {
    // 	if (id == 0) {
    // 		var param = {
    // 			token: this.getToken(),
    // 			sql:
    // 				"SELECT * from tk_member_address WHERE userId = " +
    // 				this.getUserInfo().uid +
    // 				" AND status = 1 ORDER BY isDefault desc,id desc LIMIT 0,1"
    // 		};
    // 		this.__initAction("Rigorous-initMysqlData", param, (res, s) => {
    // 			if (s == 1) {
    // 				this.getDefaultAddr(res.data[0].id);
    // 			} else {
    // 				return false;
    // 			}
    // 		});
    // 	} else {
    // 		var param = {
    // 			token: this.getToken(),
    // 			id: id
    // 		};
    // 		this.__initAction("Address-getInfo", param, (res, s) => {
    // 			if (s == 1) {
    // 				var data = res.data;
    // 				this.mail_addr =
    // 					data.province +
    // 					" " +
    // 					data.city +
    // 					" " +
    // 					data.area +
    // 					" " +
    // 					data.address +
    // 					" ";

    // 				this.addressId = id;
    // 			}
    // 		});
    // 	}
    // },

    selcet_city() {
      // 选择城市弹框
      this.__Href("/user_addr/list");
    },

    // result(ret) { //返回选中的地址
    //   this.mail_pay = 15;
    //   this.modal_value =
    //     ret.itemName1 + " " + ret.itemName2 + " " + ret.itemName3;
    // },
    modal_cancel() {
      this.pay_modal_show = false;
    },

    select_pay(i) {
      this.payValue = i;
      this.pay_modal_show = false;
    },

    pay_invoice() {
      // 提交
      var token = this.getToken();
      var invoiceAmount = this.invoiceDetail.amount;
      var servicePrice = this.invoiceDetail.servicePrice;
      var invoiceTotalPrice = this.sum;
      var invoiceRemarks = this.remark_txt;
      var invoiceEmail = this.invoiceDetail.email;

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
      if (!invoiceRemarks) {
        this.$dialog.toast({
          mes: "请填写备注",
          timeout: 1500
        });
        return;
      }
      if (!invoiceEmail) {
        this.$dialog.toast({
          mes: "请填写邮箱",
          timeout: 1500
        });
        return;
      }
      var laborsinfo = this.getCache("laborsinfo", 2);
      var InfoData = this.getCache("InfoData", 2);
      if (InfoData) {
        InfoData = this.getCache("InfoData", 2);
        console.log(InfoData);
      } else {
        InfoData = JSON.parse(this.invoiceAlls);
        console.log(InfoData);
      }
      var info = {};
      info.token = token;
      info.invoiceAmount = invoiceAmount;
      info.servicePrice = servicePrice;
      info.invoiceTotalPrice = invoiceTotalPrice;
      info.invoiceRemarks = invoiceRemarks;
      info.email = invoiceEmail;
      info.isZip = isZip;
      info.zipPrice = zipPrice;
      info.payType = payType;
      info.postalAddress = this.addressId;
      info.ticketId = InfoData.id;
      var param = Object.assign(info, InfoData, laborsinfo);
      console.log(param);

      this.$dialog.loading.open("正在支付请稍后...");

      this.__initAction("Invoice-addMemberInvoice", param, (res, s) => {
        if (s == 1) {
          this._msg(res.info, 1500, "success");
          setTimeout(() => {
            this.$router.push("/paycompleted");
          }, 1600);
        }
      });
    }
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
      let bili = this.invoiceDetail.bili / 100;
      //   let total = this.invoiceDetail.amount * bili;

    //   let total = this.calc(this.invoiceDetail.amount, bili, "*", 2);
        let strTotal = (this.invoiceDetail.amount * bili).toString();
		let str = strTotal.substring(0,strTotal.indexOf(".") + 3);
		
		let total = parseFloat(str);

		console.log(total)

    //   let BN = BigNumber.clone();
    //   BN.config({
    //     DECIMAL_PLACES: 2
    //   });
    //   let total = BN(this.invoiceDetail.amount).times(bili).toFixed(2);
     

      this.invoiceDetail.servicePrice = total;
      this.invoiceDetail.salary = total + this.mail_pay;
    //   this.invoiceDetail.total = (
    //     this.invoiceDetail.amount *
    //     (1 + bili)
	//   ).toFixed(2);

      return total.toFixed(2);
	},
	fapiao() {
       return (Number(this.service_charge) + Number(this.invoiceDetail.amount)).toFixed(2);
	},
	sum() {
		return (Number(this.fapiao) + Number(this.mail_pay)).toFixed(2);
	},

    // invoiceTotalPrice() {
    //     var count = this.mail_pay + this.invoiceDetail.servicePrice;
    // //   var count = this.service_charge + this.invoiceDetail.amount;
    //   this.invoiceDetail.salary = count.toFixed(2);
    //   return count.toFixed(2);
    // }
  },
  watch: {
    mailCode() {
      if (this.mailCode) {
        // if (this.mail_addr) {
        // 	this.mail_pay = 10;
        // }
        this.mail_pay = 10;
      } else {
        this.mail_pay = null;
      }
    }
  }
};
</script>
<style lang="scss">
.invoice_fill_email {
  color: #333;
  font-size: 14px;
  font-weight: 600;
}
</style>
