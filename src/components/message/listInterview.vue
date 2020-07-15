<template>
	<div class="interview w-100">
		<div class="interview_header_group p-r w-100">
			<header class="interview_header bg-blue w-100">
				<a href="javascript:history.go(-1)" class="arrow-logo fc-white fw-5 iconfont icon-previewleft"></a>
				<div class="select_interview">
					<span class="select_interview_title selected" v-if="isBarCode == 1">面试</span>
					<span class="select_interview_title selected" v-if="isBarCode == 2">邀约</span>
				</div>
				<a href="javascript:;" class="last"></a>
			</header>
		</div>
		<div class="clear-fixed"></div>
		<div class="interview_items w-100" v-if="isBarCode==1">
			<a href="javascript:;" v-for="(item,i) in interviewList" :key="i" @click="do_chat(item.gid,item.sign,item.toUid)">
				<self-silde :item="item.item" :index="i" @deleteClick="delItem(item.gid,item.sign,i)"></self-silde>
			</a>
			<a href="javascript:;" v-if="interviewList.length<=0">
				<self-no-data title="暂无数据..." size="16"></self-no-data>
			</a>
		</div>

		<div class="interview_items" v-if="isBarCode==2">
			<a href="javascript:;" v-for="(item,i) in InterviewerList" :key="i" @click="do_chat(item.gid,item.sign,item.toUid)">
				<self-silde :item="item.item" :index="i" @deleteClick="delItem(item.gid,item.sign,i)"></self-silde>
			</a>
			<a href="javascript:;" v-if="InterviewerList.length<=0">
				<self-no-data title="暂无数据..." size="16"></self-no-data>
			</a>
		</div>
	</div>
</template>

<script>
const NoData = ()=>import("../sub/noDataModel.vue");
const Silde = ()=>import("../sub/slide.vue");
export default {
	data() {
		return {
			isSelect: true,
			id: null,
			tab_code: 0,
			isBarCode: 1,
			interviewList: [],
			InterviewerList: [],
			myInfo: null,
			toInfo: null
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.getPageInfo();
		this.getDataInfo();
		this.delCache("chatQuery");
	},
	mounted() {
		this.autoHeaderSize();
	},
	updated() {

	},
	destroyed() {
		this.save_pageInfo();
	},
	methods: {
		getPageInfo() { //获得页面信息
			var info = this.getSelectData();
			if (info && info.pageInfo && info.pageInfo.interview && info.pageInfo.interview.pageTabCode) {
				this.tab_code = info.pageInfo.interview.pageTabCode;
			};
			var userInfo = this.getCache("userInfoExt", 2);
			if (userInfo) {
				var rid = userInfo.rid; //1 ->个人  2 ->企业
			}else{
				var rid = 1; //1 ->个人  2 ->企业
			}
			this.isBarCode = rid;
		},

		getDataInfo() { //获得列表数据
			var token = this.getToken(); //获得口令
			var mapType = 2; //1|兼职技能  2|岗位简历
			var url = "Tloong-getMsgList";
			var params = {
				token,
				mapType
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					var data = res.data;
					var newArr = [];
					if (data.constructor === Object) {
						for (var key in data) {
							newArr.push(data[key]);
						};
					} else if (data.constructor === Array) {
						newArr = data;
					};
					this.showData(newArr, this.isBarCode);
				} else {
					if (this.isBarCode == 1) {
						this.interviewList = [];
					} else if (this.isBarCode == 2) {
						this.InterviewerList = [];
					}
					this.__Sleep(e => {
						this.selfMainLoadClosed();
					});
				}
			});
		},

		showData(data, isCode) {
			var baseUid = this.getCache('user_info', 2).uid;
			isCode = parseInt(isCode);
			switch (isCode) {
				case 1: //个人用户
					this.interviewList = [];
					data.map((val, i) => {
						var obj = {};
						obj.gid = val.goodId;
						obj.sign = val.goodType;
						var from = val.formUser.userId;
						var to = val.toUser.userId;
						if (baseUid == from) {
							obj.toUid = to;
						} else {
							obj.toUid = from;
						}
						obj.item = {
							u_title: val.firmName,
							u_name: val.toUser.lastName,
							u_logo: val.toUser.portrait,
							u_msg: val.lastMsg,
							u_time: val.create_time,
							u_id: val.id
						}
						if (val.goodType == "quarters") {
							obj.item.u_type = "岗位";
						} else if (val.goodType == "resume") {
							obj.item.u_type = "简历";
						};
						this.interviewList.push(obj);
					});
					break;
				case 2: //企业用户
					this.InterviewerList = [];
					data.map((val, i) => {
						var obj = {};
						obj.gid = val.goodId;
						obj.sign = val.goodType;
						var from = val.formUser.userId;
						var to = val.toUser.userId;
						if (baseUid == from) {
							obj.toUid = to;
						} else {
							obj.toUid = from;
						}
						obj.item = {
							u_title: val.firmName,
							u_name: val.toUser.lastName,
							u_logo: val.toUser.portrait,
							u_msg: val.lastMsg,
							u_time: val.create_time,
							u_id: val.id
						}
						if (val.goodType == "quarters") {
							obj.item.u_type = "岗位";
						} else if (val.goodType == "resume") {
							obj.item.u_type = "简历";
						};
						this.InterviewerList.push(obj);
					})
					break;
			}
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			});
		},

		autoHeaderSize() { //自动适应尺寸
			try {
				var h = document.documentElement.clientHeight;
				$(".interview_header_group").css("height", `${h * 0.07}px`);
				$(".select_interview").css("height", "55%");
				$(".select_interview>span").css("font-size", `${h * 0.02}px`);
			} catch (e) {
				console.log(e);
				setTimeout(() => {
					var h = document.documentElement.clientHeight;
					$(".interview_header_group").css("height", `${h * 0.07}px`);
					$(".select_interview").css("height", "55%");
					$(".select_interview>span").css("font-size", `${h * 0.02}px`);
				}, 2000);
			};
		},

		save_pageInfo() { //保存页面信息
			var info = this.getSelectData();
			if (!info) {
				info = {};
			}
			if (!info.pageInfo) {
				info.pageInfo = {};
			}
			if (!info.pageInfo.interview) {
				info.pageInfo.interview = {};
			}
			info.pageInfo.interview.pageTabCode = this.tab_code;
			// console.log(info.pageInfo.interview.pageTabCode);
			this.setCache("select_data", JSON.stringify(info));
		},

		do_chat(gid, sign, toUid) {
			var query = {
				sign,
				gid,
				toUid
			};
			if (this.isBarCode == 1) {
				this.$router.push({
					path: `/interviewer_chat/${gid}`,
					query
				});
			} else if (this.isBarCode == 2) {
				this.$router.push({
					path: `/interview_chat/${gid}`,
					query
				});
			};
		},

		delItem(gid, sign, i) { //删除
			if (this.isBarCode.constructor !== Number) {
				this.isBarCode = parseInt(this.isBarCode);
			};
			switch (this.isBarCode) {
				case 1:
					var arr = this.interviewList;
					arr.splice(i, 1);
					this.interviewList = arr;
					break;
				case 2:
					var arr = this.InterviewerList;
					arr.splice(i, 1);
					this.InterviewerList = arr;
					break;
			};
			var token = this.getToken();
			var goodsId = gid;
			var goodType = sign;
			var params = {
				token,
				goodsId,
				goodType
			};
			var url = "Tloong-delMsg";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					console.log(res);
					// this.getDataInfo();
				}
			})

		},
	},

	components: {
		"self-no-data": NoData,
		"self-silde": Silde
	}
};
</script>

<style lang="scss">
.yd-navbar {
		font-weight: 600;
}
.yd-back-icon:before,
.yd-next-icon:before {
		font-size: 17px;
		margin: 10px;
}
.selected {
		border: 1px solid #2f9bfe;
		color: #2f9bfe;
		background: #fff;
}
.unSelected {
		border: 1px solid #fff;
		color: #fff;
		background: #2f9bfe;
}
</style>
