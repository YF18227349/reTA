<template>
	<div class="legal_policy w-100">
		<header class="legal_policy_header bg-gray shadow-dark w-100">
			<a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
			<span class="header_title fc-dark fw-7">{{header_title}}</span>
			<a href="javascript:;" class="last">
				<span class="fw-5 fc-fark fs-3 iconfont icon-search"></span>
			</a>
		</header>
		<div class="clear-fixed"></div>
		<div class="c1" style="overflow-y: auto;">
			<yd-scrollnav
				height="44px"
				color="#8f8f94"
				current-color="#028ce4"
				:index="tabCode"
				:callback="back_value"
			>
				<yd-scrollnav-panel :label="item.title" v-for="(item, key) in tabList" :key="key"></yd-scrollnav-panel>
			</yd-scrollnav>
		</div>
		<div class="clear-fixed"></div>
		<div class="legal_policy_group w-100">
			<ul class="legal_policy_list w-100">
				<p class="p-5 fm-2 fc-dray fw-6 text-center" v-if="emptyIsShow">暂无数据...</p>

				<li v-for="(item,i) in data_list" :key="i">
					<router-link :to="/law_info/+item.id" class="cell_arrow_item">
						<div class="cell_txt">
							<span class="f-left iconfont icon-arrowdown-copy fm-1 fw-6"></span>
							<span class="f-left fs-3 fw-6 fc-dark frr">&nbsp;{{item.title}}</span>
						</div>
						<span class="cell_arrow fm-1 fc-gray fw-6 iconfont icon-previewright"></span>
					</router-link>
				</li>
			</ul>
		</div>
		<router-link to="/legal_aid" class="circel_btn bg-blue">法律援助</router-link>
	</div>
</template>
<script>
export default {
	data() {
		return {
			header_title: "法务政策",
			tabList: [],
			data_list: [],
			tabCode: 0,
			emptyIsShow: false,
			params: this.initParam()
		};
	},
	mounted() {},
	created() {
		this.selfMainLoadOpend();
		var policyTabCode = this.getCache("policyTabCode") ? parseInt(this.getCache("policyTabCode")) : 0;
		this.tabCode = policyTabCode;
		this.init();
	},
	methods: {
		init() {
			var param = {
				token: this.getToken()
			};
			this.__initAction("Law-getTypeLaw", param, (res, s) => {
				if (s == 1) {
					this.tabList = res.data;
					this.setCache("policyTabCode", this.tabCode);
					this.back_value(this.tabCode);
				}
			});
		},
		getList(id) {
			this.emptyIsShow = false;
			this.params.tid = id;
			this.data_list = [];
			this.__initAction("Law-getListLaw", this.params, (res, s) => {
				if (s == 1) {
					this.data_list = res.data;
				} else {
					this.emptyIsShow = true;
					this._msg(res.info);
				}
			});
			this.selfMainLoadClosed();
		},
		back_value(v) {
			var id = this.tabList[v].id;
			this.setCache("policyTabCode", v);
			this.getList(id);
		}
	}
};
</script>
<style lang="scss">
	.c1 {
		width: 100%;
		height: 44px;
		background: #fff;
		position: fixed;
		top: 44px;
	}
	ul.yd-scrollnav-tab-item {
		li {
			font-size: 14px;
			font-weight: 600;
			margin-right: 15px;
			padding: 0 5px;
			span {
				margin-left: 10px;
				height: 40px;
			}
		}
	}
	.yd-scrollnav-current {
		span {
			border-bottom: 2px solid #028ce4;
		}
	}
	.yd-scrollnav-tab-item > li.yd-scrollnav-current > i {
		display: none;
	}
	div.yd-scrollnav-toggle {
		width: 50px;
		display: none;
	}
	.frr{ width: 93%; }
</style>
