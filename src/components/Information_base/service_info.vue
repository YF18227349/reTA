<template>
	<div class="service_detail w-100">
		<div class="service_detail_items w-100 pt-4" v-if="serviceInfoList.u_name">
			<div class="item_info w-100 bg-white">
				<div class="item_logo">
					<img :src="serviceInfoList.u_logo" alt>
				</div>
				<div class="item_text">
					<div class="item_text_title">
						<span>{{serviceInfoList.u_name}}</span>
						<span class="item_icon iconfont" :class="serviceInfoList.u_type == 0 ?'icon-renzheng fc-green':serviceInfoList.u_type == 1?'icon-3qiyezhengxin83a638 fc-blue':''"></span>
					</div>
					<div class="item_text_detail">
						<div class="user_score">
							<span>{{serviceInfoList.u_score}}信用分</span>
							[
							<router-link to="/readingguide/15">信用分规则</router-link>
							]
						</div>
						<div class="user_distance">
							<span class="iconfont icon-dingwei2"></span>
							<span>{{serviceInfoList.u_distance}}km</span>
						</div>
						<div class="user_hot">
							<span class="iconfont icon-eye"></span>
							<span>{{serviceInfoList.u_hot}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="service_detail_list w-100 bg-white">
				<div>
					<span>我的兼职</span>
					<span>{{serviceInfoList.u_demand}}</span>
				</div>
				<div>
					<span>订单酬金</span>
					<span class="fc-red">{{serviceInfoList.u_remuneration}}</span>
				</div>
				<div>
					<span>截止日期</span>
					<span>{{serviceInfoList.u_endTime}}</span>
				</div>
				<div>
					<span>任务地址</span>
					<span>{{serviceInfoList.u_adress}}</span>
				</div>
			</div>
			<!-- <div class="service_guarantee bg-white">
				<span>保障金</span>
				<span class="guarantee_count fc-red">{{serviceInfoList.u_guarantee}}</span>
			</div>
			<p class="service_text fc-red">
				保证金为双方顺利履约的保障，如一方违约，则双方缴纳的保证
				金归未违约方所有；双方正常履约互评后，保证金原路退回至各
				自余额。
			</p> -->
			<div class="service_detail_info bg-white w-100">
				<span>兼职详情</span>
				<span class="detail_txt fc-gray">{{serviceInfoList.u_detailText}}</span>
				<div class="detail_imgs w-100">
					<!-- <span class="img" v-for="(tmp,i) in serviceInfoList.u_imgsURL" :key="i">
						<img :src="tmp" alt>
					</span> -->
					<yd-lightbox style="width:100%;">
						<yd-lightbox-img class="img" v-for="(item,i) in serviceInfoList.u_imgsURL" :key="i" :src="item"></yd-lightbox-img>
					</yd-lightbox>
				</div>
			</div>

			<div class="mt-3 bg-white">
				<div class="warn-parent">
					<div class="first-ch">
						<yd-icon name="warn-outline" size="2rem" color="#ff685d"></yd-icon>
					</div>
					<div class="last-ch fc-gray">
						<span>警示：以招聘为名收取培训费用、提供培训贷款，或在录用过
							程中需体检、服装、押金登费用的，都属于违法行为。
							一经发现，请
							<router-link :to="`/report/demands/${dataId}`"  class="warn-link">
								立即举报
							</router-link>
							，并向当地公安机关报案</span>
					</div>
				</div>
			</div>

			<div class="service_footer shadow-dark w-100">
				<a href="javascript:;" class="bg-white text-center" @click.prevent="do_chat()">
					<span class="iconfont icon-kefu"></span>
					<span class="fw-6 fm-1">在线沟通</span>
				</a>
				<!-- do_show() -->
				<a class="bg-blue" @click.prevent="rightOff">
					<span class="fc-white fm-2 fw-6">立即抢单</span>
				</a>
			</div>
			<!-- <div>
				<div class="showToast" v-if="show" @click.prevent="do_show()"></div>
				<div class="toastText bg-white" :class="show ?'up':'down'">
					<ul class="rob_confirm_items">
						<li class="item1">
							<span>技能保障金</span>
							<span class="fc-red">¥{{serviceInfoList.u_remuneration}}</span>
						</li>
						<li class="item2">
							<span class="select_btn">请选择支付方式</span>
							<div class="rob_btn">
								<a href="javascript:;" :class="isBtnCode ? 'selected':'unSelected'" @click="select_btn(true)">平台支付</a>
								<a href="javascript:;" :class="!isBtnCode ? 'selected':'unSelected'" @click="select_btn(false)">线下支付</a>
							</div>
						</li>
						<li class="item3">
							<span>数量</span>
							<yd-spinner width="120px" height="35px" v-model="buyCount"></yd-spinner>
						</li>
						<li class="item4">
							<a href="javascript:;">
								<span class="fs-3 fw-6 fc-white">立即支付</span>
							</a>
						</li>
					</ul>
				</div>
			</div> -->
		</div>
		<!-- <div class="service_detail_items w-100">
				<div class="resume_info_items"></div>
			</div>-->
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: "兼职详情",
				dataId: null
			},
			// type_list: [{
			//     title: "兼职详情",
			//     type: "demands",
			//     url: "/Demands-infoMemberDemands.jsp"
			//   },
			//   {
			//     title: "技能详情",
			//     type: "skills",
			//     url: "/Skills-infoMemberSkills.jsp"
			//   },
			//   {
			//     title: "岗位详情",
			//     type: "quarters",
			//     url: "/Demands-infoMemberDemands.jsp"
			//   },
			//   {
			//     title: "简历详情",
			//     type: "resume",
			//     url: "/Demands-infoMemberDemands.jsp"
			//   }
			// ],
			type_list: {
				title: "兼职详情",
				type: "demands",
				// url: "/Demands-infoMemberDemands.jsp"
			},
			id: null,
			userId: null,
			type: null,
			lng: "",
			lat: "",
			code: null,
			status: null,
			showTp: null,
			msgInfo: "",
			url: "/Demands-infoMemberDemands.jsp",
			isBtnCode: true,
			buyCount: 1,
			serviceInfoList: {
				u_name: "",
				u_logo: "",
				u_type: null,
				u_score: "",
				u_distance: "",
				u_hot: "",
				u_demand: "",
				u_remuneration: "",
				u_endTime: "",
				u_adress: "",
				u_guarantee: "",
				u_imgsURL: "",
				u_serviceTime: "",
				u_detailText: "负责批改教育机构假期学生考试作业以及教材资料，工作内容：评阅小学1-6年级数学语文卷子，提供答案，评阅，评分，改对错！"
			},
			show: false,
			myInfo: null,
			toInfo: null
		};
	},
	beforeRouteLeave(to, from, next) {
		if (to.path == "/Information") {
			to.meta.keepAlive = true;
		}else if(to.path == `/report/demands/${this.dataId}`) {
            to.meta.needLogin = true;
		}
		next();
	},
	created() { //创建dom
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 1
		});
		this.getPageInfo();
		this.delCache("paymentInfo");
		this.delCache("chatQuery");
	},
	mounted() { //挂载dom
		// $(".header_left")
		//   .attr("href", "javascript:;")
		//   .click(() => {
		//     this.exit_btn();
		//   });
	},
	updated() { //更新

	},
	destroyed() { //销毁
		//   $(".header_left")
		//     .attr("href", "javascript:history.go(-1)")
		//     .unbind("click");
	},
	methods: { //函数

		getPageInfo() {
			this.selfMainLoadOpend();
			// var token = this.getToken();
			var params = this.getQuery();
			if (!params.id) {
				this.selfMainLoadClosed();
				this.selfToast({
					mes: "获取信息失败请重试...",
					timeout: 1500,
					icon: "error"
				});
				setTimeout(() => {
					window.history.go(-1);
				}, 1600);
				return;
			}
			var select_data = this.getCache("select_data", 2);
			var location = this.getCache("location", 2);
			if(select_data) {
				if(select_data.select_city) {
			       this.lng = select_data.select_city.lng;
				}else {
                  this.lng = location.lon;
				}
			}else {
				this.lng = location.lon;
			}
			var url = this.url;
			this.id = params.id;
			this.lat = params.lat;
			this.code = params.code;
			var info = {
				// token,
				id: this.id,
				lon: this.lng,
				lat: this.lat,
				type: this.code
			};
			console.log(info)
			this.getDataInfo(info, url);
		},

		getDataInfo(params, url) {
			var urls = this.Global.baseURL + url;
			this.axios.post(urls, params).then(res => {
				console.log(res,500);
				if (res.data.status == 1) {
					console.log("成功")
					// var value = res.data.data.GrabSheet;
					var data = res.data.data.dataList;
					var user = res.data.data.createInfo.userInfo;
					// var mySelf = res.data.data.myInfo;
					var arr = this.serviceInfoList;
					// this.showTp = value.status;
					// this.msgInfo = value.msgInfo;
					this.userId = data.userId;
					this.dataId = data.id;
					arr.u_demand = data.title;
					arr.u_endTime = data.endTime;
					arr.u_imgsURL = data.prices;
					arr.u_detailText = data.infos;
					arr.u_guarantee = data.serviceDatd;
					arr.u_adress = data.addressInfo;
					arr.u_guarantee = data.money;
					arr.u_remuneration = data.serviceDatd;
					arr.u_distance = data.distance;
					arr.u_hot = data.view;
					arr.u_name = user.lastName;
					arr.u_logo = user.portrait;
					arr.u_score = user.loginTimes;
					this.userInfo = user;
					// this.myInfo = mySelf;
					this.selfMainLoadClosed();
				} else {
					console.log("失败")
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
					} else {
						this.selfToast({
							mes: "获取信息失败请重试",
							timeout: 1500,
							icon: "error"
						});
						setTimeout(() => {
							this.selfMainLoadClosed();
							window.history.go(-1);
						}, 1600);
					}
				}
			})
			// .catch(err => {
			// 	this.selfToast({
			// 		mes: "网路故障请重试",
			// 		timeout: 1500,
			// 		icon: "error"
			// 	});
			// 	setTimeout(() => {
			// 		window.history.go(-1);
			// 	}, 1600);
			// 	console.error(err);
			// });
		},

		// getSelfData() { //获得联系详情
		//   var token = this.getToken();
		//   var url = "Newsgoods-getNewsgoodsList";
		//   var params = {
		//     token
		//   };
		//   this.__initAction(url, params, (res, s) => {
		//     if (s == 1) {
		//       var data = res.data;
		//       for (var it of data) {
		//         this.myInfo = it.myInfo;
		//         this.userInfo = it.userInfo;
		//       };
		//     };
		//   });
		// },

		// do_show() {
		//   if (this.getUserInfo().uid == this.userId) {
		//     this.selfAlertBox({
		//       mes: "不能抢自己发布的订单",
		//       cancel: false,
		//       alert: true
		//     });
		//     return;
		//   }
		//   this.show = !this.show;
		// },
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
				})
			}else {
                this.__Href("/login");
			}
		},

		select_btn(x) {
			this.isBtnCode = x;
		},

		exit_btn() {
			var info = this.getSelectData();
			if (info.pageInfo.service_detail) {
				info.pageInfo.service_detail = null;
			}
			this.setCache("select_data", JSON.stringify(info));
			setTimeout(() => {
				window.history.go(-1);
			}, 200);
		},

		jump_chat() {
			var token = this.getToken();
			var userId = this.getUserInfo().uid;
			var id = this.id;
		},

		do_chat() { //跳转抢单页面
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
				//   var id = this.id;
				//   var userId = this.userId;
				//   var msgInfo = this.msgInfo;
				//   var showTp = this.showTp;
				//   var url = this.type_list[this.code].url;
				//   var paths = 0; //系统消息路径
				//   //判断是否是自己的发布的单子
				//   if (this.getUserInfo().uid == this.userId) {
				//     var status = -1;
				//     this.selfAlertBox({
				//       mes: "不能和自己发布的订单沟通",
				//       cancel: false,
				//       alert: true
				//     });
				//     return;
				//   } else {
				//     var status = 1;
				//   }
				//   //判断类别
				//   var code = 0;
				//   // if (this.type_list[this.code].type == "demands") {
				//   //   var code = 0;
				//   // } else {
				//   //   var code = 1;
				//   // }
				//   var uId = null;
				//   this.$router.push({
				//     path: "/service_chat",
				//     query: {
				//       id,
				//       paths,
				//       code,
				//       status,
				//       url,
				//       uId,
				//       userId,
				//       msgInfo,
				//       showTp,
				//       lng: this.lng,
				//       lat: this.lat
				//     }
				//   });
				// }
			} else {
				this.__Href("/login");
			}
		},
		checkLogin() {
			let isLogin = this.getCache("user_info");
			if(!isLogin) {
				this.__Href("/login");
			}
        }
	},
};
</script>
<style lang="scss" scoped>
	.yd-navbar { font-weight: 600; }
	.yd-back-icon:before,
	.yd-next-icon:before { font-size: 17px; margin: 10px; }
	.yd-spinner input { font-size: 17px !important; }

	.showToast { position: absolute; top: 0; width: 100%; height: 700px; background: rgba(0, 0, 0, 0.3); z-index: 100; }
	.toastText { width: 100%; transition: all 0.5s; position: fixed; z-index: 1001; }
	.up { bottom: 0; }
	.down { bottom: -50%; }
	.rob_confirm_items {
			width: 100%;
			padding: 20px 8px 10px;
			list-style: none;
			li { padding: 11px 15px; }
			.item1 { color: #333; font-size: 16px; font-weight: 500; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #c8c7cc; }
			.item2 {
				display: flex; flex-direction: column; border-bottom: 1px solid #c8c7cc;
				.selected { color: #fff; background: #2f9bfe; }
				.unSelected { color: #333; background: #fff; }
				.select_btn { font-size: 16px; font-weight: 500; color: #333; margin-bottom: 10px; }
				.rob_btn {
					display: flex;
					a { text-decoration: none; font-size: 14px; font-weight: 500; padding: 4px 5px; border-radius: 5px; margin-right: 30px; }
				}
			}
			.item3 { display: flex; justify-content: space-between; align-items: center; font-size: 17px; color: #333; font-weight: 500; }
			.item4 {
				display: flex; width: 100%;
				a { text-decoration: none; width: 100%; height: 41px; background: #2f9bfe; color: #fff; font-size: 17px; font-weight: 500; text-align: center; line-height: 41px; }
			}
	}
	.yd-spinner > span > i:after { font-size: 14px; }
	.warn-parent {
		display: flex; justify-content: space-between; padding: 15px 10px;
		.first-ch { display: flex; flex-direction: column; justify-content: center; margin-right: 0.5rem; }
		.last-ch {
			font-size: 14px;
			.warn-link { color: #2f9bfe; text-decoration: #ddd; }
		}
	}
	div.service_detail_list div { border-bottom: 1px solid #e7e7e7; }
	div.service_detail div.service_detail_list div:last-child { border-top: none; border-bottom: none; }
	.img{ padding: 3px !important; width: 5rem !important; height: 5rem; }
	.service_detail_info{ margin-top: .5rem; }
</style>
