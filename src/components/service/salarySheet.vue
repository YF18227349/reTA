<template>
	<div class="salary_sheet w-100">
		<header class="salary_sheet_header bg-gray w-100">
			<a href="javascript:history.go(-1)" class="arrow-logo fc-white fw-5 iconfont icon-previewleft"></a>
			<span class="header_title fc-dark fw-7">{{header_title}}</span>
			<!-- <a href="javascript:;">
				<span class="fw-5 fc-white fs-3 iconfont icon-search">•••</span>
			</a> -->
			<yd-button-group class="last" @click.native="opendate">
				<span class="fw-5 fc-white fs-3 iconfont icon-search">•••</span>
			</yd-button-group>
			<yd-cell-group class="dn">
				<yd-cell-item>
					<yd-datetime ref="datetime" type="month" :start-date="startDate" :end-date="thisDate" v-model="datetime" slot="right" :callback="choseDate"></yd-datetime>
				</yd-cell-item>
			</yd-cell-group>
		</header>
		<div class="clear-fixed"></div>
		<div class="ss_con" v-show="Status">
			<div class="ss_top">
				<h3>{{ss_top.time}}</h3>
				<p>{{ss_top.cash}}</p>
				<span>{{ss_top.tip}}</span>
			</div>
			<ul class="ss_top2 clearfix">
				<li v-for="item in ss_top2" :key="item.k">
					<p>{{item.k}}</p>
					<span>{{item.v}}</span>
				</li>
			</ul>
			<ul class="ss_mid" :style="`height: ${ssmh}px`">
				<li class="clearfix" v-for="item in ss_mid" :key="item.k">
					<p>{{item.k}}：</p>
					<span>{{item.v}}</span>
				</li>
			</ul>
			<div class="ss_bot">
				<div class="tip">{{ss_bot.tip}}</div>
				<div class="buttons" :style="{ background: ss_bot.buttons.color }" @click="goTo(ss_bot.buttons.text)">{{ss_bot.buttons.text}}</div>
				<div v-show="showtips == 1 ? true : false" class="end_time">工资条即将在<span>{{day}}天{{hr}}小时{{min}}分{{sec}}</span>后自动确认</div>
				<div v-show="showtips == 0 ? true : false" class="end_time">工资条已自动确认</div>
			</div>
		</div>

		<!-- <div class="submit_toast_group" v-if="openDom.status"> -->
			<!-- <div class="tosat_list bg-white">
				<span
					class="tosat_logo iconfont fc-white fw-6"
					:class="openDom.status?'bg-red icon-chahao1':'icon-duihao4 bg-blue'"
				></span>
				<span class="toast_text fc-dark fm-2">{{openDom.text ? openDom.text : '暂无工资信息'}}</span>
				<button class="toast_btn fc-white bg-red fm-1 fw-6" @click="alertBack(openDom.type)">返回</button>
			</div> -->
		<!-- </div> -->
		<div class="ifImg" v-if="openDom.status">
			<img :src="Img">
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			header_title: "工资条",
			startDate: '',
			thisDate: '',
			datetime: '2016-06',
			// tabList: [],
			// data_list: [],
			// tabCode: 0,
			// emptyIsShow: false,
			// params: this.initParam()
			ss_top: {
				time: '', // 2017年11月实发
				cash: '', // 10700.00
				tip: '' // 感谢为公司的付出，辛苦啦
			},
			ss_top2: [
				// {
				// 	k: '应发工资', // salary
				// 	v: '12000.00'
				// },
				// {
				// 	k: '个人所得税', // individual income tax
				// 	v: '1250.00'
				// },
				// {
				// 	k: '公积金', // accumulation fund
				// 	v: '800.00'
				// }

			],
			ss_mid: [
				// {
				// 	k: '应发工资',
				// 	v: '12000.00'
				// },
				// {
				// 	k: '个人所得税',
				// 	v: '1250.00'
				// },
				// {
				// 	k: '基本工资',
				// 	v: '6000.00'
				// },
				// {
				// 	k: '岗位津贴',
				// 	v: '6000.00'
				// },
				// {
				// 	k: '社保',
				// 	v: '800.00'
				// },
				// {
				// 	k: '公积金',
				// 	v: '800.00'
				// },
				// {
				// 	k: '养老保险',
				// 	v: '800.00'
				// },
				// {
				// 	k: '医疗保险',
				// 	v: '800.00'
				// }
			],
			ss_bot: {
				tip: '温馨提示：工资属于敏感信息，请注意保密',
				buttons: {
					color: '#2f9bfe',
					text: '确认'
				},
				end_time: '2020-3-28 10:10:10'
			},
			day: 0,
			hr: 0,
			min: 0,
			sec: 0,
			showtips: 1, // 0已过确认时间，1没过确认时间
			openDom: {
				status: false,
				type: 1
			},
			ssmh: '',
			confirmId: '',
			Status: true,
			Img: ''
		};
	},
	mounted(){
		var h = document.documentElement.clientHeight;
		this.ssmh = h - 44 - 132 - 58 - 32 - 126;
		// h-header-ss_top-ss_top2-ss_mid.margin-ss_bot
		var i = this.getCache("NULL_SALARY_IMG");
		this.Img = this.str2json(i).val;
	},
	created(){
		this.selfMainLoadOpend();
		this.init();
	},
	methods: {
		init(){
			var myDate = new Date();
			this.thisDate = `${myDate.getFullYear()}-${this.add0(myDate.getMonth()+1)}`;
			this.datetime = this.thisDate;
			var url = "Salary-management";
			var param = {
				token: this.getToken(),
				y: myDate.getFullYear(),
				m: this.add0(myDate.getMonth()+1),
				// bug:1
			};
			console.log(param)
			this.funs(url, param, 1);
		},
		add0(m){
			return m < 10 ? `0${m}` : m;
		},
		// 时间插件
		opendate(){
			this.$refs.datetime.open();
		},
		choseDate(){
			// this.ss_top.time = `${this.datetime.slice(0,4)}年${this.datetime.slice(5,8)}月实发`;
			console.log('do something')
			var url = "Salary-management";
			var param = {
				token: this.getToken(),
				y: this.datetime.slice(0,4),
				m: this.datetime.slice(5,8),
				// bug:1
			};
			this.funs(url, param, 1);
		},
		// 倒计时
		countdown: function(){
			// 定义结束时间戳
			const end = Date.parse(new Date(this.ss_bot.end_time));
			// 定义当前时间戳
			const now = Date.parse(new Date());
			// 做判断当倒计时结束时都为0
			if(now >= end){
				this.day = 0;
				this.hr = 0;
				this.min = 0;
				this.sec = 0;
				this.showtips = 0;
				return
			}
			// 用结束时间减去当前时间获得倒计时时间戳
			const msec = end - now;
			let day = parseInt(msec / 1000 / 60 / 60 / 24); //算出天数
			let hr = parseInt(msec / 1000 / 60 / 60 % 24); //算出小时数
			let min = parseInt(msec / 1000 / 60 % 60); //算出分钟数
			let sec = parseInt(msec / 1000 % 60); //算出秒数
			// 给数据赋值
			this.day = day;
			this.hr = hr > 9 ? hr : `0${hr}`;
			this.min = min > 9 ? min : `0${min}`;
			this.sec = sec > 9 ? sec : `0${sec}`;
			// 定义this指向
			const that = this;
			// 使用定时器 然后使用递归 让每一次函数能调用自己达到倒计时效果
			setTimeout(function(){
				that.countdown();
			}, 1000)
		},
		funs(url, param, type){
			this.__initAction(url, param, (res, s) => {
				if (type == 1){
					if (res.status == 1) {
						this.Status = true;
						this.openDom.status = false;
						this.openDom.type = 1;
						var data = res.data;
						console.log("接口",data)
						this.startDate = `${data.help.startTime.y}-${this.add0(data.help.startTime.m)}`;
						this.ss_top.time = data.title;
						this.ss_top.cash = data.number;
						this.ss_top.tip = data.tip;
						this.ss_top2 = data.main.top;
						this.ss_mid = data.main.main;
						this.ss_bot = data.help;
						this.confirmId = data.confirmId;
						this.countdown();
					}else{
						var code = res.code;
						if (code.code == 1) {
							this.Status = false;
							this.openDom.status = true;
							this.Img = code.data.bgsrc;
						}else{
							this.Status = false;
							this.openDom.status = true;
							this.openDom.type = 2;
							this.startDate = `${code.data.help.startTime.y}-${this.add0(code.data.help.startTime.m)}`;
						}
					}
				}else{
					if (res.status == 1) {
						var url = "Salary-management";
						var param = {
							token: this.getToken(),
							y: this.datetime.slice(0,4),
							m: this.datetime.slice(5,8),
							// bug:1
						};
						this.funs(url, param, 1);
					}else{
					}
				}
				this.selfMainLoadClosed();
			});
		},
		// 确认
		goTo(v){
			if(v == '确认'){
				console.log('确认')
				var url = "Salary-confirm";
				var param = {
					token: this.getToken(),
					id: this.confirmId
				};
				this.funs(url, param, 2);
			}else{
				console.log('已确认')
			}
		},
		// alertBack(t) {
		// 	window.history.go(-1);
		// }
	}
};
</script>
<style lang="scss">
	.clearfix:after{ content: ''; display: block; clear: both; visibility: hidden; line-height: 0; height: 0; }
	.dn{ display: none; }
	.salary_sheet{
		.salary_sheet_header{ z-index: 2002 !important; }
		.ss_con{
			.ss_top{
				text-align: center; color: #fff; background: #2f9bfe;
				h3{ padding-top: 10px; line-height: 14px; font-size: 14px; font-weight: normal; }
				p{ padding-top: 8px; line-height: 34px; font-size: 34px; }
				span{ display: block; padding: 26px 0; line-height: 14px; font-size: 14px; }
			}
			.ss_top2{
				width: 100%; background: #5081f8;
				li{
					float: left; width: calc(100% / 3); text-align: center; font-size: 14px; color: #fff;
					p{ padding-top: 14px; line-height: 14px; }
					span{ display: block; padding: 4px 0 12px; line-height: 14px; }
				}
			}
			.ss_mid{
				margin: 16px; background: #fff; border-radius: 3px; box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2); overflow-y: scroll;
				li{
					padding: 0 32px; line-height: 44px; font-size: 14px;
					p{ float: left; font-weight: bold; color: #000; }
					span{ float: right; color: #666; }
				}
			}
			.ss_bot{
				text-align: center;
				.tip{ padding: 12px 0; line-height: 10px; font-size: 12px; color: #999; }
				.buttons{ margin: 0 21px; height: 50px; line-height: 50px; font-size: 20px; color: #fff; border-radius: 6px; }
				.end_time{
					padding: 12px 0 16px; line-height: 14px; font-size: 14px; color: #999;
					span{ color: #dd975f; }
				}
			}
		}
		.ifImg{
			img{ width: 80%; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); }
		}
	}
	.yd-mask{ z-index: 2000 !important; }
	.yd-datetime{ z-index: 2002 !important; }
</style>
