<template>
	<div class="user_balance">
		<!-- <header class="user_balance_header">
				<a href="javascript:history.go(-1)" class="arrow-logo iconfont icon-previewleft"></a>
				<span class="header_title">我的余额</span>
				<a href="javascript:;"></a>
			</header>-->
		<!-- <div class="clear-fixed"></div> -->
		<!-- <div class="user_balance_count">
			<div class="user_balance_group">
				<div class="user_balance_assets">
					<span class="assets_title">总资产 &nbsp;(元)</span>
					<span class="assets_total">{{userBalanceList.assets}}</span>
				</div>
				<div class="user_balance_commission">
					<span class="commission_title">佣金 &nbsp;(元)</span>
					<span class="commission_total">{{userBalanceList.commission}}</span>
				</div>
			</div>
			<div class="user_balance_btn">
				<router-link to="/Recharge" class="btn_recharge">
					<span class="iconfont icon-credit-card-plus fm-1 mr-4"></span>
					<span class="fm-1 fw-6">充值</span>
				</router-link>
				<router-link to="/cash" class="btn_cash">
					<span class="iconfont fm-1 icon-xinyongdaikuan mr-4"></span>
					<span class="fm-1 fw-6">提现</span>
				</router-link>
			</div>
		</div> -->
		<div class="clear_user_balance_count"></div>
		<ul class="user_balance_list_tabs bg-white">
			<li v-for="(item,i) in tabList" :key="i" class="tab_item">
				<a href="javascript:;" class="item" :class="tabCode==i?'selectTab':'unSelectTab'" @click.prevent="clickTab(i)">{{item.title}}</a>
			</li>
		</ul>
		<div class="clear_tabs"></div>

		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
			<div class="user_balance_list w-100" slot="list">
				<div class="list-container mt-1">
					<ul class="user_balance_detail_list bg-white">
						<li class="detail_items" v-for="(item,j) in userBalanceList.list" :key="j">
							<router-link :to="'/userbilldatail/'+item.id" class="detail_item">
								<div class="item_title">
									<span>{{item.type==0?'收入':item.type==1?'支出':'佣金'}}</span>
									<span>{{item.time}}</span>
								</div>
								<div class="item_detail">
									<span class="item_balance">余额：{{item.balance}}</span>
									<span class="item_count" :class="item.type==0?'fc-blue':item.type==2 ?'fc-dark':'fc-red'">{{item.type==0 ?'+':'-'}}{{item.count}}</span>
								</div>
							</router-link>
						</li>
						<div class="ifImg" v-if="userBalanceList.list.length <=0 ">
							<img :src="Img">
							<!-- <self-no-data title="暂无数据..." bgColor="#f5f5f5"></self-no-data> -->
						</div>
					</ul>
				</div>
			</div>

			<!-- 数据全部加载完毕显示 -->
			<span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span>
		</yd-infinitescroll>
		<self-load-frame></self-load-frame>
	</div>
</template>

<script>
const LoadFrame = ()=>import("../sub/loading_frame");
const NoData = ()=>import("../sub/noDataModel");
export default {
	data() {
		return {
			pageInfo: {
				header_title: "账单"
			},
			load_plate: false,
			tabCode: 0,
			param: {
				page: 0,
				length: 20,
				count: null,
				fields: "id",
				rules: "desc"
			},
			nextPage: 0,
			itemCode: true,
			tabList: [{
					title: "全部",
					code: 0
				},
				{
					title: "收入",
					code: 1
				},
				{
					title: "支出",
					code: 2
				},
				{
					title: "佣金",
					code: 3
				}
			],
			userBalanceList: {
				assets: "",
				commission: 0,
				list: []
			},
			Img:""
		};
	},
	mounted() {
		// var h1 = document.querySelector(".user_balance_count").clientHeight;
		var h2 = document.querySelector(".user_balance_list_tabs").clientHeight;
		// $(".clear_user_balance_count").css("height", `${h1}px`);
		$(".clear_tabs").css("height", `${h2}px`);

		var i = this.getCache("NULL_SALARY_IMG");
		this.Img = this.str2json(i).val;
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
			this.getPageInfo(0);
			this.getDataInfo();
			// 获取菜单数据
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},

		getDataInfo() {
			var url = "Member-getUserCache";
			var params = {
				token: this.getToken(),
				uid: this.getUserInfo().uid
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					this.userBalanceList.assets = res.data.balance;
				}
			})
		},

		getPageInfo(x) {
			this.selfMainLoadOpend();
			// this.param.page = this.Global.page_num;
			// this.param.length = this.Global.length_num;
			/*   获取缓存中的balance
			var useExt = this.getCache("userInfoExt", 2);
			this.userBalanceList.assets = useExt.balance;
			*/
			if (x == 0) {
				var params = {
					token: this.getToken(),
					types: this.tabCode,
					page: this.param.page,
					length: this.param.length,
					fields: this.param.fields,
					rules: this.param.rules
				};
			} else {
				var params = {
					token: this.getToken(),
					types: this.tabCode,
					page: x,
					length: this.param.length,
					fields: this.param.fields,
					rules: this.param.rules
				};
			}
			this.getList(params);
		},

		getList(params) {
			var that = this;
			this.__initAction("balance-listMemberBalance", params, (res, s) => {
				if (s == 1) {
					this.selfMainLoadClosed();
					this.selfLoadClosed();
					var arr = [];
					for (let it of res.data) {
						var obj = {};
						if (it.types == "+") {
							obj.type = 0;
						}
						if (it.types == "-") {
							obj.type = 1;
						}
						obj.id = it.id;
						obj.balance = it.balance;
						obj.count = it.price;
						obj.time = it.create_time;
						this.userBalanceList.list.push(obj);
					}
					this.selfMainLoadClosed();
					this.selfLoadClosed();
					// this.userBalanceList.list.concat(arr);
					this.param.count = res.count;
					this.$refs["infinitescrollDemo"].$emit(
						"ydui.infinitescroll.finishLoad"
					);
					this.selfLoadClosed();
					this._log(this.param.page + "------" + this.param.length);
				} else {
					// this._msg(res.info);
					setTimeout(() => {
						this.selfMainLoadClosed();
						this.selfLoadClosed();
					}, 1500);
				}
			});
		},

		clickTab(x) {
			this.tabCode = x;
			this.param.page = 0;
			this.nextPage = 0;
			this.userBalanceList.list = [];
			var params = {
				token: this.getToken(),
				types: this.tabCode,
				page: this.param.page,
				length: this.param.length,
				fields: this.param.fields,
				rules: this.param.rules
			};
			this.getList(params);
		},

		loadList() {
			var MaxPage = Math.ceil(this.param.count / this.param.legnth);
			var next = this.nextPage + 1;
			var count = this.param.count;
			var MaxPage = Math.ceil(count / this.param.length);
			if (MaxPage == next) {
				this.selfLoadOpend({
					mes: "没有更多数据了",
					status: false
				});
				this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
				// setTimeout(() => {
				// 	this.selfLoadClosed();
				// }, 1500);
				return;
			} else {
				// this.selfLoadOpend({
				//   mes: "",
				//   color: "fc-blue",
				//   font: 30,
				//   status: true
				// });
				this.nextPage = next;
				this.param.page = this.param.page + 1;
				var params = {
					token: this.getToken(),
					types: this.tabCode,
					page: this.param.page,
					length: this.param.length,
					fields: this.param.fields,
					rules: this.param.rules
				};
				this.selfLoadOpend({
					mes: "",
					color: "fc-blue",
					font: 30,
					status: true
				});
				this.getList(params);
			}
		},

		getMore() {
			var that = this;
			this.__initAction(
				"balance-listMemberBalance", {
					token: this.getToken(),
					types: this.tabCode,
					page: this.param.page,
					length: this.param.length,
					fields: this.param.fields,
					rules: this.param.rules
				},
				(res, s) => {
					if (s == 1) {
						for (let it of res.data) {
							var arr = {};
							if (it.types == "+") {
								arr.type = 0;
							}
							if (it.types == "-") {
								arr.type = 1;
							}
							arr.id = it.id;
							arr.balance = it.balance;
							arr.count = it.price;
							arr.time = it.create_time;
							this.userBalanceList.list.push(arr);
						}
						this._log(this.param.page + "------" + this.param.length);
					} else {
						this._msg(res.info);
					}
				}
			);
		}
	},
	// computed: {
	//   detailList: function() {
	//     return this.userBalanceList.list;
	//   },
	// },
	components: {
		"self-load-frame": LoadFrame,
		"self-no-data": NoData
	}
};
</script>

<style lang="scss">
	.selectTab {
		color: #007aff;
		border-bottom: 2px solid #007aff;
	}
	.unSelectTab {
		color: #000;
		border-bottom: 2px solid transparent;
	}
	.yd-list-loading svg{ width: 2.6rem !important; height: 2.6rem !important; }
	.ifImg img{ width: 80%; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); }
</style>
