<template>
  <div class="loginPage w-100 bg-white">
    <div class="jump-reg">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
      <router-link
        :to="{path:'/regPhone/0',query:{mode: 'app'}}"
        class="jump-reg-link bg-white fs-3 blue"
      >注册</router-link>
    </div>

    <div class="loginLogoStyle w-100" v-if="isShow">
      <div class="logo_circle">
        <span class="fc-white">
          <img :src="appLogoSrc" alt class="w-100" />
        </span>
      </div>
    </div>

    <div class="inputGroup w-100" v-if="isShow">
      <div class="inputGroup-input">
        <h3 class="phone-loble">账号</h3>
        <div class="login_phone">
          <input type="text" placeholder="请输入注册手机号/邮箱账号" v-model="userInfo.uPhone" />
          <!-- <img src="http://static.sxtian.com/imgs/main/icon_user.png" alt /> -->
        </div>
      </div>
      <div class="inputGroup-input">
        <h3 class="phone-loble">密码</h3>
        <div class="login_pwd">
          <input maxlength="20" type="password" placeholder="请输入登录密码" v-model="userInfo.uPwd" />
          <!-- <img src="http://static.sxtian.com/imgs/main/icon_pwd.png" alt /> -->
        </div>
      </div>

      <div class="bottom_word">
        <yd-checkbox class="checkboxs" color="#64b2f0" v-model="checkboxs"></yd-checkbox>
        <span>登录表示接受</span>
        <router-link to="/readingguide/2" style="color:#64B2F0">《用户协议》</router-link>
        <span>和</span>
        <router-link to="/readingguide/11" style="color:#64B2F0">《隐私政策》</router-link>
      </div>

      <a href="javascript:;" class="login_btn bg-blue w-85" @click="do_login()">
        <span class="fm-2 fc-white fw-6">登 录</span>
      </a>
      <p class="mt-4">
        <!-- to="/register_select/app" -->
        <router-link to="/phoneLogin" class="bg-white fs-3 blue">手机验证码登录</router-link>
        <router-link to="/back_password" class="bg-white fs-3 blue">忘记密码?</router-link>
      </p>
    </div>

    <!-- <div class="others" v-show="hidshow">
			<div class="other-bottom-login">
				<span class="center-line"></span>
				<span>其他登录方式</span>
				<span class="center-line"></span>
			</div>
			<div class="login-other-icon">
				<div class="icon-radius-box">
					<span class="newiconfont icon-qunfengxinlangweibo"></span>
				</div>
				<div class="icon-radius-box" @click="$utils.wxlog()">
					<span class="newiconfont icon-weixin"></span>
				</div>
				<div class="icon-radius-box">
					<span class="newiconfont icon-qq"></span>
				</div>
			</div>
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        uPhone: "",
        uPwd: "",
      },
      appLogoSrc: "",
      isShow: false,
      isReLaod: 1,
      checkboxs: true,
      // checkboxs: true,

      docmHeight: 0, //默认屏幕高度
      showHeight: 0, //实时屏幕高度
      hidshow: true, //显示或者隐藏footer
      isResize: false, //默认屏幕高度是否已获取
    };
  },
  mounted() {
    if (this.deBug()) {
      // this.userInfo.uPhone = "13110447185";
      // this.userInfo.uPwd = "123456";
      // console.log(window.localStorage);
    }
    this.reIndex();

    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        if (!this.isResize) {
          //默认屏幕高度
          this.docmHeight = document.documentElement.clientHeight;
          this.isResize = true;
        }
        //实时屏幕高度
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  created() {
    //window.location.reload(true);
    this.selfMainLoadOpend();
    this.getConfigApp();
    this.setCache("footTabbarChange", 0);
  },
  methods: {
    reIndex() {
      var code = this.getCache("footTabbarChange", 2);
      if (code) {
        if (code == 4) {
          window.location.reload(true);
        }
      }
    },

    getConfigApp() {
      var that = this;
      this.__initAction("Tools-getConfigApp", {}, (res, s) => {
        if (s == 1) {
          var data = res.data;
          for (let i of data.defBase) {
            // console.log(i.title);
            this.setCache(i.title, JSON.stringify(i));
          }
          this.setCache("dataYF", JSON.stringify(data.data));
          var b = this.getCache("APPLOGO", 2);
          that.appLogoSrc = b.val;
          that.isShow = true;
        }
      });
      // 获取菜单数据
      this.__Sleep((e) => {
        this.selfMainLoadClosed();
      }, 1000);
    },
    do_login() {
      var reP = this.Global.reg_phone;
      var reES = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      var reE = /\@/;///^[\w./]+\@+[\w./]+$/;
      var loginPass = this.userInfo.uPwd;
      var loginName = this.userInfo.uPhone;
      var checkboxs = this.checkboxs;
      var check = false;
      if (reE.test(loginName)) {//检查有无@ match("@")=="@" 
        check = "email";
        // console.log("ck", this.checkEmail2(loginName, reE, "other"));
        // check = this.checkEmail2(loginName, reE, "other");
      } else {
        check = "phone";
        // console.log("ck", this.checkPhone2(loginName, reP, "other"));
        // check = this.checkPhone2(loginName, reP, "other");
      }
      switch (check) {
        case "phone":
          check = this.checkPhone2(loginName, reP, "other");
          break;
        case "email":
          check = this.checkEmail2(loginName, reE, "other");
          break;
      }
      if (typeof check != "boolean") {
         console.log("check", check, typeof check,'我把提交干掉了');
         this._msg(check);
         return false;
      }
      if (!this.checkPwd(loginPass)) {
        return;
      }
      if (!this.checkCheckbox(checkboxs)) {
        return;
      }
      this.$dialog.loading.open("正在登录请稍后...");
      var param = {
        loginName,
        loginPass,
      };
      this.__initAction("Member-login", param, (res, s) => {
        console.log(res);
        if (s == 1) {
          this.$dialog.loading.close(); //清除缓存
          var token = res.data.token;
          var uid = res.data.uid;
          var rid = res.data.rid;
          var telPhone = loginName;
          var Husername = res.data.hxUser.entities[0].username;
          var user_info = {
            token: token,
            uid: uid,
            rid: rid,
            telPhone: telPhone,
            location: this.Global.config.location,
            Husername,
          };
          this.Global.config.uid = user_info.uid;
          this.Global.config.token = user_info.token;
          this.setCache("user_info", JSON.stringify(user_info));
          this.setCache("userInfoExt", JSON.stringify(res.data));
          setTimeout(() => {
            this.__Sleep((e) => {
              this.__Href("/newusercenter");
            });
          }, 500);
        } else {
          this._msg(res.info);
        }
      });
    },
  },
  watch: {
    showHeight: function () {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    },
  },
};
</script>
<style lang="scss">
.loginPage {
  height: 100vh;
  .jump-reg {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .arrow-logo {
      font-size: 24px;
    }
  }

  .jump-reg-link {
    color: #c9c9c9;
  }
  .phone-loble {
    font-size: 0.95rem;
    align-self: flex-start;
  }
  .inputGroup-input {
    width: 85%;
    margin-top: 10px;
    box-sizing: border-box;
  }
  .other-bottom-login {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1vh;
    .center-line {
      display: inline-block;
      width: 20vw;
      height: 0.07rem;
      background: #c9c9c9;
      margin: 0 5px;
    }
    span:nth-child(2) {
      color: #c9c9c9;
      font-size: 0.9rem;
    }
  }
  .login-other-icon {
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon-radius-box {
      color: #c6c6c6;
      width: 10vw;
      height: 10vw;
      background: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      .newiconfont,
      .iconfont {
        font-size: 9vw;
      }
    }
  }

  .bottom_word {
    padding-top: 10px;
    line-height: 20px;
    text-align: center;
  }

  .blue {
    color: #3d7efe !important;
  }
  .inputGroup-input input,
  .inputGroup-input input {
    color: #000 !important;
  }

  .checkboxs {
    padding-right: 2px !important;
  }
  .yd-checkbox-text {
    display: none;
  }

  .others {
    position: absolute;
    top: calc(80% + 2.8rem);
    left: 16%;
  }
}
</style>
