s<template>
  <div class="service_main w-100">
    <header class="service_main_header bg-white shadow-dark w-100">
      <a class="w-20"></a>
      <span class="header_title fm-2 fc-dark">{{header_title}}</span>
      <a href="javascript:;" class="last"></a>
    </header>

    <div class="clear-fixed"></div>

    <div class="service_main_group w-100">
      <yd-slider autoplay="3000" class="service_slider w-100 mb-4" show-pagination>
        <yd-slider-item v-for="(tmp,i) in sliderImgs" :key="i">
          <router-link :to="`/bannerdetail/${tmp.id}`">
            <img :src="tmp.image" class="w-100" />
          </router-link>
        </yd-slider-item>
      </yd-slider>

      <div class="lesson_list w-100">
        <div class="lesson_item" v-for="(item,i) in menuList" :key="i">
          <img :src="item.image" alt @click="goHref(item.id)" :data-id="item.id" />
        </div>
      </div>
    </div>

    <div class="submit_toast_group" v-if="openDom.status">
      <div class="tosat_list bg-white">
        <span
          class="this_close iconfont fc-black fw-6 bg-black icon-chahao1"
          @click="openDom.status = false"
        ></span>
        <span
          class="tosat_logo iconfont fc-white fw-6"
          :class="openDom.status?'bg-red icon-chahao1':'icon-duihao4 bg-blue'"
        ></span>
        <span class="toast_text fc-dark fm-2">{{openDom.text == 1 ? '未设置安全密码！' : '未认证！'}}</span>
        <button
          class="toast_btn fc-white bg-red fm-1 fw-6"
          @click="alertBack(openDom.text)"
        >{{openDom.text == 1 ? '请设置安全密码' : '请认证'}}</button>
      </div>
    </div>
    <div class="key-container" v-if="openDom2.status">
      <div class="input-box">
        <p>请输入安全密码</p>
        <ul class="input-wrap">
          <li>
            <input type="password" disabled :value="sum[0]" />
          </li>
          <li>
            <input type="password" disabled :value="sum[1]" />
          </li>
          <li>
            <input type="password" disabled :value="sum[2]" />
          </li>
          <li>
            <input type="password" disabled :value="sum[3]" />
          </li>
          <li>
            <input type="password" disabled :value="sum[4]" />
          </li>
          <li>
            <input type="password" disabled :value="sum[5]" />
          </li>
        </ul>
        <span class="this_close iconfont fc-black fw-6 bg-black icon-chahao1" @click="close2()"></span>
      </div>
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
      header_title: "服务",
      menuList: [],
      sliderImgs: [],
      openDom: {
        text: 0,
        status: false,
        type: 1
      },
      openDom2: {
        text: 0,
        status: false,
        type: 1
      },
      loginPass: "",
      showKeyboard: false,
      sum: []
    };
  },
  mounted() {
    var h = document.documentElement.clientHeight;
    // $(".service_main_header").css("height", `${h * 0.07}px`);
  },
  created() {
    this.delSelectData();
    this.selfMainLoadOpend();
    this.init();
  },

  // beforeRouteLeave(to, from, next) {
  // 	if (to.path == "/newusercenter") {
  // 		to.meta.keepAlive = true;
  // 	}
  // 	next();
  // },
  watch: {},

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
      let S = this.sum;
      //如果没有输入，直接返回
      if (!S.length) return false;
      //否则删除最后一个
      this.sum = S.substring(0, S.length - 1);
    },
    //处理数字
    _handleNumberKey(num) {
      if (this.sum.length < 6) {
        this.sum += num;
        if (this.sum.length == 6) {
		      this._msg("正在提交请稍后...",300);
          let S = this.sum;
          //未输入
          if (!S.length) {
            return false;
          }
          var param = {
            token: this.getToken(),
            payPass: S
          };
          this.__initAction("Member-checkPayPass", param, (res, s) => {
            if (s == 1) {
              this.openDom2.status = false;
              this.__Href("/SalarySheet");
              this.sum = [];
            } else {
              this._msg(res.info);
              this.sum = [];
            }
          });
        }
      }
    },
    //提交
    _handleConfirmKey() {
      let S = this.sum;
      //未输入
      if (!S.length) {
        return false;
      }
      var param = {
        token: this.getToken(),
        payPass: S
      };
      this.__initAction("Member-checkPayPass", param, (res, s) => {
        if (s == 1) {
          this.openDom2.status = false;
          this.__Href("/SalarySheet");
          this.sum = [];
        } else {
          this._msg(res.info);
          this.sum = [];
        }
      });
    },
    init() {
      this.removeCache();
      // 获取服务Banner
      var param = {
        token: this.getToken(),
        type: 2
      };
      this.__initAction("Banner-getData", param, (res, s) => {
        if (s == 1) {
          this.sliderImgs = res.data;
        }
      });
      // 获取服务Banner

      // 获取菜单数据
      var param = {
        token: this.getToken()
      };
      this.__initAction("Tools-initApp", param, (res, s) => {
        console.log(res)
        if (s == 1) {
          for (var key in res.data.serviceData) {
            var it = res.data.serviceData[key];
            var add = {};
            add.id = it.id;
            add.image = it.image;
            add.ch_title = it.ch_title;
            add.en_title = it.en_title;
            this.menuList.push(add);
          }
          var list = this.menuList;
          // id为1386
          var arr = [];
          list.forEach(e => {
            // if(e.id == 1 ||  e.id == 3 || e.id == 8 || e.id == 6) {
              arr.push(e);
            // }
          });
          // var list1 = list.slice(0, 3);
          // var lsit2 = list.slice(3, 7);
          // var lsit3 = list.slice(7, 8);
          // this.menuList = (arr.concat(list1, lsit3, lsit2));
          this.menuList = arr;
          // 获取菜单数据
          this.selfMainLoadClosed();
        }
      });
    },

    goHref(id) {
      switch (id) {
        case 1:
          this.__Href("/lesson_group");
          break;
        case 2:
          this.__Href("/invoice_fill/" + id);
          break;
        case 3:
          this.__Href("/labour_services");
          break;
        case 6:
          this.__Href("/legal_policy");
          break;
        case 8:
          // window.location.href = "http://m.81fzjr.com/col.jsp?id=109#fai_461 ";
          this.funs();
          break;
        default:
          return false;
          break;
      }
    },

    delSelectData() {
      var info = this.getSelectData();
      if (info) {
        if (info.demand) {
          info.demand.salary_data = null;
        }
        if (info.skill) {
          info.skill.salary_data = null;
        }
        if (info.data) {
          info.data.data1 = null;
          info.select_addr = null;
          this.setCache("select_data", JSON.stringify(info));
        }
      }
    },

    funs() {
      let isLogin = this.getCache("user_info", 2);
      console.log(isLogin)
      if(isLogin) {
        var approveType = this.getCache("userInfoExt", 2).approveType;
        var isSetSecurityPass = this.getCache("userInfoExt", 2).isSetSecurityPass;
        if (
          approveType == 0 ||
          approveType == -1 ||
          approveType == -2 ||
          approveType == -3
        ) {
          this.openDom.text = 0;
          this.openDom.status = true;
          this.openDom.type = 2;
        } else {
          if (isSetSecurityPass == 0) {
            this.openDom.text = 1;
            this.openDom.status = true;
            this.openDom.type = 2;
          } else {
            this.showKeyboard = true;
            this.openDom2.status = true;
          }
        }
      }else {
        this.__Href("/login");
      }
    },
    nextFocus(el, index) {
      console.log(el, index, this.inputList.length);
      var dom = this.$refs.borderInput,
        currInput = dom[index],
        nextInput = dom[index + 1],
        lastInput = dom[index - 1];
      /*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
      if (el.keyCode != 8) {
        if (
          this.inputList[index].val == "" ||
          this.inputList[index].val == " "
        ) {
          return false;
        } else {
          if (index < this.inputList.length - 1) {
            nextInput.focus();
          } else {
            currInput.blur();
          }
        }
      } else {
        if (index != 0) {
          lastInput.focus();
        }
      }
    },
    /*当键盘按下的时候清空原有的数*/
    changeValue(index) {
      this.inputList[index].val = "";
    },
    alertBack(t) {
      this.openDom.status = false;
      this.openDom.type = 1;
      if (t == 0) {
        // this.$router.push("/newusercenter");
        this.__Href("/newusercenter");
      } else {
        this.__Href("/ResetPass/tranPass2");
      }
    },

    // alertBack2(t) {
    //   if (
    //     this.inputList[0].val == "" ||
    //     this.inputList[0].val == " " ||
    //     this.inputList[1].val == "" ||
    //     this.inputList[1].val == " " ||
    //     this.inputList[2].val == "" ||
    //     this.inputList[2].val == " " ||
    //     this.inputList[3].val == "" ||
    //     this.inputList[3].val == " " ||
    //     this.inputList[4].val == "" ||
    //     this.inputList[4].val == " " ||
    //     this.inputList[5].val == "" ||
    //     this.inputList[5].val == " "
    //   )
    //     return this._msg("请输入安全密码");
    //   var param = {
    //     token: this.getToken(),
    //     payPass:
    //       this.inputList[0].val +
    //       this.inputList[1].val +
    //       this.inputList[2].val +
    //       this.inputList[3].val +
    //       this.inputList[4].val +
    //       this.inputList[5].val
    //   };
    //   this.__initAction("Member-checkPayPass", param, (res, s) => {
    //     if (s == 1) {
    //       this.openDom2.status = false;
    //       this.loginPass = "";
    //       this.__Href("/SalarySheet");
    //     } else {
    //       this._msg(res.info);
    //     }
    //   });
    // },

    close2() {
      this.showKeyboard = false;
      this.openDom2.status = false;
      this.sum = [];
    },

    changeNum(e) {
      // 限制长度
      if (this.loginPass1.length > 1) {
        this.loginPass1 = this.loginPass1.slice(0, 1);
      }
      if (this.loginPass2.length > 1) {
        this.loginPass2 = this.loginPass2.slice(0, 1);
      }
      if (this.loginPass3.length > 1) {
        this.loginPass3 = this.loginPass3.slice(0, 1);
      }
      if (this.loginPass4.length > 1) {
        this.loginPass4 = this.loginPass4.slice(0, 1);
      }
      if (this.loginPass5.length > 1) {
        this.loginPass5 = this.loginPass5.slice(0, 1);
      }
      if (this.loginPass6.length > 1) {
        this.loginPass6 = this.loginPass6.slice(0, 1);
      }
    }
  }
};
</script>
<style lang="scss">
.tosat_list {
  position: relative;
}
.this_close {
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  font-size: 30px !important;
  position: absolute;
  right: 0;
  top: 0;
}
.back_pwd_lists {
  list-style: none;
  li {
    input {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      padding: 0;
      font-size: 0.9rem;
      color: #000;
      outline-style: none;
      line-height: 50px;
      margin-bottom: 0;
      text-align: center;
    }
  }
}
.inputGroup {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 45%;
}
.inputGroup-input {
  width: 85%;
  margin-top: 10px;
  box-sizing: border-box;
}
.phone-lobles {
  font-size: 0.95rem;
  text-align: center;
}
.login_phone {
  width: 100%;
  height: 35px;
  position: relative;
  overflow: hidden;
  border: none;
  border-bottom: 1px solid #c9c9c9;
}
.btn-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.pop-wrap {
  width: 100%;
  height: 167;
}
.pop-ups-box {
  padding: 0 15px;
  .tosat_list {
    width: 95% !important;
    height: 300px;
    .inputGroup-input {
      width: 100%;
      .login_phone {
        width: 100%;
        height: 100px;
        border: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .input-item {
          display: inline-block;
          input {
            width: 38px;
            height: 38px;
            border: 1px solid #c2ccd0;
            line-height: 15px;
          }
        }
      }
    }
  }
  .tosat_list {
    width: 95% !important;
  }
}

.key-container {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 200;
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
.input-box .close {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: fixed;
  bottom: 500px;
  left: 25px;
  z-index: 5000;
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
.input-box .input-wrap li {
  width: 45px;
  height: 45px;
  border: 1px solid #666;
  font-size: 18px;
  line-height: 45px;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 5px;
}
.input-box .input-wrap li input {
  width: 43px;
  height: 43px;
  line-height: 43px;
  text-align: center;
  border: none;
}
.keyboard {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 250px;
  width: 100%;
  background-color: #fff;
}
.keyboard .title {
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
