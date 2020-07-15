<template>
	<div class="add_labors_info w-100">
		<!-- <header class="add_labors_info_header bg-gray w-100 fc-dark">
				<a href="javascript:history.go(-1)" class="arrow-logo fc-dark iconfont icon-previewleft"></a>
				<span class="header_title fc-dark">{{pageInfo.header_title}}</span>
				<a href="javascript:;" class="last"></a>
			</header>-->
		<!-- <div class="clear-fixed"></div> -->
		<div class="add_labors_info_group w-100">
			<ul class="add_labors_list w-100">
				<li class="p-r">
					<a href="javascript:;" class="input_cell_item">
						<span class="item_title fs-3 fc-dark fw-6">姓名</span>
						<input type="text" class="item_input fw-6 fs-3" v-model="name" placeholder="必填">
					</a>
					<a href="javascript:;" class="clearBtn p-a" :class="nameShow?'bg-lightdark':'bg-white'" @click="name=''">
						<span class="fw-7 fc-white iconfont icon-error"></span>
					</a>
				</li>
				<li class="p-r">
					<a href="javascript:;" class="input_cell_item">
						<span class="item_title fc-dark fw-6">电话</span>
						<input type="tel" class="item_input fw-5 fs-3" v-model="telNum" placeholder="必填" maxlength="11">
					</a>
					<a href="javascript:;" class="clearBtn p-a" :class="telNumShow?'bg-lightdark':'bg-white'" @click="telNum=''">
						<span class="fw-7 fc-white iconfont icon-error"></span>
					</a>
				</li>
				<li class="p-r">
					<a href="javascript:;" class="input_cell_item">
						<span class="item_title fs-3 fc-dark fw-6">身份证号</span>
						<input type="number" class="item_input fw-5 fs-3" v-model="code_id" placeholder="必填">
					</a>
					<a href="javascript:;" class="clearBtn p-a" :class="codeIdShow?'bg-lightdark':'bg-white'" @click="code_id=''">
						<span class="fw-6 fc-white iconfont icon-error"></span>
					</a>
				</li>
			</ul>
			<p class="p-4">
				<span class="fc-gray fs-3 fw-5">注：请填写完整信息，我们不会把您的信息用作其他用途。</span>
			</p>
		</div>
		<a href="javascript:;" class="addLaborsBtn btn-c bg-blue mt-2" @click="save_info()">
			<span class="fc-white fw-5 fm-1">确认保存</span>
		</a>
	</div>
</template>

<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: "添加劳务者信息"
			},
			name: "",
			nameShow: false,
			telNum: null,
			telNumShow: false,
			code_id: null,
			codeIdShow: false
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.$dialog.loading.close();

		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 0
		});

		this.init();
		// var userInvoiceInfo = JSON.parse(
		//   this.getCache("userInvoiceInfo")
		// );
		// this.name = userInvoiceInfo.labourName;
		// this.telNum = userInvoiceInfo.labourTel;
		// this.code_id = userInvoiceInfo.labourIdNumber;
	},
	methods: {
		init() {
			if (this.deBug()) {
				this.name = ''; // 测试名称
				this.telNum = ''; // 13311111111
				this.code_id = ''; // 612601199503200916
			}
			var laborsinfo = this.getCache("laborsinfo", 2);
			if (laborsinfo) {
				this.name = laborsinfo.labourName;
				this.telNum = laborsinfo.labourTel;
				this.code_id = laborsinfo.labourIdNumber;
			}
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},
		save_info() {
			var labourName = this.name;
			var labourTel = this.telNum;
			var labourIdNumber = this.code_id;

			var re_phone = this.Global.reg_phone;
			var re_ID = this.Global.reg_ID;
			if (!labourName) {
				this.$dialog.toast({
					mes: "姓名不能为空",
					timeout: 1000
				});
				return;
			}
			if (!this.checkPhone(labourTel, re_phone)) {
				this.$dialog.toast({
					mes: "手机号填写有误",
					timeout: 1000
				});
				return;
			}
			if (!this.checkID(labourIdNumber, re_ID)) {
				this.$dialog.toast({
					mes: "身份证号填写有误",
					timeout: 1000
				});
				return;
			}
			var labourAll = true;
			var info = {
				labourAll,
				labourName,
				labourTel,
				labourIdNumber
			};
			this.$dialog.loading.open("正在保存请稍后...");
			this.setCache("laborsinfo", JSON.stringify(info));
			this.__Sleep(e => {
				this.$dialog.loading.close();
				this._msg("保存成功", 1000, "success");
				window.history.go(-1);
			}, 1000);
		}
	},
	watch: {
		name() {
			if (this.name) {
				this.nameShow = true;
			} else {
				this.nameShow = false;
			}
		},
		code_id() {
			if (this.code_id) {
				this.codeIdShow = true;
			} else {
				this.codeIdShow = false;
			}
		},
		telNum() {
			if (this.telNum) {
				this.telNumShow = true;
			} else {
				this.telNumShow = false;
			}
		}
	}
};
</script>
<style lang="scss">
	a.clearBtn {
		text-decoration: none;
		width: 16px;
		height: 16px;
		top: 50%;
		margin-top: -8px;
		right: 5%;
		span {
			font-size: 12px;
		}
	}
</style>
