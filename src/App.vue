<template>
  <div id="app">
    <header
      class="nav_header bg-white w-100"
      v-show="$route.meta.showHeader"
      :style="'background:'+bg_header"
    >
      <a href="javascript:history.go(-1)" class="header_left" v-show="!$route.meta.goBcak">
        <span class="iconfont icon-previewleft fw-7" :style="'color:'+left_fc_header"></span>
      </a>
      <span class="header_title fw-5" :style="'color:'+fc_header">{{header_title}}</span>
      <a href="javascript:;" class="header_right text-right">
        <span class="iconfont" :style="'color:'+right_fc_header"></span>
      </a>
    </header>
    <div class="clear-header-fixed" v-show="$route.meta.showHeader"></div>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>
    </keep-alive>

      <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
      </router-view>
    
    <!-- 发布板块 -->
    <div class="release_toast_group w-100" v-if="pageInfo.toast_code">
      <div class="tosat_list bg-white">
        <div class="item_title w-100">
          <span></span>
          <span class="fc-dark">选择发布内容</span>
          <span class="iconfont icon-error fc-dark" @click="pageInfo.toast_code=false"></span>
        </div>
        <!-- 发布类别 -->
        <div class="item_detail w-100">
          <a
            href="javascript:;"
            class="item mt-2"
            v-for="(tmp,i) in toastDataList"
            :key="i"
            @click="do_release(tmp.code,tmp.url,tmp.type)"
          >
            <img :src="tmp.logo" alt />
            <span class="mt-1">{{tmp.title}}</span>
          </a>
        </div>
      </div>
    </div>
    <footer class="footer_tabbar bg-white" v-show="$route.meta.showFooter">
      <div class="tabbar_item">
        <a href="javascript:;" class="item" @click="select_footer_tabbar(0)">
          <span
            class="item_icon iconfont icon-home"
            :class="footer_tabbar_code==0 || !footer_tabbar_code?'fc-blue':'fc-gray'"
          ></span>
          <span
            class="item_title"
            :class="footer_tabbar_code==0 || !footer_tabbar_code?'fc-blue':'fc-gray'"
          >首页</span>
        </a>
      </div>
      <div class="tabbar_item">
        <a href="javascript:;" class="item" @click="select_footer_tabbar(1)">
          <span
            class="item_icon iconfont icon-custom-discovery"
            :class="footer_tabbar_code==1?'fc-blue':'fc-gray'"
          ></span>
          <span class="item_title" :class="footer_tabbar_code==1?'fc-blue':'fc-gray'">信息库</span>
        </a>
      </div>
      <div class="tabbar_item">
        <a href="javascript:;" class="item p-r" @click="select_footer_tabbar(2)">
          <div class="tabbar_logo p-a">
            <img src="../static/imgs/service/tabbar_mid.png" alt class="tabbar_logo_img" />
          </div>
          <span class="item_title" :class="footer_tabbar_code==2?'fc-blue':'fc-gray'"></span>
        </a>
      </div>
      <div class="tabbar_item">
        <a href="javascript:;" class="item" @click="select_footer_tabbar(3)">
          <span
            class="item_icon iconfont icon-Handshake"
            :class="footer_tabbar_code==3?'fc-blue':'fc-gray'"
          ></span>
          <span class="item_title" :class="footer_tabbar_code==3?'fc-blue':'fc-gray'">服务</span>
        </a>
      </div>
      <div class="tabbar_item">
        <a href="javascript:;" class="item" @click="select_footer_tabbar(4)">
          <span
            class="item_icon iconfont icon-mine-red"
            :class="footer_tabbar_code==4?'fc-blue':'fc-gray'"
          ></span>
          <span class="item_title" :class="footer_tabbar_code==4?'fc-blue':'fc-gray'">我的</span>
        </a>
      </div>
    </footer>
    <self-toast></self-toast>
    <!-- <self-main-load></self-main-load> -->
    <self-alert-box></self-alert-box>
    <self-submit-toast></self-submit-toast>

    <!-- <div id="app-copy" v-if="isCode">
      <div class="app-banner">
        <span class="time-box" v-if="timeLen!=0">
          <span v-text="timeLen"></span>s
          <span v-text="`跳过`" @click="showLoadingImage(null, 10);"></span>
        </span>
        <div class="banner-image" :style="loadImageStyle"></div>
      </div>
    </div>-->
    <!--newIsShow  -->
    <div class="news-copy" :style="bgSwiper" v-if="false">
      <yd-slider index="0" :loop="false" :callback="sliderBack">
        <yd-slider-item v-for="(item,i) of loadingImageList" :key="i">
          <img class="news-copy-image" :src="item" />
        </yd-slider-item>
      </yd-slider>
      <div
        class="news-copy-jump"
        v-if="loadingImageList.length!=0 && (loadLen != loadingImageList.length)"
        @click="newJump"
      >
        <span>跳过</span>
      </div>
      <div
        class="news-copy-box"
        v-if="loadingImageList.length!=0 && (loadLen == loadingImageList.length)"
      >
        <div class="news-copy-btn-box">
          <button type="button" name="button" @click="newJump">立即开始</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
const SubmitToast = () => import("./components/sub/submit_toast_plate");
const AlertBox = () => import("./components/sub/alert_messagebox");
const MainLoad = () => import("./components/sub/main_loading");
const Toast = () => import("./components/sub/toast_plate");

const loadImage = () => import("../static/imgs/loadImage/img.js");
// import loadImage from "../static/imgs/loadImage/img.js";

export default {
  name: "App",
  data() {
    return {
      transitionName: 'forward',
      isLoadImage: true,
      pageInfo: {
        toast_code: false
      },
      footer_tabbar_code: this.getCache("footTabbarChange"),
      footer_tabbat_list: [
        "/main",
        "/Information",
        "",
        "/service_main",
        // "/usercenter"
        "/newusercenter"
      ],
      toastDataList: [],
      isTabbarShow: true,
      bannerId: 12,
      loadImageStyle: {
        backgroundImage: true
      },
      bgSwiper: {
        backgroundImage: true
      },
      loadLen: 0,
      newIsShow: true,
      loadingImageList: [],
      isNumUp: 0,
      isNum: 0,
      timeLen: 0, //倒计时
      isCode: true,
      showTiem: "",
      timer1: null,
      timer2: null,
      isWebImCode: true,
      userName: null, // im用户名
      acsToken: null,
      localData: [], //转换
      loadsImage: loadImage.base64Image
    };
  },
  created() {
    let that = this;
    this.loadImageStyle.backgroundImage = `url(${this.loadsImage})`;
    this.bgSwiper.backgroundImage = `url(${this.loadsImage})`;
    this.loadImageState();
    this.updataTabBar();
    this.init();

    // window.addEventListener(
    //   "popstate",
    //   function(e) {
    //     that._msg("监听到了浏览器的返回按钮事件");
    //     console.log(e, "监听到了浏览器的返回按钮事件");
    //   },
    //   false
    // );
  },

  mounted() {
    var h = document.documentElement.clientHeight;
    // $(".nav_header").css("height", `${h * 0.07}px`);
    // $(".clear-header-fixed").css("height", `${h * 0.07}px`);
    $(".nav_header").css("height", "2.8rem");
    $(".clear-header-fixed").css("height", "2.8rem");
    $(".nav_header>.header_title").css("fontSize", `${h * 0.026}px`);
    this.upImageSize();
    // this.initBack();
  },

  updated() {
    this.updataTabBar();
    var path = this.$route.path;
    if (path != "/login") {
      if (this.isWebImCode) {
        this.isWebImCode = true;
        setTimeout(() => {
          this.isWebImCode = false;
        }, 500);
      }
    }
  },
  methods: {
   
    init() {
      var config = {};
      config.page = 0;
      config.length = 10;
      config.deBug = true;
      this.Global.config = config;

      this.__initAction("Tools-initApp", {}, (res, s) => {
        var add = {};
        var it = res.data.Release.Release_demands;
        add.title = it.name;
        add.logo = it.value;
        add.url = "/release_demand";
        add.code = true;
        add.type = 0;
        this.toastDataList.push(add);

        var add = {};
        var it = res.data.Release.Release_skills;
        add.title = it.name;
        add.logo = it.value;
        add.url = "/release_skill";
        add.code = true;
        add.type = 1;
        this.toastDataList.push(add);

        var add = {};
        var it = res.data.Release.Release_quarters;
        add.title = it.name;
        add.logo = it.value;
        add.url = "/release_post";
        add.code = true;
        add.type = 2;
        this.toastDataList.push(add);

        var add = {};
        var it = res.data.Release.Release_resume;
        add.title = it.name;
        add.logo = it.value;
        add.url = "/release_resume/1";
        add.code = true;
        add.type = 3;
        this.toastDataList.push(add);
      });
    },
    initIm() {
      //初始化Im
      var _this = this;
      var uinfo = this.getCache("user_info",2);
      if (uinfo) {
        this.userName = uinfo.Husername;
        this.acsToken = uinfo.token;

        // this.$imOption.user = userName; //将登录名存入imoptions
        // this.$imOption.accessToken = acsToken; //将密码存入imoptions
        this.$imOption.user = this.userName;
        this.$imOption.pwd = this.userName;
        this.$imConn.open(this.$imOption); //登录
        // this._log("登录Im...")

        this.$imConn.listen({
          //添加相应的callback
          onOpened: function(message) {
            //连接成功回调
            // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
            // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
            // 则无需调用conn.setPresence();
            _this._log("登录成功");
            // _this.isWebImCode = false; //停止登录
            // console.log(message, "连接成功...");
          },
          onClosed: function(message) {
            _this._log("登录异常");
            _this.isWebImCode = true; //再次尝试登录

            setTimeout(() => {
              _this.isWebImCode = false;
            }, 500);
            // console.log(message, "连接关闭回调");
          }, //连接关闭回调

          onTextMessage: function(message) {
            var msg = message.data;
            var from = message.from;
            var to = message.to;
            //获得当前时间 年-月-日-时-分
            var dates = _this._getDate();
            var strDate = `${_this._getDate().years}-${_this._getDate().month}-${
              _this._getDate().date
            } ${_this._getDate().hours}:${_this._getDate().minutes}`;
            //获得用户详情
            var url = "Member-userInfo";
            var token = _this.getUserInfo().token;
            var params = {
              token,
              phone: from
            };
            var obj = {}; //存储对象
            _this.__initAction(url, params, (res, s) => {
              if (s == 1) {
                var data = res.data;
                obj.userName = data.memberData.lastName;
                obj.portrait = data.memberData.portrait;
                obj.strDate = strDate;
                obj.txt = [];
                var obk = {
                  text: msg
                };
                obj.txt.push(obk);
                obj.fromNum = from;
                obj.toNum = to;
                setTimeout(() => {
                  _this.localData = _this.$store.state.msgDataList;
                  _this.localData.push(obj);
                  _this.$store.commit("msgDataListChange", _this.localData);
                }, 200);
              }
            });
            // msg = msg.split(/:{2}RIG:{2}/);
            // obj.userName = msg[0];
            // obj.portrait = msg[1];
            // obj.strDate = msg[2];
            // obj.txt = [];
            // var obk = {
            //   text: msg[3]
            // };
            // obj.txt.push(obk);
            // obj.userNum = from;
            // obj.toUser = to;
            // setTimeout(() => {
            //   _this.localData = _this.$store.state.msgDataList;
            //   _this.localData.push(obj);
            //   _this.$store.commit("msgDataListChange", _this.localData);
            // }, 300);
            console.log(message, "收到文本消息");
          }, //收到文本消息

          onEmojiMessage: function(message) {
            var info = message.data;
            var from = message.from;
            var to = message.to;
            //获得当前时间 年-月-日-时-分
            var dates = _this._getDate();
            var strDate = `${_this._getDate().years}-${_this._getDate().month}-${
              _this._getDate().date
            } ${_this._getDate().hours}:${_this._getDate().minutes}`;
            //获得用户详情
            var url = "Member-userInfo";
            var token = _this.getUserInfo().token;
            var params = {
              token,
              phone: from
            };
            var obj = {};
            _this.__initAction(url, params, (res, s) => {
              if (s == 1) {
                var data = res.data;
                console.log(data);
                obj.userName = data.memberData.lastName;
                obj.portrait = data.memberData.portrait;
                obj.strDate = strDate;
                obj.txt = [];
                for (var key in info) {
                  if (info[key]) {
                    if (info[key].type == "txt") {
                      var objt = {
                        text: info[key].data
                      };
                      obj.txt[key] = objt;
                    } else if (info[key].type == "emoji") {
                      var obju = {
                        url: info[key].data
                      };
                      obj.txt[key] = obju;
                    }
                  }
                }
                obj.fromNum = from;
                obj.toNum = to;
                setTimeout(() => {
                  _this.localData = _this.$store.state.msgDataList;
                  _this.localData.push(obj);
                  _this.$store.commit("msgDataListChange", _this.localData);
                }, 200);
              }
            });
            console.log(message, "收到表情消息");
          }, //收到表情消息

          onPictureMessage: function(message) {
            console.log(message, "收到图片消息");
          }, //收到图片消息

          onCmdMessage: function(message) {
            console.log(message, "收到命令消息");
          }, //收到命令消息

          onAudioMessage: function(message) {
            console.log(message, "收到音频消息");
            var options = {
              url: message.filename
            };
            var objectURL;
            options.onFileDownloadComplete = response => {
              //音频下载成功，需要将response转换成blob，使用objectURL作为audio标签的src即可播放。
              objectURL = _this.$webim.utils.parseDownloadResponse.call(
                _this.$imConn,
                response
              );
            };

            options.onFileDownloadError = () => {
              //音频下载失败
              console.log("音频下载失败");
            };

            //通知服务器将音频转为mp3
            options.headers = {
              Accept: "audio/mp3"
            };
            _this.$webim.utils.download.call(_this.$imConn, options);

            var from = message.from; //from user
            var to = message.to; //go to user

            //获得当前时间 年-月-日-时-分
            var dates = _this._getDate();
            var strDate = `${_this._getDate().years}-${_this._getDate().month}-${
              _this._getDate().date
            } ${_this._getDate().hours}:${_this._getDate().minutes}`;
            var url = "Member-userInfo";
            var token = _this.getUserInfo().token;
            var params = {
              token,
              phone: from
            };
            var obj = {};
            _this.__initAction(url, params, (res, s) => {
              if (s == 1) {
                var data = res.data;
                obj.userName = data.lastName;
                obj.portrait = data.portrait;
                obj.strDate = strDate;
                obj.record = options.url;
                obj.fromNum = from;
                obj.toNum = to;
                setTimeout(() => {
                  _this.localData = _this.$store.state.msgDataList;
                  console.log(obj);
                  _this.localData.push(obj);
                  console.log(obj);
                  _this.$store.commit("msgDataListChange", _this.localData);
                }, 300);
              }
            });
          }, //收到音频消息

          onLocationMessage: function(message) {
            console.log(message, "收到位置消息");
          }, //收到位置消息

          onFileMessage: function(message) {
            console.log(message, "收到文件消息");
          }, //收到文件消息

          onVideoMessage: function(message) {
            //音频
            var options = {
              url: message.url
            };
            var objectURL;
            options.onFileDownloadComplete = response => {
              //音频下载成功，需要将response转换成blob，使用objectURL作为audio标签的src即可播放。
              objectURL = _this.$webim.utils.parseDownloadResponse.call(
                _this.$imConn,
                response
              );
            };

            options.onFileDownloadError = () => {
              //音频下载失败
              console.log("音频下载失败");
            };

            //通知服务器将音频转为mp3
            options.headers = {
              Accept: "audio/mp3"
            };
            _this.$webim.utils.download.call(_this.$imConn, options);

            var from = message.from; //from user
            var to = message.to; //go to user

            //获得当前时间 年-月-日-时-分
            var dates = _this._getDate();
            var strDate = `${_this._getDate().years}-${_this._getDate().month}-${
              _this._getDate().date
            } ${_this._getDate().hours}:${_this._getDate().minutes}`;
            var url = "Member-userInfo";
            var token = _this.getUserInfo().token;
            var params = {
              token,
              phone: from
            };
            var obj = {};
            _this.__initAction(url, params, (res, s) => {
              if (s == 1) {
                var data = res.data;
                obj.userName = data.lastName;
                obj.portrait = data.portrait;
                obj.strDate = strDate;
                obj.record = options.url;
                obj.userNum = from;
                obj.toUser = to;
                setTimeout(() => {
                  _this.localData = _this.$store.state.msgDataList;
                  _this.localData.push(obj);
                  _this.$store.commit("msgDataListChange", _this.localData);
                }, 300);
              }
            });

            console.log(message, "收到音频文件");
          }, //收到视频消息

          onPresence: function(message) {
            console.log(message, "“广播”或“发布-订阅”消息");
          }, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息

          onRoster: function(message) {
            console.log(message, "处理好友申请");
          }, //处理好友申请

          onInviteMessage: function(message) {
            console.log(message, "处理群组邀请");
          }, //处理群组邀请

          onOnline: function(message) {
            console.log(message, "本机网络连接成功");
          }, //本机网络连接成功

          onOffline: function(message) {
            console.log(message, "本机网络掉线");
          }, //本机网络掉线

          onError: function(message) {
            _this.isWebImCode = true; //再次尝试登录
            setTimeout(() => {
              _this.isWebImCode = false;
            }, 500);
            // console.log(message, "失败");
          }, //失败回调

          onBlacklistUpdate: function(list) {
            //黑名单变动
            // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
            console.log(list);
          },

          onReceivedMessage: function(message) {
            console.log(message, "收到消息送达服务器回执");
          }, //收到消息送达服务器回执

          onDeliveredMessage: function(message) {
            console.log(message, "收到消息送达客户端回执");
          }, //收到消息送达客户端回执

          onReadMessage: function(message) {
            console.log(message, "收到消息已读回执");
          }, //收到消息已读回执

          onCreateGroup: function(message) {
            console.log(message, "创建群组成功回执");
          }, //创建群组成功回执（需调用createGroupNew）

          onMutedMessage: function(message) {
            console.log(message, "群组被禁言");
          } //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
        });
      } else {
        this.isWebImCode = true;
        this._log("环信登录异常");
        return;
      }
      
    },

    loadImageState() {
      var name = this.$route.name;
      var path = this.$route.path;
      if (
        // (name == "main" && path == "/main") ||
        (name == "Login" && path == "/login") 
        // (name == "IndexMain" && path == "/")
      ) {
        this.loadBannerImage();
      } else {
        this.showLoadingImage(null, 10);
      }
    },

    preLoadImg(url) {
      var img = new Image(); //创建一个Image对象，实现图片的预下载
      img.src = url;
      if (img.complete) {
        // 如果图片已经存在于浏览器缓存，直接调用回调函数
        var arr = [];
        arr.push(img.src);
        console.log("图片存在", arr);
        return; // 直接返回，不用再处理onload事件
      }
      img.onload = function() {
        //图片下载完毕时异步调用callback函数。
        // console.log("图片缓存", img.src);
      };
    },

    loadBannerImage() {
      //进场动画
      var url = "Banner-getData";
      var type = this.bannerId;
      this.__initAction(
        url,
        {
          type
        },
        (res, s) => {
          if (s == 1) {
            var arr = [];
            for (var item of res.data) {
              arr.push(item.image);
            }
            this.loadingImageList = arr;

            this.showLoadingImage(arr, 1);
          }
        }
      );
    },

    showLoadingImage(arr, index) {
      if (index == 1) {
        var ms = 1000; //1ms;
        var len = arr.length;
        this.timeLen = len * 2;
        this.loadImageStyle.backgroundImage = `url(${arr[this.isNumUp]})`;
        var timer1 = setInterval(() => {
          this.timeLen--;
          if (this.timeLen <= 0) {
            this.timeLen = 0;
            this.isCode = false;
            window.clearInterval(timer1);
            timer1 = null;
          }
          this.isNum++;
          if (this.isNum % 2 == 0) {
            this.isNumUp++;
            this.loadImageStyle.backgroundImage = `url(${arr[this.isNumUp]})`;
          }
        }, ms);
      } else if (index == 10) {
        //跳过进场动画
        this.isCode = false;
        window.clearInterval(timer1);
      }
    },

    newJump() {
      this.newIsShow = false;
    },

    sliderBack(i) {
      this.loadLen = i + 1;
    },

    upImageSize() {
      //自适应进场动画尺寸
      var h = document.documentElement.clientHeight;
      $("#app-copy").css("height", `${h}px`);
    },

    select_footer_tabbar(x) {
      if (x == 2) {
        this.pageInfo.toast_code = true;
      } else {
        if (x == 3) {
          // 点击服务时拿到安全码
          var params = {
            token: this.getToken(),
            // uid: this.getUserInfo().uid
          };
          var url = "Member-getUserCache";
          this.__initAction(url, params, (res, s) => {
            if (s == 1) {
              var data = res.data;
              this.setCache("userInfoExt", JSON.stringify(data));
            }
          });
        }
        setTimeout(() => {
          this.setCache("footTabbarChange", x);
          var bar = JSON.parse(this.getCache("footTabbarChange"));
          this.footer_tabbar_code = bar;
          this.$router.push(this.footer_tabbat_list[x]);
          // this.$store.commit("footTabbarChange", x);
          // this.footer_tabbar_code = this.$store.state.footer_tabbar_code;
        }, 100);
      }
      if (x == 1) {
        //信息库导航栏初始状态
        var info = JSON.parse(window.localStorage.getItem("select_data"));
        if (!info) info = {};
        if (!info.pageInfo) info.pageInfo = {};
        if (!info.pageInfo.information) info.pageInfo.information = {};
        info.pageInfo.information.pageTabCode = 0;
        window.localStorage.setItem("select_data", JSON.stringify(info));
      }
    },

    do_release(x, y, z) {
      var info = JSON.parse(this.getCache("userInfoExt"));
      if (info) {
        var rid = info.rid;
        if (rid == 1) {
          if (z == 2) {
            this.pageInfo.toast_code = false;
            this._msg("您是个人不能发布岗位(-_-)||");
            return;
          }
          // if (z == 3) {
          //
          //   return;
          // }
        } else if (rid == 2) {
          if (z == 3) {
            this.pageInfo.toast_code = false;
            this._msg("您是企业不能发布简历(-_-)||");
            return;
          }
        } else if (rid == 0) {
          this.pageInfo.toast_code = false;
          this._msg("请进行实名认证后操作(-_-)");
          setTimeout(()=> {
            this.__Href("/newusercenter");
          },1000)
          return;
        }
      }
      if (!x) {
        this.pageInfo.toast_code = false;
        this.$dialog.toast({
          mes: "系统正在维护中...",
          timeout: 2500
        });
      } else {
        setTimeout(() => {
          this.pageInfo.toast_code = false;
          this.$router.push(y);
        }, 200);
      }
    },

    updataTabBar() {
      var name = this.$route.name;
      if (name == "main") {
        // console.log("首页是蓝色的0")
        this.footer_tabbar_code = 0;
      } else if (name == "Information") {
        // console.log("信息库是蓝色的1")
        this.footer_tabbar_code = 1;
      } else if (name == "ServiceMain") {
        // console.log("服务是蓝色的3")
        this.footer_tabbar_code = 3;
        // UserCenter
      } else if (name == "newUserCenter") {
        // console.log("用户中心是蓝色的4");
        this.footer_tabbar_code = 4;
      }
    }
    
  },

  computed: {
    header_title() {
      return this.$store.state.header_title;
    },

    bg_header() {
      return this.$store.state.bg_header;
    },

    fc_header() {
      return this.$store.state.fc_header;
    },

    right_fc_header() {
      return this.$store.state.right_fc_header;
    },

    left_fc_header() {
      return this.$store.state.left_fc_header;
    }
  },

  components: {
    "self-toast": Toast,
    "self-main-load": MainLoad,
    "self-alert-box": AlertBox,
    "self-submit-toast": SubmitToast
  },

  watch: {
    asyncArray: function() {
      this.$nextTick(function() {
        this._log("End");
      });
    },

    isWebImCode() {
      this.initIm();
	  },
	// $route(to,from){
	//    console.log("to:--",to.path);
	//    console.log("from:--",from.path);
	//    if(to.path != from.path) {
	// 	   this.initBack();
	//    }
    // }
    // $route(to, from) {
    //   if (to.params['stack-key-dir'] === 'forward') {
    //     this.transitionName = 'forward';
    //   } else {
    //     this.transitionName = 'back';
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
}
.nav_header {
  width: 100%;
  height: 2.8rem !important;
  position: fixed;
  top: 0;
  z-index: 30;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.2);
  .header_left,
  .header_right {
    width: 10%;
    height: 2.8rem;
    line-height: 2.8rem;
    text-decoration: none;
  }
  .header_left {
    position: fixed;
    top: 0;
    left: 10px;
    span {
      font-size: 24px;
    }
  }
  .header_right {
    position: fixed;
    top: 0;
    right: 10px;
  }
  .header_title {
    display: block;
    margin: 0 auto;
    width: 100%;
    line-height: 2.8rem;
    text-align: center;
    font-size: 1.1rem;
  }
}

.footer_tabbar {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 20;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.2);
  .tabbar_item {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      height: 100%;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 5px;
      .item_icon {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 3px;
      }
      .item_title {
        font-size: 0.4rem;
        font-weight: bold;
      }
      .tabbar_logo {
        width: 3rem;
        height: 3rem;
        padding: 0 !important;
        margin: 0 !important;
        box-sizing: border-box;
        border-radius: 50%;
        border: 4px solid #fff;
        top: -20%;
        background: #fff;
        .tabbar_logo_img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.release_toast_group {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  .tosat_list {
    width: 70%;
    opacity: 1;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
  }
  .item_title {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    border-bottom: 1px solid #e7e7e7;
    span {
      font-weight: 600;
    }
    span:first-child {
      width: 15%;
    }
    span:nth-child(2) {
      font-size: 16px;
    }
    span:last-child {
      width: 15%;
      text-align: right;
      font-size: 20px;
    }
  }
}

div.item_detail {
  display: flex;
  flex-flow: wrap;
  align-items: center;
  padding: 15px 30px;
  .item {
    display: inline-block;
    text-decoration: none;
    width: 50%;
    height: 82px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 65px;
    }
    span {
      color: #8f8f94;
      font-size: 14px;
      font-weight: 500;
    }
  }
}
#app-copy {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  .app-banner {
    height: 100%;
    width: 100%;
    background: #fff;
    position: relative;
    .time-box {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.3rem 1.5rem;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 15px;
      font-size: 16px;
      color: #fff;
      z-index: 50;
    }
    .banner-image {
      height: 100%;
      width: 100%;
      background-size: 100% 100%;
    }
  }
}
.news-copy {
  width: 100vw;
  height: 100vh;
  // background: red;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 900;
  .news-copy-image {
    width: 100%;
  }
  .news-copy-jump {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;
    color: #09f;
  }
  .news-copy-box {
    height: 100vh;
    width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }
  .news-copy-btn-box {
    width: 100%;
    position: absolute;
    bottom: 15vh;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .news-copy-btn-box button {
    padding: 5px 25px;
    font-size: 20px;
    font-weight: 600;
    background: #008bf3;
    color: #fff;
    border-radius: 5px;
    outline: none;
    border: 0;
  }
  .news-copy-jump span {
    display: inline-block;
    padding: 5px 25px;
    background: rgba(102, 102, 102, 0.1);
    font-size: 16px;
    border-radius: 44px;
  }
}
</style>
