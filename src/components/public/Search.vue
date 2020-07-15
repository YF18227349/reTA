<template>
	<div class="search w-100">
		<header class="header_search w-100">
			<div class="search_group p-r bg-white">
				<input
					type="text"
					placeholder="搜索"
					v-model="search_value"
					@blur="searchHandle"
					@keyup.13="searchHandle"
				/>
				<span class="search_logo iconfont icon-3 p-a" @click="searchHandle"></span>
				<a
					href="javascript:;"
					class="clear iconfont icon-error p-a"
					v-if="isClear"
					@click.prevent="clear_value()"
				></a>
			</div>
			<a href="javascript:history.go(-1);" class="searchBack">
				<span class="fc-white fw-5" v-text="searchBtn"></span>
			</a>
		</header>
		<div class="search_img w-100" v-if="searchHistoryList.length<=0">
			<img src="/static/imgs/main/nofound.png" alt />
		</div>
		<div class="list-box p-5" v-if="searchHistoryList.length>0">
			<p class="info_title" v-text="`历史搜索`"></p>
			<ul class="list">
				<li class="list-item mt-5" v-for="(item,i) of searchHistoryList" :key="i">
					<router-link :to="`/searchlist/${item.content}`" class="list-item-link">
						<span class="list-item-content" v-text="item.content"></span>
					</router-link>
				</li>
			</ul>
		</div>
		<div
			class="search_info w-100"
			v-for="(item,i) in searchRecommend"
			:key="i"
			v-if="searchRecommend.length>0"
		>
			<p class="info_title" v-text="item.name"></p>
			<div class="info_coutent w-100">
				<div class="mt-4" v-for="(cell,i) in item.data" :key="i">
					<router-link :to="`/searchlist/${cell}`">{{cell}}</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			search_value: "",
			isClear: false,
			searchBtn: "取消",
			token: "",
			cityId: 0,
			keyword: "",
			lon: "",
			lat: "",
			searchRecommend: [
				{
					name: "推荐搜索",
					data: []
				},
				{
					name: "热门公司",
					data: []
				}
			],
			searchHistoryList: []
		};
	},
	created() {
		this.init();
	},
	mounted() {},
	methods: {
		init() {
			this.token = this.getToken(); //获取口令
			this.getValue();
			this.beforTabCode();
		},

		getDataInfo() {
			//获取热门搜索
			var url = "Index-homeRepository";
			var params = {
				token: this.token,
				cityId: this.cityId,
				lon: this.lon,
				lat: this.lat
			};
			this.__initAction(url, params, (res, s) => {
				console.log(res)
				if (s == 1) {
					this.searchRecommend[0].data = res.data.keyword;
					this.searchRecommend[1].data = res.data.companyMap;
					this.searchHistoryList = res.data.searchHistory;
				}
			});
		},

		getValue() {
			var info = this.getCache("location", 2);
			if (info) {
				this.cityId = info.cityId;
				this.lon = info.lon;
				this.lat = info.lat;
			}
			this.getDataInfo();
		},

		beforTabCode() {
			//初始化信息库状态
			var info = this.getSelectData();
			if (!info) info = {};
			if (!info.pageInfo) info.pageInfo = {};
			if (!info.pageInfo.information) info.pageInfo.information = {};
			if (!info.pageInfo.information.pageTabCode)
				info.pageInfo.information.pageTabCode = 0;
			info.pageInfo.information.pageTabCode = 0;
			this.setCache("select_data", JSON.stringify(info));
		},

		clear_value() {
			this.search_value = "";
			this.isClear = false;
		},

		searchHandle() {
			let isLogin = this.getCache("user_info",2)
			let val = this.search_value;
			if (!val) return this._msg("请输入搜索内容");
			if (isLogin) {
				this.inputHotVaue(val);
			}
			if (this.searchBtn == "搜索") {
				setTimeout(() => {
					this.$router.push(`/searchlist/${val}`);
				}, 300);
			}
		},

		inputHotVaue(val) {
			//插入热搜词
			var url = "Tools-addSearchHistory";
			var token = this.getToken();
			var search = val;
			console.log(val)
			this.__initAction(
				url,
				{
					token,
					search
				},
				(res, s) => {
					if (s == 1) {
						console.log(res);
					}
				}
			);
		},

		check_value() {
			if (this.search_value.length >= 1) {
				this.isClear = true;
			} else {
				this.isClear = false;
			}
		}
	},

	watch: {
		search_value() {
			this.check_value();
			if (this.search_value.length > 0) {
				this.searchBtn = "搜索";
			} else {
				this.searchBtn = "取消";
			}
		}
	}
};
</script>

<style lang="scss">
	.list-box {
		width: 100%;
		.info_title {
			font-size: 16px;
			margin-bottom: 14px;
			color: #8f8f94;
		}
		.list {
			display: flex;
			align-items: center;
			flex-flow: row wrap;
			.list-item {
				// width: 25%;
				border-radius: 5px;
				text-align: center;
				margin-right: 10px;
				.list-item-link {
					.list-item-content {
						padding: 2px 8px;
						background: #fff;
						font-size: 17px;
						color: #333;
						border-radius: 44px;
					}
				}
			}
		}
	}
</style>
