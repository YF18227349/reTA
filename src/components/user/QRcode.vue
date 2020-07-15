<template>
	<div class="qr-code">
		<div class="img-box" :style="boxStyle">
			<img :src="pageInfo.url" alt class="qr-img">
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: "立即分享",
				url: ""
			},
			boxStyle: {
				height: true
			},
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 0
		});
		this.init();
	},
	mounted() {
		this.autoIndexSize();
	},
	methods: {
		init() {
			this.getDataInfo();
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},

		autoIndexSize() {
			var height = document.documentElement.clientHeight;
			// console.log(height);
			this.boxStyle.height = height + "px";
		},

		getDataInfo() {
			var url = "Tools-setQrcode";
			var token = this.getToken();
			var link = "https://app.tiananrenli.com/#/phoneLogin";
			var params = {
				token,
				link
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					this.pageInfo.url = res.data.src;
				}
			})
		}

	}
};
</script>

<style lang="scss">
.qr-code {
	.img-box {
		width: 100%;
		background: #ddd;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: fixed;
		top: 0;
		.qr-img {
			width: 18rem;
			height: 18rem;
			margin: 0 auto;
		}
	}
}
</style>
