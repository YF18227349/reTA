webpackJsonp([120],{p0Lb:function(t,e){},pzHg:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("BO1k"),a=n.n(s),o=n("//Fk"),i=n.n(o),r={data:function(){return{pageLan:{title:"",count:"",postList:[]},partTimeList:[]}},created:function(){var t=this;this.getPageData(this.selfMainLoadOpend()).then(function(e){return t.getPageInfo(e)}).then(function(e){return t.showData(e)}).then(function(){t.selfMainLoadClosed()})},mounted:function(){},destroyed:function(){},methods:{getPageData:function(){var t=this;return new i.a(function(e,n){t.$store.commit("setHeaderStyle",{txt:"我发布兼职",type:1}),e(t.getToken())})},getPageInfo:function(t){var e=this;return new i.a(function(n,s){var a=e.getQuery().pid,o={token:t,isRelease:1,ordersType:0,ordersStatus:0,page:0,length:100,pid:a};e.__initAction("Tloong-orderList",o,function(t,e){n(t)})})},showData:function(t){var e=this;return new i.a(function(n,s){var o=t.data;if(e.postUserId=o.userId,e.baseUserId=e.getUserInfo().uid,!o)return e.selfMainLoadClosed();var i=!0,r=!1,u=void 0;try{for(var c,d=a()(o);!(i=(c=d.next()).done);i=!0){var f=c.value;e.partTimeList.push(f)}}catch(t){r=!0,u=t}finally{try{!i&&d.return&&d.return()}finally{if(r)throw u}}n()})},updatedStatus:function(t,e,n,s,a){var o=this,i=this.getToken(),r=n;if(1==r){var u={token:i,ordersId:s,uppInfo:1},c="Tloong-orderUpp";this.__initAction(c,u,function(n,s){1==s?setTimeout(function(){o.getBtnStatus(e,t,a)},500):(o._msg(n.info,1e3),setTimeout(function(){o.getBtnStatus(e,t,a)},500))})}else if(4==r)this.$router.push("/evaluate/"+s);else{u={token:i,goodsInfo:"demands|"+e,c_status:r,orderId:s},c="Tloong-getSwopUpd";this.__initAction(c,u,function(n,s){1==s?setTimeout(function(){o.getBtnStatus(e,t,a)},500):(o._msg(n.info,1e3),setTimeout(function(){o.getBtnStatus(e,t,a)},500))})}},getBtnStatus:function(t,e,n){var s=this,a={token:this.getToken(),goodsInfo:"demands|"+t,toUid:e};this.__initAction("Tloong-getSwopInfo",a,function(t,e){if(1==e){var a=t.data,o=a.communicateStatus,i=a.msg;o.constructor!==Number&&(o=o.parseInt()),s.partTimeList[n].buttonStatus.communicateStatus=o,s.partTimeList[n].buttonStatus.msg=i}})},do_chat:function(t,e){var n=t;e=e;if(this.getUserInfo().uid!=n){var s={sign:"demands",gid:e,toUid:n};this.$router.push({path:"/service_chat",query:s})}else this.selfAlertBox({mes:"您不能和自己发布的订单沟通",cancel:!1,alert:!0})}},computed:{},components:{"self-no-data":function(){return n.e(132).then(n.bind(null,"11mN"))},"self-load-frame":function(){return n.e(133).then(n.bind(null,"3KQ1"))}}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"order w-100"},[n("div",{staticClass:"list-card"},[n("ul",{staticClass:"list"},t._l(t.partTimeList,function(e,s){return n("li",{key:s,staticClass:"list-item mt-3"},[n("div",{on:{click:function(n){return n.preventDefault(),t.do_chat(e.userId,e.goodId)}}},[n("h3",{staticClass:"item-title"},[t._v(t._s(e.goodInfo.title))]),t._v(" "),n("a",{staticClass:"item-link mt-3",attrs:{href:"javascript:;"}},[n("div",[n("span",{staticClass:"fc-gray item-name"},[t._v(t._s(e.goodInfo.title))]),t._v(" "),n("span",{staticClass:"iconfont icon-renzheng fc-green"})]),t._v(" "),n("span",{staticClass:"fc-red fw-6 item-money"},[t._v(t._s(e.goodInfo.serviceDatd))])]),t._v(" "),n("div",{staticClass:"mt-3 item-content"},[t._v(t._s(e.goodInfo.infos))]),t._v(" "),1==e.buttonStatus.communicateStatus?n("div",{staticClass:"item-btns item5 mt-3 pt-3"},[n("a",{attrs:{href:"javascript:;"},on:{click:function(n){return n.stopPropagation(),t.updatedStatus(e.userId,e.goodId,2,e.buttonStatus.orderId,s)}}},[n("span",{domProps:{textContent:t._s("同意")}})]),t._v(" "),n("a",{attrs:{href:"javascript:;"},on:{click:function(n){return n.stopPropagation(),t.updatedStatus(e.userId,e.goodId,3,e.buttonStatus.orderId,s)}}},[n("span",{domProps:{textContent:t._s("拒绝")}})])]):t._e(),t._v(" "),7==e.buttonStatus.communicateStatus?n("div",{staticClass:"item-btns item5 mt-3 pt-3"},[n("a",{attrs:{href:"javascript:;"},on:{click:function(n){return n.stopPropagation(),t.updatedStatus(e.userId,e.goodId,1,e.buttonStatus.orderId,s)}}},[n("span",{domProps:{textContent:t._s("确认完成")}})])]):t._e(),t._v(" "),9==e.buttonStatus.communicateStatus?n("div",{staticClass:"item-btns item5 mt-3 pt-3"},[n("a",{attrs:{href:"javascript:;"},on:{click:function(n){return n.stopPropagation(),t.updatedStatus(e.userId,e.goodId,4,e.buttonStatus.orderId,s)}}},[n("span",{domProps:{textContent:t._s("评价")}})])]):t._e(),t._v(" "),t._m(0,!0)])])}),0),t._v(" "),0==t.partTimeList.length?n("a",{attrs:{href:"javascript:;"}},[n("self-no-data",{attrs:{title:"暂无数据..."}})],1):t._e()])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"item-btns2 mt-3 fc-blue fw-6"},[e("span",[this._v("查看详情")])])}]};var c=n("VU/8")(r,u,!1,function(t){n("p0Lb")},"data-v-1c1cf4f1",null);e.default=c.exports}});