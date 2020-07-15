<template>
	<div class="labour_services w-100">
		<div class="labour_services_group w-100">
			<ul class="labour_services_list w-100">
				<li>
					<yd-cell-item>
						<span slot="left">标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</span>
						<input slot="right" type="text" placeholder="请输入标题" v-model="title">
					</yd-cell-item>
				</li>
				<li>
					<yd-cell-item>
						<span slot="left">类型选择</span>
						<span slot="left" class="ml-4">
							<yd-radio-group v-model="radio_code" size="18" color="#2f9bfe">
								<yd-radio val="1">劳务派遣</yd-radio>
								<yd-radio val="2">劳务外包</yd-radio>
							</yd-radio-group>
						</span>
					</yd-cell-item>
				</li>
				<li>
					<yd-cell-item>
						<span slot="left">公司名称</span>
						<input slot="right" type="text" placeholder="请输入公司名称" v-model="ukName">
					</yd-cell-item>
				</li>
				<li>
					<yd-cell-item>
						<span slot="left">公司地址</span>
						<input slot="right" type="text" placeholder="请输入公司地址" v-model="ukAddress">
					</yd-cell-item>
				</li>
				<li>
					<yd-cell-item>
						<span slot="left">联系电话</span>
						<input slot="right" type="tel" maxlength="11" placeholder="请输入联系电话" v-model="ukTel">
					</yd-cell-item>
				</li>
				<li class="item_detail">
					<span class="mb-2">兼职简述</span>
					<yd-textarea
						class="fs-3 fc-dark"
						placeholder="请输入兼职内容（15-300字以内）"
						maxlength="300"
						v-model="ukNode"
					></yd-textarea>
				</li>
			</ul>
			<p class="fc-gray fw-6 fs-3 mt-3">*提交后请保持电话畅通，24小时内会有工作人员联系您</p>
			<a href="javascript:;" class="btn-c bg-blue" @click.prevent="do_submit()">
				<span class="fc-white fm-2 fw-6">确认提交</span>
			</a>
		</div>

		<div class="submit_toast_group" v-if="openDom.status">
			<div class="tosat_list bg-white">
				<span
					class="tosat_logo iconfont fc-white fw-6"
					:class="openDom.status?'icon-duihao4 bg-blue':'bg-red con-chahao1'"
				></span>
				<span class="toast_text fc-dark fm-2">{{openDom.text ? openDom.text : '提交成功'}}</span>
				<button class="toast_btn fc-white bg-red fm-1 fw-6" @click="alertBack(openDom.type)">返回</button>
			</div>
		</div>
	</div>


		
</template>
<script type="text/babel">
export default {
	data() {
		return {
			header_title: "劳务合作",
			title: "", //标题
			radio_code: "1", //分类
			ukTel: null, //公司电话
			ukAddress: null, //公司地址
			ukName: null, // 公司名称
			ukNode: null, //兼职描述
			openDom: {
				status: false,
				type: 1
			}
		};
	},
	created() {
		// this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.header_title,
			type: 1
		});
		this.init();
	},
	methods: {
		init() {
			if (this.deBug()) {
				// this.title = "测试标题";
				this.radio_code = 1;
				// this.ukTel = "13333333333";
				// this.ukAddress = "测试公司地址";
				// this.ukName = "测试公司名称";
				// this.ukNode = "测试兼职描述";
				this.title = null;
				// this.radio_code = null;
				this.ukTel = null;
				this.ukAddress = null;
				this.ukName = null;
				this.ukNode = null;
			}
			// this.__Sleep(e => {
			//   this.selfMainLoadClosed();
			// });
		},
		do_submit() {
			var token = this.getToken();
			var title = this.title;
			var type = this.radio_code;
			var ukNode = this.ukNode;
			var ukName = this.ukName;
			var ukTel = this.ukTel;
			var ukAddress = this.ukAddress;
			if (!title) {
				this._msg("标题不能为空");
				return;
			}
			if (!type) {
				this._msg("请选择劳务类型");
				return;
			}
			if (!ukName) {
				this._msg("请输入公司名称");
				return;
			}
			if (!ukAddress) {
				this._msg("请输入公司地址");
				return;
			}
			var reg = this.Global.reg_phone;
			if (!this.checkPhone(ukTel, reg)) {
				this._msg("联系电话输入有误");
				return;
			}
			if (!ukNode) {
				this._msg("兼职简述不能为空");
				return;
			}
			var params = { token, title, type, ukNode, ukName, ukTel, ukAddress };
			this.__initAction("Labor-addLabor", params, (res, s) => {
				if (s == 1) {
					this.openDom.status = true;
					this.openDom.type = 2;
				} else {
					this._msg(res.info);
				}
			});
		},
		alertBack(t) {
			window.history.go(-1);
		}
	},
};
</script>
<style lang="scss">
	.yd-radio {
		input {
			width: 12px;
		}
	}
	a.btn-c {
		margin-top: 25px;
	}
</style>
