webpackJsonp([99],{"1OF/":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={data:function(){return{header_title:"劳务合作",title:"",radio_code:"1",ukTel:null,ukAddress:null,ukName:null,ukNode:null,openDom:{status:!1,type:1}}},created:function(){this.$store.commit("setHeaderStyle",{txt:this.header_title,type:1}),this.init()},methods:{init:function(){this.deBug()&&(this.radio_code=1,this.title=null,this.ukTel=null,this.ukAddress=null,this.ukName=null,this.ukNode=null)},do_submit:function(){var t=this,e=this.getToken(),s=this.title,l=this.radio_code,a=this.ukNode,i=this.ukName,o=this.ukTel,r=this.ukAddress;if(s)if(l)if(i)if(r){var n=this.Global.reg_phone;if(this.checkPhone(o,n))if(a){var u={token:e,title:s,type:l,ukNode:a,ukName:i,ukTel:o,ukAddress:r};this.__initAction("Labor-addLabor",u,function(e,s){1==s?(t.openDom.status=!0,t.openDom.type=2):t._msg(e.info)})}else this._msg("兼职简述不能为空");else this._msg("联系电话输入有误")}else this._msg("请输入公司地址");else this._msg("请输入公司名称");else this._msg("请选择劳务类型");else this._msg("标题不能为空")},alertBack:function(t){window.history.go(-1)}}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"labour_services w-100"},[s("div",{staticClass:"labour_services_group w-100"},[s("ul",{staticClass:"labour_services_list w-100"},[s("li",[s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"},[t._v("标       题")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{slot:"right",type:"text",placeholder:"请输入标题"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}},slot:"right"})])],1),t._v(" "),s("li",[s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"},[t._v("类型选择")]),t._v(" "),s("span",{staticClass:"ml-4",attrs:{slot:"left"},slot:"left"},[s("yd-radio-group",{attrs:{size:"18",color:"#2f9bfe"},model:{value:t.radio_code,callback:function(e){t.radio_code=e},expression:"radio_code"}},[s("yd-radio",{attrs:{val:"1"}},[t._v("劳务派遣")]),t._v(" "),s("yd-radio",{attrs:{val:"2"}},[t._v("劳务外包")])],1)],1)])],1),t._v(" "),s("li",[s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"},[t._v("公司名称")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.ukName,expression:"ukName"}],attrs:{slot:"right",type:"text",placeholder:"请输入公司名称"},domProps:{value:t.ukName},on:{input:function(e){e.target.composing||(t.ukName=e.target.value)}},slot:"right"})])],1),t._v(" "),s("li",[s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"},[t._v("公司地址")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.ukAddress,expression:"ukAddress"}],attrs:{slot:"right",type:"text",placeholder:"请输入公司地址"},domProps:{value:t.ukAddress},on:{input:function(e){e.target.composing||(t.ukAddress=e.target.value)}},slot:"right"})])],1),t._v(" "),s("li",[s("yd-cell-item",[s("span",{attrs:{slot:"left"},slot:"left"},[t._v("联系电话")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.ukTel,expression:"ukTel"}],attrs:{slot:"right",type:"tel",maxlength:"11",placeholder:"请输入联系电话"},domProps:{value:t.ukTel},on:{input:function(e){e.target.composing||(t.ukTel=e.target.value)}},slot:"right"})])],1),t._v(" "),s("li",{staticClass:"item_detail"},[s("span",{staticClass:"mb-2"},[t._v("兼职简述")]),t._v(" "),s("yd-textarea",{staticClass:"fs-3 fc-dark",attrs:{placeholder:"请输入兼职内容（15-300字以内）",maxlength:"300"},model:{value:t.ukNode,callback:function(e){t.ukNode=e},expression:"ukNode"}})],1)]),t._v(" "),s("p",{staticClass:"fc-gray fw-6 fs-3 mt-3"},[t._v("*提交后请保持电话畅通，24小时内会有工作人员联系您")]),t._v(" "),s("a",{staticClass:"btn-c bg-blue",attrs:{href:"javascript:;"},on:{click:function(e){return e.preventDefault(),t.do_submit()}}},[s("span",{staticClass:"fc-white fm-2 fw-6"},[t._v("确认提交")])])]),t._v(" "),t.openDom.status?s("div",{staticClass:"submit_toast_group"},[s("div",{staticClass:"tosat_list bg-white"},[s("span",{staticClass:"tosat_logo iconfont fc-white fw-6",class:t.openDom.status?"icon-duihao4 bg-blue":"bg-red con-chahao1"}),t._v(" "),s("span",{staticClass:"toast_text fc-dark fm-2"},[t._v(t._s(t.openDom.text?t.openDom.text:"提交成功"))]),t._v(" "),s("button",{staticClass:"toast_btn fc-white bg-red fm-1 fw-6",on:{click:function(e){return t.alertBack(t.openDom.type)}}},[t._v("返回")])])]):t._e()])},staticRenderFns:[]};var i=s("VU/8")(l,a,!1,function(t){s("LGrv")},null,null);e.default=i.exports},LGrv:function(t,e){}});