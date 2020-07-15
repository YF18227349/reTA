<template>
	<div class="resumeInfo w-100">
		<!-- <yd-navbar fixed title="简历详情" height="44px" fontsize="17px" color="#fff" bgcolor="#2f9bfe">
				<a href="javascript:history.go(-1)" slot="left">
					<yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
				</a>
			</yd-navbar>-->
		<!-- <div class="clear-fixed"></div> -->
		<div class="resume_info w-100" v-if="resumeInfoList.name">
			<div class="resume_info_items">
				<div class="item1">
					<ul class="resume_title">
						<li class="resume_name fc-dark fw-6 fm-1">{{resumeInfoList.name}}</li>
						<li class="resume_post">
							<span class="post fc-gray fs-3 fw-5 mr-3" v-for="(item,i) in resumeInfoList.posts" :key="i">{{item}}</span>
						</li>
						<li class="resume_score">
							<span class="fs-3 fw-5 fc-dark">{{resumeInfoList.score}}信用分</span>
							<router-link to="/readingguide/15">
								<span class="fs-3 fw-5 fc-dark">[信用规则]</span>
							</router-link>
						</li>
						<li class="resume_count">
							<span class="fs-3 fw-5 fc-dark mr-3">活跃度</span>
							<span class="fs-3 fw-5 fc-dark">{{resumeInfoList.count}}</span>
						</li>
					</ul>
					<span class="item_logo">
						<img :src="resumeInfoList.logo" alt>
					</span>
				</div>
				<div class="item2">
					<ul class="item_detail">
						<li class="item2_title fs-3 fw-6 fc-dark">{{resumeInfoList.status}}</li>
						<li class="item2_list">
							<span class="item iconfont fs-3 fw-5 fc-dark" :class="it.icon" v-for="(it,i) in resumeInfoList.list" :key="i">&nbsp;{{it.txt}}</span>
						</li>
						<li class="item2_detail fs-3 fw-6 fc-gray">{{resumeInfoList.ability}}</li>
					</ul>
				</div>
				<div class="item3">
					<ul class="item3_list">
						<li class="item3_title p-r fs-3 fw-6 fc-dark">
							求职期望
							<span class="point p-a"></span>
						</li>
						<li class="item3_detail">
							<span class="item3_text fs-3 fc-dark fw-6">
								<span class="item3_job">{{resumeInfoList.job}}</span>
								<span class="item3_addr">{{resumeInfoList.addr}}</span>
							</span>
							<span class="item3_salary fc-red fw-6 fm-1">{{resumeInfoList.salary}}</span>
						</li>
						<li class="item3_industry fs-3 fc-dark fw-6">{{resumeInfoList.industry}}</li>
					</ul>
				</div>
				<div class="item4">
					<ul class="item4_list">
						<li class="item4_title p-r fs-3 fw-6 fc-dark">
							工作经历
							<span class="point p-a"></span>
						</li>
						<li class="w-100 text-center" v-if="!resumeInfoList.experience || resumeInfoList.experience.length==0">
							<p class="pt-2 pb-2 pl-4 pr-4 fc-dark fm-1 fc-gray fw-6">-- 没有填写工作经历 --</p>
						</li>
						<li class="item4_detail" v-for="(item,i) in resumeInfoList.experience" :key="i">
							<p class="experience_info">
								<span class="experience_title fs-3 fw-6 fc-dark">{{item.name}}</span>
								<span class="experience_time fs-3 fw-6 fc-gray">{{item.time}}</span>
							</p>
							<p class="experience_post fs-3 fc-dark fw-6">
								<span class="fs-3 fw-6 fc-gray">{{item.industry}}</span>
								<span class="fs-3 fw-6 fc-gray">{{item.post}}</span>
							</p>
							<p class="experience_txt fs-3 fc-gray fw-6">{{item.txt}}</p>
						</li>
					</ul>
				</div>
				<div class="item5">
					<ul class="education_list">
						<li class="education_title p-r fs-3 fw-6 fc-dark">
							教育经历
							<span class="point p-a"></span>
						</li>
						<li class="w-100 text-center" v-if="!resumeInfoList.education || resumeInfoList.education.length==0">
							<p class="pt-2 pb-2 pl-4 pr-4 fc-dark fm-1 fc-gray fw-6">-- 没有填写教育经历 --</p>
						</li>
						<li class="education_detail" v-for="(item,i) in resumeInfoList.education" :key="i">
							<p class="education_info">
								<span class="education_name fs-3 fc-dark fw-6">{{item.name}}</span>
								<span class="education_time fs-3 fc-gray fw-6">{{item.time}}</span>
							</p>
							<p class="education_text">
								<span class="education_degree fs-3 fc-gray fw-6">{{item.degree}}</span>
								<span class="education_major fs-3 fc-gray fw-6">{{item.major}}</span>
							</p>
							<p class="education_txt fs-3 fc-gray fw-6">{{item.txt}}</p>
						</li>
					</ul>
				</div>
			</div>

			<div class="mt-3 bg-white">
				<div class="warn-parent">
					<div class="first-ch">
						<yd-icon name="warn-outline" size="2rem" color="#ff685d"></yd-icon>
					</div>
					<div class="last-ch fc-gray">
						<span>
							警示：以招聘为名收取培训费用、提供培训贷款，或在录用过
							程中需体检、服装、押金登费用的，都属于违法行为。
							一经发现，请
							<router-link :to="`/report/resume/${dataId}`" class="warn-link">立即举报</router-link>，并向当地公安机关报案
						</span>
					</div>
				</div>
			</div>

		</div>

		<div class="resumeInfo_footer w-100 shadow-dark">
			<!--  -->
			<a href="javascript:;" class="resume_btn1 bg-white" @click="do_chat">
				<span class="iconfont icon-kefu fc-dark fw-6"></span>
				<span class="fm-1 fc-dark fw-6">在线沟通</span>
			</a>
			<a href="javascript:;" class="resume_btn2 bg-blue" @click="rightOff">
				<span class="fc-white fm-1 fw-6">邀请面试</span>
			</a>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			id: null,
			resumeInfoList: {
				name: "",
				logo: "",
				posts: [],
				score: "",
				count: "",
				userId: null,
				status: "",
				list: [{
						icon: "icon-book1",
						txt: ""
					},
					{
						icon: "icon-jianzhi",
						txt: ""
					}
				],
				ability: "",
				job: "",
				salary: "",
				addr: "",
				industry: "",
				dataId: null,
				experience: [
					// {
					//   name: "小信电子商务有限公司",
					//   time: "2017.12-至今",
					//   post: "新媒体运营",
					//   txt:
					//     "因为有当兵的经历，所以具有独立分析的能力。习惯将编程规范化，标准化;有较强的事业心及责任感"
					// },
					// {
					//   name: "高薪电子商务有限公司",
					//   time: "2018.12-2019.01",
					//   post: "新媒体运营",
					//   txt:
					//     "因为有当兵的经历，所以具有独立分析的能力。习惯将编程规范化，标准化;有较强的事业心及责任感"
					// }
				],
				education: [
					// {
					//   name: "陕西工业大学",
					//   time: "2010.9-2015.6",
					//   degree: "大专",
					//   major: "新媒体运营"
					// },
					// {
					//   name: "西安中学",
					//   time: "2008.9-2010.6",
					//   degree: "高中",
					//   major: ""
					// }
				],
			},
			userInfo: null,
			myInfo: null,
			sign: "resume"
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: "简历详情",
			type: 1
		});
		this.getPageInfo();
		this.delCache("paymentInfo");
		this.delCache("chatQuery");
	},
	beforeRouteLeave(to, from, next) {
		// if (to.path == "/Information") {
		// 	to.meta.keepAlive = true;
		// }
		if(to.path == `/report/resume/${this.dataId}`) {
            to.meta.needLogin = true;
		}
		next();
	},
	methods: {
		getPageInfo() {
			this.selfMainLoadOpend();
			var token = this.getToken();
			var id = this.getParams().pid;
			this.id = id;
			var params = {
				token,
				id
			};
			var url = this.Global.baseURL + "/-.jsp";

			var that = this;
			this.__initAction("Resume-infoMemberResumes", params, (res, s) => {
				console.log(res)
				if (s == 1) {
					var data = res.data;
					// var user = res.data.userInfo;
					// var mySelf = res.data.myInfo;
					this.userId = data.userId;
					// this.userInfo = user;
					// this.myInfo = mySelf;
					var arr = this.resumeInfoList;
					this.dataId = data.id;
					arr.name = data.consignee;
					arr.logo = data.portrait;
					arr.posts = data.resumeIndustry.split(",");
					arr.score = "666";
					arr.count = data.active;
					var list = this.resumeInfoList.list;
					list[0].txt = data.education;
					list[1].txt = data.years + "年";
					arr.ability = data.infos;
					arr.job = data.resumeType;
					arr.salary = data.salary;
					arr.industry = data.resumeIndustry;
					var list = data.company;
					for (let it of list) {
						var a = {};
						a.name = it.corporateName;
						a.time = it.andtTime;
						a.post = it.positionName;
						a.txt = it.content;
						a.industry = it.industry;
						arr.experience.push(a);
					}
					var list1 = data.school;
					for (let it of list1) {
						var a = {};
						a.name = it.schoolName;
						a.time = it.openTime + " - " + it.shutTime;
						a.degree = it.education;
						a.txt = it.showContent;
						a.major = it.major;
						arr.education.push(a);
					}
					this.selfMainLoadClosed();
				} else {
					this._msg(res.info);
				}
				this.selfMainLoadClosed();
			});
		},

		do_chat() { //跳转
			var userId = this.userId;
			var baseUid = this.getUserInfo().uid;
			var sign = this.sign; //项目标识符 (比如: 兼职=demands 技能= skills 岗位=quarters 简历=resume)
			var gid = this.id; //产品的id
			if (userId == baseUid) {
				this.selfAlertBox({
					mes: "您不能和自己发布的订单沟通",
					cancel: false,
					alert: true
				});
				return;
			};
			var query = {
				sign,
				gid,
			};
			this.$router.push({
				path: `/interview_chat/${this.id}`,
				query
			})
		},

		rightOff() {
			var c_status = 5;
			var sign = this.sign; //项目标识符 (比如: 兼职=demands 技能= skills 岗位=quarters 简历=resume)
			var gid = this.id; //产品的id
			var goodsInfo = `${sign}|${gid}`;
			var token = this.getToken();
			var url = "Tloong-getSwopUpd";
			var params = {
				goodsInfo,
				c_status,
				token
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					this._msg("已约面试请耐心等待(^_^)");
				} else {
					this._msg(res.info);
				}
			});
		}
	}
};
</script>

<style lang="scss">
	.resumeInfo {
		background: #f5f5f5;
		.resume_info {
			.resume_info_items {
				.item5 { border-bottom: 0; }
			}
		}
	}
	.yd-navbar { font-weight: 600; }
	.yd-back-icon:before,
	.yd-next-icon:before { font-size: 17px; margin: 10px; }
	.warn-parent {
		display: flex; justify-content: space-between; padding: 15px 10px;
		.first-ch { display: flex; flex-direction: column; justify-content: center; margin-right: 0.5rem; }
		.last-ch {
			font-size: 14px;
			.warn-link { color: #2f9bfe; text-decoration: #ddd; }
		}
	}
</style>
