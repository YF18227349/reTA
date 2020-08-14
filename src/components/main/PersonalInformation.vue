<template>
	<div class="informations">
		<div class="perfect">
			<span>完善个人信息</span>
		</div>
		<div class="HeadPortrait">
			<div id="import" class="round">
				<img :src="userInfomation.portrait" alt="">
			</div>
			<svg
				t="1572405238364"
				class="camera"
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="4860"
				width="16"
				height="16"
			>
				<path
					d="M947.8 876.9H76.3v-609h163.9l44.6-120.8h449L781 267.9h166.8v609z m-829.5-42h787.5v-525H525.1v-42h210.7L705 189.1H314l-44.6 120.8H118.3v525z"
					fill="#1E1E1E"
					p-id="4861"
				/>
				<path
					d="M512 738.7c-87 0-157.7-70.8-157.7-157.7S425 423.2 512 423.2c87 0 157.7 70.8 157.7 157.7S599 738.7 512 738.7z m0-273.5c-63.8 0-115.7 51.9-115.7 115.7S448.2 696.7 512 696.7c63.8 0 115.7-51.9 115.7-115.7S575.8 465.2 512 465.2zM791.1 510c-43.1 0-78.1-35-78.1-78.1 0-43.1 35-78.1 78.1-78.1 43.1 0 78.1 35 78.1 78.1 0 43.1-35 78.1-78.1 78.1z m0-114.2c-19.9 0-36.1 16.2-36.1 36.1 0 19.9 16.2 36.1 36.1 36.1 19.9 0 36.1-16.2 36.1-36.1 0-19.9-16.2-36.1-36.1-36.1z"
					fill="#1E1E1E"
					p-id="4862"
				/>
			</svg>
		</div>
		<!--  -->
		<div class="login-phone">
			<h3>用户名</h3>
			<div class="input-box gz">
				<input placeholder="请输入用户名" type="text" v-model="userInfomation.lastName" />
				<!-- <span class="position-right">0/10</span> -->
				<svg
					@click="userInfomation.lastName=''"
					t="1572427589562"
					class="position-right"
					viewBox="0 0 1024 1024"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					p-id="1674"
					width="16"
					height="16"
				>
					<path
						d="M1024 80.497778L943.502222 0 512 431.502222 80.497778 0 0 80.497778 431.502222 512 0 943.502222 80.497778 1024 512 592.497778 943.502222 1024 1024 943.502222 592.497778 512 1024 80.497778z"
						p-id="1675"
					/>
				</svg>
			</div>
		</div>
		<div class="login-phone">
			<h3>生日</h3>
			<div class="input-box gz">
				<yd-datetime :start-year="staryear" :end-year="endyear" type="date" v-model="userInfomation.birthday" slot="right"></yd-datetime>
				<span class="set_arrow iconfont icon-previewright position-right"></span>
			</div>
		</div>

		<div>
			<input type="file" id="files" v-show="false" @change="imports()">
		</div>
		<!--  -->
		<div class="but">
			<a @click="complete()">完成</a>
		</div>
		<!--  -->
		<div class="later">
			<a @click="jumpover()">以后再说</a>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			userInfomation: {
				lastName: '',
				portrait: '',
				birthday: '2019-01-01',
			},
			userSetInfoList: {
				lastName: '',
				portrait: '',
				birthday: '',
				token: this.getToken()
			},
			staryear: '',
			endyear: ''
		};
	},
	created() {
		$(function() {
			$("#import").click(function() {
				$("#files").click();
			});
		});
		this.getPageData();
		this.$store.state.header_title = "个人信息完善";
	},
	methods: {
		getPageData(){
			// this.userInfomation.portrait = this.getUserInfo().portrait;
			// if (this.getCache("userSetting", 2)) {
			// 	this.userSetting = this.getCache("userSetting", 2);
			// }
			this.userInfomation.portrait = './static/imgs/main/profile_small.jpg';
			var thisyear = new Date().getFullYear();
			this.staryear = Number(thisyear - 60);
			this.endyear = thisyear;
			this.userInfomation.birthday = `${thisyear - 10}-01-01`;
		},

		//获取头像上传文件
		imports() {
			var that = this;
			var f = "";
			var fileDom = document.getElementById("files").files[0]; //获取读取的File对象
			var name = fileDom.name; //读取选中文件的文件名
			var suffix = name.split(".")[1]; //获取后缀
			var size = fileDom.size; //读取选中文件的大小
			var readeObj = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
			readeObj.readAsDataURL(fileDom); //读取文件的内容
			readeObj.onload = e => {
				var baseData = e.target.result;
				that.__UploadImg(baseData, suffix, data => {
					var imgUrl = this.Global.baseLink + data.dir;
					that.userSetInfoList.portrait = data.dir;
					that.userInfomation.portrait = imgUrl;
				});
			};
		},

		complete() {
			this.userSetInfoList.lastName = this.userInfomation.lastName;
			this.userSetInfoList.birthday = this.userInfomation.birthday;
			var lastName = this.userSetInfoList.lastName;
			var portrait = this.userSetInfoList.portrait;
			if (!lastName) return this._msg("请先输入用户名");
			if (!portrait) this.userSetInfoList.portrait = -1;
			var params = this.userSetInfoList;
			var url = "Member-fillingUserData";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					// this._msg(res.info);
					this.jumpover();
				}
			})
		},
		jumpover(){
			setTimeout(() => {
				this.__Sleep(e => {
					this.__Href("/");
				});
			}, 500);
		}
	},
};
</script>
<style lang="scss" scoped>
.informations {
	width: 100%; height: 100%; background: #fff;
	.perfect {
		font-weight: 500;
		font-size: 2rem;
		color: #333;
		text-align: center;
		padding-top: 1.5rem;
	}
	.HeadPortrait {
		position: relative;
		text-align: center;
		margin-top: 2rem;
		.round {
			width: 5rem;
			height: 5rem;
			border: 1px solid #ddd;
			border-radius: 50%;
			margin: 0 auto;
			overflow: hidden;
			img{
				display: block; width: 100%; object-fit: cover;
			}
		}
		.camera {
			position: absolute;
			top: 80%;
			left: 55%;
		}
	}
	.login-phone {
		padding: 0 25px;
		margin-top: 1.5rem;
		h3 {
			font-size: 0.9rem;
			color: #333;
		}
		.input-box {
			margin-top: 10px;
			height: 30px;
			position: relative;
			//
			border-bottom: 1px solid #c9c9c9;
			font-size: 0.9rem;
		}
		.gz {
			padding: 0 !important;
			border-radius: 0 !important;
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
			width: 9px;
		}
		input {
			width: 100%;
			height: 100%;
			border: none;
			outline: none;
		}
	}
	.but {
		margin-top: 3rem;
		padding: 0 25px;
		a {
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
	}
	.later {
		text-align: center;
		margin-top: 1rem;
		color: #666;
	}
}
</style>