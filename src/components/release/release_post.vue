<template>
	<div class="release_post w-100">
		<!-- <header class="release_post_header bg-gray w-100">
				<a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
				<span class="header_title fc-dark">{{pageInfo.header_title}}</span>
				<a href="javascript:;" class="last"></a>
			</header>-->
		<!-- <div class="clear-fixed"></div> -->
		<div class="release_post_group w-100">
			<ul class="data_list w-100">
				<li class="list_item w-100">
					<a href="javascript:;" class="line_input_item w-100">
						<span class="fw-6 fs-3 fc-dark">发布标题</span>
						<input class="line_input fs-3 fw-6 fc-dark" v-model="post_title" type="text" placeholder="请输入标题">
					</a>
				</li>
				<li class="list_item" v-for="(item,i) in dataList" :key="i">
					<a href="javascript:;" class="item line_arrow_item" @click="clickHanlder(i)">
						<span class="f-left fs-3 fw-6 fc-dark">{{item.title}}</span>
						<span class="item_arrow mt-1 f-right iconfont icon-previewright"></span>
						<span class="f-right fs-3 fw-6" :class="i==3?'fc-red':'fc-dark'">{{item.data ? item.data:'请选择' | addrHandle}}</span>
					</a>
				</li>
				<li class="list_item">
					<a href="javascript:;" class="cell_arrow_item">
						<div class="cell_txt">
							<span class="f-left fs-3 fw-6 fc-dark">面试时间</span>
							<span class="f-right">
								<yd-datetime class="fc-dark fs-3 fw-6" type="time" v-model="end_time"></yd-datetime>
							</span>
							<span class="f-right fc-dark fs-3 fw-6">&nbsp;&nbsp;&nbsp;至&nbsp;&nbsp;&nbsp;</span>
							<span class="f-right">
								<yd-datetime slot="right" class="fc-dark fs-3 fw-6" type="time" v-model="start_time"></yd-datetime>
							</span>
						</div>
						<span class="cell_arrow f-right fm-1 fw-6 fc-gray iconfont icon-previewright"></span>
					</a>
				</li>

				<li class="list_item">
					<a href="javascript:;" class="line_input_item">
						<span class="fs-3 fw-6 fc-dark">招聘人数</span>
						<input type="text" v-model="p_num" class="line_input fs-3 fw-6 fc-dark f-right" placeholder="请填写招聘人数">
					</a>
				</li>
				<li class="list_item item_text mt-3">
					<p class="fw-6 fs-3 fc-dark">岗位描述</p>
					<yd-textarea v-model="infos" class="fs-3 fw-6 fc-dark" placeholder="请输入您的服务介绍（15-100字以内）" maxlength="100"></yd-textarea>
				</li>
			</ul>
			<a href="javascript:;" class="release_btn bg-blue" @click.prevent="do_release()">
				<span class="fc-white fm-2 fw-6">发布</span>
			</a>
		</div>

		<div class="modal_frame_group w-100">
			<div class="modal_plate w-100" :class="pageInfo.modal_code1?'modal_plate_show':'modal_plate_hid'" @click="cancel()"></div>
			<div class="modal_list w-100" :class="pageInfo.modal_code1 ?'modal_up' : 'modal_down'">
				<ul class="data_list bg-white w-100" :style="autoHeight">
					<li class="list_item w-100" v-for="(tmp,i) in pageInfo.modalDataList" :key="i">
						<a href="javascript:;" class="item w-100" @click="select_value(i)">
							<span class="fc-blue fw-6 fm-1">{{tmp}}</span>
						</a>
					</li>
				</ul>
				<!-- <a href="javascript:;" class="cancel_btn bg-white w-100" @click="cancel()">
					<span class="fc-blue fw-7 fm-1">取消</span>
				</a> -->
			</div>
		</div>

		<!-- 底部模态框 -->
		<div class="modal_frame_group w-100">
			<div class="modal_plate w-100" :class="pageInfo.modal_code?'modal_plate_show':'modal_plate_hid'" @click="cancel()"></div>
			<div class="modal_list p-r w-100" :class="pageInfo.modal_code?'modal_up' : 'modal_down'" :style="modalHeight">
				<ul class="skill_label_group bg-white w-100">
					<li v-if="load_plate">
						<self-load-plate v-if="load_plate"></self-load-plate>
					</li>
					<li v-for="(item,i) in post_label_list" :key="i">
						<p class="label_title mb-3 fm-1 fw-6 fc-dark">{{item.name}}</p>
						<div class="label_container w-100">
							<a href="javascript:;" v-for="(tmp,j) in item.findMenus" :key="j" class="pt-2 pb-2 pl-4 pr-4 mb-5 mr-4" :class="tmp.code ? 'bg-blue ':'bg-darkGray'" @click="select_post_label(i,j)">
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
	</div>
</template>
<script>
const ModalFrame = ()=>import("../sub/modal_frame");
const LoadPlate = ()=>import("../sub/load_data_plate");
export default {
	data() {
		return {
			end_time: "18:00",
			start_time: "09:00",
			p_num: 10,
			pageInfo: {
				header_title: "发布岗位",
				modal_code1: false,
				modal_code: false,
				modal_alert_code: false,
				modalDataList: [],
				token: "",
				lng: null,
				lat: null,
				type: 2
			},
			modalHeight: {
				height: true
			},
			index_code: null,
			dataList: [{
					title: "岗位技能",
					url: "/demand_group/3",
					data: "请选择分类"
				},
				{
					title: "岗位标签",
					// url: "/post_label",
					data: "请选择标签"
				},
				{
					title: "工作地点",
					url: "/new_map_group",
					data: ""
				},
				{
					title: "薪资范围",
					label: [],
					data: "请选择",
					type: "salary"
				},
				{
					title: "经验要求",
					label: [],
					data: "请选择",
					type: "experience"
				},
				{
					title: "学历要求",
					label: [],
					data: "请选择",
					type: "education"
				}
			],
			load_plate: false,
			post_label_list: [], //岗位标签列表
			select_label_list: [],
			post_title: null, //岗位标题
			post_data: "",
			demandIds: "10,11,12", //岗位分类
			postTabs: "33,56,45", //岗位标签
			addressId: null,
			salary: null,
			// salary: "3K~5K", //岗位薪资
			// experience: "3年以上", //岗位经验
			experience: null,
			// education: "本科", //岗位学历
			education: null,
			// infos: "测试岗位说明111" //岗位说明
			infos: "",
			autoHeight: {
				height: true,
				overflow: true
			}
		};
	},
	created() {
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 0
		});
		this.getPageInfo();
		this.getPostToastList();
		this.getAddr();
		this.getPostLabeList();
	},

	mounted() {
	},

	updated() {
		//do something after updating vue instance
		this.autoSizeModel();
	},

	destroyed() {
		// this.delSelectAddr();
		// this.delSelectData();
		$(".header_left")
			.attr("href", "javascript:history.go(-1)")
			.unbind("click");
	},

	methods: {

		autoSizeModel() {
			var len = this.pageInfo.modalDataList.length;
			if (len <= 4) {
				this.autoHeight.height = "auto";
				this.autoHeight.overflow = "hidden";
			} else {
				this.autoHeight.height = "13.5rem";
				this.autoHeight.overflow = "auto";
			}
		},

		delSelectAddr() {
			var info = this.getSelectData();
			if (info.select_addr) {
				info.select_addr = {};
				this.setCache("select_data", JSON.stringify(info));
			}
		},

		getAddr() { //获取地址
			var info = this.getSelectData();
			if (!info) {
				info = {};
			}
			if (info.select_addr) {
				var value = info.select_addr;
				this.dataList[2].data = value.addr;
				this.pageInfo.lng = value.point.lng;
				this.pageInfo.lat = value.point.lat;
			} else {
				var info1 = this.getCache("location", 2);
				this.dataList[2].data = info1.address;
				this.pageInfo.lng = info1.lon;
				this.pageInfo.lat = info1.lat;
			}
		},

		getPostToastList() {
			var token = this.getToken();
			var url = "Tools-getConfigData";
			this.__initAction(url, {
				token
			}, (res, s) => {
				if (s == 1) {
					var data = res.data.getList;
					console.log(data)
					var salary = data.salary.value;
					this.dataList[3].label = salary;
					var experience = data.experience.value;
					this.dataList[4].label = experience;
					var education = data.education.value;
					this.dataList[5].label = education;
				}
			});
		},

		getPostLabeList() {
			var token = this.pageInfo.token;
			var types = this.pageInfo.type;
			var params = {
				token,
				types
			};
			var url = "Label-getListData";
			var info = this.getSelectData();
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
					this.post_label_list = data;
					this._log(list);
				}
			});
		},

		getPageInfo() {
			this.pageInfo.token = this.getToken();
			var info = this.getSelectData();
			if (!info) {
				//若本地无缓存则创建缓存对象
				info = {
					post: {
						salary: null
					}
				};
			}
			//处理类别
			var data = info;

			if (data) {

				if (info.data) {
					var value = info.data.data1;
					if (value) {
						var str = "";
						this.demandIds = "";
						for (let i of value) {
							str += i.label + "-";
							this.demandIds += i.id + ",";
						}
						this.demandIds = this.demandIds.substring(
							0,
							this.demandIds.length - 1
						);
						if (value.length == 3) {
							var s = str.substring(0, str.length - 1);
							this.dataList[0].data = s;
						} else {
							this.dataList[0].data = str + "暂无分类";
						}
					}
				} else {
					this.dataList[0].data = "请选择分类";
				}


				if (data.post) {

					// 处理岗位标签
					var label_list = data.post.label_list;
					var dataLabel = "";
					if (label_list) {
						if (label_list.length > 0) {
							for (var i = 0; i < label_list.length; i++) {
								if (label_list[i]) {
									dataLabel += label_list[i].id + ",";
								}
							}
							// dataLabel   岗位标签id
							this.dataList[1].data = "已选择";
						} else {
							this.dataList[1].data = "请选择标签";
						}
					};

					//处理薪资
					var salary = data.post.salary;
					if (salary) {
						var ipos = salary.indexOf("元/");
						var ipos1 = salary.substring(0,ipos); //取前部分
						var ipos2 = salary.substring(ipos+2,salary.length); //取后部分
						var ipos3 = `${ipos1}|${ipos2}`;
						this.price = ipos3;
						this.dataList[3].data = salary;
					}

					//处理经验
					var experience = data.post.experience;
					if (experience) {
						this.dataList[4].data = experience;
					}

					//处理工作年限
					var education = data.post.education;
					if (education) {
						this.dataList[5].data = education;
					}

					//处理地址
					var addr_data = data.select_addr;
					if (addr_data) {
						this.pageInfo.lat = addr_data.point.lat;
						this.pageInfo.lng = addr_data.point.lng;
						var addr = addr_data.addr;
						this.dataList[2].data = addr;
					}

					//处理信息描述
					var text = data.post.infos;
					if (text) {
						this.infos = text;
					}

					//处理标题
					var title = data.post.title;
					if (title) {
						this.post_title = title;
					}
				}
			}
		},

		clickHanlder(x) {
			this.index_code = x;
			var list = this.dataList;
			if (list[x].url) {
				this.$router.push(list[x].url);
			} else {
				if (x == 1) {
					this.modalHeight.height = "486.6px";
					this.pageInfo.modal_code = true;
				} else {
					this.pageInfo.modal_code1 = true;
					this.pageInfo.modalDataList = list[x].label;
				}
			}
		},

		cancel() {
			this.pageInfo.modal_code = false;
			this.pageInfo.modal_code1 = false;
		},

		select_value(i) { //选择岗位薪资
			var code = this.index_code;
			this.dataList[code].data = this.pageInfo.modalDataList[i];
			var info = this.getSelectData();
			var type = this.dataList[code].type;
			if (!info) {
				info = {};
			}
			if (!info.post) {
				info.post = {};
			}
			info.post[type] = this.pageInfo.modalDataList[i];
			var select_data = JSON.stringify(info);
			this.setCache("select_data", select_data);
			this.pageInfo.modal_code1 = false;
		},

		save_post_title() { //保存标题
			var title = this.post_title;
			if (title.trim()) {
				var info = this.getSelectData();
				if (!info) info = {};
				if (!info.post) info.post = {};
				info.post.title = title;
				this.setCache("select_data", JSON.stringify(info));
			}
		},

		save_post_infos() { //保存岗位说明
			var text = this.infos;
			if (text.trim()) {
				var info = this.getSelectData();
				if (!info) info = {};
				if (!info.post) info.post = {};
				info.post.infos = text;
				var select_data = JSON.stringify(info);
				this.setCache("select_data", select_data);
			}
		},

		select_post_label(i, j) {
			var list = this.select_label_list;
			var i_data = this.post_label_list[i];
			var i_key = i_data.id;
			var j_data = i_data.findMenus[j];
			list[i_key] = j_data;
			for (var fis = 0; fis < i_data.findMenus.length; fis++) {
				this.post_label_list[i].findMenus[fis].code = false;
			}
			this.post_label_list[i].findMenus[j].code = true;
		},

		btn_reset() {
			var list = this.post_label_list;
			this.select_label_list = [];
			for (var fis = 0; fis < list.length; fis++) {
				for (var fiss = 0; fiss < list[fis].findMenus.length; fiss++) {
					if (fiss == 0) {
						list[fis].findMenus[fiss].code = true;
					} else {
						list[fis].findMenus[fiss].code = false;
					}
				}
			}
		},

		btn_done() {
			var list = this.select_label_list;
			var data = "";
			if (list.length > 0) {
				for (var i = 0; i < list.length; i++) {
					if (list[i]) {
						data += list[i].id + ",";
					}
					// if (i == list.length - 1) {
					//
					// } else {
					// data += list[i].id + " / ";
					// }
				}
			}
			this._log(data);
			var info = this.getSelectData();
			if (!info) {
				var info = {};
			}
			if (!info.post) {
				info.post = {};
			}
			info.post.label_list = [];
			info.post.label_list = list;
			this.setCache("select_data", JSON.stringify(info));
			if (data) {
				this.dataList[1].data = "已选择";
			} else {
				this.dataList[1].data = "请选择标签";
			}
			this.pageInfo.modal_code = false;
		},

		exit_btn() {
			setTimeout(() => {
				window.history.go(-1);
			}, 300);
		},

		do_release() { //发布事件
			var token = this.pageInfo.token;
			var title = this.post_title;
			var quartersType = this.demandIds;
			var quartersTags = this.postTabs;
			var education = this.education;
			var exp = this.experience;
			var prices = this.salary;
			var infos = this.infos;
			var lon = this.pageInfo.lng;
			var lat = this.pageInfo.lat;
			var start_time = this.start_time;
			var end_time = this.end_time;
			var mstime = "";
			mstime = start_time + "-" + end_time;
			var number = this.p_num;
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

			if (!quartersType) {
				this.$dialog.toast({
					mes: "分类不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!quartersTags) {
				this.$dialog.toast({
					mes: "岗位标签不能为空...",
					timeout: 1500
				});
				return;
			}

			if (quartersTags == "请选择标签") {
				this.$dialog.toast({
					mes: "岗位标签不能为空...",
					timeout: 1500
				});
				return;
			}

			// if (!addressId) {
			//   this.$dialog.toast({
			//     mes: "工作地点不能为空...",
			//     timeout: 1500
			//   });
			//   return;
			// }

			if (!prices) {
				this.$dialog.toast({
					mes: "薪资范围不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!exp) {
				this.$dialog.toast({
					mes: "经验要求不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!education) {
				this.$dialog.toast({
					mes: "学历要求不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!mstime) {
				this.$dialog.toast({
					mes: "面试时间不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!number) {
				this.$dialog.toast({
					mes: "招聘人数不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!infos) {
				this.$dialog.toast({
					mes: "岗位描述不能为空...",
					timeout: 1500
				});
				return;
			}

			var params = {
				token,
				title,
				quartersTags,
				quartersType,
				infos,
				exp,
				education,
				prices,
				lon,
				lat,
				mstime,
				number
			};
			var url = "Quarters-addMemberQuarters";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					if (res.status == 1) {
						this.infos = "";
						this.post_title = "";
						var info = this.getSelectData();
						if (info.data) {
							info = info.post;
							this.setCache("select_data", JSON.stringify(info));
							this.dataList[0].data = "请选择分类";
						}
						setTimeout(() => {
							this.$router.back(-1);
						}, 500);
						this._msg(res.info);
					} else {
						this._msg(res.info);
					}
				}else {
					this._msg(res.info);
				}
			});





			// this.$dialog.loading.open("正在发布请稍后...");
			// this.axios
			//   .post(url, params)
			//   .then(res => {
			//     this.$dialog.loading.close();
			//     console.log(res.data);
			//     if (res.data.status == 1) {
			//       this.infos = "";
			//       this.post_title = "";
			//       var info = this.getSelectData();
			//       if (info) {
			//         var data = info.post;
			//         if (data) {
			//           info.post = {};
			//           this.setCache(
			//             "select_data",
			//             JSON.stringify(info)
			//           );
			//         }
			//       }

			//       this.selfToast({
			//         mes: res.data.info,
			//         timeout: 1500,
			//         icon: "success"
			//       });
			//     } else {
			//       if (res.data.code == -1) {
			//         this.selfToast({
			//           mes: "登录超时请重试",
			//           timeout: 1500,
			//           icon: "error"
			//         });
			//         setTimeout(() => {
			//           this.$router.push("/login");
			//         }, 1600);
			//       } else {
			//         this.selfToast({
			//           mes: res.data.info,
			//           timeout: 1500,
			//           icon: "error"
			//         });
			//       }
			//     }
			//   })
			//   .catch(err => {
			//     this.$dialog.loading.close();
			//     this.selfToast({
			//       mes: "网络故障请重试",
			//       timeout: 1500,
			//       icon: "error"
			//     });
			//     console.error(err);
			//   });
		},

		delSelectData() {
			this.infos = "";
			var info = this.getSelectData();
			if (info) {
				// info.post = {};
				// info.data = {};
				var select_data = JSON.stringify(info);
				this.setCache("select_data", select_data);
			}
		}

	},
	watch: {
		value1(val, oldVal) {
			this.salary = val;
		},
		value2(val, oldVal) {
			this.experience = val;
		},
		value3(val, oldVal) {
			this.education = val;
		},
		infos() {
			this.save_post_infos();
		},
		post_title() {
			this.save_post_title();
		}
	},

	computed: {
		value1() {
			return this.dataList[3].data;
		},
		value2() {
			return this.dataList[4].data;
		},
		value3() {
			return this.dataList[5].data;
		}
	},

	components: {
		"self-modal-frame": ModalFrame, //调用模板组件
		"self-load-plate": LoadPlate
	}
};
</script>
<style lang="scss">
	.yd-cell-item input { margin-bottom: 0; color: #000; font-size: 14px; font-weight: bold; }
	div.modal_list { padding: 5px 0 0 !important; }
	div.modal_alert { padding: 20px; background: rgba(0, 0, 0, 0.6); top: 20%; left: 30%; display: flex; justify-content: center; align-items: center; border-radius: 5px; }
	.release_post{
		height: calc(100% - 2.8rem);
		.modal_frame_group{
			.cancel_btn { width: 100%; position: absolute; bottom: 0; }
			.data_list { height: 13.5rem; overflow: auto; position: relative; }
		}
	}
</style>
