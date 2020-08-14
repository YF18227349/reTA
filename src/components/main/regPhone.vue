<template>
	<div class="phone-login">
		<!-- <header>
			<div class="header-nav">
				<span class="iconfont icon-previewleft" @click="jumpBack"></span>
			</div>
		</header>-->

		<div class="logo-top-box mt-5">
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

		<div class="login-phone">
			<h3>手机号码/邮箱</h3>
			<div class="input-box-regphone">
				<input v-model="phoneNum"  placeholder="请填写手机号码或邮箱账号" type="tel" />
				<!-- <span class="position-left">+86</span> -->
				<span @click="phoneNum=''" class="position-right newiconfont icon-chahao"></span>
			</div>
		</div>

		<div class="bottom_word">
			<yd-checkbox class="checkboxs" color="#64b2f0" v-model="checkboxs"></yd-checkbox>
			<span>注册表示接受</span>
			<router-link to="/readingguide/2" style="color:#64B2F0">《用户协议》</router-link>
			<span>和</span>
			<router-link to="/readingguide/11" style="color:#64B2F0">《隐私政策》</router-link>
		</div>

		<div class="get-reg-code">
			<a class="btn" href="javascript:;" @click="jumpSendCode()">获取验证码</a>
			<!-- <a href="javascript:;">获取验证码</a> -->
		</div>

		<!-- <div class="others" v-show="hidshow">
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
			phoneNum: "",
			pid: 0,
			checkboxs: true,

			docmHeight: 0,		//默认屏幕高度
			showHeight: 0,		//实时屏幕高度
			hidshow: true,		//显示或者隐藏footer
			isResize: false		//默认屏幕高度是否已获取
		};
	},

	mounted() {
		// window.onresize监听页面高度的变化
		window.onresize = ()=>{
			return(()=>{
				if (!this.isResize){
					//默认屏幕高度
					this.docmHeight = document.documentElement.clientHeight;
					this.isResize = true;
				}
				//实时屏幕高度
				this.showHeight = document.body.clientHeight;
			})()
		}
	},

	created() {
		this.getPageData(this.selfMainLoadOpend()).then(() => {
			this.selfMainLoadClosed();
			this.initData();
		});
	},

	methods: {
		initData() {
			let _this = this;
			// 获取链接地址上的参数
			function getQueryString(name){
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return decodeURI(r[2]); return null;
			}
			var pid = getQueryString("pid");
			if (pid == null) {
				_this.pid = 0;
			}else{
				_this.pid = pid;
			}
			if(pid){
				this.$route.meta.goBcak = true;
			}
		},
		getPageData() {
			return new Promise((resolve, reject) => {
				try {
					this.$store.state.header_title = "注册手机号码/邮箱账号";
					resolve();
				} catch (error) {
					reject(error);
				}
			});
		},

		jumpSendCode(){
			var val = this.phoneNum;
			var checkboxs = this.checkboxs;

			var reP = this.Global.reg_phone;
			var reE = /\@/;///^[\w./]+\@+[\w./]+$/;
			var check = false;
			if (reE.test(val)) {//检查有无@ match("@")=="@" 
				check = "email";
			} else {
				check = "phone";
			}
			switch (check) {
				case "phone":
				check = this.checkPhone2(val, reP, "other");
				break;
				case "email":
				check = this.checkEmail2(val, reE, "other");
				break;
			}
			if (typeof check != "boolean") {
				this._msg(check);
				return false;
			}
			
			if (!this.checkCheckbox(checkboxs)) {
				return;
			}
			if(reE.test(val)){
				var query = {
					tel: this.phoneNum,
					type: '邮箱',
					typeN: 2,
					pid: this.pid
				};
				var path = `/vcode/reg`;
				this.$router.push({
					path,
					query
				});
			}else if(reP.test(val)){
				var query = {
					tel: this.phoneNum,
					type: '手机',
					typeN: 1,
					pid: this.pid
				};
				var path = `/vcode/reg`;
				this.$router.push({
					path,
					query
				});
			}
			
		}
	},

	watch: {
		showHeight:function(){
			if(this.docmHeight > this.showHeight){
				this.hidshow = false;
			}else{
				this.hidshow = true;
			}
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
			.input-box-regphone {
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
			position: absolute;
			top: 80%;
			left: 16%;
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