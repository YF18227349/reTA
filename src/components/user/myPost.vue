<template>
	<div class="myPost">
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
			<ul class="list" slot="list">
				<li v-for="(tmp,i) in postList" :key="i" class="item mt-3">
					<div @click="isToGo(tmp.preOrderCount,tmp.id)">
						<self-post-card :data="tmp" class="bg-white"></self-post-card>
					</div>
					<!-- 我的岗位下有没有投递简历 -->
					<div v-if="tmp.preOrderCount > 0" class="item_btns ml-2 fs-3 fw-5 fc-blue">查看详情</div>
				</li>
			</ul>
		</yd-infinitescroll>

		<self-load-frame></self-load-frame>
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
					txt: "我的岗位",
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
				var arr = this.postList;
				newData.map((val, i) => {
					// console.log(val);
					var obj = {
						title: val.title,
						name: val.lastName,
						logo: val.portrait,
						addr: val.addressInfo,
						hot: val.view,
						lng: val.lon,
						lat: val.lat,
						position: "人事经理",
						distance: val.distance,
						time: val.create_time,
						detail: val.infos,
						id: val.id,
						salary: val.prices,
						education: val.education,
						experience: val.exp,
						preOrderCount: val.preOrderCount
					};
					// console.log(obj);
					arr.push(obj);
				});
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
				// this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad"); //单次请求数据完毕
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

		isToGo(preOrderCount,pid){
			if(preOrderCount){
				this.__Sleep(e => {
					var obj = {
						path: "/myPostNext",
						query: {
							pid: pid
						}
					};
					this.$router.push(obj);
				});
			}
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
</style>