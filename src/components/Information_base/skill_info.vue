<template>
	<div class="skill_detail w-100">
		<div class="service_detail_items w-100 pt-4" v-if="skillInfoList.u_name">
			<div class="item_info w-100 bg-white mb-3">
				<div class="item_logo">
					<img :src="skillInfoList.u_logo" alt>
				</div>
				<div class="item_text">
					<div class="item_text_title">
						<span>{{skillInfoList.u_name}}</span>
						<span class="item_icon iconfont" :class="skillInfoList.u_type == 0 ?'icon-renzheng fc-green':'icon-3qiyezhengxin83a638 fc-blue'"></span>
					</div>
					<div class="item_text_detail">
						<div class="user_score">
							<span>{{skillInfoList.u_score}}信用分</span>
							[
							<router-link to="/readingguide/15">信用分规则</router-link>
							]
						</div>
						<div class="user_distance">
							<span class="iconfont icon-dingwei2"></span>
							<span>{{skillInfoList.u_distance}}km</span>
						</div>
						<div class="user_hot">
							<span class="iconfont icon-eye"></span>
							<span>{{skillInfoList.u_hot}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="service_detail_list w-100 bg-white">
				<div>
					<span>我的兼职</span>
					<span>{{skillInfoList.u_skill}}</span>
				</div>
				<div>
					<span>服务酬金</span>
					<span class="fc-red">{{skillInfoList.u_salary}}</span>
				</div>
				<div>
					<span>服务时间</span>
					<span>{{skillInfoList.u_serviceTime}}</span>
				</div>
				<div>
					<span>我的标签</span>
					<span>{{skillInfoList.u_skillTags}}</span>
				</div>
			</div>
			<!-- <p class="service_text fc-red" v-if="type==0">
					保证金为双方顺利履约的保障，如一方违约，则双方缴纳的保证
					金归未违约方所有；双方正常履约互评后，保证金原路退回至各
					自余额。
				</p>-->
			<div class="service_detail_info bg-white w-100 mt-3">
				<span class="fs-3 fw-6 fc-dark">服务介绍</span>
				<span class="detail_txt fc-gray">{{skillInfoList.u_detailText}}</span>
				<div class="detail_imgs w-100">
					<!-- <span class="img" v-for="(tmp,i) in skillInfoList.u_imgsURL" :key="i">
						<img :src="tmp" alt @click="imgChange(tmp)">
					</span> -->
					<yd-lightbox style="width:100%;">
						<yd-lightbox-img class="img" v-for="(item,i) in skillInfoList.u_imgsURL" :key="i" :src="item"></yd-lightbox-img>
					</yd-lightbox>
				</div>
			</div>

			<div class="mt-3 bg-white">
				<div class="warn-parent">
					<div class="first-ch">
						<yd-icon name="warn-outline" size="2rem" color="#ff685d"></yd-icon>
					</div>
					<div class="last-ch fc-gray">
						<span>
							警示：以招聘为名收取培训费用、提供培训贷款，或在录用过
							程中需体检、服装、押金登费用的，都属于违法行为。
							一经发现，请
							<router-link :to="`/report/skills/${dataId}`" class="warn-link">立即举报</router-link>，并向当地公安机关报案
						</span>
					</div>
				</div>
			</div>

			<div class="service_footer shadow-dark w-100">
				<!-- <router-link class="bg-white text-center" :to="{ path: '/service_chat', query: {id:this.id,status:0,code:this.code,lng:this.lng,lat:this.lat,url:this.url}}">
					<span class="iconfont icon-kefu"></span>
					<span class="fw-6 fm-1">在线沟通</span>
				</router-link> -->
				<a href="javascript:;" class="bg-white text-center" @click.prevent="do_chat()">
					<span class="iconfont icon-kefu"></span>
					<span class="fw-6 fm-1">在线沟通</span>
				</a>
				<a class="bg-blue" @click.prevent="rightOff">
					<span class="fc-white fm-2 fw-6">立即预约</span>
				</a>
			</div>
		</div>
		<!-- 放大图片框 -->
		<!-- <div class="le-pic">
			<span>x</span>
			<img src="" alt="">
		</div> -->
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: "技能详情"
			},
			type_list: {
				title: "兼职详情",
				type: "skills",
				// url: "/Skills-infoMemberSkills.jsp"
			},
			userId: null,
			id: null,
			type: null,
			lng: "",
			lat: "",
			code: null,
			dataId: null,
			url: "/Skills-infoMemberSkills.jsp",
			skillInfoList: {
				u_name: "",
				u_logo: "",
				u_type: null,
				u_score: "",
				u_distance: "",
				u_hot: "",
				u_demand: "",
				u_salary: null,
				u_skillTags: "",
				// u_remuneration: "100",
				// u_endTime: "2018-11-11",
				u_adress: "",
				// u_guarantee: "300",
				u_imgsURL: "",
				u_serviceTime: "",
				u_detailText: "负责批改教育机构假期学生考试作业以及教材资料，工作内容：评阅小学1-6年级数学语文卷子，提供答案，评阅，评分，改对错！",
				userInfo: null,
				myInfo: null
			}
		};
	},
	beforeRouteLeave(to, from, next) {
		if (to.path == "/Information") {
			to.meta.keepAlive = true;
		}else if(to.path == `/report/skills/${this.dataId}`) {
            to.meta.needLogin = true;
		}
		next();
	},
	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 1
		});
		this.getPageInfo();
		this.delCache("paymentInfo");
		this.delCache("chatQuery");
	},
	mounted() {
		$(".yd-lightbox-head").css("marginTop", ".5rem");
		// $(".header_left")
		//   .attr("href", "javascript:;")
		//   .click(() => {
		//     this.exit_btn();
		//   });
		this.__Sleep(e => {
			this.selfMainLoadClosed();
		}, 1000);
	},
	destroyed() {
		// $(".header_left")
		//   .attr("href", "javascript:history.go(-1)")
		//   .unbind("click");
	},
	methods: {
		getPageInfo() {
			var token = this.getToken();
			var params = this.getQuery();
			var url = this.url;
			if (!params.id) {
				this.$dialog.toast({
					mes: "获取信息失败请重试...",
					timeout: 1500,
					icon: "error"
				});
				setTimeout(() => {
					window.history.go(-1);
				}, 1600);
				return;
			}
			this.id = params.id;
			this.lng = params.lng;
			this.lat = params.lat;
			this.code = params.code;
			var info = {
				token,
				id: this.id,
				lon: this.lng,
				lat: this.lat,
				type: this.code
			};
			var location = this.getCache('location', 2);
			info.lon = location.lon;
			info.lat = location.lat;
			this.getDataInfo(info, url);
		},

		getPageInfo1() {
			var token = this.getToken();
			var params = this.getQuery();
			var url = this.url;
			// console.log(21, params);
			var info = this.getSelectData();
			// console.log(3534, info);
			// info.pageInfo.service_detail = null;
			if (info.pageInfo.service_detail) {
				var value = info.pageInfo.service_detail;
				this.lng = value.lng;
				this.lat = value.lat;
				this.id = value.id;
				this.code = value.code;
				var info = {
					token,
					id: this.id,
					lon: this.lng,
					lat: this.lat,
					type: this.code
				};
				this.getDataInfo(info, url);
			} else if (!params.id) {
				this.$dialog.toast({
					mes: "获取信息失败请重试...",
					timeout: 1500,
					icon: "error"
				});
				setTimeout(() => {
					window.history.go(-1);
				}, 1600);
				return;
			} else {
				this.id = params.id;
				this.lng = params.lng;
				this.lat = params.lat;
				this.code = params.code;
				var info = {
					token,
					id: this.id,
					lon: this.lng,
					lat: this.lat,
					type: this.code
				};
				this.getDataInfo(info, url);
			}
		},

		getDataInfo(params, url) {
			var url = this.Global.baseURL + url;
			this.axios
				.post(url, params)
				.then(res => {
					this.$dialog.loading.close();
					if (res.data.status == 1) {
						var data = res.data.data.dataList;
						var user = res.data.data.dataList.leftMemberData;
						// var mySelf = res.data.data.myInfo;
						var arr = this.skillInfoList;
						console.log(data)
						this.dataId = data.id;
						arr.u_skill = data.title;
						arr.u_imgsURL = data.images;
						arr.u_detailText = data.infos;
						arr.u_adress = data.addressInfo;
						arr.u_serviceTime = data.serviceTime;
						arr.u_skillTags = data.skillsTags;
						arr.u_salary = data.price;
						arr.u_distance = data.distance;
						arr.u_hot = data.view;
						arr.u_type = this.type;
						arr.id = data.userId;
						this.userId = data.userId;
						console.log(user)
						arr.u_name = user.lastName;
						arr.u_logo = user.portrait;
						arr.u_score = user.loginTimes;
						this.userInfo = user;
						// this.myInfo = mySelf;
					} else {
						this.clear_page_info();
						if (res.data.code == -1) {
							setTimeout(() => {
								this.$router.push("/login");
							}, 300);
						} else {
							this.$dialog.toast({
								mes: "获取信息失败请重试...",
								timeout: 1500,
								icon: "error"
							});
							this.clear_page_info();
							setTimeout(() => {
								// window.history.go(-1);
							}, 1600);
						}
					}
				})
				.catch(err => {
					this.$dialog.loading.close();
					this.$dialog.toast({
						mes: "网路故障请重试...",
						timeout: 1500,
						icon: "error"
					});
					this.clear_page_info();
					setTimeout(() => {
						window.history.go(-1);
					}, 1600);
					console.error(err);
				});
		},

		imgChange(pic) { //点击方法图片
			console.log(pic);
		},

		clear_page_info() {
			var info = this.getSelectData();
			if (info.pageInfo.service_detail) {
				info.pageInfo.service_detail = null;
			}
			this.setCache("select_data", JSON.stringify(info));
		},

		exit_btn() {
			this.clear_page_info();
			setTimeout(() => {
				window.history.go(-1);
			}, 200);
		},

		do_chat() {
			let isLogin = this.getCache('user_info');
			if(isLogin) {
				var userId = this.userId; //产品发布人id
				var baseUid = this.getUserInfo().uid; //用户id
				var sign = this.type_list.type; //项目标识符 (比如: 兼职=demands 技能= skills 岗位=quarters 简历=resume)
				var gid = this.id; //产品的id
				if (baseUid == userId) { //判断本地用户id 与 产品发布人id 是否相等
					this.selfAlertBox({
						mes: "您不能和自己发布的订单沟通",
						cancel: false,
						alert: true
					});
					return;
				}
				var query = {
					sign,
					gid,
					toUid: userId
				};
				this.$router.push({
					path: "/service_chat",
					query
				});
			} else {
				this.__Href("/login");
			}
		},

		rightOff() {
			let isLogin = this.getCache('user_info');
			if(isLogin) {
			var c_status = 1;
			var sign = this.type_list.type; //项目标识符 (比如: 兼职=demands 技能= skills 岗位=quarters 简历=resume)
			var gid = this.id; //产品的id
			var token = this.getToken();
			var goodsInfo = `${sign}|${gid}`;
			var url = "Tloong-getSwopUpd";
			var params = {
				goodsInfo,
				c_status,
				token
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					this._msg("已抢单请耐心等待(^_^)");
				} else {
					this._msg(res.info);
				}
			});
			}else {
                this.__Href("/login");
			}
		}

	},
};
</script>
<style lang="scss">
	.warn-parent {
		display: flex; justify-content: space-between; padding: 15px 10px;
		.first-ch { display: flex; flex-direction: column; justify-content: center; margin-right: 0.5rem; }
		.last-ch {
			font-size: 14px;
			.warn-link { color: #2f9bfe; text-decoration: #ddd; }
		}
	}
	div.skill_detail .service_detail_list div { border-top: 1px solid #e7e7e7; }
	div.skill_detail .service_detail_list div:last-child { border-bottom: none; }
	div.skill_detail .service_detail_list div:first-child { border-bottom: none; }
	.img{ padding: 3px !important; width: 5rem !important; height: 5rem; }
</style>
