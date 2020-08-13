<template>
	<div class="back_pwd bg-white w-100">
		<div class="top-box">
			<img :src="logo" alt />
		</div>

		<div class="back_pwd_group bg-white w-100">
			<ul class="back_pwd_list w-85 inputGroup">
				<li class="inputGroup-input">
					<h3 class="phone-loble">新{{pageLan.inputTitle}}</h3>
					<div class="login_phone">
						<input
							:type="pageLan.inputType"
							:placeholder="`请输入新${pageLan.inputTitle}`"
							v-model="loginPass"
							@input="changeNum(1)"
						/>
						<!-- oninput="if(value.length>6)value=value.slice(0,6)" -->
					</div>
				</li>
				<li class="inputGroup-input">
					<h3 class="phone-loble">确认{{pageLan.inputTitle}}</h3>
					<div class="login_phone">
						<input
							:type="pageLan.inputType"
							:placeholder="`请再次确认${pageLan.inputTitle}`"
							v-model="regLoginPass"
							@blur="regPassHandle"
							@input="changeNum(2)"
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
			pageLan: {},
			loginPass: "",
			regLoginPass: "",
			check_code: null
		};
	},
	watch:{
		loginPass(){
			if (this.getQuery().type == 'tranPass') {
				this.loginPass = this.loginPass.replace(/\D/g, '');
			}
		},
		regLoginPass(){
			if (this.getQuery().type == 'tranPass') {
				this.regLoginPass = this.regLoginPass.replace(/\D/g, '');
			}
		},
	},

	created() {
		this.selfMainLoadOpend();
		// 获取菜单数据
		this.__Sleep(e => {
			this.selfMainLoadClosed();
		});
		this.getPageData();
	},

	mounted() {},

	destroyed() {
		this.delCache("getPassCheckCode");
	},

	methods: {
		getPageData() {
			var title = this.getParams().str;
			var type = this.getQuery().type;
			var tel = this.getQuery().tel;
			var inputType;
			var inputTitle;
			console.log(type)
			switch (type) {
				case "pass": //密码
					inputType = "password";
					inputTitle = "密码";
					break;
				case "setPass": //密码
					inputType = "password";
					inputTitle = "密码";
					break;
				case "tranPass": //安全密码
					inputType = "password";
					inputTitle = "安全密码";
					break;
				case "tranPass2": //安全密码
					inputType = "password";
					inputTitle = "6位数字安全密码";
					break;
				case "phone": //手机号
					inputType = "number";
					inputTitle = "手机号";
					break;
				case "email": //邮箱
					inputType = "email";
					inputTitle = "邮箱";
					break;
			}
			var obj = {
				title,
				type,
				tel,
				inputType,
				inputTitle
			};
			this.pageLan = obj;
			this.$store.commit("setHeaderStyle", {
				txt: this.pageLan.title,
				type: 1
			});
		},

		regPassHandle() {
			//两次密码输入对比
			var login = this.loginPass;
			var reg = this.regLoginPass;
			if (login.trim() == reg.trim()) {
				return true;
			} else {
				this._msg("两次密码输入不一致");
				return false;
			}
		},

		do_back() {
			if (this.regPassHandle()) {
				var type = this.getQuery().type;
				var tel = this.getQuery().tel;
				var token = this.getToken();
				var login = this.loginPass;
				var loginName = tel;
				console.log(login,loginName);
				console.log(type)
				switch (type) {
					case "pass": //密码
						var url = "Member-upppass";
						var obj = {
							token: token,
							pass: login,
							loginName: loginName
						};
						break;
					case "setPass": //密码
						var url = "Member-upppass";
						var obj = {
							token: token,
							pass: login,
							loginName: loginName
						};
						break;
					case "tranPass": //安全密码
					case "tranPass2": //安全密码
						var url = "Member-upppaypass";
						var obj = {
							token: token,
							pass: login,
							loginName: loginName
						};
						break;
					case "phone": //手机号
						var url = "Member-upploguser";
						var obj = {
							token: token,
							phone: tel
						};
						break;
					case "email": //邮箱
						break;
				};
				var that = this;
				that.__initAction(url,obj,(res,s)=>{
					console.log(res)
					if(s == 1){
						var suc;
						switch (type) {
							case "tranPass": //安全密码
								suc = "修改";
								break;
							case "tranPass2": //安全密码
								suc = "设置";
								break;
						};
						// that._msg(`${suc}${res.info}`);
						that._msg(`${res.info}`);
						that.funs();
						that.$router.go(-3);
						if (type == 'setPass') {
							this.__Sleep(e => {
							this.__Href("/PersonalInformation");
						});
						}
					}
				})
			}
		},

		changeNum(e){
			// 限制长度
			console.log(this.loginPass.length)
			if(this.getQuery().type == 'tranPass' || this.getQuery().type == 'tranPass2'){
				if(e == 1){
					if(this.loginPass.length > 6){
						this.loginPass = this.loginPass.slice(0,6)
					}
				}else{
					if(this.regLoginPass.length > 6){
						this.regLoginPass = this.regLoginPass.slice(0,6)
					}
				}
			}
		},

		funs(){
			// 点击服务时拿到安全码
			var params = {
				token: this.getToken(),
				uid: this.getUserInfo().uid
			};
			var url = "Member-getUserCache";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					var data = res.data;
					this.setCache("userInfoExt", JSON.stringify(data));
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
			padding: 30px 0 15px;
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
						padding: 0 !important;
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
