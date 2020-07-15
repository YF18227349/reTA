<template>
	<div class="new-user-center" :style="goScroll">
		<header ref="headerEle" class="header-nav display-flex bg-blue">
			<div class="header-nav-item box"></div>
			<div class="header-nav-item center-title text-center">
				<h3>我的</h3>
			</div>
			<div class="header-nav-item setting text-right">
				<router-link to="/usersetting" class="header_logo iconfont icon-setting1"></router-link>
			</div>
		</header>

		<div :style="flexStyle"></div>

		<div class="flex-box bg-blue">
			<div class="p-3 contents">
				<div class="w-100 user-top mt-3 p-2">
					<div class="user-cards">
						<div class="user-image-box">
							<img class="user-image" :src="userInfo.logo" alt />
						</div>
					</div>
					<h4 class="login-user-name">{{userInfo.name}}</h4>
					<div class="user-detail display-flex">
						<div class="w-33 text-center" @click="doLocation('yinh')">
							<div class="icon-box text-center">
								<!-- <span class="iconfont userInfo_logo icon-xinyongqiahuankuan"></span> -->
								<span class="fm-1 fw-6">{{userInfo.bankcard}}</span>
							</div>
							<span>银行卡</span>
						</div>

						<div class="w-33 text-center" @click="doLocation('xinyong')">
							<div class="icon-box text-center">
								<!-- <span class="assets_icon fw-6 fc-white iconfont icon-xinyong1"></span> -->
								<span class="fm-1 fw-6">{{userInfo.score}}</span>
							</div>
							<span>信用分</span>
						</div>
						<div class="w-33 text-center" v-if="approveType == 1">
							<div class="icon-box text-center">
								<img :src="rid == 1 ? imageIconList[1].url : rid == 2 ? imageIconList[5].url : imageIconList[3].url" alt />
							</div>
							<!-- <span>{{rid == 1 ? imageIconList[1].type : rid == 2 ? imageIconList[5].type : imageIconList[3].type}}</span> -->
							<span>已认证</span>
						</div>
						<div class="w-33 text-center" @click="doLocation('auth')" v-if="approveType == 0">
							<div class="icon-box text-center">
								<img src="/static/imgs/yf/geren_wei.png" alt />
							</div>
							<span>未认证</span>
						</div>
					</div>
				</div>

				<div class="w-100 user-money p-0 mt-3 text-center">
					<div class="display-btw w-95 p-4 bg-inline">
						<div class="w-50">
							<h3 class="self-money">我的钱包</h3>
							<h4 class="money-number">{{userInfo.money_count}}</h4>
						</div>
						<div class="self-more w-50 text-right">
							<router-link :to="{path:'/user_wallet',query:{attest:approveType}}" class="click-more">
								<span></span>
								<span>更多</span>
							</router-link>
						</div>
					</div>
				</div>

				<div class="w-100 user-skill mt-3 p-1 text-center">
					<div class="display-btw huali-line">
						<h3>技能订单</h3>
						<router-link :to="{path: '/orderList', query:{id: 0}}">查看全部</router-link>
					</div>
					<div class="display-flex text-center p-0" style="padding-top:10px;">
						<div class="w-25 p-2" v-for="(tmp,i) in pageLan.sillk" :key="i">
							<router-link :to="{path: tmp.url, query:{id: i+1}}">
								<div class="icon-box text-center">
									<!-- <span :class="tmp.icon"></span> -->
									<span><img :src="tmp.img"></span>
								</div>
								<span class="reg-info">{{tmp.name}}</span>
							</router-link>
						</div>
					</div>
				</div>

				<div class="w-100 user-leg mt-3 p-1 text-center">
					<div class="display-btw huali-line">
						<h3>我的认证</h3>
						<a href="javascript:;"></a>
					</div>
					<div class="display-flex mt-3">
						<div class="w-25 p-2" v-if="approveType == 1">
							<!-- (rid == 1 ? imageIconList[1].url : rid == 2 ? pageLan.leg[5].url : pageLan.leg[3].url) + '/' + rid + '/' + authStatus -->
							<router-link :to="(rid == 1 ? pageLan.leg[0].url : rid == 2 ? pageLan.leg[1].url : pageLan.leg[2].url) + '/' + rid + '/' + authStatus">
								<div class="icon-box text-center">
									<img
										:src="rid == 1 ? imageIconList[1].url : rid == 2 ? imageIconList[5].url : imageIconList[3].url"
										alt
									/>
								</div>
								<span class="reg-info">{{rid == 1 ? imageIconList[1].name : rid == 2 ? imageIconList[5].name : imageIconList[3].name}}</span>
							</router-link>
						</div>
						<div class="w-25 p-2" v-for="(tmp,i) in myLegInfo" :key="i" v-if="approveType == 0">
							<router-link :to="tmp.url + '/' + rid + '/' + authStatus">
								<div class="icon-box text-center">
									<img :src="tmp.icon" alt />
								</div>
								<span class="reg-info">{{tmp.name}}</span>
							</router-link>
						</div>
					</div>
				</div>

				<div v-if="selfData" class="w-100 user-self display-flex mt-3 p-1 text-center">
					<div class="w-25 p-2" v-for="(tmp,i) in selfData" :key="i">
						<router-link :to="tmp.code?`${tmp.url}/${i}`:`${tmp.url}`">
							<div class="icon-box text-center">
								<!-- <span :class="tmp.icon"></span> -->
								<span><img :src="tmp.img"></span>
							</div>
							<span class="reg-info">{{tmp.name}}</span>
						</router-link>
					</div>
				</div>

				<div class="w-100 display-flex text-centers mt-3 p-1 text-center">
					<div class="w-25 p-2" v-for="(tmp,i) in pageLan.bottom" :key="i">
						<router-link v-if="tmp.url" :to="tmp.url">
							<div class="icon-box text-center">
								<!-- <span :class="tmp.icon"></span> -->
								<span><img :src="tmp.img"></span>
							</div>
							<span class="reg-info">{{tmp.name}}</span>
						</router-link>
						<a v-if="tmp.code==0" :href="'tel:'+UserCacheData.kefutelcode">
							<div class="icon-box text-center">
								<!-- <span :class="tmp.icon"></span> -->
								<span><img :src="tmp.img"></span>
							</div>
							<span class="reg-info">{{tmp.name}}</span>
						</a>
						<a
							href="javascript:;"
							v-if="!tmp.url && tmp.code==1"
							@click="handleBottomClick(tmp.code)"
						>
							<div class="icon-box text-center">
								<!-- <span :class="tmp.icon"></span> -->
								<span><img :src="tmp.img"></span>
							</div>
							<span class="reg-info">{{tmp.name}}</span>
						</a>
					</div>
				</div>
			</div>
			<div class="bottom-box"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			rid: null,
			approveType:null,

			authStatus: null,
			UserCacheData: {
				kefutelcode: null
			},
			userInfo: {
				name: "",
				bankcard: null,
				logo: "",
				score: null,
				type: null,
				money_count: null,
				approveType: null
			},
			goScroll: "",
			flexStyle: {},
			pageLan: {
				sillk: [
					{
						name: "待服务",
						// icon: "newiconfont userInfo_logo icon-fuwu"
						img: "./static/imgs/user_center/icon_00001.png",
						url: "/orderList",
					},
					{
						name: "待完成",
						// icon: "newiconfont userInfo_logo icon-daifukuan"
						img: "./static/imgs/user_center/icon_00002.png",
						url: "/orderList",
					},
					{
						name: "待评价",
						// icon: "newiconfont userInfo_logo icon-pingjia"
						img: "./static/imgs/user_center/icon_00003.png",
						url: "/orderList",
					},
					{
						name: "已完成",
						// icon: "newiconfont userInfo_logo icon-querendan-"
						img: "./static/imgs/user_center/icon_00004.png",
						url: "/orderList",
					}
				],
				leg: [
					{
						name: "个人认证",
						icon: "./static/imgs/yf/geren_wei.png",
						type: 1,
						rid: 999,
						status: 3,
						url: "/personal_auth",
						isIconIndex:0
					},
					{
						name: "企业认证",
						icon: "./static/imgs/yf/qiye_wei.png",
						type: 2,
						rid: 999,
						status: 3,
						url: "/company_auth",
						isIconIndex:0
					},
					{
						name: "军人认证",
						icon: "./static/imgs/yf/junren_wei.png",
						type: 3,
						rid: 999,
						status: 3,
						url: "/soldier_auth",
						isIconIndex:0
					}
				],
				self: [
					{
						name: "我的消息",
						// icon: "iconfont userInfo_logo icon-chat2",
						img: "./static/imgs/user_center/icon_00006.png",
						url: "/message",
						code: false
					},
					{
						name: "我的简历",
						// icon: "iconfont userInfo_logo icon-dingdan",
						img: "./static/imgs/user_center/icon_00007.png",
						url: "/user_resume",
						code: false
					},
					{
						name: "我的岗位",
						// icon: "iconfont userInfo_logo icon-dingdan",
						img: "./static/imgs/user_center/icon_00007.png",
						url: "/MyPostList",
						code: false
					},
					{
						name: "我的兼职",
						// icon: "newiconfont userInfo_logo icon-jianzhi",
						img: "./static/imgs/user_center/icon_00008.png",
						url: "/partList",
						code: false
					},
					{
						name: "我的发票",
						// icon: "iconfont userInfo_logo icon-confirmation-number",
						img: "./static/imgs/user_center/icon_00009.png",
						url: "/user_invoice",
						code: false
					},
					{
						name: "发票助手",
						// icon: "iconfont userInfo_logo icon-confirmation-number",
						img: "./static/imgs/user_center/icon_00010.png",
						url: "/invoice_fill",
						code: true
					},
					{
						name: "我的地址",
						// icon: "iconfont userInfo_logo icon-dingwei2",
						img: "./static/imgs/user_center/icon_00011.png",
						url: "/user_addr/user",
						code: false
					},
				],
				bottom: [
					{
						name: "立即分享",
						icon: "share_logo iconfont icon-tubiao212",
						img: "./static/imgs/user_center/icon_00012.png",
						url: "/qrcode",
						code: null
					},
					{
						name: "联系客服",
						// icon: "share_logo iconfont icon-service",
						img: "./static/imgs/user_center/icon_00013.png",
						url: null,
						code: 0
					},
					{
						name: "意见反馈",
						// icon: "share_logo newiconfont icon-yijianfankui",
						img: "./static/imgs/user_center/icon_00014.png",
						url: "/feedback",
						code: null
					},
					{
						name: "关于",
						// icon: "newiconfont icon-iconset0103",
						img: "./static/imgs/user_center/icon_00015.png",
						url: "/About",
						code: null
					},
					{
						name: "退出登录",
						// icon: "newiconfont icon-logout",
						img: "./static/imgs/user_center/icon_00016.png",
						url: null,
						code: 1
					},
					{
						name: "安全中心",
						// icon: "newiconfont icon-logout",
						img: "./static/imgs/user_center/icon_00022.png",
						url: "/safecenter",
						code: null
					}
				]
			},
			isIconIndex: 0,
			imageIconList: [
				{
					index: 0,
					name: "未认证",
					type: "个人",
					url: "./static/imgs/yf/geren_wei.png"
				},
				// {
				// 	index: 1,
				// 	name: "审核中",
				// 	type: "个人",
				// 	url: "./static/imgs/yf/geren_shen.png"
				// },
				{
					index: 2,
					name: "个人认证",
					type: "个人",
					url: "./static/imgs/yf/geren_suc.png"
				},
				{
					index: 3,
					name: "未认证",
					type: "军人",
					url: "./static/imgs/yf/junren_wei.png"
				},
				// {
				// 	index: 4,
				// 	name: "审核中",
				// 	type: "军人",
				// 	url: "./static/imgs/yf/junren_shen.png"
				// },
				{
					index: 5,
					name: "军人认证",
					type: "军人",
					url: "./static/imgs/yf/junren_suc.png"
				},
				{
					index: 6,
					name: "未认证",
					type: "企业",
					url: "./static/imgs/yf/qiye_wei.png"
				},
				// {
				// 	index: 7,
				// 	name: "审核中",
				// 	type: "企业",
				// 	url: "./static/imgs/yf/qiye_shen.png"
				// },
				{
					index: 8,
					name: "企业认证",
					type: "企业",
					url: "./static/imgs/yf/qiye_suc.png"
				}
			]
		};
	},

	created() {
		this.delSelectData();
		this.$store.commit("setHeaderStyle", {
			txt: "我的",
			type: 1
		});
		this.removeCache();
		this.getUserCache(this.selfMainLoadOpend())
			.then(res => {
				return this.setShowData(res);
			})
			.then(() => {
				this.selfMainLoadClosed();
			});
	},

	mounted() {
		// 添加顶部导航栏滚动事件
		window.addEventListener("scroll", this.handleScroll);
		this.delCache("ORDER_INFO");
		this.setNavHeight();
	},

	destroyed() {
		var offTop = window.pageYOffset;
		if (offTop > 0) {
			window.pageYOffset = 0;
		}
		window.removeEventListener("scroll", this.handleScroll);
	},

	methods: {
		getUserCache() {
			return new Promise((resolve, reject) => {
				var params = {
					token: this.getToken(),
					uid: this.getUserInfo().uid
				};
				var url = "Member-getUserCache";
				this.__initAction(url, params, (res, s) => {
					if (s == 1) {
						var data = res.data;
						resolve(data);
					}
				});
			});
		},

		setShowData(data) {
			return new Promise((resolve, reject) => {
				this.UserCacheData = data;
				this.setCache("userInfoExt", JSON.stringify(data));
				this.userInfo.name = data.lastName;
				this.userInfo.bankcard = data.backNum;
				this.userInfo.logo = data.portrait;
				this.userInfo.score = data.credit;
				this.userInfo.money_count = data.balance;
				let approveType = data.approveType;
				//认证状态图标
				if(approveType == 0) {//未认证状态
                    console.log("未认证");
					this.approveType = 0;
					this.rid = 0;
				}else if(approveType == 1){//已认证状态
				    console.log(data.rid == 1 ? "个人已认证" : data.rid == 2 ? "企业已认证" : "军人已认证")
				    this.approveType = 1;
					this.rid = data.rid;
				}
				this.authStatus = this.rid;
				resolve();
			});
		},

		handleBottomClick(index) {
			if (index == 1) {
				this.delCacheAll();
				// this.removeCache("footTabbarChange");
				setTimeout(() => {
					this.__Href("/");
				}, 300);
			}
		},

		doLocation(type) {
			switch (type) {
				case "auth":
					if (this.userInfo.approveType == 0) {
						this._msg("请认证！");
					} else {
						// this.$router.push(`/NewsInfo/${id}`);
					}
					break;
				case "xinyong":
					this.$router.push(`/usercredit/2`);
					break;
				case "yinh":
					this.$router.push(`/userbankcard/list`);
					break;
				default:
					this._log(type);
					break;
			}
		},

		setNavHeight() {
			var h = this.$refs.headerEle.offsetHeight;
			this.flexStyle = {
				height: `${h}px`,
				width: "100%"
			};
		},

		handleScroll() {
			// 顶部导航栏滚动事件
			// var offTop = window.pageYOffset;
			// var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			// let elementTop = document.querySelector(".flex-box").offsetHeight;
			// var x = elementTop / 2;
			// if (offTop > 5 && offTop <= x) {
			//   this.goScroll = "background:rgba(47, 155, 254, 0.1)";
			// } else if (offTop > x && offTop <= elementTop) {
			//   this.goScroll = "background:rgba(47, 155, 254, 0.5)";
			// } else if (offTop == 0) {
			//   this.goScroll = "display:block";
			// } else {
			//   this.goScroll = "display:none";
			// }
		},

		delSelectData() {
			var info = this.getSelectData();
			if (info) {
				if (info.demand) {
					info.demand.salary_data = null;
				}
				if (info.skill) {
					info.skill.salary_data = null;
				}
				if (info.data) {
					info.data.data1 = null;
					info.select_addr = null;
					this.setCache("select_data", JSON.stringify(info));
				}
			}
		}
	},

	computed: {
		iconImageUrl() {
			return this.imageIconList[this.isIconIndex];
		},

		selfData() {
			if (this.rid == 1) {
				this.pageLan.self.splice(2,1);
				return this.pageLan.self;
			} else if (this.rid == 2) {
				 this.pageLan.self.splice(1,1);
				return this.pageLan.self;
			}
		},

		myLegInfo() {
			return this.pageLan.leg;
		}
	}
};
</script>

<style lang="scss" scoped>
.new-user-center {
	box-sizing: border-box;
	width: 100vw;
	.newiconfont,
	.iconfont {
		color: #ccc;
		font-size: 1.5rem;
	}
	.setting {
		 .newiconfont,
		.iconfont {
			color: #fff;
		}
	}
	.display-btw {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}
	.display-flex {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}
	.text-left {
		text-align: left !important;
	}
	.text-center {
		text-align: center !important;
	}
	.text-right {
		text-align: right !important;
	}
	.w-33 {
		width: 33.3333%;
	}
	.text-centers,
	.user-leg,
	.user-money,
	.user-self,
	.user-skill,
	.user-top {
		background: #fff;
		border-radius: 5px;
		padding: 10px;
		.serive-box {
			padding: 5px;
		}
		.icon-box {
			width: 10vw;
			height: 10vw;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				width: 10vw;
				max-width: 100%;
				min-width: 100%;
			}
		}
		.reg-info {
			display: inline-block;
			margin-top: 5px;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			overflow: hidden;
		}
	}
	.header-nav {
		width: 100%;
		padding: 5px;
		color: #000;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.header-nav-item {
		width: 33.3333%;
		padding: 5px;
	}
	.header-nav-item.center-title,
	.header-nav-item.setting {
		color: #fff;
	}
	.header-nav-item.center-title {
		font-size: 18px;
	}
	.header-nav-item.setting {
		font-size: 16px;
	}
	.flex-box {
		width: 100vw;
		height: 30vw;
	}
	.contents {
		padding-top: 20px !important;
	}
	.user-detail {
		margin-top: 20px;
	}
	.user-top {
		width: 100%;
		.user-cards {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			.user-image,
			.user-image-box {
				border: 1px solid #ccc;
				border-radius: 50%;
			}
			.user-image-box {
				width: 20.5vw;
				height: 20.5vw;
				padding: 1vw;
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: -35px;
				left: 38.75%;
			}
			.user-image {
				width: 100%;
				// max-height: 100%;
				height:100%;
			}
		}
		.login-user-name {
			margin-top: 50px;
			text-align: center;
			font-size: 16px;
			color: #999;
		}
	}
	.user-money {
		overflow: hidden;
		// height: 30vw;
		background: linear-gradient(83deg, #4285ff, #4b73f6, #6763eb);
		.money-number,
		.self-money {
			font-size: 1.2rem;
			text-align: left;
			padding: 1rem .7rem;
			color: #fff;
		}
		.self-more {
			height: 30px;
			font-size: 0.8rem;
			color: #ccc;
			position: relative;
			.click-more {
				padding: 0 10px;
				width: 65%;
				height: 100%;
				position: absolute;
				top: 0;
				right: -33px;
				border-radius: 30px 0 0 30px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background: linear-gradient(150deg, #6298ff, #626bff, #625fff);
				span:first-child {
					width: 22px;
					height: 22px;
					border-radius: 50%;
					opacity: 0.3;
					background: #fff;
				}
			}
		}
		.bg-inline {
			background: rgba(255, 255, 255, 0.08);
			border-radius: 5px;
		}
	}

	.huali-line {
		padding: 10px 0;
		border-bottom: 0.008rem solid #e1e1e1;
	}
	.pb-0 {
		padding-bottom: 0 !important;
	}
	.pl-0 {
		padding-left: 0 !important;
	}
	.pr-0 {
		padding-right: 0 !important;
	}
	.pt-0 {
		padding-top: 0 !important;
	}
	.p-0 {
		padding: 0;
	}
	.bottom-box {
		width: 100%;
		height: 55px;
	}
}
</style>
