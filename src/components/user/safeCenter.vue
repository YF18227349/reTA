<template>
	<div class="safeCenter">
		<div class="lists">
			<router-link :to="item.url" v-for="(item,i) in userList" :key="i" class="walletlist">
				<div class="listup">
					<div class="up-title">
						<p class="title1">{{item.title}}</p>
					</div>
					<span class="listright share_arrow iconfont icon-previewright"></span>
				</div>
			</router-link>
			<div class="walletlist" @click="cancel()">
				<div class="listup">
					<div class="up-title">
						<p class="title1">注销账号</p>
					</div>
				</div>
			</div>
		</div>
		<div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			userList: [
				{
					title: "更改登录密码",
					url: "/ResetPass/pass"
				},
				{
					title: "更改安全密码",
					url: "/ResetPass/tranPass"
				},
				{
					title: "更换手机号",
					url: "/ResetPass/phone"
				},
				// {
				// 	title: "更改邮箱",
				// 	url: "/ResetPass/email"
				// }
			]
		};
	},

	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: "安全中心",
			type: 1
		});
	},

	mounted() {
		var h = document.documentElement.clientHeight;
		$(".safeCenter .header").css("height", `${h * 0.07}px`);
		this.selfMainLoadClosed();
	},
	methods: {
		cancel(){
			this.selfAlertBox({
				mes: "确认是否注销账户",
				alert: true,
				cancel: true,
				opt: () => {
					this.sureCancel();
				}
			});
			return;
		},

		sureCancel(){
			var token = this.getToken();
			var url = "Member/userCancellation";
			var params = {
				token
			};
			this.__initAction(url, params, (res, s) => {
				if(s == 1){
					this._msg(res.info);
					this.delCacheAll();
					setTimeout(() => {
						this.$router.push("/");
					}, 300);
				}else{
					this._msg(res.info);
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.safeCenter {
	width: 100%;
	height: calc(100% - 2.8rem);
	background: #fff !important;
	padding: 0 20px 0;
	.lists {
		.walletlist {
			display: flex;
			border-bottom: 1px solid #e8e8e8;
			padding: 15px 0;
			.listup {
				width: 100%;
				display: flex;
				justify-content: space-between;
				.listright {
					margin: auto 0;
					font-size: 1.2rem;
					color: #666;
				}
				.up-title {
					margin: auto 0;
					.title1 {
						font-size: 0.8rem;
					}
				}
			}
		}
	}
}
</style>


