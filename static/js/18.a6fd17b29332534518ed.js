webpackJsonp([18],{"5NTH":function(t,a,s){"use strict";(function(t){a.a={data:function(){return{tabbar_code:0,tipText:['<span style="color:red;">$ 分</span>','<span style="color:blue;">$ 分 </span>','<span style="color:green;">$ 分 </span>','<span style="color:black;">$ 分 </span>','<span style="color:chartreuse;">$ 分 </span>'],pageInfo:{header_title:"我的信用",logo:"http://static.sxtian.com/imgs/xinyong/xy_bg_logo.png",card_logo:"http://static.sxtian.com/imgs/xinyong/xy_card_logo.png",tabbarList:[{title:"对我的评价"},{title:"对他人评价"}]},cardInfo:{logo:"http://static.sxtian.com/imgs/main/user_logo.png",name:"王小姐",score:2,type:[{title:"信用很差",class:"bg-red"},{title:"信用一般",class:"bg-lightRed"},{title:"信用中等",class:"bg-yellow"},{title:"信用良好",class:"bg-blue"},{title:"信用满分",class:"bg-green"}],detail:[{title:"资料完善",count:"90%"},{title:"认证完善",count:"已认证"},{title:"完成订单",count:"90"},{title:"违约订单",count:"0"}],list:[{name:"张先生",score:5,msg:"技术一流，服务到位！",time:"2019-01-01",logo:"http://static.sxtian.com/imgs/main/user_logo.png"},{name:"高小姐",score:2,msg:"技术一流，服务到位！",time:"2019-01-01",logo:"http://static.sxtian.com/imgs/main/user_logo.png"},{name:"王女士",score:4,msg:"技术一流，服务到位！",time:"2019-01-01",logo:"http://static.sxtian.com/imgs/main/user_logo.png"},{name:"王女士",score:4,msg:"技术一流，服务到位！",time:"2019-01-01",logo:"http://static.sxtian.com/imgs/main/user_logo.png"},{name:"王女士",score:4,msg:"技术一流，服务到位！",time:"2019-01-01",logo:"http://static.sxtian.com/imgs/main/user_logo.png"}]}}},mounted:function(){var a=document.documentElement.clientHeight,s=document.querySelector(".credit_bg").clientHeight;t(".credit_list").css("height",a-s+"px")},created:function(){this.selfMainLoadOpend(),this.$store.commit("setHeaderStyle",{txt:this.pageInfo.header_title,type:1}),this.init()},beforeRouteLeave:function(t,a,s){"/newusercenter"==t.path&&(t.meta.keepAlive=!1),s()},methods:{init:function(){var t=this;this.getPageInfo(),this.__Sleep(function(a){t.selfMainLoadClosed()},1e3)},getPageInfo:function(){var t=this,a={token:this.getToken(),type:2};this.$dialog.loading.open("拼命加载中..."),this.__initAction("Member-getCredit",a,function(a,s){if(1==s){console.log(a.data);var e=a.data;t.cardInfo.logo=e.portrait,t.cardInfo.name=e.lastName,t.cardInfo.score=e.stars,t.cardInfo.detail[0].count=e.good,t.cardInfo.detail[1].count=e.Authentication,t.cardInfo.detail[2].count=e.orders,t.cardInfo.list=a.data.list,console.log(t.cardInfo.list),t.$dialog.loading.close()}})}}}}).call(a,s("gavX"))},D8Zl:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("5NTH"),i={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"credit w-100"},[s("header",{staticClass:"credit_header bg-gray w-100 fc-dark"},[s("a",{staticClass:"arrow-logo fc-dark iconfont icon-previewleft",attrs:{href:"javascript:history.go(-1)"}}),t._v(" "),s("span",{staticClass:"header_title fc-dark"},[t._v(t._s(t.pageInfo.header_title))]),t._v(" "),s("a",{staticClass:"last",attrs:{href:"javascript:;"}})]),t._v(" "),s("div",{staticClass:"credit_group w-100"},[s("div",{staticClass:"credit_bg w-100 shadow-dark p-r bg-white"},[s("img",{staticClass:"credit_bg_img",attrs:{src:t.pageInfo.logo,alt:""}}),t._v(" "),s("div",{staticClass:"credit_bg_tabbar bg-blue"},t._l(t.pageInfo.tabbarList,function(a,e){return s("div",{key:e,staticClass:"tabbar_tab",on:{click:function(a){t.tabbar_code=e}}},[s("span",{staticClass:"tab",class:t.tabbar_code==e?"bg-white fc-blue":"fc-white"},[t._v(t._s(a.title))])])}),0),t._v(" "),s("div",{staticClass:"credit_info_card p-a"},[s("div",{staticClass:"card_title"},[s("div",{staticClass:"card_logo"},[s("img",{attrs:{src:t.cardInfo.logo,alt:""}})]),t._v(" "),s("div",{staticClass:"card_detail"},[s("span",{staticClass:"card_name"},[t._v(t._s(t.cardInfo.name))]),t._v(" "),s("yd-rate",{staticClass:"card_score",attrs:{slot:"left",size:"1rem","show-text":t.tipText,color:"#ff9c00","active-color":"#ff9c00",readonly:""},slot:"left",model:{value:t.cardInfo.score,callback:function(a){t.$set(t.cardInfo,"score",a)},expression:"cardInfo.score"}})],1),t._v(" "),s("div",{staticClass:"card_evaluate"},[s("span",{staticClass:"card_type",class:t.cardInfo.type[t.cardInfo.score-1].class},[t._v(t._s(t.cardInfo.type[t.cardInfo.score-1].title))])])]),t._v(" "),s("ul",{staticClass:"card_info"},t._l(t.cardInfo.detail,function(a,e){return s("li",{key:e,staticClass:"card_info_detail"},[s("span",{attrs:{clss:"detail_count"}},[t._v(t._s(a.count))]),t._v(" "),s("span",{staticClass:"detail_title fc-blue"},[t._v(t._s(a.title))])])}),0)])]),t._v(" "),s("div",{staticClass:"credit_list w-100"},t._l(t.cardInfo.list,function(a,e){return s("a",{key:e,staticClass:"list_item bg-white w-100",attrs:{href:"javascript:;"}},[s("yd-cell-group",{staticClass:"items w-100"},[s("yd-cell-item",{staticClass:"item w-100"},[s("img",{staticClass:"item_logo",attrs:{slot:"icon",src:a.avatar},slot:"icon"}),t._v(" "),s("div",{staticClass:"item_detail",attrs:{slot:"left"},slot:"left"},[s("span",{staticClass:"item_name fc-dark fw-5"},[t._v(t._s(a.nickName))]),t._v(" "),s("span",{staticClass:"item_time fc-gray"},[t._v(t._s(a.time))])]),t._v(" "),s("yd-rate",{staticClass:"item_score",attrs:{slot:"right",size:"1rem",color:"#ff9c00","active-color":"#ff9c00",readonly:""},slot:"right",model:{value:a.star,callback:function(s){t.$set(a,"star",s)},expression:"tmp.star"}})],1),t._v(" "),s("yd-cell-item",{staticClass:"item"},[s("span",{staticClass:"item_txt",attrs:{slot:"left"},slot:"left"},[t._v(t._s(a.comment))])])],1)],1)}),0)])])},staticRenderFns:[]};var c=function(t){s("Rs5Z")},o=s("VU/8")(e.a,i,!1,c,"data-v-7822c6fc",null);a.default=o.exports},Rs5Z:function(t,a){}});