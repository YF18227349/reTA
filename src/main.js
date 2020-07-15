// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App";
import "babel-polyfill";
import Es6Promise from "es6-promise";
import router from "./router";

// import ElementUI from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

import $ from "jquery";

import "../static/js/appback.js";
// import "../static/js/bignumber-8.1.1/bignumber.js";
import {BigNumber} from 'bignumber.js'


// import wechatAuth from '../static/js/wxlogin.js'//微信登录插件
// const qs = require('qs');

// Vue.use(wechatAuth, {appid: XXXXXXXXX});


import "../static/scss/tn-scss.css";
import "../static/scss/xreplace.css";
import "./assets/icon/iconfont.css";
import "./assets/keyboard/iconfont.css";

import "./assets/icon/newIcon/iconfont.css";

// import touch from 'vue-directive-touch';
// Vue.use(touch);

// import VuePageStack from 'vue-page-stack';
// Vue.use(VuePageStack, { router }); 

import MyMap from "vue-baidu-map";
Vue.use(MyMap, {
	ak: "cGMtkqYUtOCq367prkYSVky3TXVgU0kD"
})

import VueAMap from "vue-amap";
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
	key: "ff0b2e725feafdb5fc92216c3830956a",
	plugin: [
		'AMap.Autocomplete',
		'AMap.PlaceSearch',
		'AMap.Scale',
		'AMap.OverView',
		'AMap.ToolBar',
		'AMap.MapType',
		'AMap.PolyEditor',
		'AMap.CircleEditor',
		'AMap.Geolocation',
		// 'AMap.Autocomplete',
		// 'AMap.Scale',
		// 'AMap.OverView',
		// 'AMap.ToolBar',
		// 'AMap.MapType',
		// 'AMap.PolyEditor',
		// 'AMap.CircleEditor',
		// "Geocoder",
	],
	v: '1.4.4',
	// uiVersion: '1.0.11' // 版本号
});


Es6Promise.polyfill()


import YDUI from "vue-ydui";
Vue.use(YDUI)
/* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import "vue-ydui/dist/ydui.rem.css";
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */
import "vue-ydui/dist/ydui.px.css";
import "vue-ydui/dist/ydui.base.css";

//按钮组件
import { Button, ButtonGroup } from 'vue-ydui/dist/lib.rem/button';
/* 使用px：import {Button, ButtonGroup} from 'vue-ydui/dist/lib.px/button'; */
Vue.component(Button.name, Button);
Vue.component(ButtonGroup.name, ButtonGroup);

//自定义按钮
// import SelfButton from "@/components/sub/Button.vue";
// Vue.component(SelfButton.name,SelfButton);

//表单组件
import { CellGroup, CellItem } from 'vue-ydui/dist/lib.rem/cell';
/* 使用px：import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell'; */
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);

//图标组件
import { Icons } from 'vue-ydui/dist/lib.rem/icons';
/* 使用px：import {Icons} from 'vue-ydui/dist/lib.px/icons'; */
Vue.component(Icons.name, Icons);

//网格
import { GridsGroup, GridsItem } from 'vue-ydui/dist/lib.rem/grids';
/* 使用px：import {GridsItem, GridsGroup} from 'vue-ydui/dist/lib.px/grids'; */
Vue.component(GridsGroup.name, GridsGroup);
Vue.component(GridsItem.name, GridsItem);

//头部导航
import { NavBar, NavBarBackIcon, NavBarNextIcon } from 'vue-ydui/dist/lib.rem/navbar';
/* 使用px：import {NavBar, NavBarBackIcon, NavBarNextIcon} from 'vue-ydui/dist/lib.px/navbar'; */
Vue.component(NavBar.name, NavBar);
Vue.component(NavBarBackIcon.name, NavBarBackIcon);
Vue.component(NavBarNextIcon.name, NavBarNextIcon);

//底部导航
import { TabBar, TabBarItem } from 'vue-ydui/dist/lib.rem/tabbar';
/* 使用px：import {TabBar, TabBarItem} from 'vue-ydui/dist/lib.px/tabbar'; */
Vue.component(TabBar.name, TabBar);
Vue.component(TabBarItem.name, TabBarItem);

//多行文本框
import { TextArea } from 'vue-ydui/dist/lib.rem/textarea';
/* 使用px：import {TextArea} from 'vue-ydui/dist/lib.px/textarea'; */
Vue.component(TextArea.name, TextArea);

//输入框
import { Input } from 'vue-ydui/dist/lib.rem/input';
/* 使用px：import {Input} from 'vue-ydui/dist/lib.px/input'; */
Vue.component(Input.name, Input);

//开关
import { Switch } from 'vue-ydui/dist/lib.rem/switch';
/* 使用px：import {Switch} from 'vue-ydui/dist/lib.px/switch'; */
Vue.component(Switch.name, Switch);

//单选
import { Radio, RadioGroup } from 'vue-ydui/dist/lib.rem/radio';
/* 使用px：import {Radio, RadioGroup} from 'vue-ydui/dist/lib.px/radio'; */
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);

//多选
import { CheckBox, CheckBoxGroup } from 'vue-ydui/dist/lib.rem/checkbox';
/* 使用px：import {CheckBox, CheckBoxGroup} from 'vue-ydui/dist/lib.px/checkbox'; */
Vue.component(CheckBox.name, CheckBox);
Vue.component(CheckBoxGroup.name, CheckBoxGroup);

//时间轴
import { TimeLine, TimeLineItem } from 'vue-ydui/dist/lib.rem/timeline';
/* 使用px：import {TimeLine, TimeLineItem} from 'vue-ydui/dist/lib.px/timeline'; */
Vue.component(TimeLine.name, TimeLine);
Vue.component(TimeLineItem.name, TimeLineItem);

//步骤条
import { Step, StepItem } from 'vue-ydui/dist/lib.rem/step';
/* 使用px：import {Step, StepItem} from 'vue-ydui/dist/lib.px/step'; */
Vue.component(Step.name, Step);
Vue.component(StepItem.name, StepItem);

//提示框
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
/* 使用px：import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.px/dialog'; */
Vue.prototype.$dialog = {
	confirm: Confirm,
	alert: Alert,
	toast: Toast,
	notify: Notify,
	loading: Loading,
};

//图片轮播
import { Slider, SliderItem } from 'vue-ydui/dist/lib.rem/slider';
/* 使用px：import {Slider, SliderItem} from 'vue-ydui/dist/lib.px/slider'; */
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);

//进度条
import { ProgressBar } from 'vue-ydui/dist/lib.rem/progressbar';
/* 使用px：import {ProgressBar} from 'vue-ydui/dist/lib.px/progressbar'; */
Vue.component(ProgressBar.name, ProgressBar);

//上拉菜单
import { ActionSheet } from 'vue-ydui/dist/lib.rem/actionsheet';
/* 使用px：import {ActionSheet} from 'vue-ydui/dist/lib.px/actionsheet'; */
Vue.component(ActionSheet.name, ActionSheet);

//选项卡
import { Tab, TabPanel } from 'vue-ydui/dist/lib.rem/tab';
/* 使用px：import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell'; */
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);

//滚动选项卡
import { ScrollTab, ScrollTabPanel } from 'vue-ydui/dist/lib.rem/scrolltab';
/* 使用px：import {ScrollTab, ScrollTabPanel} from 'vue-ydui/dist/lib.px/scrolltab'; */
Vue.component(ScrollTab.name, ScrollTab);
Vue.component(ScrollTabPanel.name, ScrollTabPanel);

//数字加减
import { Spinner } from 'vue-ydui/dist/lib.rem/spinner';
/* 使用px：import {Spinner} from 'vue-ydui/dist/lib.px/spinner'; */
Vue.component(Spinner.name, Spinner);

//发送验证码
import { SendCode } from 'vue-ydui/dist/lib.rem/sendcode';
/* 使用px：import {SendCode} from 'vue-ydui/dist/lib.px/sendcode'; */
Vue.component(SendCode.name, SendCode);

//省市县级联
import { CitySelect } from 'vue-ydui/dist/lib.rem/cityselect';
/* 使用px：import {CitySelect} from 'vue-ydui/dist/lib.px/cityselect'; */
Vue.component(CitySelect.name, CitySelect);

//滚动加载
import { InfiniteScroll } from 'vue-ydui/dist/lib.rem/infinitescroll';
/* 使用px：import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll'; */
Vue.component(InfiniteScroll.name, InfiniteScroll);

//下拉刷新
import { PullRefresh } from 'vue-ydui/dist/lib.rem/pullrefresh';
/* 使用px：import {PullRefresh} from 'vue-ydui/dist/lib.px/pullrefresh'; */
Vue.component(PullRefresh.name, PullRefresh);

//时间倒计时
import { CountDown } from 'vue-ydui/dist/lib.rem/countdown';
/* 使用px：import {CountDown} from 'vue-ydui/dist/lib.px/countdown'; */
Vue.component(CountDown.name, CountDown);

//评分
import { Rate } from 'vue-ydui/dist/lib.rem/rate';
/* 使用px：import {Rate} from 'vue-ydui/dist/lib.px/rate'; */
Vue.component(Rate.name, Rate);

//弹窗
import { Popup } from 'vue-ydui/dist/lib.rem/popup';
/* 使用px：import {Popup} from 'vue-ydui/dist/lib.px/popup'; */
Vue.component(Popup.name, Popup);

//滚动公告
import { RollNotice, RollNoticeItem } from 'vue-ydui/dist/lib.rem/rollnotice';
/* 使用px：import {RollNotice, RollNoticeItem} from 'vue-ydui/dist/lib.px/rollnotice'; */
Vue.component(RollNotice.name, RollNotice);
Vue.component(RollNoticeItem.name, RollNoticeItem);

//折叠面板
import { Accordion, AccordionItem } from 'vue-ydui/dist/lib.rem/accordion';
/* 使用px：import {Accordion, AccordionItem} from 'vue-ydui/dist/lib.px/accordion'; */
Vue.component(Accordion.name, Accordion);
Vue.component(AccordionItem.name, AccordionItem);

//时间组件
import { DateTime } from 'vue-ydui/dist/lib.rem/datetime';
/* 使用px：import {DateTime} from 'vue-ydui/dist/lib.px/datetime'; */
Vue.component(DateTime.name, DateTime);

//图片预览
import { LightBox, LightBoxImg, LightBoxTxt } from 'vue-ydui/dist/lib.rem/lightbox';
/* 使用px：import {Accordion, AccordionItem} from 'vue-ydui/dist/lib.px/accordion'; */
Vue.component(LightBox.name, LightBox);
Vue.component(LightBoxImg.name, LightBoxImg);
Vue.component(LightBoxTxt.name, LightBoxTxt);

//多选列表
import { CheckList, CheckListItem } from 'vue-ydui/dist/lib.rem/checklist';
/* 使用px：import {CheckList, CheckListItem} from 'vue-ydui/dist/lib.px/checklist'; */
Vue.component(CheckList.name, CheckList);
Vue.component(CheckListItem.name, CheckListItem);

//搜索框
import { Search } from 'vue-ydui/dist/lib.rem/search';
/* 使用px：import {Search} from 'vue-ydui/dist/lib.px/search'; */
Vue.component(Search.name, Search);

//滚动导航
import { ScrollNav, ScrollNavPanel } from 'vue-ydui/dist/lib.rem/scrollnav';
/* 使用px：import {ScrollNav, ScrollNavPanel} from 'vue-ydui/dist/lib.px/scrollnav'; */
Vue.component(ScrollNav.name, ScrollNav);
Vue.component(ScrollNavPanel.name, ScrollNavPanel);

import VueTouch from "vue-touch";
Vue.use(VueTouch, {
	name: "v-touch"
});



Vue.config.productionTip = false


import Vuex from "vuex"
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		submit_toast: {
			show: false,
			status: false,
			value: false,
			opt: () => { }
		},
		loading_frame: {
			show: false,
			mes: '',
			color: '',
			font: null,
			status: true
		},
		main_load: {
			show: false
		},
		alert: {
			alert: false,
			mes: '',
			cancel: false,
			value: false,
			opt: () => { }
		},
		toast: {
			show: false,
			mes: '',
			icon: '',
			timeout: null,
			postion: 'center'
		},
		load_plate: {
			show: false,
			mes: '',
			color: '',
			font: null
		},
		footer_tabbar_code: 0,
		header_title: '',
		bg_header: '#fff',
		fc_header: '#333',
		right_fc_header: '',
		left_fc_header: '',
		msgDataList:[]
	},
	mutations: {

		msgDataListChange(state, arr) {
			state.msgDataList = arr;
		},

		footTabbarChange(state, x) {
			state.footer_tabbar_code = x
		},
		setHeaderStyle(state, params) {
			state.header_title = params.txt;
			if (params.type == 0) {
				state.bg_header = '#fff';
				state.fc_header = '#333';
				state.right_fc_header = '#999999';
				state.left_fc_header = '#999999'
			} else if (params.type == 1) {
				state.bg_header = '#2f9bfe';
				state.fc_header = '#fff';
				state.right_fc_header = '#fff';
				state.left_fc_header = '#fff'
			} else {
				state.bg_header = '#fff';
				state.fc_header = '#333';
				state.right_fc_header = '#999999';
				state.left_fc_header = '#999999'
			}
		}
		// addCount(state) {
		//   state.carCount++
		// },
		// subCount(state) {
		//   state.carCount--
		// }
	},
	getters: {
		// optCartCount: function (state) {
		//   console.log(state.carCount)
		//   return state.carCount;
		// }
	},

})



//过滤器
Vue.filter("addrHandle",function(value){  //地址过滤
	var val = value.substring(2);
	var len = val.length;
	if(len>16){
		val = val.substring(0,15)+"...";
		return val;
	}else{
		return value;
	};
});

Vue.filter("headerHidden",function(value){  //标题过滤器
	var len = value.length;
	if(len>10){  //10 => 过滤长度
		var val = value.substr(0,11);
		return `${val}...`;
	}else{
		return value;
	};
});

Vue.filter("titleHidden",function(value){  //标题过滤器
	var len = value.length;
	if(len>6){  //10 => 过滤长度
		var val = value.substr(0,7);
		return `${val}...`;
	}else{
		return value;
	};
});

Vue.filter('contentHidden',function(value){
	var len = value.length;
	if(len>75){  //10 => 过滤长度
		var val = value.substr(0,76);
		return `${val}...`;
	}else{
		return value;
	};
})



//使用公共函数文件
/* eslint-disable no-new */
import global_ from "./config/global"; //引用公共变量
Vue.prototype.Global = global_;

import GlobalFunction from "./config/global_function" //引用公共方法
Vue.use(GlobalFunction, {
	store: store,
	router: router
})

//webIm配置
import WebImConfig from "./assets/imConfig/webim.main";
Vue.prototype.$imConn = WebImConfig.conn;
Vue.prototype.$imOption = WebImConfig.options;
Vue.prototype.$webim = WebImConfig.WEB_IM;


//引入axios库 main.js
import axios from "axios"
//修改配置信息 跨域保存session值!!!!
axios.defaults.withCredentials = true
//注册组件
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data;charset=utf-8';  //process-Data
Vue.prototype.axios = axios;


// http request 拦截器
let HTTPNUM = 0 ;
let loading;

axios.interceptors.request.use(
	config => {
		if (HTTPNUM == 0) {
		}
		HTTPNUM ++;
		return config;
	},
	error => {
		return Promise.reject(err);
	}
);

// 响应拦截器
axios.interceptors.response.use(
	response => {
		HTTPNUM --;
		if (HTTPNUM == 0) {
		}

		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	// 服务器状态码不是200的情况
	error => {
		HTTPNUM --;
		if (HTTPNUM == 0) {
		}
		if (error.response.status) {
			switch (error.response.status) {
				// 401: 未登录
				// 未登录则跳转登录页面，并携带当前页面的路径
				// 在登录成功后返回当前页面，这一步需要在登录页操作。
				case 401:
					setTimeout(() => {
						router.replace({
							path: '/login',
							query: ''
						});
						// 清除token
						localStorage.removeItem('user_info');
						// store.commit('loginSuccess', null);
					}, 1000);
					break;
				// 403 token过期
				// 登录过期对用户进行提示
				// 清除本地token和清空vuex中token对象
				// 跳转登录页面
				case 403:
					// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
					setTimeout(() => {
						router.replace({
							path: '/login',
							query: ''
						});
						// 清除token
						localStorage.removeItem('user_info');
						// store.commit('loginSuccess', null);
					}, 1000);
					break;
				// 404请求不存在
				case 404:
					setTimeout(() => {
						router.replace({
							path: '/login',
							query: ''
						});
						// 清除token
						localStorage.removeItem('user_info');
						// store.commit('loginSuccess', null);
					}, 1000);
					break;
				// 其他错误，直接抛出错误提示
				default:
			}
			return Promise.reject(error.response);
		}
	}
);


// 基于非基于帐户的功能进行重定向更改，已经转移至router/index.js中
// 使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
// 	const role = localStorage.getItem('user_info');
// 	if(to.path === '/login') return next();
// 	if(to.path === '/register_select/app') return next();
// 	if(to.path === '/phoneLogin') return next();
// 	if(to.path === '/back_password') return next();
// 	if(to.path === '/readingguide/2') return next();
// 	if(to.path === '/readingguide/11') return next();
// 	if(to.path === '/vcode') return next();
// 	if(to.path === '/regPhone/0') return next();
// 	if(to.path === '/regPhone/1') return next();
// 	if(to.path === '/vcode/reg') return next();
// 	if(to.path === '/vcode/login') return next();
// 	if(to.path === '/vcode/getpass') return next();
// 	if(!role) return next('/login');
// 	next();
// })



// router.beforeEach((to, from, next) => {
// 	if (store.state.loginStatus == 0) {
// 		//微信未授权登录跳转到授权登录页面
// 		let url = window.location.href;
// 		//解决重复登录url添加重复的code与state问题
// 		let parseUrl = qs.parse(url.split('?')[1]);
// 		let loginUrl;
// 		if (parseUrl.code && parseUrl.state) {
// 			delete parseUrl.code;
// 			delete parseUrl.state;
// 			loginUrl = `${url.split('?')[0]}?${qs.stringify(parseUrl)}`;
// 		} else {
// 			loginUrl = url;
// 		}
// 		wechatAuth.redirect_uri = loginUrl;
// 		store.dispatch('setLoginStatus', 1);
// 		window.location.href = wechatAuth.authUrl
// 	} else if (store.state.loginStatus == 1) {
// 		try {
// 			wechatAuth.returnFromWechat(to.fullPath);
// 		} catch (err) {
// 			store.dispatch('setLoginStatus', 0)
// 			next()
// 		}
// 		store.dispatch('loginWechatAuth', wechatAuth.code).then((res) => {
// 			if (res.status == 1) {
// 				store.dispatch('setLoginStatus', 2)
// 			} else {
// 				store.dispatch('setLoginStatus', 0)
// 			}
// 			next()
// 		}).catch((err) => {
// 			next()
// 		})
// 	} else {
// 		next()
// 	}
// });



new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
}).$mount('#app')
