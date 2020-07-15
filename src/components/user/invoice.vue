<template>
	<!-- @callback="getMore" -->
	<div class="invoices">
		<!-- <header class="header" :style="searchHeaderStyle">
			<input class="w-100 p-3" type="text" placeholder="搜索" v-model="search">
			<span></span>
		</header>

		<nav :style="navHeaderStyle" class="nav-select">
			<ul>
				<li v-for="(tmp,i) of navList" :key="i">
					<span v-text="tmp.name" class="fs-3 fc-gray"></span>
					<span class="city_arrow fc-gray iconfont icon-arrowdown"></span>
				</li>
			</ul>
		</nav> -->

		<!-- <div class="create-fixed"></div> -->

		<div class="news-box">
			<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
				<ul class="new-list" slot="list">
					<li class="new-list-items p-5 mt-3" v-for="(item,i) of invoiceList" :key="i">
						<router-link class="item-link" :to="`/user_invoice_detail/${item.id}`">
							<p class="item-top fc-gray fs-3 fw-6">
								<span>
									<span>单位名称：</span>
									<span v-text="item.title"></span>
								</span>
								<span v-text="item.time"></span>
							</p>
							<h3 class=" mt-3 fc-dark fw-6 fs-3">
								<span class="fc-gray fs-2">开户行：</span>
								<span v-text="item.bank"></span>
							</h3>
							<!-- item-content -->
							<h3 class=" mt-3 fc-dark fw-6 fs-3">
								<span class="fc-gray fs-2">银行账户：</span>
								<span v-text="item.bankNum"></span>
							</h3>
							<h6 class="item-bottom mt-3 fc-gray fs-2">
								<div class="bottom-left">
									<span>发票金额：</span>
									<span>￥{{item.money}}</span>
								</div>
								<div class="bottom-right">
									<span>类型：</span>
									<span>{{item.type==1?'企业':'个人'}}</span>
								</div>
							</h6>
						</router-link>
					</li>
				</ul>
			</yd-infinitescroll>
		</div>
		<self-no-data v-if="invoiceList.length == 0" :title='`暂无数据...`'></self-no-data>
		<!-- <div class="margin-foorer"></div> -->
		<!-- <div class="zhezhao" v-if="load_show"></div>
		<self-load-plate v-if="load_show" class="self_load_plate fc-blue"></self-load-plate> -->
	</div>
</template>
<script>
const NoData = ()=>import("../sub/noDataModel");
export default {
	data() {
		return {
			pages: {
				token: '',
				page: 0,
				length: 15,
				fields: 'id',
				rules: 'desc'
			},
			count: '',
			header_title: "我的发票",
			invoiceList: [{
				id: '10',
				title: '我是标题',
				time: '2019',
				bank: '中国银行',
				money: '100',
				bankNum: ''
			}],
			search: "",
			token: null,
			pageSize: 0,
			length: 15,
			searchHeaderStyle: {
				top: true
			},
			navHeaderStyle: {
				top: true
			},
			navList: [{
					name: "普通发票",
					data: []
				},
				{
					name: "发票类型",
					data: []
				},
				{
					name: "发票日期",
					data: []
				}
			]
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.header_title,
			type: 0
		});
		this.init();
	},
	mounted() {
		// this.autoHeaderSize();
	},
	methods: {
		init() {
			this.invoiceList = [];
			this.getPageInfo();
		},
		getPageInfo() {
			this.pages.token = this.getToken();
			var params = this.pages;
			var url = 'Invoice-listMemberInvoice';
			var that = this;
			that.__initAction(url, params, (res, s) => {
				if (s == 1) {
					var data = res.data;
					this.count = res.count;
					this.showData(data)
				} else {
					this.selfMainLoadClosed();
				}
				this.selfMainLoadClosed();
			})
		},

		showData(data) {
			data.map((val, i) => {
				var obj = {
					id: val.id,
					title: val.invoiceTotal.invoiceTitle,
					bank: val.invoiceTotal.invoiceBank,
					bankNum: val.invoiceTotal.invoiceAccount,
					type: val.invoiceTotal.invoiceType,
					time: val.create_time,
					money: `${val.invoiceTotalPrice}/元`,
				};
				this.invoiceList.push(obj);
			})
			this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
		},

		autoHeaderSize() {
			var h1 = $(".nav_header").css("height");
			var h2 = $(".invoice .nav-select").css("height");
			this.searchHeaderStyle.top = h1;
		},

		//加载更多
		loadList() {
			this.pages.Max = Math.ceil(this.count / this.pages.length);
			if (this.pages.page + 1 == this.pages.Max) {
				this._msg("已经到底了");
				setTimeout(() => {
					this.selfLoadClosed({
						mes: "已经到底了"
					});
				}, 500);
				this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
				return false;
			} else {
				this.pages.page++;
				// this.params.page++;
				this.getPageInfo();
			}
		},

		realoade(time = 1000) {
			this.pages.page = 0;
			// this.params.page = 0;
			this.__Sleep(e => {
				this.dataList = [];
				this.getPageInfo();
			}, time);
		}
	},
	components: {
		'self-no-data': NoData
	}
};
</script>
<style>
	* { touch-action: pan-y; }
	.yd-list-loading svg{ width: 2.6rem !important; height: 2.6rem !important; }
</style>

<style lang='scss' scoped>
	div.invoices {
		.header {
			width: 100%;
			height: 45px;
			padding: 0.5rem;
			background-color: #fff;
			position: fixed;
			input {
				outline-style: none;
				border: 0;
				background-color: #ddd;
				border-radius: 0.5rem;
			}
		}

		nav {
			width: 100%;
			background: #fff;
			padding: 0 0.5rem;
			position: fixed;
			top: 97px;
			ul {
				margin: 0;
				padding: 0.5rem 0;
				display: flex;
				justify-content: space-between;
			}
		}

		.create-fixed {
				width: 100%;
				height: 74px;
		}
		.news-box {
			padding: 0.5rem 0.5rem 1rem;
			font-size: 14px;
			.new-list {
				width: 100%;
				.new-list-items {
					background-color: #fff;
					border-radius: 0.1rem;
					.item-link {
						display: block;
						width: 100%;
						.item-top {
							display: flex;
							justify-content: space-between;
						}
						.item-bottom {
							display: flex;
							justify-content: space-between;
							align-items: center;
							.bottom-right {
								color: #f40;
								border: 1px solid #f40;
								padding: 5px;
								transform: rotate(-7deg) ,translate(0px,-20px);
								-o-transform: translate(0px,-20px);
								-moz-transform: translate(0px,-20px);
								-ms-transform: translate(0px,-20px);
								-webkit-transform: translate(0px,-20px);

								transform: rotate(-7deg);
								-ms-transform: rotate(-7deg);
								/* IE 9 */
								-moz-transform: rotate(-7deg);
								/* Firefox */
								-webkit-transform: rotate(-7deg);
								/* Safari 和 Chrome */
								-o-transform: rotate(-7deg);
							}
						}
					}
				}
			}
		}
	}
</style>
