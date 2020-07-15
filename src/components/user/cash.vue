<template>
	<div class="cash w-100">
		<!-- <header class="cash_header">
			<a href="javascript:history.go(-1)" class="arrow-logo iconfont icon-previewleft"></a>
			<span class="header_title">{{pageInfo.header_title}}</span>
			<a href="javascript:;"></a>
		</header>-->
		<!-- <div class="clear-fixed"></div> -->
		<div class="cash_group" v-if="card_show">
			<router-link
				to="/userbankcard/cash"
				class="bank_card bg-white"
				:style="'background:'+card_info.color"
			>
				<span class="card_logo">
					<img :src="card_info.logo" alt class="card_img" />
				</span>
				<ul class="card_info ml-3">
					<li>
						<span
							class="card_info_title"
							:class="card_show?'fc-white':'fc-gray'"
						>{{card_info.title}}</span>
						<span class="card_info_title fc-white">{{card_info.card_num}}</span>
					</li>
					<li v-if="card_show">
						<span class="card_info_msg fc-white">{{card_info.msg}}</span>
					</li>
				</ul>
				<span class="card_arrow iconfont icon-previewright" :class="card_show?'fc-white':'fc-gray'"></span>
			</router-link>
			<ul class="cash_list_items bg-white">
				<li class="item1">
					<span class="item1_title">{{pageInfo.cash_list.title}}</span>
					<div class="item1_btns">
						<span
							class="item1_btn"
							:class="btnCode==i ?'bg-blue fc-white':''"
							v-for="(tmp,i) in pageInfo.cash_list.btns"
							:key="i"
							@click="btnCode = i"
						>{{tmp.title}}</span>
					</div>
				</li>
				<li class="item2">
					<p class="cash_count_title">{{card_info.cash_count.title}}</p>
					<span class="cash_count_data">¥ {{card_info.cash_count.count}}</span>
				</li>
				<li class="item3">
					<p class="cash_money_title">提取金额</p>
					<div class="cash_money_data mt-4">
						<span class="fw-5">¥</span>
						<input
							v-model="extractAmount"
							type="number"
							placeholder="请输入提取金额(元)"
							class="cash_money_input fw-5"
						/>
						<span class="fs-3 fw-5 text-right"></span>
					</div>
				</li>
				<li class="cash_pwd">
					<p class="cash_pwd_title">交易密码</p>
					<input
						v-model="tranPwd"
						type="password"
						placeholder="请输入交易密码"
						class="cash_pwd_input fw-5"
					/>
				</li>
			</ul>
			<a href="javascript:;" class="submitBtn btn-c bg-blue mt-6" @click="cash()">
				<span class="fc-white fw-6 fm-2">确认提现</span>
			</a>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			extractAmount: "",
			tranPwd: "",
			card_show: false,
			btnCode: 0,
			pageInfo: {
				header_title: "提现",
				card_id: null,
				types: 2,
				page: 0,
				length: 10,
				fields: "id",
				rules: "desc",
				cash_list: {
					title: "选择提现金额种类",
					btns: [
						{
							title: "现金提现"
						},
						{
							title: "佣金提现"
						}
					]
				}
			},
			card_info: {
				title: "",
				msg: "24小时到账",
				card_num: "",
				color: "",
				logo: "",
				cash_count: {
					title: "可提现金额",
					count: null
				}
			},
			cashBank: null
		};
	},

	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 1
		});
		this.init();
	},
	methods: {
		init() {
			this.setCardData();
			// 获取菜单数据
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},

		setCardData() {
			// this.remove_data();
			this.cashBank = this.getCache("cashBank", 2);
			if (!this.cashBank) {
				this.cashBank = {
					id: 0
				};
				this.setCache("cashBank", JSON.stringify(this.cashBank));
			}
			// console.log(window.localStorage);
			// console.log(this.cashBank);

			if (this.cashBank.id == 0) {
				var type = "list";
			} else {
				var type = "show";
			}
			switch (type) {
				case "list":
					var link = "Bank-listMemberCard";
					var param = {
						token: this.getToken(),
						page: 0,
						length: 2,
						fields: "id",
						rules: "desc"
					};
					this.getCardInfo(link, param, type);
					break;
				case "show":
					var link = "Bank-infoMemberCard";
					var param = {
						token: this.getToken(),
						id: this.cashBank.id
					};
					this.getCardInfo(link, param, type);
					break;
			}
		},

		getCardInfo(url, params, t) {
			var that = this;
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					if (t.constructor !== String) {
						t = t.toString();
					}
					switch (t) {
						case "list":
							var data = res.data[0];
							this.card_show = true;
							this.card_info.title = data.cardId.backName;
							var num = data.cardNum.substring(data.cardNum.length - 4);
							this.card_info.card_num = `(${num})`;
							this.card_info.logo = data.cardId.img;
							this.card_info.color = "#" + data.cardId.color;
							var info = this.getCache("userInfoExt", 2);
							var newNum = parseFloat(info.balance);
							this.card_info.cash_count.count = newNum.toFixed(2);
							this.$dialog.loading.close();
							break;
						case "show":
							var data = res.data;
							this.card_show = true;
							this.card_info.title = data.cardId.backName;
							var num = data.cardNum.substring(data.cardNum.length - 4);
							this.card_info.card_num = `(${num})`;
							this.card_info.logo = data.cardId.img;
							this.card_info.color = "#" + data.cardId.color;
							var info = this.getCache("userInfoExt", 2);
							var newNum = parseFloat(info.balance);
							this.card_info.cash_count.count = newNum.toFixed(2);
							this.$dialog.loading.close();
							break;
					}
				} else {
					// this._msg("您还没有绑定银行卡");
					setTimeout(() => {
						this.$dialog.confirm({
							title: "添加银行卡",
							mes: "是否去添加银行卡",
							opts: [
								{
									txt: "取消",
									color: "#ccc",
									callback: () => {
										setTimeout(() => {
											this.$router.back(-1);
										});
									}
								},
								{
									txt: "确定",
									color: false,
									callback: () => {
										this.$router.push("/userbankcard/list");
									}
								}
							]
						});
					}, 500);
				}
			});
		},

		remove_data() {
			this.delCache("cashBank");
		},

		cash() {
			// console.log('提现')
			var that = this;
			if(!this.extractAmount){
				this._msg("请先输入取现金额");
				return;
			};
			if(!this.tranPwd) {
				this._msg("请先输入交易密码");
				return;
			};
			var url = "balance-extractMemberBalance";
			var params = {
				token: this.getToken(),
				price: this.extractAmount,
				payPass: this.tranPwd,
				cardId: this.cashBank.id
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					this._msg(res.info);
					setTimeout(() => {
						window.history.go(-1);
					}, 2000);
				} else {
					this._msg(res.info);
				}
			});
		}
	},

	watch: {
		extractAmount() {
			var extractAmount = parseFloat(this.extractAmount);
			var count = parseFloat(this.card_info.cash_count.count);
			if (extractAmount > count) {
				this.extractAmount = count;
			}
		}
	}
};
</script>
<style lang="scss">
</style>
