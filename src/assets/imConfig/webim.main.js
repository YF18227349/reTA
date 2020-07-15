import WebIM from "easemob-websdk";
import Config from "@/assets/imConfig/webim.config.js";  //引入im配置文件
import Emoji from "@/assets/imConfig/emoji.js";  //引入im表情文件

const WEB_IM = WebIM;
WEB_IM.config = Config;
WEB_IM.Emoji = Emoji;

const conn = WEB_IM.conn = new WebIM.connection({
  appKey: WEB_IM.config.appkey,
  isHttpDNS: WEB_IM.config.isHttpDNS,
  isMultiLoginSessions: WEB_IM.config.isMultiLoginSessions,
  https: WEB_IM.config.https,
  url: WEB_IM.config.xmppURL,
  isAutoLogin: true,
  heartBeatWait: WEB_IM.config.heartBeatWait,
  autoReconnectNumMax: WEB_IM.config.autoReconnectNumMax,
  autoReconnectInterval: WEB_IM.config.autoReconnectInterval,
  isStropheLog: WEB_IM.config.isStropheLog,
  delivery: WEB_IM.config.delivery
});

var options = { //用户&&密码登录
  apiUrl: WEB_IM.config.apiURL,
  user: '',
  pwd: '',
  appKey: WEB_IM.config.appkey
};
// var options = { //用户token
//     apiUrl: WebIM.config.apiURL,
//     user: '',
//     accessToken: '',
//     appKey: WebIM.config.appkey
// };
// var options = {  //生成token
//   apiUrl: WebIM.config.apiURL,
//   user: '',
//   pwd: '',
//   appKey: WebIM.config.appkey,
//   success: function (token) {
//       var token = token.access_token;
//       WebIM.utils.setCookie('webim_' + encryptUsername, token, 1);
//   },
//   error: function(){
//   }
// };
// Vue.prototype.$imToken = token
var WebImConfig = {
  conn,
  options,
  WEB_IM
};
export default WebImConfig;
