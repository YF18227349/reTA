<template></template>
<script>
// const baseLink = "http://zywl.tarl.cc/";
// // app.tiananrenli.com
const baseLink = "https://base.sxtian.com/";
// const baseLink = "http://zywl.tarl.cc/";
// const baseURL = baseLink + "kkkk.php";
// const baseURL = baseLink + "aaaa.php";
const baseURL = baseLink + "api.php"; //http://localhost:8089
const reg_phone = /^1\d{10}$/;
const reg_bankCardId = /^\d{15}|\d{19}$/;
// const reg_ID = /^\d{6}(19|20)\d{2}(0[1-9]|1[1-2])[0-2]\d{4}\w$/;
const reg_ID = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])([0-2][1-9]|10|20|30|31)\d{3}[0-9Xx]$/; // by Hugh
// const reg_Email=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

//全局参数
const config = {};
export default {
	baseURL, //URL
	baseLink,
	reg_phone, //电话号码正则匹配
	reg_bankCardId,
	reg_ID,
	// reg_Email,
	config
};
</script>
<style lang="scss">
</style>
