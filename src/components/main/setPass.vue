<template>
	<div class="back_pwd bg-white w-100">
		<div class="top-box">
			<img :src="logo" alt />
		</div>

		<div class="back_pwd_group bg-white w-100">
			<ul class="back_pwd_list w-85 inputGroup">
				<li class="inputGroup-input">
					<h3 class="phone-loble">新密码</h3>
					<div class="login_phone">
						<input type="password" placeholder="请输入新密码" v-model="loginPass" />
					</div>
				</li>
				<li class="inputGroup-input">
					<h3 class="phone-loble">确认密码</h3>
					<div class="login_phone">
						<input
							type="password"
							placeholder="请再次确认密码"
							v-model="regLoginPass"
							@blur="regPassHandle"
						/>
					</div>
				</li>
			</ul>
		</div>

		<div class="btn-box">
			<a href="javascript:;" class="back_pwd_btn bg-blue" @click="do_back()">
				<span class="fc-white fw-6 fm-1">修改</span>
			</a>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: "重置密码"
			},
			loginPass: "",
			regLoginPass: "",
			check_code: null
		};
	},

	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 1
		});
		// 获取菜单数据
		this.__Sleep(e => {
			this.selfMainLoadClosed();
		});
	},

	mounted() {},

	destroyed() {
		this.delCache("getPassCheckCode");
	},

	methods: {
		//两次密码输入对比
		regPassHandle() {
			var login = this.loginPass;
			var reg = this.regLoginPass;
			if (login.trim() == reg.trim()) {
				return true;
			} else {
				return false;
			}
		},

		do_back() {
			var login = this.loginPass;
			var reg = this.regLoginPass;
			if (!login.trim()) {
				this._msg("请输入新密码");
				return;
			}
			if (!reg.trim()) {
				this._msg("请再次确认密码");
				return;
			}
			if (!this.regPassHandle()) {
				this._msg("两次密码输入不一致");
				return;
			}
			var url = "Member-upppass";
			var params = {
				token: this.getToken(),
				pass: login,
				loginName: this.getQuery().tel
			}
			var that = this;
			console.log(params)
			that.__initAction(url, params, (res, s) => {
				if (s == 1) {
					that._msg(res.info);
					setTimeout(() => {
						this.__Sleep(e => {
							this.__Href("/");
						});
					}, 500);
				} else {
					that._msg(res.info);
				}
			});
		}
	},

	computed: {
		logo() {
			return this.getCache("APPLOGO", 2).val;
		}
	}
};
</script>
<style lang="scss">
	.back_pwd {
		width: 100vw;
		height: calc(100% - 2.8rem);
		.top-box {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 30px 0;
			img {
				width: 100px;
				height: 100px;
				border-radius: 50%;
			}
		}
		.back_pwd_group {
			width: 100%;
			.back_pwd_list {
				list-style: none;
				li {
					width: 100%;
					padding: 10px 0;

					input {
						width: 100%;
						height: 100%;
						border: none;
						outline: none;
						padding: 0;
						font-size: 0.9rem;
						color: #000;
						outline-style: none;
						line-height: 50px;
						margin-bottom: 0;
					}
				}
			}
		}
		.inputGroup {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-ms-flex-direction: column;
			flex-direction: column;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
			height: 45%;
		}
		.inputGroup-input {
			width: 85%;
			margin-top: 10px;
			box-sizing: border-box;
		}
		.phone-loble {
			font-size: 0.95rem;
			align-self: flex-start;
		}
		.login_phone {
			width: 100%;
			height: 35px;
			position: relative;
			overflow: hidden;
			border: none;
			border-bottom: 1px solid #c9c9c9;
		}
		.btn-box {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 30px;
		}
	}
</style>
