webpackJsonp([61],{"jK/r":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("mvHQ"),a=s.n(i),n={data:function(){return{pageInfo:{header_title:"兼职详情",dataId:null},type_list:{title:"兼职详情",type:"demands"},id:null,userId:null,type:null,lng:"",lat:"",code:null,status:null,showTp:null,msgInfo:"",url:"/Demands-infoMemberDemands.jsp",isBtnCode:!0,buyCount:1,serviceInfoList:{u_name:"",u_logo:"",u_type:null,u_score:"",u_distance:"",u_hot:"",u_demand:"",u_remuneration:"",u_endTime:"",u_adress:"",u_guarantee:"",u_imgsURL:"",u_serviceTime:"",u_detailText:"负责批改教育机构假期学生考试作业以及教材资料，工作内容：评阅小学1-6年级数学语文卷子，提供答案，评阅，评分，改对错！"},show:!1,myInfo:null,toInfo:null}},beforeRouteLeave:function(t,e,s){"/Information"==t.path&&(t.meta.keepAlive=!0),s()},created:function(){this.selfMainLoadOpend(),this.$store.commit("setHeaderStyle",{txt:this.pageInfo.header_title,type:1}),this.getPageInfo(),this.delCache("paymentInfo"),this.delCache("chatQuery")},mounted:function(){},updated:function(){},destroyed:function(){},methods:{getPageInfo:function(){this.selfMainLoadOpend();var t=this.getToken(),e=this.getQuery();if(!e.id)return this.selfMainLoadClosed(),this.selfToast({mes:"获取信息失败请重试...",timeout:1500,icon:"error"}),void setTimeout(function(){window.history.go(-1)},1600);var s=this.url;this.id=e.id,this.lng=e.lng,this.lat=e.lat,this.code=e.code;var i={token:t,id:this.id,lon:this.lng,lat:this.lat,type:this.code};this.getDataInfo(i,s)},getDataInfo:function(t,e){var s=this,i=this.Global.baseURL+e;this.axios.post(i,t).then(function(t){if(console.log(t.data,500),1==t.data.status){var e=t.data.data.GrabSheet,i=t.data.data.dataList,a=t.data.data.userInfo,n=t.data.data.myInfo,o=s.serviceInfoList;s.showTp=e.status,s.msgInfo=e.msgInfo,s.userId=i.userId,s.dataId=i.id,o.u_demand=i.title,o.u_endTime=i.endTime,o.u_imgsURL=i.prices,o.u_detailText=i.infos,o.u_guarantee=i.serviceDatd,o.u_adress=i.addressInfo,o.u_guarantee=i.money,o.u_remuneration=i.serviceDatd,o.u_distance=i.distance,o.u_hot=i.view,o.u_name=a.lastName,o.u_logo=a.portrait,o.u_score=a.loginTimes,s.userInfo=a,s.myInfo=n,s.selfMainLoadClosed()}else-1==t.data.code?(s.selfToast({mes:"登录超时请重试",timeout:1500,icon:"error"}),setTimeout(function(){s.selfMainLoadClosed(),s.$router.push("/login")},1600)):(s.selfToast({mes:"获取信息失败请重试",timeout:1500,icon:"error"}),setTimeout(function(){s.selfMainLoadClosed(),window.history.go(-1)},1600))}).catch(function(t){s.selfToast({mes:"网路故障请重试",timeout:1500,icon:"error"}),setTimeout(function(){window.history.go(-1)},1600),console.error(t)})},rightOff:function(){var t=this,e={goodsInfo:this.type_list.type+"|"+this.id,c_status:1,token:this.getToken()};this.__initAction("Tloong-getSwopUpd",e,function(e,s){1==s?t._msg("已抢单请耐心等待(^_^)"):t._msg(e.info)})},select_btn:function(t){this.isBtnCode=t},exit_btn:function(){var t=this.getSelectData();t.pageInfo.service_detail&&(t.pageInfo.service_detail=null),this.setCache("select_data",a()(t)),setTimeout(function(){window.history.go(-1)},200)},jump_chat:function(){this.getToken(),this.getUserInfo().uid,this.id},do_chat:function(){var t=this.userId,e=this.getUserInfo().uid,s=this.type_list.type,i=this.id;if(e!=t){var a={sign:s,gid:i,toUid:t};this.$router.push({path:"/service_chat",query:a})}else this.selfAlertBox({mes:"您不能和自己发布的订单沟通",cancel:!1,alert:!0})}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"service_detail w-100"},[t.serviceInfoList.u_name?s("div",{staticClass:"service_detail_items w-100 pt-4"},[s("div",{staticClass:"item_info w-100 bg-white"},[s("div",{staticClass:"item_logo"},[s("img",{attrs:{src:t.serviceInfoList.u_logo,alt:""}})]),t._v(" "),s("div",{staticClass:"item_text"},[s("div",{staticClass:"item_text_title"},[s("span",[t._v(t._s(t.serviceInfoList.u_name))]),t._v(" "),s("span",{staticClass:"item_icon iconfont",class:0==t.serviceInfoList.u_type?"icon-renzheng fc-green":1==t.serviceInfoList.u_type?"icon-3qiyezhengxin83a638 fc-blue":""})]),t._v(" "),s("div",{staticClass:"item_text_detail"},[s("div",{staticClass:"user_score"},[s("span",[t._v(t._s(t.serviceInfoList.u_score)+"信用分")]),t._v("\n\t\t\t\t\t\t[\n\t\t\t\t\t\t"),s("router-link",{attrs:{to:"/readingguide/15"}},[t._v("信用分规则")]),t._v("\n\t\t\t\t\t\t]\n\t\t\t\t\t")],1),t._v(" "),s("div",{staticClass:"user_distance"},[s("span",{staticClass:"iconfont icon-dingwei2"}),t._v(" "),s("span",[t._v(t._s(t.serviceInfoList.u_distance)+"km")])]),t._v(" "),s("div",{staticClass:"user_hot"},[s("span",{staticClass:"iconfont icon-eye"}),t._v(" "),s("span",[t._v(t._s(t.serviceInfoList.u_hot))])])])])]),t._v(" "),s("div",{staticClass:"service_detail_list w-100 bg-white"},[s("div",[s("span",[t._v("我的兼职")]),t._v(" "),s("span",[t._v(t._s(t.serviceInfoList.u_demand))])]),t._v(" "),s("div",[s("span",[t._v("订单酬金")]),t._v(" "),s("span",{staticClass:"fc-red"},[t._v(t._s(t.serviceInfoList.u_remuneration))])]),t._v(" "),s("div",[s("span",[t._v("截止日期")]),t._v(" "),s("span",[t._v(t._s(t.serviceInfoList.u_endTime))])]),t._v(" "),s("div",[s("span",[t._v("任务地址")]),t._v(" "),s("span",[t._v(t._s(t.serviceInfoList.u_adress))])])]),t._v(" "),s("div",{staticClass:"service_detail_info bg-white w-100"},[s("span",[t._v("兼职详情")]),t._v(" "),s("span",{staticClass:"detail_txt fc-gray"},[t._v(t._s(t.serviceInfoList.u_detailText))]),t._v(" "),s("div",{staticClass:"detail_imgs w-100"},[s("yd-lightbox",{staticStyle:{width:"100%"}},t._l(t.serviceInfoList.u_imgsURL,function(t,e){return s("yd-lightbox-img",{key:e,staticClass:"img",attrs:{src:t}})}),1)],1)]),t._v(" "),s("div",{staticClass:"mt-3 bg-white"},[s("div",{staticClass:"warn-parent"},[s("div",{staticClass:"first-ch"},[s("yd-icon",{attrs:{name:"warn-outline",size:"2rem",color:"#ff685d"}})],1),t._v(" "),s("div",{staticClass:"last-ch fc-gray"},[s("span",[t._v("警示：以招聘为名收取培训费用、提供培训贷款，或在录用过\n\t\t\t\t\t\t程中需体检、服装、押金登费用的，都属于违法行为。\n\t\t\t\t\t\t一经发现，请\n\t\t\t\t\t\t"),s("router-link",{staticClass:"warn-link",attrs:{to:"/report/demands/"+t.dataId}},[t._v("\n\t\t\t\t\t\t\t立即举报\n\t\t\t\t\t\t")]),t._v("\n\t\t\t\t\t\t，并向当地公安机关报案")],1)])])]),t._v(" "),s("div",{staticClass:"service_footer shadow-dark w-100"},[s("a",{staticClass:"bg-white text-center",attrs:{href:"javascript:;"},on:{click:function(e){return e.preventDefault(),t.do_chat()}}},[s("span",{staticClass:"iconfont icon-kefu"}),t._v(" "),s("span",{staticClass:"fw-6 fm-1"},[t._v("在线沟通")])]),t._v(" "),s("a",{staticClass:"bg-blue",on:{click:function(e){return e.preventDefault(),t.rightOff(e)}}},[s("span",{staticClass:"fc-white fm-2 fw-6"},[t._v("立即抢单")])])])]):t._e()])},staticRenderFns:[]};var r=s("VU/8")(n,o,!1,function(t){s("zgcO")},"data-v-cc709114",null);e.default=r.exports},zgcO:function(t,e){}});