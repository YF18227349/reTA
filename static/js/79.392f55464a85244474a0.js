webpackJsonp([79],{"v/Tv":function(t,e){},ybc8:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{pageInfo:{header_title:"立即分享",url:""},boxStyle:{height:!0}}},created:function(){this.selfMainLoadOpend(),this.$store.commit("setHeaderStyle",{txt:this.pageInfo.header_title,type:0}),this.init()},mounted:function(){this.autoIndexSize()},methods:{init:function(){var t=this;this.getDataInfo(),this.__Sleep(function(e){t.selfMainLoadClosed()},1e3)},autoIndexSize:function(){var t=document.documentElement.clientHeight;this.boxStyle.height=t+"px"},getDataInfo:function(){var t=this,e={token:this.getToken(),link:"https://app.tiananrenli.com/#/phoneLogin"};this.__initAction("Tools-setQrcode",e,function(e,n){1==n&&(t.pageInfo.url=e.data.src)})}}},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"qr-code"},[e("div",{staticClass:"img-box",style:this.boxStyle},[e("img",{staticClass:"qr-img",attrs:{src:this.pageInfo.url,alt:""}})])])},staticRenderFns:[]};var s=n("VU/8")(i,o,!1,function(t){n("v/Tv")},null,null);e.default=s.exports}});