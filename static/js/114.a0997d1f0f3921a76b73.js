webpackJsonp([114],{HCn2:function(t,s){},jycL:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"robConfirm"},[i("ul",{staticClass:"items"},[i("li",{staticClass:"item1"},[i("span",[t._v(t._s(t.confirmInfo.title))])]),t._v(" "),i("li",{staticClass:"item2"},[i("span",{staticClass:"info_text"},[i("span",[t._v(t._s(t.confirmInfo.name))]),t._v(" "),i("img",{attrs:{src:t.confirmInfo.logo,alt:""}})]),t._v(" "),i("span",{staticClass:"info_price"},[i("span",{staticClass:"fc-red"},[t._v("¥"+t._s(t.confirmInfo.price))]),t._v(" "),i("span",{staticClass:"fc-red"},[t._v("/天")])])]),t._v(" "),i("li",{staticClass:"item3"},[i("span",{staticClass:"info_detail"},[t._v(t._s(t.confirmInfo.detail))])]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),i("li",{staticClass:"item6"},[i("router-link",{attrs:{to:"/payment/"+t.sid+"/0"}},[t._v("平台支付")]),t._v(" "),i("a",{attrs:{href:"javascript:;"}},[t._v("线下支付")]),t._v(" "),i("router-link",{attrs:{to:"/payment/"+t.sid+"/1"}},[t._v("履约保证金")])],1),t._v(" "),t._m(2)])])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"item4"},[s("a",{attrs:{href:"javascript:;"}},[this._v("立即抢单")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"item5"},[s("a",{attrs:{href:"javascript:;"}},[this._v("同意抢单")]),this._v(" "),s("a",{attrs:{href:"javascript:;"}},[this._v("拒绝抢单")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"item7"},[s("span",{staticClass:"fc-red"},[this._v("注:邀约后可自行协商平台支付,线下支付和是否需要履约保证金")])])}]};var e=i("VU/8")({data:function(){return{sid:null,pay_code:null,confirmInfo:{title:"办公设备维修",name:"李师傅专业维修",logo:"http://static.sxtian.com/imgs/main/mark_card_1.png",price:"50",type:0,detail:"负责批改教育机构假期学生考试作业以及教材资,工作内容,评阅小学1-6年级数学语文..."}}},created:function(){this.get_sid()},methods:{get_sid:function(){this.sid=this.getParams().sid}}},a,!1,function(t){i("HCn2")},null,null);s.default=e.exports}});