webpackJsonp([80],{cJsm:function(t,s){},yOZE:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"insurance_payment w-100"},[a("header",{staticClass:"insurance_payment_header bg-blue w-100 fc-dark"},[a("a",{staticClass:"arrow-logo fc-white fw-5 iconfont icon-previewleft",attrs:{href:"javascript:history.go(-1)"}}),t._v(" "),a("span",{staticClass:"header_title fc-white"},[t._v(t._s(t.pageInfo.header_title))]),t._v(" "),a("a",{staticClass:"last",attrs:{href:"javascript:;"}})]),t._v(" "),a("div",{staticClass:"clear-fixed"}),t._v(" "),a("div",{staticClass:"insurance_payment_group w-100"},[t._m(0),t._v(" "),a("ul",{staticClass:"payment_list w-100 bg-white mt-5"},[a("li",{staticClass:"payment_title"},[t._v("选择支付方式")]),t._v(" "),t._l(t.pageInfo.paymentList,function(s,e){return a("li",{key:e,staticClass:"payment_type"},[a("a",{staticClass:"w-100",attrs:{href:"javascript:;"},on:{click:function(s){return s.preventDefault(),t.selectPay(e)}}},[a("yd-cell-item",[a("span",{staticClass:"payment_logo",attrs:{slot:"left"},slot:"left"},[a("img",{attrs:{src:s.logo,alt:""}})]),t._v(" "),a("span",{staticClass:"payment_txt fw-5 ml-3",attrs:{slot:"left"},slot:"left"},[t._v(t._s(s.title))]),t._v(" "),a("a",{staticClass:"payment_checkbox",class:s.code?"bg-green":"bg-white br-dark",attrs:{slot:"right",href:"javascript:;"},slot:"right"},[a("span",{staticClass:"iconfont icon-right8 fc-white"})])])],1)])})],2)]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"payment_info w-100 bg-white"},[s("p",{staticClass:"fw-5"},[this._v("需要支付金额(元)")]),this._v(" "),s("p",{staticClass:"payment_cost fc-dark fm-2 fw-5 mt-4"},[this._v("199.00")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("a",{staticClass:"submitBtn btn-c bg-blue",attrs:{href:"javascript:;"}},[s("span",{staticClass:"fc-white fw-5"},[this._v("立即支付")])])}]};var i=a("VU/8")({data:function(){return{pageInfo:{header_title:"支付方式",paymentList:[{title:"微信支付",logo:"http://static.sxtian.com/imgs/main/2icon-weixin@2x.png",code:!1},{title:"支付宝支付",logo:"http://static.sxtian.com/imgs/main/icon-zhifubao@2x.png",code:!1},{title:"支付宝支付",logo:"http://static.sxtian.com/imgs/main/icon-zhifubao@2x.png",code:!1},{title:"支付宝支付",logo:"http://static.sxtian.com/imgs/main/icon-zhifubao@2x.png",code:!1}]}}},methods:{selectPay:function(t){this.pageInfo.paymentList[t].code=!this.pageInfo.paymentList[t].code;for(var s=this.pageInfo.paymentList,a=0;a<s.length;a++)t!=a&&s[a].code&&(s[a].code=!1)}}},e,!1,function(t){a("cJsm")},null,null);s.default=i.exports}});