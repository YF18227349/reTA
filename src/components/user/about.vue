<template>
	<div class="about">
		<div class="about-img">
			<img :src="authLogo" alt>
			<h3>{{aboutTitle}}</h3>
			<p>{{aboutInfo}}</p>
		</div>
		<div class="about-ul">
			<ul>
				<li v-for="(tmp,i) in aboutList" :key="i">
					<router-link :to="`/readingguide/${tmp.typeId}`" class="w-100">
						<p>{{tmp.title}}</p>
						<span class="share_arrow iconfont icon-previewright"></span>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="about-ft">
			<div class="about-ft-title">
				<router-link to="/readingguide/12">《软件许可及服务协议》</router-link>和
				<router-link to="/readingguide/11">《隐私保护协议》</router-link>
			</div>
			<div class="about-ft-footer">
				<p>天安人力版权所有</p>
				<p>copyright @{{`${timer.years}`}}</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			header_title: "关于",
			aboutImg: "",
			aboutTitle: "天安人力",
			aboutInfo: "1.0.0",
			aboutList: [{
					title: "功能介绍",
					typeId: 13
				},
				{
					title: "营业执照",
					typeId: 14
				},
				// {
				// 	title: "版本更新"
				// }
			],
			authLogo: "static/imgs/yf/logo.png",
			timer: {}
		};
	},
	mounted() {
		this.selfMainLoadOpend();
		//设置标题
		this.$store.commit("setHeaderStyle", {
			txt: this.header_title,
			type: 0
		});
		var b = this.getCache("APPLOGO", 2);
		// this.authLogo = b.val;
		this.authLogo = "static/imgs/yf/logo.png";
		this.init();
	},
	methods: {
		init() {
			// 获取菜单数据
			this.__Sleep(e => {
				this.selfMainLoadClosed();
			}, 1000);
			this.getDate();
		},
		getDate() {
			var timer = this._getDate();
			timer.years = timer.years + 1;
			this.timer = timer;
		}
	}
};
</script>
<style lang="scss">
.about-img {
		line-height: 1.6;
		margin: 15px auto;
		text-align: center;
}
.about-img h3 {
		margin-top: 5px;
		font-size: 18px;
}
.about-img p {
		margin-bottom: 5px;
		font-size: 14px;
}
.about-img img {
		display: block;
		margin: 0 auto;
		border-radius: 5px;
		text-align: center;
		// background: red;
		width: 100px;
		height: 100px;
}
.about-ul {
		width: 95%;
		margin: 0 auto;
}
.about-ul ul {
		border-radius: 5px;
		padding: 5px 15px;
		background-color: #fff;
}
.about-ul li,
.about-ul li a {
		padding: 0 15px;
		border-bottom: 1px solid #e7e7e7;
		background-color: #fff;
		height: 44px;
		line-height: 44px;
		display: flex;
		justify-content: space-between;
		color: #7b7b7b;
		font-size: 14px;
}
.about-ul li:last-child,
.about-ul li:last-child a {
		border: none;
}
.about-ul li p {
		color: #7b7b7b;
		font-size: 14px;
}
.about-ft {
		margin-bottom: 15px;
		line-height: 2;
		text-align: center;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
}
.about-ft-title a {
		color: #4055d0;
}
.about-ft-footer {
		color: #666;
}
</style>
