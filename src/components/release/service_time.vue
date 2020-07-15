<template>
	<div class="service_time w-100">
		<!-- <header class="service_time_header bg-gray w-100">
			<a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
			<span class="header_title fc-dark">{{pageInfo.header_title}}</span>
			<a href="javascript:;" class="last">
				<span class="fw-5 fc-fark fs-3">保存</span>
			</a>
		</header>-->
		<!-- <div class="clear-fixed"></div> -->
		<div class="service_time_group w-100">
			<ul class="service_time_list w-100">
				<li
					class="list_item bg-white"
					v-for="(item,i) in dateList"
					:key="i"
					@click="select_time(i)"
				>
					<span class="item_title">{{item.title}}</span>
					<a
						href="javascript:;"
						class="item_ckeckbox bg-white"
						:class="item.value?'br-blue':'br-gray'"
					>
						<span class="iconfont icon-duihao" :class="item.value?'fc-blue':'fc-white'"></span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			pageInfo: {
				header_title: "服务时间",
				type: ""
			},
			dateList: [
				{ title: "每周日", value: false },
				{ title: "每周一", value: false },
				{ title: "每周二", value: false },
				{ title: "每周三", value: false },
				{ title: "每周四", value: false },
				{ title: "每周五", value: false },
				{ title: "每周六", value: false }
			],
			select_time_list: []
		};
	},
	mounted() {
		$(".header_right>span")
			.html("保存")
			.addClass("fw-6 fc-gray")
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
		this.pageInfo.type = this.getParams().type;
		this.getPageInfo();
	},
	methods: {
		getPageInfo() {
			var info = this.getSelectData().skill;
			if (info.serviceTime) {
				var list = info.serviceTime;
				this.select_time_list = list;
				for (let it of list) {
					for (let tmp of this.dateList) {
						if (tmp.title == it.title) {
							tmp.value = true;
						}
					}
				}
			}
		},
		select_time(i) {
			var len = this.select_time_list.length;
			var newArr = [];
			this.dateList[i].value = !this.dateList[i].value;
			this.dateList.map((val, i) => {
				if (val.value) {
					newArr.push(val);
				}
			});
			this.select_time_list = newArr;

			// this.$dialog.toast({
			//   mes: "最多选择三天...",
			//   timeout: 1500
			// });
			// return;
		},

		do_save() {
			var list = this.select_time_list;
			var count = list.length;
			var type = this.pageInfo.type;
			if (count == 0) {
				this.$dialog.toast({
					mes: "请选择服务时间",
					timeout: 1500
				});
				return;
			}
			var info = this.getSelectData();
			if (!info) {
				var info = {};
			}
			if (!info[type]) {
				info[type] = {};
			}
			info[type].serviceTime = [];
			info[type].serviceTime = list;
			// console.log(list);
			this.setCache("select_data", JSON.stringify(info));
			setTimeout(() => {
				window.history.go(-1);
			}, 300);
		}
	},
	destroyed() {
		$(".header_right>span").html("");
		$(".header_right").unbind("click");
	}
};
</script>
<style lang="scss">
</style>
