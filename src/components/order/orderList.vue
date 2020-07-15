<template>
	<div class="order w-100">
		<header class="order-header" ref="headerEle">
			<div class="order_header bg-blue" ref="oneBarEle">
				<a href="javascript:history.go(-1)" class="arrow-logo iconfont icon-previewleft"></a>
				<div class="header_title_group">
					<a
						href="javascript:;"
						class="header_title"
						v-for="(item,i) in pageInfo.header_title"
						:key="i"
						:class="header_code==i?'bg-white fc-dark':'bg-blue fc-white br-white'"
						@click="headerTopAction(i)"
					>{{item.title}}</a>
				</div>
				<a href="javascript:;" class="last" style="color:#fff;">技能</a>
			</div>

			<ul class="bar-list">
				<li class="bar-item" v-for="(tmp,i) in pageInfo.headerBar" :key="i">
					<a href="javascript:;" @click="headerMidAction(i)">
						<span :class="tabCode==i?'span-action':''">{{tmp.title}}</span>
					</a>
				</li>
			</ul>
		</header>
		<div ref="fixedEle" class="clear-fixed"></div>

		<div class="list-card">
			<ul class="list" v-if="header_code == 0">
				<li class="list-item mt-3" v-for="(tmp,i) in partTimeList" :key="i">
					<div @click="isGoTo(tmp.preOrderCount,tmp.id)">
						<h3 class="item-title">{{tmp.title}}</h3>
						<a href="javascript:;" class="item-link mt-3">
							<div class="item-name-card">
								<span class="fc-gray item-name">{{tmp.title}}</span>
								<!-- <span :class="tmp.icon"></span> -->
								<span class="iconfont icon-renzheng fc-green"></span>
							</div>
							<span class="fc-red fw-6 item-money">{{tmp.serviceDatd}}</span>
						</a>
						<div class="mt-3 item-content">{{tmp.infos}}</div>
						<div class="item-btns2 mt-3 fc-blue fw-6">
							<span v-if="tmp.preOrderCount > 0">查看详情</span>
						</div>
					</div>
				</li>
			</ul>
			<ul class="list" v-if="header_code == 1">
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
						<!-- <div class="mt-3 item-content">{{tmp.goodInfo.infos}}</div> -->
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
			header_code: 0, //顶部导航code
			tabCode: 0, //中间导航code
			pageInfo: {
				header_title: [
					{
						title: "我的发布",
						type: 1
					},
					{
						title: "预约订单",
						type: 2
					}
				],
				headerBar: [
					{
						title: "全部",
						status: 0
					},
					{
						title: "待服务",
						status: 1
					},
					{
						title: "待完成",
						status: 2
					},
					{
						title: "待评价",
						status: 3
					},
					{
						title: "已完成",
						status: 4
					}
				],
				token: "",
				ordersType: 1, //默认是0 发布类型: 0兼职；1技能；2岗位；3简历
				page: 0,
				length: 15,
				pid: 0,
				count: 0
			},
			partTimeList: [
				// {
				//   title: "这是一条订单",
				//   name: "汪汪叫",
				//   // icon: "iconfont icon-renzheng fc-green",
				//   money: "100/天",
				//   info: "这是一条订单发布这是一条订单发布",
				//   time: "2019-10-15",
				//   status: 0
				// },
				// {
				//   title: "这是一条订单",
				//   name: "汪汪",
				//   // icon: "iconfont icon-3qiyezhengxin83a638 fc-blue",
				//   money: "100/天",
				//   info: "这是一条订单发布这是一条订单发布",
				//   time: "2019-10-15",
				//   status: 0
				// }
			]
		};
	},
	created() {
		this.tabCode = this.getQuery().id;
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
		this.$refs.oneBarEle.style.height = "7vh";
		var headeHeight = this.$refs.headerEle.offsetHeight;
		this.$refs.fixedEle.style.height = `${headeHeight}px`;
	},
	destroyed() {},
	methods: {
		getPageData() {
			return new Promise((resolve, reject) => {
				this.pageInfo.token = this.getToken();
				resolve(this.pageInfo.token);
			});
		},

		headerTopAction(i) {
			this.header_code = i;
			this.tabCode = 0;
			this.partTimeList = [];
			this.getPageInfo(this.pageInfo.token)
				.then(result => {
					return this.showData(result);
				})
				.then(() => {
					this.selfMainLoadClosed();
				});
		},

		headerMidAction(i) {
			this.tabCode = i;
			this.partTimeList = [];
			this.getPageInfo(this.pageInfo.token)
				.then(result => {
					return this.showData(result);
				})
				.then(() => {
					this.selfMainLoadClosed();
				});
		},

		getPageInfo(token) {
			return new Promise((resolve, reject) => {
				var isRelease = this.pageInfo.header_title[this.header_code].type;
				var ordersType = this.pageInfo.ordersType;
				var ordersStatus = this.pageInfo.headerBar[this.tabCode].status;
				var page = this.pageInfo.page;
				var length = this.pageInfo.length;
				var pid = this.pageInfo.pid;
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
				this.pageInfo.count = result.count;
				var data = result.data;
				if (!data) return this.selfMainLoadClosed();
				// data.map((tmp, i) => {
				// 	var obj = {
				// 		title: tmp.title,
				// 		name: tmp.title,
				// 		icon: "iconfont icon-renzheng fc-green",
				// 		money: tmp.serviceDatd,
				// 		info: tmp.infos,
				// 		time: tmp.create_time,
				// 		status: tmp.status
				// 	};
				// 	this.partTimeList.push(obj);
				// });
				for (let it of data) {
					var arr = it;
					this.partTimeList.push(arr);
				}
				resolve();
			});
		},

		isGoTo(preOrderCount, pid){
			if(preOrderCount){
				this.__Sleep(e => {
					var obj = {
						path: "/orderListNext",
						query: {
							pid: pid
						}
					};
					this.$router.push(obj);
				});
			}
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
			}else{
				this.$router.push(`/evaluate/${orderid}`)
			}
		},

		getBtnStatus(goodId, toUid, index) {
			//获得按钮状态
			let token = this.getToken();
			let sign = 'skills';
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
			var sign = 'skills'; //项目标识符 (比如: 兼职=demands 技能= skills 岗位=quarters 简历=resume)
			var gid = gid; //产品的id
			// if (baseUid == userId) { //判断本地用户id 与 产品发布人id 是否相等
			// 	this.selfAlertBox({
			// 		mes: "您不能和自己发布的订单沟通",
			// 		cancel: false,
			// 		alert: true
			// 	});
			// 	return;
			// }
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
				.item-btns2 {
					span{
						display: block;
						padding: 6px 0 0;
					}
				}
				.item-name-card {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}
			}
		}
	}
</style>
