webpackJsonp([104],{EMjI:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e={data:function(){return{play_height:"",play_show:!1,play_btn_show:!1,video_url:"",superFixedHeight:{height:!0}}},mounted:function(){var t=document.documentElement.clientHeight;this.play_height=t+"px"},created:function(){this.init()},methods:{init:function(){this.video_url=this.getParams().video_url,this.play_show=this.getParams().play_show}}},i={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"lesson_group w-100"},[t.play_show?s("div",{staticClass:"play_modal"},[s("a",{staticClass:"w-100 p-r play_container",attrs:{href:"javascript:;"},on:{click:function(a){t.play_btn_show=!t.play_btn_show}}},[s("a",{staticClass:"play_plate p-a",attrs:{href:"javascript:;"}}),t._v(" "),s("video",{staticClass:"video_data w-100",attrs:{src:t.video_url,autoplay:"",controls:""},on:{focus:function(a){t.play_btn_show=!t.play_btn_show}}}),t._v(" "),t.play_btn_show?s("a",{staticClass:"play_close_btn p-a",attrs:{href:"javascript:history.go(-1)"}},[s("span",{staticClass:"iconfont icon-error fw-7 fc-white"})]):t._e()])]):t._e()])},staticRenderFns:[]};var n=s("VU/8")(e,i,!1,function(t){s("tokS")},null,null);a.default=n.exports},tokS:function(t,a){}});