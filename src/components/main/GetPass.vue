<template>
	<div class="back_pwd bg-white w-100">
		<div class="findpwd">
			<h1>找回密码</h1>
		</div>
		<div class="login-phone">
			<h3>{{pageInfo.title}}</h3>
			<div class="input-box-getpass">
				<input placeholder="请输入注册手机号/邮箱账号" v-model="model.input" :type="pageInfo.inputType" />
			</div>
		</div>
		<div class="email-pwd">
			<!-- isPageCode = !isPageCode -->
			<!-- <a href="javascript:;" @click="replaceWay">{{pageInfos.pwd}}</a> -->
		</div>
		<div>
			<a href="javascript:;" class="login_btn bg-blue w-85" @click="doNext">
				<span class="fm-2 fc-white fw-6 word">下一步</span>
				<span class="fm-3 fc-white fw-6 iconfont icon-jurassic_next"></span>
			</a>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo:{
				title: "手机号/邮箱",
				inputType: "text",
				pwd: "找回密码"
			}
			,
			isPageCode: true,
			model: {
				input: ""
			}
		};
	},
	// destroyed() {
	//   this.delCache("getPassCheckCode");
	// },
	mounted() {},
	created() {
		this.$store.commit("setHeaderStyle", {
			txt: "找回密码",
			type: 1
		});
	},
	methods: {
		doNext() {
			var val = this.inputVal;
			var type = "";
			var regP = /^1[3456789]\d{9}$/;
			var regE = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
			if(regE.test(val)){
				console.log('邮箱')
				type = "邮箱";
			}else if(regP.test(val)){
				console.log("手机")
				type = "手机";
			}
			// if (this.isPageCode) {
			// 	//手机找回
			// 	var regP = /^1[3456789]\d{9}$/;
			// 	if (!regP.test(val)) return this._msg("账号格式不正确");
			// 	type = "手机";
			// } 
			// else {
			// 	//邮箱找回
			// 	console.log("邮箱");
			// 	var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
			// 	if (!reg.test(val)) return this._msg("邮箱格式不正确");
			// 	type = "邮箱";
			// }
			var obj = {
				tel: val,
				type: type
			};
			this.$router.push({
				path: "/vcode/getpass",
				query: obj
			});
		},

		replaceWay() {
			this.isPageCode = !this.isPageCode;
			this.model.input = "";
		}
	},

	computed: {
		// pageInfos() {
		// 	var i = this.isPageCode ? 0 : 1;
		// 	console.log(i)
		// 	return this.pageInfo[i];
		// },

		inputVal() {
			return this.model.input;
		}
	}
};
</script>
<style lang="scss" scoped>
.back_pwd {
	background: #fff;
	width: 100vw;
	height: 100vh;
	box-sizing: border-box;
	overflow: hidden;
	.findpwd {
		padding: 25px;
		h1 {
			font-size: 2rem;
		}
	}
	.login-phone {
		padding: 0 25px;
		margin-top: 50px;
		h3 {
			font-size: 0.9rem;
		}
		.input-box-getpass {
			margin-top: 20px;
			height: 30px;
			position: relative;
			border-bottom: 1px solid #c9c9c9;
			font-size: 0.9rem;
		}
		input {
			border: none;
			outline: none;
			width: 100%;
			height: 100%;
			font-size: 0.9rem;
			color: #c9c9c9;
			outline-style: none;
			line-height: 50px;
			margin-bottom: 0;
		}
	}
	.email-pwd {
		margin-top: 25px;
		padding: 0 25px;
		a {
			font-size: 0.8rem;
			color: #3d7efe;
		}
	}
	.login_btn {
		margin: 0 auto;
		margin-top: 50px;
		height: 44px;
		padding: 0 30px;
		text-decoration: none;
		display: flex;
		box-pack: center;
		justify-content: space-between;
		box-align: center;
		align-items: center;
		border-radius: 50px;
		background: #3d7efe;
		box-shadow: 5px 4px 6px #79a8d3;
		.fm-2 {
			font-size: 1.1rem;
		}
		.fm-3 {
			font-size: 1.5rem;
		}
	}
	.word{
		width: 100%; text-align: center;
	}
	.login-phone input{ color: #000 !important; }
}
</style>
