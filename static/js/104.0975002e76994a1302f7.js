webpackJsonp([104],{"4UzI":function(t,e){},"67F3":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=o("mvHQ"),s=o.n(i),n=o("BO1k"),a=o.n(n),c={data:function(){return{userInfo:{uPhone:"",uPwd:""},appLogoSrc:"",isShow:!1,isReLaod:1,checkboxs:!0,docmHeight:0,showHeight:0,hidshow:!0,isResize:!1}},mounted:function(){var t=this;this.deBug(),this.reIndex(),window.onresize=function(){return t.isResize||(t.docmHeight=document.documentElement.clientHeight,t.isResize=!0),void(t.showHeight=document.body.clientHeight)}},created:function(){this.selfMainLoadOpend(),this.getConfigApp(),this.setCache("footTabbarChange",0)},methods:{reIndex:function(){var t=this.getCache("footTabbarChange",2);t&&4==t&&window.location.reload(!0)},getConfigApp:function(){var t=this,e=this;this.__initAction("Tools-getConfigApp",{},function(o,i){if(1==i){var n=o.data,c=!0,l=!1,r=void 0;try{for(var u,h=a()(n.defBase);!(c=(u=h.next()).done);c=!0){var d=u.value;t.setCache(d.title,s()(d))}}catch(t){l=!0,r=t}finally{try{!c&&h.return&&h.return()}finally{if(l)throw r}}var g=t.getCache("APPLOGO",2);e.appLogoSrc=g.val,e.isShow=!0}}),this.__Sleep(function(e){t.selfMainLoadClosed()},1e3)},do_login:function(){var t=this,e=this.Global.reg_phone,o=this.userInfo.uPwd,i=this.userInfo.uPhone,n=this.checkboxs;if(this.checkPhone(i,e)&&this.checkPwd(o)&&this.checkCheckbox(n)){this.$dialog.loading.open("正在登录请稍后...");var a={loginName:i,loginPass:o};this.__initAction("Member-login",a,function(e,o){if(1==o){t.$dialog.loading.close();var n={token:e.data.token,uid:e.data.uid,rid:e.data.rid,telPhone:i,location:t.Global.config.location};t.Global.config.uid=n.uid,t.Global.config.token=n.token,t.setCache("user_info",s()(n)),t.setCache("userInfoExt",s()(e.data)),t._msg(e.info),setTimeout(function(){t.__Sleep(function(e){t.__Href("/")})},500)}else t._msg(e.info)})}}},watch:{showHeight:function(){this.docmHeight>this.showHeight?this.hidshow=!1:this.hidshow=!0}}},l={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"loginPage w-100 bg-white"},[o("div",{staticClass:"jump-reg"},[o("router-link",{staticClass:"jump-reg-link bg-white fs-3 blue",attrs:{to:{path:"/regPhone/0",query:{mode:"app"}}}},[t._v("注册")])],1),t._v(" "),t.isShow?o("div",{staticClass:"loginLogoStyle w-100"},[o("div",{staticClass:"logo_circle"},[o("span",{staticClass:"fc-white"},[o("img",{staticClass:"w-100",attrs:{src:t.appLogoSrc,alt:""}})])])]):t._e(),t._v(" "),t.isShow?o("div",{staticClass:"inputGroup w-100"},[o("div",{staticClass:"inputGroup-input"},[o("h3",{staticClass:"phone-loble"},[t._v("账号")]),t._v(" "),o("div",{staticClass:"login_phone"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.userInfo.uPhone,expression:"userInfo.uPhone"}],attrs:{maxlength:"11",type:"tel",placeholder:"请输入注册手机号"},domProps:{value:t.userInfo.uPhone},on:{input:function(e){e.target.composing||t.$set(t.userInfo,"uPhone",e.target.value)}}})])]),t._v(" "),o("div",{staticClass:"inputGroup-input"},[o("h3",{staticClass:"phone-loble"},[t._v("密码")]),t._v(" "),o("div",{staticClass:"login_pwd"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.userInfo.uPwd,expression:"userInfo.uPwd"}],attrs:{maxlength:"20",type:"password",placeholder:"请输入登录密码"},domProps:{value:t.userInfo.uPwd},on:{input:function(e){e.target.composing||t.$set(t.userInfo,"uPwd",e.target.value)}}})])]),t._v(" "),o("div",{staticClass:"bottom_word"},[o("yd-checkbox",{staticClass:"checkboxs",attrs:{color:"#64b2f0"},model:{value:t.checkboxs,callback:function(e){t.checkboxs=e},expression:"checkboxs"}}),t._v(" "),o("span",[t._v("登录表示接受")]),t._v(" "),o("router-link",{staticStyle:{color:"#64B2F0"},attrs:{to:"/readingguide/2"}},[t._v("《用户协议》")]),t._v(" "),o("span",[t._v("和")]),t._v(" "),o("router-link",{staticStyle:{color:"#64B2F0"},attrs:{to:"/readingguide/11"}},[t._v("《隐私政策》")])],1),t._v(" "),o("a",{staticClass:"login_btn bg-blue w-85",attrs:{href:"javascript:;"},on:{click:function(e){return t.do_login()}}},[o("span",{staticClass:"fm-2 fc-white fw-6"},[t._v("登 录")])]),t._v(" "),o("p",{staticClass:"mt-4"},[o("router-link",{staticClass:"bg-white fs-3 blue",attrs:{to:"/phoneLogin"}},[t._v("手机验证码登录")]),t._v(" "),o("router-link",{staticClass:"bg-white fs-3 blue",attrs:{to:"/back_password"}},[t._v("忘记密码?")])],1)]):t._e()])},staticRenderFns:[]};var r=o("VU/8")(c,l,!1,function(t){o("4UzI")},null,null);e.default=r.exports}});