<template>
	<div class="lesson_group w-100">
		<header class="lesson_group_header bg-gray shadow-dark w-100">
			<a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
			<span class="header_title fc-dark">{{header_title}}</span>
			<a href="javascript:;" class="last"></a>
		</header>

		<div class="clear-fixed-super"></div>
		<div class="clear-fixed"></div>

		<div class="c1" style="overflow-y: auto;z-index:10;">
			<yd-scrollnav height="44px" color="#8f8f94" current-color="#028ce4" :callback="back_value">
				<yd-scrollnav-panel index :label="item.title" v-for="(item, key) in tabList" :key="key"></yd-scrollnav-panel>
			</yd-scrollnav>
		</div>

		<div class="clear-fixed"></div>
		<div v-if="emptyIsShow">
			<!--<self-no-data title="暂无数据..." size="16"></self-no-data>-->
			<!-- <div class="ifImg" v-if="Img"> -->
		    <div class="ifImg">
			    <img :src="Img.val">
		    </div>
		</div>
		<div class="lesson_group_list w-100">
			<!-- <p class="w-100 text-center fc-dark fm-3 fw-6" v-if="emptyIsShow">暂无数据...</p> -->
			<div class="lesson_video mb-3" v-for="(item,i) in video_list" :key="i" @click="open_video(i)">
				<img :src="item.thumb" alt>
				<div class="lesson_info">
					<span class="mb-3 ml-2">{{item.title}}</span>
					<yd-cell-item>
						<span slot="left">{{tabList[tab_code].label}}</span>
						<span slot="right">{{item.videoScore}}</span>
					</yd-cell-item>
				</div>
			</div>
		</div>

		<self-load-frame></self-load-frame>

		<!-- <div class="play_modal" v-if="play_show">
			<a href="javascript:;" class="w-100 p-r play_container" @click="play_btn_show = !play_btn_show">
				<a href="javascript:;" class="play_plate p-a"></a>
				<video :src="video_url" autoplay controls class="video_data w-100" @focus="play_btn_show = !play_btn_show"></video>
				<a href="javascript:;" class="play_close_btn p-a" @click="play_show=false" v-if="play_btn_show">
					<span class="iconfont icon-error fw-7 fc-white"></span>
				</a>
			</a>
		</div> -->
	</div>
</template>
<script>
const NoData = ()=>import("../sub/noDataModel");
const LoadFrame = ()=>import("../sub/loading_frame");
export default {
	data() {
		return {
			header_title: "课程分类",
			tabList: [],
			video_list: [],
			tab_code: 0,
			emptyIsShow: false,
			params: this.initParam(),

			play_height: "",
			play_show: false,
			play_btn_show: false,
			video_url: "",
			superFixedHeight: {
				height: true
			},
			Img:'https://base.sxtian.com/public/uploads/configBox/images/20200427/f73e7083c1ee7db57e0b0a0c9d5d0e5e.png'
		};
	},
	mounted() {
		var h = document.documentElement.clientHeight;
		this.play_height = h + "px";
	},
	created() {
		this.Img = this.getCache("NULL_SALARY_IMG", 2);
		this.selfMainLoadOpend();
		this.params.fields = "create_time";
		this.init();
	},
	methods: {
		init() {
			var param = {
				token: this.getToken()
			};
			this.__initAction("Video-getTypeVideo", param, (res, s) => {
				if (s == 1) {
					var data = res.data;
					var newData = data.reverse();
					this.tabList = newData;
					this.getList(res.data[0].id);
				}
			});
		},
		getList(id) {
			// this.selfMainLoadOpend();
			this.emptyIsShow = false;
			this.params.tid = id;
			this.video_list = [];
			this.__initAction("Video-getlistVideo", this.params, (res, s) => {
				if (s == 1) {
					this.video_list = res.data;
				} else {
					this.emptyIsShow = true;
				}
				this.selfLoadClosed();
				this.selfMainLoadClosed();
			});
		},
		back_value(v) {
			this.selfLoadOpend({
				mes: "",
				font: 40,
				status: true,
				color: "fc-blue"
			});
			this.getList(this.tabList[v].id);
		},
		open_video(i) {
			// this.play_show = true;
			this.video_url = this.video_list[i].url;
			this.$router.push({
				name: 'VideoPlayer',
				params: {
					video_url: this.video_url,
					play_show: true
				}
			})
		}
	},

	components: {
		"self-no-data": NoData,
		"self-load-frame": LoadFrame
	}
};
</script>
<style lang="scss">
	.c1 {
		width: 100%;
		height: 44px;
		background: #fff;
		position: fixed;
	}
	ul.yd-scrollnav-tab-item {
		li {
			font-size: 14px;
			font-weight: 600;
			margin-right: 15px;
			padding: 0 5px;
			span {
				margin-left: 10px;
				height: 40px;
			}
		}
	}
	.yd-scrollnav-current {
		span {
			border-bottom: 2px solid #028ce4;
		}
	}
	ul.yd-scrollnav-tab-item > li.yd-scrollnav-current > i {
		display: none;
	}
	div.yd-scrollnav-toggle {
		width: 50px;
		display: none;
	}
	.clear-fixed-super {
		position: fixed;
		top: 0;
		width: 100%;
		height: 3rem;
		background-color: #f5f5f5;
	}
	.ifImg{
		img{ width: 80%; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); }
	}
</style>
