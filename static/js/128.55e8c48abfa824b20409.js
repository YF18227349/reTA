webpackJsonp([128],{JBah:function(t,e){},gHNF:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("mvHQ"),i=a.n(s),l={data:function(){return{pageInfo:{header_title:"添加劳务者信息"},name:"",nameShow:!1,telNum:null,telNumShow:!1,code_id:null,codeIdShow:!1}},created:function(){this.selfMainLoadOpend(),this.$dialog.loading.close(),this.$store.commit("setHeaderStyle",{txt:this.pageInfo.header_title,type:0}),this.init()},methods:{init:function(){var t=this;this.deBug()&&(this.name="",this.telNum="",this.code_id="");var e=this.getCache("laborsinfo",2);e&&(this.name=e.labourName,this.telNum=e.labourTel,this.code_id=e.labourIdNumber),this.__Sleep(function(e){t.selfMainLoadClosed()},1e3)},save_info:function(){var t=this,e=this.name,a=this.telNum,s=this.code_id,l=this.Global.reg_phone,o=this.Global.reg_ID;if(e)if(this.checkPhone(a,l))if(this.checkID(s,o)){var n={labourAll:!0,labourName:e,labourTel:a,labourIdNumber:s};this.$dialog.loading.open("正在保存请稍后..."),this.setCache("laborsinfo",i()(n)),this.__Sleep(function(e){t.$dialog.loading.close(),t._msg("保存成功",1e3,"success"),window.history.go(-1)},1e3)}else this.$dialog.toast({mes:"身份证号填写有误",timeout:1e3});else this.$dialog.toast({mes:"手机号填写有误",timeout:1e3});else this.$dialog.toast({mes:"姓名不能为空",timeout:1e3})}},watch:{name:function(){this.name?this.nameShow=!0:this.nameShow=!1},code_id:function(){this.code_id?this.codeIdShow=!0:this.codeIdShow=!1},telNum:function(){this.telNum?this.telNumShow=!0:this.telNumShow=!1}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"add_labors_info w-100"},[a("div",{staticClass:"add_labors_info_group w-100"},[a("ul",{staticClass:"add_labors_list w-100"},[a("li",{staticClass:"p-r"},[a("a",{staticClass:"input_cell_item",attrs:{href:"javascript:;"}},[a("span",{staticClass:"item_title fs-3 fc-dark fw-6"},[t._v("姓名")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"item_input fw-6 fs-3",attrs:{type:"text",placeholder:"必填"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})]),t._v(" "),a("a",{staticClass:"clearBtn p-a",class:t.nameShow?"bg-lightdark":"bg-white",attrs:{href:"javascript:;"},on:{click:function(e){t.name=""}}},[a("span",{staticClass:"fw-7 fc-white iconfont icon-error"})])]),t._v(" "),a("li",{staticClass:"p-r"},[a("a",{staticClass:"input_cell_item",attrs:{href:"javascript:;"}},[a("span",{staticClass:"item_title fc-dark fw-6"},[t._v("电话")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.telNum,expression:"telNum"}],staticClass:"item_input fw-5 fs-3",attrs:{type:"tel",placeholder:"必填",maxlength:"11"},domProps:{value:t.telNum},on:{input:function(e){e.target.composing||(t.telNum=e.target.value)}}})]),t._v(" "),a("a",{staticClass:"clearBtn p-a",class:t.telNumShow?"bg-lightdark":"bg-white",attrs:{href:"javascript:;"},on:{click:function(e){t.telNum=""}}},[a("span",{staticClass:"fw-7 fc-white iconfont icon-error"})])]),t._v(" "),a("li",{staticClass:"p-r"},[a("a",{staticClass:"input_cell_item",attrs:{href:"javascript:;"}},[a("span",{staticClass:"item_title fs-3 fc-dark fw-6"},[t._v("身份证号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.code_id,expression:"code_id"}],staticClass:"item_input fw-5 fs-3",attrs:{type:"number",placeholder:"必填"},domProps:{value:t.code_id},on:{input:function(e){e.target.composing||(t.code_id=e.target.value)}}})]),t._v(" "),a("a",{staticClass:"clearBtn p-a",class:t.codeIdShow?"bg-lightdark":"bg-white",attrs:{href:"javascript:;"},on:{click:function(e){t.code_id=""}}},[a("span",{staticClass:"fw-6 fc-white iconfont icon-error"})])])]),t._v(" "),t._m(0)]),t._v(" "),a("a",{staticClass:"addLaborsBtn btn-c bg-blue mt-2",attrs:{href:"javascript:;"},on:{click:function(e){return t.save_info()}}},[a("span",{staticClass:"fc-white fw-5 fm-1"},[t._v("确认保存")])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"p-4"},[e("span",{staticClass:"fc-gray fs-3 fw-5"},[this._v("注：请填写完整信息，我们不会把您的信息用作其他用途。")])])}]};var n=a("VU/8")(l,o,!1,function(t){a("JBah")},null,null);e.default=n.exports}});