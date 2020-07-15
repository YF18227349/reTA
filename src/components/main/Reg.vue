<template>
	<div class="register bg-white w-100">
		<!-- <header class="register_header bg-gray w-100">
				<a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
				<span class="header_title fc-dark">{{pageInfo.header_title}}</span>
				<a href="javascript:;" class="last"></a>
			</header>-->
		<!-- <div class="clear-fixed"></div> -->
		<div class="register_group w-100 bg-white">
			<ul class="register_list w-85">
				<li class="list-item">
					<input class="register_input" type="tel" placeholder="请输入手机号码(11位)" maxlength="11" v-model="loginName">
				</li>
				<li class="item_checkCode list-item">
					<input type="number" placeholder="请输入验证码" v-model="telCode">
					<a href="javascript:;" class="check_code_btn br-lightblue" @click="get_checkCode()" v-if="!top_show">
						<span class="fc-lightblue fw-6">获取验证码</span>
					</a>
					<a href="javascript:;" class="check_code_btn br-gray" v-if="top_show">
						<span class="fc-gray fw-6">{{time_total}}后重新获取</span>
					</a>
				</li>
				<li class="item_pwd p-r list-item">
					<input type="password" placeholder="请输入新密码(6~25位数字和字母)" v-model="loginPass">
					<span class="pwd_logo mui-icon mui-icon-eye p-a"></span>
				</li>
				<li class="item_pwd p-r list-item">
					<input type="password" placeholder="请再次确认密码" v-model="checkPass" @blur="check_checkPass()">
					<span class="pwd_logo mui-icon mui-icon-eye p-a"></span>
				</li>
				<li class="item_agreement list-item item_link">
					<span class="d-flex" @click="pageInfo.agreement_code= !pageInfo.agreement_code">
						<span class="agreement_logo iconfont icon-duihao2 fc-white mr-3" :class="pageInfo.agreement_code ? 'bg-blue ':'bg-white br-lightdark'"></span>
						<span class="fs-3">同意服务协议以及隐私条款</span>
					</span>
					<router-link to="/readingguide/2" style="color:#4055d0;" v-if="isLinkCode == 0">《个人用户注册协议》</router-link>
					<router-link to="/readingguide/1" style="color:#4055d0;" v-if="isLinkCode == 1">《 企业用户注册协议》</router-link>
				</li>
			</ul>
		</div>
		<a href="javascript:;" class="register_btn bg-blue" @click="do_register()">
			<span class="fc-white fw-6 fm-1">注册</span>
		</a>
	</div>
</template>
<script>
const Button = ()=>import("../sub/Button");
export default {
	data() {
		return {
			pageInfo: {
				header_title: "",
				agreement_code: true,
				list: ["个人注册", "企业注册"]
			},
			isLinkCode: this.getParams().type,
			pid: null,
			top_show: false,
			rid: null,
			loginName: "",
			loginPass: "",
			checkPass: "",
			telCode: null,
			check_code: null,
			time_total: 60
		};
	},
	destroyed() {
		this.delCache("regCheckCode");
	},
	mounted() {
		var h = document.documentElement.clientHeight;
		$(".register").css("height", `${h-46.69}px`);
	},
	created() {
		this.selfMainLoadOpend();
		this.$store.state.header_title = "用户注册";
		this.getPageInfo();
	},
	methods: {
		getRegId() {
			var query = this.getQuery();
			if (query.mode == "app") {
				//跳转app登录
				this.pid = 0;
				console.log("myself is app");
			} else if (query.mode == "notApp") {
				if (query.pid) {
					//跳转下载页面
					this.pid = query.pid;
					console.log("myself is not app");
				}
			}
		},

		getPageInfo() {
			var x = this.getParams().type;
			this.pageInfo.header_title = this.pageInfo.list[x];
			this.rid = parseInt(x) + 1;
			// this.pid = 92;
			this.getRegId();
			// 获取菜单数据
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			});
		},

		check_telCode() {
			var telCode = this.telCode;
			var check_code = this.check_code;
			if (!telCode) {
				this._msg("验证码不能为空");
				return;
			} else if (telCode != check_code) {
				this._msg("验证码不正确");
				return;
			} else {
				return true;
			}
		},

		check_checkPass() {
			var pwd = this.loginPass;
			var c_pwd = this.checkPass;
			if (!c_pwd) {
				this._msg("确认密码不能为空");
				return;
			} else if (c_pwd != pwd) {
				this._msg("两次输入的密码不一致");
				return;
			} else {
				return true;
			}
		},

		do_register() { // 注册
			var re = this.Global.reg_phone;
			var loginName = this.loginName;
			var telCode = this.telCode;
			var loginPass = this.loginPass;
			var checkPass = this.checkPass;
			var agreement_code = this.pageInfo.agreement_code;
			var info = {
				loginName: this.loginName,
				telCode: this.telCode,
				loginPass: this.loginPass,
				rid: this.rid,
				pid: this.pid
			};

			if (!this.checkPhone(loginName, re)) {
				this._msg("电话号码输入有误");
				return;
			}
			if (!this.check_telCode()) {
				return;
			}
			if (!this.checkPwd(loginPass)) {
				return;
			}
			if (!this.check_checkPass()) {
				return;
			}
			if (!agreement_code) {
				this._msg("请先阅览协议");
				return;
			}
			this.loading("正在注册请稍后...");
			this.__initAction("Member-register", info, (res, s) => {
				if (s == 1) {
					var token = res.data.token;
					var uid = res.data.uid;
					var telPhone = loginName;
					var user_info = {
						token,
						uid,
						telPhone
					};
					this._msg(res.info);
					this.setCache("user_info", JSON.stringify(user_info));
					//判断用户为app注册  || pages 注册
					var query = this.getQuery();
					if (query.mode == "app") {
						//跳转app登录
						setTimeout(() => {
							this.$router.push("/login");
						}, 1000);
						console.log("myself is app");
					} else if (query.mode == "notApp") {
						if (query.pid) {
							//跳转下载页面
							setTimeout(() => {
								this.$router.push("/download");
							}, 1000);
							console.log("myself is not app");
						}
					}

				} else {
					this._msg(res.info);
				}
			});
		},

		get_checkCode() {
			var phone = this.loginName;
			var re = this.Global.reg_phone;
			if (!phone) {
				this._msg("请先输入电话号码");
				return;
			}
			if (!this.checkPhone(phone, re)) {
				this._msg("电话号码输入有误");
				return;
			}
			var info = {
				telPhone: phone
			};
			var timer = setInterval(() => {
				this.top_show = true;
				this.time_total--;
				if (this.time_total == 0) {
					this.time_total = 60;
					this.top_show = false;
					clearInterval(timer);
				}
			}, 1000);
			this._msg("验证已发送...");
			if (!this.top_show) {
				this.__initAction("Tools-setTelCode", info, (res, s) => {
					if (s == 1) {
						this.check_code = res.data.code;
						this.setCache("regCheckCode", this.check_code);
						// setTimeout(() => {
						//   this.telCode = this.check_code;
						// }, 2000);
					} else {
						this._msg(res.info);
					}
				});
			}
		}
	},

	components: {
		"self-button": Button
	}
};
</script>
<style lang="scss" scoped>
	.register_group {
		width: 100%;
		.register_list {
			list-style: none;
			li {
				width: 100%;
				padding: 10px 0;
				input {
					width: 100%;
					border: none;
					border: 1px solid #dbdbdb;
					padding: 10px 0 10px 15px;
				}
			}
		}
		.d-flex {
			display: flex;
		}
	}
	.register_input {
		width: 100%;
	}
	.list-item {
		height: 50px;
		border-radius: 8px;
	}
</style>
