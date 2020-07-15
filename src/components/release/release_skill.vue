<template>
	<div class="release_skill w-100">
		<!-- <header class="release_skill_header bg-gray w-100">
				<a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
				<span class="header_title fc-dark">{{pageInfo.header_title}}</span>
				<a href="javascript:;" class="last"></a>
			</header>-->
		<!-- <div class="clear-fixed"></div> -->
		<div class="release_skill_group w-100">
			<ul class="data_list w-100">
				<li class="list_item mb-3">
					<a href="javascript:;" class="line_input_item">
						<span class="fw-6 fs-3 fc-dark">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</span>
						<input class="line_input fs-3 fw-6 fc-dark" v-model="skill_title" type="text" placeholder="请输入标题">
					</a>
				</li>
				<li class="list_item" v-for="(item,i) in dataList" :key="i">
					<a href="javascript:;" class="cell_arrow_item" @click="clickHanlder(i)">
						<div class="cell_txt">
							<span class="f-left fs-3 fw-6 fc-dark">{{item.title}}</span>
							<span class="f-right fs-3 fw-6" v-if="i!=3&&i!=4&&i!=5" :class="i==6 && item.data ?'fc-red':'fc-dark'">{{item.data?item.data:'请选择'}}</span>
							<span class="f-right">
								<yd-datetime class="fc-dark fw-6 fs-3" cancel-text="取消" type="date" v-model="item.data" slot="right" v-if="i==3||i==4||i==5"></yd-datetime>
							</span>
						</div>
						<span class="cell_arrow fm-1 fw-6 fc-gray iconfont icon-previewright"></span>
					</a>
				</li>
				<!-- <li class="list_item item_detail">
					<span class="fc-red fw-6 fs-3">
						保证金为双方顺利履约的保障，如一方违约，则双方缴纳的保证
						金归未违约方所有；双方正常履约互评后，保证金原路退回至各
						自余额。
					</span>
				</li> -->
				<li class="list_item item_text bg-white">
					<p class="fw-6 fs-3 fc-dark">服务介绍</p>
					<yd-textarea class="fs-3 fc-dark fw-6" v-model="infos" placeholder="请输入您的服务介绍（15-100字以内）" maxlength="100"></yd-textarea>
				</li>
				<li class="list_item item_photo">
					<p class="fs-3 fc-dark fw-6 mt-1 mb-2">添加图片</p>
					<div class="photo_container w-100" id="import">
						<a href="javascript:;" class="photos bg-gray mr-2" v-for="(tmp,i) in photoList" :key="i">
							<span class="del-img" v-if="!tmp.code" @click="delImage(i)">
								<span class="iconfont icon-error fc-dark"></span>
							</span>
							<img :src="tmp.logo" alt>
							<input v-if="photoList.length < 4" type="file" :id="'files'+i" class="file_input" @click="do_add()" @change="imports(i)" accept="image/*">
						</a>
					</div>
				</li>
			</ul>
			<a href="javascript:;" class="release_btn bg-blue" @click.prevent="do_release()">
				<span class="fc-white fm-2 fw-6">发布</span>
			</a>
		</div>

		<div class="modal_frame_group w-100">
			<div class="modal_plate w-100" :class="pageInfo.modal_code?'modal_plate_show':'modal_plate_hid'" @click="cancel()"></div>

			<div class="modal_list deslef p-r w-100 bottom-none" :style="modalStyle">
				<ul class="skill_label_group bg-white w-100" style="padding-bottom:50px;">
					<li v-if="load_plate">
						<self-load-plate v-if="load_plate"></self-load-plate>
					</li>
					<li v-for="(item,i) in skill_label_list" :key="i">
						<p class="label_title mb-3 fm-1 fw-6 fc-dark">{{item.name}}</p>
						<div class="label_container w-100">
							<a href="javascript:;" v-for="(tmp,j) in item.findMenus" :key="j" class="pt-2 pb-2 pl-4 pr-4 mb-5 mr-4" :class="tmp.code ? 'bg-blue ':'bg-darkGray'" @click="select_skill_label(i,j)">
								<span class="fs-3 fw-6" :class="tmp.code ? 'fc-white':'fc-dark'">{{tmp.name}}</span>
							</a>
						</div>
					</li>
				</ul>
				<div class="skill_btn_group p-a shadow-dark w-100">
					<a href="javascript:;" class="bg-white" @click="btn_reset()">
						<span class="fm-1 fw-6 fc-dark">重置</span>
					</a>
					<a href="javascript:;" class="bg-blue" @click="btn_done()">
						<span class="fm-1 fw-6 fc-white">确定</span>
					</a>
				</div>
				<div class="modal_alert p-a" v-if="pageInfo.modal_alert_code">
					<span class="fc-white fw-6 fm-1">最多选则三个标签</span>
				</div>
			</div>
		</div>
		<!-- 底部模态框 -->
		<div class="modal_frame_group w-100">
			<div class="modal_plate w-100" :class="pageInfo.modalShow?'modal_plate_show':'modal_plate_hid'" @click="cancel()">
				<div class="modal_list w-100" :class="pageInfo.modalShow ?'modal_up' : 'modal_down'">
					<ul class="data_list bg-white w-100" :style="autoHeight">
						<li class="list_item w-100" v-for="(tmp,i) in pageInfo.modal_list" :key="i">
							<a href="javascript:;" class="item w-100" @click="select_value(tmp.value)">
								<span class="fc-blue fw-6 fm-1">{{tmp.value}}</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- //  调用组件 -->
		<!-- <self-modal-frame
				:modalShow="pageInfo.modalShow"
				:dataList="pageInfo.modal_list"
				@callBack="select_value"
			></self-modal-frame> -->
	</div>
</template>
<script>
const LoadPlate = ()=>import("../sub/load_data_plate");
const ModalFrame = ()=>import("../sub/modal_frame");
export default {
	data() {
		return {
			pageInfo: {
				header_title: "发布技能",
				token: "",
				modalShow: false,
				modal_code: false,
				modal_alert_code: false,
				modal_list: [{
					value: "线上服务"
				}, {
					value: "线下服务"
				}]
			},
			dataList: [{
					title: "技能分类",
					data: "请选择分类",
					url: "/demand_group/2"
				},
				{
					title: "技能标签",
					data: "请选择标签"
				},
				{
					title: "服务时间",
					url: "/service_time/skill",
					data: "请选择服务时间"
				},
				{
					title: "信息有效期",
					data: ""
				},
				{
					title: "工作开始时间",
					data: ""
				},
				{
					title: "工作截止时间",
					data: ""
				},
				{
					title: "服务酬金",
					url: "/salary_editor/skill",
					data: "请选择"
				},
				{
					title: "服务类型",
					data: "线上服务"
				}
			],
			isPoshCode: true, //技能单个状态
			load_plate: false,
			label_code: null,
			skill_data: [],
			skill_label_list: [],
			select_label_list: [],
			skill_title: null,
			skill_type: 1,
			skillType: "16,17,18",
			skillsTags: "26,25,24",
			yesTime: "",
			startTime: "",
			endTime: "",
			serviceTime: "请选择服务时间",
			price: "111/个",
			fwtype: "线上服务",
			infos: null,
			time_code: false,
			isUpImgCode: true,
			photo_count: 1,
			photoList: [{
					logo: "static/imgs/add-pic.png",
					code: "val"
				}
				// {
				//   logo: "http://static.sxtian.com/imgs/renzheng/personal/pid_logo1.png"
				// }
			],
			obj: {
				id: "",
				label: "",
				row: "",
				column: ""
			},
			autoHeight: {
				height: true,
				overflow: true
			},
			modalStyle: { //样式绑定
				bottom: true,
				height: true
			}
		};
	},

	mounted() {
		$(".modal_list.deslef").css("height", `${500}px`);

		$(".header_left")
			.attr("href", "javascript:;")
			.click(() => {
				this.exit_btn();
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

	updated() {
		this.autoSizeModel()
	},

	destroyed() {
		// this.delSelectData();
		$(".header_left")
			.attr("href", "javascript:history.go(-1)")
			.unbind("click");
	},

	methods: {
		init() {
			this.pageInfo.token = this.getToken();
			this.getDates();
			this.getPageInfo();
			this.__Sleep(e => {
				this.selfMainLoadClosed();
				this._closeAll();
			}, 1000);
		},

		autoSizeModel() {
			var len = this.pageInfo.modal_list.length;
			if (len <= 4) {
				this.autoHeight.height = "auto";
				this.autoHeight.overflow = "hidden";
			} else {
				this.autoHeight.height = "13.5rem";
				this.autoHeight.overflow = "auto";
			}
		},

		select_value(value) {
			// this._log(value)
			this.dataList[7].data = value;
			this.fwtype = value;
			this.pageInfo.modalShow = false;
		},

		getSkillLabelList() {
			var token = this.pageInfo.token;
			var types = this.skill_type;
			var params = {
				token,
				types
			};
			var info = this.getSelectData();
			// var url = "Label-getListSkill";
			var url = "Label-getListData";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					var data = res.data;
					var list = this.select_label_list;
					for (var fis = 0; fis < data.length; fis++) {
						var i_data = data[fis];
						var i_key = i_data.id;
						for (var fiss = 0; fiss < data[fis].findMenus.length; fiss++) {
							if (fiss == 0) {
								var j_data = i_data.findMenus[fiss];
								list[i_key] = j_data;
								data[fis].findMenus[fiss].code = true;
							} else {
								data[fis].findMenus[fiss].code = false;
							}
						}
					}
					this.skill_label_list = data;
					this._log(list);
				}
			});
		},

		getDates() {
			var url = "Tools-timeStamp";
			this.__initAction(url, {}, (res, s) => {
				if (s == 1) {
					// data.yesTime = res.data.currentTime;
					// data.startTime = res.data.workTime;
					// data.endTime = res.data.endTime;
					this.dataList[3].data = res.data.currentTime;
					this.dataList[4].data = res.data.workTime;
					this.dataList[5].data = res.data.endTime;
				}
			});
		},

		getPageInfo() {
			this.getSkillLabelList();
			var info = this.getSelectData();
			if (!info) {
				//若本地无缓存则创建缓存对象
				info = {
					skill: {}
				};
			}
			var data = info.skill;
			if (data) {
				//处理兼职数据
				if (info.data) {
					var value = info.data.data1;
					if (value) {
						var str = "";
						this.skillType = "";
						for (let i of value) {
							//循环拼接兼职分类项 （ **-**-**- ）
							str += i.label + "-";
							this.skillType += i.id + ",";
						}
						this.skillType = this.skillType.substring(
							0,
							this.skillType.length - 1
						);
						if (value.length == 3) {
							var s = str.substring(0, str.length - 1);
							var newS = s.substr(0, 9);
							this.dataList[0].data = `${newS}...`;

						} else {
							this.dataList[0].data = str + "暂无分类";
						}
					} else {
						this.dataList[0].data = "请选择分类";
					}
				}
				// 处理岗位标签
				var label_list = data.label_list;
				var dataLabel = "";
				var strs = "";
				if (label_list) {
					if (label_list.length > 0) {
						for (var i = 0; i < label_list.length; i++) {
							if (label_list[i]) {
								dataLabel += label_list[i].id + ",";
								strs += label_list[i].name + '/';
							}
						}
						// dataLabel   岗位标签id
						var newStrs;
						if (strs.length > 0) {
							newStrs = strs.substr(0, 9);
						}
						this.dataList[1].data = `${newStrs}`;
					} else {
						this.dataList[1].data = "请选择标签";
					}
				}

				//处理服务时间
				var serviceTime = data.serviceTime;
				if (serviceTime) {
					var str = "";
					for (var i = 0; i < serviceTime.length; i++) {
						if (i == serviceTime.length - 1) {
							str += serviceTime[i].title;
						} else {
							str += serviceTime[i].title + ",";
						}
					}
					var newStr = str.substr(0, 9);
					this.serviceTime = str;
					this.dataList[2].data = `${newStr}...`;
				}else{
					this.serviceTime = "";
				}

				//处理默认时间
				// var time = this.getDates();
				// if (time) {
				//   this.dataList[3].data = time.yesTime;
				//   this.dataList[4].data = time.startTime;
				//   this.dataList[5].data = time.endTime;
				// }

				//处理工资
				var salary = data.salary_data;
				if (salary) {
					var ipos = salary.indexOf("元");
					var ipos1 = salary.substring(0,ipos); //取前部分
					var ipos2 = salary.substring(ipos+2,salary.length); //取后部分
					var ipos3 = `${ipos1}|${ipos2}`;
					this.price = ipos3;
					this.dataList[6].data = salary;
				}
				//处理描述信息
				var text = data.infos;
				if (text) {
					this.infos = text;
				}
				//处理标题
				var title = data.title;
				if (title) {
					this.skill_title = title;
				}
			}
		},

		clickHanlder(x) {
			var list = this.dataList;
			this.time_code = true;
			if (list[x].url) {
				this.$router.push(list[x].url);
			} else if (x == 1) {
				this.pageInfo.modal_code = true;
			} else if (x == 7) {
				this.pageInfo.modalShow = true;
			}
		},

		imports(i) { //发布图片
			if (this.photo_count == 4) {
				return;
			}
			var id = "files" + i;
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
				var list = that.photoList;
				var len = list.length;
				if (that.photo_count == 5) {
					return;
				} else {
					that.photo_count++;
					var item = {};
					item.logo = f;
					that.photoList.splice(len - 1, 0, item);
					var baseData = e.target.result;
					that.__UploadImg(baseData, file_type, data => {
						that.photoList[i].files = data.dir; //BUG  变量有问题
					});
					// that.upload(f, file_type, i);
					if (that.photoList.length == 4) {
						that.photoList.pop();
						return;
					}
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

		do_add() {
			if (this.photo_count == 5) {
				return;
			}
		},

		select_skill_label(i, j) {
			var list = this.select_label_list;
			var i_data = this.skill_label_list[i];
			var i_key = i_data.id;
			var j_data = i_data.findMenus[j];
			list[i_key] = j_data;
			for (var fis = 0; fis < i_data.findMenus.length; fis++) {
				this.skill_label_list[i].findMenus[fis].code = false;
			}
			this.skill_label_list[i].findMenus[j].code = true;
		},

		cancel() {
			this.pageInfo.modal_code = false;
			this.pageInfo.modalShow = false;
		},

		btn_reset() {
			var list = this.skill_label_list;
			this.select_label_list = [];
			for (let item of list) {
				for (let tmp of item.tagList) {
					if (tmp.code) {
						tmp.code = false;
					}
				}
			}
		},

		btn_done() {
			var list = this.select_label_list;
			var data = "";
			var strs = "";
			if (list.length > 0) {
				for (var i = 0; i < list.length; i++) {
					if (list[i]) {
						data += list[i].id + ",";
						strs += `${list[i].name}/`;
					}
				}
			}
			var info = this.getSelectData();
			if (!info) {
				var info = {};
			}
			if (!info.skill) {
				info.skill = {};
			}
			info.skill.label_list = [];
			info.skill.label_list = list;
			this.setCache("select_data", JSON.stringify(info));
			if (data) {
				var newStrs = strs.substr(0, 9);
				// this.dataList[1].data = `已选择`;
				this.dataList[1].data = `${newStrs}...`;
			} else {
				this.dataList[1].data = "请选择标签";
			}
			this.pageInfo.modal_code = false;
		},

		save_skill_title() {
			var title = this.skill_title;
			if (title.trim()) {
				var info = this.getSelectData();
				if (!info) info = {};
				if (!info.skill) info.skill = {};
				info.skill.title = "";
				info.skill.title = title;
				this.setCache("select_data", JSON.stringify(info));
			}
		},

		save_skill_infos() {
			var text = this.infos;
			if (text.trim()) {
				var info = this.getSelectData();
				if (!info) info = {};
				if (!info.skill) info.skill = {};
				info.skill.infos = "";
				info.skill.infos = text;
				var select_data = JSON.stringify(info);
				this.setCache("select_data", select_data);
			}
		},

		do_release() {
			var token = this.pageInfo.token;
			var title = this.skill_title;
			var yesTime = this.yesTime;
			var startTime = this.startTime;
			var endTime = this.endTime;
			var price = this.price;
			var infos = this.infos;
			try {
				var lon = this.getUserInfo().location.lon;
				var lat = this.getUserInfo().location.lat;
			} catch (e) {
				console.log("重新获取经纬度");
			} finally {
				var lon = this.getCache("location", 2).lon;
				var lat = this.getCache("location", 2).lat;
			}
			var skillType = this.skillType;

			var lists = this.select_label_list
			var str = "";
			for (let item of lists) {
				if (item && item.id && item.id > 0) {
					str += `${item.id},`;
				}
			}
			var skillsTags = str.substr(0, str.length - 1);
			var serviceTime = this.serviceTime;
			var fwtype = this.fwtype;
			var images = this.handleImage();
			if (!title) {
				this.$dialog.toast({
					mes: "发布标题不能为空...",
					timeout: 1500
				});
				return;
			}

			if (this.dataList[0].data == "请选择分类") {
				this.$dialog.toast({
					mes: "分类不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!skillType) {
				this.$dialog.toast({
					mes: "技能分类不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!skillsTags) {
				this.$dialog.toast({
					mes: "技能标签不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!serviceTime.length) {
				this.$dialog.toast({
					mes: "服务时间不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!yesTime) {
				this.$dialog.toast({
					mes: "效期时间不能为空...",
					timeout: 1500
				});
				return;
			}
			if (!startTime) {
				this.$dialog.toast({
					mes: "开始时间不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!endTime) {
				this.$dialog.toast({
					mes: "结束时间不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!price) {
				this.$dialog.toast({
					mes: "服务酬金不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!fwtype) {
				this.$dialog.toast({
					mes: "服务类型不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!infos) {
				this.$dialog.toast({
					mes: "服务介绍不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!images) {
				this.$dialog.toast({
					mes: "请上传图片",
					timeout: 1500
				});
				return;
			}

			var params = {
				token,
				title,
				yesTime,
				startTime,
				serviceTime,
				endTime,
				skillType,
				skillsTags,
				images,
				infos,
				price,
				lon,
				lat,
				fwtype
			};

			var url = "Skills-addMemberSkills";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					var info = this.getSelectData();
					if (info.data) {
						this.infos = '';
						this.skill_title = '';
						info.skill.infos = {};
						info.skill.title = {};
						info = info.skill;
						this.setCache("select_data", JSON.stringify(info));
						this.dataList[0].data = "请选择分类";
					}
					this._msg(res.info);
					// this.getPageInfo();
					setTimeout(() => {
						this.$router.back(-1);
					}, 500);
				} else {
					this._msg(res.info);
				}
			});
		},

		exit_btn() {
			setTimeout(() => {
				window.history.go(-1);
			}, 300);
		},

		delSelectData() {
			this.infos = "";
			var info = this.getSelectData();
			if (info.demand) {
				// info.data = {};
				// info.skill = {};
				var select_data = JSON.stringify(info);
				this.setCache("select_data", select_data);
			}
		},

		delImage(i) { //删除已选中的图片
			var arr = this.photoList;
			arr.splice(i, 1);
			this.photo_count--;
			// var isCode = true;
			if (arr.length == 2 && this.isUpImgCode && arr[arr.length - 1].files) {
				this.isUpImgCode = false;
				// setTimeout(() => {
				//   this.isUpImgCode = true;
				// },1000);
				var obj = {
					logo: "http://static.sxtian.com/imgs/add-pic.png",
					code: "val"
				};
				this.photoList.push(obj);
			} else {
				this.isUpImgCode = true;
			}
		}
	},

	watch: {
		time1(val, oldVal) {
			this.yesTime = val;
			var info = this.getSelectData();
			if (!info) {
				info = {};
			}
			if (!info.skill) {
				info.skill = {};
			}
			if (!info.skill.time) {
				info.skill.time = {};
			}
			info.skill.time.yesTime = "";
			info.skill.time.yesTime = val;
			var select_data = JSON.stringify(info);
			this.setCache("select_data", select_data);
		},

		time2(val, oldVal) {
			this.startTime = val;
			var info = this.getSelectData();
			if (!info) {
				info = {};
			}
			if (!info.skill) {
				info.skill = {};
			}
			if (!info.skill.time) {
				info.skill.time = {};
			}
			info.skill.time.startTime = "";
			info.skill.time.startTime = val;
			var select_data = JSON.stringify(info);
			this.setCache("select_data", select_data);
		},

		time3(val, oldVal) {
			this.endTime = val;
			var info = this.getSelectData();
			if (!info) {
				info = {};
			}
			if (!info.skill) {
				info.skill = {};
			}
			if (!info.skill.time) {
				info.skill.time = {};
			}
			info.skill.time.endTime = "";
			info.skill.time.endTime = val;
			var select_data = JSON.stringify(info);
			this.setCache("select_data", select_data);
		},

		infos() {
			this.save_skill_infos();
		},

		skill_title() {
			this.save_skill_title();
		},

		modalComput() {
			if (this.pageInfo.modal_code) {
				this.modalStyle.bottom = `0px`;
			} else {
				this.modalStyle.bottom = `-500px`;
			}
		}
	},

	computed: {
		time1() {
			return this.dataList[3].data;
		},
		time2() {
			return this.dataList[4].data;
		},
		time3() {
			return this.dataList[5].data;
		},
		modalComput() {
			return this.pageInfo.modal_code
		}
	},

	components: {
		"self-modal-frame": ModalFrame, //调用模板组件
		"self-load-plate": LoadPlate
	}
};
</script>
<style lang="scss" scoped>
	.file_input { width: 50px; height: 50px; }
	div.modal_list { padding: 5px 0 0 !important; }
	div.modal_alert { padding: 20px; background: rgba(0, 0, 0, 0.6); top: 20%; left: 30%; display: flex; justify-content: center; align-items: center; border-radius: 5px; }
	.del-img { position: absolute; top: 0; right: 0.1rem; z-index: 100; }
	.release_skill {
		height: calc(100% - 2.8rem); position: relative;
		.bottom-none { bottom: -500px; }
		.modal_frame_group{
			.data_list {
				border-radius: 5px;
				.list_item {
					border: 1px solid #efeff4;
					.item { width: 100%; padding: 10px 0; text-align: center; display: block; }
				}
			}
		}
	}
</style>
