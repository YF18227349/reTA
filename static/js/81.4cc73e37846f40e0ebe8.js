webpackJsonp([81],{"5SyQ":function(t,n){},sUDD:function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=o("mvHQ"),e=o.n(i),a={data:function(){return{test:null,config:{}}},mounted:function(){},created:function(){this.selfMainLoadOpend(),this.init(),this.codeSesstionSave()},methods:{init:function(){var t=this,n={page:0,length:10,deBug:!0};this.__initAction("Tools-getLatLon",{},function(o,i){1==i&&(n.location={},n.location.cityId=o.data.cityId,n.location.address=o.data.address,n.location.location_city=o.data.content.city,n.location.city=o.data.content.city,n.location.province=o.data.content.province,n.location.lat=o.data.point.y,n.location.lon=o.data.point.x,t.setCache("location",e()(n.location)))}),this.Global.config=n,this.checkLogin(),this.__Sleep(function(n){t.selfMainLoadClosed()},1e3)},checkLogin:function(){var t=this,n=this.getUserInfo(),o="/login";if(n){var i={token:n.token};this.__initAction("Tools-checkTokens",i,function(i,a){if(1==a){var c=i.data,s={token:c.token,uid:c.uid,telPhone:n.telPhone,location:t.Global.config.location};t.Global.config.uid=c.uid,t.Global.config.token=c.token,t.setCache("user_info",e()(s)),o="/main"}t.__Sleep(function(n){t.__Href(o)})})}else this.__Sleep(function(n){t.__Href(o)})},codeSesstionSave:function(){window.sessionStorage.setItem("isLoadImage",!0)}}},c={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"index_main"})},staticRenderFns:[]};var s=o("VU/8")(a,c,!1,function(t){o("5SyQ")},null,null);n.default=s.exports}});