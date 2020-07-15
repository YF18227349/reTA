<template>
	<div class="release_demand w-100">
		<div class="release_demand_group w-100">
			<ul class="data_list w-100">
				<li class="bg-white">
					<a href="javascript:;" class="line_input_item">
						<span class="fs-3 fc-dark fw-6">发布标题</span>
						<input class="line_input fs-3 fw-6 fc-dark" v-model="demand_title" type="text" placeholder="请输入标题">
					</a>
				</li>
				<li class="bg-white" v-for="(item,i) in dataList" :key="i">
					<a href="javascript:;" class="cell_arrow_item" @click="clickHanlder(i)">
						<div class="cell_txt">
							<span class="fs-3 fw-6 fc-dark">{{item.title}}</span>
							<span class="fs-3 fw-6 f-right" :class="item.code ?'fc-red':'fc-dark'" v-if="i!=1&&i!=2&&i!=3">{{item.data ? item.data:'请选择' | addrHandle }}</span>
							<span class="f-right" v-if="i==1||i==2||i==3">
								<yd-datetime class="fc-dark fw-6 fs-3" cancel-text="取消" type="date" v-model="item.data"></yd-datetime>
							</span>
						</div>
						<span class="cell_arrow f-right fm-1 fw-6 fc-gray iconfont icon-previewright"></span>
					</a>
				</li>
				<!-- <li class="list_item" v-for="(item,i) in dataList" :key="i">
						<a href="javascript:;" class="item" @click="clickHanlder(i)">
							<span>{{item.title}}</span>
							<a href="javascript:;" class="item_date">
								<span v-if="i!=1&&i!=2&&i!=3">{{item.data?item.data:'请选择'}}</span>
								<yd-datetime
									class="fc-dark fs-3"
									cancel-text="取消"
									type="date"
									v-model="item.data"
									slot="right"
									v-if="i==1||i==2||i==3"
								></yd-datetime>
								<span class="iconfont icon-previewright"></span>
							</a>
						</a>
					</li>-->
				<!-- <li class="list_item item_detail">
					<span class="fc-red fw-6 fs-3">
						保证金为双方顺利履约的保障，如一方违约，则双方缴纳的保证
						金归未违约方所有；双方正常履约互评后，保证金原路退回至各
						自余额。
					</span>
				</li> -->
				<li class="list_item item_text mt-3 bg-white">
					<p class="fw-6 fs-3 fc-dark">服务介绍</p>
					<yd-textarea class="fs-3 fw-6 fc-dark font-size-rem" v-model="infos" placeholder="请输入您的服务介绍（15-100字以内）" maxlength="100"></yd-textarea>
				</li>
				<li class="list_item item_photo">
					<p class="fs-3 fc-dark fw-6 mt-1 mb-2">添加图片</p>
					<div class="photo_container">
						<a href="javascript:;" class="photos bg-gray mr-2" v-for="(tmp,i) in photoList" :key="i">
							<span class="del-img" v-if="!tmp.code" @click="delImage(i)">
								<span class="iconfont icon-error fc-dark"></span>
							</span>
							<img :src="tmp.logo" alt>
							<input v-if="photo_count < 4" type="file" :id="'files'+i" class="file_input" @click="do_add()" @change="imports(i)" accept="image/*">
						</a>
					</div>
				</li>
			</ul>
			<a href="javascript:;" class="release_btn bg-blue" @click="do_release()">
				<span class="fc-white fm-2 fw-6">发布</span>
			</a>
		</div>
		<!-- 模态框 -->
		<div class="modal_frame_group w-100">
			<div class="modal_plate w-100" :class="pageInfo.modal_code?'modal_plate_show':'modal_plate_hid'" @click="cancel()"></div>
			<div class="modal_list w-100" :class="pageInfo.modal_code ?'modal_up' : 'modal_down'">
				<ul class="data_list bg-white w-100" :style="autoHeight">
					<li class="list_item w-100" v-for="(tmp,i) in pageInfo.modalDataList" :key="i">
						<a href="javascript:;" class="item w-100" @click="select_value(i)">
							<span class="fc-blue fw-6 fm-1">{{tmp}}</span>
						</a>
					</li>
				</ul>
				<!-- <a href="javascript:;" class="cancel_btn bg-white w-100" @click="cancel()">
					<span class="fc-blue fw-9 fm-1">取消</span>
				</a> -->
			</div>
		</div>
		<div class="map_group w-100" v-if="false">
			<div class="map_box w-100 bg-white">
				<baidu-map class="map" :center="center" :zoom="zoom" @ready="mapHandler" :pinch-to-zoom="true" :auto-resize="true">
					<!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
				</baidu-map>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			center: {
				lng: 0,
				lat: 0
			},
			zoom: 3,
			pageInfo: {
				header_title: "发布兼职",
				token: "",
				modal_code: false,
				modalDataList: [

				],
				lng: 108.953099,
				lat: 34.2778
			},
			dataList: [{
					title: "兼职分类",
					data: "请选择分类",
					url: "/demand_group/1"
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
					title: "服务地址",
					url: "/new_map_group",
					data: ""
				},
				// { title: "地址选择", url: "", data: "" },
				{
					title: "服务酬金",
					url: "/salary_editor/demand",
					data: "请选择",
					code: "red"
				},
				// {
				// 	title: "履约保障金",
				// 	url: "",
				// 	data: "无保证金",
				// 	code: "red"
				// }
			],
			demand_title: null,
			demandIds: "1,2,3", //修改过
			perFormAnce: [],
			demandCmp: [],
			yesTime: "",
			startTime: "",
			endTime: "",
			serviceDatd: "111/日", //修改过
			money: "无保证金", //修改过
			addressId: null,
			infos: null, //修改过
			time_code: false,
			uploadCode: false,
			isUpImgCode: true,
			ishowFile: true,
			photo_count: 1,
			photoList: [{
				logo: "static/imgs/add-pic.png",
				code: "val"
			}],
			autoHeight: {
				height: true,
				overflow: true
			}
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 0
		});
		this.init();
	},
	mounted() {
		// var h = document.documentElement.clientHeight;
		// $(".release_demand_group").css("height", `${h * 0.93}px`);

		$(".header_left")
			.attr("href", "javascript:;")
			.click(() => {
				this.exit_btn();
			});
	},
	updated() {
		//do something after updating vue instance
		this.autoSizeModel()
	},
	destroyed() {
		$(".header_left")
			.attr("href", "javascript:history.go(-1)")
			.unbind("click");
	},

	methods: {

		init() {
			this.getDates();
			this.getPageInfo();
			this.__Sleep(e => {
				this.selfMainLoadClosed();
				this._closeAll();
			}, 1000);
			this.getPerFormAnce(); //getList.perFormAnce.value
		},

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

		getDates() { //获取当前日期
			var url = "Tools-timeStamp";
			this.__initAction(url, {}, (res, s) => {
				if (s == 1) {
					this.dataList[1].data = res.data.currentTime;
					this.dataList[2].data = res.data.workTime;
					this.dataList[3].data = res.data.endTime;
				}
			});
		},

		getPageInfo() {
			this.pageInfo.token = this.getToken();
			var info = this.getSelectData();
			if (!info) {
				//若本地无缓存则创建缓存对象
				info = {
					demand: {}
				};
			}
			var data = info.demand; //发布数据
			if (data) {
				//处理类别数据
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
				// //处理默认时间
				// var time = this.getDates();
				// if (time) {
				//   this.dataList[1].data = time.yesTime;
				//   this.dataList[2].data = time.startTime;
				//   this.dataList[3].data = time.endTime;
				// }
				//处理初始地址
				if (info.select_addr) {
					var addr_data = info.select_addr;
					this.pageInfo.lat = addr_data.point.lat;
					this.pageInfo.lng = addr_data.point.lng;
					this.dataList[4].data = addr_data.addr;
				} else {
					let addrInfo = this.getCache("location", 2);
					this.pageInfo.lat = addrInfo.lat;
					this.pageInfo.lng = addrInfo.lon;
					// this.dataList[4].data = addrInfo.address;//显示详细地址时会显示undefined，直接改用城市名city
					this.dataList[4].data = addrInfo.city;
				}
				//处理工资
				var salary = data.salary_data;
				if (salary) {
					var ipos = salary.indexOf("元");
					var ipos1 = salary.substring(0,ipos); //取前部分
					var ipos2 = salary.substring(ipos+2,salary.length); //取后部分
					var ipos3 = `${ipos1}|${ipos2}`;
					this.serviceDatd = ipos3;
					this.dataList[5].data = salary;
				}
				//处理酬金
				var perFormAnce = data.perFormAnce;
				if (perFormAnce) {
					this.money = perFormAnce;
					this.dataList[6].data = perFormAnce;
				}
				//处理描述信息
				var text = data.infos;
				if (text) this.infos = text;
				//处理标题
				var title = data.title;
				if (title) this.demand_title = title;
			}
		},

		getPerFormAnce() { //获得保证金数据列表
			var token = this.getToken();
			var url = "Tools-getConfigData";
			this.__initAction(url, {
				token
			}, (res, s) => {
				if (s == 1) {}
				this.perFormAnce = res.data.getList.perFormAnce.value;
			})
		},

		clickHanlder(x) { //页面点击事件
			var list = this.dataList;
			// console.log(x); //要跳转的$route;
			// return;
			this.time_code = true;
			if (list[x].url) {
				this.$router.push(list[x].url);
			} else if (x == 6) {
				this.pageInfo.modalDataList = this.perFormAnce;
				this.pageInfo.modal_code = true;
			}
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

		do_add() {
			$(".file_input").change();
			// this.ishowFile = false;
			if (this.photo_count == 5) {
				return;
			}
		},

		do_release() {
			var token = this.pageInfo.token;
			var title = this.demand_title;
			var demandIds = this.demandIds;
			var yesTime = this.yesTime;
			var startTime = this.startTime;
			var endTime = this.endTime;
			var serviceDatd = this.serviceDatd;
			var money = this.money;
			var infos = this.infos;
			var lat = this.pageInfo.lat;
			var lon = this.pageInfo.lng;

			var prices = this.handleImage();
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

			if (!demandIds) {
				this.$dialog.toast({
					mes: "分类不能为空...",
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

			if (!serviceDatd) {
				this.$dialog.toast({
					mes: "服务酬金不能为空...",
					timeout: 1500
				});
				return;
			}

			// if (!money) {
			// 	this.$dialog.toast({
			// 		mes: "保障金不能为空...",
			// 		timeout: 1500
			// 	});
			// 	return;
			// }

			if (!infos) {
				this.$dialog.toast({
					mes: "兼职描述不能为空...",
					timeout: 1500
				});
				return;
			}

			if (!prices) {
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
				endTime,
				demandIds,
				serviceDatd,
				money,
				infos,
				prices,
				lon,
				lat
			};
			// console.log(params);
			var url = "Demands-addMemberDemands";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					var addId = res.data.addId;
					var sign = 'demands';
					var dsPay = 'dsPay';
					if (res.status == 1) {
						this.infos = "";
						this.demand_title = "";
						var info = this.getSelectData();
						if (info.data) {
							info = info.demand;
							this.setCache("select_data", JSON.stringify(info));
							this.dataList[0].data = "请选择分类";
						}
						setTimeout(() => {
							this.$router.back(-1);
						}, 500);
						this._msg(res.info);
					} else {
						this._msg(res.info);
						var query = {
							sign,
							gid: addId
						}
						setTimeout(() => {
							this.$router.push({
								path: `/payment/${dsPay}`,
								query
							});
						}, 200)
					}
				} else {
					this._msg(res.info);
					if (res.code.Jump == (-1)) {
						setTimeout(() => {
							this.$router.push('/Recharge');
						}, 200);
					};
				};
			});
		},

		// do_release(){
		// 	this.infos = "";
		// 	this.demand_title = "";
		// 	var info = this.getSelectData();
		// 	if (info.data) {
		// 		info.demand = null;
		// 		info = info.demand;
		// 		this.setCache("select_data", JSON.stringify(info));
		// 		this.dataList[0].data = "请选择分类";
		// 	};

		// 	this._msg();
		// 	setTimeout(() => {
		// 		this.$router.back(-1);
		// 	}, 500)
		// },

		select_value(i) { //弹框选择事件
			this.dataList[6].data = this.pageInfo.modalDataList[i];
			this.pageInfo.modal_code = false;
			this.money = this.pageInfo.modalDataList[i];
			var info = this.getSelectData();
			if (!info) {
				info = {};
			}
			if (!info.demand) {
				info.demand = {};
			}
			info.demand.perFormAnce = "";
			info.demand.perFormAnce = this.pageInfo.modalDataList[i];
			var select_data = JSON.stringify(info);
			this.setCache("select_data", select_data);
		},

		cancel() {
			this.pageInfo.modal_code = false;
		},

		save_demand_title() { //保存标题
			var title = this.demand_title;
			if (title.trim()) {
				var info = this.getSelectData();
				if (!info) info = {};
				if (!info.demand) info.demand = {};
				info.demand.title = "";
				info.demand.title = title;
				this.setCache("select_data", JSON.stringify(info));
			}
		},

		save_demand_infos() { //保存兼职描述
			var text = this.infos;
			if (text) {
				var info = this.getSelectData();
				if (!info) info = {};
				if (!info.demand) info.demand = {};
				info.demand.infos = "";
				info.demand.infos = text;
				var select_data = JSON.stringify(info);
				this.setCache("select_data", select_data);
			}
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
				info.data = {};
				var select_data = JSON.stringify(info);
				this.setCache("select_data", select_data);
			}
		},

		delImage(i) { //删除已选中的图片
			var arr = this.photoList;
			arr.splice(i, 1);
			this.photo_count--;
			// var isCode = true;
			var obj = {
				logo: "http://static.sxtian.com/imgs/add-pic.png",
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
			if (!info.demand) {
				info.demand = {};
			}
			if (!info.demand.time) {
				info.demand.time = {};
			}
			info.demand.time.yesTime = "";
			info.demand.time.yesTime = val;
			var select_data = JSON.stringify(info);
			this.setCache("select_data", select_data);
		},
		time2(val, oldVal) {
			this.startTime = val;
			var info = this.getSelectData();
			if (!info) {
				info = {};
			}
			if (!info.demand) {
				info.demand = {};
			}
			if (!info.demand.time) {
				info.demand.time = {};
			}
			info.demand.time.startTime = "";
			info.demand.time.startTime = val;
			var select_data = JSON.stringify(info);
			this.setCache("select_data", select_data);
		},
		time3(val, oldVal) {
			this.endTime = val;
			var info = this.getSelectData();
			if (!info) {
				info = {};
			}
			if (!info.demand) {
				info.demand = {};
			}
			if (!info.demand.time) {
				info.demand.time = {};
			}
			info.demand.time.endTime = "";
			info.demand.time.endTime = val;
			var select_data = JSON.stringify(info);
			this.setCache("select_data", select_data);
		},
		demand_title() {
			this.save_demand_title();
		},
		infos() {
			this.save_demand_infos();
		}
	},
	computed: {
		time1() {
			return this.dataList[1].data;
		},
		time2() {
			return this.dataList[2].data;
		},
		time3() {
			return this.dataList[3].data;
		}
	},
};
</script>
<style lang="scss" scoped>
	.yd-cell-item input { margin-bottom: 0; color: #000; font-size: 14px !important; font-weight: bold; padding-left: 40px; }
	.yd-textarea > textarea { font-size: 0.9rem; }
	.del-img { position: absolute; top: 0; right: 0.1rem; z-index: 100; }
	.release_demand{
		height: calc(100% - 2.8rem);
		.modal_frame_group .data_list {
			height: 13.5rem; overflow-y: auto;
			.list_item { border: 1px solid #efeff4; }
		}
	}
</style>
