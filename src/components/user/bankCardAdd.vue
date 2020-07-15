<template>
  <div class="addBankCard">
    <div class="addBankCard_group w-100">
      <p class="addBankCard_title fw-6 mb-4">{{pageInfo.text_title}}</p>
      <ul class="addBankCard_items bg-white">
        <li class>
          <a href="javascript:;" class="line_input_item p-r">
            <span class="r-left fw-6 fs-3 fc-dark">持卡人</span>
            <input class="line_input" type="text" placeholder="请输入您的姓名" v-model="cardName" />
            <a
              @click="cardName =''"
              v-if="addBankCardInfo.card_user.code"
              class="clearBtn bg-lightdark p-a"
              href="javascript:;"
            >
              <span class="iconfont icon-error"></span>
            </a>
          </a>
        </li>
        <li class>
          <a href="javascript:;" class="line_input_item p-r">
            <span class="r-left fw-6 fs-3 fc-dark">卡 &nbsp;&nbsp;号</span>
            <input class="line_input" type="number" placeholder="请输入银行卡号" v-model="cardId" />
            <a
              @click="cardId=''"
              v-if="addBankCardInfo.card_id.code"
              class="clearBtn bg-lightdark p-a"
              href="javascript:;"
            >
              <span class="iconfont icon-error"></span>
            </a>
          </a>
        </li>
        <li class>
          <a href="javascript:;" class="line_input_item p-r">
            <span class="r-left fw-6 fs-3 fc-dark">手机号</span>
            <input class="line_input" type="number" placeholder="请输入手机号码" v-model="telPhone" />
            <a
              @click="telPhone=''"
              v-if="telPhone"
              class="clearBtn bg-lightdark p-a"
              href="javascript:;"
            >
              <span class="iconfont icon-error"></span>
            </a>
          </a>
        </li>
        <li class="check_code_item">
          <a href="javascript:;" class="line_input_item p-r">
            <span class="r-left fw-6 fs-3 fc-dark">验证码</span>
            <input class="line_input" type="number" v-model="cardCheckCode" placeholder="请输入验证码" />
            <a
              @click="cardCheckCode=''"
              v-if="cardCheckCode"
              class="clearBtn bg-lightdark p-a"
              href="javascript:;"
            >
              <span class="iconfont icon-error"></span>
            </a>
          </a>
          <a
            slot="right"
            href="javascript:;"
            class="getCodeBtn bg-blue fc-white fs-3 fw-6"
            @click="get_checkCode()"
            v-if="!top_show"
          >获取验证码</a>
          <a
            slot="right"
            href="javascript:;"
            class="getCodeBtn bg-wgite br-gray fw-5"
            v-if="top_show"
          >
            <span class="fc-gray fw-6">{{time_total}}后重新获取</span>
          </a>
        </li>
      </ul>
    </div>
    <a href="javascript:;" class="addCardBtn btn-c bg-blue" @click="add_card()">
      <span class="fc-white fm-2 fw-7">确定绑定</span>
    </a>
    <!-- 顶部提示栏 -->
    <!-- <div class="top_alert_group w-100">
			<div class="top_alert_list bg-white" :class="top_show?'show':'hidden'">
				<span class="fs-3 fc-lightdark top_alert_title">短信验证码</span>
				<span class="fm-1 fc-dark top_alert_text">{{check_code}}</span>
			</div>
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "添加银行卡",
        text_title: "请填写银行卡信息",
        type: null
      },
      time_total: 60,
      check_code: null,
      top_show: false,
      telPhone: null,
      cardName: null,
      cardId: null, // 6222023700040128813
      cardCheckCode: null,
      addBankCardInfo: {
        card_user: {
          value: "",
          code: false
        },
        card_id: {
          value: "",
          code: false
        }
      }
    };
  },
  destroyed() {
    this.delCache("cardAddCheckCode");
  },
  created() {
    this.selfMainLoadOpend();
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 1
    });
    this.pageInfo.type = this.getParams().type;
    // this.telPhone = this.getUserInfo().telPhone;  //电话默认值
    this.init();
    // console.log(window.localStorage);
  },
  methods: {
    init() {
      // 获取菜单数据
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },

    get_checkCode() {
      var that = this;
      if (!this.cardName) {
        this._msg("请先输入您的姓名");
        return;
      }
      if (!this.cardId) {
        this._msg("请先输入您的银行卡号");
        return;
      }
      if (!this.telPhone) {
        this._msg("请先输入您的手机号码");
        return;
      }
      var timer = setInterval(() => {
        this.top_show = true;
        this.time_total--;
        if (this.time_total == 0) {
          this.time_total = 60;
          this.top_show = false;
          clearInterval(timer);
        }
      }, 1000);
      this._msg("验证已发送...");
      if (!this.top_show) {
        this.__initAction(
          "Tools-setTelCode",
          {
            telPhone: this.telPhone
          },
          (res, s) => {
            if (s == 1) {
              this.check_code = res.data.code;
              this.setCache("cardAddCheckCode", this.check_code);
              // setTimeout(() => {
              //   this.cardCheckCode = this.check_code;
              // }, 2000);
            } else {
              this._msg(res.info);
            }
          }
        );
      }
    },
    add_card() {
      var that = this;
      this.__initAction(
        "Bank-addMemberCard",
        {
          token: this.getToken(),
          cardUser: this.cardName,
          cardNum: this.cardId,
          telCode: this.cardCheckCode,
          PhoneCode: this.telPhone
        },
        (res, s) => {
          if (s == 1) {
            var cashBank = {};
            cashBank.id = res.data.id;
            this.setCache("cashBank", JSON.stringify(cashBank));
            this._msg(res.info);
            switch (this.pageInfo.type) {
              default:
                setTimeout(() => {
                  window.history.go(-1);
                }, 2000);
                break;
            }
          } else {
            this._msg(res.info);
          }
        }
      );
      //     } else if (this.pageInfo.page_num == 1) {
      //       var userNewCardInfo = {};
      //       userNewCardInfo.id = r.data.data.id;
      //       this.setCache(
      //         "userNewCardInfo",
      //         JSON.stringify(userNewCardInfo)
      //       );
      //       setTimeout(() => {
      //         window.history.go(-2);
      //       }, 2000);
      //     }
    }
  },
  watch: {
    cardName() {
      if (!this.cardName) {
        this.addBankCardInfo.card_user.code = false;
      } else {
        this.addBankCardInfo.card_user.code = true;
        this.addBankCardInfo.card_user.value = this.cardName;
      }
    },
    cardId() {
      if (!this.cardId) {
        this.addBankCardInfo.card_id.code = false;
      } else {
        this.addBankCardInfo.card_id.code = true;
        this.addBankCardInfo.card_id.value = this.cardId;
      }
    }
  }
};
</script>
<style lang="scss">
.addBankCard {
	position: static;
}

.clearBtn {
  width: 18px;
  height: 18px;
  top: 50%;
  margin-top: -9px;
  right: 8%;
  border-radius: 50%;
  span {
    font-size: 14px;
    color: #fff;
    font-weight: 600;
  }
}
</style>
