<template>
  <div class="back_pwd bg-white w-100">
    <div class="findpwd">
      <h1>{{pageLan.title}}</h1>
    </div>
    <div class="login-phone">
      <h3>{{tit}}</h3>
      <div class="input-phone-box">
        <input v-model="model.input" disabled placeholder="请输入手机号码/邮箱账号" />
      </div>
    </div>
    <div class="email-pwd">
      <!-- isPageCode = !isPageCode -->
      <!-- <a href="javascript:;" @click="replaceWay">{{pageInfos.pwd}}</a> -->
    </div>
    <div>
      <a href="javascript:;" class="login_btn bg-blue w-85" @click="doNext">
        <span class="fm-2 fc-white fw-6">下一步</span>
        <span class="fm-3 fc-white fw-6 iconfont icon-jurassic_next"></span>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageLan: {
        // headerTile: "重置密码",
        // title: "修改密码",
        // inputType: "手机号"
      },
      tit:"手机号",
      model: {
        input: ""
      }
    };
  },
  // destroyed() {
  //   this.delCache("getPassCheckCode");
  // },
  mounted() {},

  created() {
    this.getPageData().then(() => {
      this.$store.commit("setHeaderStyle", {
        txt: this.pageLan.headerTile,
        type: 1
      });
    });
    console.log(this.model.input);
    let us = this.getCache("user_info",2).telPhone;
		var reP = this.Global.reg_phone;
		var reE = this.Global.reg_Email;
		if(reE.test(us)){
			this.tit = "邮箱";
		}else if(reP.test(us)){
			this.tit = "手机号";
		}
  },

  methods: {
    getPageData() {
      return new Promise((resolve, reject) => {
        var type = this.getParams().type;
        switch (type) {
          case "pass": //密码
            this.pageLan.headerTile = "重置密码";
            this.pageLan.title = "修改密码";
            break;
          case "setPass": //邮箱首次注册设置密码
            this.pageLan.headerTile = "设置密码";
            this.pageLan.title = "设置密码";
            break;  
          case "tranPass": //安全密码
            this.pageLan.headerTile = "更改安全密码";
            this.pageLan.title = "更改安全密码";
            break;
          case "phone": //手机号
            this.pageLan.headerTile = "更换账号";
            this.pageLan.title = "修改账号";
            break;
          case "email": //邮箱
            this.pageLan.headerTile = "重置邮箱";
            this.pageLan.title = "修改邮箱";
            break;
          case "tranPass2": // 从服务下的工资条过来，首次设置
            this.pageLan.headerTile = "设置安全密码";
            this.pageLan.title = "设置安全密码";
            break;
        }
        var tel = this.getUserInfo().telPhone;
        this.model.input = tel;
        resolve();
      });
    },

    doNext() {
      var val = this.inputVal;
      var type = this.getParams().type;
      var regP = /^1[3456789]\d{9}$/;
      var regE = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
      if (!regP.test(val) && !regE.test(val)) return this._msg("账号格式不正确");
      var obj = {};
      obj.type = type;
      obj.tel = this.model.input;
      var path = `/safeVcode/${this.pageLan.headerTile}`;
      this.$router.push({
        path: path,
        query: obj
      });
    },

    replaceWay() {
      this.isPageCode = !this.isPageCode;
      this.model.input = "";
    }
  },

  computed: {
    inputVal() {
      return this.model.input;
    }
  }
};
</script>
<style lang="scss" scoped>
.back_pwd {
  background: #fff;
  width: 100vw;
  height: calc(100% - 2.8rem);
  box-sizing: border-box;
  overflow: hidden;
  .findpwd {
    padding: 25px;
    h1 {
      font-size: 2rem;
    }
  }
  .login-phone {
    padding: 0 25px;
    margin-top: 50px;
    h3 {
      font-size: 0.9rem;
    }
    .input-phone-box {
      margin-top: 20px;
      height: 30px;
      position: relative;
      border-bottom: 1px solid #c9c9c9;
      font-size: 0.9rem;
      color: #666;
    }
    input {
      border: none;
      outline: none;
      width: 100%;
      font-size: 0.9rem;
      color: #000;
      outline-style: none;
      line-height: 25px;
      margin-bottom: 0;
      opacity:1;
    }
  }
  .email-pwd {
    margin-top: 25px;
    padding: 0 25px;
    a {
      font-size: 0.8rem;
      color: #3d7efe;
    }
  }
  .login_btn {
    margin: 0 auto;
    margin-top: 50px;
    height: 44px;
    padding: 0 30px;
    text-decoration: none;
    display: flex;
    box-pack: center;
    justify-content: space-between;
    box-align: center;
    align-items: center;
    border-radius: 50px;
    background: #3d7efe;
    box-shadow: 5px 4px 6px #79a8d3;
    span:first-child {
      margin: 0 auto;
    }
    .fm-2 {
      font-size: 1.1rem;
    }
    .fm-3 {
      font-size: 1.5rem;
    }
  }
}
</style>
