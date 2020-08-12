<template>
<div class="Insuramce-search" :style="bodyStyle">
  <div class="Is-body">
    <ul class="Is-list">
      <li class="Is-list-itme t-center mt-4">
        <h1 v-text="pageInfo.bodyTitle"></h1>
      </li>
      <li class="Is-list-itme t-center fw-6 fs-3 fc-gray mt-3">
        <span class="fc-gray" v-text="pageInfo.reservation"></span>
        <span class="fc-red" v-text="pageInfo.ationNum"></span>
      </li>
      <li class="Is-list-itme mt-5">
        <span class="item-cell fw-6 fc-dark font-rem1" v-text="pageInfo.selectCity"></span>
        <input class="city-input fw-6 fc-dark font-rem1" type="text" placeholder="请输入城市" v-model="city">
      </li>
      <li class="Is-list-itme mt-4">
        <span class="item-cell font-rem1 fw-6 fc-dark" v-text="pageInfo.selectTel"></span>
        <input class="tel-input fw-6 fc-dark font-rem1" type="tel" placeholder="请填写你的手机号" v-model="tel">
      </li>
      <li class="Is-list-itme mt-3 fs-3 fc-gray mt-5">
        <span v-text="pageInfo.promptContent">我们将根据地区为您开通体验资格，请留意短信等通知方式</span>
      </li>
    </ul>
  </div>
  <a href="javascript:;" class="Is-btn" @click="doReserve">
    <span v-text="pageInfo.btn" class="fc-white fm-2 fw-6"></span>
  </a>
</div>
</template>

<script>
export default {
  data() {
    return {
      header_title: "我要预约",
      pageInfo: {
        btn: "立即预约",
        bodyTitle: "预约可优先开通",
        reservation: "已预约人数",
        ationNum: 500, //预约人数
        selectCity: "参保城市",
        selectTel: "手机号码",
        promptContent: "我们将根据地区为您开通体验资格，请留意短信等通知方式"
      },
      city: "", //选择城市
      tel: "",
      bodyStyle: {
        height: true,
        backgroundImage: true
      }
    }
  },
  created() { //创建
    this.selfMainLoadOpend();
    //设置标题
    this.$store.commit("setHeaderStyle", {
      txt: this.header_title,
      type: 0
    });
    this.init();
  },

  mounted() { //挂载
    var h = document.documentElement.clientHeight;
    var header = $(".nav_header").css("height");
    header = parseInt(header.substr(0, 2));
    this.bodyStyle.height = `${h}px`;
  },

  methods: {

    init() {
      this.getPageInfo();
      this.getDataInfo();
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },

    getPageInfo() {

    },

    getDataInfo() {
      var token = this.getToken();
      var url = "Tools-getConfigData";
      this.__initAction(url, {
        token
      }, (res, s) => {
        if (s == 1) {
          console.log(res)
          this.bodyStyle.backgroundImage = `url(${res.data.getList.bkdImage.value})`;
        }
      })
    },

    doReserve() {
      var url = "Lnsurancestaple-addStaple";
      var token = this.getToken();
      var phone = this.tel;
      var city = this.city;
      if (!city) return this._msg("请输入您的所在城市");
      if (!phone) return this._msg("请输入联系电话");
      if (!(/^1[3456789]\d{9}$/.test(phone))) return this._msg("您的号码格式有误!");
      var params = {
        phone,
        city,
        token
      };
      this.__initAction(url, params, (res, s) => {
        if (s == 1) {
          this._msg(res.info);
        } else {
          this._msg(res.info);
        }
      })
    }

  },
}
</script>

<style lang="scss" scoped>
.Insuramce-search {
    width: 100%;
    // background: linear-gradient(45deg,#dd9b1852,#ec941d);
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    .Is-body {
        width: 75%;
        height: 15rem;
        background-color: #fff;
        border-radius: 12px;
        box-shadow: 5px 5px 5px #888;
        .Is-list {
            padding: 1rem 1.5rem;
            width: 100%;
            height: 100%;
            // display: flex;
            flex-direction: column;
            // justify-content: space-between;
            align-items: center;
            .item-cell {
                margin-right: 0.5rem;
                display: inline-block;
                width: 25%;
                text-align: left;
            }
            .Is-list-itme:nth-child(3) {
                margin-top: 1.75rem;
            }
            .Is-list-itme:last-child {
                margin-top: 1.75rem;
            }
            .Is-list-itme {
                width: 100%;
                font-size: 14px;
                .tel-input {
                    font-size: 12px;
                    font-weight: 500;
                    outline: none;
                    border: none;
                    width: 60%;
                    text-align: left;
                    // line-height: 50px;
                }
                .city-input {
                    font-size: 12px;
                    font-weight: 500;
                    outline: none;
                    border: none;
                    width: 40%;
                    // line-height: 50px;
                }
            }
        }
    }
    .Is-btn {
        width: 95%;
        height: 44px;
        margin: 15px 0;
        background-color: #09f;
        border-radius: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .t-center {
        text-align: center;
    }
    .font-rem1 {
        font-size: 0.9rem;
    }
}
</style>
