<template>
	<div class="main" id="content-box" v-if="showHome">
		<header class="main_nav w-100" :style="goScroll">
			<div class="main_nav_group">
				<router-link to="/city_list" class="main_nav_city">
					<span class="main_cityName mr-2">{{pageInfo.location_city}}</span>
					<span class="iconfont icon-arrow1 fc-dark"></span>
				</router-link>
				<router-link to="/search" class="main_nav_search">搜索</router-link>
			</div>
			<router-link to="/Message" class="message_icon iconfont icon-chat1 fw-7 fc-white p-r">
				<span class="radius-box"></span>
			</router-link>
		</header>

		<!-- 幻灯片 -->
		<div id="slider" class="main-slider">
			<yd-slider autoplay="0" pagination-color="#dce6ec" pagination-activecolor="white" index="1">
				<yd-slider-item v-for="(item,i) in mainCarsouelImgs" :key="i">
					<router-link :to="`/bannerdetail/${item.id}`">
						<img :src="item.image">
					</router-link>
				</yd-slider-item>
			</yd-slider>
		</div>
		<!-- 幻灯片 -->
		<!-- 7个字分类 -->
		<div class="icon-list w-100 bg-white">
			<div class="icon-item" v-for="(item,i) in iconList" :key="i">
				<router-link :to="'/main_information/'+item.name+'/'+item.id+'/2'" class="item">
					<span class="item_logo mb-2">
						<img :src="item.icon" alt class="images">
					</span>
					<span>{{item.name}}</span>
				</router-link>
			</div>
			<div class="icon-item">
				<router-link to="/main_more" class="item">
					<span class="item_logo mb-2">
						<img src="static/imgs/yf/index-more-icon.png" alt class="images">
					</span>
					<span>更多</span>
				</router-link>
			</div>
		</div>
		<!-- 7个字分类 -->
		<!-- 新闻管理 -->
		<div class="topBar bg-white">
			<span class="born_logo">
				<img src="static/imgs/main/born_logo.png" alt>
			</span>
			<span class="topBar_born">{{mainInfo.title}}</span>
			<yd-rollnotice :autoplay="2000" class="born_infos">
				<yd-rollnotice-item v-for="(tmp,i) in mainInfo.list" :key="i">
					<router-link :to="'/NewsList/'+tmp.id" class="cell_arrow_item">
						<span class="fc-gray">{{tmp.title}}</span>
					</router-link>
				</yd-rollnotice-item>
			</yd-rollnotice>
		</div>
		<!-- 新闻管理 -->

		<!-- //
					**
					首页4个直通车
					**
			//-->
		<div class="connection_group w-100 bg-gary">
			<div class="connection_item" v-for="(tmp,i) in connection_list" :key="i">
				<a href="javascript:;" class="item bg-white" @click="go_connection(i)">
					<img :src="tmp.logo" alt class="item_img">
				</a>
			</div>
		</div>
		<!-- 军人专区入口 -->
		<!-- dfssdf -->
		
		<!-- <div class="mt-3 w-100 indexSoldierList" v-for="(item,i) in indexSoldierList" :key="i">
			<router-link :to="item.url">
				<img :src="item.logo">
			</router-link>
		</div> -->

		<!-- 军人专区入口 -->
		<!-- 滚动横幅 -->
		<div class="mt-3 w-100">
			<yd-slider :autoplay="2500" pagination-color="#dce6ec" pagination-activecolor="white" index="1">
				<yd-slider-item v-for="(item,i) in mainCarsouelList" :key="i">
					<router-link :to="`/bannerdetail/${item.id}`">
						<img :src="item.logo">
					</router-link>
				</yd-slider-item>
			</yd-slider>
		</div>
		<!-- 滚动横幅 -->
		<div class="note_message">
			<span class="fc-gray fw-6 fm-2">最新发布</span>
		</div>
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
			<div class="card_list w-100" slot="list">
				<router-link :to="{path:'/service_detail',query:{id:tmp.id,code:0,lng:tmp.lng,lat:tmp.lat}}" class="cards w-100 bg-white mb-4" v-for="(tmp,i) in mainNewlist" :key="i">
					<self-info-card :data="tmp"></self-info-card>
				</router-link>
				<!-- <self-load-frame></self-load-frame> -->
				<a href="javascript:;" v-if="mainNewlist.length<=0">
					<self-no-data title="暂无数据..." size="16"></self-no-data>
				</a>
			</div>
			<span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span>
		</yd-infinitescroll>
		<!-- <baidu-map @ready="handler"></baidu-map> -->
	</div>
</template>

<script>
const LoadFrame = ()=>import("../sub/loading_frame");
const InfoCard = ()=>import("../sub/info_card");
const BaiduMap = ()=>import("vue-baidu-map/components/Map/Map");
const BmGeolocation = ()=>import("vue-baidu-map/components/controls/Geolocation");
const NoData = ()=>import("../sub/noDataModel");
export default {
	data() {
		return {
			pageInfo: {
				toast_code: false,
				token: "",
				location_city: ""
			},
			isScroll: false,
			goScroll: "",
			mainCarsouelImgs: [
				{
				    image:"http://zywl.tarl.cc/public/uploads/banner_data/images/20190701/17ae9c025660e32c6d091a253f14a242.jpg",
				}
			],
			mainInfo: {
				title: "",
				list: [
					{
						title: "二〇二〇，吹响决胜全面小康的号角"
					}
				]
			},
			iconList: [
				{
					icon:"http://zywl.tarl.cc/public/uploads/skillclass_data/images/20190929/58287c68cb25971fea8b1b886223648b.jpg",
					name:"文职岗位"
				},
				{
					icon:"http://zywl.tarl.cc/public/uploads/skillclass_data/images/20190929/48eca3d33241e94c7bb74b4a4821fd3c.png",
					name:"家政服务"
				},
				{
					icon:"http://zywl.tarl.cc/public/uploads/skillclass_data/images/20191114/bc2338d61cd0e8b3bb53912770359b37.png",
					name:"保洁"
				},
				{
					icon:"http://zywl.tarl.cc/public/uploads/skillclass_data/images/20191114/252165f4fcf7afc062ed79d3a83a025c.png",
					name:"保姆月嫂"
				},
				{
					icon:"http://zywl.tarl.cc/public/uploads/skillclass_data/images/20191114/45523d649b89064e1934393638fc44d4.png",
					name:"兼职服务"
				},
				{
					icon:"http://zywl.tarl.cc/public/uploads/skillclass_data/images/20191114/3b5a0b4388bd9538923f7e7fcb520fe4.png",
					name:"电器维修"
				},
				{
					icon:"http://zywl.tarl.cc/public/uploads/skillclass_data/images/20191114/e8b32f1a30ec46ca59134590aaa9a9ea.png",
					name:"保险查询"
				}
			],
			/*抢单赚钱-保险中心-企业招聘-专家智库*/
			connection_list: [
				{
					logo:"http://zywl.tarl.cc/public/uploads/images/config_data/20190418/457279efd15e93dffaca8213e48c7f23.png"
				},
				{
					logo:"http://zywl.tarl.cc/public/uploads/images/config_data/20190418/7978b0297a1f46af42718274e5a72157.png"
				},
				{
					logo:"http://zywl.tarl.cc/public/uploads/images/config_data/20190418/3d969104ff2cf145dc9464e0b8c45d80.png"
				},
				{
					logo:"http://zywl.tarl.cc/public/uploads/config_data/images/20190814/d06647e09eb61353d435777c18f2b19d.jpg"
				}
			],
			indexSoldierList: [],
			mainCarsouelList: [],
			//首页最新发布分页参数
			param: {},
			params: {},
			mainNewlist: [],
			showHome:false
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.init();
		this.delSelectData();
		// this.handler();
		// this.__Sleep(e => {
		//   this.selfMainLoadClosed();
		// });
	},

	mounted() {
		var offTop = window.pageYOffset;
		var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		if (scrollTop > 0) {
			document.documentElement.scrollTop = 0;
		}
		window.addEventListener("scroll", this.handleScroll);
	},

	// destroyed() {
	// 	//移除滚动监听事件
	// 	window.removeEventListener("scroll", this.handleScroll);
	// },

	// beforeRouteLeave(to, from, next) {
	// 	if (to.path == "/newusercenter") {
	// 		to.meta.keepAlive = true;
	// 	}
	// 	next();
	// },

	methods: {
		init() {
			this.removeCache();
			this.param = this.initPage();
			this.params = this.initParam();

			var location = this.getCache("location", 2);
			if(location) {
				this.pageInfo.location_city = location.location_city;
			}
			this.initIndex();
			this.getMainNewList();
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

		initIndex() {
			var param = {
				token: this.getToken(),
				type: 1
			};
			this.__initAction("Banner-getData", param, (res, s) => {
				if(s == 1) {
				  this.mainCarsouelImgs = res.data;
				  this.showHome = true;
				}else {
				  this.showHome = false;
				}
			});
			var param = {
				token: this.getToken()
			};

			this.__initAction("Index-homeRepository", param, (res, s) => {
				if (s == 1) {
					this.connection_list = [];
					this.iconList = res.data.getNavigation;
					var arr = res.data.fourImages;
					for (var i = 0; i < arr.length; i++) {
						var it = arr[i];
						var add = {};
						add.logo = it.value;
						add.code = true;
						switch (i) {
							case 0:
								add.url = "/main_information/抢单赚钱/-1/1";
								break;
							case 1:
								add.url = "/insurance_center/0";
								break;
							case 2:
								add.url = "/main_information/企业招聘/-1/3";
								break;
							case 3:
								add.url = "/special_talents";
								break;
						}
						
						this.connection_list.push(add);
					}

					var arr = res.data.soldierImages;
					for (var i = 0; i < arr.length; i++) {
						var it = arr[i];
						var add = {};
						add.logo = it.image;
						add.id = it.id;
						add.url = "/main_soldier/";
						this.indexSoldierList.push(add);
					}
					var arr = res.data.hotImages;
					for (var i = 0; i < arr.length; i++) {
						var it = arr[i];
						var add = {};
						add.logo = it.image;
						add.id = it.id;
						add.url = "/service_main/";
						this.mainCarsouelList.push(add);
					}
				}
			});
			this.getArtInfo();
		},

		getArtInfo() {
			this.mainInfo.title = "招聘资讯";
			this.mainInfo.list = [];
			var param = {
				token: this.getToken(),
				pid: 0,
				length:10,
				page:1
			};
			this.__initAction("Index-getNoticeList", param, (res, s) => {
				if (s == 1) {
					if (res.data.length > 0) {
						for (let it of res.data) {
							var arr = {};
							arr.title = it.title;
							arr.id = it.id;
							arr.configId = it.configId;
							arr.pid = it.pid;
							this.mainInfo.list.push(arr);
						}
					}
				}
				// 获取菜单数据
				this.__Sleep(e => {
					this.selfMainLoadClosed();
				});
			});
		},

		getMainNewList() { //获取首页最新发布
			//   var params = {
			//     token: this.getToken(),
			//     lat: this.lat,
			//     lon: this.lon,
			//     cityId: this.cityId,
			//     page: this.param.page,
			//     length: this.param.length
			//   };
			// console.log(this.getUserInfo());
			this.__initAction("Index-getListNewestSemands", this.params, (res, s) => {
				if (s == 1) {
					this.param.count = res.count;
					for (let it of res.data) {
						var arr = {};
						arr.title = it.title;
						arr.name = it.lastName;
						arr.logo = it.portrait;
						arr.imgs = it.prices;
						arr.hot = it.view;
						arr.lon = it.lon;
						arr.lat = it.lat;
						arr.distance = it.distance;
						arr.time = it.create_time;
						arr.detail = it.infos;
						arr.id = it.id;
						arr.salary = it.serviceDatd;
						this.mainNewlist.push(arr);
					}
				} else {
					// this._msg("没有更多数据了");
					this.__Sleep(e => {
						this.selfMainLoadClosed();
					});
				}
			});
		},

		loadList() {
			var MaxPage = Math.ceil(this.param.count / this.param.length);
			var next = this.param.page + 1;
			if (MaxPage == next) {
				this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
				this._msg("没有更多数据了");
				setTimeout(() => {
					this.selfLoadClosed();
				}, 1000);
				return;
			} else {
				this.selfLoadOpend({
					mes: "",
					color: "fc-blue",
					font: 30,
					status: true
				});
				this.params.page = this.param.page = this.param.page + 1;
				this.getMore();
			}
		},

		getMore() {
			this.__initAction("Index-getListNewestSemands", this.params, (res, s) => {
				this.param.count = res.count;
				if (res.data.length > 0) {
					for (let it of res.data) {
						var arr = {};
						arr.title = it.title;
						arr.name = it.lastName;
						arr.logo = it.portrait;
						arr.imgs = it.prices;
						arr.hot = it.view;
						arr.lon = it.lon;
						arr.lat = it.lat;
						arr.distance = it.distance;
						arr.time = it.create_time;
						arr.detail = it.infos;
						arr.id = it.id;
						arr.salary = it.serviceDatd;
						this.mainNewlist.push(arr);
					}
					this._log(this.param.page + "------" + this.param.length);
					this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
				} else {
					this.selfLoadClosed();
					this._msg("没有更多数据了");
				}
			});
		},

		bannerToLink(bid) {
			this.$router.push(`/bannerdetail/${bid}`);
		},

		handleScroll() { //顶部导航栏滚动事件
			var offTop = window.pageYOffset;
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		  if(document.querySelector(".main-slider")) {
				let elementTop = document.querySelector(".main-slider").offsetHeight;
				var x = elementTop / 2;
				if (offTop > 5 && offTop <= x) {
					this.goScroll = "background-color:rgba(47, 155, 254, 0.1)";
				} else if (offTop > x && offTop <= elementTop) {
					this.goScroll = "background-color:rgba(47, 155, 254, 0.5)";
				} else if (offTop == 0) {
					this.goScroll = "display:flex";
				} else {
					this.goScroll = "display:none";
				}
			}
		},
		cancel() {
			this.pageInfo.toast_code = false;
		},

		go_connection(i) {
			if (i == 3) {
				this._msg("系统正在维护中");
				return;
			}
			var list = this.connection_list;
			if (list[i].code) {
				this.goURL({
					url: list[i].url,
					timeout: 300
				});
			} else {
				this.selfAlertBox({
					mes: "系统正在维护中",
					alert: true
				});
			}
		},

		// handler({ BMap, map }) {
		//   // console.log(BMap, map);
		//   var geolocation = new BMap.Geolocation();
		//   geolocation.getCurrentPosition(function(r) {
		//     console.log(r, 1234);
		//   });
		// },
		// getDataInfo() {
		//   var token = this.getToken();
		//   var url = this.Global.baseURL + "/Tools-getConfigData.jsp";
		//   this.axios
		//     .post(url, { token })
		//     .then(res => {
		//       if (res.data.status == 1) {
		//         var data = res.data.data.getList.enterpriseAgreement.value;
		//         data
		//           .replace(data ? /&(?!#?\w+;)/g : /&/g, "&amp;")
		//           .replace(/&lt;/g, "<")
		//           .replace(/&gt;/g, ">")
		//           .replace(/&quot;/g, '"')
		//           .replace(/&#39;/g, "'");

		//         this.getIndexMain(token);
		//       }
		//     })
		//     .catch(err => {
		//       // console.error(err);
		//     });
		// },

		// getConfigInfo() {
		//   var url = this.Global.baseURL + "/Tools-getConfigData.jsp";
		//   var token = this.getToken();
		//   this.axios
		//     .post(url, { token })
		//     .then(res => {
		//       // console.log(res.data);
		//       if (res.data.status == 1) {
		//         var data = res.data.data.uInfoData;
		//         info.name = data.lastName;
		//         info.birthday = data.birthday;
		//         info.logo = data.portrait;
		//       }
		//     })
		//     .catch(err => {
		//       this.selfMainLoadClosed();
		//       console.error(err);
		//     });
		// },
		//banner跳转
	},

	components: { //首页四个直通车跳转函数
		"self-info-card": InfoCard,
		"self-load-frame": LoadFrame,
		"self-no-data": NoData
	}
};
</script>

<style lang="scss">
span.yd-slider-pagination-item {
		width: 13px;
		height: 4px;
		border-radius: 4px;
		display: none;
		margin: 10px 5px;
}

.topBar div.yd-rollnotice {
		width: 65%;
		height: 2.8rem;
		display: flex;
		align-items: center;
		line-height: 2.8rem;
}

.yd-rollnotice-box {
		height: 100%;
		width: 100%;
}

div.yd-rollnotice-item > a {
		padding-left: 15px;
		width: 100%;
		font-size: 14px;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap
}

.yd-grids-group {
		width: 100%;
		height: 225px;
		padding-top: 10px;
		padding-bottom: 10px;
		background: rgb(240, 240, 240);
}

.yd-grids-item {
		padding: 10px;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
				width: 155px;
				height: 66px;
		}
}
.indexSoldierList {
		img {
				width: 100%;
		}
}

.connection_item{
	.item{
		line-height: 104px;
		.item_img{
			height: auto !important;
			vertical-align: middle;
		}
	}
}
.main_cityName {
	    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
</style>
