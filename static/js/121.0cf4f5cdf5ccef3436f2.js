webpackJsonp([121],{UqIN:function(e,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var t=a("mvHQ"),n=a.n(t),i={data:function(){return{pageInfo:{header_title:"重置密码"},pageLan:{},loginPass:"",regLoginPass:"",check_code:null}},watch:{loginPass:function(){"tranPass"==this.getQuery().type&&(this.loginPass=this.loginPass.replace(/\D/g,""))},regLoginPass:function(){"tranPass"==this.getQuery().type&&(this.regLoginPass=this.regLoginPass.replace(/\D/g,""))}},created:function(){var e=this;this.selfMainLoadOpend(),this.__Sleep(function(s){e.selfMainLoadClosed()}),this.getPageData()},mounted:function(){},destroyed:function(){this.delCache("getPassCheckCode")},methods:{getPageData:function(){var e,s,a=this.getParams().str,t=this.getQuery().type,n=this.getQuery().tel;switch(t){case"pass":e="password",s="密码";break;case"tranPass":e="password",s="安全密码";break;case"tranPass2":e="password",s="6位数字安全密码";break;case"phone":e="number",s="手机号";break;case"email":e="email",s="邮箱"}var i={title:a,type:t,tel:n,inputType:e,inputTitle:s};this.pageLan=i,this.$store.commit("setHeaderStyle",{txt:this.pageLan.title,type:1})},regPassHandle:function(){var e=this.loginPass,s=this.regLoginPass;return e.trim()==s.trim()||(this._msg("两次密码输入不一致"),!1)},do_back:function(){if(this.regPassHandle()){var e=this.getQuery().type,s=this.getQuery().tel,a=this.getToken(),t=this.loginPass,n=s;switch(e){case"pass":var i="Member-upppass",o={token:a,pass:t,loginName:n};break;case"tranPass":case"tranPass2":i="Member-upppaypass",o={token:a,pass:t,loginName:n};break;case"phone":i="Member-upploguser",o={token:a,phone:s}}var r=this;r.__initAction(i,o,function(s,a){if(1==a){var t;switch(e){case"tranPass":t="修改";break;case"tranPass2":t="设置"}r._msg(""+t+s.info),r.funs(),r.$router.go(-3)}})}},changeNum:function(e){"tranPass"!=this.getQuery().type&&"tranPass2"!=this.getQuery().type||(1==e?this.loginPass.length>6&&(this.loginPass=this.loginPass.slice(0,6)):this.regLoginPass.length>6&&(this.regLoginPass=this.regLoginPass.slice(0,6)))},funs:function(){var e=this,s={token:this.getToken(),uid:this.getUserInfo().uid};this.__initAction("Member-getUserCache",s,function(s,a){if(1==a){var t=s.data;e.setCache("userInfoExt",n()(t))}})}},computed:{logo:function(){return this.getCache("APPLOGO",2).val}}},o={render:function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"back_pwd bg-white w-100"},[a("div",{staticClass:"top-box"},[a("img",{attrs:{src:e.logo,alt:""}})]),e._v(" "),a("div",{staticClass:"back_pwd_group bg-white w-100"},[a("ul",{staticClass:"back_pwd_list w-85 inputGroup"},[a("li",{staticClass:"inputGroup-input"},[a("h3",{staticClass:"phone-loble"},[e._v("新"+e._s(e.pageLan.inputTitle))]),e._v(" "),a("div",{staticClass:"login_phone"},["checkbox"===e.pageLan.inputType?a("input",{directives:[{name:"model",rawName:"v-model",value:e.loginPass,expression:"loginPass"}],attrs:{placeholder:"请输入新"+e.pageLan.inputTitle,type:"checkbox"},domProps:{checked:Array.isArray(e.loginPass)?e._i(e.loginPass,null)>-1:e.loginPass},on:{input:function(s){return e.changeNum(1)},change:function(s){var a=e.loginPass,t=s.target,n=!!t.checked;if(Array.isArray(a)){var i=e._i(a,null);t.checked?i<0&&(e.loginPass=a.concat([null])):i>-1&&(e.loginPass=a.slice(0,i).concat(a.slice(i+1)))}else e.loginPass=n}}}):"radio"===e.pageLan.inputType?a("input",{directives:[{name:"model",rawName:"v-model",value:e.loginPass,expression:"loginPass"}],attrs:{placeholder:"请输入新"+e.pageLan.inputTitle,type:"radio"},domProps:{checked:e._q(e.loginPass,null)},on:{input:function(s){return e.changeNum(1)},change:function(s){e.loginPass=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.loginPass,expression:"loginPass"}],attrs:{placeholder:"请输入新"+e.pageLan.inputTitle,type:e.pageLan.inputType},domProps:{value:e.loginPass},on:{input:[function(s){s.target.composing||(e.loginPass=s.target.value)},function(s){return e.changeNum(1)}]}})])]),e._v(" "),a("li",{staticClass:"inputGroup-input"},[a("h3",{staticClass:"phone-loble"},[e._v("确认"+e._s(e.pageLan.inputTitle))]),e._v(" "),a("div",{staticClass:"login_phone"},["checkbox"===e.pageLan.inputType?a("input",{directives:[{name:"model",rawName:"v-model",value:e.regLoginPass,expression:"regLoginPass"}],attrs:{placeholder:"请再次确认"+e.pageLan.inputTitle,type:"checkbox"},domProps:{checked:Array.isArray(e.regLoginPass)?e._i(e.regLoginPass,null)>-1:e.regLoginPass},on:{blur:e.regPassHandle,input:function(s){return e.changeNum(2)},change:function(s){var a=e.regLoginPass,t=s.target,n=!!t.checked;if(Array.isArray(a)){var i=e._i(a,null);t.checked?i<0&&(e.regLoginPass=a.concat([null])):i>-1&&(e.regLoginPass=a.slice(0,i).concat(a.slice(i+1)))}else e.regLoginPass=n}}}):"radio"===e.pageLan.inputType?a("input",{directives:[{name:"model",rawName:"v-model",value:e.regLoginPass,expression:"regLoginPass"}],attrs:{placeholder:"请再次确认"+e.pageLan.inputTitle,type:"radio"},domProps:{checked:e._q(e.regLoginPass,null)},on:{blur:e.regPassHandle,input:function(s){return e.changeNum(2)},change:function(s){e.regLoginPass=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.regLoginPass,expression:"regLoginPass"}],attrs:{placeholder:"请再次确认"+e.pageLan.inputTitle,type:e.pageLan.inputType},domProps:{value:e.regLoginPass},on:{blur:e.regPassHandle,input:[function(s){s.target.composing||(e.regLoginPass=s.target.value)},function(s){return e.changeNum(2)}]}})])])])]),e._v(" "),a("div",{staticClass:"btn-box"},[a("a",{staticClass:"back_pwd_btn bg-blue",attrs:{href:"javascript:;"},on:{click:function(s){return e.do_back()}}},[a("span",{staticClass:"fc-white fw-6 fm-1"},[e._v("修改")])])])])},staticRenderFns:[]};var r=a("VU/8")(i,o,!1,function(e){a("dPzw")},null,null);s.default=r.exports},dPzw:function(e,s){}});