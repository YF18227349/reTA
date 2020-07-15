<template>
<div class="userCenter">
	<header class="userCenter_header" :style="goScroll">
		<span></span>
		<span class="header_title">我的</span>
		<router-link to="/usersetting" class="header_logo iconfont icon-setting1"></router-link>
	</header>
	<div class="header_bg">
		<div class="userCenter_list">
			<div class="userCenter_title p-r">
				<div class="user_photo">
					<div class="photoStyle p-a">
						<img :src="userInfo.logo" alt>
					</div>
				</div>
				<p class="user_name fc-gray">{{userInfo.name? userInfo.name:'未设置'}}</p>
				<div class="user_code">
					<div class="user_bankcard" @click="doLocation('yinh')">
						<span>{{userInfo.bankcard}}</span>
						<span>银行卡</span>
					</div>
					<div class="user_score" @click="doLocation('xinyong')">
						<span>{{userInfo.score}}</span>
						<span>信用分</span>
					</div>
					<div class="user_ation" @click="doLocation('auth')">
						<img :src="iconImageUrl.url" alt="" style="width:auto;height:auto;">
						<span>{{iconImageUrl.name}}</span>
						<!-- <span>{{userInfo.approveType==0?"未认证":userInfo.approveType==1?'已认证':''}}</span> -->
					</div>
				</div>
			</div>
			<div class="userCenter_assets">
				<div class="assets_title p-r">
					<div class="assets_money p-r">
						<div class="assets_money_count p-a">
							<span class="count_title">总资产 (元)</span>
							<span class="money_count">{{userInfo.money_count}}</span>
						</div>
					</div>
					<router-link to="/user_balance" class="assets_search_btn p-a">
						<span></span>
						<span class="assets_search_title">查询</span>
					</router-link>
				</div>
				<div class="assets_list">
					<router-link :to="item.url+'/'+i" v-for="(item,i) in assetsList" :key="i">
						<span class="assets_logo" :style="'background:'+item.bg_color">
							<span class="assets_icon fw-6 fc-white iconfont" :class="item.icon"></span>
						</span>
						<span class="assets_title">{{item.title}}</span>
					</router-link>
				</div>
			</div>
			<div class="userCenter_ation">
				<div v-for="(item,i) in ationList" :key="i" v-if="item.rid == rid">
					<router-link :to="item.url + '/' + rid + '/' + authStatus" class="ation_item">
						<!-- v-if="item.rid == rid" 认证列表控制 -->
						<span class="iconfont ation_logo" :class="item.icon"></span>
						<span class="ation_title w-100">{{item.title}}</span>
						<span class="ation_type">
							{{ item.status == 3 ? '未认证' : item.status == 0 ? '已驳回' : item.status == 1 ? "已认证" : item.status == 2 ? "待审核" : '' }}
							<span class="iconfont icon-previewright"></span>
						</span>
					</router-link>
				</div>
			</div>
			<div class="userCenter_userInfo mb-5">
				<router-link :to="item.url" v-for="(item,i) in userInfoList" :key="i" class="userInfo_item">
					<span class="iconfont userInfo_logo" :class="item.icon"></span>
					<span class="userInfo_title">{{item.title}}</span>
					<span class="userInfo_arrow iconfont icon-previewright"></span>
				</router-link>
			</div>
			<div class="share_btn mt-2">
				<router-link class="share" to="/qrcode">
					<span class="share_logo iconfont icon-tubiao212"></span>
					<span class="share_title">立即分享</span>
					<span class="share_arrow iconfont icon-previewright"></span>
				</router-link>
			</div>
			<div class="share_btn mt-2">
				<a :href="'tel:'+UserCacheData.kefutelcode" class="share">
					<span class="share_logo iconfont icon-service"></span>
					<span class="share_title">联系客服</span>
					<span class="share_arrow iconfont icon-previewright"></span>
				</a>
			</div>
			<div class="share_btn mt-2">
				<router-link to="/feedback" class="share">
					<span class="share_logo iconfont">
						<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5025">
							<path
								d="M781.1 469.3l19.4-193.8c2.2-21.8-18.1-42.3-40-40.4l-196.2 17.3c-6.8 0.6-13 3.4-17.6 8L168.4 638.8c-12 12-10.6 32.8 3.1 46.5l176.6 176.6c13.7 13.7 34.5 15.1 46.5 3.1l378.5-378.5c4.6-4.5 7.4-10.5 8-17.2z m-148.9-67c-19.5-19.5-19.5-51.2 0-70.7s51.2-19.5 70.7 0 19.5 51.2 0 70.7c-19.5 19.6-51.2 19.6-70.7 0z"
								p-id="5026"></path>
						</svg>
					</span>
					<span class="share_title">意见反馈</span>
					<span class="share_arrow iconfont icon-previewright"></span>
				</router-link>
			</div>
			<div class="share_btn mt-2">
				<!-- <a href="javascript:;" class="share"> -->
				<router-link to="/About" class="share">
					<span class="share_logo iconfont icon-tanhaotishi"></span>
					<span class="share_title">关于</span>
					<span class="share_arrow iconfont icon-previewright"></span>
				</router-link>
				<!-- </a> -->
			</div>
			<div class="exit_login w-100 mt-2">
				<a href="javascript:;" class="lost_login" @click="lostLogin()">
					<span class="share_logo iconfont icon-tuichu"></span>
					<span class="share_title">退出登录</span>
					<span class="share_arrow iconfont icon-previewright"></span>
				</a>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: "我的"
			},
			rid: null,
			authStatus: null,
			goScroll: "",
			// status: null,
			// plate_show: false,
			userInfo: {
				name: "",
				bankcard: null,
				logo: "",
				score: null,
				type: null,
				money_count: null,
				approveType: null
			},
			assetsList: [{
					title: "我的订单",
					icon: "icon-dingdan",
					bg_color: "#59E2F6",
					url: "/order"
				},
				{
					title: "我的保险",
					bg_color: "#FFC63D",
					icon: "icon-i-safe",
					url: "/userInsurance"
				},
				{
					title: "我的信用",
					bg_color: "#D83E3E",
					icon: "icon-xinyong1",
					url: "/usercredit"
				},
				{
					title: "我的发票",
					bg_color: "#FFB981",
					icon: "icon-fapiaoxinxi",
					url: "/invoice_fill"
				}
			],
			ationList: [{
					icon: "icon-mine-red",
					title: "个人认证",
					type: 1,
					rid: 1,
					status: 3,
					url: "/personal_auth"
				},
				{
					icon: "icon-jiudian",
					title: "企业认证",
					type: 2,
					rid: 2,
					status: 3,
					url: "/company_auth"
				},
				{
					icon: "icon-junren",
					title: "军人认证",
					type: 3,
					rid: 1,
					status: 3,
					url: "/soldier_auth"
				}
			],
			userInfoList: [{
					icon: "icon-chat2",
					title: "我的消息",
					url: "/message"
				},
				{
					icon: "icon-dingdan",
					title: "我的简历",
					url: "/user_resume"
				},
				{
					icon: "icon-confirmation-number",
					title: "我的发票",
					url: "/user_invoice"
				},
				{
					icon: "icon-dingwei2",
					title: "我的地址",
					url: "/user_addr/user"
				},
				{
					icon: "icon-xinyongqiahuankuan",
					title: "我的银行卡",
					url: "/userbankcard/list"
				}
			],
			UserCacheData: {
				kefutelcode: null
			},
			isIconIndex: 0,
			imageIconList: [{
					index: 0,
					name: "未认证",
					type: "个人",
					url: "./static/imgs/yf/geren_wei.png"
				},
				{
					index: 1,
					name: "待审核",
					type: "个人",
					url: "./static/imgs/yf/geren_shen.png"
				},
				{
					index: 2,
					name: "已认证",
					type: "个人",
					url: "./static/imgs/yf/geren_suc.png"
				},
				{
					index: 3,
					name: "未认证",
					type: "军人",
					url: "./static/imgs/yf/junren_wei.png"
				},
				{
					index: 4,
					name: "待审核",
					type: "军人",
					url: "./static/imgs/yf/junren_shen.png"
				},
				{
					index: 5,
					name: "已认证",
					type: "军人",
					url: "./static/imgs/yf/junren_suc.png"
				},
				{
					index: 6,
					name: "未认证",
					type: "企业",
					url: "./static/imgs/yf/qiye_wei.png"
				},
				{
					index: 7,
					name: "待审核",
					type: "企业",
					url: "./static/imgs/yf/qiye_shen.png"
				},
				{
					index: 8,
					name: "已认证",
					type: "企业",
					url: "./static/imgs/yf/qiye_suc.png"
				}
			]
		};
	},
	mounted() {
		// 添加顶部导航栏滚动事件
		window.addEventListener("scroll", this.handleScroll);
		this.delCache('ORDER_INFO');
	},
	created() {
		this.delSelectData();
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 1
		});
		this.delCache('ORDER_INFO');
		this.init();
	},
	methods: {
		init() {
			this.removeCache();

			this.getUserCache();
			// 获取菜单数据
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
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

		getUserCache() {
			var param = {
				token: this.getToken(),
				uid: this.getUserInfo().uid
			};
			this.__initAction("Member-getUserCache", param, (res, s) => {
				if (s == 1) {
					var data = res.data;
					console.log(data);
					this.UserCacheData = data;
					this.setCache("userInfoExt", JSON.stringify(data));
					this.userInfo.name = data.lastName;
					this.userInfo.bankcard = data.backNum;
					this.userInfo.logo = data.portrait;
					this.userInfo.score = data.credit;
					this.userInfo.money_count = data.balance;
					this.userInfo.approveType = data.approveType;
					var type = data.rid;
					this.rid = data.rid;
					//图标
					//rid:{1:"个人",2:"企业"}
					var status = data.userAuth.status;
					var type = data.userAuth.type;
					var rid = data.rid;
					if (rid) {
						switch (rid) {
							case 1: //rid==1{ type = 1(个人), type = 3(军人)}
								if (status == -1) { //type == [1,3]{status = 0(驳回),status = -1(未认证),status = 1(认证成功),status = 2(审核中),}
									if (type == 1) {
										console.log('我是个人用户,未认证');
										this.isIconIndex = 0;
									} else if (type == 3) {
										console.log('我是军人用户,未认证');
										this.isIconIndex = 3;
									} else {
										console.log('我是个人用户,未认证');
										this.isIconIndex = 0;
									}
								} else if (status == 0) {
									if (type == 1) {
										console.log('我是个人用户,驳回');
										this.isIconIndex = 0;
									} else if (type == 3) {
										console.log('我是军人用户,驳回');
										this.isIconIndex = 3;
									}
								} else if (status == 1) {
									if (type == 1) {
										console.log('我是个人用户,认证成功');
										this.isIconIndex = 2;
									} else if (type == 3) {
										console.log('我是军人用户,认证成功');
										this.isIconIndex = 5;
									}
								} else if (status == 2) {
									if (type == 1) {
										console.log('我是个人用户,审核中');
										this.isIconIndex = 1;
									} else if (type == 3) {
										console.log('我是军人用户,审核中');
										this.isIconIndex = 4;
									}
								}
								break;
							case 2: // rid==2{ type = 2(企业) }
								if (status == -1) { //type == [2]{status = 0(驳回),status = -1(未认证),status = 1(认证成功),status = 2(审核中),}
									if (type == 2) {
										console.log('我是企业,未认证');
										this.isIconIndex = 6;
									} else {
										console.log('我是企业,未认证');
										this.isIconIndex = 6;
									}
								} else if (status == 0) {
									if (type == 2) {
										this.isIconIndex = 6;
										console.log('我是企业,驳回');
									}
								} else if (status == 1) {
									if (type == 2) {
										console.log('我是企业,认证成功');
										this.isIconIndex = 8
									}
								} else if (status == 2) {
									if (type == 2) {
										console.log('我是企业,审核中');
										this.isIconIndex = 7
									}
								}
								break;
						};
					};
					//未提交认证
					if (data.userAuth.status == -1) {
						if (data.rid == 1) {
							this.ationList[2].rid = 1;
						}
						this.userInfo.approveType = 0;
					} else {
						var authKey = data.userAuth.type - 1;
						var status = data.userAuth.status;
						this.ationList[authKey].status = data.userAuth.status;
						switch (status) {
							case 2: //认证待审核
								if (data.userAuth.type == 1) {
									this.ationList[2].rid = 999;
								}
								if (data.userAuth.type == 3) {
									this.ationList[0].rid = 999;

									this.ationList[2].rid = 1;
								}
								break;
							case 0: //认证驳回
								if (data.userAuth.type == 1) {
									this.ationList[2].rid = 999;
								}
								if (data.userAuth.type == 3) {
									this.ationList[0].rid = 999;

									this.ationList[2].rid = 1;
								}
								break;
							case 1: //认证通过
								if (data.userAuth.type == 1) {
									this.ationList[2].rid = 999;
								}
								if (data.userAuth.type == 3) {
									this.ationList[2].rid = 1;
									this.ationList[0].rid = 999;
								}
								break;
						}
					}
					this.authStatus = data.userAuth.status;
				}
			});
		},

		handleScroll() { // 顶部导航栏滚动事件
			var offTop = window.pageYOffset;
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			let elementTop = document.querySelector(".header_bg").offsetHeight;
			var x = elementTop / 2;
			if (offTop > 5 && offTop <= x) {
				this.goScroll = "background:rgba(47, 155, 254, 0.1)";
			} else if (offTop > x && offTop <= elementTop) {
				this.goScroll = "background:rgba(47, 155, 254, 0.5)";
			} else if (offTop == 0) {
				this.goScroll = "display:flex";
			} else {
				this.goScroll = "display:none";
			}
		},

		lostLogin() {
			this.delCacheAll();
			// this.removeCache("footTabbarChange");
			setTimeout(() => {
				this.$router.push("/");
			}, 300);
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
		}
	},

	destroyed() {
		var offTop = window.pageYOffset;
		if (offTop > 0) {
			window.pageYOffset = 0;
		}
		window.removeEventListener("scroll", this.handleScroll);
	},

	computed: {
		iconImageUrl() {
			return this.imageIconList[this.isIconIndex];
		}
	}
};
</script>

<style lang="scss" scoped>
.userCenter .userCenter_ation div:nth-child(2) .ation_item {
		border-top: 1px solid #e7e7e7;
}
</style>
