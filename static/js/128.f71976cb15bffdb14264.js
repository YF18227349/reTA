webpackJsonp([128],{"9wmJ":function(t,e){},sOhf:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={data:function(){return{pageInfo:{header_title:"我的明细"},billList:[{title:"",detail:""},{title:"类型",detail:""},{title:"时间",detail:""},{title:"交易单号",detail:""},{title:"剩余零钱",detail:""},{title:"备注",detail:""}]}},created:function(){this.selfMainLoadOpend(),this.selfMainLoadClosed(),this.$store.commit("setHeaderStyle",{txt:this.pageInfo.header_title,type:1}),this.getDataInfo()},beforeRouteLeave:function(t,e,i){"/user_balance"==t.path&&(t.meta.keepAlive=!0),i()},methods:{getDataInfo:function(){var t=this,e={token:this.getToken(),id:this.getParams().uid};this.__initAction("balance-getInfo",e,function(e,i){if(1==i){var a=e.data;console.log("123",a),t.billList[0].detail=e.data.price,t.billList[0].title="-"==e.data.types?"出账金额":"进账金额",t.billList[1].detail="-"==e.data.types?"支出":"收入",t.billList[2].detail=e.data.create_time,t.billList[3].detail=e.data.sn,t.billList[4].detail=e.data.infoData.newBalance,t.billList[5].detail=e.data.info}else t._msg(e.info)})}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"userBillDetail w-100"},[i("div",{staticClass:"userBillDetail_list w-100 bg-white"},t._l(t.billList,function(e,a){return i("yd-cell-item",{key:a},[i("span",{staticClass:"title fw-5",attrs:{slot:"left"},slot:"left"},[t._v(t._s(e.title))]),t._v(" "),i("span",{staticClass:"detail fw-5",attrs:{slot:"right"},slot:"right"},[t._v(t._s(e.detail))])])}),1)])},staticRenderFns:[]};var s=i("VU/8")(a,l,!1,function(t){i("9wmJ")},"data-v-05d33f13",null);e.default=s.exports}});