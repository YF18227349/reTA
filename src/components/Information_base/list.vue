<template>
	<div class="information w-100">
		<header class="info_header bg-white w-100 mb-1" :style="infoHeader" ref="getHeaderHeight">
			<router-link to="/city_list" class="info_header_city">
				<div>
					<span class="fs-3 fc-gray title_city fw-5">{{location_city}} </span>
					<span class="city_arrow fc-gray iconfont icon-arrowdown"></span>
				</div>
			</router-link>

			<!-- <div class="info_header_city"></div> -->

			<div class="nav_tab_items">
				<!--   headerTabbarLsit-->
				<div class="tab_item" v-for="(item,i) in headerbarList" :key="i">
					<a href="javascript:;" class="item" @click.prevent="select_tab(i)">
						<span :class="tab_code == i ? 'selected_item':'unSelected_item'">{{item.title}}</span>
					</a>
				</div>
			</div>

			<router-link to="/search" class="info_search">
				<span class="iconfont icon-3 fc-dark fw-5"></span>
			</router-link>
		</header>
		<!-- 轮播图 -->
		<div class="information-image" :style="informationImage" v-if="bannerInfoList.length && isImage" ref="getImageHeight">
			<yd-slider autoplay="0" pagination-color="#dce6ec" pagination-activecolor="white" index="1">
				<yd-slider-item v-for="(item,i) of bannerInfoList" :key="i">
					<router-link :to="`bannerDetail/${item.id}`">
						<img :src="item.image">
					</router-link>
				</yd-slider-item>
			</yd-slider>
			<!-- <img
					src="http://base.sxtian.com/public/uploads/images/banner_data/20190425/31f98d6cd4844138e8ad41aecabced67.png"
					alt
					ref="getImageHeight"
				>-->
		</div>

		<div class="toast_btn_group bg-white w-100" :style="toastHeight" ref="getToastHeight">
			<a class="btn-1" @click.prevent="do_show(0)">
				<span>{{tabShowList[0].title}}</span>
				<span class="iconfont icon-arrowdown"></span>
			</a>
			<a href="javascript:;" class="btn-2" @click="click_tab2(tabShowList[1].url)">
				<span>{{tabShowList[1].title}}</span>
				<span class="iconfont icon-arrowdown"></span>
			</a>
			<a class="btn-3" @click.prevent="do_show(2)">
				<span>{{tabShowList[2].title}}</span>
				<span class="iconfont icon-arrowdown"></span>
			</a>
		</div>

		<div class="clear_info_fixed" :style="clearInfoFixed"></div>
		<!-- 上拉加载 -->
		<!-- :style="{height:(curHeight-50)+'px'}" -->
		<div class="" id="infoEle">
			<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
				<!-- 兼职板块 -->
				<div class="info_content" slot="list" v-if="tab_code == 0">
					<router-link :to="{path:'/service_detail',query:{id:tmp.id,code:tab_code,lng:tmp.lng,lat:tmp.lat,path:0}}" class="cards w-100 bg-white mb-1" v-for="(tmp,i) in info_demand_list" :key="i">
						<self-info-card :data="tmp"></self-info-card>
					</router-link>
					<a class="mt-5" href="javascript:;" v-if="isNuno">
						<!-- <self-no-data :title="loadMord" size="16"></self-no-data> -->
						<img :src="Img">
					</a>
				</div>

				<!-- 技能板块 -->
				<div class="info_content" slot="list" v-if="tab_code == 1">
					<!-- path:0-信息库路径 -->
					<router-link :to="{ path: '/skill_detail', query: {id:tmp.id,code:tab_code,lng:tmp.lng,lat:tmp.lat,path:0}}" class="cards mb-1 w-100 bg-white" v-for="(tmp,i) in info_skill_list" :key="i">
						<self-info-card :data="tmp"></self-info-card>
					</router-link>
					<a class="mt-5" href="javascript:;" v-if="isNuno">
						<!-- <self-no-data :title="loadMord" size="16"></self-no-data> -->
						<img :src="Img">
					</a>
				</div>

				<!-- 岗位板块 -->

				<div class="info_content" slot="list" v-if="tab_code == 2">
					<router-link :to="/post_info/+item.id" class="post_info_cards bg-white w-100 mb-1" v-for="(item,i) in interviewerList" :key="i">
						<self-post-card :data="item" class="bg-white"></self-post-card>
					</router-link>
					<a class="mt-5" href="javascript:;" v-if="isNuno">
						<!-- <self-no-data :title="loadMord" size="16"></self-no-data> -->
						<img :src="Img">
					</a>
				</div>

				<!-- 简历板块 -->
				<div class="info_content" slot="list" v-if="tab_code == 3">
					<router-link :to="/resumeinfo/+item.id" class="resume_items w-100 bg-white mb-1" v-for="(item,i) in resumeInfoList" :key="i">
						<self-resume-card :data="item"></self-resume-card>
					</router-link>
					<a class="mt-5" href="javascript:;" v-if="isNuno">
						<!-- <self-no-data :title="loadMord" size="16"></self-no-data> -->
						<img :src="Img">
					</a>
				</div>

				<span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span>
			</yd-infinitescroll>
		</div>

		<!-- 加载信息提示框 -->
		<!-- <self-load-frame></self-load-frame> -->
		<!-- //底部弹框 -->
		<div>
			<div class="showToast" v-if="open" @click.prevent="do_open()"></div>
			<div class="toastText bg-white" :class="open ?'up':'down'">
				<ul class="toastItems">
					<li class="item" v-for="(item,i) in openItems" :key="i">
						<p class="item_title">{{item.title}}</p>
						<div class="item_detail">
							<span class="item_text pt-1 pb-1 pl-3 pr-3" v-for="(it,j) in item.label" :key="j" data-id="i" :class="item.isNum ==j ? 'marked':''" @click="select_item(i,j)">{{it}}</span>
						</div>
					</li>
				</ul>
				<div class="tosatBtn">
					<a href="javascript:;" class="btn_reset" @click.prevent="select_reset()">重置</a>
					<a href="javascript:;" class="btn_done" @click.prevent="select_sure()">确定</a>
				</div>
			</div>
		</div>
		<!-- 底部莫泰框 -->
		<self-modal-frame :modalShow="modal_show" :dataList="modelDataList" @callBack="select_value" :code="true"></self-modal-frame>
	</div>
</template>

<script>
const LoadFrame = ()=>import("../sub/loading_frame");
const ModalFrame = ()=>import("../sub/modal_frame");

const InfoCard = ()=>import("../sub/info_card");
const PostCard = ()=>import("../sub/post_card");
const ResumeCard = ()=>import("../sub/resume_card");

const location = ()=>import("location");
const LoadPlate = ()=>import("../sub/load_data_plate");

const NoData = ()=>import("../sub/noDataModel.vue");
export default {
	data() {
		return {
			loadMord: '正在为您拼命加载...',
			param: this.initPage(),
			noDataShow: false,
			load_show: false, //loadPlate组件开关
			token: "",
			location_city: "",
			types: null, //选择类型
			lon: null,
			lat: null,
			cityId: "", //城市id
			sort: 1, //排序规则：1价格顺序->2价格倒序->3信用分顺序->4信用分倒序
			classType: "", //专业分类ID
			newTime: 4, //时间查询：1当天  2三天  3一周  4一月
			modal_show: false,
			modelDataList: [],
			tab_code: 0,
			open: false,
			tabShowList: [],
			toastItems: [],
			openItems: [],
			curHeight: document.documentElement.clientHeight,
			headerTabbarLsit: [{
					title: "兼职",
					sort: 0,
					rule: "",
					classType: "",
					count: null,
					bannerId: 5,
					newTime: 4
				},
				{
					title: "技能",
					sort: 0,
					rule: "",
					classType: "",
					count: null,
					bannerId: 5,
					newTime: 4
				},
				{
					title: "岗位",
					companyId: "",
					condition: "",
					hot: "",
					count: null,
					bannerId: 5,
					newTime: 4
				},
				{
					title: "简历",
					positionId: "",
					condition: "",
					hot: "",
					count: null,
					bannerId: 6,
					newTime: 4
				}
			],
			toastBtnList: [
				[{
						title: "智能排序",
						label: [{
								value: "价格升序",
								id: 1
							},
							{
								value: "价格倒序",
								id: 2
							},
							{
								value: "信用分升序",
								id: 3
							},
							{
								value: "信用分倒序",
								id: 4
							}
						]
					},
					{
						title: "专业分类",
						url: "/demand_group/1"
					},
					{
						title: "时间",
						label: [{
								value: "当天",
								id: 1
							},
							{
								value: "三天",
								id: 2
							},
							{
								value: "一周",
								id: 3
							},
							{
								value: "一月",
								id: 4
							}
						]
					}
				],
				[{
						title: "智能排序",
						label: [{
								value: "价格高",
								id: 1
							},
							{
								value: "价格低",
								id: 2
							},
							{
								value: "信用分高",
								id: 3
							},
							{
								value: "信用分低",
								id: 4
							}
						]
					},
					{
						title: "专业分类",
						url: "/demand_group/2"
					},
					{
						title: "时间",
						label: [{
								value: "当天",
								id: 1
							},
							{
								value: "三天",
								id: 2
							},
							{
								value: "一周",
								id: 3
							},
							{
								value: "一月",
								id: 4
							}
						]
					}
				],
				[{
						title: "推荐",
						label: [{
							value: "推荐",
							id: 1
						}, {
							value: "最新",
							id: 2
						}]
					},
					{
						title: "公司",
						url: "",
						require: [{
								title: "企业性质",
								isNum: 0,
								label: ["全部", "小微企业", "中小企业", "大型企业", "国企"]
							},
							{
								title: "企业规模",
								isNum: 0,
								label: [
									"全部",
									"0-20人",
									"20-99人",
									"100-499人",
									"500-999人",
									"1000-9999人",
									"10000万人以上"
								]
							},
							{
								title: "人员规模",
								isNum: 0,
								label: [
									"全部",
									"0-20人",
									"20-99人",
									"100-499人",
									"500-999人",
									"1000-9999人",
									"10000万人以上"
								]
							},
							{
								title: "行业性质",
								isNum: 0,
								label: [
									"全部",
									"电子商务",
									"游戏",
									"广告营销",
									"数据服务",
									"网站建设",
									"软件开发",
									"移动端开发"
								]
							}
						]
					},
					{
						title: "要求",
						require: [{
								title: "学历",
								isNum: 0,
								label: []
							},
							{
								title: "经验",
								isNum: 0,
								label: [
									"全部",
									"应届生",
									"1年以内",
									"1-3年",
									"3-5年",
									"5-10年",
									"10年以上"
								]
							},
							{
								title: "薪水",
								isNum: 0,
								label: []
							}
						]
					}
				],
				[{
						title: "推荐",
						label: [{
							value: "推荐",
							id: 1
						}, {
							value: "最新",
							id: 2
						}]
					},
					{
						title: "行业分类",
						url: "/demand_group/3"
					},
					{
						title: "要求",
						require: [{
								title: "学历",
								isNum: 0,
								label: []
							},
							{
								title: "经验",
								isNum: 0,
								label: [
									"全部",
									"应届生",
									"1年以内",
									"1-3年",
									"3-5年",
									"5-10年",
									"10年以上"
								]
							},
							{
								title: "性别",
								isNum: 0,
								label: ["男", "女"]
							},
							{
								title: "薪水",
								isNum: 0,
								label: []
							}
						]
					}
				]
			],
			info_demand_list: [], //兼职列表数据
			info_skill_list: [], //技能列表数据
			interviewerList: [], //岗位列表
			resumeInfoList: [], //简历列表
			bannerInfoList: [], //轮播图列表
			//样式绑定
			infoHeader: {
				height: true
			},
			toastHeight: {
				height: true,
				top: true
			},
			informationImage: {
				top: true
			},
			clearInfoFixed: {
				height: true
			},
			infoRid: null, //用户类型
			isImage: false, //图片状态
			Img:"",
			isNuno:false
		};
	},
	created() {
		this.delSelectData();
		this.tabShowList = this.toastBtnList[0];
		this.footer_tabbar_code = 2;
		//定义定位信息
		var select_data = this.getCache("select_data", 2);
		var userInfo = this.getCache("user_info", 2);
		if(userInfo) {
			if(!select_data.select_city) {
				let location = this.getCache("location",2);
				this.lon = location.lon;
				this.lat = location.lat;
				this.cityId = location.cityId;
				this.location_city = location.city;
				this.token = userInfo.token;
				this.init();
			}else {
				this.lon = select_data.select_city.lng;
				this.lat = select_data.select_city.lat;
				this.cityId = select_data.select_city.city_id;
				this.location_city = select_data.select_city.city_name;
				this.token = userInfo.token;
				this.init();
			}
		}else {
			if(!select_data.select_city) {
				let location = this.getCache("location",2);
				this.lon = location.lon;
				this.lat = location.lat;
				this.cityId = location.cityId;
				this.location_city = location.city;
				
				this.getPageInfo();
				this.getUserInfos();
				this.removeCache();
			}else {
				this.lon = select_data.select_city.lng;
				this.lat = select_data.select_city.lat;
				this.cityId = select_data.select_city.city_id;
				this.location_city = select_data.select_city.city_name;
				
				this.getPageInfo();
				this.getUserInfos();
				this.removeCache();
			}
		}
	},
	mounted() {
		let h = document.documentElement.clientHeight;
		this.infoHeader.height = `${h * 0.07}px`;
		this.toastHeight.height = `${h * 0.07}px`;
		this.toastHeight.top = `${h * 0.07 + 120}px`;
		this.informationImage.top = `${h * 0.07}px`;
        var i = this.getCache("NULL_SALARY_IMG");
		this.Img = this.str2json(i).val;
	},
	updated() {
		this.autoFiexd();
		this.save_page_info();
	},
	destroyed() {
		// this.save_page_info();
	},

	// beforeRouteLeave(to, from, next) {
	// 	if (to.path == "/newusercenter") {
	// 		to.meta.keepAlive = true;
	// 	}
	// 	next();
	// },

	methods: {

		init() {
			this.getPageInfo();
			this.getDataInfo();
			this.getUserInfos();
			this.removeCache();
		},

		getPageInfo() { // 获取页面信息
			this.selfMainLoadOpend();
			var info = this.getSelectData();
			if (!info) {
				info = this.getSelectData();
			}
			if (info) {
				//添加页面tab信息
				if (info.pageInfo) {
					if (info.pageInfo == null) return this.msg("出了点差错...");
					if (info.pageInfo.information) {
						if (info.pageInfo.information.pageTabCode) {
							this.tab_code = info.pageInfo.information.pageTabCode;
						}
					}
				};

				//加载定位信息
				// if (info.select_city) {
				// 	var data = info.select_city;
				// 	console.log(data)
				// 	this.lon = data.lng;
				// 	this.lat = data.lat;
				// 	this.cityId = data.city_id;
				// 	this.location_city = data.city_name;
				// }

				//专业分类
				if (info.data) {
					if (info.data.data2.perFormAnce) {
						var data = info.data.data2.perFormAnce[0];
						var strs = {};
						strs = data.path.split('-');
						if (strs.length == 2) {
							strs.push(data.id)
						}
						var str = '';
						for (let i of strs) {
							str += i + ',';
						}
						str = str.substring(0, str.length - 1);
						this.headerTabbarLsit[this.tab_code].classType = str;
					}
				}
			} else {
				this._log("未定义部分信息");
				return false;
			}
			var x = this.tab_code;
			this.select_tab(x);
		},

		delSelectData() {
			var info = this.getSelectData();
			if (info) {
				if (info.demand) {
					info.demand.salary_data = null;
				};
				if (info.skill) {
					info.skill.salary_data = null;
				};
				if (info.data) {
					info.data.data1 = null;
					info.select_addr = null;
					this.setCache("select_data", JSON.stringify(info));
				};
			}
		},

		getDataInfo() { //获取基础配置信息
			this.__initAction(
				"Tools-getConfigData", {
					token: this.getToken(),
				},
				(res, s) => {
					if (s == 1) {
						var data = res.data.getList;
						var education = data.education.value;
						this.toastBtnList[2][2].require[0].label = education; //定义学历筛选条件
						this.toastBtnList[3][2].require[0].label = education; //定义学历筛选条件
						// var experience = data.experience.value;
						var resumeMoney = data.resumeMoney.value;
						this.toastBtnList[3][2].require[3].label = resumeMoney; //简历发布薪资范围
						var post_salary = data.salary.value;
						this.toastBtnList[2][2].require[2].label = post_salary; //岗位发布薪资范围
					} else {
						this._msg(res.info);
					}
				}
			);
		},

		getUserInfos() {
			var info = this.getCache("userInfoExt", 2);
			if (info) {
				this.infoRid = info.rid;
			} else {
				// this._msg("出错了(-_-)||");
			}
		},

		autoFiexd() { //自动更新尺寸
			var headerHeight = this.$refs.getHeaderHeight.offsetHeight;
			var toastHeight = this.$refs.getToastHeight.offsetHeight;
			if (this.isImage) {
				try {
					var imgHeight = this.$refs.getImageHeight.offsetHeight;
				} catch (e) {
					// this._log(e);
				} finally {
					var emp = this.$refs.getImageHeight
					if (emp) {
						var imgHeight = this.$refs.getImageHeight.offsetHeight;
					} else {
						var imgHeight = 0;
					}
				};
				this.toastHeight.top = `${headerHeight + imgHeight}px`;
				this.clearInfoFixed.height = `${headerHeight + toastHeight + imgHeight}px`;
			} else {
				this.toastHeight.top = `${headerHeight}px`;
				this.clearInfoFixed.height = `${headerHeight + toastHeight}px`;
			}
		},

		topAuto() { //聊天信息在优先展示
			var ele = document.querySelector('#infoEle');
			ele.scrollHeight = (this.curHeight - 100) + "px";
		},

		select_tab(x) { //选择tab事件
			// this.setCache("info-list-bar",x);
			this.selfLoadOpend({
				mes: "",
				font: 40,
				status: true,
				color: "fc-blue"
			});
			this.param = this.initPage();
			var token = this.token;
			var tabList = this.headerTabbarLsit;
			this.tab_code = x;
			this.types = x + 1;
			this.tabShowList = this.toastBtnList[x];
			var url = "Hotnews-preview";
			var page = this.param.page;
			var length = this.param.length;
			var types = this.types;
			var code = this.tab_code;
			var lon = this.lon;
			var lat = this.lat;
			var cityId = this.cityId;
			var sort = tabList[code].sort;
			var classType = tabList[code].classType;
			var newTime = tabList[code].newTime;
			var companyId = tabList[code].companyId;
			var hot = tabList[code].hot;
			var condition = tabList[code].condition;
			var positionId = tabList[code].positionId;
			var params = {
				token,
				page,
				length,
				types,
				lon,
				lat,
				cityId,
				sort,
				classType,
				newTime,
				positionId,
				companyId,
				hot,
				condition
			};
			var dataList = [];
			if (x == 0) {
				this.isImage = false;
				this.info_demand_list = [];
				dataList = this.info_demand_list;
			} else if (x == 1) {
				this.isImage = false;
				this.info_skill_list = [];
				dataList = this.info_skill_list;
			} else if (x == 2) {
				this.isImage = false;
				setTimeout(() => {
					this.isImage = true;
						this.autoFiexd();
					setTimeout(() => {
					}, 200);
				}, 300);
				this.interviewerList = [];
				dataList = this.interviewerList;
			} else if (x == 3) {
				this.isImage = false;
				setTimeout(() => {
					this.isImage = true;
					setTimeout(() => {
						this.autoFiexd();
					}, 200);
				}, 300);
				this.resumeInfoList = [];
				dataList = this.resumeInfoList;
			}
			this.getDataInfoList(url, params, types, dataList);
			this.getBannerImage(x);
		},

		getDataInfoList(url, params, type, dataList) { //  请求数据
			this.loadMord = '';
			this.__initAction(url, params, (res, s) => {
				if(res.data.count == 0) {
					this.isNuno = true;
				}else {
					this.isNuno = false;
					if (s == 1) {
						this.selfLoadClosed();
						this.selfMainLoadClosed();
						var list = res.data;
						if (list) {
							var code = this.tab_code;
							this.headerTabbarLsit[code].count = res.count;
							switch (type) {
								case 1:
									for (let data of list) {
										var arr = {};
										arr.title = data.title;
										arr.name = data.c_user.lastName;
										arr.logo = data.c_user.portrait;
										arr.imgs = data.prices;
										arr.hot = data.view;
										arr.lng = data.lon;
										arr.lat = data.lat;
										arr.distance = data.distance;
										arr.time = data.create_time;
										// arr.detail = data.infos;
										arr.id = data.id;
										arr.salary = data.serviceDatd;
										dataList.push(arr);
									}
									break;
								case 2:
									for (let data of list) {
										var arr = {};
										arr.title = data.title;
										arr.name = data.c_user.lastName;
										arr.logo = data.c_user.portrait;
										arr.imgs = data.images;
										arr.hot = data.view;
										// arr.type = 0;
										arr.lng = data.lon;
										arr.lat = data.lat;
										arr.distance = data.distance;
										arr.time = data.create_time;
										arr.detail = data.infos;
										arr.id = data.id;
										arr.salary = data.price;
										dataList.push(arr);
									}
									break;
								case 3:
									for (let data of list) {
										var arr = {};
										arr.title = data.title;
										arr.name = data.c_user.lastName;
										arr.logo = data.c_user.portrait;
										arr.addr = data.addressInfo;
										arr.hot = data.view;
										// arr.type = 0;
										arr.lng = data.lon;
										arr.lat = data.lat;
										arr.position = "人事经理";
										arr.distance = data.distance;
										arr.time = data.create_time;
										// arr.detail = data.infos;
										arr.id = data.id;
										arr.salary = data.prices;
										arr.education = data.education;
										arr.experience = data.exp;
										dataList.push(arr);
									}
									break;
								case 4:
									for (let data of list) {
						
										var arr = {};
										// var post = data.resumeIndustry;
										// post = post.split(",");
										arr.post = data.resumeIndustry;
										arr.name = data.consignee;
										arr.logo = data.c_user.portrait;
										// arr.addr = data.addressInfo;
										arr.hot = data.view;
										// arr.type = 0;
										arr.lng = data.lon;
										arr.lat = data.lat;
										// arr.position = "人事经理";
										// arr.distance = data.distance;
										arr.time = data.create_time;
										arr.detail = data.infos;
										arr.id = data.id;
										arr.salary = data.salary;
										arr.education = data.education;
										arr.experience = data.Working + "年";
										dataList.push(arr);
									}
									break;
								default:
									this._log(data);
									break;
							}
						}
						if (res.code == '1000000000') {
							this.loadMord = '暂无数据...';
						}
						if (this.$refs["infinitescrollDemo"]) {
							try {
								this.$refs["infinitescrollDemo"].$emit(
									"ydui.infinitescroll.finishLoad"
								);
							} catch (e) {
								console.log("要不你刷新试试");
							}
						}
					} else {
						console.log(res.info);
						this._msg(res.info);
					}
				}
			});
		},

		getBannerImage(x) { // 获取公共信息--幻灯片
			var token = this.token;
			var url = "Banner-getData";
			var type = this.headerTabbarLsit[x].bannerId;
			this.__initAction(url, {
				token,
				type
			}, (res, s) => {
				if (s == 1) {
					this.bannerInfoList = [];
					this.bannerInfoList = res.data;
				}
			});
		},

		do_show(x) {
			var index = this.tab_code;
			if (x == 0) {
				this.modal_show = true;
				this.modelDataList = this.toastBtnList[index][x].label;
			} else if (x == 2) {
				if (this.tab_code == 0 || this.tab_code == 1) {
					this.modal_show = true;
					this.modelDataList = this.toastBtnList[index][x].label;
				} else if (this.tab_code == 2 || this.tab_code == 3) {
					this.open = true;
					this.openItems = this.toastBtnList[index][x].require;
				}
			}
		},

		do_open() {
			this.open = false;
		},

		select_item(i, j) {
			this.openItems[i].isNum = j;
		},

		select_reset() {
			for (let i of this.openItems) {
				i.isNum = 0;
			}
		},

		select_sure() {
			console.log('确认')
			// console.log(this.openItems)
			this.do_open();
		},

		click_tab2(x) {
			if (!x) {
				this.open = true;
				this.openItems = this.toastBtnList[this.tab_code][1].require;
			} else {
				this.$router.push(x);
			}
		},
		save_page_info() {
			var code = this.tab_code;
			var info = this.getSelectData();
			if (!info) info = {};
			if (!info.pageInfo) info.pageInfo = {};
			if (!info.pageInfo.information) info.pageInfo.information = {};
			info.pageInfo.information.pageTabCode = code;
			this.setCache("select_data", JSON.stringify(info));
		},

		select_value(v) {
			var tabList = this.headerTabbarLsit;
			var code = this.tab_code;
			if (v) {
				switch(code){
					case 0:
						if(v.value == '当天' || v.value == '三天' || v.value == '一周' || v.value == '一月'){
							tabList[code].newTime = v.id;
							this.select_tab(code);
						}else{
							tabList[code].sort = v.id;
							this.select_tab(code);
						}
						break
					case 1:
						if(v.value == '当天' || v.value == '三天' || v.value == '一周' || v.value == '一月'){
							tabList[code].newTime = v.id;
							this.select_tab(code);
						}else{
							tabList[code].sort = v.id;
							this.select_tab(code);
						}
						break
					case 2:
						tabList[code].hot = v.id;
						this.select_tab(code);
						break
					case 3:
						tabList[code].hot = v.id;
						this.select_tab(code);
						break
					default:
						break
				}
			}
			this.modal_cancel();
		},

		modal_cancel() {
			this.modal_show = false;
		},


		do_jump(x) {
			x.code = this.tab_code;
			this.$router.push({
				path: "/servicedetail",
				query: x
			});
		},

		loadList() {
			var code = this.tab_code;
			var count = this.headerTabbarLsit[code].count;
			var MaxPage = Math.ceil(count / this.param.length);
			var next = this.param.page + 1;
			if (MaxPage == next) {
				this._msg("已经到底了");
				// this.selfLoadOpend({
				// 	mes: "没有更多数据了",
				// 	status: false
				// });
				// this.$refs["infinitescrollDemo" + this.types].$emit(
				//   "ydui.infinitescroll.loadedDone"
				// );
				setTimeout(() => {
					this.selfLoadClosed();
				}, 1500);
				return;
			} else {
				this.selfLoadOpend({
					mes: "",
					color: "fc-blue",
					font: 30,
					status: true
				});
				this.getMore(next);
			}
		},

		getMore(next) {
			var token = this.token;
			var tabList = this.headerTabbarLsit;
			var page = next;
			var length = this.param.length;
			var url = "Hotnews-preview";
			var types = this.types;
			var code = this.tab_code;
			var lon = this.lon;
			var lat = this.lat;
			var cityId = this.cityId;
			var sort = tabList[code].sort;
			var classType = tabList[code].classType;
			var newTime = tabList[code].newTime;
			var companyId = tabList[code].companyId;
			var hot = tabList[code].hot;
			var condition = tabList[code].condition;
			var positionId = tabList[code].positionId;
			var params = {
				token,
				page,
				length,
				types,
				lon,
				lat,
				cityId,
				sort,
				classType,
				newTime,
				positionId,
				companyId,
				hot,
				condition
			};

			var dataList = [];
			if (code == 0) {
				dataList = this.info_demand_list;
			} else if (code == 1) {
				dataList = this.info_skill_list;
			} else if (code == 2) {
				dataList = this.interviewerList;
			} else if (code == 3) {
				dataList = this.resumeInfoList;
			}
			// console.log(params, types, dataList);
			this.getMoreDataInfoList(url, params, types, dataList);
		},

		getMoreDataInfoList(url, params, type, dataList) {
			var that = this;
			var token = this.token;
			this.__initAction(url, params, (res, s) => {
				if(res.data.count == 0) {
					this.isNuno = true;
				}else {
					this.isNuno = false;
					if (s == 1) {
						console.log(res)
						this.selfLoadClosed();
						var list = res.data;
						if (list) {
							for (let data of list) {
								var arr = {};
									arr.logo = data.portrait;
									arr.title = data.title;
									arr.name = data.c_user.lastName;
									arr.lng = data.lon;
									arr.lat = data.lat;
									arr.id = data.id;
								if (type == 1) {
									arr.imgs = data.prices;
									arr.hot = data.view;
									// arr.type = 0;
									arr.distance = data.distance;
									arr.time = data.create_time;
									arr.detail = data.infos;
									arr.salary = data.serviceDatd;
									dataList.push(arr);
								}
								if (type == 2) {
									arr.imgs = data.images;
									arr.hot = data.view;
									// arr.type = 0;
									arr.distance = data.distance;
									arr.time = data.create_time;
									arr.detail = data.infos;
									arr.salary = data.price;
									dataList.push(arr);
								}
								if (type == 3) {
									arr.addr = data.addressInfo;
									arr.hot = data.view;
									// arr.type = 0;
									arr.position = "人事经理";
									arr.distance = data.distance;
									arr.time = data.create_time;
									// arr.detail = data.infos;
									arr.salary = data.prices;
									arr.education = data.education;
									arr.experience = data.exp;
									dataList.push(arr);
								}
								if (type == 4) {
									arr.post = data.resumeIndustry;
									arr.name = data.consignee;
									arr.hot = data.view;
									arr.time = data.create_time;
									arr.detail = data.infos;
									arr.salary = data.salary;
									arr.education = data.education;
									arr.experience = data.Working + "年";
									dataList.push(arr);
								}
							}
						}
						this.param.page++;
						if (this.$refs["infinitescrollDemo"]) {
							try {
								this.$refs["infinitescrollDemo"].$emit(
									"ydui.infinitescroll.finishLoad"
								);
							} catch (e) {
								console.log("要不你刷新试试");
							}
						}
						this.selfLoadClosed();
					} else {
						this._msg(res.info);
					}
				}
			});
		}

	},
	watch: {
		// bannerInfoList() {
		//   console.log(1);
		// }
	},

	computed: {
		headerbarList() {
			var rid = this.infoRid
			var len = this.headerTabbarLsit.length;
			// if (rid == -1 || rid == 1 || rid == -3 || rid == 3) {
			// 	this.headerTabbarLsit.splice(len - 1, 1);
			// 	return this.headerTabbarLsit;
			// } else if (rid == 0 || rid == -2 || rid == 2) {
			// 	return this.headerTabbarLsit;
			// } else {
			// 	return this.headerTabbarLsit;
			// }
			if (rid == 1 || rid == 3 || rid == 0 || rid == null) {
				this.headerTabbarLsit.splice(len - 1, 1);
				return this.headerTabbarLsit;
			} else if (rid == 2) {
				return this.headerTabbarLsit;
			} else {
				return this.headerTabbarLsit;
			}
		}
	},


	components: {
		"self-info-card": InfoCard,
		"self-post-card": PostCard, //注册子组件
		"self-resume-card": ResumeCard,
		"self-load-plate": LoadPlate,
		"self-modal-frame": ModalFrame,
		"self-load-frame": LoadFrame,
		"self-no-data": NoData
	}
};
</script>
<style lang='scss'>
	* { touch-action: pan-y; }
	.showToast { position: absolute; top: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.3); z-index: 1001; }
	.toastText {
		width: 100%; background: #fff; transition: all 0.6s; position: fixed; z-index: 10001;
		.toastItems {
			width: 100%; padding: 15px;
			.item {
				width: 100%; font-weight: 500; margin-top: 10px;
				.item_title { color: #8f8f94; font-size: 14px; font-weight: 500; margin-bottom: 3px; }
				.item_detail {
					display: flex; flex-flow: wrap; align-items: center; font-size: 14px; color: #000; font-weight: 500; padding: 5px 0;
					.marked { color: #fff; background: #007aff; border-radius: 3px; }
					.item_text { margin: 0 5px 5px 0; }
				}
			}
		}
		.tosatBtn {
			width: 100%; display: flex;
			a { text-decoration: none; width: 50%; height: 45px; font-size: 16px; font-weight: 500; text-align: center; line-height: 45px; }
			.btn_reset { color: #000; background: #fff; border-top: 1px solid rgba(212, 212, 212, 1); }
			.btn_done { color: #fff; background: #007aff; }
		}
	}
	.up { bottom: 0; }
	.down { bottom: -100%; }
	div.yd-list-loading > div > svg { display: none; }
	.information-image { position: fixed; box-sizing: border-box; left: 0; top: 0;}
	.information-image img { width: 100%; }
	.info_header_city {
		.title_city {
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap;
			margin-right:5px;
		}
		.city_arrow {
			display: flex;
			align-items: center;
		}
	}
	.info_content .mt-5 img{ width: 80%; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);z-index: -99; }
</style>
