<template>
	<div class="feedback">
		<div class="mt-3 w-100 bg-white p-4 border-bottom">
			<yd-icon name="feedback" size="1rem" color="#e96900"></yd-icon>
			<span class="fw-6 fs-3">情况说明</span>
		</div>
		<div class="text-content">
			<div class="text-box">
				<textarea maxlength="200" class="text-cell" cols="200" rows="10" placeholder="你的每一个反馈对我们都很重要（篇幅所限制请控制在200字以内）" v-model="textContent"></textarea>
				<p class="f-right fc-gray pr-1">
					<span>{{textNum}}/200</span>
				</p>
			</div>
		</div>
		<!-- 联系方式 -->
		<div class="mt-3 w-100">
			<ul class="tel">
				<li class="tel-item">
					<span class="tel-icon-logo">
						<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5679">
							<path
								d="M825.6 64H198.4A134.4 134.4 0 0 0 64 198.4v627.2A134.4 134.4 0 0 0 198.4 960h627.2a134.4 134.4 0 0 0 134.4-134.4V198.4A134.4 134.4 0 0 0 825.6 64zM166.016 795.584H64.384v-59.776h101.632v59.776z m0-119.52H106.24v-59.776h59.776v59.776z m0-119.552H64.384v-59.776h101.632v59.776z m0-119.552H106.24v-59.776h59.776v59.776z m0-119.52H64.384V257.664h101.632V317.44z m571.232 477.696c-74.304 0-224.928-76.32-297.184-148.576-72.256-72.288-148.608-222.912-148.608-297.184 0 0 56.928-91.712 94.08-91.712s148.608 111.456 111.456 148.608c-37.152 37.12-74.304 37.12-74.304 74.272 0 37.152 37.152 74.272 74.304 111.456 37.152 37.152 74.304 74.304 111.456 74.304s37.152-37.152 74.304-74.304 148.608 74.304 148.608 111.456c-0.032 37.152-94.112 91.68-94.112 91.68z"
								fill p-id="5680"></path>
						</svg>
					</span>
					<span class="fw-6 fs-3">你的联系方式</span>
				</li>
				<li class="tel-item">
					<input type="tel" placeholder="请输入您的联系方式" v-model="phone">
				</li>
			</ul>
		</div>
		<!-- 反馈类型 -->
		<div class="type-calss-box mt-3 w-100">
			<div class="icon-box">
				<span class="tel-icon-logo">
					<svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5719">
						<path
							d="M58.304 754.944c0 116.416 94.4 210.816 210.816 210.816s210.816-94.4 210.816-210.816L479.936 544.128 269.056 544.128C152.64 544.128 58.304 638.528 58.304 754.944zM403.392 754.944c0 74.112-60.288 134.336-134.336 134.336s-134.336-60.288-134.336-134.336 60.288-134.336 134.336-134.336l134.336 0L403.392 754.944zM965.696 269.056c0-116.416-94.4-210.816-210.816-210.816-116.416 0-210.816 94.4-210.816 210.816l0 210.816 210.816 0C871.36 479.872 965.696 385.472 965.696 269.056zM620.544 269.056c0-74.112 60.288-134.336 134.336-134.336s134.336 60.288 134.336 134.336c0 74.112-60.288 134.336-134.336 134.336L620.544 403.392 620.544 269.056zM269.056 479.872l210.816 0L479.872 269.056c0-116.416-94.4-210.816-210.816-210.816-116.416 0-210.816 94.4-210.816 210.816C58.304 385.472 152.64 479.872 269.056 479.872zM269.056 134.72c74.112 0 134.336 60.288 134.336 134.336l0 134.336L269.056 403.392c-74.112 0-134.336-60.288-134.336-134.336C134.72 195.008 195.008 134.72 269.056 134.72zM754.944 544.128 544.128 544.128l0 210.816c0 116.416 94.4 210.816 210.816 210.816 116.416 0 210.816-94.4 210.816-210.816S871.36 544.128 754.944 544.128zM754.944 889.28c-74.112 0-134.336-60.288-134.336-134.336L620.608 620.608l134.336 0c74.112 0 134.336 60.288 134.336 134.336S828.992 889.28 754.944 889.28z"
							p-id="5720"></path>
					</svg>
				</span>
				<span class="fw-6 fs-3">反馈的类型</span>
			</div>
			<div class="pb-6">
				<ul class="type-list">
					<li class="type-box mt-6" v-for="(item,i) of feedbackTypeList" :key="i">
						<a href="javascript:;" class="item-cell fw-6" @click="selectlabel(i)" :class="item.code?'active':''">
							<span v-text="item.name" class></span>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- 上传图片 -->
		<div class="photo-box mt-3">
			<p class="fs-3 fc-dark fw-6 mt-1 mb-2">反馈图片</p>
			<div class="photo_container">
				<a href="javascript:;" class="photos bg-gray mr-2" v-for="(tmp,i) in photoList" :key="i">
					<span class="del-img" v-if="!tmp.code" @click="delImage(i)">
						<span class="iconfont icon-error fc-dark"></span>
					</span>
					<img :src="tmp.logo" alt>
					<input v-if="photo_count < 4" type="file" :id="'files'+i" class="file_input" @click="do_add()" @change="imports(i)" accept="image/*">
				</a>
			</div>
		</div>

		<a href="javascript:;" class="feedback_btn bg-blue w-100 mt-5" @click="do_release()">
			<span class="fc-white fm-2 fw-6">反馈</span>
		</a>
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: "意见反馈"
			},
			textNum: 0, //文本字数
			token: "",
			textContent: "",
			phone: "",
			photoList: [{
				logo: "./static/imgs/add-pic.png",
				code: "val"
			}],
			uploadCode: false,
			isUpImgCode: true,
			ishowFile: true,
			photo_count: 1,
			feedbackTypeList: [],
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.init();
	},
	mounted() {
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 0
		});
	},
	watch: {
		textContent() {
			var len = this.textContent.length;
			if (len <= 200) {
				this.textNum = len;
			} else if (len > 200) {
				this.textNum = 200;
			}
		}
	},
	methods: {
		init() {
			this.getPageInfo();
			this.getDataInfo();
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},

		getPageInfo() {
			this.token = this.getToken();
		},

		getDataInfo() {
			var url = "Tools-getConfigData";
			var token = this.token;
			this.__initAction(url, {
				token
			}, (res, s) => {
				console.log(res)
				if (s == 1) {
					var data = res.data.getList.feedback.value;
					var arr = [];
					for (var key in data) {
						arr[key] = {};
						arr[key].name = data[key];
						arr[key].code = false;
					};
					this.feedbackTypeList = arr;
					this.feedbackTypeList[0].code = true;
				}
			})
		},

		selectlabel(index) {
			var name = this.feedbackTypeList[index].name;
			this.feedbackTypeList[index].code = !this.feedbackTypeList[index].code;
		},

		imports(i) {
			if (this.photo_count == 4) {
				return;
			}
			var id = "files" + i;
			var that = this;
			var selectedFile = document.getElementById(`${id}`).files[0]; //获取读取的File对象
			if (!selectedFile) {
				this._msg("请选择图片");
				return;
			}
			var name = selectedFile.name; //读取选中文件的文件名
			var file_type = name.split(".")[1]; //获取后缀
			var size = selectedFile.size; //读取选中文件的大小

			var reader = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
			reader.readAsDataURL(selectedFile); //读取文件的内容
			reader.onload = function(e) {
				// console.log(this.result); //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
				var f = this.result;
				var list = that.photoList;
				var len = list.length;
				that.photo_count++;
				var item = {};
				item.logo = f;
				// item.code = i;
				that.photoList.splice(len - 1, 0, item);
				var baseData = e.target.result;
				that.__UploadImg(baseData, file_type, data => {
					that.photoList[i].files = data.dir; //BUG  变量有问题
				});
				if (that.photoList.length == 4) {
					that.photoList.pop();
					return;
				}
			};
		},

		handleImage() {
			var data = this.photoList;
			var len = data.len;
			var str = "";
			for (var key in data) {
				var f = data[key].files
				if (f) {
					str += `${data[key].files}|`
				}
			}
			if (str) {
				return str.substr(0, str.lastIndexOf("|"));
			} else {
				return null;
			}
		},

		do_release() { //提交
			var url = "Feedback-addFeedback";
			var token = this.token;
			var content = this.textContent;
			var phone = this.phone;
			var images = this.handleImage();
			var label = "";
			//获得所有选中标签
			var list = this.feedbackTypeList
			for (let it of list) { //遍历标签列表，code == true 为选中标签
				if (it.code === true && it.code) {
					label += `${it.name}|`;
				}
			}
			label = label.substr(0, label.lastIndexOf("|"));
			var params = {
				token,
				label,
				phone,
				content,
				images
			};
			if (!content) {
				this._msg("请输入反馈内容");
				return;
			}

			if (!phone) {
				this._msg("请输入您的联系方式");
				return;
			}

			if (!label) {
				this._msg("反馈类别不能为空");
				return;
			}

			if (!images) {
				this._msg("上传图片不能为空");
				return
			}

			var params = {
				token,
				label,
				phone,
				content,
				images
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					this.textContent = "";
					this.phone = ""
					this.photoList = [{
						logo: "./static/imgs/add-pic.png",
						code: "val"
					}],
					this._msg(res.info);
					//初始选中状态
					var list = this.feedbackTypeList
					for (let it of list) {
						it.code = false
					};
					list[0].code = true;
					setTimeout(() => {
						this.$router.push("/newUserCenter");
					}, 1000);
				}
			})
		},

		do_add() {
			$(".file_input").change();
			// this.ishowFile = false;
			if (this.photo_count == 5) {
				return;
			}
		},
		//删除已选中的图片
		delImage(i) {
			var arr = this.photoList;
			arr.splice(i, 1);
			this.photo_count--;
			// var isCode = true;
			var obj = {
				logo: "./static/imgs/add-pic.png",
				code: "val"
			};
			// for(var i of arr){
			//   if(!i.code){
			//     this.photoList.push(obj);
			//     break;
			//   }
			// }
			if (arr.length == 2 && this.isUpImgCode && arr[arr.length - 1].files) {
				this.isUpImgCode = false;
				// setTimeout(() => {
				//   this.isUpImgCode = true;
				// },1000);
				var obj = {
					logo: "./static/imgs/add-pic.png",
					code: "val"
				};
				this.photoList.push(obj);
			} else {
				this.isUpImgCode = true;
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.yd-textarea > textarea {
		font-size: 1rem;
}
.feedback {
		// margin-bottom: 74px;
		padding-bottom:74px; 
		.text-content {
				width: 100%;
				height: 9rem;
				padding: 10px;
				background: #fff;
				.text-cell {
						width: 100%;
						height: 7rem;
						border: 0;
						font-size: 0.9rem;
				}
		}
		.border-bottom {
				border-bottom: 1px solid #ccc;
				padding: 5xp 15px;
		}
}
.tel {
		width: 100%;
		background-color: #fff;
		padding: 5px 15px;
}
.tel .tel-item {
		width: 100%;
		padding: 5px 0;
}
.tel .tel-item:first-child {
		border-bottom: 1px solid #ccc;
}
.tel .tel-item input {
		padding: 0.5rem 0;
		font-size: 14px;
		font-weight: 600;
		color: #333;
		border: 0;
		outline: none;
}
.tel-icon-logo {
		font-size: 1rem;
		color: #e96900;
}
.type-calss-box {
		background-color: #fff;
}
.icon-box {
		padding: 5px 15px;
}
.type-list {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
		text-align: center;
		align-items: center;
}
.type-box {
		margin-top: 1rem;
		display: inline-block;
		width: 25%;
}
.type-box a {
		width: 100%;
		padding: 0.3rem 1rem;
		border-radius: 44px;
		background-color: #dddddd6e;
}
li.type-box .active {
		background: #2f9bfe;
		color: #fff;
}
.feedback_btn {
		width: 95%;
		height: 44px;
		position: fixed;
		bottom: 0;
		left: 2.5%;
		display: flex;
		justify-content: center;
		margin: 15px auto;
		align-items: center;
		border-radius: 44px;
}
.del-img {
		position: absolute;
		top: 0;
		right: 0.1rem;
		z-index: 100;
}
.feedback .photo-box {
		width: 100%;
		height: 120px;
		background: #fff;
		padding: 15px 17px;
		border-bottom: 1px solid #e7e7e7;
}
.feedback .photo_container {
		display: flex;
		flex-flow: wrap;
		position: relative;
}
.feedback .photo_container .photos {
		width: 60px;
		height: 60px;
		position: relative;
}
.feedback .photo_container .photos img {
		height: 60px;
		width: 60px;
}
.feedback .photo_container .photos .file_input {
		width: 60px;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
}
</style>
