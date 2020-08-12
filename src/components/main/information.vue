<template>
	<div class="main_information w-100">
		<div class="banner-box" :style="bannerIndex">
			<yd-slider autoplay="0" pagination-color="#dce6ec" pagination-activecolor="white" index="1">
				<yd-slider-item v-for="(tmp,i) of bannerInfoList" :key="i">
					<router-link :to="`/bannerDetail/${tmp.id}`">
						<img :src="tmp.image">
					</router-link>
				</yd-slider-item>
			</yd-slider>
		</div>
		<div class="create-fixed-super"></div>

		<self-select-tabbar :list="tabbarList" :height="50" :arrow="true" :font="'14px'" :index="0" @callBack="select_tab_value"></self-select-tabbar>

		<div class="clear_fixed"></div>

		<self-push-up @callback="getMore" :ajaxUrl="pushUpParam.ajaxUrl" :pages="pushUpParam.param" :params="pushUpParam.params">
			<div class="info_content" v-if="getData.type == 1" slot="plate">
				<router-link :to="{path:'/service_detail',query:{id:tmp.id,code:0,lng:tmp.lng,lat:tmp.lat}}" class="cards w-100 bg-white mb-1" v-for="(tmp,i) in pushUpParam.dataList" :key="i">
					<self-info-card :data="tmp"></self-info-card>
				</router-link>
			</div>

			<div class="info_content" v-if="getData.type == 3" slot="plate">
				<router-link :to="/post_info/+tmp.id" class="post_info_cards bg-white w-100 mb-1" v-for="(tmp,i) in pushUpParam.dataList" :key="i">
					<self-post-card :data="tmp" class="bg-white"></self-post-card>
				</router-link>
			</div>

			<div class="info_content" v-if="getData.type == 2" slot="plate">
				<router-link :to="{ path: '/skill_detail', query: {id:tmp.id,code:1,lng:tmp.lng,lat:tmp.lat}}" class="cards mb-1 w-100 bg-white" v-for="(tmp,i) in pushUpParam.dataList" :key="i">
					<self-info-card :data="tmp"></self-info-card>
				</router-link>
			</div>
		</self-push-up>
		<a href="javascript:;" class="ifImg" v-if="isNuno">
			<img :src="Img">
		</a>
	</div>
</template>
<script>
const NoData = ()=>import("../sub/noDataModel.vue");
const PushUp = ()=>import("../sub/push_up_frame");
const SelectTabbar = ()=>import("../sub/select_tabbar");
const PostCard = ()=>import("../sub/post_card");
const InfoCard = ()=>import("../sub/info_card");
const LoadFrame = ()=>import("../sub/loading_frame");
export default {
	data() {
		return {
			pageInfo: {
				header_title: "",
				bannarType: 9
			},
			pushUpParam: {
				param: this.initPage(),
				params: this.initParam(),
				ajaxUrl: "Index-getNoticeList",
				dataList: []
			},
			tabbarList: [{
					title: "推荐",
					labels: [{
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
					labels: [{
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
			demandList: [], //抢单赚钱数组
			interviewerList: [], //企业招聘信息数组;
			skillList: [], //主页三级技能数组;
			getData: {},
			bannerInfoList: [],
			bannerIndex: {
				top: true
			},
			param: {
				page: 0,
				length: 10,
				count: null
			},
			Img:"",
			isNuno:false
		};
	},
	mounted() {
		setTimeout(() => {
			var h = $(".nav_header").css("height");
			var hn = $(".main_information .banner-box .yd-slider img").css("height");
			hn = parseInt(hn.substr(0, 3));
			h = parseInt(h.substr(0, 2));
			this.bannerIndex.top = `${h}px`;
			$(".main_information .select_tabbar_plate").css("top", `${h+hn}px`);
			$(".main_information .create-fixed-super").css("height", `${hn}px`);
		}, 1000);
	},
	created() {
		this.selfMainLoadOpend();
		this.init();
		var i = this.getCache("NULL_SALARY_IMG");
		this.Img = this.str2json(i).val;
	},
	methods: {
		init() {
			this.getData.name = this.getParams().name;
			this.getData.mid = this.getParams().mid;
			this.getData.type = this.getParams().type;
			this.$store.commit("setHeaderStyle", {
				txt: this.getData.name,
				type: 1
			});

			let location = this.getCache("location",2);
			var select_data = this.getCache("select_data", 2);
			if(select_data) {
				if(select_data.select_city) {
					this.pushUpParam.params.cityId = select_data.select_city.city_id;
					this.pushUpParam.params.lat = select_data.select_city.lat;
					this.pushUpParam.params.lon = select_data.select_city.lng;
				}else {
					this.pushUpParam.params.cityId = location.cityId;
					this.pushUpParam.params.lat = location.lat;
					this.pushUpParam.params.lon = location.lon;
				}
			}else {
				this.pushUpParam.params.cityId = location.cityId;
				this.pushUpParam.params.lat = location.lat;
				this.pushUpParam.params.lon = location.lon;
			}

		
			switch (this.getData.mid) {
				case "-1":
					this.pushUpParam.ajaxUrl = "Hotnews-preview";
					this.pushUpParam.params.sort = 1;
					this.pushUpParam.params.classType = "";
					this.pushUpParam.params.newTime = 4;
					switch (this.getData.type) {
						case "1":
							this.pushUpParam.params.types = 1;
							break;
						case "3":
							this.pushUpParam.params.types = 3;
							break;
						default:
							break;
					}
					break;
				default:
					switch (this.getData.type) {
						case "2":
							this.pushUpParam.ajaxUrl = "Index-getNavigationList";
							this.pushUpParam.params.id = this.getData.mid;
							break;
						default:
							console.log(this.getData);
							break;
					}
					break;
			}
			this.getDataList();
			this.getBannerImage();
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},
		//请求数据
		getDataList() {
			console.log(this.pushUpParam.params)
			this.__initAction(
				this.pushUpParam.ajaxUrl,
				this.pushUpParam.params,
				(res, s) => {
					if (res.status != 1) {
						// this._msg(res.info);
						return false;
					}else{
						if(res.data.count == 0) {
							this.isNuno = true;
						}else {
							this.isNuno = false;
							switch (this.getData.type) {
								case "1":
									for (let it of res.data) {
										var arr = {};
										arr.title = it.title;
										arr.name = it.c_user.lastName;
										arr.logo = it.c_user.portrait;
										arr.imgs = it.prices;
										arr.hot = it.view;
										arr.lng = it.lon;
										arr.lat = it.lat;
										arr.distance = it.distance;
										arr.time = it.create_time;
										arr.detail = it.infos;
										arr.id = it.id;
										arr.salary = it.serviceDatd;
										this.pushUpParam.dataList.push(arr);
									}
									break;
								case "2":
									if (!res.data) return;
									var data = res.data.lists;
									for (let it of data) {
										var arr = {};
										arr.title = it.title;
										arr.name = it.lastName;
										arr.logo = it.portrait;
										arr.imgs = it.images;
										arr.hot = it.view;
										arr.lng = it.lon;
										arr.lat = it.lat;
										arr.distance = it.distance;
										arr.time = it.create_time;
										arr.detail = it.infos;
										arr.id = it.id;
										arr.salary = it.price;
										this.pushUpParam.dataList.push(arr);
									}
									break;
								case "3":
									for (let it of res.data) {
										var arr = {};
										arr.title = it.title;
										arr.name = it.lastName;
										arr.logo = it.portrait;
										arr.addr = it.addressInfo;
										arr.hot = it.view;
										arr.lng = it.lon;
										arr.lat = it.lat;
										arr.position = "人事经理";
										arr.distance = it.distance;
										arr.time = it.create_time;
										arr.id = it.id;
										arr.salary = it.prices;
										arr.education = it.education;
										arr.experience = it.exp;
										this.pushUpParam.dataList.push(arr);
									}
									break;
								default:
									console.log(res);
									break;
							}
						}
						
					}
					this.pushUpParam.param.count = res.count;
					this.param.count = res.data.counts;
					// console.log("getCount", this.pushUpParam.param.count);
					this.selfMainLoadClosed();
				}
			);
		},
		getMore() {
			var MaxPage = Math.ceil(this.param.count / this.param.length);
			var next = this.param.page + 1;
			if (MaxPage == next) {
				this._msg("已经到底了");
				// this.selfLoadOpend({
				// 	mes: "没有更多数据了",
				// 	status: false
				// });
				setTimeout(() => {
					this.selfLoadClosed();
				}, 1500);
				return;
			} else {
				this.selfLoadOpend({
					mes: "加载数据中...",
					color: "fc-blue",
					font: 30,
					status: true
				});
				// var page = next * this.param.length;
				this.getPageInfo(next);
			}
		},
		getPageInfo(next){
			this.pushUpParam.params.page = next;
			this.__initAction(
				this.pushUpParam.ajaxUrl,
				this.pushUpParam.params,
				(res, s) => {
					if (res.status != 1) {
						// this._msg(res.info);
						return false;
					}else{
						switch (this.getData.type) {
							case "1":
								for (let it of res.data) {
									var arr = {};
									arr.title = it.title;
									arr.name = it.lastName;
									arr.logo = it.portrait;
									arr.imgs = it.prices;
									arr.hot = it.view;
									arr.lng = it.lon;
									arr.lat = it.lat;
									arr.distance = it.distance;
									arr.time = it.create_time;
									arr.detail = it.infos;
									arr.id = it.id;
									arr.salary = it.serviceDatd;
									this.pushUpParam.dataList.push(arr);
								}
								break;
							case "2":
								if (!res.data) return;
								var data = res.data.lists;
								for (let it of data) {
									var arr = {};
									arr.title = it.title;
									arr.name = it.lastName;
									arr.logo = it.portrait;
									arr.imgs = it.images;
									arr.hot = it.view;
									arr.lng = it.lon;
									arr.lat = it.lat;
									arr.distance = it.distance;
									arr.time = it.create_time;
									arr.detail = it.infos;
									arr.id = it.id;
									arr.salary = it.price;
									this.pushUpParam.dataList.push(arr);
								}
								break;
							case "3":
								for (let it of res.data) {
									var arr = {};
									arr.title = it.title;
									arr.name = it.lastName;
									arr.logo = it.portrait;
									arr.addr = it.addressInfo;
									arr.hot = it.view;
									arr.lng = it.lon;
									arr.lat = it.lat;
									arr.position = "人事经理";
									arr.distance = it.distance;
									arr.time = it.create_time;
									arr.id = it.id;
									arr.salary = it.prices;
									arr.education = it.education;
									arr.experience = it.exp;
									this.pushUpParam.dataList.push(arr);
								}
								break;
							default:
								console.log(res);
								break;

						}
					}
					this.param.page++;
					this.selfMainLoadClosed();
				}
			);
		},
		//获取轮播图
		getBannerImage() {
			var token = this.getToken();
			var url = "Banner-getData";
			var type = this.pageInfo.bannarType;
			this.__initAction(url, {
				token,
				type
			}, (res, s) => {
				if (s == 1) {
					// console.log(res.data);
					this.bannerInfoList = [];
					this.bannerInfoList = res.data;
					// var bannerData = res.data.imgData;
					// if (bannerData.hotPostImg) {
					//   console.log("3有图");
					//   this.bannerInfoList = bannerData.hotPostImg;
					//   console.log(this.bannerInfoList);
					// } else if (bannerData.hotResumeImg) {
					//   console.log("4有图");
					//   this.bannerInfoList = bannerData.hotResumeImg;
					//   console.log(this.bannerInfoList);
					// }
				}
			});
		},
		select_tab_value(v) {
			if (v) {
				// console.log(v);
			}
		}
	},
	components: {
		"self-no-data": NoData,
		"self-select-tabbar": SelectTabbar, //引用选择导航栏组件
		"self-post-card": PostCard, //引用岗位信息组件
		"self-load-frame": LoadFrame, //引用load提示框组件
		"self-info-card": InfoCard, //引用兼职/技能信息组件
		"self-push-up": PushUp
	}
};
</script>
<style lang="scss">
	* { touch-action: pan-y; }
</style>
<style lang="scss" scoped>
	.clear_fixed {
		height: 50px;
	}

	.info_content {
		padding-top: 5px;
		// padding-bottom: 20%;
		overflow: scroll;

		.cards {
			display: inline-block;
			text-decoration: none;
			padding: 10px;
		}

		.post_info_cards {
			display: inline-block;
			width: 100%;
			text-decoration: none;
			padding: 15px;
		}

		.resume_items {
			display: inline-block;
			text-decoration: none;
			width: 100%;
			padding: 10px 15px;
		}
	}
	.main_information {
		.banner-box {
			width: 100%;
			position: fixed;
			.yd-slider {
				width: 100%;
				height: 100%;
				a {
					width: 100%;
					height: 100%;
				}
				img {
					height: 100%;
					width: 100%;
				}
			}
		}
		.create-fixed-super {
			width: 100%;
			height: 140px;
		}
	}
	.ifImg img{ width: 80%; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);z-index: -99; }
</style>
