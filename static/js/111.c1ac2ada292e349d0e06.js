webpackJsonp([111],{K8Mk:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("BO1k"),n=a.n(s),i=a("//Fk"),o=a.n(i),r={data:function(){return{header_code:0,tabCode:0,pageInfo:{header_title:[{title:"我的发布",type:1},{title:"接受订单",type:2}],headerBar:[{title:"全部",status:0},{title:"待服务",status:1},{title:"待完成",status:2},{title:"待评价",status:3},{title:"已完成",status:4}],token:"",ordersType:0,page:0,length:100,pid:0,count:0},partTimeList:[]}},created:function(){var t=this;this.getPageData(this.selfMainLoadOpend()).then(function(e){return t.getPageInfo(e)}).then(function(e){return t.showData(e)}).then(function(){t.selfMainLoadClosed()})},mounted:function(){this.$refs.oneBarEle.style.height="7vh";var t=this.$refs.headerEle.offsetHeight;this.$refs.fixedEle.style.height=t+"px"},destroyed:function(){},methods:{getPageData:function(){var t=this;return new o.a(function(e,a){t.pageInfo.token=t.getToken(),e(t.pageInfo.token)})},headerTopAction:function(t){var e=this;this.header_code=t,this.tabCode=0,this.partTimeList=[],this.getPageInfo(this.pageInfo.token).then(function(t){return e.showData(t)}).then(function(){e.selfMainLoadClosed()})},headerMidAction:function(t){var e=this;this.tabCode=t,this.partTimeList=[],this.getPageInfo(this.pageInfo.token).then(function(t){return e.showData(t)}).then(function(){e.selfMainLoadClosed()})},getPageInfo:function(t){var e=this;return new o.a(function(a,s){var n=e.pageInfo.header_title[e.header_code].type,i=e.pageInfo.ordersType,o=e.pageInfo.headerBar[e.tabCode].status,r=e.pageInfo.page,c=e.pageInfo.length,u=e.pageInfo.pid,d={token:t,isRelease:n,ordersType:i,ordersStatus:o,page:r,length:c,pid:u};e.__initAction("Tloong-orderList",d,function(t,e){a(t)})})},showData:function(t){var e=this;return new o.a(function(a,s){e.pageInfo.count=t.count;var i=t.data;if(!i)return e.selfMainLoadClosed();var o=!0,r=!1,c=void 0;try{for(var u,d=n()(i);!(o=(u=d.next()).done);o=!0){var l=u.value;e.partTimeList.push(l)}}catch(t){r=!0,c=t}finally{try{!o&&d.return&&d.return()}finally{if(r)throw c}}a()})},isGoTo:function(t,e){var a=this;t&&this.__Sleep(function(t){var s={path:"/partListNext",query:{pid:e}};a.$router.push(s)})},updatedStatus:function(t,e,a,s,n){var i=this,o=this.getToken();if(1==a){var r={token:o,ordersId:s,uppInfo:1};this.__initAction("Tloong-orderUpp",r,function(a,s){1==s?setTimeout(function(){i.getBtnStatus(e,t,n)},500):(i._msg(a.info,1e3),setTimeout(function(){i.getBtnStatus(e,t,n)},500))})}else this.$router.push("/evaluate/"+s)},getBtnStatus:function(t,e,a){var s=this,n={token:this.getToken(),goodsInfo:"demands|"+t,toUid:e};this.__initAction("Tloong-getSwopInfo",n,function(t,e){if(1==e){var n=t.data,i=n.communicateStatus,o=n.msg;i.constructor!==Number&&(i=i.parseInt()),s.partTimeList[a].buttonStatus.communicateStatus=i,s.partTimeList[a].buttonStatus.msg=o}})},do_chat:function(t,e){var a=t,s=(this.getUserInfo().uid,{sign:"demands",gid:e=e,toUid:a});this.$router.push({path:"/service_chat",query:s})}},computed:{},components:{"self-no-data":function(){return a.e(132).then(a.bind(null,"11mN"))},"self-load-frame":function(){return a.e(133).then(a.bind(null,"3KQ1"))}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order w-100"},[a("header",{ref:"headerEle",staticClass:"order-header"},[a("div",{ref:"oneBarEle",staticClass:"order_header bg-blue"},[a("a",{staticClass:"arrow-logo iconfont icon-previewleft",attrs:{href:"javascript:history.go(-1)"}}),t._v(" "),a("div",{staticClass:"header_title_group"},t._l(t.pageInfo.header_title,function(e,s){return a("a",{key:s,staticClass:"header_title",class:t.header_code==s?"bg-white fc-dark":"bg-blue fc-white br-white",attrs:{href:"javascript:;"},on:{click:function(e){return t.headerTopAction(s)}}},[t._v(t._s(e.title))])}),0),t._v(" "),t._m(0)]),t._v(" "),a("ul",{staticClass:"bar-list"},t._l(t.pageInfo.headerBar,function(e,s){return a("li",{key:s,staticClass:"bar-item"},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.headerMidAction(s)}}},[a("span",{class:t.tabCode==s?"span-action":""},[t._v(t._s(e.title))])])])}),0)]),t._v(" "),a("div",{ref:"fixedEle",staticClass:"clear-fixed"}),t._v(" "),a("div",{staticClass:"list-card"},[0==t.header_code?a("ul",{staticClass:"list"},t._l(t.partTimeList,function(e,s){return a("li",{key:s,staticClass:"list-item mt-3"},[a("div",{on:{click:function(a){return t.isGoTo(e.preOrderCount,e.id)}}},[a("h3",{staticClass:"item-title"},[t._v(t._s(e.title))]),t._v(" "),a("a",{staticClass:"item-link mt-3",attrs:{href:"javascript:;"}},[a("div",[a("span",{staticClass:"fc-gray item-name"},[t._v(t._s(e.title))]),t._v(" "),a("span",{staticClass:"iconfont icon-renzheng fc-green"})]),t._v(" "),a("span",{staticClass:"fc-red fw-6 item-money"},[t._v(t._s(e.serviceDatd))])]),t._v(" "),a("div",{staticClass:"mt-3 item-content"},[t._v(t._s(e.infos))]),t._v(" "),a("div",{staticClass:"item-btns2 mt-3 fc-blue fw-6"},[e.preOrderCount>0?a("span",[t._v("查看详情")]):t._e()])])])}),0):t._e(),t._v(" "),1==t.header_code?a("ul",{staticClass:"list"},t._l(t.partTimeList,function(e,s){return a("li",{key:s,staticClass:"list-item mt-3"},[a("div",{on:{click:function(a){return a.preventDefault(),t.do_chat(e.userId,e.goodId)}}},[a("h3",{staticClass:"item-title"},[t._v(t._s(e.goodInfo.title))]),t._v(" "),a("a",{staticClass:"item-link mt-3",attrs:{href:"javascript:;"}},[a("div",[a("span",{staticClass:"fc-gray item-name"},[t._v(t._s(e.goodInfo.title))]),t._v(" "),a("span",{staticClass:"iconfont icon-renzheng fc-green"})]),t._v(" "),a("span",{staticClass:"fc-red fw-6 item-money"},[t._v(t._s(e.goodInfo.serviceDatd))])]),t._v(" "),a("div",{staticClass:"mt-3 item-content"},[t._v(t._s(e.goodInfo.infos))]),t._v(" "),2==e.buttonStatus.communicateStatus?a("div",{staticClass:"item-btns item5 mt-3 pt-3"},[a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return a.stopPropagation(),t.updatedStatus(e.userId,e.goodId,1,e.buttonStatus.orderId,s)}}},[a("span",{domProps:{textContent:t._s("完成")}})])]):t._e(),t._v(" "),8==e.buttonStatus.communicateStatus?a("div",{staticClass:"item-btns item5 mt-3 pt-3"},[a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return a.stopPropagation(),t.updatedStatus(e.userId,e.goodId,4,e.buttonStatus.orderId,s)}}},[a("span",{domProps:{textContent:t._s("确认评价")}})])]):t._e(),t._v(" "),t._m(1,!0)])])}),0):t._e(),t._v(" "),0==t.partTimeList.length?a("a",{attrs:{href:"javascript:;"}},[a("self-no-data",{attrs:{title:"暂无数据..."}})],1):t._e()])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"last",attrs:{href:"javascript:;"}},[e("span",{staticStyle:{color:"#fff"}},[this._v("兼职")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"item-btns2 mt-3 fc-blue fw-6"},[e("span",[this._v("查看详情")])])}]};var u=a("VU/8")(r,c,!1,function(t){a("LtMC")},"data-v-33bfb37b",null);e.default=u.exports},LtMC:function(t,e){}});