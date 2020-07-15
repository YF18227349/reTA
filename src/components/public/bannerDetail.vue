<template>
	<div class="banner-detail">
		<div class="create-tiem">
			<span>发布时间：</span>
			<span v-text="dataDetail.create_time?dataDetail.create_time : getDates"></span>
		</div>
		<div class="content" v-html="dataDetail.content"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			header_title: "详情",
			bid: 0,
			token: "",
			getDates: '',
			dataDetail: {}
		};
	},
	created() {
		this.$store.commit("setHeaderStyle", {
			txt: "",
			type: 1
		});
		this.init();
	},
	mounted() {
		this.selfMainLoadOpend();
	},
	methods: {
		init() {
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
			this.token = this.getToken();
			this.bid = this.getParams().bid;
			this.getPageInfo();
		},
		getPageInfo() {
			var url = "Banner-getImgShow";
			var params = {
				token: this.token,
				id: this.bid
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					this.dataDetail = res.data[0];
					this.header_title = res.data[0].title;
					this.$store.commit("setHeaderStyle", {
						txt: this.header_title,
						type: 1
					});
					if (!res.data[0].create_time) {
						var data = this._getDate();
						var years = data.years;
						var month = data.month;
						var date = data.date;
						this.getDates = `${years}-${month}-${date}`;
					}
				}
			});
		},
	}
};
</script>

<style lang="scss">
	div.banner-detail {
		padding: 0 15px;
		box-sizing: border-box;
		overflow: hidden;
		img {
			width: 100%;
			height: auto;
		}
		.create-tiem {
			width: 100%;
			padding: 1rem;
			text-align: center;
			font-size: 0.9rem;
			color: #ccc;
		}
		.content{ font-size: 1rem; }
	}
</style>
