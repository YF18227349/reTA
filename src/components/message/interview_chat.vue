<template>
	<div class="interview_chat w-100">
		<!-- <a href="javascript:;" class="chat-phone-logo">
				<span class="iconfont icon-xingzhuang fc-white fw-5"></span>
			</a>-->
		<!-- <header class="chat_header w-100">
				<a href="javascript:history.go(-1)" class="arrow-logo iconfont icon-previewleft"></a>
				<span class="header-title">{{pageInfo.header_title}}</span>
				<a class="phone-logo iconfont icon-xingzhuang"></a>
			</header>-->
		<!-- <div class="clear-interview-chat-fixed"></div> -->
		<div class="content">
			<router-view></router-view>
		</div>
		<!-- id="elm" :style="{height:(curHeight-135)+'px'}" -->
		<div class="info-items" @click="hiddenIcon">
			<!-- <ul class="info-item bg-white" v-for="(item,i) in interviewList" :key="i"> -->
			<ul class="info-item bg-white" ref="itemsInfos">
				<li class="item1">
					<span class="fm-1 fc-dark fw-6">{{interviewData.title}}</span>
					<span class="fm-1 fc-blue fw-6">{{interviewData.salary}}</span>
				</li>
				<li class="item2">
					<span class="fc-dark fs-3 fw-6">{{interviewData.info}}</span>
				</li>
				<li class="item3">
					<span class="fc-gray fs-3 fw-6">{{interviewData.addr}}</span>
				</li>
				<li class="item5">
					<span class="fc-gray fs-3 fw-6 pt-1 pb-1 pl-3 pr-3 bg-gray">{{interviewData.experience}}</span>
					<span class="fc-gray fs-3 fw-6 pt-1 pb-1 pl-3 pr-3 bg-gray">{{interviewData.education}}</span>
				</li>
				<li class="item4" v-if="isBtnCode">
					<a href="javascript:;" @click="updatedStatus(5)">
						<span class="fm-1">约面试</span>
					</a>
					<a href="javascript:;" @click="updatedStatus(6)">
						<span class="fm-1">不感兴趣</span>
					</a>
				</li>
				<li class="item4" v-if="isAgreeCode">
					<a href="javascript:;" @click="updatedStatus(2)">
						<span class="fm-1">同意</span>
					</a>
					<a href="javascript:;" @click="updatedStatus(3)">
						<span class="fm-1">拒绝</span>
					</a>
				</li>
				<li class="item7 pt-2" v-show="pageInfo.info">
					<span class="fc-gray fs-2 fw-6">提示：{{pageInfo.info}}</span>
				</li>
			</ul>
			<!-- 单条消息 -->
			<ul class="msg-list mt-5" id="elm1" :style="{height:(curHeight-headerHeight-itemInfosHeight-100)+'px'}">
				<li v-for="(item,i) of msgDataLists" v-if="msgDataLists.length>0">
					<!-- 房间存储数据控制 -->
					<div v-if="(fromNum == item.fromNum || fromNum == item.toNum) && (toNum == item.toNum || toNum == item.fromNum)">
						<!-- 你的信息 -->
						<div class="msg-list-item-you mt-4" v-if="fromNum != item.fromNum">
							<div class="list-item-left">
								<img :src="item.portrait" alt="" class="item-image" style="width:50px; height:50px;">
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
												<img v-if="cell.url" :src="cell.url" alt="">
											</span>
										</span>
									</div>
								</div>
								<div class="content-audio-you mt-3" v-if="!item.txt" @click="handlePlay(i,item.record)">
									<img class=" audio-play-you" :src="playIcon[0].url" alt="">
									<audio class="audio" :src="item.record" :id="`audio${i}`" preload></audio>
									{{item.mp3}}
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
												<img v-if="cell.url" :src="cell.url" alt="">
											</span>
										</span>
									</div>
								</div>
								<div class="content-audio-i mt-3" v-if="!item.txt" @click="handlePlay(i,item.record)">
									<img class="audio-play-i" :src="playIcon[0].url" alt="">
									<audio :src="item.record" :id="`audio${i}`" preload></audio>
									{{item.mp3}}
								</div>
							</div>
							<div class="list-item-right">
								<!-- <img src="" alt=""> -->
								<img :src="item.portrait" alt="" class="item-image" style="width:50px; height:50px;">
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<footer class="interview_chat_footer w-100 bg-gray shadow-dark" ref="footElement" :style="footIndex" v-show="fot">
			<span class="iconfont icon-yuyin fc-dark mr-1" @click="showIcon($event,1)"></span>
			<input type="text" v-model="textMsg" @keyup.13="sendPrivateText" @focus="hiddenIcon">
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
						<img :src="item.url" alt class="icon-list-img" @click="sendPicText(item.str)">
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
				<a href="javascript:;" v-if="blobUrl!=null">
					<audio :src="blobUrl" id="Audios3" preload></audio>
				</a>
				<div class="recorder-box">
					<div class="recorder-border" @click="actionRecorder">
						<!-- http://static.sxtian.com/recorderplay/recorder.png -->
						<!-- http://static.sxtian.com/recorderplay/stop.png -->
						<!--  http://static.sxtian.com/recorderplay/start.png  -->
						<img class="recorder-rec" :src="playImgUrl" alt="">
					</div>
				</div>
				<p v-if="recConfig.duration!=null"><span v-text="recConfig.duration/1000"></span>秒</p>
				<div class="list-btn" v-if="this.recConfig.playCode == 2">
					<a href="javascript:;" class="list-link" @click="sendPrivateAudio(0)">
						<span class="list-link-item">取消</span>
					</a>
					<!-- <a href="javascript:;" class="list-link" @click="stopRecorder">
						<span class="list-link-item">停止</span>
					</a> -->
					<!-- <a href="javascript:;" class="list-link" @click="startRecorder">
						<span class="list-link-item">录制</span>
					</a> -->
					<a href="javascript:;" class="list-link" @click="sendPrivateAudio(1)">
						<span class="list-link-item">发送</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import "../../assets/imConfig/recorder/recorder-core.js";
import "../../assets/imConfig/recorder/mp3.js";
import "../../assets/imConfig/recorder/mp3-engine.js";
import { setTimeout } from 'timers';
export default {
	data() {
		return {
			pageInfo: {
				info: "",
				header_title: "招揽者"
			},
			sign: null,
			interviewData: {
				title: "",
				salary: "",
				name: "",
				addr: "",
				education: "",
				experience: ""
			},
			playIcon: [{
					name: "play",
					url: "http://static.sxtian.com/recorderplay/play.png"
				},
				{
					name: "pause",
					url: "http://static.sxtian.com/recorderplay/pause.png"
				}
			],
			headerHeight: null,
			itemInfosHeight: null,
			flag: "", //产品类型标识符
			goodsId: null, //产品id
			isBtnCode: false,
			isAgreeCode: false,
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
			footIndex: { //输入框位置
				bottom: true
			},
			eiejIndex: { //表情包位置
				bottom: true,
				height: true
			},
			isIconCode: true, //表情模态框控制
			modeState: 0,
			userName: "", //当前用户名
			IntiTime: null, //当前时间
			regex: /(\[.*?\])/g, //表情正则
			recConfig: { //录音
				blob: null,
				blobUrl: null,
				test: null,
				duration: null,
				isCode: true,
				content: null,
				img: [{
					name: "录音",
					url: "http://static.sxtian.com/recorderplay/recorder.png"
				}, {
					name: "暂停",
					url: "http://static.sxtian.com/recorderplay/stop.png"
				}, {
					name: "播放",
					url: "http://static.sxtian.com/recorderplay/start.png"
				}],
				startPoint: [
					"请点击录音",
					"停止录音",
					"录音试听"
				],
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
			orderId: null, //订单id
			fot: false
		};
	},
	created() {
		this.newRec = Recorder(this.set); //使用默认配置，mp3格式
		this.$store.commit("setHeaderStyle", {
			txt: "招揽者",
			type: 1
		});
		this.getPageInfo();
		this.loadIcon();
	},

	updated() {
		this.topAuto();
		this.autoComputed();
	},

	mounted() {
		this.autoComputed();
	},

	destroyed() {
		$(".header_right>span").removeClass("icon-xingzhuang fw-6");
		var arr = [];
		this.$store.commit("msgDataListChange", arr);
	},

	methods: {
		getPageInfo() {
			var query = this.getQuery();
			this.flag = query.sign; //产品标识
			this.goodsId = query.gid; //产品di
			var url = "Tloong-getGoodInfo";
			var token = this.getToken(); //获得token;
			var goodsInfo = `${this.flag}|${this.goodsId}`;
			var toUid = parseInt(query.toUid);
			var params = {
				token,
				goodsInfo,
				toUid
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					var data = res.data;
					this.showData(data, () => {
						this.getBtnStatus();
						this.loadlocalMsg(); //显示&加载聊天记录
					})
				}
			});
		},

		showData(data, callbakc) {
			var prdInfo = data.prdinfo;
			this.fromInfo = data.formUser; //我的详情
			this.toInfo = data.toUser; //对方详情
			this.fromNum = this.fromInfo.loginName; //我的im号码
			this.toNum = this.toInfo.loginName; //对方im号码
			this.baseUserId = this.getUserInfo().uid; //我的id
			this.postUserId = prdInfo.userId; //发布者id
			if (data.msg.orderId) {
				this.orderId = data.msg.orderId; //订单id
			}

			var arr = this.interviewData;
			if (this.flag == 'quarters') {
				arr.title = prdInfo.title;
			} else {
				arr.title = prdInfo.consignee;
			}
			arr.salary = prdInfo.prices;
			arr.info = prdInfo.infos;
			arr.addr = prdInfo.addressInfo;
			arr.education = prdInfo.education;
			arr.experience = prdInfo.exp;
			callbakc()
		},

		getBtnStatus() { //获得按钮状态
			var query = this.getQuery();
			var token = this.getToken();
			var sign = this.flag;
			var goodsId = this.goodsId;
			var toUid = parseInt(query.toUid);
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
					switch (status) {
						case 0:
							this.isBtnCode = true;
							this.isAgreeCode = false;
							this.isPayCode = false;
							break;
						case 2: //已同意
							if (this.baseUserId == this.postUserId) {
								this.isBtnCode = false;
								this.isAgreeCode = false;
								this.isPayCode = true;
								this.pageInfo.info = "已同意请双方按照约定，赴约";
								// this._msg("已同意请双方按照约定，赴约", 800);
							} else {
								this.isBtnCode = false;
								this.isAgreeCode = false;
								this.isPayCode = true;
								this.pageInfo.info = "已同意请双方按照约定，赴约";
								// this._msg("已同意请双方按照约定，赴约", 800);
							}
							break;
						case 3: //已拒绝的订单不做任何操作
							this.isBtnCode = false;
							this.isAgreeCode = false;
							this.isPayCode = false;
							this.pageInfo.info = "历史拒绝订单";
							this._msg("历史拒绝订单", 800);
							break;
						case 4: //收到简历
							if (this.baseUserId == this.postUserId) {
								this.isBtnCode = false;
								this.isAgreeCode = true;
								this.isPayCode = false;
								this.pageInfo.info = "是否同意并邀请对方面试";
								// this._msg("是否同意并邀请对方面试", 800);
							} else {
								this.isBtnCode = false;
								this.isAgreeCode = false;
								this.isPayCode = false;
								this.pageInfo.info = "已预约面试等待对方同意！！";
								// this._msg("已预约面试等待对方同意！！", 800);
							}
							break;
						case 5: //已抢单
							if (this.baseUserId == this.postUserId) {
								this.isBtnCode = false;
								this.isAgreeCode = true;
								this.isPayCode = false;
								this.pageInfo.info = "是否接受面试邀请";
								// this._msg("是否接受面试邀请", 800);
							} else {
								this.isBtnCode = false;
								this.isAgreeCode = false;
								this.isPayCode = false;
								this.pageInfo.info = "已发送面试邀请，请耐心等待";
								// this._msg("已发送面试邀请，请耐心等待", 800);
							}
							break;
						case 7:
							this.isBtnCode = false;
							this.isAgreeCode = false;
							this.isPayCode = false;
							this.pageInfo.info = "已完成，去评价！";
							// this._msg("已完成，去评价！", 800);
							break;
						default:
							this.isBtnCode = false;
							this.isAgreeCode = false;
							this.isPayCode = false;
							this.pageInfo.info = msg;
							// this._msg("请去个人中心查看");
							break;
					}
				} else {
					this.fot = false;
					this.isBtnCode = true;
					this.isAgreeCode = false;
					this.isPayCode = false;
				}
			});
		},

		autoComputed() {
			try {
				this.itemInfosHeight = this.$refs.itemsInfos.offsetHeight;
				var eiejHeight = this.$refs.eiejElement.offsetHeight;
				this.eiejIndex.height = `${eiejHeight}px`;
				var h = $(".nav_header").css("height");
				this.headerHeight = h.substr(0, 2);
			} catch (e) {
				setTimeout(() => {
					var eiejHeight = this.$refs.eiejElement.offsetHeight;
					this.itemInfosHeight = this.$refs.itemsInfos.offsetHeight;
					this.eiejIndex.height = `${eiejHeight}px`;
					var h = $(".nav_header").css("height");
					this.headerHeight = h.substr(0, 2);
				}, 1000);
			};
		},

		loadlocalMsg() { //显示&加载聊天记录
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
						};
						if (item.toUser) {
							obj.toNum = item.toUser;
						} else {
							obj.toNum = item.toNum;
						};
						if (item.record) {
							obj.record = item.record;
						} else if (item.txt) {
							obj.txt = item.txt;
						};
						obj.portrait = item.portrait;
						obj.strDate = item.strDate;
						obj.portrait = item.portrait;
						obj.userName = item.userName;

						arr.push(obj);
					});
					this.$store.commit("msgDataListChange", arr)
					this.autoComputed();
				} else {
					var arr = [];
					this.$store.commit("msgDataListChange", arr)
					this.autoComputed();
				}
			});
		},

		sendPrivateText() { //发送文本消息
			// var txt = this.textMsg;
			var txt = this.reParseIconStr();
			if (!txt.trim()) {
				this.textMsg = "";
				this._msg("请输入发送内容");
				return
			}
			//获得我的信息  头像、用户名
			var userName = this.fromInfo.lastName;
			var portrait = this.fromInfo.portrait;
			// var portrait = "test";
			//获得当前时间 年-月-日-时-分
			var dates = this._getDate();
			var strDate = `${this._getDate().years}-${this._getDate().month}-${this._getDate().date} ${this._getDate().hours}:${this._getDate().minutes}`;

			//发送给的用户
			var toNum = this.toNum;
			console.log(toNum);
			// var obj = userName + '::RIG::' + portrait + '::RIG::' + strDate + '::RIG::' + txt;
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

					var arr = _this.$store.state.msgDataList; //获得当前聊天记录
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
					var regTxt = txt.replace(_this.regex, (e) => {
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
						};
						obj2.txt.push(obk);
					};
					setTimeout(() => { //插入全局聊天记录
						arr.push(obj2);
						_this.$store.commit("msgDataListChange", arr);
						_this.saveSendMsg(0, null, obj2);
					}, 200);
				}, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
				fail: function(e) {
					console.log("Send private text error(发送出错)");
				} // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
			});
			this.$imConn.send(msg.body);
		},

		sendPicText(str) { //发送表情
			var ej = str;
			this.textMsg += `${ej}`;
			this.parseIconStr();
		},

		delIcon() { //删除
			var txt = this.textMsg;
			if (txt) {
				if (txt.length == 1) {
					this.textMsg = "";
				} else if (txt.length > 1) {
					this.textMsg = txt.substr(0, txt.length - 1);
				}
			}
		},

		topAuto() { //聊天信息在优先展示
			var ele = document.querySelector('#elm1')
			ele.scrollTop = ele.scrollHeight
		},

		showIcon($event, i) { //显示表情&&footer
			$event.stopPropagation(); //停止冒泡
			this.autoComputed();
			var eiejHeight = this.$refs.eiejElement.offsetHeight;
			var footHeight = this.$refs.eiejElement.offsetHeight;
			if (this.isIconCode) {
				this.modeState = i;
				this.eiejIndex.bottom = `0px`;
				this.footIndex.bottom = `${eiejHeight}px`;
				this.curHeight = this.curHeight - (eiejHeight);
				this.isIconCode = !this.isIconCode;
				return;
			} else {
				if (i == this.modeState) {
					this.eiejIndex.bottom = `-${eiejHeight}px`;
					this.footIndex.bottom = `0px`;
					this.curHeight = this.curHeight + (eiejHeight);
					this.isIconCode = !this.isIconCode;
					return;
				};
			};
		},

		hiddenIcon(e) { //隐藏表情模态框
			e.stopPropagation(); //停止冒泡
			try {
				var eiejHeight = this.$refs.eiejElement.offsetHeight;
				var footHeight = this.$refs.eiejElement.offsetHeight;
			} catch (e) {
				console.log("事件冒泡");
				return;
			};
			if (!this.isIconCode) {
				this.eiejIndex.bottom = `-${eiejHeight}px`;
				this.footIndex.bottom = `0px`;
				this.curHeight = this.curHeight + (eiejHeight);
				this.isIconCode = !this.isIconCode;
			}
		},

		loadIcon() { //加载表情图标
			var icon = this.$webim.Emoji;
			var basrStr = icon.path;
			var map = icon.map;
			var arrObj = this.iconMsgList;
			for (var item in map) {
				var obj = {};
				obj.url = `${basrStr}${map[item]}`;
				obj.str = item;
				arrObj.push(obj);
			};
			// console.log(arrObj);
		},

		sendPrivateAudio(i) { //发送语音消息
			var _this = this;
			var audio = $("#Audios3")[0];
			if (i == 0) { //取消
				_this.recConfig.playCode = 0;
				_this.recConfig.imgCode = 0;
				_this.recConfig.blob = null;
				_this.recConfig.duration = null;
				_this.recConfig.blobUrl = null;
				audio.pause();
				_this._msg("取消发送");
				_this.newRec.close(); //释放录音资源
			} else if (i == 1) { //发送
				audio.pause();
				_this.saveSendMsg(1, _this.recConfig.blob, obj = {});
			}

		},

		actionRecorder() { //录音图标
			var _this = this;
			var audio = $("Audios3")[0];
			if (_this.recConfig.playCode == 0) { //初始化
				_this.startRecorder(); //开始录音
				return;
			} else if (_this.recConfig.playCode == 1) { //停止录音
				_this.stopRecorder();
				return;
			} else if (_this.recConfig.playCode == 2) { //播放&暂停，取消&发送
				if (_this.recConfig.imgCode == 2) { //切换播放图标
					audio.play();
					_this.recConfig.imgCode = 1;
					return;
				} else if (_this.recConfig.imgCode == 1) { //切换暂停图标
					audio.pause();
					_this.recConfig.imgCode = 2;
					return;
				}
			}
		},

		startRecorder() { //开始录音
			var _this = this;
			_this._msg("准备录音环境")
			//var dialog=createDelayDialog(); 开启可选的弹框伪代码，需先于open执行，因为回调不确定是同步还是异步的
			_this.newRec.open(
				function() {
					_this._msg("开始录音...")
					_this.newRec.start(); //开始录音
					_this.recConfig.playCode = 1;
					_this.recConfig.imgCode = 1;
				},
				//打开麦克风授权获得相关资源
				function(msg, isUserNotAllow) {
					//用户拒绝未授权或不支持
					//dialog&&dialog.Cancel(); 如果开启了弹框，此处需要取消
					_this.recConfig.playCode = 0;
					_this.recConfig.imgCode = 0;
					console.log(
						(isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg
					);
					_this.log(
						(isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg
					);
				}
			);
		},

		stopRecorder() { //停止录音
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

		log(val) { //录音调试台
			this.recConfig.test = val;
		},

		handlePlay(i, url) { //播放语音
			var $audio = $(`#audio${i}`)[0];
			$audio.play();
		},

		saveSendMsg(classType, audio, obj) { //消息存入服务器
			let token = this.getToken();
			let goodsId = this.goodsId;
			let goodType = this.flag;
			if (!obj) {
				var content = "";
			} else {
				var content = JSON.stringify(obj);
			}
			if (!audio) {
				var media = "";
			} else {
				var media = audio;
			}
			let seedUserName = this.fromNum;
			let seedUserId = this.fromInfo.userId;
			let receiveUserName = this.toNum;
			let receiveUserId = this.toInfo.userId;
			let type = classType; //0 文本 1音频

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
					type,
					media
				};
			} else if (type == 1) {
				var params = new FormData();
				params.append("token", token);
				params.append("goodsId", goodsId);
				params.append("goodType", goodType);
				params.append("content", content);
				params.append("seedUserName", seedUserName);
				params.append("seedUserId", seedUserId);
				params.append("receiveUserName", receiveUserName);
				params.append("receiveUserId", receiveUserId);
				params.append("type", type);
				params.append("media", media, "media.mp3");
			}
			let url = "Tloong-setText";
			return this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					if (type == 0) {
						console.log(res);
					} else if (type == 1) {
						var data = res.data;
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

		parseStrIcon(val) { //解析字符为图片链接
			var icons = this.$webim.Emoji; //获得表情对象
			var baseStr = icons.path; //图标公共地址
			var mapList = icons.map; //图片链接列表
			for (var cell in mapList) {
				if (cell == val) {
					return `${baseStr}${mapList[cell]}`;
				};
			};
		},

		parseIconStr() { //解析字符为文本字符
			var strMap = this.$webim.Emoji.strMap;
			var txt = this.textMsg;
			var regTxt = txt.replace(this.regex, (e) => {
				return `::RIG::${e}::RIG::`;
			});
			var regArr = regTxt.split(/:{2}RIG:{2}/); //分割字符&表情
			for (var keys in strMap) {
				for (var key in regArr) {
					if (keys == regArr[key]) {
						regArr[key] = strMap[keys];
					}
				}
			};
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
				};
			};
			this.textMsg = str;
		},

		reParseIconStr() { //文本字符反解析为字符
			var strMap = this.$webim.Emoji.strMap; //字符
			var map = this.$webim.Emoji.map;
			var txt = this.textMsg;
			var regTxt = txt.replace(this.regex, (e) => {
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
				};
			};
			return str;
		},

		updatedStatus(i) { //立即预约&同意&拒绝
			if (i != 5) {
				let token = this.getToken();
				let c_status = i;
				let sign = this.flag;
				let goodsId = this.goodsId;
				let goodsInfo = `${sign}|${goodsId}`;
				let orderId = this.orderId;
				if (i == 6) {
					var params = {
						token,
						goodsInfo,
						c_status
					};
				} else{
					var params = {
						token,
						goodsInfo,
						c_status,
						orderId
					};
				}
				var url = "Tloong-getSwopUpd";
				this.__initAction(url, params, (res, s) => {
					if (s == 1) {
						setTimeout(() => {
							this.getBtnStatus();
							this.autoComputed();
						})
						// this._msg("请耐心等待(^_^)");
					} else {
						this._msg(res.info, 1000);
						setTimeout(() => {
							this.getBtnStatus();
							this.autoComputed();
							if (c_status == 3 || c_status == 6) {
								this.$router.back(-1);
							}
						}, 500)
					}
				});
			} else {
				var token = this.getToken();
				var sign = 'resume';
				var goodsId = this.goodsId;
				var goodsInfo = `${sign}|${goodsId}`;
				var c_status = i;
				var query = {
					token,
					c_status,
					goodsInfo
				};
				this.$router.push({
					path: '/select_post_list',
					query
				});
			}
		},

		handleAgree(uIds, i) { //同意&拒绝
			var url = "Newscastmeet-setOrderAgree";
			var token = this.getToken(); //口令
			var flag = this.flag; //支付标识符  (比如:   兼职=demands  技能= skills)
			var id = this.id; //产品id
			var uId = uIds; //预约用户ID
			var status = i; //状态;
			var params = {
				token,
				flag,
				id,
				uId,
				status
			};
			this.__initAction(url, params, (res, s) => {
				if (s == 1) {
					if (res.info == "同意成功") {
						// this._msg("已邀请");
						this.isBtnCode = false;
					} else if (res.info == "拒绝成功") {
						// this._msg("");
						this.$router.back(-1);
					}
					this.getPageInfo();
				}
			})
		}
	},

	computed: {
		playImgUrl() {
			return this.recConfig.img[this.recConfig.imgCode].url;
		},

		startStr() {
			return this.recConfig.startPoint[this.recConfig.playCode];
		},

		msgDataLists() {
			return this.$store.state.msgDataList;
		},

		blobUrl() {
			return this.recConfig.blobUrl;
		}
	}

};
</script>

<style lang="scss" scoped>
	.interview_chat .info-items {}
	.interview_chat .info-items .msg-list { margin-bottom: 3rem; overflow: scroll; }
	.chat-phone-logo {
		position: fixed; top: 1%; right: 3%; text-decoration: none; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; z-index: 1000;
		span { font-size: 26px; } 
	}
	.msg-list .msg-list-item-you { display: flex; justify-content: flex-start; }
	.msg-list .msg-list-item-you .list-item-right { text-align: left; margin-left: 0.74rem; padding-right: 4rem; }
	.msg-list .msg-list-item-i { display: flex; justify-content: flex-end; }
	.msg-list .msg-list-item-i .list-item-left { text-align: right; margin-right: 0.74rem; padding-left: 4rem; }
	.msg-list .msg-list-item-i .list-item-right {}

	.msg-list .msg-list-item-i .list-item-right .item-image,
	.msg-list .msg-list-item-you .list-item-left .item-image { border-radius: 5px; }
	.msg-list .msg-list-item-i .list-item-left .item-contnet,
	.msg-list .msg-list-item-you .list-item-right .item-contnet { padding: 7px 10px; background: #fff; border-radius: 5px; display: flex; font-size: 14px; font-weight: 500; justify-content: center; align-items: center; }
	.interview_chat_footer .txt-send-btn { width: 20%; height: 60%; padding: 1px 6px; background: #09f; border-radius: 44px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #fff; font-size: 14px; }
	.eiej-model { width: 100%; height: 195px; padding: 10px 0; background: #fff; position: fixed; transition: 0.5s all; bottom: -300px; }
	.icon-list { width: 100%; display: flex; justify-content: flex-start; flex-wrap: wrap; text-align: center; }
	.icon-list .icon-list-item { width: 12%; }
	.icon-list .icon-list-item .icon-list-link { display: inline-block; }
	.d-inline-block { display: inline-block; }
	.content-audio-i { width: 100%; height: 40px; background: #fff; display: flex; justify-content: flex-end; align-items: center; padding-right: 15px; border-radius: 5px; }
	.content-audio-you { width: 100%; height: 40px; background: #fff; display: flex; justify-content: flex-start; align-items: center; padding-left: 15px; border-radius: 5px; }
	.content-audio-you .audio-play-you { width: 1.5rem; height: 1.5rem; }
	.content-audio-i .audio-play-i { width: 1.5rem; height: 1.5rem; transform: rotate(180deg); }
	.recorder-model { text-align: center; }
	.recorder-model .recorder-box { display: inline-block; background-color: #ccc; border-radius: 50%; }
	.recorder-model .recorder-rec { width: 6rem; height: 6rem; padding: 10px; }
	.list-btn { padding: 1rem; width: 100%; display: flex; margin-top: 1rem; position: absolute; bottom: 0; }
	.list-btn .list-link { width: 50%; }
	.list-btn .list-link .list-link-item { padding: 0.5rem 2rem; background: #09f; color: #fff; font-size: 14px; border-radius: 44px; }
	.icon-del {
		position: absolute; bottom: 8px; right: 22px; border-radius: 10px;
		.icon-del-btn { padding: 0.3rem 0.6rem; background: #09f; color: #fff; }
	}
</style>
