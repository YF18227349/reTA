<template >
	<!-- 选择岗位列表 -->
	<div class="job-list">

		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">

			<ul class="list-job" slot="list">
				<li class="list-item mt-3 p-5" v-for="(item,i) of jobList">
					<a class="list-item-link" href="javascript:;" @click="selectJob(item.c_id)">
						<div class="title mt-3 fm-1 fc-dark fw-7">
							<h1 class="" v-text="item.c_title"></h1>
							<span class="fc-red" v-text="item.c_salary"></span>
						</div>
						<div class="addr mt-3 fs-3 fw-6 fc-gray">
							<h3 v-text="item.c_addr"></h3>
						</div>
						<div class="labal mt-3 ">
							<span v-text="item.c_exp" class="fs-3 fw-6 fc-gray pt-1 pb-1 pl-3 pr-3 bg-gray"></span>
							<span v-text="item.c_education" class="fs-3 fw-6 fc-gray pt-1 pb-1 pl-3 pr-3 bg-gray"></span>
						</div>
						<div class="mt-3">
							<span v-text="item.c_content"></span>
						</div>
						<div class="mt-3 mb-3 fs-3 fc-gray fw-5 time">
							<span v-text="item.c_time"></span>
						</div>
					</a>
				</li>
			</ul>

		</yd-infinitescroll>

	</div>
</template>
<script >
export default {
	data() {
		return {
			pageInfo: {
				title: '选择邀约职位'
			},
			jobList: [
				// {
				// c_id: "",
				// c_title: "",
				// c_name: "",
				// c_time: "",
				// c_content: "",
				// c_exp: "",
				// c_education: "",
				// c_addr: "",
				// c_salary: ""
				// }
			],
			upLoad: { //加载数据
				count: null,
				length: 5,
			},
			token: null,
			page: 0,
			fields: "id",
			rules: "desc",
			query: null,
		}
	},

	created() {
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.title,
			type: 1
		});
		this.selfMainLoadOpend();
		this.init();
	},

	destroyed() {
		//do something after destroying vue instance
		this.delCache("queryPost");
	},

	methods: {
		init() {
			this.getPageInfo(this.page);
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},

		getPageInfo(next) {
			var query = this.getQuery();
			var info = this.getCache("queryPost", 2);
			if (!info) {
				this.setCache("queryPost", JSON.stringify(query));
				this.query = query;
			} else {
				this.query = info;
			}
			this.token = this.getToken()
			var page = next;
			var token = this.token;
			var length = this.upLoad.length;
			var fields = this.fields;
			var rules = this.rules;
			var params = {
				token,
				page,
				length,
				fields,
				rules
			};
			var url = "Quarters-listMemberQuarters";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					var data = res.data;
					this.upLoad.count = res.count
					var arr = this.jobList;
					for (let it of data) {
						var obj = {};
						obj.c_title = it.title;
						obj.c_name = it.title;
						obj.c_time = it.create_time;
						obj.c_content = it.infos;
						obj.c_exp = it.exp;
						obj.c_education = it.education;
						obj.c_addr = it.addressInfo;
						obj.c_salary = it.prices;
						obj.c_id = it.id;
						arr.push(obj);
					};
					this.$refs["infinitescrollDemo"].$emit(
						"ydui.infinitescroll.finishLoad"
					);
				};
			});
		},

		loadList() { //加载
			var count = this.upLoad.count;
			var MaxPage = Math.ceil(count / this.upLoad.length);
			var next = this.page += 1;
			if (MaxPage <= next) {
				this._msg("已经加载到底了-_-||", 800);
			} else {
				this.getPageInfo(next);
			}
		},

		selectJob(quartersId) { //选择
			var that = this
			// var url = "Newscastmeet-sendQuarters";
			var url = 'Tloong-getSwopUpd';
			var params = this.query;
			params.quartersId = quartersId;
			that.$dialog.confirm({
				title: '邀请',
				mes: '确定邀约',
				opts: () => {
					that.__initAction(url, params, (res, s) => {
						if (s == 1) {
							console.log(res);
							if (res.info = "发送成功") {
								this._msg("发送成功，请耐心等待!");
								this.$router.back(-1);
							}
						} else {
							if (res.info == "提交失败，您还没有认证") {
								this._msg("提交失败，您还没有认证");
								this.$router.back(-1);
							} else if (res.info == "你已经预约过了") {
								this._msg("你已经预约过了");
								this.$router.back(-1);
							}
						}
					})
				}
			});
		}
	}

}
</script>
<style lang="scss" scoped>
	.list-job { padding: 10px; }
	.list-item { background: #fff; border-radius: 0.5rem; }
	.list-item-link { display: block; }
	.list-item-link .labal, .list-item-link .title { display: flex; justify-content: space-between; }
	.list-item-link .time { text-align: right; }
</style>
