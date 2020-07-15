<template>
	<div class="law_info w-100">
		<div class="law_info_group w-100">
			<div class="law_title w-100">
				<p class="fm-1 fc-dark w-100 text-center">{{law_data.title}}</p>
				<p class="fs-3 fc-gray w-100 text-center">{{law_data.time}}</p>
			</div>
			<div class="law_info1">
				<span class="w-100" v-html="law_data.detail"></span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			header_title: "法律详情",
			law_data: {
				detail: ""
			}
		};
	},
	mounted() {},
	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.header_title,
			type: 1
		});
		this.init();
	},
	methods: {
		init() {
			var id = this.getParams().id;
			var token = this.getToken();
			var params = { token, id };
			this.__initAction("Law-getShowLaw", params, (res, s) => {
				if (s == 1) {
					console.log(res)
					var data = res.data[0];
					this.law_data.title = data.title;
					this.law_data.time = data.create_time;
					this.law_data.detail = data.lawNode;
				} else {
					this._msg(res.info);
				}
			});
			this.selfMainLoadClosed();
		}
	}
};
</script>
<style lang="scss">
	.law_info_group {
		overflow: hidden;
	}
	.law_title {
		border-bottom: 1px dashed #dedede;
		line-height: 2;
		padding: 0.5rem;
	}
	.law_info1 {
		padding: 0.5rem;
		line-height: 2;
		background: #fff;
	}
</style>
