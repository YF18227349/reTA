<template>
	<div class="userwallet">
		<div class="walletcard">
			<div class="cardone">
				<p class="cardonep1">钱包余额 (元)</p>
				<p class="cardonep2">{{pageLan.money}}</p>
				<p class="cardonep3">
					<span class="newiconfont icon-shimingrenzheng"></span>
					<span>{{pageLan.attest == 0 ? "未认证" : "已认证"}}</span>
				</p>
			</div>
			<div class="cardtwo">
				<router-link to="/cash">
					提现 >
				</router-link>
			</div>
		</div>
		<div class="lists">
			<router-link :to="item.url" v-for="(item,i) in userList" :key="i" class="walletlist">
				<div class="icon-left">
					<div class="icon-box">
						<!-- <span class="fontsize" :class="item.class"></span> -->
						<span class="fontsize"><img :src="item.img"></span>
					</div>
				</div>
				<div class="listup">
					<div class="up-title">
						<p class="title1">{{item.title}}</p>
						<p class="title2">{{item.title2}}</p>
					</div>
					<div class="listright share_arrow iconfont icon-previewright"></div>
				</div>
			</router-link>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageLan: {
				attest: null,
				money:0
			},
			userList: [
				{
					// class: "newiconfont icon-chongzhi",
					img: "./static/imgs/user_center/icon_00017.png",
					title: "充值",
					title2: "充值到钱包余额",
					url: "/Recharge"
				},
				{
					// class: "newiconfont icon-tixian",
					img: "./static/imgs/user_center/icon_00018.png",
					title: "提现",
					title2: "提现到绑定银行卡",
					url: "/cash"
				},
				{
					// class: "newiconfont icon-yinhangqia",
					img: "./static/imgs/user_center/icon_00019.png",
					title: "我的银行卡",
					title2: "查看绑定的银行卡",
					url: "/userbankcard/list"
				},
				{
					// class: "newiconfont icon-fapiao",
					img: "./static/imgs/user_center/icon_00020.png",
					title: "我的发票",
					title2: "查看我的发票",
					url: "/user_invoice"
				},
				{
					// class: "newiconfont icon-anquanzhongxin89",
					img: "./static/imgs/user_center/icon_00021.png",
					title: "安全中心",
					title2: "保护你的钱包安全",
					url: "/safecenter"
				}
			]
		};
	},
	created() {
		this.getPageData(this.selfMainLoadOpend())
			.then(() => {
				return this.getUserInfos();
			})
			.then(() => {
				this.selfMainLoadClosed();
			});
	},
	mounted() {
		this.setHeaderText();
		// var h = document.documentElement.clientHeight;
		// $(".nav_header").css("height", `${h * 0.07}px`);
	},
	destroyed() {
		var $nav = $(".nav_header .header_right div");
		$nav.remove();
	},

	beforeRouteLeave(to, from, next) {
		if (to.path == "/newusercenter") {
			to.meta.keepAlive = false;
		}
		next();
	},

	methods: {
		getPageData() {
			return new Promise((resolve, reject) => {
				this.$store.commit("setHeaderStyle", {
					txt: "我的钱包",
					type: 1
				});
				this.pageLan.attest = this.getQuery().attest;
				resolve();
			});
		},

		getUserInfos() {
			return new Promise((resolve, reject) => {
				var params = {
					token: this.getToken(),
					uid: this.getUserInfo().uid
				};
				var url = "Member-getUserCache";
				this.__initAction(url, params, (res, s) => {
					if (s == 1) {
						var data = res.data;
						this.pageLan.money = data.balance;
						resolve();
					}
				});
			});
		},

		setHeaderText() {
			var that = this;
			var $nav = $(".nav_header .header_right");
			var div = document.createElement("div");
			var span = document.createElement("span");
			div.innerHTML = "账单";
			div.style.color = "#fff";
			div.onclick = () => {
				this.$router.push("/user_balance");
			};
			$nav.append(div);
		}
	}
};
</script>
<style lang="scss" scoped>
	.userwallet {
		padding: 20px;
		width: 100%;
		height: calc(100% - 2.8rem);
		background: #fff;
		.header {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #e8e8e8;
			padding-bottom: 8px;
			.headerp1 {
				font-size: 0.8rem;
				margin: auto 0;
			}
			.headerp2 {
				font-size: 1rem;
			}
			.headerp3 {
				color: #81c2fd;
				font-size: 0.8rem;
				margin: auto 0;
			}
		}
		.walletcard {
			width: 100%;
			height: 160px;
			background: #3884ff;
			color: #fff;
			border-radius: 10px;
			margin-top: 10px;
			padding: 20px;
			display: flex;
			justify-content: space-between;
			.cardone {
				line-height: 2.8;
				.cardonep2 {
					font-size: 20px;
				}
			}
			.cardtwo {
				line-height: 120px;
			}
		}
		.lists {
			// border-bottom:2px solid #e8e8e8;
			margin-top: 10px;
			.icon-left {
				width: 15vw;
				display: flex;
				justify-content: center;
				align-items: center;
				.fontsize {
					// font-weight: 600;
					font-size: 1.6rem;
				}
			}
		}
		.walletlist {
			width: 100%;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #e8e8e8;
			padding: 10px 0;
			img {
				width: 1.6rem;
				height: 1.6rem;
				margin: 5px 3px 0 0;
			}
			.listup {
				width: 85%;
				display: flex;
				justify-content: space-between;
				.listright {
					margin: auto 0;
					font-size: 1.2rem;
					color: #666;
					margin-right: 5px;
				}
				.up-title {
					margin: auto 0;
					.title1 {
						font-size: 0.8rem;
						font-weight: 600;
					}
					.title2 {
						margin-top: 7px;
						color: #666;
					}
				}
			}
		}
	}
</style>


