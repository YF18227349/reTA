<template>
	<div class="evaluate w-100">
		<header class="evaluate_header bg-blue w-100 fc-white">
			<a href="javascript:history.go(-1)" class="arrow-logo fc-white iconfont icon-previewleft"></a>
			<span class="header_title fc-white">{{pageInfo.header_title}}</span>
			<a href="javascript:;" class="last"></a>
		</header>
		<div class="clear-fixed"></div>
		<div class="evaluate_list w-100">
			<div class="evaluate_info w-100 bg-white">
				<ul class="info_item w-100">
					<li class="item1">
						<p class="evaluate_info_title">{{evaluate_info_list.title}}</p>
					</li>
					<li class="item2">
						<div class="evaluate_info_text">
							<span class="evaluate_info_name">{{evaluate_info_list.name}}</span>
							<img class="evaluate_info_type_logo" :src="evaluate_info_list.type==1 ? logoList.logo1 : logoList.logo2" alt>
						</div>
						<div class="evaluate_info_salary">
							<span class="salary fc-red">¥ {{evaluate_info_list.salary}}</span>
							<!-- <span class="fc-red">/次</span> -->
						</div>
					</li>
					<li class="item3">
						<span class="evaluate_info_detail">{{evaluate_info_list.detail}}</span>
					</li>
				</ul>
			</div>
			<div class="evaluate_group">
				<yd-cell-group>
					<yd-cell-item>
						<span slot="left" class="evaluate_item item_title">评分</span>
					</yd-cell-item>
					<yd-cell-item class="evaluate_item">
						<span slot="left">描述相符</span>
						<yd-rate slot="right" v-model="rate1" color="#ff9c00" active-color="#ff9c00"></yd-rate>
					</yd-cell-item>
					<yd-cell-item class="evaluate_item">
						<span slot="left">服务态度</span>
						<yd-rate slot="right" v-model="rate2" color="#ff9c00" active-color="#ff9c00"></yd-rate>
					</yd-cell-item>
					<yd-cell-item class="evaluate_item">
						<span slot="left">描述相符</span>
						<yd-rate slot="right" v-model="rate3" color="#ff9c00" active-color="#ff9c00"></yd-rate>
					</yd-cell-item>
				</yd-cell-group>
			</div>

			<div class="evaluate_text">
				<yd-cell-group>
					<yd-cell-item>
						<yd-textarea slot="right" placeholder="请输入您的评价" maxlength="100" v-model="text"></yd-textarea>
					</yd-cell-item>
				</yd-cell-group>
			</div>

			<a href="javascript:;" class="evaluate_btn btn-c bg-green fc-white fm-1 fw-5 mt-6" @click="submit">提交评价</a>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			rate1: 0,
			rate2: 0,
			rate3: 0,
			text: "",
			pageInfo: {
				header_title: "评价"
			},
			evaluate_info_list: {
				title: "办公设备维修",
				name: "李师傅专业维修",
				type: 2,
				salary: 50,
				detail: "负责批改教育机构假期学生考试作业以及教材资，工作内容,评阅小学1-6年级数学语文...",
			},
			logoList: {
				logo1: "./static/imgs/main/mark_card_1.png",
				logo2: "./static/imgs/main/mark_card_2.png"
			}
		};
	},

	created() {
		this.selfMainLoadOpend();
		this.init();
	},

	methods: {
		init() {
			this.getPageInfo();

		},

		getPageInfo() {
			var token = this.getToken();
			var id = parseInt(this.getParams().typeId);
			var url = "Tloong-orderInfo";
			var params = {
				token,
				ordersId: id
			}
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					var data = res.data;
					var obj = {};
					obj.title = data.title;
					obj.name = data.title;
					obj.detail = data.infos;
					obj.type = data.rid;
					if(data.serviceDatd){
						//兼职
						obj.salary = data.serviceDatd;
					}else if(data.price){
						//技能
						obj.salary = data.price;
					}else if(data.salary){
						//简历
						obj.salary = data.salary;
					}else if(data.prices){
						//岗位
						obj.salary = data.prices;
					}
					this.evaluate_info_list = obj;
					// console.log(this.evaluate_info_list);
				};
				this.selfMainLoadClosed();
			});
		},

		submit() {
			var token = this.getToken();
			var ordersId = parseInt(this.getParams().typeId);
			var content = this.text;
			var stars_v1, stars_v2, stars_v3;
			stars_v1 = this.rate1;
			stars_v2 = this.rate2;
			stars_v3 = this.rate3;
			if (!content) return this._msg("请输入评价内容");
			if (!stars_v1) return this._msg("描述相符程度不能为空");
			if (!stars_v2) return this._msg("服务态度不能为空");
			if (!stars_v3) return this._msg("描述相符程度不能为空")
			var params = {
				token,
				content,
				ordersId,
				stars_v1,
				stars_v2,
				stars_v3
			};
			var url = "Tloong-orderComment";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					if (res.info == "提交成功") {
						this._msg(res.info);
						setTimeout(() => {
							this.$router.back(-1);
						}, 500)
					}
				}
			})
		}
	}
};
</script>

<style lang="scss">
	.yd-textarea > textarea {
		height: 120px !important;
		color: #333 !important;
		font-size: 16px !important;
		font-weight: 500 !important;
	}
	.yd-cell-left {
		color: #000 !important;
		font-weight: 500 !important;
		font-size: 14px !important;
		-ms-flex-align: center !important;
	}
	.evaluate_item {
		padding: 10px 15px !important;
	}
	.item_title {
		color: #8f8f94 !important;
	}
	.yd-rate a:after {
		font-size: 18px !important;
	}
</style>
