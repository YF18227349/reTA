<template>
	<div class="messages w-100">
		<ul class="messages_list w-100 bg-white">
			<li class="list_item">
				<router-link to="/message_system" class="item">
					<img class="item_logo" src="/static/imgs/main/message_logo-01.png">
					<div class="item_txt">
						<span class="txt1 fc-dark fm-1 fw-6">系统消息</span>
						<span class="txt2 fc-gray fs-3 fw-6">系统公告</span>
					</div>
					<span class="item_arrow fc-gray fw-5 iconfont icon-previewright"></span>
				</router-link>
			</li>
			<li class="list_item">
				<router-link to="/Interview" class="item">
					<img class="item_logo" src="/static/imgs/main/message_logo-02.png">
					<div class="item_txt">
						<span class="txt1 fc-dark fm-1 fw-6">邀请提醒</span>
						<span class="txt2 fc-gray fs-3 fw-6">邀请消息</span>
					</div>
					<span class="item_arrow fc-gray fw-5 iconfont icon-previewright"></span>
				</router-link>
			</li>
		</ul>
		<div class="clear-messages-list"></div>
		<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
			<div class="message_news w-100" slot="list">
				<!-- class="news_item w-100  bg-white" -->
				<a href="javascript:;" v-for="(item,i) in newsList" :key="i" @click="do_chat($event,item.gid,item.sign,item.userId,item.toUid)">
					<!-- <span class="news_logo">
						<img :src="item.u_logo" alt class="shadow-dark">
					</span>
					<div class="news_info">
						<span class="news_info_title">
							<span>{{item.u_name}}</span>
							<span class="hot_mark_blue">{{item.u_type}}</span>
						</span>
						<span class="news_info_msg">{{item.u_msg}}</span>
					</div>
					<span class="news_info_time text-right">{{item.u_time}}</span> -->
					<self-silde v-if="newsList[i] !=null" :item="item.item" :index="i" @deleteClick="delItem(item.gid,item.sign,i)"></self-silde>
				</a>
			</div>
			<!-- 数据全部加载完毕显示 -->
			<span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span>
		</yd-infinitescroll>
		<!-- <a href="javascript:;" v-if="newsList.length<=0">
			<self-no-data title="暂无数据..."></self-no-data>
		</a> -->
	</div>
</template>
<script>
const LoadPlate = ()=>import("../sub/load_data_plate");
const NoData = ()=>import("../sub/noDataModel.vue");

const Silde = ()=>import("../sub/slide.vue");
export default {
	data() {
		return {
			pageInfo: {
				header_title: "消息"
			},
			selfUId: null,
			loading_status: false,
			newsList: [],
			param: {
				page: null,
				length: null
			},
		};
	},
	created() {
		this.selfMainLoadOpend();
		this.$store.commit("setHeaderStyle", {
			txt: this.pageInfo.header_title,
			type: 0
		});
		this.getPageInfo();
		this.delCache("chatQuery");
	},
	mounted() {
		var h = document.documentElement.clientHeight;
		var h1 = $(".messages_list").height();
		$(".clear-messages-list").css("height", `${172}px`);
	},
	methods: {
		getPageInfo() {
			var token = this.getToken();
			var mapType = 1; //1|兼职技能  2|岗位简历
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
					// console.log(newArr);
					newArr.map((it, i) => {
						var obj = {};
						obj.uId = it.userId;
						obj.sign = it.goodType;
						obj.gid = it.goodId;
						obj.toUid = it.toUser.userId;
						obj.item = {
							u_name: it.goodsId.data.title,
							u_logo: it.toUser.portrait,
							u_msg: it.lastMsg,
							u_time: it.create_time,
						};
						if (it.goodType == "skills") {
							obj.item.u_type = "技能";
						} else if (it.goodType == "demands") {
							obj.item.u_type = "兼职";
						};
						this.newsList.push(obj);
					});

					this.selfMainLoadClosed();
				} else {
					this.selfMainLoadClosed();
				};
			});
		},

		do_chat($event, gid, sign, userIds,toUid) {
			$event.stopPropagation();
			var userId = userIds; //产品发布人id
			var baseUid = this.getUserInfo().uid; //用户id
			var query = {
				sign,
				gid,
				toUid
			};
			this.$router.push({
				path: "/service_chat",
				query
			});
		},

		delItem(gid, sign, i) { //删除
			var arr = this.newsList;
			arr.splice(i, 1);
			this.newsList = arr;

			var goodsId = gid;
			var goodType = sign;
			var token = this.getToken();
			var url = "Tloong-delMsg";
			var params = {
				goodsId,
				goodType,
				token
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					console.log(res);
					// this.getPageInfo();
				}
			})
		},

		loadList() {}
	},
	components: {
		"self-load-plate": LoadPlate,
		"self-no-data": NoData,
		"self-silde": Silde
	}
};
</script>
<style lang="scss">
	.message_news { overflow: scroll; }
</style>
