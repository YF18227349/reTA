<template>
	<div class="index_main"></div>
</template>
<script>
export default {
	data() {
		return {
			test: null,
			config: {}
		};
	},
	mounted() {},
	created() {
		this.selfMainLoadOpend();
		this.init();
		this.codeSesstionSave();
		this.getConfigApp();
	},
	methods: {
		init() {
			var config = {};
			config.page = 0;
			config.length = 10;
			config.deBug = true;
			this.__initAction("Tools-getLatLon", {}, (res, s) => {
				console.log(res)
				if (s == 1) {
					config.location = {};
					config.location.cityId = String(res.data.cityId);
					config.location.address = res.data.address;
					config.location.location_city = res.data.content["city"];
					config.location.city = res.data.content["city"];
					config.location.province = res.data.content["province"];
					config.location.lat = res.data.point["y"];
					config.location.lon = res.data.point["x"];
					this.setCache("location", JSON.stringify(config.location));
				}
			});
			this.Global.config = config;
			this.checkLogin();
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},
		getConfigApp() {
			var that = this;
			this.__initAction("Tools-getConfigApp", {}, (res, s) => {
				if (s == 1) {
					var data = res.data;
					for (let i of data.defBase) {
						this.setCache(i.title, JSON.stringify(i));
					}
					this.setCache('dataYF', JSON.stringify(data.data));
					var b = this.getCache("APPLOGO", 2);
					that.appLogoSrc = b.val;
					that.isShow = true;
				}
			});
			// 获取菜单数据
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},
		checkLogin() {
			var user_info = this.getUserInfo();
			// var href = "/login";
			var href = "/main";
			if (user_info) {
				var post = {
					token: user_info.token
				};
				this.__initAction("Tools-checkTokens", post, (res, s) => {
					if (s == 1) {
						console.log(res)
						var data = res.data;
						var new_user_info = {
							token: data.token,
							uid: data.uid,
							telPhone: user_info.telPhone,
							location: this.Global.config.location
						};
						this.Global.config.uid = data.uid;
						this.Global.config.token = data.token;
						this.setCache("user_info", JSON.stringify(new_user_info));
						href = "/main";
					}
					this.__Sleep(e => {
						this.__Href(href);
					});
				});
			} else {
				this.__Sleep(e => {
					this.__Href(href);
				});
			}
		},
		codeSesstionSave() {
			window.sessionStorage.setItem('isLoadImage', true);
		}
	}
};
</script>
<style lang="scss">
</style>
