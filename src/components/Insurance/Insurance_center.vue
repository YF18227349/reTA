<template>
	<div class="insurance_center w-100">
		<header class="insurance_center_header bg-gray w-100 fc-dark">
			<a href="javascript:;" class="arrow-logo fc-dark iconfont icon-previewleft" @click="goBack()"></a>
			<span class="header_title fc-dark">{{header_title}}</span>
			<a href="javascript:;" class="last"></a>
		</header>

		<div class="clear-fixed" ref="fixedH"></div>

		<div class="insurance_center_group w-100">
			<ul class="insurance_center_tabs w-100 bg-white">
				<li v-for="(item,i) in tabList" :key="i" class="tab_item">
					<a href="javascript:;" class="item" @click="saveTable(i)" :class="tabCode==i?'selectTab':'unSelectTab'">
						<span class="item_code">{{item.title}}</span>
					</a>
				</li>
			</ul>

			<div class="clear-fixed" ref="fixedT"></div>
			<div class="insurance_center_banner w-100 bg-white">
				<!-- <img :src="tabCode==0 ? logo1:logo2" alt class="w-100"> -->
				<yd-slider autoplay="3000" v-if="isSlider">
					<yd-slider-item v-for="(item,i) of bannarList" :key="i">
						<router-link to="">
							<img :src="item.image">
						</router-link>
					</yd-slider-item>
				</yd-slider>
			</div>
			<div class="clear-fixed" style="height:120px" ref="fixedI"></div>

			<div class="insurance_center_tabbar bg-white w-100" v-if="tabCode==0">
				<a href="javascript:;" class="tabbar_item" @click="openModal(i)" v-for="(item,i) in tableMap" :key="i">
					<span class="item_title">{{item.title}}</span>
					<span class="iconfont icon-arrowdown item_arrow"></span>
				</a>
			</div>

			<div class="clear-fixed" v-if="tabCode==0" ref="fixedB"></div>
			<div class="clear-fiex-super" v-if="tabCode==0" :style="clearFixedSuper"></div>

			<div class="insurance_center_container w-100" v-if="tabCode==0">
				<!-- 隐藏数据 -->
				<div class="" v-if="false">
					<router-link to="/insurance_main" class="info_item mt-3 w-100" v-for="(item,i) in commercial_insurance_list" :key="i">
						<ul class="info_list w-100 bg-white pt-3 pb-3">
							<li>
								<div>
									<span class="item_title">{{item.title}}</span>
								</div>
							</li>
							<li>
								<div class="item_info">
									<span>年龄:</span>
									<span>{{item.title}}</span>
									<span>|</span>
									<span>保险期间:</span>
									<span>{{item.duration}}</span>
								</div>
							</li>
							<li>
								<div>
									<span class="item_detail" v-for="(tmp,j) in item.detail" :key="j">{{tmp}}</span>
								</div>
							</li>
							<li>
								<div>
									<!-- <span slot="left" class="fc-red">¥</span> -->
									<span class="item_price fc-red">{{item.price}}</span>
									<span class="f-right">
										<img :src="item.logo" class="item_logo">
									</span>
								</div>
							</li>
						</ul>
					</router-link>
				</div>
				<!-- 暂无数据 -->
				<div v-if="true">
					<self-no-data title="暂无数据..." size="16"></self-no-data>
				</div>
			</div>
			<!-- <div class="social_insurance mt-3 mb-3 w-100" v-if="pageInfo.tabCode==1">
					<ul class="info_list w-100 bg-white">
						<li>
							<yd-cell-item>
								<span slot="left" class="item_title">五险一金</span>
							</yd-cell-item>
						</li>
						<li>
							<span class="fc-gray fs-3 fw-5">保障老年人的基本生活兼职，为其提供稳定可靠的生活来源。</span>
						</li>
						<li class="list_btns">
							<router-link to="/social_substitute" class="list_btn bg-blue">
								<span class="fc-white fw-5 fs-3">提交咨询</span>
							</router-link>
							<a href="javascript:;" class="list_btn bg-blue">
								<span class="fc-white fw-5 fs-3">提交办理</span>
							</a>
						</li>
					</ul>
				</div>-->
			<div class="safe-social" v-if="tabCode==1">
				<router-link :to="`/InsuramceSearch`" class="d-block w-100">
					社保查询
					<span class="userInfo_arrow iconfont icon-previewright"></span>
				</router-link>
			</div>
			<div class="safe-tool mt-4" v-if="tabCode==1">
				<h3>社保工具箱</h3>
				<div class="safe-tool1">
					<div class="safe-tool-l">
						<router-link to="/Calculator/">
							<img src="static/imgs/yf/calculator.png" alt> &#12288;社保计算器
						</router-link>
					</div>
					<div class="safe-tool-r">
						<router-link to="/PolicyInterpretation/">
							<img src="static/imgs/yf/policyInterpretation.png" alt> &#12288;社保政策解读
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<div class="modal_frame_group w-100">
			<div class="modal_plate w-100" v-if="open_modal" @click="open_modal= !open_modal"></div>

			<div class="modal_list w-100" :class="open_modal?'modal_up':'modal_down'">
				<ul class="modal_text bg-white">
					<li class="modal_item" v-for="(tmp,i) in modalTextList" :key="i" >
						<a href="javascript:;" class="modal_label">
							<span class="fc-blue fm-1">{{tmp.label}}</span>
						</a>
					</li>
				</ul>
				<!-- <a href="javascript:;" class="cancel_btn w-100 bg-white mt-4" @click="open_modal= !open_modal">
					<span class="fm-1 fc-blue fw-8">取消</span>
				</a> -->
			</div>
		</div>
	</div>
</template>
<script>
const NoData = ()=>import("../sub/noDataModel");
export default {
	data() {
		return {
			header_title: "保险中心",
			isSlider: true,
			userId: 0,
			tabList: [{
				title: "商业险",
				bannerId: 3
			}, {
				title: "五险一金",
				bannerId: 11
			}],
			logo1: null,
			logo2: null,
			open_modal: false,
			clearFixedSuper: {
				height: true
			},
			bannarList: [],
			tableMap: [{
					title: "智能排序",
					list: [{
						label: "推荐"
					}, {
						label: "最新"
					}]
				},
				{
					title: "保障项目",
					list: [{
							label: "财产保险"
						},
						{
							label: "人身保险"
						},
						{
							label: "责任保险"
						},
						{
							label: "信用保险"
						}
					]
				},
				{
					title: "品牌",
					list: [{
							label: "中国人寿 "
						},
						{
							label: "太平洋保险 "
						},
						{
							label: "新华人寿 "
						}
					]
				}
			],
			tabCode: 0,
			commercial_insurance_list: [],
			modalTextList: []
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.tabCode = this.getCache("insurance_center_code") ?
			this.getCache("insurance_center_code") :
			this.getParams().type;
		this.init();
		this.getBannerImage();
	},
	mounted() {
		try {
			var heightH = this.$refs.fixedH.offsetHeight;
			var heightT = this.$refs.fixedT.offsetHeight;
			var heightI = this.$refs.fixedI.offsetHeight;
			var heightB = this.$refs.fixedB.offsetHeight;
		} catch (e) {
			console.log(`元素未创建：${e}`);
		} finally {
			var heightH = 0;
			var heightT = 0;
			var heightI = 0;
			var heightB = 0;
		}
		this.clearFixedSuper.height = `${heightH + heightT + heightI + heightB}px`;
	},
	methods: {
		init() {
			this.logo1 =
				"./static/imgs/baoxian/insurance_center_logo1.png";
			this.logo2 =
				"./static/imgs/baoxian/insurance_center_logo2.png";
			this.commercial_insurance_list = [{
					title: "人生意外伤害保险",
					age: "1周岁 - 69周岁",
					duration: "1 - 30天",
					detail: ["性价比高", "保障全面"],
					price: 30.0,
					logo: "static/imgs/user_center/cpic.png"
				},
				{
					title: "人生意外伤害保险",
					age: "1周岁 - 69周岁",
					duration: "1 - 30天",
					detail: ["性价比高", "保障全面"],
					price: 30.0,
					logo: "./static/imgs/user_center/cpic.png"
				},
				{
					title: "人生意外伤害保险",
					age: "1周岁 - 69周岁",
					duration: "1 - 30天",
					detail: ["性价比高", "保障全面"],
					price: 30.0,
					logo: "./static/imgs/user_center/cpic.png"
				}
			];
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},

		getBannerImage(x) {
			if (!x) {
				x = this.tabCode;
			};
			var token = this.getToken();
			var url = "Banner-getData";
			var type = this.tabList[x].bannerId;
			this.__initAction(url, {
				token,
				type
			}, (res, s) => {
				if (s == 1) {
					this.bannarList = res.data
				}
			})
		},

		openModal(i) {
			this.open_modal = !this.open_modal;
			this.modalTextList = this.tableMap[i].list;
		},

		saveTable(i) {
			this.getBannerImage(i)
			this.setCache("insurance_center_code", i);
			this.isSlider = false;
			setTimeout(() => {
				this.isSlider = true;
			}, 500)
			this.tabCode = i;
		},

		goBack() {
			this.delCache("insurance_center_code");
			history.go(-1);
		}

	},

	components: {
		"self-no-data": NoData
	}
};
</script>
<style lang="scss" scoped>
	.modal_text {
		list-style: none;
		border-radius: 5px;
		.modal_item:not(:last-child) {
			border-bottom: 1px solid #e7e7e7;
		}
		.modal_item {
			width: 100%;
			.modal_label {
				text-decoration: none;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 15px 0;
			}
		}
	}
	.insurance_center_group {
		.clear-fiex-super {
			width: 100%;
			background-color: #f5f5f5;
			z-index: 1;
			position: fixed;
			top: 0;
		}
	}
	.d-block {
		display: flex;
		justify-content: space-between;
	}
</style>
