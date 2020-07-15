<template>
	<div class="post_info w-100">
		<!-- <header class="post_info_header bg-blue w-100 fc-dark">
				<a
					href="javascript:history.go(-1)"
					class="arrow-logo fc-white fw-5 iconfont icon-previewleft"
				></a>
				<span class="header_title fc-white">{{pageInfo.header_title}}</span>
				<a href="javascript:;" class="last"></a>
			</header>-->
		<!-- <div class="clear-fixed"></div> -->
		<div class="post_info_group" v-if="postInfoList.post_name">
			<ul class="post_info_list bg-white">
				<li class="item_post_name fw-7 fm-1">{{postInfoList.post_name}}</li>
				<li class="item_detail">
					<span class="fs-3 fc-gray fw-5">{{postInfoList.release_time}}</span>
					<div>
						<span class="iconfont icon-eye fm-2 fw-5 fc-gray"></span>
						<span class="fw-5 fc-gray fs-3">{{postInfoList.hot}}</span>
					</div>

					<span class="fc-red fm-2 fw-5">{{postInfoList.salary}}</span>
				</li>
				<li class="item_addr">
					<span class="fc-gray fw-5 fs-3">{{postInfoList.addr}}</span>
				</li>
				<li class="item_require">
					<div>
						<span class="fs-3 fc-gray fw-5">{{postInfoList.experience}}</span>
						<span class="fs-3 fc-gray fw-5">{{postInfoList.education}}</span>
					</div>
					<span class="fs-3 fc-gray fw-5">招聘{{postInfoList.count}}人</span>
				</li>
				<!-- <li class="item_count"></li> -->
			</ul>
			<ul class="interviewer_info_list w-100 mt-3">
				<li class="item_post_detail mb-3">
					<p class="fs-3 fw-6 fc-gray mb-3">职位描述</p>
					<span class="fs-3 fc-dark fw-6">{{postInfoList.post_detail}}</span>
				</li>

				<li class="item_interviewer">
					<p class="fw-6 mt-3 mb-3 fs-3 fm-1">
						<span>公司详情</span>
					</p>
					<a href="javascript:;" class="item_company_name fs-3" @click="toCompany">
						<span class="fs-3 fw-6">{{postInfoList.company_name}}</span>
						<span class="iconfont icon-previewright"></span>
					</a>
					<p class="fw-6 mt-3 mb-3 fs-3 fm-1">
						<span>公司评分</span>
					</p>
					<div class="company-detail">
						<div class="detail-left">
							<p class="fc-gray fw-5 fs-3">{{companyInfo.popNum}}人评价</p>
							<h1 class="num mt-2 mb-2">{{companyInfo.allScore}}</h1>
							<yd-rate size="1rem" class="item_score" v-model="companyInfo.allScore" color="#ff9c00" active-color="#ff9c00" readonly></yd-rate>
							<!-- <self-star len="50"></self-star> -->
							<!-- <yd-rate slot="left" v-model="starScore" size="1rem" color="#ff9c00" active-color="#ff9c00" readonly></yd-rate> -->
							<!-- <yd-rate size="1rem" slot="left" v-model="companyInfo.allScore" color="#ff9c00" active-color="#ff9c00" readonly></yd-rate> -->
						</div>
						<div class="detail-right">
							<ul class="right-list">
								<li class="list-items">
									<span class="item-txt w-20">5星</span>
									<span class="item-im w-80 ">
										<span class="item-im-super" :style="`width:${companyInfo.starList[0]}%`"></span>
									</span>
								</li>
								<li class="list-items">
									<span class="item-txt w-20">4星</span>
									<span class="item-im w-80 ">
										<span class="item-im-super " :style="`width:${companyInfo.starList[1]}%`"></span>
									</span>
								</li>
								<li class="list-items">
									<span class="item-txt w-20">3星</span>
									<span class="item-im w-80 ">
										<span class="item-im-super " :style="`width:${companyInfo.starList[2]}%`"></span>
									</span>
								</li>
								<li class="list-items">
									<span class="item-txt w-20">2星</span>
									<span class="item-im w-80 ">
										<span class="item-im-super" :style="`width:${companyInfo.starList[3]}%`"></span>
									</span>
								</li>
								<li class="list-items">
									<span class="item-txt w-20">1星</span>
									<span class="item-im w-80 ">
										<span class="item-im-super" :style="`width:${companyInfo.starList[4]}%`"></span>
									</span>
								</li>
							</ul>
						</div>
					</div>
					<ul class="company-data-list mb-5">
						<li class="data-list-item">
							<p class="fs-3 fc-dark fw-6">{{companyInfo.score}}%</p>
							<span class="fc-gray fw-5 fs-3">评分高于其他
								<p>公司</p>
							</span>
						</li>
						<li class="data-list-item">
							<p class="fs-3 fc-dark fw-6">{{companyInfo.msgScore}}%</p>
							<span class="fc-gray fw-5 fs-3">消息回复率</span>
						</li>
						<li class="data-list-item">
							<p class="fs-3 fc-dark fw-6">{{companyInfo.day}}天</p>
							<span class="fc-gray fw-5 fs-3">报名处理速度</span>
						</li>
					</ul>
					<!-- <yd-cell-item>
						<img slot="icon" :src="postInfoList.logo" class="item_interviewer_logo mr-2">
						<span slot="left" class="item_interviewer_info">
							<span>{{postInfoList.interviewer_name}}</span>
							<span>{{postInfoList.interviewer_post}}</span>
							<span class="item_icon iconfont" :class="postInfoList.interviewer_type==1?'icon-3qiyezhengxin83a638 fc-blue':'icon-renzheng fc-green'"></span>
						</span>
						<span slot="right" class="item_interviewer_score">
							{{postInfoList.interviewer_score}}信用分
							[
							<a href="javascript:;">信用分规则</a>]
						</span>
					</yd-cell-item> -->

				</li>
				<!-- <li class="item_interviewer_addr mt-3 mb-3">
					<yd-cell-item>
						<span slot="left" class="fc-gray fs-3 fw-6">公司地址</span>
						<span slot="right" class="fc-dark fs-3 fw-6">{{postInfoList.interviewer_addr}}</span>
					</yd-cell-item>
				</li> -->
			</ul>
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
						<router-link :to="`/report/quarters/${dataId}`" class="warn-link">立即举报</router-link>，并向当地公安机关报案
					</span>
				</div>
			</div>
		</div>

		<div class="footer_btn_group w-100">
			<a href="javascript:;" class="footer_btn1 bg-white" @click="do_chat">
				<span class="icon-logo iconfont icon-kefu fc-dark fm-1 fw-6">在线沟通</span>
			</a>
			<a href="javascript:;" class="footer_btn2 bg-blue" @click.prevent="rightOff">
				<span class="fc-white fm-1 fw-6">投递简历</span>
			</a>
		</div>
	</div>
</template>
<script>
const Star = ()=>import("../sub/star");
export default {
	data() {
		return {
			pageInfo: {
				header_title: "岗位详情"
			},
			id: null,
			sign: "quarters",
			dataId: null,
			userId: null,
			postInfoList: {
				company_name: "",
				post_name: "",
				logo: "",
				release_time: "",
				hot: null,
				salary: "",
				addr: "",
				experience: "",
				education: "",
				count: null,
				interviewer_name: "",
				interviewer_post: "",
				interviewer_type: null,
				interviewer_score: null,
				interviewer_addr: "",
				post_detail: "",
				userInfo: null,
				myInfo: {}
			},
			companyInfo: {
				popNum: 120,
				allScore: 3.5,
				score: 60,
				msgScore: 69,
				tipText: 0.01,
				day: "1-2",
				starList: [62, 50, 70, 75, 89]
			},
			starScore: 3.5
		};
	},
	beforeRouteLeave(to, from, next) {
		if (to.path == "/Information") {
			to.meta.keepAlive = true;
		}else if(to.path == `/report/quarters/${this.dataId}`) {
            to.meta.needLogin = true;
		}
		next();
	},
	created() {
		// this.selfLoadOpend({
		//   mes: "",
		//   font: 40,
		//   status: true,
		//   color: "fc-blue"
		// });
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 1
		});

		this.getPageInfo();

		this.delCache("paymentInfo");

		this.delCache("chatQuery");
	},
	methods: {
		getPageInfo() {
			var id = this.getParams().id;
			this.id = id;
			var token = this.getToken();
			var params = {
				token,
				id
			};
			var url = 'Quarters-infoMemberQuarters';

			var that = this;
			this.__initAction(url, params, (res, s) => {
				console.log(res)
				if (s == 1) {
					var data = res.data;
					var arr = this.postInfoList;
					var user = res.data.userInfo;
					var mySelf = res.data.myInfo;
					var companyInfo = res.data.companyInfo;
					this.userInfo = user;
					this.myInfo = mySelf;
					this.dataId = data.id;
					this.userId = data.userId;
					arr.post_name = data.title;
					arr.release_time = data.create_time;
					arr.hot = data.view;
					arr.salary = data.prices;
					arr.addr = data.addressInfo;
					arr.education = data.education;
					arr.experience = data.exp;
					arr.count = data.number;
					arr.logo = user.portrait;
					arr.company_name = companyInfo.nameUnit;
					arr.interviewer_name = user.lastName;
					arr.interviewer_score = user.loginTimes;
					arr.interviewer_addr = user.address;
					arr.post_detail = data.infos;
					this.selfMainLoadClosed();
				} else {
					this.selfMainLoadClosed();
					this._msg(res.info);
				}
				this.selfMainLoadClosed();
			});
		},

		do_chat() {
			let isLogin = this.getCache('user_info');
			if(isLogin) {
				var userId = this.userId;
				var baseUid = this.getUserInfo().uid;
				var sign = this.sign; //项目标识符 (比如: 兼职=demands 技能= skills 岗位=quarters 简历=resume)
				var gid = this.id; //产品的id
				var toUid = this.userId;
				if (userId == baseUid) {
					this.selfAlertBox({
						mes: "您不能和自己发布的订单沟通",
						cancel: false,
						alert: true
					});
					return;
				};
				var query = {
					sign,
					gid,
				};
				this.$router.push({
					path: `/interviewer_chat/${this.id}`,
					query
				});
				// var userId = this.userId;
				// var baseUid = this.getUserInfo().uid;
				// if (userId == baseUid) {
				//   this.selfAlertBox({
				//     mes: "您不能和自己发布的订单沟通",
				//     cancel: false,
				//     alert: true
				//   });
				//   return;
				// } else {
				//   var url = `/interviewer_chat/${this.id}`;
				//   this.$router.push(url);
				// }
			} else {
				this.__Href("/login");
			}
		},

		rightOff() {
			let isLogin = this.getCache('user_info');
			if(isLogin) {
				var c_status = 4;
				var sign = this.sign; //项目标识符 (比如: 兼职=demands 技能= skills 岗位=quarters 简历=resume)
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
						this._msg("已发送简历请耐心等待(^_^)");
					} else {
						this._msg(res.info);
					}
				});
			}else {
                this.__Href("/login");
			}
		},

		toCompany() {
			var that = this;
			var query = {
				gid: that.id //产品的id
			};
			this.$router.push({
				path: "/companyDetail",
				query
			});
		}

	},

	computed: {

	},

	components: {
		"self-star": Star
	}
};
</script>
<style lang="scss" scoped>
	.warn-parent {
		display: flex; justify-content: space-between; padding: 15px 10px;
		.first-ch { display: flex; flex-direction: column; justify-content: center; margin-right: 0.5rem; }
		.last-ch {
				font-size: 14px;
				.warn-link {
						color: #2f9bfe;
						text-decoration: #ddd;
				}
		}
	}
	.post_info {
		margin-bottom: 4rem;
		.item_company_name {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid rgba(102,102,102,.1);
				span {
						padding: 15px 0;
				}
		}
	}
	.company-detail {
		width: 100%;
		margin-top: 2rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.detail-left,
		.detail-right {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
		}
		.detail-left {
				width: 35%;
				// border-right: 1px solid rgba(102,102,102,.2);
				align-items: center;
				.num {
						font-size: 45px;
				}
		}
		.detail-right {
			width: 65%;
			align-items: left;
			.right-list {
				width: 100%;
				.list-items {
					width: 100%;
					height: 15px;
					padding: 0;
					margin-top: 0.25rem;
					display: flex;
					justify-content: left;
					align-items: center;
					.item-txt { font-size: 14px; color: #ccc; }
					.item-im {
						height: 10px;
						background: #ccc;
						border-radius: 20px;
						display: inline-block;
						position: relative;
						.item-im-super {
							width: 100%;
							display: inline-block;
							height: 10px;
							background: #ffcc00;
							border-radius: 20px;
							position: absolute;
							top: 0;
							left: 0;
						}
					}
				}
			}
		}
	}
	.post_info .company-data-list {
		margin-top: 1rem; display: flex; justify-content: space-between;
		.data-list-item { width: 33.33333%; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0; border-right: 1px solid rgba(102,102,102,.2); }
	}
	.post_info .company-data-list .data-list-item:last-child { border-right: 0; }
</style>
