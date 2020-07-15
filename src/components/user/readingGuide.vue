<template>
	<div class="reading-guide">
		<!-- <div class="create-tiem">
				<span>发布时间：</span>
				<span v-text="dataDetail.create_time"></span>
			</div> -->
		<div class="content pl-4 pr-4" v-html="dataDetail.set_value">
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			header_title: "",
			xid: 0,
			token: "",
			dataDetail: {}
		};
	},
	created() {
		this.$store.commit("setHeaderStyle", {
			txt: "",
			type: 0
		});
		this.init();
	},
	mounted() {
		this.selfMainLoadOpend();
	},
	updated() {
		this.setImg();
	},
	methods: {
		init() {
			// this.__Sleep(e => {
			//   this.selfMainLoadClosed();
			// }, 1000);
			this.getPageInfo();
		},
		getPageInfo() {
			// this.token = this.getToken();
			this.xid = this.getParams().xid;
			if (this.xid == 15) { //xid = 15 -->信用分
				var types = 1;
			} else {
				var types = 0;
			}

			var url = "Tools-getSetInfoList";
			var params = {
				// token: this.token,
				id: this.xid
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					this.dataDetail = res.data;
					this.header_title = res.data.set_remark;
					if (!res.data.create_time) {
						this.dataDetail.create_time = this.getDate();
					}
					this.$store.commit("setHeaderStyle", {
						txt: this.header_title,
						type: types
					});
				};
				this.selfMainLoadClosed();
			});
		},
		setImg() {
			if (this.xid == 14) {
				$(".reading-guide img").css("width", "100%");
			}else{
				$(".reading-guide").css("background", "#fff");
			}
		},
	}
};
</script>

<style lang="scss" scoped>
	.content {
		width: 100%; padding: 1rem 0.75rem;
		/deep/ p { font-size: 1rem;
			/deep/ span { font-size: 1rem !important; word-wrap: normal; }
		}
	}
	.create-tiem {
		width: 100%;
		padding: 0.5rem;
		text-align: center;
		font-size: 1px;
		color: #ccc;
	}
</style>
