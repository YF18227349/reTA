<template>
	<div class="unloack_card w-100">
		<div class="unloack_card_group">
			<div class="unloack_card_logo" :style="'background:'+unloackCardInfo.color">
				<img :src="unloackCardInfo.logo" alt class="card_img">
				<span class="card_title">{{unloackCardInfo.title}}</span>
				<span class="card_id">{{unloackCardInfo.card_id}}</span>
			</div>
			<ul class="card_pay_quota bg-white">
				<li class="quota_title">银行支付限额</li>
				<li class="quota_single">
					<span class="single_title">{{unloackCardInfo.quota.single.title}}</span>
					<span class="single_count">{{unloackCardInfo.quota.single.count}}</span>
				</li>
				<li class="quota_day">
					<span>{{unloackCardInfo.quota.day.title}}</span>
					<span>{{unloackCardInfo.quota.day.count}}</span>
				</li>
			</ul>
			<a href="javascript:;" class="unlockbtn btn-r bg-white br-lightdark" @click="unlock_card()">
				<span class="fc-dark fm-1 fw-6">解除绑定</span>
				<!-- <span class="iconfont icon-stop btn-icon fc-white fw-5"></span> -->
			</a>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: "解绑银行卡"
			},
			unloackCardInfo: {
				title: "",
				card_id: "",
				logo: "",
				color: "",
				quota: {
					single: {
						title: "单笔限额",
						count: null
					},
					day: {
						title: "每日限额",
						count: null
					}
				}
			}
		};
	},
	mounted() {
		var height = document.documentElement.clientHeight;
		var div = document.getElementsByClassName("unloack_card")[0];
		div.style.height = height + "px";
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
			this.getPageInfo();
			// 获取菜单数据
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},
		getPageInfo() {
			var that = this;
			this.selfMainLoadOpend();
			this.__initAction(
				"Bank-infoMemberCard",
				{
					token: this.getToken(),
					id: this.getParams().id
				},
				(res, s) => {
					this.selfMainLoadClosed();
					if (s == 1) {
						var cardInfo = res.data.cardId;
						var data = res.data;
						this.unloackCardInfo.title = cardInfo.backName;
						this.unloackCardInfo.card_id = data.cardNum;
						this.unloackCardInfo.logo = cardInfo.img;
						this.unloackCardInfo.color = "#" + cardInfo.color;
						this.unloackCardInfo.quota.single.count = cardInfo.singleQuota;
						this.unloackCardInfo.quota.day.count = cardInfo.dayQuota;
					} else {
						this._msg(res.info);
					}
				}
			);
		},
		unlock_card() {
			var that = this;
			this.__initAction(
				"Bank-delMemberCard",
				{
					token: this.getToken(),
					id: this.getParams().id
				},
				(res, s) => {
					if (s == 1) {
						this._msg(res.info, 1000);
						setTimeout(() => {
							window.history.go(-1);
						}, 1500);
					} else {
						this._msg(res.info);
					}
				}
			);
		}
	}
};
</script>
<style lang="scss">
</style>
