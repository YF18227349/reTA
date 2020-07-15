<template>
<div class="userBillDetail w-100">
	<div class="userBillDetail_list w-100 bg-white">
		<yd-cell-item v-for="(item,i) in billList" :key="i">
			<span slot="left" class="title fw-5">{{item.title}}</span>
			<span slot="right" class="detail fw-5">{{item.detail}}</span>
		</yd-cell-item>
	</div>
</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: "我的明细"
			},
			billList: [{
					title: "",
					detail: ""
				},
				{
					title: "类型",
					detail: ""
				},
				{
					title: "时间",
					detail: ""
				},
				{
					title: "交易单号",
					detail: ""
				},
				{
					title: "剩余零钱",
					detail: ""
				},
				{
					title: "备注",
					detail: ""
				}
			]
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.selfMainLoadClosed();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 1
		});
		this.getDataInfo();
	},

	beforeRouteLeave(to, from, next) {
		if (to.path == "/user_balance") {
			to.meta.keepAlive = true;
		}
		next();
	},

	methods: {
		getDataInfo() {
			var token = this.getToken();
			var id = this.getParams().uid;
			var url = 'balance-getInfo';
			var params = {
				token,
				id
			}
			var that = this;
			that.__initAction(url, params, (res, s) => {
				if (s == 1) {
					var data = res.data;
					console.log('123',data);
					this.billList[0].detail = res.data.price;
					this.billList[0].title = res.data.types == '-' ? "出账金额" : "进账金额";
					this.billList[1].detail = res.data.types == '-' ? "支出" : "收入";
					this.billList[2].detail = res.data.create_time;
					this.billList[3].detail = res.data.sn;
					this.billList[4].detail = res.data.infoData.newBalance;
					this.billList[5].detail = res.data.info;
				} else {
					this._msg(res.info);
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
	.yd-cell-item {
		height: 50px;
		border-bottom: 1px solid #dddddd;
		padding: 17px 0;
	}
	.yd-cell-item:last-child {
		border-bottom-color: transparent;
	}

	.title {
		color: #888888;
		font-size: 16px;
	}
	.detail {
		color: #333333;
		font-size: 14px;
	}
</style>
