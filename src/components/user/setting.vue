<template>
	<div class="user_setting w-100">
		<div class="userSetInfoItems w-100">
			<a href="javascript:;" id="import" class="item">
				<span class="set_title">头像</span>
				<div class="set_text">
					<img :src="userSetInfoList.logo" alt class="user_set_logo">
					<span class="set_arrow iconfont icon-previewright"></span>
				</div>
			</a>
			<a href="javascript:;" class="item">
				<span class="set_title">昵称</span>
				<div class="set_text">
					<!-- <span>{{userSetInfoList.name?userSetInfoList.name:'未设置'}}</span> -->
					<input type="text" v-model="userName" class="name-input" placeholder="请输入修改名称">
					<span class="set_arrow iconfont icon-previewright"></span>
				</div>
			</a>
			<a href="javascript:;" class="item" @click="setSexShow=true">
				<span class="set_title">性别</span>
				<div class="set_text">
					<span>{{setSexValue==1?'男':setSexValue==2?'女':'保密'}}</span>
					<span class="set_arrow iconfont icon-previewright"></span>
				</div>
			</a>
			<a href="javascript:;" class="item" @click.prevent="select_time()">
				<span class="set_title">生日</span>
				<div class="set_text">
					<yd-datetime :start-year="staryear" :end-year="endyear" type="date" v-model="datetime4" slot="right"></yd-datetime>
					<span class="set_arrow iconfont icon-previewright"></span>
				</div>
			</a>

			<!-- <a href="javascript:;" class="item">
				<span class="set_title">电话</span>
				<div class="set_text">
					<input type="tel" v-model="telNum" class="tel-input" placeholder="请输入修改电话">
					<span class="set_arrow iconfont icon-previewright"></span>
				</div>
			</a>

			<a href="javascript:;" class="item">
				<span class="set_title">邮箱</span>
				<div class="set_text">
					<input type="email" v-model="emailNum" class="Email-input" placeholder="请输入修改邮箱">
					<span class="set_arrow iconfont icon-previewright"></span>
				</div>
			</a> -->

			<div>
				<input type="file" id="files" v-show="false" @change="imports()">
			</div>
			<!--
			<self-timeDate @callBack="showTime" :show="date_code" :mark="'-'"></self-timeDate> -->
		</div>

		<!-- 姓名设置 -->
		<!-- <yd-popup v-model="showPopUp" position="center" width="60%" class="set_name_popup" masker-opacity=".5">
			<div class="bg-white popUpGroup">
				<p class="popUpTitle">请输入您的姓名</p>
				<div class="popUpInput p-r">
					<input type="text" class="popUp_input" v-model="setNameValue" placeholder="请输入:">
					<yd-icon name="error" class="closeBtn p-a" v-if="btnCode"></yd-icon>
				</div>
				<p class="popUpBtn">
					<yd-button @click.native="showPopUp = false" type="warning" size="small">取消</yd-button>
					<yd-button @click.native="done()" type="primary" size="small">确定</yd-button>
				</p>
			</div>
		</yd-popup> -->

		<div class="modal_frame_group w-100">
			<div class="modal_plate w-100" v-if="setSexShow" :class="setSexShow?'modal_plate_show':'modal_plate_hid'" @click="modal_cancel()"></div>
			<div class="modal_list w-100" :class="setSexShow?'modal_up':'modal_down'">
				<ul class="pay_model_list w-100 bg-white">
					<li v-for="(tmp,i) in sexModelList" :key="i">
						<a href="javascript:;" class="pay_item" @click="select_sex(i)">
							<span class="ml-3 fc-blue fw-5 fm-2">{{tmp.title}}</span>
						</a>
					</li>
				</ul>
				<!-- <a href="javascript:;" class="cancel_btn bg-white w-100" @click="modal_cancel()">
					<span class="fc-blue fw-7 fm-2">取消</span>
				</a> -->
			</div>
		</div>

	</div>
</template>

<script type="text/ecmascript-6">
// const TimeDate = ()=>import("../../components/sub/time_date");
export default {
	name: "cameras-and-albums",
	data() {
		return {
			date_code: false,
			// timedate: "",
			file: "",
			datetime4: "2019-01-01",
			upload_file: "",
			pageInfo: {
				header_title: "个人设置",
				token: "",
				uid: null,
			},
			setSexShow: false,
			setSexValue: 3,
			showPopUp: false,
			sexModelList: [{
					title: "男",
					value: 1
				},
				{
					title: "女",
					value: 2
				},
				{
					title: "保密",
					value: 3
				}
			],
			btnCode: false,
			setNameValue: "",
			setBirthdayValue: "",
			// yearFormat: '<span style="color:#F00;">{value}<i style="font-size: 12px;margin-left: 1px;">年</i></span>',
			// monthFormat: '<span style="color:#0BB20C;">{value}<i style="font-size: 12px;margin-left: 1px;">月</i></span>',
			// dayFormat: '<span style="color:#FFB400;">{value}<i style="font-size: 12px;margin-left: 1px;">日</i></span>',
			userSetInfoList: {
				name: "",
				logo: "",
				sex: null,
				birthday: "",
			},
			userSetting: null,
			userName: "",
			telNum: "",
			emailNum: "",
			isUploadImg: false,
			staryear: '',
			endyear: ''
		};
	},
	mounted() {
		$(function() {
			$("#import").click(function() {
				$("#files").click();
			});
		});
		$(".header_left")
			.attr("href", "javascript:;")
			.click(() => {
				this.exit_btn();
			});

		$(".header_right>span")
			.html("保存")
			.addClass("fw-6 fc-gray")
			.css("fontSize", "14px");

		$(".header_right").click(() => {
			this.do_update();
		});
	},
	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 0
		});
		this.init();
	},
	methods: {
		init() {
			var thisyear = new Date().getFullYear();
			this.staryear = Number(thisyear - 60);
			this.endyear = thisyear;
			this.datetime4 = `${thisyear - 10}-01-01`;
			this.getPageInfo();
			this.getUserData();
			// 获取菜单数据
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},
		showTime(x, y) {
			if (x == 1) {
				this.setBirthdayValue = y;
			}
			this.date_code = false;
		},

		select_time() {
			this.date_code = true;
		},

		getPageInfo() {
			this.selfMainLoadOpend();
			var Ext = this.getCache("userInfoExt", 2);
			this.userSetting = this.getCache("userSetting", 2);
			if (!this.userSetting) {
				this.userSetting = JSON.stringify({
					lastName: Ext.lastName,
					sex: Ext.sex,
					birthday: Ext.birthday,
					portrait: Ext.portrait,
					rid: Ext.rid
				});
				this.setCache("userSetting", this.userSetting);
			}
			this.userSetting = this.getCache("userSetting", 2);
			this.userSetInfoList.name = this.userSetting.lastName;
			this.userSetInfoList.logo = this.userSetting.portrait;
			this.userSetInfoList.sex = this.setSexValue = this.userSetting.sex;
			this.userSetInfoList.birthday = this.setBirthdayValue = this.userSetting.birthday;
		},
		cancel() {
			this.showPopUp = false;
		},
		done() {
			this.userSetInfoList.name = this.setNameValue;
			this.showPopUp = false;
		},

		getUserData() {
			var url = "Member-getUserCache";
			var params = {
				token: this.getToken(),
				uid: this.getUserInfo().uid
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					// console.log(res.data);
					this.userSetInfoList.sex = res.data.sex;
					// this.userSetInfoList.birthday = res.data.birthday;
					this.datetime4 = res.data.birthday;
					this.userSetInfoList.logo = res.data.portrait;
					this.userName = res.data.lastName;
					this.telNum = res.data.tel;
					this.emailNum = res.data.email;
				}
			})
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
					that.upload_file = data.dir;
					var imgUrl = this.Global.baseLink + data.dir;
					that.userSetting.portrait = imgUrl;
					that.userSetInfoList.logo = imgUrl;
					this.isUploadImg = true;
					that.setCache("userSetting", JSON.stringify(that.userSetting));
				});
			};
		},

		// 修改
		do_update() {
			var token = this.getToken();
			var lastName = this.userName;
			var sex = this.userSetting.sex;
			if (this.isUploadImg) {
				var portrait = this.userSetting.portrait;
			} else {
				var portrait = (-1);
			};
			var birthday = this.datetime4;
			// var tel = this.telNum;
			// var email = this.emailNum;
			if (!birthday) {
				birthday = this.userSetting.birthday;
			};
			if (portrait.constructor === String) {
				if (portrait.search(this.Global.baseLink) == 0) {
					portrait = portrait.replace(this.Global.baseLink, "");
				}
			}
			birthday = birthday.replace(/\s/gi, "");
			if (!lastName) {
				// this.lastName = " ";
				this.$dialog.toast({
					mes: "昵称不能为空...",
					timeout: 1500
				});
				return;
			}

			// if (!tel) {
			// 	// this.tel = " ";
			// 	this.$dialog.toast({
			// 		mes: "电话不能为空...",
			// 		timeout: 1500
			// 	});
			// 	return;
			// }

			// if (!email) {
			// 	// this.email = " ";
			// 	this.$dialog.toast({
			// 		mes: "邮箱不能为空...",
			// 		timeout: 1500
			// 	});
			// 	return;
			// }

			var params = {
				token,
				portrait,
				lastName,
				sex,
				birthday,
				// tel,
				// email
			};
			this.$dialog.loading.open("正在修改请稍后...");
			var that = this;
			this.__initAction("Member-saveDataInfo", params, (res, s) => {
				if (s == 1) {
					this._msg(res.info);
					this.getUserData();
					setTimeout(() => {
						this.$router.push("/newUserCenter");
					}, 300);
				} else {
					this._msg(res.info);
				}
			});
		},
		modal_cancel() {
			this.setSexShow = false;
		},
		select_sex(i) {
			this.userSetting.sex = this.setSexValue = this.sexModelList[i].value;
			this.setSexShow = false;
		},
		exit_btn() {
			this.delCache("userSetting");
			setTimeout(() => {
				window.history.go(-1);
			}, 300);
		}
	},
	watch: {
		// timedate() {
		//   console.log(timedate);
		// },
		setNameValue() {
			if (!this.setNameValue) {
				this.btnCode = true;
			} else {
				this.btnCode = false;
			}
		},
		setSexValue(x, y) {
			this.setSexValue = x;
			this.userSetInfoList.sex = x;
			if (!this.setSexValue) {
				this.setSexValue = this.userSetting.sex;
			}
			this.userSetting.sex = this.setSexValue;
			this.setCache("userSetting", JSON.stringify(this.userSetting));
			this.setSexShow = false;
		},
		setBirthdayValue() {
			if (this.setBirthdayValue) {
				this.userSetInfoList.birthday = this.setBirthdayValue;

				this.userSetting.birthday = this.setBirthdayValue;
				this.setCache("userSetting", JSON.stringify(this.userSetting));
			}
		}
	},
	destroyed() {
		$(".header_right>span").html("");
		$(".header_right").unbind("click");
		$(".header_left")
			.attr("href", "javascript:history.go(-1)")
			.unbind("click");
		// this.remove_update_info();
	},
	components: {
		// "self-timeDate": TimeDate //2:注册时间子组件
	}
};
</script>

<style lang="scss">
.popUpGroup {
		width: 100%;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		background: #fff;
}
.popUpTitle {
		color: #000;
		height: 30px;
		font-size: 1.3rem;
		font-weight: 500;
		text-align: center;
		padding: 15px 0 5px;
}
.popUpInput {
		width: 100%;
		height: 30px;
		padding: 10px 0;
		.popUp_input {
				width: 100%;
				color: #333;
				font-size: 14px;
				height: 30px;
				border: 0;
				border-bottom: 1px solid #7e7e7e;
				text-align: center;
		}
		.closeBtn {
				width: 28px;
				height: 28px;
				top: 50%;
				font-size: 30px;
				margin-top: -14px;
				right: 5%;
		}
}
.popUpBtn {
		margin: 0;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.yd-button {
				margin: 0;
		}
}
.yd-cell-group.setSexGroup {
		width: 100%;
		height: 100px;
		padding: 5px 10px;
}
.yd-cell-item {
		padding: 5px 15px;
		span {
				color: #333;
				font-size: 14px;
		}
}
.Email-input,
.name-input,
.tel-input {
		outline: none;
		border: none;
		color: #000;
		text-align: right;
		font-size: 14px;
		font-weight: 600;
}
</style>
