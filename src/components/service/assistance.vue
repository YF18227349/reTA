<template>
	<div class="legal_aid w-100">
		<div class="legal_aid_group w-100">
			<ul class="legal_aid_list w-100">
				<li>
					<a href="javascript:;" class="line_input_item">
						<span class="f-left fs-3 fw-6 fc-dark">标题</span>
						<input
							type="text"
							class="line_input fs-3 fw-5 fc-dark"
							placeholder="请输入标题"
							v-model="title"
						>
					</a>
				</li>
				<li>
					<a href="javascript:;" class="line_input_item">
						<span class="f-left fs-3 fw-6 fc-dark">姓名</span>
						<input
							type="text"
							class="line_input fs-3 fw-5 fc-dark"
							placeholder="请输入姓名"
							v-model="userName"
						>
					</a>
				</li>
				<li>
					<a href="javascript:;" class="line_input_item">
						<span class="f-left fs-3 fw-6 fc-dark">电话</span>
						<input
							type="tel"
							class="line_input fs-3 fw-5 fc-dark"
							maxlength="11"
							placeholder="请输入电话"
							v-model="userTel"
						>
					</a>
				</li>
				<li class="sketch_item">
					<p class="fc-dark fs-3 fw-6">兼职简述</p>
					<yd-textarea
						class="fs-3 fw-6 fc-dark"
						placeholder="请输入兼职简述"
						maxlength="300"
						v-model="sketch"
					></yd-textarea>
				</li>
			</ul>
		</div>
		<p class="fs-3 fw-6 fc-gray p-5">注：提交后请保持电话畅通，24小时内会有工作人员联系您。</p>
		<a href="javascript:;" class="submitBtn btn-c bg-blue" @click="do_submit()">
			<span class="fc-white fw-6 fm-2">确认提交</span>
		</a>

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
<script>
export default {
	data() {
		return {
			header_title: "法律援助",

			title: "",
			userTel: null,
			userName: "",
			sketch: "",

			openDom: {
				status: false,
				type: 1
			}
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.header_title,
			type: 1
		});
		this.init();
	},
	methods: {
		init() {
			if (this.deBug()) {
				// this.title = "测试法律援助";
				// this.userTel = "13333333333";
				// this.userName = "测试姓名";
				// this.sketch = "测试兼职描述";
				this.title = null;
				this.userTel = null;
				this.userName = null;
				this.sketch = null;
			}
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			});
		},
		do_submit() {
			var token = this.getToken();
			var title = this.title;
			var userName = this.userName;
			var userTel = this.userTel;
			var sketch = this.sketch;
			if (!title) {
				this._msg("标题不能为空");
				return;
			}
			if (!userName) {
				this._msg("请输入姓名");
				return;
			}
			var reg = this.Global.reg_phone;
			if(!userTel){
				this._msg("请输入联系电话");
				return;
			}else{
				if (!this.checkPhone(userTel, reg)) {
					this._msg("联系电话输入有误");
					return;
				}
			}
			if (!sketch) {
			}
			var params = { token, title, sketch, userName, userTel };
			this.__initAction("Law-addLaw", params, (res, s) => {
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
	}
};
</script>
<style lang="scss">
</style>
