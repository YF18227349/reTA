<template>
	<div class="main_soldier w-100">
		<div class="banner-box" ref="barEle">
			<yd-slider autoplay="0" pagination-color="#dce6ec" pagination-activecolor="white" index="1">
				<yd-slider-item v-for="(item,i) of bannerInfoList" :key="i">
					<router-link :to="`/bannerDetail/${item.id}`">
						<img :src="item.image">
					</router-link>
				</yd-slider-item>
			</yd-slider>
		</div>

		<div class="create-fixed"></div>

		<div class="navbar">
			<ul class="navbar-bar">
				<li class="navbar-item" v-for="(item,i) of navBarList" :key="i">
					<span v-text="item.title"></span>
					<span class="iconfont icon-arrowdown"></span>
				</li>
			</ul>
		</div>

		<div class="nav-create-fixed" :style="superStyle"></div>

		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
			<ul class="main_soldier_group w-100" slot="list">
				<li class="soldier_list bg-white w-100" v-for="(item,i) in soldier_list" :key="i">
					<router-link :to="/resumeinfo/+item.id" class="list_items w-100">
						<div class="soldier_infos w-100">
							<span class="soldier_logo">
								<img :src="item.logo" alt class="imgs shadow-dark">
							</span>
							<div class="soldier_text">
								<div class="soldier_info">
									<span class="fm-1 fw-6 fc-dark">{{item.name}}</span>
									<span class="fm-1 fw-6 fc-blue">{{item.salary}}</span>
								</div>
								<div class="soldier_info">
									<span class="fs-3 fw-6 fc-gray">{{item.resumeIndustry}}</span>
								</div>
							</div>
						</div>
						<div class="soldier_detail w-100">
							<span class="fs-3 fw-6 fc-gray">{{item.infos}}</span>
						</div>
					</router-link>
					<div class="marks">
						<span class="iconfont icon-eye3 fs-3 fw-6 fc-gray">&nbsp;{{item.view}}</span>
						<span class="fs-3 fw-6 fc-gray">{{item.time}}</span>
					</div>
				</li>
			</ul>
			<!-- 数据全部加载完毕显示 -->
			<span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span>
		</yd-infinitescroll>

		<a class="mt-5" href="javascript:;" v-if="soldier_list.length<=0">
			<self-no-data :title="loadMord" size="16"></self-no-data>
		</a>
	</div>
</template>
<script>
const NoData = ()=>import("../sub/noDataModel.vue");
export default {
	data() {
		return {
			loadMord: '',
			pageInfo: {
				header_title: "军人列表",
				bannerType: 9
			},
			navBarList: [{
					title: "智能排序"
				},
				{
					title: "类别排序"
				},
				{
					title: "发布日期"
				}
			],
			soldier_list: [],
			bannerInfoList: [],
			param: {
				page: null,
				length: null,
				count: null
			},
			hot: 0,
			// 样式控制
			superStyle: {
				hegiht: true
			}
		};
	},
	created() {
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 0
		});
		this.getPageInfo(0);
		this.getBannerImage();
	},
	mounted() {
		this.autoFixedSize();
	},
	methods: {
		autoFixedSize() {
			var h = this.$refs.barEle.offsetHeight;
			this.superStyle.height = `${h}px`;

		},
		// 获取公共信息--幻灯片
		getBannerImage() {
			var token = this.getToken();
			var url = "Banner-getData";
			var type = this.pageInfo.bannerType;
			this.__initAction(url, {
				token,
				type
			}, (res, s) => {
				if (s == 1) {
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
		getPageInfo(x) {
			var token = this.getToken();
			this.param.length = this.Global.length_num;
			var hot = this.hot;
			var length = this.param.length;
			if (x == 0) {
				this.param.page = this.Global.page_num;
				var page = this.param.page;
			} else {
				var page = x;
			}

			var params = {
				token,
				page,
				length,
				hot
			};
			var url = this.Global.baseURL + "/Index-getSoldierList.jsp";
			this.selfMainLoadOpend();
			this.axios
				.post(url, params)
				.then(res => {
					console.log(res.data);
					if (res.data.status == 1) {
						this.param.count = res.data.count;

						var data = res.data.data;
						if (data && data.length > 0) {
							for (let it of data) {
								var arr = {};
								arr.id = it.id;
								arr.name = it.consignee;
								arr.logo = it.portrait;
								arr.salary = it.salary;
								arr.time = it.create_time;
								arr.infos = it.infos;
								arr.resumeIndustry = it.resumeIndustry;
								arr.view = it.view;
								this.soldier_list.push(arr);
							}
						} else {
							this.selfToast({
								mes: "暂时没有数据了",
								timeout: 1500,
								icon: "error"
							});
						}
						this.$refs["infinitescrollDemo"].$emit(
							"ydui.infinitescroll.finishLoad"
						);
						this.param.page++;
						this.selfMainLoadClosed();
					} else {
						if (res.data.code == -1) {
							this.selfToast({
								mes: "登录超时请重试",
								timeout: 1500,
								icon: "error"
							});
							setTimeout(() => {
								this.selfMainLoadClosed();
								this.$router.push("/login");
							}, 1600);
						} else if (res.data.code == '0000000001') {
							this.loadMord = '暂无数据...';
							setTimeout(() => {
								this.selfMainLoadClosed();
							}, 1500);
						} else {
							// this.selfToast({
							// 	mes: res.data.info,
							// 	timeout: 1500,
							// 	icon: "error"
							// });
							setTimeout(() => {
								this.selfMainLoadClosed();
							}, 1500);
						}
					}
				})
				.catch(err => {
					this.selfToast({
						mes: res.data.info,
						timeout: 1500,
						icon: "error"
					});
					setTimeout(() => {
						this.selfMainLoadClosed();
					}, 1500);
					console.error(err);
				});
		},

		loadList() {
			var MaxPage = Math.ceil(this.param.count / this.param.length);
			var next = this.param.page + 1;
			if (MaxPage == next) {
				this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
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
		}
	},

	components: {
		"self-no-data": NoData
	}
};
</script>
<style lang="scss" scoped>
	.create-fixed {
		height: 46.69px;
	}
	.banner-box {
		width: 100%;
		height: 140px;
		position: fixed;
		top: 46.69px;
	}
	.banner-box > div,
	.banner-box a,
	.banner-box img {
		width: 100%;
		height: 100%;
	}
	.navbar {
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		position: fixed;
		top: 186.69px;
		.navbar-bar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.navbar-item {
				padding: 10px;
				color: #888888;
				font-size: 14px;
			}
		}
	}
	.nav-create-fixed {
		width: 100%;
	}
</style>
