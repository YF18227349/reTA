<template>
	<div class="order w-100">
		<div class="list-card">
			<ul class="list">
				<li class="list-item mt-3" v-for="(tmp,i) in partTimeList" :key="i">
					<div @click.prevent="do_chat(tmp.userId,tmp.goodId)">
						<h3 class="item-title">{{tmp.goodInfo.title}}</h3>
						<a href="javascript:;" class="item-link mt-3">
							<div>
								<span class="fc-gray item-name">{{tmp.goodInfo.title}}</span>
								<span class="iconfont icon-renzheng fc-green"></span>
							</div>
							<span class="fc-red fw-6 item-money">{{tmp.goodInfo.serviceDatd}}</span>
						</a>
						<div class="mt-3 item-content">{{tmp.goodInfo.infos}}</div>
						<div class="item-btns item5 mt-3 pt-3" v-if="tmp.buttonStatus.communicateStatus == 1">
							<a href="javascript:;" @click.stop="updatedStatus(tmp.userId,tmp.goodId,2,tmp.buttonStatus.orderId,i)">
								<span v-text="`同意`"></span>
							</a>
							<a href="javascript:;" @click.stop="updatedStatus(tmp.userId,tmp.goodId,3,tmp.buttonStatus.orderId,i)">
								<span v-text="`拒绝`"></span>
							</a>
						</div>
						<div class="item-btns item5 mt-3 pt-3" v-if="tmp.buttonStatus.communicateStatus == 7">
							<a href="javascript:;" @click.stop="updatedStatus(tmp.userId,tmp.goodId,1,tmp.buttonStatus.orderId,i)">
								<span v-text="`确认完成`"></span>
							</a>
						</div>
						<div class="item-btns item5 mt-3 pt-3" v-if="tmp.buttonStatus.communicateStatus == 9">
							<a href="javascript:;" @click.stop="updatedStatus(tmp.userId,tmp.goodId,4,tmp.buttonStatus.orderId,i)">
								<span v-text="`评价`"></span>
							</a>
						</div>
						<!-- <div class="item7 pt-2">
							<span class="fc-gray fs-2 fw-6">提示：{{tmp.buttonStatus.msg}}</span>
						</div> -->
						<div class="item-btns2 mt-3 fc-blue fw-6">
							<span>查看详情</span>
						</div>
					</div>
				</li>
			</ul>

			<a v-if="partTimeList.length==0" href="javascript:;">
				<self-no-data title="暂无数据..."></self-no-data>
			</a>
			
		</div>
	</div>
</template>

<script>
const NoData = ()=>import("../sub/noDataModel");
const LoadFrame = ()=>import("../sub/loading_frame");
export default {
	data() {
		return {
			pageLan: {
				title: "",
				count: "",
				postList: []
			},
			partTimeList: [
				// {
				// 	title: "这是一条兼职",
				// 	name: "汪汪叫",
				// 	icon: "iconfont icon-renzheng fc-green",
				// 	money: "100/天",
				// 	info: "这是一条兼职发布这是一条兼职发布",
				// 	time: "2019-10-15",
				// 	status: 0
				// },
				// {
				// 	title: "这是一条兼职",
				// 	name: "汪汪",
				// 	icon: "iconfont icon-3qiyezhengxin83a638 fc-blue",
				// 	money: "100/天",
				// 	info: "这是一条兼职发布这是一条兼职发布",
				// 	time: "2019-10-15",
				// 	status: 0
				// }
			]
		};
	},
	created() {
		this.getPageData(this.selfMainLoadOpend())
			.then(token => {
				return this.getPageInfo(token);
			})
			.then(result => {
				return this.showData(result);
			})
			.then(() => {
				this.selfMainLoadClosed();
			});
	},
	mounted() {
	},
	destroyed() {},

	// beforeRouteLeave(to, from, next) {
	// 	if (to.path == "/partList") {
	// 		to.meta.keepAlive = true;
	// 	}
	// 	next();
	// },
	methods: {
		getPageData() {
			return new Promise((resolve, reject) => {
				this.$store.commit("setHeaderStyle", {
					txt: "我发布兼职",
					type: 1
				});
				resolve(this.getToken());
			});
		},

		getPageInfo(token) {
			return new Promise((resolve, reject) => {
				var isRelease = 1;
				var ordersType = 0;
				var ordersStatus = 0;
				var page = 0;
				var length = 100;
				var pid = this.getQuery().pid;
				var params = {
					token,
					isRelease,
					ordersType,
					ordersStatus,
					page,
					length,
					pid
				};
				var url = "Tloong-orderList";
				var that = this;
				that.__initAction(url, params, (res, s) => {
					if (s == 1) {
					}
					resolve(res);
				});
			});
		},

		showData(result) {
			return new Promise((resolve, reject) => {
				// this.pageInfo.count = result.count;
				var data = result.data;
				this.postUserId = data.userId; //发布者id
				this.baseUserId = this.getUserInfo().uid; //我的id
				if (!data) return this.selfMainLoadClosed();
				for (let it of data) {
					var arr = it;
					this.partTimeList.push(arr);
				}
				resolve();
			});
		},

		updatedStatus(uIds, goodId, i, orderid, index) {
			//立即完成&同意&拒绝
			let token = this.getToken();
			let c_status = i;
			if(c_status == 1){
				let ordersId = orderid;
				let uppInfo = 1;
				var params = {
					token,
					ordersId,
					uppInfo
				}
				var url = "Tloong-orderUpp";
				this.__initAction(url, params, (res, s) => {
					if (s == 1) {
						// this._msg("请耐心等待(^_^)");
						setTimeout(() => {
							this.getBtnStatus(goodId, uIds, index);
						}, 500);
					} else {
						this._msg(res.info, 1000);
						setTimeout(() => {
							this.getBtnStatus(goodId, uIds, index);
						}, 500);
					}
				});
			}else if(c_status == 4){
				this.$router.push(`/evaluate/${orderid}`)
			}else{
				let sign = 'demands';
				let goodsId = goodId;
				let goodsInfo = `${sign}|${goodsId}`;
				let orderId = orderid;
				var params = {
					token,
					goodsInfo,
					c_status,
					orderId
				};
				// console.log(params);
				var url = "Tloong-getSwopUpd";
				this.__initAction(url, params, (res, s) => {
					if (s == 1) {
						// this._msg("请耐心等待(^_^)");
						setTimeout(() => {
							this.getBtnStatus(goodId, uIds, index);
						}, 500);
					} else {
						this._msg(res.info, 1000);
						setTimeout(() => {
							this.getBtnStatus(goodId, uIds, index);
						}, 500);
					}
				});
			}
		},

		getBtnStatus(goodId, toUid, index) {
			//获得按钮状态
			let token = this.getToken();
			let sign = 'demands';
			let goodsId = goodId;
			let goodsInfo = `${sign}|${goodsId}`;
			let params = {
				token,
				goodsInfo,
				toUid
			};
			let url = "Tloong-getSwopInfo";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					let data = res.data;
					let status = data.communicateStatus;
					let msg = data.msg;
					if (status.constructor !== Number) status = status.parseInt();
					this.partTimeList[index].buttonStatus.communicateStatus = status;
					this.partTimeList[index].buttonStatus.msg = msg;
				}
			});
		},

		do_chat(uIds, gid) { //跳转抢单页面
			var userId = uIds; //产品发布人id
			var baseUid = this.getUserInfo().uid; //用户id
			var sign = 'demands'; //项目标识符 (比如: 兼职=demands 技能= skills 岗位=quarters 简历=resume)
			var gid = gid; //产品的id
			if (baseUid == userId) { //判断本地用户id 与 产品发布人id 是否相等
				this.selfAlertBox({
					mes: "您不能和自己发布的订单沟通",
					cancel: false,
					alert: true
				});
				return;
			}
			var query = {
				sign,
				gid,
				toUid: userId
			};
			this.$router.push({
				path: "/service_chat",
				query
			});
		},
	},

	computed: {},

	components: {
		"self-no-data": NoData,
		"self-load-frame": LoadFrame
	}
};
</script>

<style lang="scss" scoped>
	.order {
		width: 100%;
		height: 100vh;
		overflow: scroll;
		.order-header {
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			.bar-list {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 10px 0;
				background: #fff;
				.bar-item {
					width: 20%;
					text-align: center;
					span {
						display: inline-block;
						width: 85%;
						padding: 5px 0 5px;
						background: #ccc;
						border-radius: 20px;
						color: #000;
						transition: .3s all;
					}
					.span-action {
						background: #2f9bfe;
						color: #fff;
					}
				}
			}
		}
		.list-card {
			width: 100%;
			font-size: 14px;
			.list-item {
				width: 100%;
				margin-top: 10px;
				background: #fff;
				padding: 10px;
				.item-title {
					font-size: 16px;
				}
				.item-link {
					display: flex;
					justify-content: space-between;
				}
				.item-btns {
					display: -webkit-box;
					display: -ms-flexbox;
					display: flex;
					-webkit-box-pack: justify;
					-ms-flex-pack: justify;
					justify-content: space-between;
					border-top: 1px solid #cccccc73;
					a{
						margin-left: 6px;
						padding: 3px 0;
						width: 25%;
						border: 1px solid #dddddd;
						border-radius: 5px;
						background: #f5f5f5;
						text-align: center;
						font-size: 14px;
						color: #000;
					}
				}
				.item5{
					justify-content: flex-end;
				}
				.item-btns2{
					span{
						display: block;
						padding: 6px 0 0;
					}
				}
			}
		}
	}
</style>
