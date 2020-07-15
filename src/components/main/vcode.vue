s<template>
  <div class="vcode bg-white w-100">
    <div class="logo-top">
      <img :src="selfLogo" alt />
      <p v-if="isShowMin">
        已发送4位验证码至您的{{pageInfo.device}}
        <span>{{hiddenTel}}</span>
      </p>
      <p v-if="!isShowMin" style="opacity:0;">(o_o)</p>
    </div>

    <div class="code">
      <input
        v-model="model.input"
        oninput="if(value.length>4)value=value.slice(0, 4)"
        class="input"
        type="number"
      />
      <span class="inputStyle">{{code[0]}}</span>
      <span class="inputStyle">{{code[1]}}</span>
      <span class="inputStyle">{{code[2]}}</span>
      <span class="inputStyle">{{code[3]}}</span>
    </div>
    <div class="but">
      <!-- <a href="javascript:;" @click="dologin()">确认</a> -->
      <!-- <a href="javascript:;" @click="handleConfirm(pageInfo.strType)">确认</a> -->
      <!-- <router-link to="/personalInformation">确认</router-link>  -->
      <!-- @click="handleConfirm(pageInfo.strType)" -->
    </div>
    <div class="haveCode" @click="handleIsCode">
      <span v-show="isShowMin">00:{{time}}后</span>
      <span class="anginHaveCode">{{isShowMin?'重新':'点击'}}获取</span>
    </div>
    <div class="key-container-phone">
      <div class="keyboard" @click.stop="_handleKeyPress">
        <div class="title">
          <yd-icon class="verifycode" name="verifycode"></yd-icon>天安安全键盘
        </div>
        <div class="key-row">
          <div class="key-cell" data-num="1">1</div>
          <div class="key-cell" data-num="2">2</div>
          <div class="key-cell" data-num="3">3</div>
        </div>
        <div class="key-row">
          <div class="key-cell" data-num="4">4</div>
          <div class="key-cell" data-num="5">5</div>
          <div class="key-cell" data-num="6">6</div>
        </div>
        <div class="key-row">
          <div class="key-cell" data-num="7">7</div>
          <div class="key-cell" data-num="8">8</div>
          <div class="key-cell" data-num="9">9</div>
        </div>
        <div class="key-row">
          <div class="key-cell" data-num="S">
            <i class="iconfont iconqueding" data-num="S"></i>
          </div>
          <div class="key-cell" data-num="0">0</div>
          <div class="key-cell" data-num="D">
            <i class="iconfont iconbackspace" data-num="D"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //
      smsCode: "",
      code: [],
      //
      pageInfo: {
        tel: null,
        strType: null,
        title: "",
        device: "",
        pid: 0
      },
      time: 59,
      timer: null,
      isDis: true,
      isShowMin: true,
      inputNum: "",
      hideinputNum: "",
      model: {
        input: ""
      }
    };
  },

  created() {
    this.getPageData()
      .then(data => {
        return new Promise((resolve, reject) => {
          this.$store.commit("setHeaderStyle", {
            txt: this.pageInfo.title,
            type: 1
          });
          resolve(data);
        });
      })
      .then(data => {
        if (this.pageInfo.title != "手机登录") {
          return this.sendTelCode(data);
        }
      })
      .then(() => {
        this.countdown();
      });
  },

  mounted() {
    if (this.deBug()) {
      // console.log(window.localStorage);
    }
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
      let S = this.code;
      //如果没有输入，直接返回
      if (!S.length) return false;
      //否则删除最后一个
      this.code = S.substring(0, S.length - 1);
    },
    //处理数字
    _handleNumberKey(num) {
      if (this.code.length < 4) {
        this.code += num;
        console.log(this.code);
        if (this.code.length == 4) {
          console.log("长度满足要求，请求接口中.....");
          this._msg("正在登录请稍后...",300);
          let type = this.pageInfo.strType;
          var url = "Tools-testTelCode",
            telPhone = this.pageInfo.tel,
            params;
          //   var code = this.modelInput;
          var code = this.code;
          if (!code || code.length != 4) {
			
            return this._msg("请输入正确验证码！");
          } else {
            if (type == "login" || type == "getpass") {
              // this.$dialog.loading.open("正在登录请稍后...");
              // this.$dialog.loading.close();
              params = {
                telPhone,
                code,
                type: "login",
                len: 4,
                pid: this.pageInfo.pid
              };
            } else if (type == "reg") {
              params = {
                telPhone,
                code,
                type: "reg",
                len: 4,
                pid: this.pageInfo.pid
              };
            }
            var that = this;
            that.__initAction(url, params, (res, s) => {
              if (s == 1) {
                this.$dialog.loading.close(); //清除缓存
                var token = res.data.token;
                var uid = res.data.id;
                var rid = res.data.rid;
                // var telPhone = res.data.loginName;
                var portrait = res.data.portrait;
                var user_info = {
                  token: token,
                  uid: uid,
                  rid: rid,
                  telPhone: telPhone,
                  location: this.Global.config.location,
                  portrait: portrait
                };
                this.Global.config.uid = res.data.id;
                this.Global.config.token = user_info.token;
                this.setCache("user_info", JSON.stringify(user_info));
                // this._msg(res.info);
                if (type == "login") {
                  // this._msg('登录成功')
                  //登录
                  setTimeout(() => {
                    this.__Sleep(e => {
                      this.__Href("/");
                    });
                  }, 500);
                } else if (type == "getpass") {
                  // this._msg('验证通过')
                  //重置密码
                  setTimeout(() => {
                    var obj = {
                      path: "/setPassWord",
                      query: {
                        code,
                        tel: telPhone
                      }
                    };
                    this.$router.push(obj);
                  }, 200);
                } else if (type == "reg") {
                  // this._msg('验证通过')
                  //验证通过
                  setTimeout(() => {
                    this.__Sleep(e => {
                      this.__Href("/personalInformation");
                    });
                  }, 200);
                }
              } else {
                this._msg(res.info);
                // 验证码有误时删除
				this.modelInput = "";
				this.code = [];
              }
            });
          }
        }
      } else {
        console.log("超出限制");
      }
    },
    getPageData() {
      //获取页面数据
      return new Promise((resolve, reject) => {
        this.pageInfo.strType = this.getParams().str;
        this.pageInfo.tel = this.getQuery().tel;
        this.pageInfo.device = this.getQuery().type;
        this.pageInfo.pid = this.getQuery().pid;
        switch (this.pageInfo.strType) {
          case "login":
            this.pageInfo.title = "手机登录";
            break;
          case "getpass":
            this.pageInfo.title = "修改密码";
            break;
          case "reg":
            this.pageInfo.title = "注册";
            break;
          default:
            console.log("异常");
            break;
        }
        resolve(this.pageInfo.strType);
      });
    },

    sendTelCode(data) {
      //发送验证码
      var type;
      switch (data) {
        case "login":
          type = "havelng";
          break;
        case "getpass":
          type = "havelng";
          break;
        case "reg":
          type = "reg";
          break;
      }
      return new Promise((resolve, reject) => {
        var that = this;
        var url = "Tools-setTelCode";
        console.log(this.pageInfo);
        var params = {
          telPhone: that.pageInfo.tel,
          type,
          len: 4,
          pid: this.pageInfo.pid
        };
        that.__initAction(url, params, (res, s) => {
          if (s == 1) {
            // that._msg(res.info, 800);
            resolve();
          } else {
            if (res.info == "手机号已被注册!") {
              that._msg(res.info);
              that.$router.back(-1);
            } else {
              setTimeout(() => {
                this.__Sleep(e => {
                  this.__Href("/login");
                });
              }, 500);
            }
          }
        });
      });
    },

    // 确认
    dologin() {
      var value = this.model.input;
      // 判断
      if (!value) {
        this._msg("请先输入验证码");
        return;
      }
      this.$router.push("/PersonalInformation");
    },

    countdown() {
      //倒计时
      var m = 1000; //1秒
      this.timer = setInterval(() => {
        this.time--;
        this.isDis = false;
        if (this.time <= 0) {
          this.time = 59;
          this.isShowMin = false;
          this.isDis = true;
          clearInterval(this.timer);
        }
      }, m);
    },

    handleIsCode() {
      //重新发送
      if (!this.isDis) return;
      this.isShowMin = true;
      this.sendTelCode().then(() => {
        this.countdown();
      });
    },

    _handleConfirmKey() {
      let type = this.pageInfo.strType;
      var url = "Tools-testTelCode",
        telPhone = this.pageInfo.tel,
        params;
      //   var code = this.modelInput;
      var code = this.code;

      if (!code || code.length != 4) return this._msg("请输入正确验证码！");
      if (type == "login" || type == "getpass") {
        // this.$dialog.loading.open("正在登录请稍后...");
        // this.$dialog.loading.close();
        params = {
          telPhone,
          code,
          type: "login",
          len: 4,
          pid: this.pageInfo.pid
        };
      } else if (type == "reg") {
        params = {
          telPhone,
          code,
          type: "reg",
          len: 4,
          pid: this.pageInfo.pid
        };
      }
      var that = this;
      that.__initAction(url, params, (res, s) => {
        if (s == 1) {
          this.$dialog.loading.close(); //清除缓存
          var token = res.data.token;
          var uid = res.data.id;
          var rid = res.data.rid;
          // var telPhone = res.data.loginName;
          var portrait = res.data.portrait;
          var user_info = {
            token: token,
            uid: uid,
            rid: rid,
            telPhone: telPhone,
            location: this.Global.config.location,
            portrait: portrait
          };
          this.Global.config.uid = res.data.id;
          this.Global.config.token = user_info.token;
          this.setCache("user_info", JSON.stringify(user_info));
          // this._msg(res.info);
          if (type == "login") {
            // this._msg('登录成功')
            //登录
            setTimeout(() => {
              this.__Sleep(e => {
                this.__Href("/");
              });
            }, 500);
          } else if (type == "getpass") {
            // this._msg('验证通过')
            //重置密码
            setTimeout(() => {
              var obj = {
                path: "/setPassWord",
                query: {
                  code,
                  tel: telPhone
                }
              };
              this.$router.push(obj);
            }, 200);
          } else if (type == "reg") {
            // this._msg('验证通过')
            //验证通过
            setTimeout(() => {
              this.__Sleep(e => {
                this.__Href("/personalInformation");
              });
            }, 200);
          }
        } else {
          this._msg(res.info);
          // 验证码有误时删除
          this.modelInput = "";
        }
      });
    },

    loginRun() {
      return new Promise((resolve, reject) => {
        this.__initAction("Member-login", param, (res, s) => {
          if (s == 1) {
            this.$dialog.loading.close(); //清除缓存
            var token = res.data.token;
            var uid = res.data.uid;
            // var rid = res.data.rid;
            var telPhone = this.hiddenTel;
            var user_info = {
              token: token,
              uid: uid,
              // rid: rid,
              telPhone: telPhone,
              location: this.Global.config.location
            };
            this.Global.config.uid = user_info.uid;
            this.Global.config.token = user_info.token;
            this.setCache("user_info", JSON.stringify(user_info));
            this.setCache("userInfoExt", JSON.stringify(res.data));
            this._msg(res.info);
            setTimeout(() => {
              this.__Sleep(e => {
                this.__Href("/");
              });
            }, 500);
          } else {
            this._msg(res.info);
          }
        });
      });
    }
  },

  watch: {
    modelInput() {
      var val = this.modelInput;
      if (val.length > 4) return;
      var arr = val.split("");
      this.code = arr;
    }
  },

  computed: {
    selfLogo() {
      return this.getCache("APPLOGO", 2).val;
    },

    hiddenTel() {
      var tel = this.pageInfo.tel;
      tel = "" + tel;
      var reg = /(\d{3})\d{4}(\d{4})/;
      var tel1 = tel.replace(reg, "$1****$2");
      return tel1;
    },

    modelInput: {
      get: function() {
        return this.model.input;
      },
      set: function(value) {
        this.model.input = value;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.vcode {
  background: #fff;
  width: 100vw;
  height: calc(100vh - 2.8rem);
  box-sizing: border-box;
  overflow: hidden;
}
.logo-top {
  img {
    width: 100px;
    height: 100px;
    display: block;
    margin: 0 auto;
    margin-top: 30px;
  }
  p {
    text-align: center;
  }
}
.codenum {
  display: flex;
  justify-content: space-around;
  padding-left: 20%;
  padding-right: 20%;
  margin-top: 3rem;
  input {
    width: 2rem;
    height: 2rem;
    border: 1px solid #000;
    border-radius: 5px;
    text-align: center;
    vertical-align: middle;
    font-size: 1rem;
  }
}
.but {
  margin-top: 10px;
  padding: 0 25px;
  a {
    display: flex;
    height: 44px;
    color: #fff;
    font-size: 1.1rem;
    letter-spacing: 1px;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background: #3d7efe;
    box-shadow: 5px 4px 6px #79a8d3;
  }
}
.haveCode {
  text-align: center;
  margin-top: 20px;
  .anginHaveCode {
    color: #407be2;
  }
}
.code {
  width: 100%;
  display: flex;
  justify-content: center;
  line-height: 2rem;
  font-size: 15px;
  margin-top: 30px;
  position: relative;
  .inputStyle {
    margin: 10px;
    width: 13vw;
    height: 13vw;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    border: 2px solid #ccc;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    opacity: 0;
  }
}
.key-container-phone {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 8888;
}
.keyboard {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 250px;
  width: 100%;
  background-color: #fff;
  z-index: 99999;
}
.keyboard .title {
  height: 30pox;
  line-height: 30px;
  text-align: center;
  // border-top: 1px solid #d5d5d6;
  box-shadow: 0 -12px 7px -9px #d5d5d6;
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
.keyboard .key-cell .iconfont {
  font-size: 24px;
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
