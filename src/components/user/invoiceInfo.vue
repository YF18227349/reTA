<template>
	<div class="user_invoice_detail w-100">
		<div class="user_invoice_detail_group w-100" v-if="emptyIsShow">
			<ul class="detail_list w-100">
				<li>
					<a href="javascript:;" class="line_item">
						<span class="f-left fc-gray fs-3 fw-6">发票抬头</span>
						<span class="f-left fc-dark fs-3 fw-6">{{invoice_info.title}}</span>
					</a>
				</li>
				<li>
					<a href="javascript:;" class="line_item">
						<span class="f-left fc-gray fs-3 fw-6">发票金额</span>
						<span class="total_item f-left fc-dark fm-1 fw-6">{{invoice_info.total}}</span>
					</a>
				</li>
				<li>
					<a href="javascript:;" class="line_item">
						<span class="f-left fc-gray fs-3 fw-6">开票时间</span>
						<span class="f-left fc-dark fs-3 fw-6">{{invoice_info.time}}</span>
					</a>
				</li>
				<li>
					<a href="javascript:;" class="line_item">
						<span class="f-left fc-gray fs-3 fw-6">税 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span>
						<span class="f-left fc-dark fs-3 fw-6">{{invoice_info.num}}</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: "发票详情"
			},
			emptyIsShow: false,
			invoice_info: {
				title: "",
				time: "",
				total: "",
				num: ""
			}
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 0
		});
		this.init();
	},

	beforeRouteLeave(to, from, next) {
		if (to.path == "/user_invoice") {
			to.meta.keepAlive = true;
		}
		next();
	},

	methods: {
		init() {
			this.getPageInfo();
			// 获取菜单数据
		},

		getPageInfo() {
			var url = "Invoice-infoMemberInvoice";
			var params = {
				token: this.getToken(),
				id: this.getParams().id
			}
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					var data = res.data;
					this.invoice_info.title = data.invoiceTotal.invoiceTitle;
					this.invoice_info.total = data.invoiceTotalPrice;
					this.invoice_info.time = data.create_time;
					this.invoice_info.num = data.invoiceTotal.invoiceAccount;
					this.emptyIsShow = true;
				} else {
					this.selfMainLoadClosed();
					this._msg(res.info);
				}
				this.selfMainLoadClosed();
			});
		}
	}
};
</script>
<style lang="scss">
</style>
