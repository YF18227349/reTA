<template>
	<div class="register_select bg-white w-100">
		<!-- <header class="register_select_header bg-gray w-100">
				<a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
				<span class="header_title fc-dark">{{pageInfo.header_title}}</span>
				<a href="javascript:;" class="last"></a>
			</header>-->
		<!-- <div class="clear-fixed"></div> -->
		<div class="register_select_group bg-white">
			<a href="javascript:;" class="select_item" @click="pageInfo.select_code=0" :class="pageInfo.select_code==0?'bg-blue':'bg-white br-blue'">
				<span class="register_icon iconfont icon-wodemw" :class="pageInfo.select_code==0?'fc-white':'fc-dark'"></span>
				<span :class="pageInfo.select_code==0?'fc-white':'fc-dark'">个人账户</span>
			</a>
			<a href="javascript:;" class="select_item" @click="pageInfo.select_code=1" :class="pageInfo.select_code==1?'bg-blue':'bg-white br-blue'">
				<span class="register_icon iconfont icon-jiudian" :class="pageInfo.select_code==1?'fc-white':'fc-dark'"></span>
				<span :class="pageInfo.select_code==1?'fc-white':'fc-dark'">企业账户</span>
			</a>
			<!-- :to="'/register/'+pageInfo.select_code" -->
			<a href="javascript:;" class="next_btn bg-blue" @click="toNext">
				<span class="fc-white fm-2 fw-6">下一步</span>
			</a>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: "选择注册账户类型",
				select_code: 0
			},

			logs: ""
		};
	},
	mounted() {
		var h = document.documentElement.clientHeight;
		$(".register_select").css("height", `${h}px`);
	},
	created() {
		this.selfMainLoadOpend();
		this.$store.state.header_title = "选择注册账户类型";

		// 获取菜单数据
		this.__Sleep(e => {
			this.selfMainLoadClosed();
		});
	},

	methods: {
		toNext() {
			var type = this.pageInfo.select_code;
			// var path = `/register/${type}`;
			var path = `/regPhone/${type}`;
			///phoneLogin
			var val = this.getParams().type;
			if (val == "app") {
				var query = {
					mode: "app",
				};
				this.$router.push({
					path,
					query
				});
			} else { // if (val == Number(val))
				var query = {
					mode: "notApp",
					pid: val
				};
				this.$router.push({
					path,
					query
				});
			}
		},
	}
};
</script>
<style lang="scss">
</style>
