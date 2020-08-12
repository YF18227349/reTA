exports.install = function (Vue, options) {

	//验证手机号码 (x:手机号码,reg正则匹配)
	Vue.prototype.checkPhone = function (x, reg) { //全局函数1
		var re = reg
		if (!x) {
			this.$dialog.toast({
				mes: "电话号码不能为空",
				timeout: 800
			});
			return;
		} else if (!re.test(x)) {
			this.$dialog.toast({
				mes: "电话号码格式错误",
				timeout: 800
			});
			return;
		} else {
			return true;
		}
	};
	//验证手机号码 (x:手机号码,reg正则匹配)
	Vue.prototype.checkPhone2 = function (x, reg) { //全局函数1
		var re = reg
		if (!x) {
			this.$dialog.toast({
				mes: "账号不能为空",
				timeout: 800
			});
			return;
		} else if (!re.test(x)) {
			this.$dialog.toast({
				mes: "账号格式错误",
				timeout: 800
			});
			return;
		} else {
			return true;
		}
	};

	//验证密码 (pwd: 验证的密码)
	Vue.prototype.checkPwd = function (pwd) { //全局函数2
		if (!pwd) {
			this.$dialog.toast({
				mes: "密码不能为空",
				timeout: 800
			});
			return;
		} else if (pwd.length < 6 || pwd.length > 25) {
			this.$dialog.toast({
				mes: "密码格式错误",
				timeout: 800
			});
			return;
		} else {
			return true;
		}
	};

	//勾选协议和隐私 (Checkbox: 勾选)
	Vue.prototype.checkCheckbox = function (Checkbox) {
		if (!Checkbox) {
			this.$dialog.toast({
				mes: "需要勾选协议与隐私",
				timeout: 800
			});
			return;
		} else {
			return true;
		}
	};

	// 验证邮箱（email:验证邮箱）
	Vue.prototype.checkEmail = function(email, reg){
		var re = reg
		if(!email){
			this.$dialog.toast({
				mes:"邮箱不能为空",
				timeout:800
			});
			return;
		}else if(email.length<6 || email.length>25 || !re.test(email)){
				this.$dialog.toast({
					mes:"邮箱格式错误",
					timeout:800
				});
				return;
		}else{
			return true;
		}
	};
	Vue.prototype.checkEmail2 = function(email, reg){
		var re = reg
		if(!email){
			this.$dialog.toast({
				mes:"账号不能为空",
				timeout:800
			});
			return;
		}else if(!re.test(email)){
				this.$dialog.toast({
					mes:"账号格式错误",
					timeout:800
				});
				return;
		}else{
			return true;
		}
	}


	//验证银行卡号( x:卡号,reg:正则表达式)
	Vue.prototype.checkbankCardId = function (x, reg) { //全局函数3
		var re = reg
		if (!x) {
			this.$dialog.toast({
				mes: "卡号不能为空",
				timeout: 1000
			});
			return;
		} else if (!re.test(x)) {
			this.$dialog.toast({
				mes: "卡号格式错误",
				timeout: 1000
			});
			return;
		} else {
			return true;
		}
	};

	//验证身份证号码
	Vue.prototype.checkID = function (x, reg) {
		var re = reg
		if (!x) {
			this.$dialog.toast({
				mes: "身份证号码不能为空",
				timeout: 1000
			});
			return;
		} else if (!re.test(x)) {
			this.$dialog.toast({
				mes: "身份证号码格式错误",
				timeout: 1000
			});
			return;
		} else {
			return true;
		}
	};

	Vue.prototype.calc = function (left, right, type, length) {
		let BN = BigNumber.clone();
		length = length ? length : 2;
		BN.config({
			DECIMAL_PLACES: length
		});
		switch (type) {
			case '+':
				return BN(left).plus(right).toFixed(length);
			case '-':
				return BN(left).minus(right).toFixed(length);
			case '*':
				return BN(left).times(right).toFixed(length);
			case '/':
				return BN(left).div(right).toFixed(length);
			case '%':
				return BN(left).mod(right).toFixed(length);
		}
	};

	//获取页面params传参
	Vue.prototype.getParams = function () {
		return this.$route.params
	};

	//获取页面query传参
	Vue.prototype.getQuery = function () {
		return this.$route.query
	};
	//获取页面传参
	Vue.prototype.__Href = function (href) {
		options.router.push(href);
	};
	//设置缓存
	Vue.prototype.setCache = (key, val) => {
		window.localStorage.setItem(key, val); 
		return true;
	};
	//获取缓存
	Vue.prototype.getCache = (key, v = 1) => {
		var ret = window.localStorage.getItem(key);
		switch (v) {
			case 2:
				ret = JSON.parse(ret);
				break;
			default:
				break;
		}
		return ret;
	};
	//获取user_info
	Vue.prototype.getUserInfo = function () {
		var info = this.getCache("user_info", 2);
		return info;
	};
	//直接获取请求口令
	Vue.prototype.getToken = function () {
		var info = this.getCache("user_info", 2);
		if (info) {
			return info.token;
		} else {
			return 0;
		}
	};
	//获取select_data函数
	Vue.prototype.getSelectData = function () {
		var info = this.getCache("select_data", 2);
		return info
	};
	//删除缓存
	Vue.prototype.delCache = (key) => {
		window.localStorage.removeItem(key);
		return true;
	};

	Vue.prototype.removeCache = () => {
		var del = [
			'laborsinfo',
			'InfoData',
			'userSetting',
			'invoice_fill_user_addr',
			'classGroupData',
		];
		for (var i = 0; i < del.length; i++) {
			window.localStorage.removeItem(del[i]);
		}
		return true;
	};
	//删除缓存
	Vue.prototype.delCacheAll = () => {
		window.localStorage.clear()
		return true;
	};
	//打印
	Vue.prototype._log = (dom) => {
		// console.log(dom);
		return false;
	};

	//带icon的提示框 (params:{mes,timeout,position,...})
	Vue.prototype.selfToast = (params) => {
		if (params.mes) {
			params.show = true
		}
		options.store.state.toast = params;
	};

	//带确认按钮提醒消息函数(params:{mes,cancel,alert,...})
	Vue.prototype.selfAlertBox = (params) => {
		options.store.state.alert.mes = params.mes;
		if (params.cancel) {
			options.store.state.alert.cancel = params.cancel;
		}
		if (params.alert) {
			options.store.state.alert.alert = params.alert;
		}
		if (params.opt){
			options.store.state.alert.opt = () => {
				params.opt()
			}
		}
	};

	//loading组件open函数 (params:{mes,status}格式参数)
	Vue.prototype.selfLoadOpen = (params) => {
		var data = options.store.state.load_plate;
		if (params.mes) {
			data.mes = params.mes
		};
		if (params.color) {
			data.color = params.color
		} else {
			data.color = "fc-gray"
		};
		if (params.font) {
			data.font = params.font
		} else {
			data.font = 28
		};
		data.show = true;
	};

	//loading组件close函数(params:{mes,status}格式参数)
	Vue.prototype.selfLoadClose = () => {
		var data = options.store.state.load_plate
		data.mes = '';
		data.color = '';
		data.font = null;
		data.show = false
	};


	Vue.prototype.selfLoadOpend = (params) => {
		var data = options.store.state.loading_frame;
		if (params.mes) {
			data.mes = params.mes
		};
		if (params.color) {
			data.color = params.color
		} else {
			data.color = "fc-gray"
		};
		if (params.font) {
			data.font = params.font
		} else {
			data.font = 28
		};

		data.status = params.status

		var code = options.store.state.main_load.show;
		if (!code) {
			data.show = true;
		} else {
			data.show = false;
		}

	};

	Vue.prototype.selfLoadClosed = () => {
		var data = options.store.state.loading_frame;
		data.mes = '';
		data.color = '';
		// data.font = null;
		data.status = false;
		data.show = false
	};

	//页面加载Loading事件组件 opend
	Vue.prototype.selfMainLoadOpend = () => {
		var data = options.store.state.main_load;
		data.show = true
	};
	//页面加载Loading事件组件 closed
	Vue.prototype.selfMainLoadClosed = () => {
		var data = options.store.state.main_load;
		data.show = false
	};


	Vue.prototype.selfSubmitOpen = (params) => {
		var data = options.store.state.submit_toast;
		data.status = params.status;
		data.show = true;
		if (params.opt) {
			data.opt = () => {
				params.opt()
			}
		}

	};
	Vue.prototype.selfSubmitClose = () => {
		var data = options.store.state.submit_toast;
		data.status = false;
		data.show = false
	}

	//跳转函数 (data:{url,timeout,params})
	Vue.prototype.goURL = (data) => {
		var router = options.router
		var url = data.url;
		//判断时长
		if (data.timeout) {
			var timeout = data.timeout;
		} else {
			var timeout = 100;
		}
		//判断参数
		if (!data.params) {
			setTimeout(() => {
				router.push(url)
			}, timeout)
		} else {
			var params = data.params;
			setTimeout(() => {
				router.push({
					path: url,
					query: params
				})
			}, timeout)
		}
	}

	//POST请求器
	Vue.prototype.__initAction = function (link, param, fun, tip = false, msg = '拼命加载中...') {
		this._closeAll();
		if (tip) {
			this.loading(msg);
		}
		this.axios.post(this.Global.baseURL + "/" + link + ".jsp", param).then(res => {
			if (res) {
				if (res.data.info == '未定义请求令牌!') {
					this.delCache("user_info");
					// this.__Href("/login");
				}
				fun(res.data, res.data.status);
				if (res.data.status != 1) {
					this.__Error(res);
				}
			}
		}).catch(e => {
			this.selfMainLoadClosed();
			this._closeAll();
			// this._msg('网络故障请重试...', 1500, 'error');
			// console.error(e);
		});
	};

	Vue.prototype.__UploadImg = function (baseFile, suffix, fun) {
		var params = {
			token: this.getToken(),
			baseFile: baseFile,
			suffix: suffix
		};
		this.__initAction(
			"Tools-uploadsFileBs64",
			params,
			(res, s) => {
				if (s == 1) {
					fun(res.data);
					this._closeAll();
					this._msg("上传成功!", 1000, "SUCCESS");
				}
			},
			true,
			"正在上传请稍后..."
		);
	};


	//获取页面传参
	Vue.prototype.__Sleep = function (fun, time = 500) {
		setTimeout(() => {
			fun();
		}, time);
	};
	//获取页面传参
	Vue.prototype.initPage = function () {
		return {
			page: this.Global.config.page,
			length: this.Global.config.length,
			count: 0
		};
	};
	//获取页面传参
	Vue.prototype.initParam = function () {
		if (this.getUserInfo()) {
			var config = this.Global.config;
			var location = this.getCache("location", 2);
			return {
				page: config.page,
				length: config.length,
				lat: location.lat ? location.lat : "108.953794",
				lon: location.lon ? location.lon : "108.953794",
				cityId: location.cityId ? location.cityId : 610100,
				fields: 'id',
				rules: 'desc',
				token: this.getUserInfo().token,
				uid: this.getUserInfo().uid,
			};
		} else {
			return {
				page: 0,
				length: 10,
				lat: "34.336105",
				lon: "108.953794",
				cityId: 610100,
				fields: 'id',
				rules: 'desc',
			};
		}
	};
	//获取页面传参
	Vue.prototype.__Error = function (res) {
		console.log("Error", res);
	};
	//_alert
	Vue.prototype._alert = function (msg = '提示信息') {
		this.selfAlertBox({
			mes: msg,
			alert: true
		});
	};
	//loading工具
	Vue.prototype.loading = function (str = '拼命加载中...') {
		this.$dialog.loading.open(str); //提示加载层
	};
	//loading工具
	Vue.prototype._closeAll = function () {
		this.$dialog.loading.close();
	};
	//msg
	Vue.prototype._msg = function (msg = '提示信息', time = 2000, icon = false) {
		if (icon) {
			var data = {
				mes: msg,
				timeout: time,
				icon: icon,
			};
		} else {
			var data = {
				mes: msg,
				timeout: time,
			};
		}
		this.$dialog.toast(data);
	};
	//_alert
	Vue.prototype.deBug = function () {
		return this.Global.config.deBug;
	};
	//_获取当前时间
	Vue.prototype._getDate = function () {
		var timer = new Date(); //当前日期
		var years = timer.getUTCFullYear(); //年
		var month = timer.getUTCMonth() + 1; //月
		var date = timer.getUTCDate(); //日
		var hours = timer.getHours(); //时
		var minutes = timer.getMinutes(); //分
		month = `${month > 9 ? month : "0" + month}`;
		date = `${date > 9 ? date : "0" + date}`;
		hours = `${hours > 9 ? hours : "0" + hours}`;
		minutes = `${minutes > 9 ? minutes : "0" + minutes}`;
		obj = {
			years,
			month,
			date,
			hours,
			minutes
		};
		return obj;
	};

	Vue.prototype.str2json = function (str) {
		return eval('(' + str + ')');
	};

};
