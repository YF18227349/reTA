webpackJsonp([110],{biZm:function(t,e){},kZxY:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={data:function(){return{header_title:"法律援助",title:"",userTel:null,userName:"",sketch:"",openDom:{status:!1,type:1}}},created:function(){this.selfMainLoadOpend(),this.$store.commit("setHeaderStyle",{txt:this.header_title,type:1}),this.init()},methods:{init:function(){var t=this;this.deBug()&&(this.title=null,this.userTel=null,this.userName=null,this.sketch=null),this.__Sleep(function(e){t.selfMainLoadClosed()})},do_submit:function(){var t=this,e=this.getToken(),s=this.title,a=this.userName,i=this.userTel,l=this.sketch;if(s)if(a){var n=this.Global.reg_phone;if(i)if(this.checkPhone(i,n)){var o={token:e,title:s,sketch:l,userName:a,userTel:i};this.__initAction("Law-addLaw",o,function(e,s){1==s?(t.openDom.status=!0,t.openDom.type=2):t._msg(e.info)})}else this._msg("联系电话输入有误");else this._msg("请输入联系电话")}else this._msg("请输入姓名");else this._msg("标题不能为空")},alertBack:function(t){window.history.go(-1)}}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"legal_aid w-100"},[s("div",{staticClass:"legal_aid_group w-100"},[s("ul",{staticClass:"legal_aid_list w-100"},[s("li",[s("a",{staticClass:"line_input_item",attrs:{href:"javascript:;"}},[s("span",{staticClass:"f-left fs-3 fw-6 fc-dark"},[t._v("标题")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"line_input fs-3 fw-5 fc-dark",attrs:{type:"text",placeholder:"请输入标题"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})])]),t._v(" "),s("li",[s("a",{staticClass:"line_input_item",attrs:{href:"javascript:;"}},[s("span",{staticClass:"f-left fs-3 fw-6 fc-dark"},[t._v("姓名")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],staticClass:"line_input fs-3 fw-5 fc-dark",attrs:{type:"text",placeholder:"请输入姓名"},domProps:{value:t.userName},on:{input:function(e){e.target.composing||(t.userName=e.target.value)}}})])]),t._v(" "),s("li",[s("a",{staticClass:"line_input_item",attrs:{href:"javascript:;"}},[s("span",{staticClass:"f-left fs-3 fw-6 fc-dark"},[t._v("电话")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.userTel,expression:"userTel"}],staticClass:"line_input fs-3 fw-5 fc-dark",attrs:{type:"tel",maxlength:"11",placeholder:"请输入电话"},domProps:{value:t.userTel},on:{input:function(e){e.target.composing||(t.userTel=e.target.value)}}})])]),t._v(" "),s("li",{staticClass:"sketch_item"},[s("p",{staticClass:"fc-dark fs-3 fw-6"},[t._v("兼职简述")]),t._v(" "),s("yd-textarea",{staticClass:"fs-3 fw-6 fc-dark",attrs:{placeholder:"请输入兼职简述",maxlength:"300"},model:{value:t.sketch,callback:function(e){t.sketch=e},expression:"sketch"}})],1)])]),t._v(" "),s("p",{staticClass:"fs-3 fw-6 fc-gray p-5"},[t._v("注：提交后请保持电话畅通，24小时内会有工作人员联系您。")]),t._v(" "),s("a",{staticClass:"submitBtn btn-c bg-blue",attrs:{href:"javascript:;"},on:{click:function(e){return t.do_submit()}}},[s("span",{staticClass:"fc-white fw-6 fm-2"},[t._v("确认提交")])]),t._v(" "),t.openDom.status?s("div",{staticClass:"submit_toast_group"},[s("div",{staticClass:"tosat_list bg-white"},[s("span",{staticClass:"tosat_logo iconfont fc-white fw-6",class:t.openDom.status?"icon-duihao4 bg-blue":"bg-red con-chahao1"}),t._v(" "),s("span",{staticClass:"toast_text fc-dark fm-2"},[t._v(t._s(t.openDom.text?t.openDom.text:"提交成功"))]),t._v(" "),s("button",{staticClass:"toast_btn fc-white bg-red fm-1 fw-6",on:{click:function(e){return t.alertBack(t.openDom.type)}}},[t._v("返回")])])]):t._e()])},staticRenderFns:[]};var l=s("VU/8")(a,i,!1,function(t){s("biZm")},null,null);e.default=l.exports}});