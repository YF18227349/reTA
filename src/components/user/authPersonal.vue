<template>
	<div class="personal_auth w-100">
		<!-- <header class="personal_auth_header bg-gray w-100 fc-dark">
				<a href="javascript:history.go(-1)" class="arrow-logo fc-dark iconfont icon-previewleft"></a>
				<span class="header_title fc-dark">{{pageInfo.header_title}}</span>
				<a href="javascript:;" class="last"></a>
			</header>-->
		<!-- <div class="clear-fixed"></div> -->
		<div class="personal_auth_group w-100">
			<ul class="auth_id_list w-100">
				<li>
					<yd-cell-item>
						<span slot="left" class="auth_id_title">请拍照并上传您的身份证照片</span>
					</yd-cell-item>
				</li>
				<li class="shot_group w-100">
					<a href="javascript:;" class="shot_id_item p-r">
						<div class="shot_img w-100">
							<img :src="photo_list[0].photo" alt>
						</div>
						<span class="shot_btn bg-blue fc-white fw-6" v-if="authText">拍摄正面</span>
						<input type="file" :id="photo_list[0].id" class="file_input" @change="imports(0)" w>
					</a>
					<a href="javascript:;" class="shot_id_item p-r">
						<div class="shot_img">
							<img :src="photo_list[1].photo" alt>
						</div>
						<span class="shot_btn bg-blue fc-white fw-6" v-if="authText">拍摄反面</span>
						<input type="file" :id="photo_list[1].id" class="file_input" @change="imports(1)" v-if="authSubmitButton">
					</a>
				</li>
				<li>
					<span slot="left" class="auth_id_title">拍摄身份证要求:</span>
				</li>
				<li>
					<span slot="left" class="fc-gray fs-3 fw-6">大陆公民持有的本人有效二代身份证;</span>
				</li>
				<li>
					<span slot="left" class="auth_id_title">
						<span class="fc-gray fs-3">拍摄时确保身份证</span>
						<span class="fc-red">边框完整</span>,
						<span class="fc-red">字体清晰</span>,
						<span class="fc-red">亮度均匀</span>;
					</span>
				</li>
				<li class="img_list">
					<div class="img_item" v-for="(tmp,i) in pageInfo.imgList" :key="i">
						<img :src="tmp.logo" alt class="list_logo">
						<span class="list_title fc-gray">{{tmp.title}}</span>
					</div>
				</li>
			</ul>
		</div>
		<a href="javascript:;" class="auth_btn btn-c bg-blue mt-2" @click.prevent="release()" v-if="authSubmitButton">
			<span class="fc-white fw-6 fm-2">身份认证</span>
		</a>
		<self-alert-box></self-alert-box>
	</div>
</template>

<script>
const AlertBox = ()=>import("../sub/alert_messagebox");
export default {
	data() {
		return {
			pageInfo: {
				header_title: "个人认证",
				token: "",
				imgList: [{
						title: "标准",
						logo: "./static/imgs/renzheng/personal/pid_logo3.png"
					},
					{
						title: "边框缺失",
						logo: "./static/imgs/renzheng/personal/pid_logo4.png"
					},
					{
						title: "边框缺失",
						logo: "./static/imgs/renzheng/personal/pid_logo5.png"
					},
					{
						title: "闪光强烈",
						logo: "./static/imgs/renzheng/personal/pid_logo6.png"
					}
				]
			},
			rid: null,
			status: null,
			authSubmitButton: false,
			authText: false,
			photo_list: [{
					id: "files1",
					photo: "./static/imgs/renzheng/personal/pid_logo1.png"
				},
				{
					id: "files2",
					photo: "./static/imgs/renzheng/personal/pid_logo1.png"
				}
			],
			upload_file_list: ["", ""]
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 1
		});
		this.init();
	},

	beforeRouteLeave(to, from, next) {
		if (to.path == "/newusercenter") {
			to.meta.keepAlive = false;
		}
		next();
	},
	methods: {
		init() {
			this.getPageInfo();
			// 获取菜单数据
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},
		getPageInfo() {
			var token = this.getToken();
			this.pageInfo.token = token;
			this.rid = parseInt(this.getParams().rid);
			this.status = parseInt(this.getParams().status);
			if (this.status == 0) {
				this.authSubmitButton = true;
				this.authText = true;
			} else {
				this.getAuthInfo(token, this.rid);
			}
		},
		//获取认证信息
		getAuthInfo(token, type) {
			var Ext = this.getCache("userInfoExt", 2);
			var value = Ext.userAuth;
			this.photo_list[0].photo = value.idCard;
			this.photo_list[1].photo = value.idCards;

			if (value) {
				if (this.status == -1) {
					this._alert("您的认证信息正在审核中...");
					this.authSubmitButton = false;
					this.authText = true;
				} else if (this.status == 1) {
					this._msg(value.reason);
					this.authSubmitButton = false;
					this.authText = false;
				}
			}
		},
		//上传图片
		imports(i) {
			var id = this.photo_list[i].id;
			var token = this.pageInfo.token;
			var that = this;
			var selectedFile = document.getElementById(`${id}`).files[0]; //获取读取的File对象
			var name = selectedFile.name; //读取选中文件的文件名
			var file_type = name.split(".")[1];
			var size = selectedFile.size; //读取选中文件的大小

			var reader = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
			reader.readAsDataURL(selectedFile); //读取文件的内容

			reader.onload = function(e) {
				// console.log(this.result); //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
				var f = this.result;
				that.photo_list[i].photo = f;
				that.upload(f, file_type, i);
			};
		},
		upload(x, y, i) {
			var token = this.pageInfo.token;
			var url = this.Global.baseURL + "/Tools-uploadsFileBs64.jsp";
			var params = {
				token,
				baseFile: x,
				suffix: y
			};
			this.$dialog.loading.open("正在提交请稍后...");
			this.axios.post(url, params).then(res => {
				if (res.data.status == 1) {
					this.upload_file_list[i] = res.data.data.dir;
					this.$dialog.loading.close();
					// this.$dialog.toast({
					//   mes: res.data.info,
					//   timeout: 1000,
					//   icon: res.data.msg
					// });
				} else {
					this.$dialog.loading.close();
					this.$dialog.toast({
						mes: res.data.info,
						timeout: 1000,
						icon: "error"
					});
				}
			});
		},

		release() {
			if (this.status == 2) {
				return;
			}
			var token = this.pageInfo.token;
			var url = this.Global.baseURL + "/Approval-addAuthentication.jsp";
			var idCard = this.upload_file_list[0];
			if (!idCard) {
				idCard = this.regSplic(this.photo_list[0].photo, 1);
			}
			var idCards = this.upload_file_list[1];
			if (!idCards) {
				idCards = this.regSplic(this.photo_list[1].photo, 1);
			}
			if (!idCard) {
				this.$dialog.toast({
					mes: "请上传身份证正面照"
				});
				return;
			}
			if (!idCards) {
				this.$dialog.toast({
					mes: "请上传身份证发面照"
				});
				return;
			}
			var params = {
				token,
				idCard,
				idCards
			};
			this.$dialog.loading.open("正在认证请稍后...");
			this.axios
				.post(url, params)
				.then(res => {
					// console.log(res.data);
					if (res.data.status == 1) {
						this.$dialog.loading.close();
						this.$dialog.toast({
							mes: res.data.info,
							timeout: 1500,
							icon: res.data.msg
						});
						setTimeout(() => {
							this.$router.push("/newusercenter");
						}, 1600);
					} else {
						this.$dialog.loading.close();
						if (res.data.code == "-1") {
							setTimeout(() => {
								this.$router.push("/login");
							}, 300);
						}
					}
				})
				.catch(err => {
					this.$dialog.loading.close();
					this.$dialog.toast({
						mes: "网络故障请重试...",
						timeout: 1500,
						icon: "error"
					});
					console.error(err);
				});
		},

		regSplic(str, index) { //去除域名
			var url = str;
			var reg = /.com/g
			var newStr = url.split(reg)[1];
			if (index == 1) {
				return newStr.substring(1);
			} else {
				return newStr;
			}
		}
	},
	components: {
		"self-alert-box": AlertBox
	}
};
</script>
<style lang="scss">
	input.file_input {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		opacity: 0;
	}
</style>
