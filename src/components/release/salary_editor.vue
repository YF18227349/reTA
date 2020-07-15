<template>
	<div class="salary_editor w-100">
		<!-- <header class="salary_editor_header bg-gray w-100">
				<a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
				<span class="header_title fc-dark">{{pageInfo.header_title}}</span>
				<a href="javascript:;" class="last">
					<span class="fw-5 fc-fark fs-3">保存</span>
				</a>
			</header>-->
		<!-- <div class="clear-fixed"></div> -->
		<div class="salary_editor_group w-100">
			<ul class="salary_editor_list w-100">
				<li class="salary_editor_item">
					<a href="javascript:;" class="line_input_item salary-positon">
						<span class="r-left fs-3 fw-6 fc-dark">酬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金</span>
						<input class="line_input fs-3 fw-6 fc-blue" v-model="salary_value" type="number" placeholder="请输入意向酬薪">
						<i> 元</i>
					</a>
				</li>
				<li class="salary_editor_item" @click="pageInfo.modal_code = true">
					<self-cell-item href="javascript:;" arrow="true">
						<span slot="left" class="fc-dark fw-6 fs-3">酬金单位</span>
						<span slot="right" class="fw-6 fs-3 mr-3" :class="pageInfo.salary?'fc-blue':'fc-gray '">{{pageInfo.salary?'/'+pageInfo.salary:'请选择'}}</span>
					</self-cell-item>
				</li>
			</ul>
		</div>
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
					<span class="fc-blue fw-7 fm-1">取消</span>
				</a> -->
			</div>
		</div>
	</div>
</template>
<script>
const ModalFrame = ()=>import("../../components/sub/modal_frame");
const CellItem = ()=>import("../../components/sub/cell_arrow_item");
export default {
	data() {
		return {
			pageInfo: {
				header_title: "酬金编辑",
				salary: "",
				modal_code: false,
				modalDataList: []
			},
			type: "",
			salary_value: null,
			autoHeight: {
				height: true,
				overflow: true
			}
		};
	},
	mounted() {
		$(".header_right>span")
			.html("保存")
			.addClass("fw-6 fc-lightdark")
			.css("fontSize", "14px");

		$(".header_right").click(() => {
			this.do_save();
		});
	},
	created() {
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 0
		});
		this.type = this.getParams().type;
		// console.log(this.type);
		this.getPageInfo();
	},
	updated() {
		this.autoSizeModel();
	},
	methods: {
		//自动设置模态框状态
		autoSizeModel() {
			var len = this.pageInfo.modalDataList.length;
			if (len <= 4) {
				this.autoHeight.height = "auto";
				this.autoHeight.overflow = "hidden";
			};
		},
		getPageInfo() {
			var info = this.getCache("select_data");
			var index = this.type;
			// console.log(JSON.parse(info));
			if (info) {
				var data = JSON.parse(info)[index];
				if (data) {
					if (data.data2) {
						var demandCmp = data.data2.demandCmp;
						if (demandCmp.length == 0) {
							this.getDemandCmp();
						} else {
							this.pageInfo.modalDataList = demandCmp;
						}
					} else {
						this.getDemandCmp();
					}
				} else {
					this.getDemandCmp();
				}
			} else {
				this.getDemandCmp();
			}
		},

		getDemandCmp() {
			var token = this.getToken();
			var url = "Tools-getConfigData";
			this.__initAction(url, {
				token
			}, (res, s) => {
				if (s == 1) {
					var data = res.data;
					this.pageInfo.modalDataList = data.getList.demandCmp.value;
				}
			})
			// var url = this.Global.baseURL + "/Tools-getConfigData.jsp";
			// this.$dialog.loading.open("拼命加载中...");
			// this.axios
			//   .post(url, { token })
			//   .then(res => {
			//     if (res.data.status == 1) {
			//       var data = res.data.data;
			//       this.pageInfo.modalDataList = data.getList.demandCmp.value;
			//       this.$dialog.loading.close();
			//     } else {
			//       this.$dialog.loading.close();
			//       if ((res.data.code = -1)) {
			//         this.$router.push("/login");
			//       } else {
			//         this.$dialog.toast({
			//           mes: "加载数据失败",
			//           timeout: 1500,
			//           icon: "error"
			//         });
			//       }
			//     }
			//   })
			//   .catch(err => {
			//     this.$dialog.loading.close();
			//     this.$dialog.toast({
			//       mes: "网络故障",
			//       timeout: 1500,
			//       icon: "error"
			//     });
			//     console.error(err);
			//   });
		},
		cancel() {
			this.pageInfo.modal_code = false;
		},
		select_value(i) {
			this.pageInfo.salary = this.pageInfo.modalDataList[i];
			this.pageInfo.modal_code = false;
		},
		do_save() {
			var salary = this.salary_value;
			var dan = this.pageInfo.salary;
			if (!salary) {
				this.$dialog.toast({
					mes: "请输入金额",
					timeout: 1500
				});
				return;
			}
			if (!dan) {
				this.$dialog.toast({
					mes: "请选择单位",
					timeout: 1500
				});
				return;
			}
			var info = this.getSelectData();
			if (!info) {
				info = {};
			}
			if (!info[this.type]) {
				info[this.type] = {};
			}
			info[this.type].salary_data = "";
			info[this.type].salary_data = salary + "元/" + dan;
			// console.log(info[this.type]);
			this.setCache("select_data", JSON.stringify(info));
			setTimeout(() => {
				window.history.go(-1);
			}, 300);
		}
	},
	watch: {},
	destroyed() {
		$(".header_right>span").html("");
		$(".header_right").unbind("click");
	},
	components: {
		"self-modal-frame": ModalFrame,
		"self-cell-item": CellItem
	}
};
</script>

<style lang="scss">
.salary-positon {
		position: relative;
}
.salary-positon i {
		position: absolute;
		right: 10px;
		top: 0;
		line-height: 40px;
		color: red;
		font-size: 14px;
		font-style: normal;
}
</style>
