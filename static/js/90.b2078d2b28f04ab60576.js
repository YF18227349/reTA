webpackJsonp([90],{l8dP:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){return{header_title:"新闻详情",pageData:{title:null,createTime:null,content:null}}},mounted:function(){this.selfMainLoadOpend(),this.$store.commit("setHeaderStyle",{txt:this.header_title,type:1})},created:function(){this.init()},methods:{init:function(){var t=this;this.getArtInfo(),this.__Sleep(function(e){t.selfMainLoadClosed()},1e3)},getArtInfo:function(){var t=this,e={token:this.getToken(),id:this.getParams().id};this.__initAction("Index-getListNoticeShow",e,function(e,i){1==i&&(console.log(e),t.pageData.title=e.data.title,t.pageData.createTime=e.data.createTime,t.pageData.content=e.data.notice)})}}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"info"},[i("div",{staticClass:"info-t"},[i("h3",[t._v(t._s(t.pageData.title))]),t._v(" "),i("p",[t._v(t._s(t.pageData.createTime))])]),t._v(" "),i("div",{staticClass:"info-main"},[i("p",{domProps:{innerHTML:t._s(t.pageData.content)}})])])},staticRenderFns:[]};var s=i("VU/8")(n,a,!1,function(t){i("zPiw")},null,null);e.default=s.exports},zPiw:function(t,e){}});