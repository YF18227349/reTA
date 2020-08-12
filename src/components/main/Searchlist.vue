<template>
	<div class="information w-100">
		<header class="info_header bg-white w-100 mb-1" :style="infoHeader" ref="getHeaderHeight">
			<router-link to="" class="info_header_city">
				<div @click="$router.go(-2)" class="backleft">
					<!-- <span class="fs-3 fc-gray fw-5">{{location_city}} &#12288;</span>
						<span class="city_arrow fc-gray iconfont icon-arrowdown"></span> -->
					<span class="iconfont icon-previewleft fw-7" style="font-size:20px; color:#888"></span>
				</div>
			</router-link>

			<div class="nav_tab_items">
				<div class="tab_item" v-for="(item,i) in headerbarList" :key="i">
					<a href="javascript:;" class="item" @click.prevent="select_tab(i)">
						<span :class="tab_code == i ? 'selected_item':'unSelected_item'">{{item.title}}</span>
					</a>
				</div>
			</div>

			<router-link to class="info_search">
				<!-- <span class="iconfont icon-3 fc-dark fw-5"></span> -->
			</router-link>
		</header>

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

		<div class="information-image" :style="informationImage" v-show="bannerInfoList.length && isImage" ref="getImageHeight">
			<yd-slider autoplay="3000">
				<yd-slider-item v-for="(item,i) of bannerInfoList" :key="i">
					<a href="javacript:;">
						<img :src="item.image">
					</a>
				</yd-slider-item>
			</yd-slider>
			<!-- <img
					src="http://base.sxtian.com/public/uploads/images/banner_data/20190425/31f98d6cd4844138e8ad41aecabced67.png"
					alt
					ref="getImageHeight"
				>-->
		</div>
		<!-- <div class="information-image" :style="informationImage" v-if="isImage">
				<img
					src="http://base.sxtian.com/public/uploads/images/banner_data/20190425/31f98d6cd4844138e8ad41aecabced67.png"
					alt
					ref="getImageHeight"
				>
			</div>-->
		<div class="clear_info_fixed" :style="clearInfoFixed"></div>
		<!-- 上拉加载 -->
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
			<!-- 兼职板块 -->
			<div class="info_content" slot="list" v-if="tab_code == 0">
				<router-link :to="{path:'/service_detail',query:{id:tmp.id,code:tab_code,lng:tmp.lng,lat:tmp.lat,path:0}}" class="cards w-100 bg-white mb-1" v-for="(tmp,i) in info_demand_list" :key="i">
					<self-info-card :data="tmp"></self-info-card>
				</router-link>
				<a class="mt-5" href="javascript:;" v-if="info_demand_list.length<=0">
					<!-- <self-no-data :title="loadMord" size="16"></self-no-data> -->
					<img :src="Img">
				</a>
			</div>

			<!-- 技能板块 -->
			<div class="info_content" slot="list" v-if="tab_code == 1">
				<!-- path:0----信息库路径 -->
				<router-link :to="{ path: '/skill_detail', query: {id:tmp.id,code:tab_code,lng:tmp.lng,lat:tmp.lat,path:0}}" class="cards mb-1 w-100 bg-white" v-for="(tmp,i) in info_skill_list" :key="i">
					<self-info-card :data="tmp"></self-info-card>
				</router-link>
				<a class="mt-5" href="javascript:;" v-if="info_skill_list.length<=0">
					<!-- <self-no-data :title="loadMord" size="16"></self-no-data> -->
					<img :src="Img">
				</a>
			</div>

			<!-- 岗位板块 -->

			<div class="info_content" slot="list" v-if="tab_code == 2">
				<router-link :to="/post_info/+item.id" class="post_info_cards bg-white w-100 mb-1" v-for="(item,i) in interviewerList" :key="i">
					<self-post-card :data="item" class="bg-white"></self-post-card>
				</router-link>
				<a class="mt-5 ifImg" href="javascript:;" v-if="interviewerList.length<=0">
					<!-- <self-no-data :title="loadMord" size="16"></self-no-data> -->
					<img :src="Img">
				</a>
			</div>

			<!-- 简历板块 -->
			<div class="info_content" slot="list" v-if="tab_code == 3">
				<router-link :to="/resumeinfo/+item.id" class="resume_items w-100 bg-white mb-1" v-for="(item,i) in resumeInfoList" :key="i">
					<self-resume-card :data="item"></self-resume-card>
				</router-link>
				<a class="mt-5" href="javascript:;" v-if="resumeInfoList.length<=0">
					<!-- <self-no-data :title="loadMord" size="16"></self-no-data> -->
					<img :src="Img">
				</a>
			</div>

			<span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span>
		</yd-infinitescroll>

		<!-- 加载信息提示框 -->
		<self-load-frame></self-load-frame>
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
					<a href="javascript:;" class="btn_done">确定</a>
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
			length: 10,
			page: 0,
			modelDataList: [],
			tab_code: 0,
			open: false,
			tabShowList: [],
			toastItems: [],
			openItems: [],
			headerTabbarLsit: [{
					title: "兼职",
					sort: "",
					rule: "",
					classType: "",
					count: null,
					bannerId: 5
				},
				{
					title: "技能",
					sort: "",
					rule: "",
					classType: "",
					count: null,
					bannerId: 5
				},
				{
					title: "岗位",
					companyId: "",
					condition: "",
					hot: "",
					count: null,
					bannerId: 5
				},
				{
					title: "简历",
					positionId: "",
					condition: "",
					hot: "",
					count: null,
					bannerId: 6
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
								id: 5
							},
							{
								value: "价格低",
								id: 6
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
						url: "/demand_group/4"
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
			bannerInfoList: [],
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
			Img:""
		};
	},
	mounted() {
		// setTimeout(() => {
			let h = document.documentElement.clientHeight;
			this.infoHeader.height = `${h * 0.07}px`;
			this.toastHeight.height = `${h * 0.07}px`;
			this.toastHeight.top = `${h * 0.07 + 120}px`;
			this.informationImage.top = `${h * 0.07}px`;
		// }, 1000);

		var i = this.getCache("NULL_SALARY_IMG");
		this.Img = this.str2json(i).val;
	},
	updated() {
		this.save_page_info();
		this.autoFiexd();
	},
	created() {
		this.selfMainLoadOpend();

		this.tabShowList = this.toastBtnList[0];
		this.footer_tabbar_code = 2;
		//定义定位信息
		var select_data = this.getCache("select_data", 2);
		var userInfo = this.getCache("user_info", 2);
		if(userInfo) {
			// let location = this.getCache("location",2);
			this.lon = select_data.select_city.lon;
			this.lat = select_data.select_city.lat;
			this.cityId = select_data.select_city.city_id;
			this.location_city = select_data.select_city.city_name;
			// this.lon = location.lon;
			// this.lat = location.lat;
			// this.cityId = location.cityId;
			// this.location_city = location.city;
			this.token = userInfo.token;

			this.init();
		}else {
            this.lon = select_data.select_city.lon;
			this.lat = select_data.select_city.lat;
			this.cityId = select_data.select_city.city_id;
			this.location_city = select_data.select_city.city_name;

			this.getPageInfo();
			this.getUserInfos();
			this.removeCache();
		}
		// var userInfo = this.getUserInfo();
		// if (userInfo.location) {
		// 	var location = userInfo.location;
		// } else {
		// 	var info = this.getCache("location");
		// 	info = JSON.parse(info);
		// 	var location = info;
		// }
		// this.lon = location.lon;
		// this.lat = location.lat;
		// this.cityId = location.cityId;
		// this.location_city = location.city;
		// this.token = userInfo.token;
		// this.init();
	},
	methods: {

		//自动更新尺寸
		autoFiexd() {
			var headerHeight = this.$refs.getHeaderHeight.offsetHeight;
			var toastHeight = this.$refs.getToastHeight.offsetHeight;
			if (this.isImage) {
				var imgHeight = this.$refs.getImageHeight.offsetHeight;
				this.toastHeight.top = `${headerHeight + imgHeight}px`;
				this.clearInfoFixed.height = `${headerHeight +
					toastHeight +
					imgHeight}px`;
			} else {
				this.toastHeight.top = `${headerHeight}px`;
				this.clearInfoFixed.height = `${headerHeight + toastHeight}px`;
			}
		},

		init() {
			this.getPageInfo();
			this.getDataInfo();
			this.getUserInfos();
			this.save_page_info();
			this.removeCache();
			// this.getListData();
			// this.getSearchData();
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},

		//获取基础配置信息
		getDataInfo() {
			this.__initAction(
				"Tools-getConfigData", {
					token: this.getToken()
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

		// 获取页面信息
		getPageInfo() {
			// this.selfMainLoadOpend();
			var info = this.getSelectData();
			if (!info) {
				info = this.getSelectData();
			}
			if (info) {
				//添加页面tab信息
				if (info.pageInfo) {
					if (info.pageInfo.information) {
						if (info.pageInfo.information.pageTabCode) {
							this.tab_code = info.pageInfo.information.pageTabCode;
							this.types = this.tab_code + 1;
						}
					}
				}
				//加载定位信息
				if (info.select_city) {
					var data = info.select_city;
					this.lon = data.lng;
					this.lat = data.lat;
					this.cityId = data.city_id;
					this.location_city = data.city_name;
				}

				//兼职参数？
				if (info.info_demand) {
					var data = info.info_demand.data1;
					if (data) {
						var str = "";
						for (let i of data) {
							str += i.id + ",";
						}
						str = str.substring(0, str.length - 1);
						this.classType = str;
					}
				}
			} else {
				this._log("未定义部分信息");
				return false;
			}
			var x = this.tab_code;
			this.select_tab(x);
		},
		//选择tab事件
		select_tab(x) {
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
			var keyword = this.getParams().kw;
			var params = {
				token,
				page,
				length,
				types,
				lon,
				lat,
				cityId,
				sort,
				newTime,
				positionId,
				companyId,
				hot,
				condition
			};
			if (keyword) {
				params.keyword = keyword;
			}
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
				this.isImage = true;
				setTimeout(() => {
					this.isImage = true;
					setTimeout(() => {
						this.autoFiexd();
					}, 300);
				}, 600);
				this.interviewerList = [];
				dataList = this.interviewerList;
			} else if (x == 3) {
				this.isImage = true;
				this.resumeInfoList = [];
				setTimeout(() => {
					this.isImage = true;
					setTimeout(() => {
						this.autoFiexd();
					}, 300);
				}, 600);
				dataList = this.resumeInfoList;
			}
			this.getDataInfoList(url, params, types, dataList);
			this.getBannerImage(x);
		},
		//获得获得搜索数据
		// getSearchData() {
		//   var kw = this.getParams().kw;
		//   var keyword = kw;
		//   var cityId = this.cityId;
		//   var token = this.token;
		//   var lon = this.lon;
		//   var lat = this.lat;
		//   var page = this.page;
		//   var length = this.length;
		//   var url = "Tools-globalSearch";
		//   var params = {
		//     token,
		//     cityId,
		//     keyword,
		//     lon,
		//     lat,
		//     page,
		//     length
		//   };
		//   this.__initAction(url, params, (res, s) => {
		//     if (s == 1) {
		//       var data = res.data;
		//       var obj1 = data.demands;
		//       for (let data of obj1) {
		//         var arr = {};
		//         arr.title = data.title;
		//         arr.name = data.lastName;
		//         arr.logo = data.portrait;
		//         arr.imgs = data.prices;
		//         arr.hot = data.view;
		//         arr.lng = data.lon;
		//         arr.lat = data.lat;
		//         arr.distance = data.distance;
		//         arr.time = data.create_time;
		//         arr.detail = data.infos;
		//         arr.id = data.id;
		//         arr.salary = data.serviceDatd;
		//         this.info_demand_list.push(arr);
		//       }
		//       // this.info_demand_list = data.demands;
		//       var obj2 = data.skills;
		//       for (let data of obj2) {
		//         var arr = {};
		//         arr.title = data.title;
		//         arr.name = data.lastName;
		//         arr.logo = data.portrait;
		//         arr.imgs = data.images;
		//         arr.hot = data.view;
		//         arr.lng = data.lon;
		//         arr.lat = data.lat;
		//         arr.distance = data.distance;
		//         arr.time = data.create_time;
		//         arr.detail = data.infos;
		//         arr.id = data.id;
		//         arr.salary = data.price;
		//         this.info_skill_list.push(arr);
		//       }
		//       // this.info_skill_list = data.skills;
		//       var obj3 = data.quarters;
		//       for (let data of obj3) {
		//         var arr = {};
		//         arr.title = data.title;
		//         arr.name = data.lastName;
		//         arr.logo = data.portrait;
		//         arr.addr = data.addressInfo;
		//         arr.hot = data.view;
		//         // arr.type = 0;
		//         arr.lng = data.lon;
		//         arr.lat = data.lat;
		//         arr.position = "人事经理";
		//         arr.distance = data.distance;
		//         arr.time = data.create_time;
		//         // arr.detail = data.infos;
		//         arr.id = data.id;
		//         arr.salary = data.prices;
		//         arr.education = data.education;
		//         arr.experience = data.exp;
		//         this.interviewerList.push(arr);
		//       }
		//       // this.interviewerList = data.quarters;
		//       var obj4 = data.resume;
		//       for (let data of obj4) {
		//         arr.post = data.resumeIndustry;
		//         arr.name = data.consignee;
		//         arr.logo = data.portrait;
		//         arr.hot = data.view;
		//         arr.lng = data.lon;
		//         arr.lat = data.lat;
		//         arr.time = data.create_time;
		//         arr.detail = data.infos;
		//         arr.id = data.id;
		//         arr.salary = data.salary;
		//         arr.education = data.education;
		//         arr.experience = data.Working + "年";
		//         this.resumeInfoList.push(arr);
		//       }
		//       // this.resumeInfoList = data.resume;
		//     } else {
		//       this.$router.push("/search");
		//     }
		//   });
		// },
		//  请求数据
		getDataInfoList(url, params, type, dataList) {			
			this.loadMord = '';
			this.__initAction(url, params, (res, s) => {
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
									// arr.type = 0;
									arr.lng = data.lon;
									arr.lat = data.lat;
									arr.distance = data.distance;
									arr.time = data.create_time;
									arr.detail = data.infos;
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
									arr.name = data.c_user.lastName;
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
					};
					// if (res.info == '已经没有数据了') {
					// 	this._msg(`暂无相关数据!`);
					// 	setTimeout(() => {
					// 		this.$router.back(-1);
					// 		// this.$router.push('/main');
					// 	}, 200);
					// }
					if (res.code == '1000000000') {
						this.loadMord = '暂无数据...';
					}
					this.$refs["infinitescrollDemo"].$emit(
						"ydui.infinitescroll.finishLoad"
					);
				} else if (s == -1) {
					this._msg(res.info);
				};
				if (!res.data) return;
				if (res.data.length == 0) {
					this._msg(`暂无相关数据!`);
					setTimeout(() => {
						this.$router.back(-2);
					}, 500);
				}
			});
		},
		getBannerImage(x) {
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
		click_tab2(x) {
			if (!x) {
				this.open = true;
				this.openItems = this.toastBtnList[this.tab_code][1].require;
			} else {
				this.$router.push(x);
			}
		},
		modal_cancel() {
			this.modal_show = false;
		},
		save_page_info() {
			var code = this.tab_code;
			var info = this.getSelectData();
			if (!info) {
				info = {};
			}
			if (!info.pageInfo) {
				info.pageInfo = {};
			}
			if (!info.pageInfo.information) {
				info.pageInfo.information = {};
			}
			info.pageInfo.information.pageTabCode = code;
			this.setCache("select_data", JSON.stringify(info));
		},
		select_value(v) {
			if (v) {
				console.log(v);
			}

			this.modal_show = false;
		},
		do_jump(x) {
			x.code = this.tab_code;
			this.$router.push({
				path: "/servicedetail",
				query: x
			});
		},

		//触底加载
		loadList() {
			// console.log(x, 1009);
			var code = this.tab_code;
			var count = this.headerTabbarLsit[code].count;
			var MaxPage = Math.ceil(count / this.param.length);
			var next = this.param.page + 1;
			if (MaxPage == next) {
				this.selfLoadOpend({
					mes: "没有更多数据了",
					status: false
				});
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
			var keyword = this.getParams().kw;
			var params = {
				token,
				page,
				length,
				types,
				lon,
				lat,
				cityId,
				sort,
				newTime,
				positionId,
				companyId,
				hot,
				condition
				// keyword
			};
			if (keyword) {
				params.keyword = keyword;
			}
			var dataList = [];
			if (code == 0) {
				dataList = this.info_demand_list;
			} else if (code == 1) {
				dataList = this.info_skill_list;
			} else if (code == 2) {
				dataList = this.interviewerList;
			} else if (code == 3) {
				dataList = this.resumeInfoList;
				console.log(dataList)
			}
			// console.log(params, types, dataList);
			this.getMoreDataInfoList(url, params, types, dataList);
		},
		getMoreDataInfoList(url, params, type, dataList) {
			var that = this;
			var token = this.token;
			this.__initAction(url, params, (res, s) => {
				console.log(res)
				if (s == 1) {
					this.selfLoadClosed();
					var list = res.data;
					if (list) {
						for (let data of list) {
							var arr = {};
							if (type == 1) {
								arr.title = data.title;
								arr.name = data.c_user.lastName;
								arr.logo = data.c_user.portrait;
								arr.imgs = data.prices;
								arr.hot = data.view;
								// arr.type = 0;
								arr.lng = data.lon;
								arr.lat = data.lat;
								arr.distance = data.distance;
								arr.time = data.create_time;
								arr.detail = data.infos;
								arr.id = data.id;
								arr.salary = data.serviceDatd;
								dataList.push(arr);
							}
							if (type == 2) {
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
							if (type == 3) {
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
							if (type == 4) {
								arr.post = data.resumeIndustry;
								arr.name = data.consignee;
								arr.name = data.c_user.lastName;
								arr.logo = data.c_user.portrait;
								arr.hot = data.view;
								arr.lng = data.lon;
								arr.lat = data.lat;
								arr.time = data.create_time;
								arr.detail = data.infos;
								arr.id = data.id;
								arr.salary = data.salary;
								arr.education = data.education;
								arr.experience = data.Working + "年";
								dataList.push(arr);
							}
						}
					}
					this.param.page++;
					this.$refs["infinitescrollDemo"].$emit(
						"ydui.infinitescroll.finishLoad"
					);
					this.selfLoadClosed();
				} else {
					this._msg(res.info);
				}
			});
		}
	},
	destroyed() {

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
	.backleft {
		justify-content: flex-start !important;
	}
	.showToast {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		z-index: 1001;
	}
	.toastText {
		width: 100%;
		background: #fff;
		transition: all 0.6s;
		position: fixed;
		z-index: 10001;
		.toastItems {
			width: 100%;
			padding: 15px;
			.item {
				width: 100%;
				font-weight: 500;
				margin-top: 10px;
				.item_title {
					color: #8f8f94;
					font-size: 14px;
					font-weight: 500;
					margin-bottom: 3px;
				}
				.item_detail {
					display: flex;
					flex-flow: wrap;
					align-items: center;
					font-size: 14px;
					color: #000;
					font-weight: 500;
					padding: 5px 0;
					.marked {
						color: #fff;
						background: #007aff;
						border-radius: 3px;
					}
					.item_text {
						margin-bottom: 5px;
						// padding: 4px;
						margin-right: 5px;
					}
				}
			}
		}
		.tosatBtn {
			width: 100%;
			display: flex;
			a {
				text-decoration: none;
				width: 50%;
				height: 45px;
				font-size: 16px;
				font-weight: 500;
				text-align: center;
				line-height: 45px;
			}
			.btn_reset {
				color: #000;
				background: #fff;
				border-top: 1px solid rgba(212, 212, 212, 1);
			}
			.btn_done {
				color: #fff;
				background: #007aff;
			}
		}
	}
	.up {
		bottom: 0;
	}
	.down {
		bottom: -100%;
	}
	div.yd-list-loading > div > svg {
		display: none;
	}
	.information-image {
		position: fixed;
		left: 0;
	}
	.information-image img {
		height: 120px;
		width: 100%;
	}
	.ifImg{
		img{ width: 80%; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); }
	}
</style>
