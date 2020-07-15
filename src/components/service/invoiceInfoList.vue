<template>
	<div class="user_addr w-100">
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
			<div class="user_addr_group w-100" slot="list">
				<ul class="user_addr_list w-100 bg-white mt-4 mb-4" v-for="(tmp,i) in dataList" :key="i">
					<li>
						<a href="javascript:;" class="line_item" @click="select_addr(i)">
							<span class="f-left fc-dark fw-6 fs-3 mr-2">{{tmp.invoiceType == 1 ? "企业名称:" : "个人名称"}}</span>
							<span class="f-left fc-dark fw-6 fs-3">{{tmp.invoiceTitle}}</span>
							<span class="f-right fc-dark fw-6 fs-3">{{tmp.invoiceTax}}</span>
						</a>
					</li>
					<li>
						<a href="javascript:;" class="line_item" @click="select_addr(i)">
							<span class="f-left fc-dark fw-6 fs-3 mr-2">{{tmp.invoiceType == 1 ? "企业地址:" : "个人地址"}}</span>
							<span class="f-left fc-dark fw-6 fs-3">{{tmp.invoiceAddress}}</span>
						</a>
					</li>
					<li>
						<a href="javascript:;" class="line_item">
							<a
								href="javascript:;"
								class="f-left default_btn"
								@click="selecet_default_btn(tmp.id)"
							>
								<!-- <span
									class="item_radio iconfont icon-duihao4 fw-6 mr-2 fc-white"
									:class="tmp.is_default==1 ?'bg-blue br-blue':'bg-lightdark br-lightdark'"
								></span> -->
								<span
									class="item_radio iconfont icon-duihao4 fw-6 mr-2 fc-white"
									:class="tmp.is_default==1 ?'bg-blue br-blue':'br-lightdark'"
								></span>
								<span class="default_txt fw-6 fc-gray">设为默认</span>
							</a>
							<a href="javascript:;" class="addr_btn f-right ml-6" @click="update_addr(tmp.id)">
								<span class="item_icon iconfont icon-bianji1 fc-gray fw-6"></span>
								<span class="fc-gray ml-2">编辑</span>
							</a>
							<a
								href="javascript:;"
								class="addr_btn f-right"
								@click="remove_addr(tmp.id,tmp.invoiceTitle)"
							>
								<span class="item_icon iconfont icon-lajixiang1 fc-gray fw-6"></span>
								<span class="fc-gray ml-2">删除</span>
							</a>
						</a>
					</li>
				</ul>
			</div>

			<!-- 数据全部加载完毕显示 -->
			<span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span>
		</yd-infinitescroll>

		<router-link to="/addinvoiceinfo/-1" class="add_addr_btn bg-blue">
			<span class="fc-white fw-6 fm-2">添加新抬头</span>
			<!-- <span class="iconfont icon-jinakangbaoicons19 btn-icon fc-white fw-6 fm-2"></span> -->
		</router-link>
	</div>
</template>


<script>
export default {
	data() {
		return {
			header_title: "发票抬头",
			dataList: [],

			param: this.initPage(),
			params: this.initParam()
		};
	},

	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.header_title,
			type: 0
		});
		this.init();
	},
	methods: {
		init() {
			this.getPageInfo();
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
		},
		getPageInfo() {
			this.$dialog.loading.close();
			this.__initAction("Invoice-getList",this.params,(res, s) => {
					if (s == 1) {
						console.log(res)
						for (let it of res.data) {
							var arr = it;
							// arr.id = it.id;
							// arr.invoiceTitle = it.invoiceTitle;
							// arr.invoiceTax = it.invoiceTax;
							// arr.invoiceAddress = it.invoiceAddress;
							// arr.invoicePhone = it.invoicePhone;
							// arr.invoiceBank = it.invoiceBank;
							// arr.invoiceAccount = it.invoiceAccount;
							// arr.invoiceType = it.invoiceType;
							// arr.isDefault = it.is_default;
							// arr.createTime = it.create_time;
							this.dataList.push(arr);
						}
						// this.param.count = res.count;
						// this.params.count = res.count;
						// console.log(res);
					}
				}
			);
		},
		loadList() {
			this.param.Max = Math.ceil(this.param.count / this.param.length);
			if (this.param.page == this.param.Max) {
				this._msg("已经到底了", 200);
				setTimeout(() => {
					this.selfLoadClosed({
						mes: ""
					});
				}, 500);
				return false;
			} else {
				this.param.page++;
				this.params.page++;
				this.getPageInfo();
				this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
			}
		},
		select_addr(i) {
			var data = this.dataList[i];
			data.invoiceAll = true;
			this.setCache("InfoData", JSON.stringify(data));
			var type = this.getParams().type;
			this.__Href("/invoice_fill/" + type);
		},

		// 设置默认地址
		selecet_default_btn(id) {
			var param = {
				token: this.getToken(),
				id: id
			};
			this.__initAction("Invoice-setDefault", param, (res, s) => {
				if (s == 1) {
					this._msg(res.info, 1500, "success");
					this.realoade();
				}
			});
		},

		//更新跳转
		update_addr(id) {
			this.__Href("/addinvoiceinfo/" + id);
		},
		//删除选中的地址项
		remove_addr(id, title) {
			console.log(id, title)
			var that = this;
			that.$dialog.confirm({
				title: "删除",
				mes: `是否删除“${title}”地址`,
				opts: () => {
					var param = {
						token: that.getToken(),
						id: id
					};
					that.__initAction("Invoice-delete", param, (res, s) => {
						console.log(res)
						if (s == 1) {
							that._msg(res.info, 1500, "success");
							that.realoade();
						}
					});

				}
			});
		},

		realoade(time = 1000) {
			this.params.page = 0;
			this.param.page = 0;
			this.__Sleep(e => {
				this.dataList = [];
				this.getPageInfo();
			}, time);
		}
	}
};
</script>



<style lang="scss">
.yd-cityselect-content {
	margin-top: 10px;
}
</style>
