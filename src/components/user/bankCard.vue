<template>
	<div class="userBankCard">
		<!-- <header class="userBankCard_header">
				<a href="javascript:history.go(-1)" class="arrow-logo iconfont icon-previewleft"></a>
				<span class="header_title">{{pageInfo.header_title}}</span>
				<a href="javascript:;"></a>
			</header>-->
		<!-- <div class="clear-fixed"></div> -->
		<div class="userBanCardGroup">
			<p class="fm-1 mt-5 mb-5 fc-gray w-100 fw-6 text-center" v-if="emptyIsShow">暂无数据...</p>

			<a href="javascript:;" @click="click_card(tmp.id)" class="userBanCardInfo mb-4" :style="'background:'+tmp.color" v-for="(tmp,i) in userBanCardInfo" :key="i">
				<img :src="tmp.logo" alt class="card_img">
				<ul class="card_detail">
					<li class="card_detail_title">{{tmp.title}}</li>
					<li class="card_detail_type">{{tmp.type}}</li>
					<li class="card_detail_id">{{tmp.card_id}}</li>
				</ul>
			</a>
			<router-link :to="'/addbankcard/'+pageInfo.type" class="addBankCards bg-white br-gray" v-if="isShow">
				<span class="fc-dark fm-1 fw-6">添加银行卡</span>
				<!-- <span class="iconfont icon-jiahao1 btn-icon"></span> -->
			</router-link>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: "我的银行卡",
				listCount: 0,
				type: null
			},
			param: {
				page: 0,
				length: 50,
				fields: "id",
				rules: "desc"
			},
			userBanCardInfo: [],
			emptyIsShow: false,
			isShow: false
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 1
		});
		this.pageInfo.type = this.getParams().type;
		this.init();
	},

	beforeRouteLeave(to, from, next) {
		if (to.path == "/newusercenter") {
			to.meta.keepAlive = false;
		}
		next();
	},

	methods: {
		init() {
			this.getpageInfo();
			// 获取菜单数据
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},
		getpageInfo() {
			var that = this;
			let url = "Bank-listMemberCard";
			let params = {
				token: this.getToken(),
				page: this.param.page,
				length: this.param.length,
				fields: this.param.fields,
				rules: this.param.rules
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					for (let item of res.data) {
						var arr = {};
						arr.id = item.id;
						arr.title = item.cardId.backName;
						arr.card_id = item.cardNum;
						arr.logo = item.cardId.img;
						arr.color = "#" + item.cardId.color;
						this.userBanCardInfo.push(arr);
					}
					this.pageInfo.listCount = res.data.count;
					switch (this.pageInfo.type) {
						case "cash":
							this.isShow = false;
							break;
						default:
							this.isShow = true;
							break;
					}
				} else {
					this.isShow = true;
					this.emptyIsShow = true;
					// this._msg(res.info);
				}
			});
		},
		click_card(x) {
			// :to="`/unlockbankcard/${tmp.id}`"
			var type = this.getParams().type;
			switch (type) {
				case "cash":
					// console.log(window.localStorage);
					var cashBank = this.getCache("cashBank", 2);
					cashBank.id = x;
					this.setCache("cashBank", JSON.stringify(cashBank));
					setTimeout(() => {
						this.$router.push("/cash");
					}, 300);
					break;
				default:
					this.$router.push(`/unlockbankcard/${x}`);
					break;
			}
		}
	}
};
</script>
<style lang="scss">
    .addBankCards{
		position: fixed; 
		left: 50%;
		bottom: 0; 
		left: 0;
		z-index: 99;
		width: 100%;
		height: 44px;
		line-height: 44px;
		text-align: center;
	}
</style>
