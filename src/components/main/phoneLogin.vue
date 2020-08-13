<template>
	<div class="phone-login">
		<header>
			<div class="header-nav">
				<span class="iconfont icon-previewleft" @click="jumpBack"></span>
			</div>
		</header>

		<div class="logo-top-box">
			<img :src="logoCrc" alt />
			<p>
				<span style="margin-top:10px;">已有账号，立即</span>
				<router-link to="/login" class="to-login">
					<span>登录</span>
					<span class="re-icon">
						<span class="iconfont icon-previewleft"></span>
					</span>
				</router-link>
			</p>
		</div>

		<div class="login-phone mt-2">
			<h3>手机号码</h3>
			<div class="input-box1">
				<input v-model="phoneNum" maxlength="11" type="tel" placeholder="请输入注册手机号">
				<span class="position-left">+86</span>
				<span @click="phoneNum=''" class="position-right newiconfont icon-chahao"></span>
			</div>
		</div>

		<div class="bottom_word">
			<yd-checkbox class="checkboxs" color="#64b2f0" v-model="checkboxs"></yd-checkbox>
			<span>登录表示接受</span>
			<router-link to="/readingguide/2" style="color:#64B2F0">《用户协议》</router-link>
			<span>和</span>
			<router-link to="/readingguide/11" style="color:#64B2F0">《隐私政策》</router-link>
		</div>

		<div class="get-reg-code">
			<a class="btn" href="javascript:;" @click="jumpGetRegCode()">获取验证码</a>
			<!-- <a href="javascript:;">获取验证码</a> -->

		</div>

		<!-- <div class="others">
			<div class="other-bottom-login">
				<span class="center-line"></span>
				<span>其他登录方式</span>
				<span class="center-line"></span>
			</div>
			<div class="login-other-icon">
				<div class="icon-radius-box">
					<span class="newiconfont icon-qunfengxinlangweibo"></span>
				</div>
				<div class="icon-radius-box">
					<span class="newiconfont icon-weixin"></span>
				</div>
				<div class="icon-radius-box">
					<span class="newiconfont icon-qq"></span>
				</div>
			</div>
		</div> -->
	</div>
</template>
<script>
export default {
	data() {
		return {
			phoneNum: '',
			checkboxs: true
		};
	},

	created() {
		this.selfMainLoadOpend();
	},

	mounted() {
		setTimeout(()=>{
			this.selfMainLoadClosed();
		},300)
	},

	methods: {
		jumpBack() {
			this.$router.back(-1);
		},

		jumpGetRegCode() {
			var val = this.phoneNum;
			var checkboxs = this.checkboxs;
			if(val.length != 11){
				this._msg('请输入正确的手机号码');
				return
			};
			if (!this.checkCheckbox(checkboxs)) {
				return;
			}
			// var obj = {
			// 	tel: val,
			// 	type: '手机'
			// };
			// this.$router.push({
			// 	path: `/vcode/login`,
			// 	query: obj
			// });
			this.sendTelCode(val);
		},

		sendTelCode(val) {
			//发送验证码
			return new Promise((resolve, reject) => {
				var that = this;
				var url = "Tools-setTelCode";
				var params = {
					telPhone: val,
					type: 'login',
					len: 4,
					pid: ''
				};
				that.__initAction(url, params, (res, s) => {
					if (s == 1) {
						var obj = {
							tel: val,
							type: '手机'
						};
						this.$router.push({
							path: `/vcode/login`,
							query: obj
						});
					}else{
						that._msg(res.info);
					}
				});
			});
		},
	},

	watch:{
		phoneNum() {
			var len = this.phoneNum.length;
		}
	},

	computed: {
		logoCrc() {
			return this.getCache("APPLOGO", 2).val;
		}
	}
};
</script>
<style lang="scss" scoped>
	.phone-login {
		background: #fff;
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
		.header-nav {
			color: #4a4a4a;
			padding: 5px;

			.iconfont {
				font-size: 9vw;
			}
		}
		.logo-top-box,
		.login-phone,
		.get-reg-code {
			padding: 0 25px;
		}

		.logo-top-box {
			img {
				width: 100px;
				height: 100px;
				display: block;
				margin: 0 auto;
			}
			p {
				text-align: center;
			}
			.to-login {
				color: #2693d6;
				display: inline-flex;
				align-items: center;
				.re-icon {
					display: inline-block;
					transform: rotate(180deg);
				}
			}
		}
		.login-phone {
			margin-top: 60px;
			h3 {
				font-size: 0.9rem;
			}
			.input-box1 {
				margin-top: 10px;
				height: 30px;
				position: relative;
				//
				border-bottom: 1px solid #c9c9c9;
				font-size: 0.9rem;
			}
			.position-left {
				position: absolute;
				top: 5px;
				left: 5px;
			}
			.position-right {
				position: absolute;
				top: 5px;
				right: 5px;
			}
			input {
				width: 100%;
				height: 100%;
				margin-left: 40px;
				border: none;
				outline: none;
			}
		}
		.get-reg-code {
			margin-top: 40px;
			.btn {
				display: flex;
				height: 44px;
				color: #fff;
				font-size: 1.1rem;
				letter-spacing: 1px;
				text-decoration: none;
				justify-content: center;
				align-items: center;
				border-radius: 50px;
				background: #3d7efe;
				box-shadow: 5px 4px 6px #79a8d3;
			}
			p {
				margin-top: 30px;
				text-align: center;
			}
		}
		.others {
			padding-top: 120px;
		}
		.other-bottom-login {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			// margin-top:12rem;
			margin-bottom: 1vh;
			.center-line {
				display: inline-block;
				width: 20vw;
				height: 0.07rem;
				background: #c9c9c9;
				margin: 0 5px;
			}
			span:nth-child(2) {
				color: #c9c9c9;
				font-size: 0.9rem;
			}
		}
		.login-other-icon {
			width: 70%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.icon-radius-box {
				color: #c6c6c6;
				width: 10vw;
				height: 10vw;
				background: #f0f0f0;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				.newiconfont,
				.iconfont {
					font-size: 9vw;
				}
			}
		}

		.bottom_word{ padding-top: 10px; line-height: 20px; text-align: center;	}
		.checkboxs{ padding-right: 2px !important; }
	}
</style>
<style lang="scss">
	.yd-checkbox-text{ display: none; }
</style>