webpackJsonp([96],{jFLA:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("mvHQ"),i=e.n(a),n={data:function(){return{pageInfo:{header_title:"我的"},rid:null,authStatus:null,goScroll:"",userInfo:{name:"",bankcard:null,logo:"",score:null,type:null,money_count:null,approveType:null},assetsList:[{title:"我的订单",icon:"icon-dingdan",bg_color:"#59E2F6",url:"/order"},{title:"我的保险",bg_color:"#FFC63D",icon:"icon-i-safe",url:"/userInsurance"},{title:"我的信用",bg_color:"#D83E3E",icon:"icon-xinyong1",url:"/usercredit"},{title:"我的发票",bg_color:"#FFB981",icon:"icon-fapiaoxinxi",url:"/invoice_fill"}],ationList:[{icon:"icon-mine-red",title:"个人认证",type:1,rid:1,status:3,url:"/personal_auth"},{icon:"icon-jiudian",title:"企业认证",type:2,rid:2,status:3,url:"/company_auth"},{icon:"icon-junren",title:"军人认证",type:3,rid:1,status:3,url:"/soldier_auth"}],userInfoList:[{icon:"icon-chat2",title:"我的消息",url:"/message"},{icon:"icon-dingdan",title:"我的简历",url:"/user_resume"},{icon:"icon-confirmation-number",title:"我的发票",url:"/user_invoice"},{icon:"icon-dingwei2",title:"我的地址",url:"/user_addr/user"},{icon:"icon-xinyongqiahuankuan",title:"我的银行卡",url:"/userbankcard/list"}],UserCacheData:{kefutelcode:null},isIconIndex:0,imageIconList:[{index:0,name:"未认证",type:"个人",url:"./static/imgs/yf/geren_wei.png"},{index:1,name:"待审核",type:"个人",url:"./static/imgs/yf/geren_shen.png"},{index:2,name:"已认证",type:"个人",url:"./static/imgs/yf/geren_suc.png"},{index:3,name:"未认证",type:"军人",url:"./static/imgs/yf/junren_wei.png"},{index:4,name:"待审核",type:"军人",url:"./static/imgs/yf/junren_shen.png"},{index:5,name:"已认证",type:"军人",url:"./static/imgs/yf/junren_suc.png"},{index:6,name:"未认证",type:"企业",url:"./static/imgs/yf/qiye_wei.png"},{index:7,name:"待审核",type:"企业",url:"./static/imgs/yf/qiye_shen.png"},{index:8,name:"已认证",type:"企业",url:"./static/imgs/yf/qiye_suc.png"}]}},mounted:function(){window.addEventListener("scroll",this.handleScroll),this.delCache("ORDER_INFO")},created:function(){this.delSelectData(),this.selfMainLoadOpend(),this.$store.commit("setHeaderStyle",{txt:this.pageInfo.header_title,type:1}),this.delCache("ORDER_INFO"),this.init()},methods:{init:function(){var t=this;this.removeCache(),this.getUserCache(),this.__Sleep(function(s){t.selfMainLoadClosed()},1e3)},doLocation:function(t){switch(t){case"auth":0==this.userInfo.approveType&&this._msg("请认证！");break;case"xinyong":this.$router.push("/usercredit/2");break;case"yinh":this.$router.push("/userbankcard/list");break;default:this._log(t)}},getUserCache:function(){var t=this,s={token:this.getToken(),uid:this.getUserInfo().uid};this.__initAction("Member-getUserCache",s,function(s,e){if(1==e){var a=s.data;console.log(a),t.UserCacheData=a,t.setCache("userInfoExt",i()(a)),t.userInfo.name=a.lastName,t.userInfo.bankcard=a.backNum,t.userInfo.logo=a.portrait,t.userInfo.score=a.credit,t.userInfo.money_count=a.balance,t.userInfo.approveType=a.approveType;var n=a.rid;t.rid=a.rid;var o=a.userAuth.status,r=(n=a.userAuth.type,a.rid);if(r)switch(r){case 1:-1==o?1==n?(console.log("我是个人用户,未认证"),t.isIconIndex=0):3==n?(console.log("我是军人用户,未认证"),t.isIconIndex=3):(console.log("我是个人用户,未认证"),t.isIconIndex=0):0==o?1==n?(console.log("我是个人用户,驳回"),t.isIconIndex=0):3==n&&(console.log("我是军人用户,驳回"),t.isIconIndex=3):1==o?1==n?(console.log("我是个人用户,认证成功"),t.isIconIndex=2):3==n&&(console.log("我是军人用户,认证成功"),t.isIconIndex=5):2==o&&(1==n?(console.log("我是个人用户,审核中"),t.isIconIndex=1):3==n&&(console.log("我是军人用户,审核中"),t.isIconIndex=4));break;case 2:-1==o?(console.log("我是企业,未认证"),t.isIconIndex=6):0==o?2==n&&(t.isIconIndex=6,console.log("我是企业,驳回")):1==o?2==n&&(console.log("我是企业,认证成功"),t.isIconIndex=8):2==o&&2==n&&(console.log("我是企业,审核中"),t.isIconIndex=7)}if(-1==a.userAuth.status)1==a.rid&&(t.ationList[2].rid=1),t.userInfo.approveType=0;else{var c=a.userAuth.type-1;o=a.userAuth.status;switch(t.ationList[c].status=a.userAuth.status,o){case 2:case 0:1==a.userAuth.type&&(t.ationList[2].rid=999),3==a.userAuth.type&&(t.ationList[0].rid=999,t.ationList[2].rid=1);break;case 1:1==a.userAuth.type&&(t.ationList[2].rid=999),3==a.userAuth.type&&(t.ationList[2].rid=1,t.ationList[0].rid=999)}}t.authStatus=a.userAuth.status}})},handleScroll:function(){var t=window.pageYOffset,s=(window.pageYOffset||document.documentElement.scrollTop,document.querySelector(".header_bg").offsetHeight),e=s/2;this.goScroll=t>5&&t<=e?"background:rgba(47, 155, 254, 0.1)":t>e&&t<=s?"background:rgba(47, 155, 254, 0.5)":0==t?"display:flex":"display:none"},lostLogin:function(){var t=this;this.delCacheAll(),setTimeout(function(){t.$router.push("/")},300)},delSelectData:function(){var t=this.getSelectData();t&&(t.demand&&(t.demand.salary_data=null),t.skill&&(t.skill.salary_data=null),t.data&&(t.data.data1=null,t.select_addr=null,this.setCache("select_data",i()(t))))}},destroyed:function(){window.pageYOffset>0&&(window.pageYOffset=0),window.removeEventListener("scroll",this.handleScroll)},computed:{iconImageUrl:function(){return this.imageIconList[this.isIconIndex]}}},o={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"userCenter"},[e("header",{staticClass:"userCenter_header",style:t.goScroll},[e("span"),t._v(" "),e("span",{staticClass:"header_title"},[t._v("我的")]),t._v(" "),e("router-link",{staticClass:"header_logo iconfont icon-setting1",attrs:{to:"/usersetting"}})],1),t._v(" "),e("div",{staticClass:"header_bg"},[e("div",{staticClass:"userCenter_list"},[e("div",{staticClass:"userCenter_title p-r"},[e("div",{staticClass:"user_photo"},[e("div",{staticClass:"photoStyle p-a"},[e("img",{attrs:{src:t.userInfo.logo,alt:""}})])]),t._v(" "),e("p",{staticClass:"user_name fc-gray"},[t._v(t._s(t.userInfo.name?t.userInfo.name:"未设置"))]),t._v(" "),e("div",{staticClass:"user_code"},[e("div",{staticClass:"user_bankcard",on:{click:function(s){return t.doLocation("yinh")}}},[e("span",[t._v(t._s(t.userInfo.bankcard))]),t._v(" "),e("span",[t._v("银行卡")])]),t._v(" "),e("div",{staticClass:"user_score",on:{click:function(s){return t.doLocation("xinyong")}}},[e("span",[t._v(t._s(t.userInfo.score))]),t._v(" "),e("span",[t._v("信用分")])]),t._v(" "),e("div",{staticClass:"user_ation",on:{click:function(s){return t.doLocation("auth")}}},[e("img",{staticStyle:{width:"auto",height:"auto"},attrs:{src:t.iconImageUrl.url,alt:""}}),t._v(" "),e("span",[t._v(t._s(t.iconImageUrl.name))])])])]),t._v(" "),e("div",{staticClass:"userCenter_assets"},[e("div",{staticClass:"assets_title p-r"},[e("div",{staticClass:"assets_money p-r"},[e("div",{staticClass:"assets_money_count p-a"},[e("span",{staticClass:"count_title"},[t._v("总资产 (元)")]),t._v(" "),e("span",{staticClass:"money_count"},[t._v(t._s(t.userInfo.money_count))])])]),t._v(" "),e("router-link",{staticClass:"assets_search_btn p-a",attrs:{to:"/user_balance"}},[e("span"),t._v(" "),e("span",{staticClass:"assets_search_title"},[t._v("查询")])])],1),t._v(" "),e("div",{staticClass:"assets_list"},t._l(t.assetsList,function(s,a){return e("router-link",{key:a,attrs:{to:s.url+"/"+a}},[e("span",{staticClass:"assets_logo",style:"background:"+s.bg_color},[e("span",{staticClass:"assets_icon fw-6 fc-white iconfont",class:s.icon})]),t._v(" "),e("span",{staticClass:"assets_title"},[t._v(t._s(s.title))])])}),1)]),t._v(" "),e("div",{staticClass:"userCenter_ation"},t._l(t.ationList,function(s,a){return s.rid==t.rid?e("div",{key:a},[e("router-link",{staticClass:"ation_item",attrs:{to:s.url+"/"+t.rid+"/"+t.authStatus}},[e("span",{staticClass:"iconfont ation_logo",class:s.icon}),t._v(" "),e("span",{staticClass:"ation_title w-100"},[t._v(t._s(s.title))]),t._v(" "),e("span",{staticClass:"ation_type"},[t._v("\n\t\t\t\t\t\t\t"+t._s(3==s.status?"未认证":0==s.status?"已驳回":1==s.status?"已认证":2==s.status?"待审核":"")+"\n\t\t\t\t\t\t\t"),e("span",{staticClass:"iconfont icon-previewright"})])])],1):t._e()}),0),t._v(" "),e("div",{staticClass:"userCenter_userInfo mb-5"},t._l(t.userInfoList,function(s,a){return e("router-link",{key:a,staticClass:"userInfo_item",attrs:{to:s.url}},[e("span",{staticClass:"iconfont userInfo_logo",class:s.icon}),t._v(" "),e("span",{staticClass:"userInfo_title"},[t._v(t._s(s.title))]),t._v(" "),e("span",{staticClass:"userInfo_arrow iconfont icon-previewright"})])}),1),t._v(" "),e("div",{staticClass:"share_btn mt-2"},[e("router-link",{staticClass:"share",attrs:{to:"/qrcode"}},[e("span",{staticClass:"share_logo iconfont icon-tubiao212"}),t._v(" "),e("span",{staticClass:"share_title"},[t._v("立即分享")]),t._v(" "),e("span",{staticClass:"share_arrow iconfont icon-previewright"})])],1),t._v(" "),e("div",{staticClass:"share_btn mt-2"},[e("a",{staticClass:"share",attrs:{href:"tel:"+t.UserCacheData.kefutelcode}},[e("span",{staticClass:"share_logo iconfont icon-service"}),t._v(" "),e("span",{staticClass:"share_title"},[t._v("联系客服")]),t._v(" "),e("span",{staticClass:"share_arrow iconfont icon-previewright"})])]),t._v(" "),e("div",{staticClass:"share_btn mt-2"},[e("router-link",{staticClass:"share",attrs:{to:"/feedback"}},[e("span",{staticClass:"share_logo iconfont"},[e("svg",{staticClass:"icon",staticStyle:{width:"1em",height:"1em","vertical-align":"middle",fill:"currentColor",overflow:"hidden"},attrs:{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"5025"}},[e("path",{attrs:{d:"M781.1 469.3l19.4-193.8c2.2-21.8-18.1-42.3-40-40.4l-196.2 17.3c-6.8 0.6-13 3.4-17.6 8L168.4 638.8c-12 12-10.6 32.8 3.1 46.5l176.6 176.6c13.7 13.7 34.5 15.1 46.5 3.1l378.5-378.5c4.6-4.5 7.4-10.5 8-17.2z m-148.9-67c-19.5-19.5-19.5-51.2 0-70.7s51.2-19.5 70.7 0 19.5 51.2 0 70.7c-19.5 19.6-51.2 19.6-70.7 0z","p-id":"5026"}})])]),t._v(" "),e("span",{staticClass:"share_title"},[t._v("意见反馈")]),t._v(" "),e("span",{staticClass:"share_arrow iconfont icon-previewright"})])],1),t._v(" "),e("div",{staticClass:"share_btn mt-2"},[e("router-link",{staticClass:"share",attrs:{to:"/About"}},[e("span",{staticClass:"share_logo iconfont icon-tanhaotishi"}),t._v(" "),e("span",{staticClass:"share_title"},[t._v("关于")]),t._v(" "),e("span",{staticClass:"share_arrow iconfont icon-previewright"})])],1),t._v(" "),e("div",{staticClass:"exit_login w-100 mt-2"},[e("a",{staticClass:"lost_login",attrs:{href:"javascript:;"},on:{click:function(s){return t.lostLogin()}}},[e("span",{staticClass:"share_logo iconfont icon-tuichu"}),t._v(" "),e("span",{staticClass:"share_title"},[t._v("退出登录")]),t._v(" "),e("span",{staticClass:"share_arrow iconfont icon-previewright"})])])])])])},staticRenderFns:[]};var r=e("VU/8")(n,o,!1,function(t){e("wn6W")},"data-v-5af1c186",null);s.default=r.exports},wn6W:function(t,s){}});