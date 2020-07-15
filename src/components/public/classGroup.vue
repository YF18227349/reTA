<template>
	<div class="demand_group w-100">
		<header class="demand_group_header bg-gray shadow-dark w-100">
			<a href="javascript:history.go(-1)" class="arrow-logo">
				<span class="fm-1 fw-6 fc-gray">取消</span>
			</a>
			<span class="header_title fc-dark fm-2">{{pageInfo.header_title[pageInfo.data_name-1]}}</span>
			<a href="javascript:;" class="last text-right" @click.prevent="done_select()">
				<span class="fm-1 fw-6 fc-gray">确定</span>
			</a>
		</header>
		<div class="clear-fixed"></div>
		<!-- <div class="select_group bg-white mt-1 w-100" @click.self="pageInfo.popup_right_open = false">
				<a
					href="javascript:;"
					class="select_btn bg-white br-gray pt-1 pb-1 pl-3 pr-3"
					@click.prevent="pageInfo.popup_right_open = false"
				>
					<span class="fs-3 fw-6 fc-gray">取消</span>
				</a>
				<div class="select_data" @click="pageInfo.popup_right_open = false">
					<span class="fs-3 fw-6 fc-dark mr-3" v-if="select_data.length==0">-- 请选择 --</span>
					<span v-for="(tmp,i) in select_data" :key="i" class="fs-3 fw-6 fc-dark">{{tmp.label}}</span>
				</div>
				<a
					href="javascript:;"
					class="select_btn bg-white br-blue pt-1 pb-1 pl-3 pr-3"
					@click.prevent="done_select()"
				>
					<span class="fs-3 fw-6 fc-blue">确定</span>
				</a>
			</div>-->
		<!-- <div class="clear_select_group"></div> -->
		<div class="demand_group_list w-100">
			<!-- <yd-search v-model="search_value" :on-submit="submitHandler" class="search_input"></yd-search> -->
			<div class="data_group p-r w-100">
				<ul class="data_level1 bg-white">
					<li class="data_item w-100" v-for="(tmp,i) in data_level" :key="i" :class="data1_code==i?'bg-blue':''">
						<a href="javascript:;" class="line_arrow_item w-100" @click.prevent="select_data1(i)">
							<span class="item_label fw-6 f-left" :class="data1_code==i?'fc-white':'fc-dark'">{{tmp.name}}</span>
							<span class="item_arrow f-right fw-6 iconfont icon-previewright" :class="data1_code==i?'fc-white':'fc-gray'"></span>
						</a>
					</li>
				</ul>
				<div class="popup_right w-100">
					<div class="popup_plate w-100" :class="pageInfo.popup_right_open ? 'pop_plate_show':'pop_plate_hid'" @click="pageInfo.popup_right_open = !pageInfo.popup_right_open"></div>
					<div class="popup_list w-80" :class="pageInfo.popup_right_open ? 'pop_list_show':'pop_list_hid'">
						<div class="data_level2 p-a bg-white w-100">
							<ul class="list_left bg-white">
								<li class="w-100" v-for="(item,j) in data_level2" :key="j">
									<a class="line_arrow_item" href="javascript:;" @click="select_data2(j)" :class="data2_code==j?'bg-blue':''">
										<span class="item_txt f-left fw-6" :class="data2_code==j?'fc-white':'fc-dark'">{{item.name}}</span>
										<span class="item_arrow f-right fw-6 iconfont icon-previewright" :class="data2_code==j?'fc-white':'fc-gray'"></span>
									</a>
								</li>
							</ul>
							<ul class="list_right">
								<li class="w-100" v-for="(tmp,k) in data_level3" :key="k">
									<a class="line_arrow_item" href="javascript:;" @click="select_data3(k)" :class="data3_code==k?'bg-blue':''">
										<span class="item_txt f-left fw-6" :class="data3_code==k?'fc-white':'fc-dark'">{{tmp.name}}</span>
										<span class="item_arrow f-right fw-6 iconfont icon-previewright" :class="data3_code==k?'fc-white':'fc-gray'"></span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: ["专业分类", "专业分类", "行业分类", "行业分类"],
				popup_right_open: false,
				path: "",
				data_name: ""
			},
			isCode: true,
			search_value: "",
			data1_code: null,
			data2_code: 0,
			data3_code: 0,
			data_level: [],
			data_level2: [],
			data_level3: [],

			select_id_group: [],
			select_data: []
		};
	},
	mounted() {
		var h = document.documentElement.clientHeight;
		$(".demand_group_header").css("height", `${h * 0.07}px`);
		$(".clear-fixed").css("height", `${h * 0.07}px`);
		$(".demand_group_list").css("height", `${h * 0.93}px`);
		$(".select_group").css("height", `${h * 0.07}px`);
		$(".clear_select_group").css("height", `${h * 0.07}px`);
	},
	created() {
		// this.$store.commit("setHeaderStyle", { txt: "兼职分类", type: 0 });
		this.pageInfo.path = this.getParams().url;
		this.pageInfo.data_name = this.getParams().type;
		this.getPageInfo();
	},
	methods: {
		getPageInfo() {
			var token = this.getToken();
			var types = this.pageInfo.data_name;
			var url = this.Global.baseURL + "/Classtype-getListData.jsp";
			var params = {
				token,
				types
			};
			this.$dialog.loading.open("拼命加载中...");
			this.axios
				.post(url, params)
				.then(res => {
					this.$dialog.loading.close();
					if (res.data.status == 1) {
						this.data_level = res.data.data;
					} else {
						if (res.data.code == "-1") {
							setTimeout(() => {
								this.$router.push("/login");
							}, 300);
						} else {
							this.$dialog.toast({
								mes: res.data.info,
								timeout: 1500,
								icon: "error"
							});
						}
					}
				})
				.catch(err => {
					this.$dialog.loading.close();
					this.$dialog.toast({
							mes: "网络故障请重试...",
							timeout: 1500,
							icon: "error"
						},
						300
					);
				});
		},

		submitHandler(value) {
			this.$dialog.toast({
				mes: `搜索：${value}`
			});
		},

		select_data1(i) {
			this.data1_code = i;
			this.pageInfo.popup_right_open = true;
			this.select_data = [];
			var data2 = this.data_level[i].findMenus;
			this.data2_code = 0;
			if (data2.length > 0) {
				this.data_level2 = data2;
				var data3 = data2[0].findMenus;
				if (data3.length > 0) {
					if (data3[0].id == -9) {
						this.isCode = false;
					} else {
						this.isCode = true;
					}
					this.data_level3 = data3;
				} else {
					this.data_level3 = [];
				}
			} else {
				var value = {};
				value.id = this.data_level[i].id;
				value.label = this.data_level[i].name;
				this.select_data.push(value);
				this.data_level2 = [];
			}
		},

		select_data2(j) {
			this.data2_code = j;
			this.data3_code = 0;
			this.select_data = [];
			var data3 = this.data_level2[j].findMenus;
			if (data3[0].id == -9) {
				this.isCode = false;
			} else {
				this.isCode = true;
			}
			if (data3.length > 0) {
				this.data_level3 = data3;
			} else {
				this.data_level3 = [];
				var value1 = {};
				value1.id = this.data_level[this.data1_code].id;
				value1.label = this.data_level[this.data1_code].name;
				this.select_data.push(value1);
				var value2 = {};
				value2.id = this.data_level2[j].id;
				value2.label = this.data_level2[j].name;
				this.select_data.push(value2);
			}
		},

		select_data3(k) {
			this.data3_code = k;
			this.select_data = [];
			var value1 = {};
			value1.id = this.data_level[this.data1_code].id;
			value1.label = this.data_level[this.data1_code].name;
			this.select_data.push(value1);
			var value2 = {};
			value2.id = this.data_level2[this.data2_code].id;
			value2.label = this.data_level2[this.data2_code].name;
			this.select_data.push(value2);
			var value3 = {};
			value3.id = this.data_level3[k].id;
			value3.label = this.data_level3[k].name;
			this.select_data.push(value3);
		},

		done_select() {
			if (!this.isCode) {
				this._msg("请选择类别");
				return;
			}
			if (!this.data1_code && this.data1_code != 0) {
				this._msg("请选择类别");
				return;
			}
			var data = this.select_data;
			var list1 = this.data_level;
			var list2 = this.data_level2;
			if (data.length == 0) {
				var value1 = {};
				value1.id = this.data_level[this.data1_code].id;
				value1.label = this.data_level[this.data1_code].name;
				this.select_data.push(value1);
				var value2 = {};
				value2.id = this.data_level2[this.data2_code].id;
				value2.label = this.data_level2[this.data2_code].name;
				this.select_data.push(value2);
				var value3 = {};
				value3.id = this.data_level3[0].id;
				value3.label = this.data_level3[0].name;
				data = [value1, value2, value3];
			}
			var x = data[0].id;
			var y = data[1].id;
			var data2 = {};
			for (var i = 0; i < list1.length; i++) {
				if (list1[i].id == x) {
					if (y) {
						for (var j = 0; j < list2.length; j++) {
							if (list2[j].id == y) {
								if (list2[j].findMenus) {
									var perFormAnce = [];
									perFormAnce = list2[j].findMenus;
									data2.perFormAnce = perFormAnce;
								}
								// if (list2[j].Threelevel.demandCmp) {
								//   var demandCmp = [];
								//   demandCmp = list2[j].Threelevel.demandCmp;
								//   data2.demandCmp = demandCmp;
								// }
								// if (list2[j].Threelevel.resumeMoney) {
								//   var resumeMoney = [];
								//   resumeMoney = list2[j].Threelevel.resumeMoney;
								//   data2.resumeMoney = resumeMoney;
								// }
								// if (list2[j].Threelevel.resumeState) {
								//   var resumeState = [];
								//   resumeState = list2[j].Threelevel.resumeState;
								//   data2.resumeState = resumeState;
								// }
								// if (list2[j].Threelevel.resumeType) {
								//   var resumeType = [];
								//   resumeType = list2[j].Threelevel.resumeType;
								//   data2.resumeType = resumeType;
								// }
								// if (list2[j].Threelevel.salary) {
								//   var salary = [];
								//   salary = list2[j].Threelevel.salary;
								//   data2.salary = salary;
								// }
								// if (list2[j].Threelevel.experience) {
								//   var experience = [];
								//   experience = list2[j].Threelevel.experience;
								//   data2.experience = experience;
								// }
								// if (list2[j].Threelevel.education) {
								//   var education = [];
								//   education = list2[j].Threelevel.education;
								//   data2.education = education;
								// }
							}
						}
					}
				}
			}

			var info = this.getCache("select_data");
			if (!info) {
				var select_data = {};
			} else {
				var select_data = JSON.parse(info);
			}
			// var type = this.pageInfo.data_name;
			select_data.data = {};
			select_data.data.data1 = data;
			select_data.data.data2 = data2;
			this.setCache("select_data", JSON.stringify(select_data));
			this.setCache("classGroupData", JSON.stringify(select_data));

			setTimeout(() => {
				window.history.go(-1);
			}, 300);
		}
	},
	computed: {
		// headerInfo() {
		//   var list = this.select_data;
		//   if (list.length == 0) {
		//     return this.pageInfo.header_title;
		//   } else {
		//     var str = "";
		//     for (let it of list) {
		//       str += it.label + "-";
		//     }
		//     str = str.substring(0, str.length - 1);
		//     return str;
		//   }
		// }
	}
};
</script>
<style lang="scss">
.yd-input > input {
		margin-bottom: 0;
		background: #fff;
		font-size: 14px;
		color: #333;
		text-align: left;
		font-weight: bold;
}

.select_group {
		position: fixed;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15px;
		z-index: 10;
}

.select_data {
		display: flex;
		justify-content: center;
		align-items: center;
		span:not(:last-child):after {
				content: " - ";
		}
}
</style>
