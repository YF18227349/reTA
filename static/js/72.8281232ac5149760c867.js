webpackJsonp([72],{NxBa:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("mvHQ"),s=i.n(a),n=i("BO1k"),o=i.n(n),l={data:function(){return{loadMord:"正在为您拼命加载...",param:this.initPage(),noDataShow:!1,load_show:!1,token:"",location_city:"",types:null,lon:null,lat:null,cityId:"",sort:1,classType:"",newTime:4,modal_show:!1,length:10,page:0,modelDataList:[],tab_code:0,open:!1,tabShowList:[],toastItems:[],openItems:[],headerTabbarLsit:[{title:"兼职",sort:"",rule:"",classType:"",count:null,bannerId:5},{title:"技能",sort:"",rule:"",classType:"",count:null,bannerId:5},{title:"岗位",companyId:"",condition:"",hot:"",count:null,bannerId:5},{title:"简历",positionId:"",condition:"",hot:"",count:null,bannerId:6}],toastBtnList:[[{title:"智能排序",label:[{value:"价格升序",id:1},{value:"价格倒序",id:2},{value:"信用分升序",id:3},{value:"信用分倒序",id:4}]},{title:"专业分类",url:"/demand_group/1"},{title:"时间",label:[{value:"当天",id:1},{value:"三天",id:2},{value:"一周",id:3},{value:"一月",id:4}]}],[{title:"智能排序",label:[{value:"价格高",id:5},{value:"价格低",id:6},{value:"信用分高",id:3},{value:"信用分低",id:4}]},{title:"专业分类",url:"/demand_group/2"},{title:"时间",label:[{value:"当天",id:1},{value:"三天",id:2},{value:"一周",id:3},{value:"一月",id:4}]}],[{title:"推荐",label:[{value:"推荐",id:1},{value:"最新",id:2}]},{title:"公司",url:"",require:[{title:"企业性质",isNum:0,label:["全部","小微企业","中小企业","大型企业","国企"]},{title:"企业规模",isNum:0,label:["全部","0-20人","20-99人","100-499人","500-999人","1000-9999人","10000万人以上"]},{title:"人员规模",isNum:0,label:["全部","0-20人","20-99人","100-499人","500-999人","1000-9999人","10000万人以上"]},{title:"行业性质",isNum:0,label:["全部","电子商务","游戏","广告营销","数据服务","网站建设","软件开发","移动端开发"]}]},{title:"要求",require:[{title:"学历",isNum:0,label:[]},{title:"经验",isNum:0,label:["全部","应届生","1年以内","1-3年","3-5年","5-10年","10年以上"]},{title:"薪水",isNum:0,label:[]}]}],[{title:"推荐",label:[{value:"推荐",id:1},{value:"最新",id:2}]},{title:"行业分类",url:"/demand_group/4"},{title:"要求",require:[{title:"学历",isNum:0,label:[]},{title:"经验",isNum:0,label:["全部","应届生","1年以内","1-3年","3-5年","5-10年","10年以上"]},{title:"性别",isNum:0,label:["男","女"]},{title:"薪水",isNum:0,label:[]}]}]],info_demand_list:[],info_skill_list:[],interviewerList:[],resumeInfoList:[],bannerInfoList:[],infoHeader:{height:!0},toastHeight:{height:!0,top:!0},informationImage:{top:!0},clearInfoFixed:{height:!0},infoRid:null,isImage:!1,Img:""}},mounted:function(){var t=document.documentElement.clientHeight;this.infoHeader.height=.07*t+"px",this.toastHeight.height=.07*t+"px",this.toastHeight.top=.07*t+120+"px",this.informationImage.top=.07*t+"px";var e=this.getCache("NULL_SALARY_IMG");this.Img=this.str2json(e).val},updated:function(){this.save_page_info(),this.autoFiexd()},created:function(){this.selfMainLoadOpend(),this.tabShowList=this.toastBtnList[0],this.footer_tabbar_code=2;var t=this.getUserInfo();if(t.location)var e=t.location;else{var i=this.getCache("location");e=i=JSON.parse(i)}this.lon=e.lon,this.lat=e.lat,this.cityId=e.cityId,this.location_city=e.city,this.token=t.token,this.init()},methods:{autoFiexd:function(){var t=this.$refs.getHeaderHeight.offsetHeight,e=this.$refs.getToastHeight.offsetHeight;if(this.isImage){var i=this.$refs.getImageHeight.offsetHeight;this.toastHeight.top=t+i+"px",this.clearInfoFixed.height=t+e+i+"px"}else this.toastHeight.top=t+"px",this.clearInfoFixed.height=t+e+"px"},init:function(){var t=this;this.getPageInfo(),this.getDataInfo(),this.getUserInfos(),this.save_page_info(),this.removeCache(),this.__Sleep(function(e){t.selfMainLoadClosed()},1e3)},getDataInfo:function(){var t=this;this.__initAction("Tools-getConfigData",{token:this.getToken()},function(e,i){if(1==i){var a=e.data.getList,s=a.education.value;t.toastBtnList[2][2].require[0].label=s,t.toastBtnList[3][2].require[0].label=s;var n=a.resumeMoney.value;t.toastBtnList[3][2].require[3].label=n;var o=a.salary.value;t.toastBtnList[2][2].require[2].label=o}else t._msg(e.info)})},getUserInfos:function(){var t=this.getCache("userInfoExt",2);t&&(this.infoRid=t.rid)},getPageInfo:function(){var t=this.getSelectData();if(t||(t=this.getSelectData()),!t)return this._log("未定义部分信息"),!1;if(t.pageInfo&&t.pageInfo.information&&t.pageInfo.information.pageTabCode&&(this.tab_code=t.pageInfo.information.pageTabCode,this.types=this.tab_code+1),t.select_city){var e=t.select_city;this.lon=e.lng,this.lat=e.lat,this.cityId=e.city_id,this.location_city=e.city_name}if(t.info_demand&&(e=t.info_demand.data1)){var i="",a=!0,s=!1,n=void 0;try{for(var l,r=o()(e);!(a=(l=r.next()).done);a=!0){i+=l.value.id+","}}catch(t){s=!0,n=t}finally{try{!a&&r.return&&r.return()}finally{if(s)throw n}}i=i.substring(0,i.length-1),this.classType=i}var d=this.tab_code;this.select_tab(d)},select_tab:function(t){var e=this;this.selfLoadOpend({mes:"",font:40,status:!0,color:"fc-blue"}),this.param=this.initPage();var i=this.token,a=this.headerTabbarLsit;this.tab_code=t,this.types=t+1,this.tabShowList=this.toastBtnList[t];var s=this.param.page,n=this.param.length,o=this.types,l=this.tab_code,r=this.lon,d=this.lat,c=this.cityId,h=a[l].sort,f=(a[l].classType,a[l].newTime),u=a[l].companyId,m=a[l].hot,_=a[l].condition,v=a[l].positionId,p=this.getParams().kw,g={token:i,page:s,length:n,types:o,lon:r,lat:d,cityId:c,sort:h,newTime:f,positionId:v,companyId:u,hot:m,condition:_};p&&(g.keyword=p);var b=[];0==t?(this.isImage=!1,this.info_demand_list=[],b=this.info_demand_list):1==t?(this.isImage=!1,this.info_skill_list=[],b=this.info_skill_list):2==t?(this.isImage=!0,setTimeout(function(){e.isImage=!0,setTimeout(function(){e.autoFiexd()},300)},600),this.interviewerList=[],b=this.interviewerList):3==t&&(this.isImage=!0,this.resumeInfoList=[],setTimeout(function(){e.isImage=!0,setTimeout(function(){e.autoFiexd()},300)},600),b=this.resumeInfoList),this.getDataInfoList("Hotnews-preview",g,o,b),this.getBannerImage(t)},getDataInfoList:function(t,e,i,a){var s=this;this.loadMord="",this.__initAction(t,e,function(t,e){if(1==e){s.selfLoadClosed(),s.selfMainLoadClosed();var n=t.data;if(n){var l=s.tab_code;switch(s.headerTabbarLsit[l].count=t.count,i){case 1:var r=!0,d=!1,c=void 0;try{for(var h,f=o()(n);!(r=(h=f.next()).done);r=!0){var u=h.value;(B={}).title=u.title,B.name=u.lastName,B.logo=u.portrait,B.imgs=u.prices,B.hot=u.view,B.lng=u.lon,B.lat=u.lat,B.distance=u.distance,B.time=u.create_time,B.detail=u.infos,B.id=u.id,B.salary=u.serviceDatd,a.push(B)}}catch(t){d=!0,c=t}finally{try{!r&&f.return&&f.return()}finally{if(d)throw c}}break;case 2:var m=!0,_=!1,v=void 0;try{for(var p,g=o()(n);!(m=(p=g.next()).done);m=!0){var b=p.value;(B={}).title=b.title,B.name=b.lastName,B.logo=b.portrait,B.imgs=b.images,B.hot=b.view,B.lng=b.lon,B.lat=b.lat,B.distance=b.distance,B.time=b.create_time,B.detail=b.infos,B.id=b.id,B.salary=b.price,a.push(B)}}catch(t){_=!0,v=t}finally{try{!m&&g.return&&g.return()}finally{if(_)throw v}}break;case 3:var y=!0,I=!1,w=void 0;try{for(var L,k=o()(n);!(y=(L=k.next()).done);y=!0){var C=L.value;(B={}).title=C.title,B.name=C.lastName,B.logo=C.portrait,B.addr=C.addressInfo,B.hot=C.view,B.lng=C.lon,B.lat=C.lat,B.position="人事经理",B.distance=C.distance,B.time=C.create_time,B.id=C.id,B.salary=C.prices,B.education=C.education,B.experience=C.exp,a.push(B)}}catch(t){I=!0,w=t}finally{try{!y&&k.return&&k.return()}finally{if(I)throw w}}break;case 4:var x=!0,T=!1,D=void 0;try{for(var N,H=o()(n);!(x=(N=H.next()).done);x=!0){var B,M=N.value;(B={}).post=M.resumeIndustry,B.name=M.consignee,B.logo=M.portrait,B.hot=M.view,B.lng=M.lon,B.lat=M.lat,B.time=M.create_time,B.detail=M.infos,B.id=M.id,B.salary=M.salary,B.education=M.education,B.experience=M.Working+"年",a.push(B)}}catch(t){T=!0,D=t}finally{try{!x&&H.return&&H.return()}finally{if(T)throw D}}break;default:s._log(data)}}"1000000000"==t.code&&(s.loadMord="暂无数据..."),s.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad")}else-1==e&&s._msg(t.info);t.data&&0==t.data.length&&(s._msg("暂无相关数据!"),setTimeout(function(){s.$router.back(-2)},500))})},getBannerImage:function(t){var e=this,i=this.token,a=this.headerTabbarLsit[t].bannerId;this.__initAction("Banner-getData",{token:i,type:a},function(t,i){1==i&&(e.bannerInfoList=[],e.bannerInfoList=t.data)})},do_show:function(t){var e=this.tab_code;0==t?(this.modal_show=!0,this.modelDataList=this.toastBtnList[e][t].label):2==t&&(0==this.tab_code||1==this.tab_code?(this.modal_show=!0,this.modelDataList=this.toastBtnList[e][t].label):2!=this.tab_code&&3!=this.tab_code||(this.open=!0,this.openItems=this.toastBtnList[e][t].require))},do_open:function(){this.open=!1},select_item:function(t,e){this.openItems[t].isNum=e},select_reset:function(){var t=!0,e=!1,i=void 0;try{for(var a,s=o()(this.openItems);!(t=(a=s.next()).done);t=!0){a.value.isNum=0}}catch(t){e=!0,i=t}finally{try{!t&&s.return&&s.return()}finally{if(e)throw i}}},click_tab2:function(t){t?this.$router.push(t):(this.open=!0,this.openItems=this.toastBtnList[this.tab_code][1].require)},modal_cancel:function(){this.modal_show=!1},save_page_info:function(){var t=this.tab_code,e=this.getSelectData();e||(e={}),e.pageInfo||(e.pageInfo={}),e.pageInfo.information||(e.pageInfo.information={}),e.pageInfo.information.pageTabCode=t,this.setCache("select_data",s()(e))},select_value:function(t){t&&console.log(t),this.modal_show=!1},do_jump:function(t){t.code=this.tab_code,this.$router.push({path:"/servicedetail",query:t})},loadList:function(){var t=this,e=this.tab_code,i=this.headerTabbarLsit[e].count,a=Math.ceil(i/this.param.length),s=this.param.page+1;if(a==s)return this.selfLoadOpend({mes:"没有更多数据了",status:!1}),void setTimeout(function(){t.selfLoadClosed()},1500);this.selfLoadOpend({mes:"",color:"fc-blue",font:30,status:!0}),this.getMore(s)},getMore:function(t){var e=this.token,i=this.headerTabbarLsit,a=t,s=this.param.length,n=this.types,o=this.tab_code,l=this.lon,r=this.lat,d=this.cityId,c=i[o].sort,h=(i[o].classType,i[o].newTime),f=i[o].companyId,u=i[o].hot,m=i[o].condition,_=i[o].positionId,v=this.getParams().kw,p={token:e,page:a,length:s,types:n,lon:l,lat:r,cityId:d,sort:c,newTime:h,positionId:_,companyId:f,hot:u,condition:m};v&&(p.keyword=v);var g=[];0==o?g=this.info_demand_list:1==o?g=this.info_skill_list:2==o?g=this.interviewerList:3==o&&(g=this.resumeInfoList),this.getMoreDataInfoList("Hotnews-preview",p,n,g)},getMoreDataInfoList:function(t,e,i,a){var s=this;this.token;this.__initAction(t,e,function(t,e){if(1==e){s.selfLoadClosed();var n=t.data;if(n){var l=!0,r=!1,d=void 0;try{for(var c,h=o()(n);!(l=(c=h.next()).done);l=!0){var f=c.value,u={};1==i&&(u.title=f.title,u.name=f.lastName,u.logo=f.portrait,u.imgs=f.prices,u.hot=f.view,u.lng=f.lon,u.lat=f.lat,u.distance=f.distance,u.time=f.create_time,u.detail=f.infos,u.id=f.id,u.salary=f.serviceDatd,a.push(u)),2==i&&(u.title=f.title,u.name=f.lastName,u.logo=f.portrait,u.imgs=f.images,u.hot=f.view,u.lng=f.lon,u.lat=f.lat,u.distance=f.distance,u.time=f.create_time,u.detail=f.infos,u.id=f.id,u.salary=f.price,a.push(u)),3==i&&(u.title=f.title,u.name=f.lastName,u.logo=f.portrait,u.addr=f.addressInfo,u.hot=f.view,u.lng=f.lon,u.lat=f.lat,u.position="人事经理",u.distance=f.distance,u.time=f.create_time,u.id=f.id,u.salary=f.prices,u.education=f.education,u.experience=f.exp,a.push(u)),4==i&&(u.post=f.resumeIndustry,u.name=f.consignee,u.logo=f.portrait,u.hot=f.view,u.lng=f.lon,u.lat=f.lat,u.time=f.create_time,u.detail=f.infos,u.id=f.id,u.salary=f.salary,u.education=f.education,u.experience=f.Working+"年",a.push(u))}}catch(t){r=!0,d=t}finally{try{!l&&h.return&&h.return()}finally{if(r)throw d}}}s.param.page++,s.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad"),s.selfLoadClosed()}else s._msg(t.info)})}},destroyed:function(){},computed:{headerbarList:function(){var t=this.infoRid,e=this.headerTabbarLsit.length;return-1==t||1==t||-3==t||3==t?(this.headerTabbarLsit.splice(e-1,1),this.headerTabbarLsit):this.headerTabbarLsit}},components:{"self-info-card":function(){return i.e(137).then(i.bind(null,"R71d"))},"self-post-card":function(){return i.e(136).then(i.bind(null,"tnxh"))},"self-resume-card":function(){return i.e(139).then(i.bind(null,"JK6O"))},"self-load-plate":function(){return i.e(134).then(i.bind(null,"tVVL"))},"self-modal-frame":function(){return i.e(135).then(i.bind(null,"3SGP"))},"self-load-frame":function(){return i.e(133).then(i.bind(null,"3KQ1"))},"self-no-data":function(){return i.e(132).then(i.bind(null,"11mN"))}}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"information w-100"},[i("header",{ref:"getHeaderHeight",staticClass:"info_header bg-white w-100 mb-1",style:t.infoHeader},[i("router-link",{staticClass:"info_header_city",attrs:{to:""}},[i("div",{on:{click:function(e){return t.$router.go(-2)}}},[i("span",{staticClass:"iconfont icon-previewleft fw-7",staticStyle:{"font-size":"20px",color:"#888"}})])]),t._v(" "),i("div",{staticClass:"nav_tab_items"},t._l(t.headerbarList,function(e,a){return i("div",{key:a,staticClass:"tab_item"},[i("a",{staticClass:"item",attrs:{href:"javascript:;"},on:{click:function(e){return e.preventDefault(),t.select_tab(a)}}},[i("span",{class:t.tab_code==a?"selected_item":"unSelected_item"},[t._v(t._s(e.title))])])])}),0),t._v(" "),i("router-link",{staticClass:"info_search",attrs:{to:""}})],1),t._v(" "),i("div",{ref:"getToastHeight",staticClass:"toast_btn_group bg-white w-100",style:t.toastHeight},[i("a",{staticClass:"btn-1",on:{click:function(e){return e.preventDefault(),t.do_show(0)}}},[i("span",[t._v(t._s(t.tabShowList[0].title))]),t._v(" "),i("span",{staticClass:"iconfont icon-arrowdown"})]),t._v(" "),i("a",{staticClass:"btn-2",attrs:{href:"javascript:;"},on:{click:function(e){return t.click_tab2(t.tabShowList[1].url)}}},[i("span",[t._v(t._s(t.tabShowList[1].title))]),t._v(" "),i("span",{staticClass:"iconfont icon-arrowdown"})]),t._v(" "),i("a",{staticClass:"btn-3",on:{click:function(e){return e.preventDefault(),t.do_show(2)}}},[i("span",[t._v(t._s(t.tabShowList[2].title))]),t._v(" "),i("span",{staticClass:"iconfont icon-arrowdown"})])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.bannerInfoList.length&&t.isImage,expression:"bannerInfoList.length && isImage"}],ref:"getImageHeight",staticClass:"information-image",style:t.informationImage},[i("yd-slider",{attrs:{autoplay:"3000"}},t._l(t.bannerInfoList,function(t,e){return i("yd-slider-item",{key:e},[i("a",{attrs:{href:"javacript:;"}},[i("img",{attrs:{src:t.image}})])])}),1)],1),t._v(" "),i("div",{staticClass:"clear_info_fixed",style:t.clearInfoFixed}),t._v(" "),i("yd-infinitescroll",{ref:"infinitescrollDemo",attrs:{callback:t.loadList,"scroll-top":!0}},[0==t.tab_code?i("div",{staticClass:"info_content",attrs:{slot:"list"},slot:"list"},[t._l(t.info_demand_list,function(e,a){return i("router-link",{key:a,staticClass:"cards w-100 bg-white mb-1",attrs:{to:{path:"/service_detail",query:{id:e.id,code:t.tab_code,lng:e.lng,lat:e.lat,path:0}}}},[i("self-info-card",{attrs:{data:e}})],1)}),t._v(" "),t.info_demand_list.length<=0?i("a",{staticClass:"mt-5",attrs:{href:"javascript:;"}},[i("self-no-data",{attrs:{title:t.loadMord,size:"16"}})],1):t._e()],2):t._e(),t._v(" "),1==t.tab_code?i("div",{staticClass:"info_content",attrs:{slot:"list"},slot:"list"},[t._l(t.info_skill_list,function(e,a){return i("router-link",{key:a,staticClass:"cards mb-1 w-100 bg-white",attrs:{to:{path:"/skill_detail",query:{id:e.id,code:t.tab_code,lng:e.lng,lat:e.lat,path:0}}}},[i("self-info-card",{attrs:{data:e}})],1)}),t._v(" "),t.info_skill_list.length<=0?i("a",{staticClass:"mt-5",attrs:{href:"javascript:;"}},[i("self-no-data",{attrs:{title:t.loadMord,size:"16"}})],1):t._e()],2):t._e(),t._v(" "),2==t.tab_code?i("div",{staticClass:"info_content",attrs:{slot:"list"},slot:"list"},[t._l(t.interviewerList,function(t,e){return i("router-link",{key:e,staticClass:"post_info_cards bg-white w-100 mb-1",attrs:{to:/post_info/+t.id}},[i("self-post-card",{staticClass:"bg-white",attrs:{data:t}})],1)}),t._v(" "),t.interviewerList.length<=0?i("a",{staticClass:"mt-5 ifImg",attrs:{href:"javascript:;"}},[i("self-no-data",{attrs:{title:t.loadMord,size:"16"}})],1):t._e()],2):t._e(),t._v(" "),3==t.tab_code?i("div",{staticClass:"info_content",attrs:{slot:"list"},slot:"list"},[t._l(t.resumeInfoList,function(t,e){return i("router-link",{key:e,staticClass:"resume_items w-100 bg-white mb-1",attrs:{to:/resumeinfo/+t.id}},[i("self-resume-card",{attrs:{data:t}})],1)}),t._v(" "),t.resumeInfoList.length<=0?i("a",{staticClass:"mt-5",attrs:{href:"javascript:;"}},[i("self-no-data",{attrs:{title:t.loadMord,size:"16"}})],1):t._e()],2):t._e(),t._v(" "),i("span",{staticClass:"pb-5 pt-5 fc-dark fm-2",attrs:{slot:"doneTip"},slot:"doneTip"})]),t._v(" "),i("self-load-frame"),t._v(" "),i("div",[t.open?i("div",{staticClass:"showToast",on:{click:function(e){return e.preventDefault(),t.do_open()}}}):t._e(),t._v(" "),i("div",{staticClass:"toastText bg-white",class:t.open?"up":"down"},[i("ul",{staticClass:"toastItems"},t._l(t.openItems,function(e,a){return i("li",{key:a,staticClass:"item"},[i("p",{staticClass:"item_title"},[t._v(t._s(e.title))]),t._v(" "),i("div",{staticClass:"item_detail"},t._l(e.label,function(s,n){return i("span",{key:n,staticClass:"item_text pt-1 pb-1 pl-3 pr-3",class:e.isNum==n?"marked":"",attrs:{"data-id":"i"},on:{click:function(e){return t.select_item(a,n)}}},[t._v(t._s(s))])}),0)])}),0),t._v(" "),i("div",{staticClass:"tosatBtn"},[i("a",{staticClass:"btn_reset",attrs:{href:"javascript:;"},on:{click:function(e){return e.preventDefault(),t.select_reset()}}},[t._v("重置")]),t._v(" "),i("a",{staticClass:"btn_done",attrs:{href:"javascript:;"}},[t._v("确定")])])])]),t._v(" "),i("self-modal-frame",{attrs:{modalShow:t.modal_show,dataList:t.modelDataList,code:!0},on:{callBack:t.select_value}})],1)},staticRenderFns:[]};var d=i("VU/8")(l,r,!1,function(t){i("XmD7")},null,null);e.default=d.exports},XmD7:function(t,e){}});