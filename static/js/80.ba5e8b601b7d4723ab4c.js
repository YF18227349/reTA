webpackJsonp([80],{"0A8c":function(t,e){},"95gZ":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("//Fk"),n=s.n(i),a={data:function(){return{smsCode:"",code:[],pageInfo:{tel:null,strType:null,title:"",device:"",type:""},openDom:{status:!0},time:59,timer:null,isDis:!0,isShowMin:!0,inputNum:"",hideinputNum:"",model:{input:""},sum:new Array(4)}},created:function(){var t=this;this.getPageData().then(function(){return new n.a(function(e,s){t.$store.commit("setHeaderStyle",{txt:t.pageInfo.title,type:1}),e()})}).then(function(){return t.sendTelCode()}).then(function(){t.countdown()})},mounted:function(){this.deBug()},methods:{_handleKeyPress:function(t){var e=t.target.dataset.num;if(-1==e)return!1;switch(String(e)){case"D":this._handleDeleteKey();break;case"S":this._handleConfirmKey();break;default:this._handleNumberKey(e)}},_handleDeleteKey:function(){var t=this.code;if(!t.length)return!1;this.code=t.substring(0,t.length-1)},_handleNumberKey:function(t){this.code.length<4?(this.code+=t,console.log(this.code)):console.log("超出限制")},_handleConfirmKey:function(){var t=this;console.log("提交");var e=this.pageInfo.strType,s=this.pageInfo.type;console.log(e,s);var i=this.code;if(console.log("提交的验证码为:",i),!i||4!=i.length)return this._msg("请输入正确验证码！");var n={telPhone:this.pageInfo.tel,code:i,type:"public"};this.__initAction("Tools-testTelCode",n,function(e,s){if(1==s){if("1000000000"==e.code){var i={tel:t.getQuery().tel,type:t.pageInfo.type},n="/safeResetPass/"+t.pageInfo.title;t.$router.push({path:n,query:i})}}else t._msg(e.info)})},getPageData:function(){var t=this;return new n.a(function(e,s){t.pageInfo.tel=t.getQuery().tel,t.pageInfo.strType=t.getParams().str,t.pageInfo.device="手机",t.pageInfo.title=t.getParams().str,t.pageInfo.type=t.getQuery().type,console.log(t.pageInfo.type),e()})},sendTelCode:function(){var t=this;return new n.a(function(e,s){var i=t,n={telPhone:i.pageInfo.tel,type:"havelng",len:4};i.__initAction("Tools-setTelCode",n,function(t,s){1==s&&e()})})},countdown:function(){var t=this;this.timer=setInterval(function(){t.time--,t.isDis=!1,t.time,t.time,t.time<=0&&(t.time=59,t.isShowMin=!1,t.isDis=!0,clearInterval(t.timer))},1e3)},handleIsCode:function(){var t=this;this.isDis&&(this.isShowMin=!0,this.sendTelCode().then(function(){t.countdown()}))}},watch:{modelInput:function(){var t=this.modelInput;if(!(t.length>4)){var e=t.split("");this.code=e}}},computed:{selfLogo:function(){return this.getCache("APPLOGO",2).val},hiddenTel:function(){var t=this.pageInfo.tel;return(t=""+t).replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")},modelInput:function(){return this.model.input}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"vcode bg-white w-100"},[s("div",{staticClass:"logo-top"},[s("div",{staticClass:"img-box"},[s("img",{attrs:{src:t.selfLogo,alt:""}})]),t._v(" "),t.isShowMin?s("p",[t._v("\n      已发送4位验证码至您的"+t._s(t.pageInfo.device)+"\n      "),s("span",[t._v(t._s(t.hiddenTel))])]):t._e(),t._v(" "),t.isShowMin?t._e():s("p",{staticStyle:{opacity:"0"}},[t._v("(o_o)")])]),t._v(" "),s("div",{staticClass:"code"},[s("span",{staticClass:"inputStyle"},[t._v(t._s(t.code[0]))]),t._v(" "),s("span",{staticClass:"inputStyle"},[t._v(t._s(t.code[1]))]),t._v(" "),s("span",{staticClass:"inputStyle"},[t._v(t._s(t.code[2]))]),t._v(" "),s("span",{staticClass:"inputStyle"},[t._v(t._s(t.code[3]))])]),t._v(" "),s("div",{staticClass:"haveCode",on:{click:t.handleIsCode}},[s("span",{directives:[{name:"show",rawName:"v-show",value:t.isShowMin,expression:"isShowMin"}]},[t._v("00:"+t._s(t.time)+"后")]),t._v(" "),s("span",{staticClass:"anginHaveCode"},[t._v(t._s(t.isShowMin?"重新":"点击")+"获取")])]),t._v(" "),s("div",{staticClass:"key-container"},[s("div",{staticClass:"keyboard",on:{click:function(e){return e.stopPropagation(),t._handleKeyPress(e)}}},[s("div",{staticClass:"title"},[s("yd-icon",{staticClass:"verifycode",attrs:{name:"verifycode"}}),t._v("天安安全键盘\n      ")],1),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"key-row"},[e("div",{staticClass:"key-cell",attrs:{"data-num":"7"}},[this._v("7")]),this._v(" "),e("div",{staticClass:"key-cell",attrs:{"data-num":"8"}},[this._v("8")]),this._v(" "),e("div",{staticClass:"key-cell",attrs:{"data-num":"9"}},[this._v("9")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"key-row"},[e("div",{staticClass:"key-cell",attrs:{"data-num":"4"}},[this._v("4")]),this._v(" "),e("div",{staticClass:"key-cell",attrs:{"data-num":"5"}},[this._v("5")]),this._v(" "),e("div",{staticClass:"key-cell",attrs:{"data-num":"6"}},[this._v("6")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"key-row"},[e("div",{staticClass:"key-cell",attrs:{"data-num":"1"}},[this._v("1")]),this._v(" "),e("div",{staticClass:"key-cell",attrs:{"data-num":"2"}},[this._v("2")]),this._v(" "),e("div",{staticClass:"key-cell",attrs:{"data-num":"3"}},[this._v("3")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"key-row"},[e("div",{staticClass:"key-cell",attrs:{"data-num":"S"}},[this._v("确认")]),this._v(" "),e("div",{staticClass:"key-cell",attrs:{"data-num":"0"}},[this._v("0")]),this._v(" "),e("div",{staticClass:"key-cell",attrs:{"data-num":"D"}},[this._v("C")])])}]};var l=s("VU/8")(a,o,!1,function(t){s("0A8c")},"data-v-76ce2717",null);e.default=l.exports}});