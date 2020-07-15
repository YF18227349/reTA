/**
 * git do not control webim.config.js
 * everyone should copy webim.config.js.demo to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 *
 */

 // for react native
 // var location = {
 //     protocol: "https"
 // }
/*
webim-h5.easemob.com

webim.easemob.com

webim-ly.easemob.com/
*/
// const link = "http://192.168.5.106:8089";
const link = "https://app.tiananrenli.com";
function getUrl(){
   var apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com"
   var xmppUrl = "im-api.easemob.com/ws"
   if(window.location.href.indexOf(link) !== -1 ){
       apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com"
       xmppUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//im-api-v2.easemob.com/ws"
   }
   else if(window.location.href.indexOf(link) !== -1){
       apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com"
       xmppUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//im-api-v2.easemob.com/ws"
   }
   else if(window.location.href.indexOf(link) !== -1 || window.location.href.indexOf("localhost") !== -1){
       apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com"
       xmppUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//im-api-v2.easemob.com/ws"
   }
   return {
       apiUrl: apiUrl,
       xmppUrl: xmppUrl
   }
}
var config = {
  xmppURL: getUrl().xmppUrl, // xmpp Server地址，对于在console.easemob.com创建的appKey，固定为该值

  apiURL: getUrl().apiUrl, // rest Server地址，对于在console.easemob.com创建的appkey，固定为该值

  appkey: '1145190708181390#tianan-service', // App key

  Host: "easemob.com",

  https: true, // 是否使用https

  isHttpDNS: true, //防止DNS劫持从服务端获取XMPPUrl、restUrl

  isMultiLoginSessions: false, // 是否开启多页面同步收消息，注意，需要先联系商务开通此功能

  isAutoLogin: true, // 自动出席，（如设置为false，则表示离线，无法收消息，需要在登录成功后手动调用conn.setPresence()才可以收消息）

  isDebug: false, // 打开调试，会自动打印log，在控制台的console中查看log

  autoReconnectNumMax: 2, // 断线重连最大次数

  autoReconnectInterval: 2, // 断线重连时间间隔

  heartBeatWait: 4500, // 使用webrtc（视频聊天）时发送心跳包的时间间隔，单位ms

  delivery: true

};

export default config
