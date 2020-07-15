<template>
	<div class="lesson_group w-100">
		<div class="play_modal" v-if="play_show">
			<a href="javascript:;" class="w-100 p-r play_container" @click="play_btn_show = !play_btn_show">
				<a href="javascript:;" class="play_plate p-a"></a>
				<video :src="video_url" autoplay controls class="video_data w-100" @focus="play_btn_show = !play_btn_show"></video>
				<a href="javascript:history.go(-1)" class="play_close_btn p-a" v-if="play_btn_show">
					<span class="iconfont icon-error fw-7 fc-white"></span>
				</a>
			</a>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			play_height: "",
			play_show: false,
			play_btn_show: false,
			video_url: "",
			superFixedHeight: {
				height: true
			}
		};
	},
	mounted() {
		var h = document.documentElement.clientHeight;
		this.play_height = h + "px";
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.video_url = this.getParams().video_url;
			this.play_show = this.getParams().play_show;
		},
	},
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
</style>
