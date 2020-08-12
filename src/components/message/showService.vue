<template>
	<div class="interview_chat w-100">
		<!-- id="elm" :style="{height:(curHeight-135)+'px'}" -->
		<div class="robConfirm" @click="hiddenIcon">
			<ul class="items" ref="itemsInfos" v-if="confirmInfo.price || confirmInfo.salary">
				<!-- content -->
				<li class="item1">
					<span>{{confirmInfo.title}}</span>
				</li>
				<li class="item2">
					<span class="info_text">
						<span>{{confirmInfo.name}}</span>
						<!-- <img :src="confirmInfo.logo" alt> -->
						<span
							class="iconfont"
							:class="type == 0 ?'icon-renzheng fc-green':type == 1?'icon-3qiyezhengxin83a638 fc-blue':''"
						></span>
					</span>
					<span class="info_price">
						<span class="fc-red">{{confirmInfo.price}}{{confirmInfo.salary}}</span>
					</span>
				</li>
				<li class="item3">
					<span class="info_detail fc-dark fw-6">{{confirmInfo.detail}}</span>
				</li>
				<!-- btns  -->
				<li class="item4 mt-3" v-if="isBtnCode">
					<a
						href="javascript:;"
						v-if="flag!='skills'"
						v-text="`预 约`"
						@click.self="updatedStatus(confirmInfo.uGId,1)"
					></a>
					<a
						href="javascript:;"
						v-if="flag=='skills'"
						v-text="`下单`"
						@click="play(1,confirmInfo.sign,confirmInfo.gid)"
					></a>
				</li>
				<li class="item5 mt-3" v-if="isAgreeCode">
					<a href="javascript:;" @click="updatedStatus(confirmInfo.uGId,2)">
						<span v-text="`同意`"></span>
					</a>
					<a href="javascript:;" @click="updatedStatus(confirmInfo.uGId,3)">
						<span v-text="`拒绝`"></span>
					</a>
				</li>
				<li class="item4 pt-4" v-if="isPayCode">
					<a href="javascript:;" @click="play(0,confirmInfo.sign,confirmInfo.gid)" v-if="false">
						<span>平台支付</span>
					</a>
					<a href="javascript:;" v-if="false">
						<span>线下支付</span>
					</a>
					<a
						href="javascript:;"
						v-show="confirmInfo.sign=='demands'"
						@click.stop="play(1,confirmInfo.sign,confirmInfo.gid)"
					>
						<span>履约保证金</span>
					</a>
				</li>
				<li class="item7 pt-2" v-show="pageInfo.info">
					<span class="fc-gray fs-2 fw-6">提示：{{pageInfo.info}}</span>
				</li>
				<li class="item7 pt-2">
					<span class="fc-red fs-2 fw-6">注:邀约后可自行协商平台支付,线下支付和是否需要履约保证金</span>
				</li>
			</ul>

			<!-- <div :style="`height:${itemInfosHeight}px`">
			</div>-->

			<!-- 单条消息 -->
			<ul class="msg-list mt-5" id="elm" :style="{height:(curHeight-150-itemInfosHeight)+'px'}">
				<li v-for="(item,i) of msgDataLists" :key="i" v-if="msgDataLists.length>0">
					<!-- 房间存储数据控制 -->
					<!--  -->
					<div
						v-if="(fromNum == item.fromNum || fromNum == item.toNum) && (toNum == item.toNum || toNum == item.fromNum)"
					>
						<!-- 你的信息 -->
						<div class="msg-list-item-you mt-4" v-if="fromNum != item.fromNum">
							<div class="list-item-left">
								<img :src="item.portrait" alt class="item-image" style="width:50px; height:50px;" />
							</div>
							<div class="list-item-right">
								<div class="item-name-time">
									<h3 v-text="item.userName" style="display:inline-block; font-size: 15px;"></h3>
									<span v-text="item.strDate"></span>
								</div>
								<div class="d-inline-block" v-if="item.txt">
									<div class="item-contnet mt-2" ref="elContent">
										<span class="content" v-for="(cell,o) in item.txt" :key="o">
											<span v-if="cell">
												<span v-if="cell.text" v-text="cell.text"></span>
												<img v-if="cell.url" :src="cell.url" alt />
											</span>
										</span>
									</div>
								</div>
								<div
									class="content-audio-you mt-3"
									v-if="!item.txt"
									@click="handlePlay(i,item.record)"
								>
									<img class="audio-play-you" :src="playIconImg" alt />
									<audio class="audio" :src="item.record" :id="`audio${i}`" preload></audio>
								</div>
							</div>
						</div>
						<!-- 我的信息 -->
						<div class="msg-list-item-i mt-4" v-if="fromNum == item.fromNum">
							<div class="list-item-left">
								<div class="item-name-time">
									<span v-text="item.strDate"></span>
									<h3 v-text="item.userName" style="display:inline-block; font-size: 15px;"></h3>
								</div>
								<div class="d-inline-block" v-if="item.txt">
									<div class="item-contnet mt-2" ref="elContent">
										<span class="content" v-for="(cell,o) in item.txt" :key="o">
											<span v-if="cell">
												<span v-if="cell.text" v-text="cell.text"></span>
												<img v-if="cell.url" :src="cell.url" alt />
											</span>
										</span>
									</div>
								</div>
								<div
									class="content-audio-i mt-3"
									v-if="!item.txt"
									@click="handlePlay(i,item.record)"
								>
									<img class="audio-play-i" :src="playIconImg" alt />
									<audio :src="item.record" :id="`audio${i}`" preload></audio>
								</div>
							</div>
							<div class="list-item-right">
								<!-- <img src="" alt=""> -->
								<img :src="item.portrait" alt class="item-image" style="width:50px; height:50px;" />
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<footer
			class="interview_chat_footer w-100 bg-gray shadow-dark"
			ref="footElement"
			:style="footIndex"
			v-show="fot"
		>
			<span class="iconfont icon-yuyin fc-dark mr-1" @click="showIcon($event,1)"></span>
			<input type="text" v-model="textMsg" @keyup.13="sendPrivateText" @focus="hiddenIcon" />
			<span class="iconfont icon-biaoqing1 ml-1" @click="showIcon($event,0)"></span>
			<!-- <span class="iconfont icon-jinakangbaoicons19"></span> -->
			<a href="javascript:;" @click="sendPrivateText" class="txt-send-btn ml-4">发送</a>
		</footer>
		<!-- 表情&录音模态框 -->
		<div class="eiej-model" ref="eiejElement" :style="eiejIndex">
			<!-- 表情包 -->
			<ul class="icon-list" v-show="modeState == 0">
				<li class="icon-list-item" v-for="(item,i) of iconMsgList" :key="i">
					<a href="javascript:;" class="icon-list-link">
						<img :src="item.url" alt class="icon-list-img" @click="sendPicText(item.str)" />
					</a>
				</li>
				<a href="javascript:;" class="icon-del" @click="delIcon">
					<!-- <self-button title="DEL"></self-button> -->
					<span class="icon-del-btn">删除</span>
				</a>
			</ul>
			<!-- 录音 -->
			<div class="recorder-model" v-show="modeState == 1">
				<!-- <input type="file" name="files" ref="SelfAudio"> -->
				<div class="mb-3">
					<div>
						<div v-text="startStr"></div>
					</div>
				</div>
				<a href="javascript:;" v-if="recBlobUrl!=null">
					<audio :src="recBlobUrl" ref="luyin" id="Audios1" preload></audio>
				</a>
				<div class="recorder-box">
					<div class="recorder-border" @click="actionRecorder">
						<!-- http://static.sxtian.com/recorderplay/recorder.png -->
						<!-- http://static.sxtian.com/recorderplay/stop.png -->
						<!--  http://static.sxtian.com/recorderplay/start.png  -->
						<img class="recorder-rec" :src="playImgUrl" alt />
					</div>
				</div>
				<p v-if="recConfig.duration!=null">
					<span v-text="recConfig.duration/1000"></span>秒
				</p>
				<div class="list-btn" v-if="this.recConfig.playCode == 2">
					<a href="javascript:;" class="list-link" @click="sendPrivateAudio(0)">
						<span class="list-link-item">取消</span>
					</a>
					<a href="javascript:;" class="list-link" @click="sendPrivateAudio(1)">
						<span class="list-link-item">发送</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
// const SelfButton = ()=>import("@/components/sub/Button.vue");
const Button = ()=>import("../sub/Button");
// import "../../assets/imConfig/recorder/recorder.mp3.min.js";
import "../../assets/imConfig/recorder/recorder-core.js";
import "../../assets/imConfig/recorder/mp3.js";
import "../../assets/imConfig/recorder/mp3-engine.js";
import { setTimeout } from "timers";

export default {
	data() {
		return {
			pageInfo: {
				info: "",
				header_title: "",
				toUid: ''
			},
			playIconCode: 0,
			playIcon: [
				{
					name: "play",
					url: "/static/imgs/yf/play.png"
				},
				{
					name: "playing",
					url: "http://static.sxtian.com/recorderplay/play/gif.gif"
				},
				{
					name: "pause",
					url: "static/imgs/yf/pause.png"
				}
			],
			orderId: null,
			headerHeight: null,
			itemInfosHeight: null,
			param_info: {},
			paths: null, //路由地址状态
			msgInfo: "", //
			showTp: null,
			status: null,
			id: null,
			type: null,
			code: null,
			url: "",
			lng: "",
			lat: "",
			pay_code: null,
			confirmInfo: {
				title: "",
				name: "",
				logo: "",
				price: "",
				detail: ""
			},
			flag: "", //产品类型标识符
			goodsId: null, //产品id
			isBtnCode: false,
			isAgreeCode: false, //同意&拒绝 状态
			isPayCode: false, //支付btn 状态
			textMsg: "", //文本消息
			toInfo: {}, //联系人详情    -- new
			fromNum: null, //唯一编号    -- new
			fromInfo: {}, //我的详情    -- new
			toNum: "", //联系对象 id    -- new
			day: 3, //聊天记录天数
			baseUserId: null, //我的id   -- new
			postUserId: null, //订单发布人  -- new
			rules: "asc", //聊天记录排序规则 desc->倒序  asc->正序
			curHeight: document.documentElement.clientHeight,
			iconMsgList: [], //图标列表
			footIndex: {
				//输入框位置
				bottom: true
			},
			eiejIndex: {
				//表情包位置
				bottom: true,
				height: true
			},
			isIconCode: true, //表情模态框控制
			modeState: 0,
			userName: "", //当前用户名
			IntiTime: null, //当前时间
			regex: /(\[.*?\])/g, //表情正则
			params: {
				url: "",
				info: ""
			},
			recConfig: {
				//录音
				blob: null,
				blobUrl: null,
				test: null,
				duration: null,
				isCode: true,
				content: null,
				img: [
					{
						name: "录音",
						url: "static/imgs/yf/recorder.png"
					},
					{
						name: "暂停",
						url: "/static/imgs/yf/stop.png"
					},
					{
						name: "播放",
						url: "/static/imgs/yf/start.png"
					}
				],
				startPoint: ["请点击录音", "停止录音", "录音试听"],
				imgCode: 0,
				playCode: 0
			},
			newRec: null,
			set: {
				type: "mp3", //输出类型：mp3,wav等，使用一个类型前需要先引入对应的编码引擎

				bitRate: 16, //比特率 wav(位):128、96 、32、16、8，MP3(单位kbps)：8kbps时文件大小1k/s，16kbps 2k/s，录音文件很小

				sampleRate: 24000, //采样率，wav格式文件大小=sampleRate*时间；mp3此项对低比特率文件大小有影响，高比特率几乎无影响。
				//wav任意值，mp3取值范围：48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000

				bufferSize: 8192, //AudioContext缓冲大小。会影响onProcess调用速度，相对于AudioContext.sampleRate=48000时，4096接近12帧/s，调节此参数可生成比较流畅的回调动画。
				//取值256, 512, 1024, 2048, 4096, 8192, or 16384
				//注意，取值不能过低，2048开始不同浏览器可能回调速率跟不上造成音质问题（低端浏览器→说的就是腾讯X5）

				onProcess: null //接收到录音数据时的回调函数：fn(this.buffer,powerLevel,bufferDuration,bufferSampleRate)
				//buffer=[[Int16,...],...]：缓冲PCM数据，powerLevel：当前缓冲的音量级别0-100，bufferDuration：已缓冲时长，bufferSampleRate：缓冲使用的采样率
				//如果需要绘制波形之类功能，需要实现此方法即可，使用以计算好的powerLevel可以实现音量大小的直观展示，使用buffer可以达到更高级效果
			},
			fot: false
		};
	},

	created() {
		this.newRec = Recorder(this.set); //使用默认配置，mp3格式
		this.getPageInfo();
		this.loadIcon();
		// this.delCache("paymentInfo");

	},

	mounted() {
		this.autoComputed();
	},

	updated() {
		this.topAuto();
		this.autoComputed();
	},

	destroyed() {
		// this.delCache("chatQuery");
		// this.delCache("paymentInfo");
		var arr = [];
		this.$store.commit("msgDataListChange", arr);
	},

	methods: {
		getPageInfo() {
			this.$store.commit("setHeaderStyle", {
				txt: "",
				type: 1
			});
			var query = this.getQuery();
			this.flag = query.sign; //产品标识
			this.goodsId = query.gid; //产品di
			var url = "Tloong-getGoodInfo";
			var token = this.getToken(); //获得token;
			var goodsInfo = `${this.flag}|${this.goodsId}`;
			var toUid = query.toUid;
			this.pageInfo.toUid = query.toUid;
			var params = {
				token,
				goodsInfo,
				toUid
			};
			// console.log(params)
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					var data = res.data;
					this.showData(data, () => {
						// var headerTitle = this.headerHidden(this.pageInfo.header_title);
						var headerTitle = this.headerHidden(this.pageInfo.header_title);
						this.$store.commit("setHeaderStyle", {
							txt: headerTitle,
							type: 1
						});
						this.getBtnStatus(toUid);
						this.loadlocalMsg(); //显示&加载聊天记录
					});
				}
			});
		},

		showData(data, fun) {
			this.fromInfo = data.formUser; //我的详情
			this.toInfo = data.toUser; //对方详情
			this.fromNum = this.fromInfo.loginName; //我的im号码
			this.toNum = this.toInfo.loginName; //对方im号码

			var details = data.prdinfo;
			this.postUserId = details.userId; //发布者id
			this.baseUserId = this.getUserInfo().uid; //我的id
			this.orderId = data.msg.orderId;
			var obj = {};
			if (this.flag == "demands") {
				obj.gid = details.id;
				obj.title = details.title;
				obj.logo = "";
				obj.price = details.serviceDatd;
				obj.detail = details.infos;
				// obj.name = details.uinfo.lastName;
				obj.sign = this.flag;
				obj.uGId = details.userId; //预约用户id
				obj.name = details.title;
			} else if (this.flag == "skills") {
				obj.gid = details.id;
				obj.title = details.title;
				obj.logo = "";
				obj.price = details.price + "/元";
				obj.detail = details.infos;
				// obj.name = details.uinfo.lastName;
				obj.sign = this.flag;
				obj.uGId = details.userId; //预约用户id
			}
			this.confirmInfo = obj;

			this.pageInfo.header_title = details.title;
			fun && fun();
		},

		getBtnStatus(toUid) {
			//获得按钮状态
			var token = this.getToken();
			var sign = this.flag;
			var goodsId = this.goodsId;
			var goodsInfo = `${sign}|${goodsId}`;
			var params = {
				token,
				goodsInfo,
				toUid
			};
			var url = "Tloong-getSwopInfo";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					this.fot = true;
					var data = res.data;
					var status = data.communicateStatus;
					var msg = data.msg;
					if (status.constructor !== Number) status = status.parseInt();
					/*
					 * isBtnCode -预约btn
					 * isAgreeCode -同意&拒绝btn
					 * isPayCode -支付btn
					 */
					switch (status) {
						case 0:
							if (this.baseUserId == this.postUserId) {
								this.isBtnCode = false;
								this.isAgreeCode = false;
								this.isPayCode = false;
							} else {
								this.isBtnCode = true;
								this.isAgreeCode = false;
								this.isPayCode = false;
							}
							break;
						case 1: //已抢单
							if (sign == "demands") {
								if (this.baseUserId == this.postUserId) {
									//兼职发布人
									this.isBtnCode = false;
									this.isAgreeCode = true;
									this.isPayCode = false;
									this.pageInfo.info = "是否同意";
									// this._msg("是否同意");
								} else {
									this.isBtnCode = false;
									this.isAgreeCode = false;
									this.isPayCode = false;
									this.pageInfo.info = "已预约等待对方同意";
									// this._msg("已预约等待对方同意");
								}
							} else if (sign == "skills") {
								if (this.baseUserId == this.postUserId) {
									//技能发布人
									this.isBtnCode = false;
									this.isAgreeCode = true;
									this.isPayCode = false;
									this.pageInfo.info = "是否同意";
									// this._msg("是否同意");
								} else {
									this.isBtnCode = false;
									this.isAgreeCode = false;
									this.isPayCode = false;
									this.pageInfo.info = "已预约等待对方同意";
									// this._msg("已预约等待对方同意");
								}
							}
							break;
						case 2: //已同意
							if (sign == "demands") {
								if (this.baseUserId == this.postUserId) {
									//兼职发布人
									this.isBtnCode = false;
									this.isAgreeCode = false;
									this.isPayCode = false;
									this.pageInfo.info = "已同意，请双发履约";
									// this._msg("已同意，请双方履约");
								} else {
									this.isBtnCode = false;
									this.isAgreeCode = false;
									this.isPayCode = false;
									this.pageInfo.info = "对方已同意，请履约";
									// this._msg("对方已同意，请履约");
								}
							} else if (sign == "skills") {
								if (this.baseUserId == this.postUserId) {
									//技能发布人
									this.isBtnCode = false;
									this.isAgreeCode = false;
									this.isPayCode = false;
									this.pageInfo.info = "请在约定时间内完成";
									// this._msg("请在约定时间内完成");
								} else {
									this.isBtnCode = false;
									this.isAgreeCode = false;
									this.isPayCode = false;
									this.pageInfo.info = "等待对方完成";
									// this._msg("等待对方完成");
								}
							}
							break;
						case 3: //已拒绝的订单不做任何操作
							this.isBtnCode = false;
							this.isAgreeCode = false;
							this.isPayCode = false;
							this.pageInfo.info = "历史拒绝订单";
							// this._msg("历史拒绝订单");
							break;
						case 7:
							this.isBtnCode = false;
							this.isAgreeCode = false;
							this.isPayCode = false;
							this.pageInfo.info = msg;
							// this._msg("请去个人中心查看");
							break;
						case 8:
							this.isBtnCode = false;
							this.isAgreeCode = false;
							this.isPayCode = false;
							this.pageInfo.info = msg;
							// this._msg("请去个人中心查看");
							break;
						case 9:
							this.isBtnCode = false;
							this.isAgreeCode = false;
							this.isPayCode = false;
							this.pageInfo.info = msg;
							// this._msg("请去个人中心查看");
							break;
						case 15:
							this.isBtnCode = false;
							this.isAgreeCode = false;
							this.isPayCode = false;
							this.pageInfo.info = msg;
							// this._msg("请去个人中心查看");
							break;
						case 33:
							this.isBtnCode = false;
							this.isAgreeCode = false;
							this.isPayCode = false;
							this.pageInfo.info = "支付完成";
							// this._msg("支付完成");
							break;
						default:
							this.isBtnCode = false;
							this.isAgreeCode = false;
							this.isPayCode = false;
							// this._msg("订单预约状态错误！！请及时联系管理员");
							break;
					}
				} else {
					//暂无数据
					this.fot = false;
					this.isBtnCode = true;
					this.isAgreeCode = false;
					this.isPayCode = false;
				}
			});
		},

		autoComputed() {
			//计算自适应尺寸
			try {
				this.itemInfosHeight = this.$refs.itemsInfos.offsetHeight;
				var eiejHeight = this.$refs.eiejElement.offsetHeight;
				this.eiejIndex.height = `${eiejHeight}px`;
				this.headerHeight = $(".nav_header").css("height");
			} catch (e) {
				setTimeout(() => {
					if (this.$refs.eiejElement) {
						var eiejHeight = this.$refs.eiejElement.offsetHeight;
					}
					if (this.$refs.itemsInfos) {
						this.itemInfosHeight = this.$refs.itemsInfos.offsetHeight;
						this.eiejIndex.height = `${eiejHeight}px`;
						this.headerHeight = $(".nav_header").css("height");
					}
				}, 1000);
			}
		},

		loadlocalMsg() {
			//显示&加载聊天记录
			var token = this.getToken();
			var receiveUserName = this.fromNum;
			var day = this.day; //聊天天数
			var rules = this.rules;
			var goodsId = this.goodsId;
			var goodType = this.flag;
			var params = {
				token,
				receiveUserName,
				day,
				rules,
				goodsId,
				goodType
			};
			var url = "Tloong-getMsgHistory";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					var data = res.data;
					var count = res.count;
					var arr = [];
					data.map((val, i) => {
						var item = val.content;
						var obj = {};
						if (item.userNum) {
							obj.fromNum = item.userNum;
						} else {
							obj.fromNum = item.fromNum;
						}
						if (item.toUser) {
							obj.toNum = item.toUser;
						} else {
							obj.toNum = item.toNum;
						}
						if (item.record) {
							obj.record = item.record;
						} else if (item.txt) {
							obj.txt = item.txt;
						}
						obj.portrait = item.portrait;
						obj.strDate = item.strDate;
						obj.portrait = item.portrait;
						obj.userName = item.userName;
						arr.push(obj);
					});
					this.$store.commit("msgDataListChange", arr);
					this.autoComputed();
				} else {
					var arr = [];
					this.$store.commit("msgDataListChange", arr);
					this.autoComputed();
				}
			});
		},

		sendPrivateText() {
			//发送文本消息
			// var txt = this.textMsg;
			var txt = this.reParseIconStr();
			if (!txt.trim()) {
				this.textMsg = "";
				this._msg("请输入发送内容");
				return;
			}
			//获得我的信息  头像、用户名
			var userName = this.fromInfo.lastName;
			var portrait = this.fromInfo.portrait;
			// var portrait = "test";
			//获得当前时间 年-月-日-时-分
			var dates = this._getDate();
			var strDate = `${this._getDate().years}-${this._getDate().month}-${
				this._getDate().date
			} ${this._getDate().hours}:${this._getDate().minutes}`;

			//发送给的用户
			var toNum = this.toNum;

			var id = this.$imConn.getUniqueId(); // 生成本地消息id
			var msg = new WebIM.message("txt", id); // 创建文本消息
			var _this = this;
			msg.set({
				msg: txt, // 消息内容
				to: toNum, // 接收消息对象（用户id）
				roomType: false,
				success: function(id, serverMsgId) {
					console.log("send private text Success(发送成功)");
					_this.textMsg = "";
					var fromNum = _this.fromNum; //获得我的im用户号码
					var obj2 = {
						userName,
						portrait,
						strDate,
						fromNum,
						toNum
					};
					obj2.txt = [];
					//替换表情字符-- ::RIG::${e}::RIG::
					var regTxt = txt.replace(_this.regex, e => {
						return `::RIG::${e}::RIG::`;
					});
					var regArr = regTxt.split(/:{2}RIG:{2}/); //分割字符&表情
					for (var key = 0; key < regArr.length; key++) {
						var obk = {}; //定义展示对象
						if (_this.regex.test(regArr[key])) {
							//若满足表情正则 = url
							obk.url = _this.parseStrIcon(regArr[key]); //解析表情
						} else if (regArr[key] != null && regArr[key]) {
							//不满足则 = text
							obk.text = regArr[key];
						}
						obj2.txt.push(obk);
					}
					setTimeout(() => {
						//插入全局聊天记录
						var arr = _this.$store.state.msgDataList; //获得当前聊天记录
						arr.push(obj2);
						_this.$store.commit("msgDataListChange", arr);
						_this.saveSendMsg(0, null, obj2);
					}, 200);
				}, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
				fail: function(e) {
					_this._msg("账号异常!!请重新登录");
					console.log("Send private text error(发送出错)");
				} // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
			});
			this.$imConn.send(msg.body);
		},

		sendPicText(str) {
			//发送表情
			var ej = str;
			console.log(str)
			this.textMsg += `${ej}`;
			this.parseIconStr();
		},

		topAuto() {
			//聊天信息在优先展示
			var ele = document.querySelector("#elm");
			ele.scrollTop = ele.scrollHeight;
		},

		showIcon($event, i) {
			//显示表情&&footer
			$event.stopPropagation(); //停止冒泡
			this.autoComputed();
			var eiejHeight = this.$refs.eiejElement.offsetHeight;
			var footHeight = this.$refs.eiejElement.offsetHeight;
			if (this.isIconCode) {
				this.modeState = i;
				this.eiejIndex.bottom = `0px`;
				this.footIndex.bottom = `${eiejHeight}px`;
				this.curHeight = this.curHeight - eiejHeight;
				this.isIconCode = !this.isIconCode;
				return;
			} else {
				if (i == this.modeState) {
					this.eiejIndex.bottom = `-${eiejHeight}px`;
					this.footIndex.bottom = `0px`;
					this.curHeight = this.curHeight + eiejHeight;
					this.isIconCode = !this.isIconCode;
					return;
				}
			}
		},

		hiddenIcon($event) {
			//隐藏表情模态框
			$event.stopPropagation(); //停止冒泡
			try {
				var eiejHeight = this.$refs.eiejElement.offsetHeight;
			} catch (e) {
				console.log("事件冒泡");
			}
			try {
				var footHeight = this.$refs.eiejElement.offsetHeight;
			} catch (e) {
				console.log("vdom del");
			}

			if (!this.isIconCode) {
				this.eiejIndex.bottom = `-${eiejHeight}px`;
				this.footIndex.bottom = `0px`;
				this.curHeight = this.curHeight + eiejHeight;
				this.isIconCode = !this.isIconCode;
			}
		},

		loadIcon() {
			//加载表情图标
			var icon = this.$webim.Emoji;

			// var basrStr = icon.path;
			var basrStr = "https://base.sxtian.com/public/static/faces/";

			var map = icon.map;
			var arrObj = this.iconMsgList;
			for (var item in map) {
				var obj = {};
				obj.url = `${basrStr}${map[item]}`;
				obj.str = item;
				arrObj.push(obj);
			}
		},

		sendPrivateAudio(i) {
			//发送语音消息
			var _this = this;
			var audio = $("#Audios1")[0];
			if (i == 0) {
				//取消
				_this.recConfig.playCode = 0;
				_this.recConfig.imgCode = 0;
				_this.recConfig.blob = null;
				_this.recConfig.duration = null;
				_this.recConfig.blobUrl = null;
				audio.pause();
				_this._msg("取消发送");
				_this.newRec.close(); //释放录音资源
			} else if (i == 1) {
				//发送
				audio.pause();
				_this.saveSendMsg(1, _this.recConfig.blob, null);
			}
		},

		actionRecorder() {
			//录音图标
			var _this = this;
			var audio = $("#Audios1")[0];
			if (_this.recConfig.playCode == 0) {
				//初始化
				_this.startRecorder(); //开始录音
				return;
			} else if (_this.recConfig.playCode == 1) {
				//停止录音
				_this.stopRecorder();
				return;
			} else if (_this.recConfig.playCode == 2) {
				//播放&暂停，取消&发送
				if (_this.recConfig.imgCode == 2) {
					//切换播放图标
					_this.log(audio);
					audio.play();
					_this.recConfig.imgCode = 1;
					return;
				} else if (_this.recConfig.imgCode == 1) {
					//切换暂停图标
					audio.pause();
					_this.recConfig.imgCode = 2;
					return;
				}
			}
		},

		startRecorder() {
			//开始录音
			var _this = this;
			_this._msg("准备录音环境");

			// var dialog=createDelayDialog(); //开启可选的弹框伪代码，需先于open执行，因为回调不确定是同步还是异步的
			_this.newRec.open(
				function() {
					_this._msg("开始录音...");
					_this.newRec.start(); //开始录音
					_this.recConfig.playCode = 1;
					_this.recConfig.imgCode = 1;
				},
				//打开麦克风授权获得相关资源
				function(msg, isUserNotAllow) {
					console.log("环境准备失败");
					_this._msg("当前环境不支持录音");
					//用户拒绝未授权或不支持
					// dialog&&dialog.Cancel(); //如果开启了弹框，此处需要取消
					_this.recConfig.playCode = 0;
					_this.recConfig.imgCode = 0;
					console.log(msg,isUserNotAllow)
					_this.log(
						(isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg
					);
				}
			);
		},

		stopRecorder() {
			//停止录音
			this._msg("准备停止录音");
			var _this = this;
			_this.newRec.stop(
				function(blob, duration) {
					//到达指定条件停止录音
					_this.recConfig.blob = blob;
					_this.recConfig.duration = duration;
					_this.recConfig.blobUrl = URL.createObjectURL(blob);
					// console.log(URL.createObjectURL(blob), "时长:" + duration + "ms");
					_this.log(`${URL.createObjectURL(blob)}时长:${duration}ms`);
					//已经拿到blob文件对象想干嘛就干嘛：立即播放、上传
					_this._msg("停止录音...");
					_this.recConfig.playCode = 2;
					_this.recConfig.imgCode = 2;
					// _this.newRec.close(); //释放录音资源
				},

				function(msg) {
					_this.recConfig.playCode = 0;
					_this.recConfig.imgCode = 0;
					_this.log(`"录音失败:"${msg}`);
					_this._msg("录音异常请重试");
				}
			);
		},

		log(val) {
			//录音调试台
			this.recConfig.test = val;
		},

		handlePlay(i, url) {
			//播放语音
			var $audio = $(`#audio${i}`)[0];
			if ($audio.paused) {
				//检测音频是否为暂停状态 是返回treu
				$audio.play();
				this.playIconCode = 1;
			} else {
				$audio.pause();
				this.playIconCode = 0;
			}
		},

		saveSendMsg(classType, audio, obj) {
			//消息存入服务器
			var token = this.getToken();
			var goodsId = this.goodsId;
			var goodType = this.flag;
			var content = JSON.stringify(obj);
			var media = audio;
			var seedUserName = this.fromNum;
			var seedUserId = this.fromInfo.userId;
			var receiveUserName = this.toNum;
			var receiveUserId = this.toInfo.userId;
			var type = classType; //0 文本 1音频
			if (type == 0) {
				var params = {
					token,
					goodsId,
					goodType,
					content,
					seedUserName,
					seedUserId,
					receiveUserName,
					receiveUserId,
					type
					// media
				};
			} else if (type == 1) {
				var params = new FormData();
				params.append("token", token);
				params.append("goodsId", goodsId);
				params.append("goodType", goodType);
				// params.append("content", content);
				params.append("seedUserName", seedUserName);
				params.append("seedUserId", seedUserId);
				params.append("receiveUserName", receiveUserName);
				params.append("receiveUserId", receiveUserId);
				params.append("type", type);
				params.append("media", media, "media.mp3");
			}
			this.log(JSON.stringify(params));
			let url = "Tloong-setText";
			console.log(params)
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					if (type == 0) {
						console.log(res);
					} else if (type == 1) {
						var data = res.data;
						if (!data.content) return this._msg("请先录音");
						var content = data.content;
						var obj = {};
						obj.fromNum = content.userNum;
						obj.toNum = content.toUser;
						obj.portrait = content.portrait;
						obj.strDate = content.strDate;
						obj.record = content.record;
						obj.userName = content.userName;
						setTimeout(() => {
							var arr = this.$store.state.msgDataList;
							arr.push(obj);
							this.$store.commit("msgDataListChange", arr);
						}, 200);
						this._msg("发送成功");
						this.recConfig.playCode = 0;
						this.recConfig.imgCode = 0;
						this.recConfig.blob = null;
						this.recConfig.duration = null;
						this.recConfig.blobUrl = null;
						this.newRec.close(); //释放录音资源
					}
				}
			});
		},

		parseStrIcon(val) {
			//解析字符为图片链接
			var icons = this.$webim.Emoji; //获得表情对象
			var baseStr = icons.path; //图标公共地址
			var mapList = icons.map; //图片链接列表
			for (var cell in mapList) {
				if (cell == val) {
					return `${baseStr}${mapList[cell]}`;
				}
			}
		},

		parseIconStr() {
			//解析字符为文本字符
			var strMap = this.$webim.Emoji.strMap;
			var txt = this.textMsg;
			var regTxt = txt.replace(this.regex, e => {
				return `::RIG::${e}::RIG::`;
			});
			var regArr = regTxt.split(/:{2}RIG:{2}/); //分割字符&表情
			for (var keys in strMap) {
				for (var key in regArr) {
					if (keys == regArr[key]) {
						regArr[key] = strMap[keys];
					}
				}
			}
			//空字符&“,”过滤 regArr
			var str = "";
			for (var kw in regArr) {
				switch (regArr[kw]) {
					case "":
						// console.log(regArr[kw], 100);
						break;
					case ",":
						// console.log(regArr[kw], 100);
						break;
					default:
						str += regArr[kw];
				}
			}
			this.textMsg = str;
			console.log(this.textMsg)
		},

		reParseIconStr() {
			//文本字符反解析为字符
			var strMap = this.$webim.Emoji.strMap; //字符
			var map = this.$webim.Emoji.map;
			var txt = this.textMsg;
			var regTxt = txt.replace(this.regex, e => {
				return `::RIG::${e}::RIG::`;
			});
			var regArr = regTxt.split(/:{2}RIG:{2}/); //分割字符&表情
			for (var ks in strMap) {
				for (var ke in regArr) {
					if (strMap[ks] == regArr[ke]) {
						regArr[ke] = ks;
					}
				}
			}
			//空字符&“,”过滤 regArr
			var str = "";
			for (var kw in regArr) {
				switch (regArr[kw]) {
					case "":
						// console.log(regArr[kw], 100);
						break;
					case ",":
						// console.log(regArr[kw], 100);
						break;
					default:
						str += regArr[kw];
				}
			}
			return str;
		},

		play(code, sign, gid) {
			//支付  code =0 平台支付   code = 1 履约保证金
			var query = {};
			query.code = code;
			query.sign = sign;
			query.gid = gid;
			if (query) {
				this.$router.push({
					path: `/payment/${sign}`,
					query
				});
			}
		},

		delIcon() {
			//删除
			var txt = this.textMsg;
			if (txt) {
				if (txt.length == 1) {
					this.textMsg = "";
				} else if (txt.length > 1) {
					this.textMsg = txt.substr(0, txt.length - 1);
				}
			}
		},

		updatedStatus(uIds, i) {
			//立即预约&同意&拒绝
			let token = this.getToken();
			let c_status = i;
			let sign = this.flag;
			let goodsId = this.goodsId;
			let goodsInfo = `${sign}|${goodsId}`;
			let orderId = this.orderId;
			let params = {
				token,
				goodsInfo,
				c_status,
				orderId
			};
			// console.log(params);
			var url = "Tloong-getSwopUpd";
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					setTimeout(() => {
						this.getBtnStatus(this.pageInfo.toUid);
						this.autoComputed();
						this.loadlocalMsg(); //显示&加载聊天记录
					}, 500);
					// this._msg("请耐心等待(^_^)");
				} else {
					this._msg(res.info, 1000);
					setTimeout(() => {
						this.getBtnStatus(this.pageInfo.toUid);
						this.autoComputed();
						if (c_status == 3 || c_status == 6) {
							this.$router.back(-1);
						}
					}, 500);
				}
			});
		},

		headerHidden(value) {
			//标题溢出隐藏
			var len = value.length;
			if (len > 6) {
				//num => 过滤长度
				var val = value.substr(0, 7);
				return `${val}...`;
			} else {
				return value;
			}
		}
	},

	watch: {},

	computed: {
		playImgUrl() {
			return this.recConfig.img[this.recConfig.imgCode].url;
		},

		startStr() {
			return this.recConfig.startPoint[this.recConfig.playCode];
		},

		playIconImg() {
			return this.playIcon[this.playIconCode].url;
		},

		msgDataLists() {
			return this.$store.state.msgDataList;
		},

		recBlobUrl() {
			return this.recConfig.blobUrl;
		}
	},

	components: {
		"self-button": Button
	}
};
</script>

<style lang="scss" scoped>
.interview_chat .robConfirm {
	// margin-bottom: 5rem;
	// overflow: scroll;
}
.interview_chat .robConfirm .msg-list {
	margin-bottom: 3rem;
	overflow: scroll;
}
.msg-list .msg-list-item-you {
	display: flex;
	justify-content: flex-start;
}
.msg-list .msg-list-item-you .list-item-right {
	text-align: left;
	margin-left: 0.74rem;
	padding-right: 4rem;
}
.msg-list .msg-list-item-i {
	display: flex;
	justify-content: flex-end;
}
.msg-list .msg-list-item-i .list-item-left {
	text-align: right;
	margin-right: 0.74rem;
	padding-left: 4rem;
}
.msg-list .msg-list-item-i .list-item-right {
}

.msg-list .msg-list-item-i .list-item-right .item-image,
.msg-list .msg-list-item-you .list-item-left .item-image {
	border-radius: 5px;
}
.msg-list .msg-list-item-i .list-item-left .item-contnet,
.msg-list .msg-list-item-you .list-item-right .item-contnet {
	padding: 7px 10px;
	background: #fff;
	border-radius: 5px;
	display: flex;
	font-size: 14px;
	font-weight: 500;
	justify-content: center;
	align-items: center;
}
.interview_chat_footer .txt-send-btn {
	width: 20%;
	height: 60%;
	padding: 1px 6px;
	background: #09f;
	border-radius: 44px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 14px;
}
.eiej-model {
	width: 100%;
	height: 195px;
	padding: 10px 0;
	background: #fff;
	position: fixed;
	transition: 0.5s all;
	bottom: -300px;
}
.icon-list {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	text-align: center;
	position: relative;
}
.icon-list .icon-list-item {
	width: 12%;
}
.icon-list .icon-list-item .icon-list-link {
	display: inline-block;
}
.d-inline-block {
	display: inline-block;
}
.content-audio-i {
	width: 100%;
	height: 40px;
	background: #fff;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding-right: 15px;
	border-radius: 5px;
}
.content-audio-you {
	// width: 10%;
	width: 100%;
	height: 40px;
	background: #fff;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-left: 15px;
	border-radius: 5px;
}
.content-audio-you .audio-play-you {
	width: 1.5rem;
	height: 1.5rem;
}
.content-audio-i .audio-play-i {
	width: 1.5rem;
	height: 1.5rem;
	transform: rotate(180deg);
}
.recorder-model {
	text-align: center;
}
.recorder-model .recorder-box {
	display: inline-block;
	background-color: #ccc;
	border-radius: 50%;
	position: relative;
}
.recorder-model .recorder-rec {
	width: 6rem;
	height: 6rem;
	padding: 10px;
}
.list-btn {
	padding: 1rem;
	width: 100%;
	display: flex;
	margin-top: 1rem;
	position: absolute;
	bottom: 0;
}
.list-btn .list-link {
	width: 50%;
}
.list-btn .list-link .list-link-item {
	padding: 0.5rem 2rem;
	background: #09f;
	color: #fff;
	font-size: 14px;
	border-radius: 44px;
}
.icon-del {
	position: absolute;
	bottom: 8px;
	right: 22px;
	border-radius: 10px;
	.icon-del-btn {
		padding: 0.3rem 0.6rem;
		background: #09f;
		color: #fff;
	}
}
</style>
