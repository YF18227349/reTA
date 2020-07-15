<template>
	<div class="user_resume w-100">
		<div class="user_resume_group w-100">
			<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
				<div class="resume_items w-100" slot="list">
					<a
						href="javascript:;"
						v-for="(tmp,i) in postList"
						:key="i"
						class="resume_item mb-4 w-100 bg-white"
						@click.prevent="do_chat(tmp.goodInfo.id,tmp.buttonStatus.communicateStatus)"
					>
						<ul class="items">
							<li class="item_title">
								<img :src="tmp.goodInfo.portrait" alt class="shadow-dark" />
								<div class="item_info">
									<p class="item_text">
										<span class="item_name fc-dark fm-1">{{tmp.goodInfo.consignee}}</span>
									</p>
									<p class="item_post">
										<span class="post fc-gray fs-3">{{tmp.goodInfo.resumeIndustry}}</span>
									</p>
								</div>
								<span class="item_salary">{{tmp.goodInfo.salary}}</span>
							</li>
							<li class="item_detail mt-3">{{tmp.goodInfo.infos}}</li>
							<li class="item4 item5" v-if="tmp.buttonStatus.status == 'form' && tmp.buttonStatus.communicateStatus == 4">
								<a href="javascript:;" @click.stop="updatedStatus(tmp.userId,tmp.goodId,2,tmp.buttonStatus.orderId,i,tmp.buttonStatus.status)">
									<span class="fm-1">同意</span>
								</a>
								<a href="javascript:;" @click.stop="updatedStatus(tmp.userId,tmp.goodId,3,tmp.buttonStatus.orderId,i,tmp.buttonStatus.status)">
									<span class="fm-1">拒绝</span>
								</a>
							</li>
							<li class="item4 item5" v-if="tmp.buttonStatus.communicateStatus == 2">
								<a href="javascript:;" @click.stop="updatedStatus(tmp.userId,tmp.goodId,1,tmp.buttonStatus.orderId,i,tmp.buttonStatus.status)">
									<span v-text="`完成面试`"></span>
								</a>
							</li>
							<li class="item4 item5" v-if="tmp.buttonStatus.communicateStatus == 8">
								<a href="javascript:;" @click.stop="updatedStatus(tmp.userId,tmp.goodId,4,tmp.buttonStatus.orderId,i,tmp.buttonStatus.status)">
									<span v-text="`评价面试`"></span>
								</a>
							</li>
							<!-- <li class="item7 pt-2">
								<span class="fc-gray fs-2 fw-6">提示：{{tmp.buttonStatus.msg}}</span>
							</li> -->
							<li class="item_btns2 fc-blue fw-6" v-if="tmp.buttonStatus.communicateStatus != 15">查看详情</li>
						</ul>
					</a>
				</div>
			</yd-infinitescroll>

			<self-load-frame></self-load-frame>
		</div>
	</div>
</template>
<script>
const LoadFrame = ()=>import("../sub/loading_frame");
const PostCard = ()=>import("../sub/post_card");

export default {
	data() {
		return {
			requestParams: {
				isRelease: 1,
				ordersType: 2,
				ordersStatus: 0,
				page: 0,
				pid: 0,
				length: 15,
				fields: "id",
				rules: "desc",
				token: this.getToken()
			},
			pageLan: {
				title: "",
				count: "",
				postList: []
			}
		};
	},
	created() {
		this.requestParams.pid = this.getQuery().pid;
		this.getPageData(this.selfMainLoadOpend())
			.then(() => {
				return this.getPageInfo();
			})
			.then(data => {
				return this.showData(data);
			})
			.then(() => {
				this.selfMainLoadClosed();
			});
	},
	mounted() {},
	methods: {
		getPageData() {
			return new Promise((resolve, reject) => {
				this.$store.commit("setHeaderStyle", {
					txt: "我的岗位简历",
					type: 1
				});
				resolve();
			});
		},

		getPageInfo() {
			//获取页面信息
			var that = this;
			return new Promise((resolve, reject) => {
				var url = "Tloong-orderList";
				var params = that.requestParams;
				that.__initAction(url, params, (res, s) => {
					if (s == 1) {
						resolve(res);
					};
					// that._msg(res.info);
					that.selfMainLoadClosed();
				});
			});
		},

		showData(data) {
			//显示数据
			var that = this;
			return new Promise((resolve, reject) => {
				var newData = data.data;
				that.pageLan.count = data.count;
				for (let it of newData) {
					var arr = it;
					this.postList.push(arr);
				}
				resolve();
			});
		},


		//加载更多
		loadList() {
			var MaxPage = Math.ceil(this.loadCount / this.postList.length);
			if (this.requestParams.page + 1 == MaxPage) {
				this._msg("已经到底了", 300);
				// setTimeout(() => {
				// 	this.selfLoadClosed({
				// 		mes: "已经到底了"
				// 	});
				// }, 500);
				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone'); //所有数据加载完毕
				return;
			} else {
				this.requestParams.page++;
				this.getPageInfo().then(data => {
					return this.showData(data);
				}).then(() => {
					this.selfLoadClosed();
				});
			}
		},

		do_chat(id, communicateStatus) { //跳转
			if (communicateStatus != 15) {
				var sign = 'resume'; //项目标识符 (比如: 兼职=demands 技能= skills 岗位=quarters 简历=resume)
				var gid = id; //产品的id
				var query = {
					sign,
					gid,
				};
				this.$router.push({
					path: `/interview_chat/${gid}`,
					query
				})
			}
		},

		updatedStatus(uIds, goodId, i, orderid, index, status) { //立即预约&同意&拒绝
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
							this.getBtnStatus(goodId, uIds, index, status);
						}, 500);
					} else {
						this._msg(res.info, 1000);
						setTimeout(() => {
							this.getBtnStatus(goodId, uIds, index, status);
						}, 500);
					}
				});
			}else if(c_status == 4){
				this.$router.push(`/evaluate/${orderid}`)
			}else{
				var sign;
				if (status == 'to') {
					sign = 'resume';
				}else{
					sign = 'quarters';
				}
				let goodsId = goodId;
				let goodsInfo = `${sign}|${goodsId}`;
				let orderId = orderid;
				var params = {
					token,
					goodsInfo,
					c_status,
					orderId
				};
				var url = "Tloong-getSwopUpd";
				this.__initAction(url, params, (res, s) => {
					if (s == 1) {
						// this._msg("请耐心等待(^_^)");
						setTimeout(() => {
							this.getBtnStatus(goodId, uIds, index, status);
						})
					} else {
						this._msg(res.info, 1000);
						setTimeout(() => {
							this.getBtnStatus(goodId, uIds, index, status);
						}, 500)
					}
				});
			}
		},

		getBtnStatus(goodId, uIds, index, status) { //获得按钮状态
			var token = this.getToken();
			var sign;
			if (status == 'to') {
				sign = 'resume';
			}else{
				sign = 'quarters';
			}
			var goodsId = goodId;
			var toUid = uIds;
			var goodsInfo = `${sign}|${goodsId}`;
			var params = {
				token,
				goodsInfo,
				toUid
			};
			var url = "Tloong-getSwopInfo";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					let data = res.data;
					let status = data.communicateStatus;
					let msg = data.msg;
					if (status.constructor !== Number) status = status.parseInt();
					this.postList[index].buttonStatus.communicateStatus = status;
					this.postList[index].buttonStatus.msg = msg;
				}
			});
		},
	},
	computed: {
		postList() {
			return this.pageLan.postList;
		},

		loadCount() {
			return this.pageLan.count;
		}
	},

	components: {
		"self-load-frame": LoadFrame,
		"self-post-card": PostCard //注册子组件
	}
};
</script>
<style>
	* { touch-action: pan-y; }
	.yd-list-loading svg{ width: 2.6rem !important; height: 2.6rem !important; }
	.yd-list-donetip{ display: none; }
</style>
<style lang="scss" scoped>
	.myPost {
		width: 100vw;
		height: calc(100% - 2.8rem);
		overflow: scroll;
		.list {
			.item {
				padding: 15px;
				background: #fff;
			}
		}
	}
	.item7{
		padding: 6px 0;
	}
	.item_btns2{
		padding: 6px 0 0;
		border-top: 1px solid #e7e7e7;
	}
	.item4{
		width: 100%;
		text-decoration: none;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
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
		padding-bottom: 6px;
	}
</style>