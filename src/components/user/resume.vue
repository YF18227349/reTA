<template>
	<div class="user_resume w-100">
		<div class="user_resume_group w-100">
			<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
				<div class="resume_items w-100" slot="list">
					<a
						href="javascript:;"
						v-for="(tmp,i) in resumeDataList"
						:key="i"
						class="resume_item mb-4 w-100 bg-white"
						v-if="isCode"
						@click="isToGo(tmp.preOrderCount,tmp.id)"
					>
						<ul class="items">
							<li class="item_title">
								<img :src="tmp.portrait" alt class="shadow-dark" />
								<div class="item_info">
									<p class="item_text">
										<span class="item_name fc-dark fm-1">{{tmp.consignee}}</span>
									</p>
									<p class="item_post">
										<span class="post fc-gray fs-3">{{tmp.resumeIndustry}}</span>
									</p>
								</div>
								<span class="item_salary">{{tmp.salary}}</span>
							</li>
							<li class="item_detail mt-3">{{tmp.infos}}</li>
							<li>
								<div class="item_btns">
									<a
										href="javascript:;"
										class="item_btn bg-gray mr-4 br-gray"
										@click="do_alert(tmp.id)"
									>
										<span class="fc-gray fs-3 fw-6">删除</span>
									</a>
									<!-- <a
										href="javascript:;"
										class="item_btn bg-gray br-gray"
										@click="reRelease(tmp.id)"
									>
										<span class="fc-gray fs-3 fw-6">编辑</span>
									</a>-->
									<!-- <a href="javascript:;" @click="clickLoadMore(tmp.id)" class="item_btn bg-gray br-gray">
										<span class="fc-gray fs-3 fw-6">更多</span>
									</a> -->
								</div>
							</li>
						</ul>
					</a>
				</div>
				<!-- 数据全部加载完毕显示 -->
				<span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span>
			</yd-infinitescroll>
			<!-- 暂无数据 -->
			<div v-if="resumeDataList.length<=0">
				<self-no-data title="暂无数据..."></self-no-data>
			</div>
			<self-load-frame></self-load-frame>
		</div>
	</div>
</template>
<script>
const LoadFrame = ()=>import("../sub/loading_frame");
const NoData = ()=>import("../sub/noDataModel");
export default {
	data() {
		return {
			requestParams: {
				token: this.getToken(),
				isRelease: 1,
				ordersType: 3,
				ordersStatus: 0,
				page: 0,
				pid: 0
			},
			queryParams: {},
			header_title: "我的简历",
			resumeDataList: [], //地址列表
			param: this.initPage(),
			params: this.initParam(),
			show: false, //地址弹框开关
			isCode: true,
			lid: null
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
		//do something after mounting vue instance
		var data = this.getCache("RESUME_DATA", 2);
		data = null;
		this.setCache("RESUME_DATA", data);
	},

	methods: {
		init() {
			this.getPageInfo();
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},

		getPageInfo() {
			this.$dialog.loading.close();
			var param = this.requestParams;
			this.__initAction("Tloong-orderList", param, (res, s) => {
				if (s == 1) {
					for (let it of res.data) {
						var arr = it;
						this.resumeDataList.push(arr);
					}
					this.lid = res.data[0].id;
					this.param.count = res.count;
					this.params.count = res.count;
				}
				this.selfLoadClosed();
			});
		},

		loadList() {
			//加载更多
			this.param.Max = Math.ceil(this.param.count / this.param.length);
			if (this.param.page == this.param.Max) {
				this._msg("已经到底了", 300);
				// setTimeout(() => {
				// 	this.selfLoadClosed({
				// 		mes: ""
				// 	});
				// }, 500);
				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone'); //所有数据加载完毕
				return;
			} else {
				this.param.page++;
				this.params.page++;
				this.getPageInfo();
				this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
			}
		},

		realoade(time = 1000) {
			this.params.page = 0;
			this.param.page = 0;
			this.__Sleep(e => {
				this.dataList = [];
				this.getPageInfo();
			}, time);
		},

		do_alert(id) {
			//删除
			var that = this;
			var token = this.getToken();
			var url = "Resume-delMemberResume";
			var params = {
				id,
				token
			};
			that.$dialog.confirm({
				title: "提示！！",
				mes: "是否删除您的简历",
				opts: () => {
					that.__initAction(url, params, (res, s) => {
						//删除简历
						if (s == 1) {
							//删除后执行
							this.isCode = false;
							this.resumeDataList = [];
							var info = this.getSelectData();
							info.resume = null;
							this.setCache("select_data", JSON.stringify(info));
							that.$dialog.toast({
								mes: "删除成功",
								timeout: 1000
							});
						}
					});
				}
			});
		},

		reRelease(id) {
			var query = {
				id: this.lid,
				token: this.getToken()
			};
			var objPath = {
				path: "/reresume",
				query: query
			};
			this.$router.push(objPath);
		},

		clickLoadMore(id) {
			var newId = id;
			var to = "/MyPostList";
			console.log(id);
			
		},

		isToGo(preOrderCount,pid){
			if(preOrderCount){
				this.__Sleep(e => {
					var obj = {
						path: "/UserResumeNext",
						query: {
							pid: pid
						}
					};
					this.$router.push(obj);
				});
			}
		},
	},
	components: {
		"self-load-frame": LoadFrame,
		"self-no-data": NoData
	}
};
</script>
<style lang="scss">
	* { touch-action: pan-y; }
	.yd-list-loading svg{ width: 2.6rem !important; height: 2.6rem !important; }
	.yd-list-donetip{ display: none; }
</style>
