<template>
	<div class="payment w-100">
		<div class="payment_group w-100">
			<div class="payInfo w-100">
				<ul class="items">
					<li class="item1">
						<span>{{confirmInfo.title}}</span>
					</li>
					<li class="item2">
						<span class="info_text">
							<span class="fw-5">{{confirmInfo.name}}</span>
							<span
								class="item_icon fw-6 fc-green iconfont icon-renzheng"
								v-if="confirmInfo.type != 0"
							></span>
						</span>
						<span class="info_price fc-red fw-5">¥{{confirmInfo.price}}</span>
					</li>
					<li class="item3">
						<span class="info_detail">{{confirmInfo.detail}}</span>
					</li>
				</ul>
			</div>
			<div class="pay_count bg-white" v-if="this.sign == `skills`">
				<span>购买数量</span>
				<div>
					<yd-spinner width="92px" height="26px" v-model="payCount"></yd-spinner>
				</div>
			</div>
			<div class="defaultPay bg-white" v-if="false">未支付履约保证金</div>
			<div class="defaultPay bg-white" v-if="false">
				<span class="defaultPay_title">履约保证金</span>
				<input type="text" placeholder="请输入(单位：元)" v-model="bond" />
			</div>

			<div class="payType bg-white">
				<a href="javascript:;" class="line_arrow_item bg-white" @click="pay_modal_show = true">
					<span class="fs-3 fw-6 fc-dark f-left">支付方式</span>
					<span class="fc-gray f-right fw-5 item_arrow iconfont icon-previewright"></span>
					<span class="fs-3 fc-dark ml-2 f-right fw-6">{{pay_model}}</span>
					<img :src="pay_logo" alt class="pay_logo f-right" />
				</a>
			</div>
		</div>
		<footer class="pay_footer w-100 shadow-dark">
			<div class="pay_price bg-white">
				<span class="pay_price_title mr-3">合计:</span>
				<span class="price fc-red">{{priceTotal}}</span>
			</div>
			<a href="javascript:;" class="bg-blue" @click.prevent="do_alert()">
				<span class="fm-2 fw-6 fc-white">支付</span>
			</a>
		</footer>

		<self-modal-frame
			:modalShow="pay_modal_show"
			:dataList="payModelList"
			@callBack="select_value"
			:code="true"
		></self-modal-frame>
	</div>
</template>

<script>
const ModalFrame = ()=>import("../sub/modal_frame");
export default {
	data() {
		return {
			pageTitle: "",
			payCount: 1, //默认支付数量为1
			pay_code: 1, //默认支付宝支付
			confirmInfo: {
				title: "",
				name: "",
				logo: "",
				price: "",
				type: 0,
				detail: ""
			},
			sign: null,
			bond: "", //保证金
			total: null,
			payValue: 0,
			ordersNum: null,
			id: null,
			pay_modal_show: false, //支付选择弹框开关
			isStr: null, // 兼职支付
			goodId: null,
			payModelList: [
				{
					value: "支付宝",
					logo: "./static/imgs/main/icon-zhifubao@2x.png"
				},
				{
					value: "微信",
					logo: "./static/imgs/main/2icon-weixin@2x.png"
				},
				{
					value:'平台',
					logo: this.getCache("APPLOGO", 2).val
				}
			]
		};
	},
	created() {
		this.get_pageInfo();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageTitle,
			type: 1
		});
	},

	mounted() {
		var h = document.documentElement.clientHeight;
		$(".pay_footer").css("height", `${h * 0.075}px`);
	},

	destroyed() {
		//do something after destroying vue instance
	},

	methods: {
		get_pageInfo() {
			// var info = this.getCache("paymentInfo", 2);
			// if (!info) {
			//   this.pageInfo = this.getQuery();
			//   this.setCache("paymentInfo", JSON.stringify(this.getQuery()));
			// } else {
			//   this.pageInfo = info
			// };
			// this.sign = this.getParams().str;
			this.pageInfo = this.getQuery();
			// console.log(this.pageInfo.code);
			if (this.pageInfo.code == 0) {
				this.pageTitle = "平台支付";
			} else if (this.pageInfo.code == 1) {
				this.pageTitle = "订单下单";
			}
			this.sign = this.pageInfo.sign;
			var token = this.getToken();
			var sign = this.pageInfo.sign;
			var goodsId = this.pageInfo.gid;
			var str = this.getParams().str;
			this.goodId = goodsId;
			this.isStr = str;
			var url = "Newsgoods-getNewsgoodsOrder";
			var params = {
				token,
				sign,
				goodsId
			};
			this.getData(url, params, sign, str);
		},

		getData(url, params, sign, str) {
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					if (this.pageInfo.code == 1) {
						var data = res.data.prdInfo;
						var arr = this.confirmInfo;
						var orderInfo = res.data.orderInfo;
						this.id = data.id;
						console.log(data);
						var arr = this.confirmInfo;
						arr.title = data.title;
						arr.name = data.uinfo.lastName;
						arr.price = data.price + "元";
						// arr.salary = data.price;
						arr.detail = data.infos;
						// arr.type = user.approveType;
					}
				}
			});
		},

		select_value(v) {
			if (v == "支付宝") {
				this.payValue = 0;
			} else if(v == "微信") {
				this.payValue = 1;
			}else{
				this.payValue = 2;
			}
			this.pay_modal_show = false;
		},

		do_alert() {
			var prices = parseInt(this.confirmInfo.price.split("/")[0]);
			var count = parseInt(this.payCount);
			var priceTotal = (prices * count).toFixed(2);

			var token, payment, goodType, number, price, goodId, payFun;
			token = this.getToken();
			payment = parseInt(this.pageInfo.code);
			payFun = this.payValue+1;
			goodType = this.sign;
			number = parseInt(this.payCount);
			try {
				price = prices.toFixed(2);
			} catch (e) {
				price = prices;
			}
			goodId = this.id;
			var params = {
				token,
				goodsInfo: `${goodType}|${goodId}`,
				num: number,
				payFun
			};
			var that = this;
			setTimeout(() => {
				that.selfAlertBox({
					mes: "支付金额为" + priceTotal + "元",
					cancel: true,
					alert: true,
					opt: () => {
						var url = "Tloong-buySkill";
						that.paying(url,params);
					}
				});
			});
		},

		paying(url,params) {
			this.__initAction(url,params, (res, s) => {
				if (s == 1) {
					this._msg(res.info);
					setTimeout(()=>{
						window.location.href = res.data.href;
						// this.$router.back(-1);
					},200)
				}
			});
		}
	},

	computed: {
		pay_model() {
			if (this.payValue == null) {
				return "请选择";
			} else {
				var i = parseInt(this.payValue);
				this.pay_modal_show = false;
				return this.payModelList[i].value;
			}
		},

		pay_logo() {
			if (this.payValue == null) {
				return "";
			} else {
				var i = parseInt(this.payValue);
				this.select_code = false;
				return this.payModelList[i].logo;
			}
		},

		priceTotal() {
			if (this.confirmInfo.price) {
				var price = parseInt(this.confirmInfo.price.split("/")[0]);
				var count = parseInt(this.payCount);
				return (price * count).toFixed(2);
			}
		}
	},
	components: {
		"self-modal-frame": ModalFrame
		//   "self-load-frame": LoadFrame
	}
};
</script>

<style lang="scss">
.yd-navbar {
	font-weight: 600;
}
.yd-back-icon:before,
.yd-next-icon:before {
	font-size: 17px;
	margin: 10px;
}
.yd-spinner > span {
	line-height: 10px;
	border: 1px solid #00c6ff;
	background-color: #fafafa;
}
.yd-spinner > input {
	font-size: 16px;
	font-weight: bold;
	color: #333;
}
</style>
