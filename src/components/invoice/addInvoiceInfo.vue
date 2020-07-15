<template>
  <div class="add_invoice_info w-100">
    <ul class="add_invoice_info_tabs bg-white">
      <li v-for="(item,i) in pageInfo.tabList" :key="i" class="tab_item">
        <a href="javascript:;" class="item" @click="select_tab(i)">
          <span
            class="item_code"
            :class="pageInfo.tabCode==i?'selectTab':'unSelectTab'"
          >{{item.title}}</span>
        </a>
      </li>
    </ul>
    <div class="clear-fixed"></div>
    <div class="add_invoice_info_group w-100">
      <ul class="add_info_list w-100">
        <li class="p-r">
          <div class="add_info_item">
            <span>名称</span>
            <input
              class="item_input"
              type="text"
              v-model="name"
              :placeholder="pageInfo.tabCode==0? '请输入单位名称（必填）':'请输入姓名（必填）'"
            >
          </div>
          <a
            href="javascript:;"
            class="clearBtn p-a"
            :class="nameShow?'bg-lightdark':'bg-white'"
            @click="name=''"
          >
            <span class="fw-6 fc-white iconfont icon-error"></span>
          </a>
        </li>
        <li class="p-r">
          <div class="add_info_item">
            <span>{{pageInfo.tabCode==0?'税号':'账号'}}</span>
            <input
              class="item_input"
              type="text"
              v-model="code_id"
              :placeholder="pageInfo.tabCode==0?'15-20位数字和字母（必填）':'请输入纳税人识别账号（必填）'"
            >
          </div>
          <a
            href="javascript:;"
            class="clearBtn p-a"
            :class="codeIdShow?'bg-lightdark':'bg-white'"
            @click="code_id=''"
          >
            <span class="fw-7 fc-white iconfont icon-error"></span>
          </a>
        </li>
        <li class="p-r">
          <div class="add_info_item">
            <span>地址</span>
            <input
              type="text"
              class="item_input"
              v-model="addr"
              :placeholder="pageInfo.tabCode==0?'请输入单位地址信息':'请输入个人地址信息'"
            >
          </div>
          <a
            href="javascript:;"
            class="clearBtn p-a"
            :class="addrShow?'bg-lightdark':'bg-white'"
            @click="addr=''"
          >
            <span class="fw-7 fc-white iconfont icon-error"></span>
          </a>
        </li>
        <li class="p-r">
          <div class="add_info_item">
            <span>电话</span>
            <input
              type="tel"
              class="item_input"
              v-model="telNum"
              maxlength="11"
              placeholder="请输入电话号码"
            >
          </div>
          <a
            href="javascript:;"
            class="clearBtn p-a"
            :class="telNumShow?'bg-lightdark':'bg-white'"
            @click="telNum=''"
          >
            <span class="fw-7 fc-white iconfont icon-error"></span>
          </a>
        </li>
        <li class="p-r">
          <div class="add_info_item">
            <span>开户银行</span>
            <input
              type="text"
              class="item_input"
              v-model="bank_name"
              maxlength="11"
              placeholder="请输入开户地址"
            >
          </div>
          <a
            href="javascript:;"
            class="clearBtn p-a"
            :class="bankNameShow?'bg-lightdark':'bg-white'"
            @click="bank_name=''"
          >
            <span class="fw-7 fc-white iconfont icon-error"></span>
          </a>
        </li>
        <li class="p-r">
          <div class="add_info_item">
            <span>银行账户</span>
            <input
              type="number"
              class="item_input"
              v-model="bank_code"
              maxlength="11"
              placeholder="请输入银行账户"
            >
          </div>
          <a
            href="javascript:;"
            class="clearBtn p-a"
            :class="bankCodeShow?'bg-lightdark':'bg-white'"
            @click="bank_code=''"
          >
            <span class="fw-7 fc-white iconfont icon-error"></span>
          </a>
        </li>
      </ul>

      <p class="p-4">
        <span class="fc-gray fs-3 fw-6">注：请填写完整信息，以便开具增值税发票，我们不会把您的信息用做其他用途。</span>
      </p>
    </div>
    <a href="javascript:;" class="addInvoiceBtn btn-c bg-blue mt-2" @click="save_info()">
      <span class="fc-white fw-6 fm-2">确认保存</span>
    </a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selcetTabCode: 0,
      pageInfo: {
        header_title: "添加发票信息",
        token: "",
        uid: null,
        tabCode: 0,
        tabList: [
          {
            title: "企业抬头",
            data: {
              name: "",
              code_id: "",
              addr: "",
              telNum: "",
              bank_name: "",
              bank_code: ""
            }
          },
          {
            title: "个人抬头",
            data: {
              name: "",
              code_id: "",
              addr: "",
              telNum: "",
              bank_name: "",
              bank_code: ""
            }
          }
        ]
      },
      name: "",
      nameShow: false,
      code_id: "",
      codeIdShow: false,
      addr: "",
      addrShow: false,
      telNum: "",
      telNumShow: false,
      bank_name: "",
      bankNameShow: false,
      bank_code: "",
      bankCodeShow: false
    };
  },
  created() {
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 0
    });
    this.pageInfo.token = this.getToken();
    this.pageInfo.uid = this.getUserInfo().uid;
    var userInvoiceInfo = this.getCache("userInvoiceInfo", 2);
    if (userInvoiceInfo) {
      var list = this.pageInfo.tabList;
      this.pageInfo.tabCode = userInvoiceInfo.invoiceType - 1;
      var i = this.pageInfo.tabCode;
      this.selcetTabCode = this.pageInfo.tabCode;
      list[i].data.name = userInvoiceInfo.invoiceTitle;
      list[i].data.code_id = userInvoiceInfo.invoiceTax;
      list[i].data.addr = userInvoiceInfo.invoiceAddress;
      list[i].data.telNum = userInvoiceInfo.invoicePhone;
      list[i].data.bank_name = userInvoiceInfo.invoiceBank;
      list[i].data.bank_code = userInvoiceInfo.invoiceAccount;
      this.name = list[i].data.name;
      this.code_id = list[i].data.code_id;
      this.addr = list[i].data.addr;
      this.telNum = list[i].data.telNum;
      this.bank_name = list[i].data.bank_name;
      this.bank_code = list[i].data.bank_code;
    }
  },
  methods: {
    save_info() {
      var invoiceTitle = this.name;
      var invoiceTax = this.code_id;
      var invoiceAddress = this.addr;
      var invoicePhone = this.telNum;
      var invoiceBank = this.bank_name;
      var invoiceAccount = this.bank_code;
      var invoiceType = this.pageInfo.tabCode + 1;
      var re_phone = this.Global.reg_phone;
      var re_cardId = this.Global.reg_bankCardId;
      if (!invoiceTitle) {
        this.$dialog.toast({ mes: "名称不能为空", timeout: 1000 });
        return;
      }
      if (!invoiceTax) {
        if (invoiceType == 1) {
          this.$dialog.toast({ mes: "税号不能为空", timeout: 1000 });
        } else {
          this.$dialog.toast({ mes: "账号不能为空", timeout: 1000 });
        }
        return;
      }
      if (!invoiceAddress) {
        this.$dialog.toast({ mes: "地址不能为空", timeout: 1000 });
        return;
      }
      if (!this.checkPhone(invoicePhone, re_phone)) {
        return;
      }
      if (!this.checkbankCardId(invoiceAccount, re_cardId)) {
        return;
      }
      var invoiceAll = true;
      var info = {
        invoiceAll,
        invoiceTitle,
        invoiceTax,
        invoiceAddress,
        invoicePhone,
        invoiceBank,
        invoiceAccount,
        invoiceType
      };

      this.$dialog.loading.open("正在保存请稍后...");
      var userInvoiceInfo = this.getCache("userInvoiceInfo", 2);
      if (!userInvoiceInfo) {
        userInvoiceInfo = info;
      } else {
        for (let x in info) {
          userInvoiceInfo[x] = info[x];
        }
      }
      userInvoiceInfo = JSON.stringify(userInvoiceInfo);
      setTimeout(() => {
        this.setCache("userInvoiceInfo", userInvoiceInfo);
        this.$dialog.loading.close();
        this.$dialog.toast({ mes: "保存成功", timeout: 1000, icon: "success" });
      }, 1000);
      setTimeout(() => {
        window.history.go(-1);
      }, 2000);
    },
    select_tab(i) {
      this.selcetTabCode = i;
      this.pageInfo.tabCode = i;
    }
  },
  watch: {
    name() {
      if (this.name) {
        this.nameShow = true;
      } else {
        this.nameShow = false;
      }
      this.pageInfo.tabList[this.pageInfo.tabCode].data.name = this.name;
    },
    code_id() {
      if (this.code_id) {
        this.codeIdShow = true;
      } else {
        this.codeIdShow = false;
      }
      this.pageInfo.tabList[this.pageInfo.tabCode].data.code_id = this.code_id;
    },
    addr() {
      if (this.addr) {
        this.addrShow = true;
      } else {
        this.addrShow = false;
      }
      this.pageInfo.tabList[this.pageInfo.tabCode].data.addr = this.addr;
    },
    telNum() {
      if (this.telNum) {
        this.telNumShow = true;
      } else {
        this.telNumShow = false;
      }
      this.pageInfo.tabList[this.pageInfo.tabCode].data.telNum = this.telNum;
    },
    bank_name() {
      if (this.bank_name) {
        this.bankNameShow = true;
      } else {
        this.bankNameShow = false;
      }
      this.pageInfo.tabList[
        this.pageInfo.tabCode
      ].data.bank_name = this.bank_name;
    },
    bank_code() {
      if (this.bank_code) {
        this.bankCodeShow = true;
      } else {
        this.bankCodeShow = false;
      }
      this.pageInfo.tabList[
        this.pageInfo.tabCode
      ].data.bank_code = this.bank_code;
    },
    selcetTabCode() {
      var list = this.pageInfo.tabList;
      var i = this.pageInfo.tabCode;
      this.name = list[i].data.name;
      this.code_id = list[i].data.code_id;
      this.addr = list[i].data.addr;
      this.telNum = list[i].data.telNum;
      this.bank_name = list[i].data.bank_name;
      this.bank_code = list[i].data.bank_code;
    }
  }
};
</script>
<style lang="scss">
a.clearBtn {
  text-decoration: none;
  width: 16px;
  height: 16px;
  top: 50%;
  margin-top: -8px;
  right: 5%;
  span {
    font-size: 12px;
  }
}
</style>
