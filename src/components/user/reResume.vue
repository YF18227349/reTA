<template>
<div class="release_resume w-100">
  <!-- <header class="release_resume_header bg-gray w-100">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
      <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
      <router-link to="/resumeinfo/1" class="last">
        <span class="fw-5 fc-fark fs-3">预览</span>
      </router-link>
    </header>-->
  <!-- <div class="clear-fixed"></div> -->
  <div class="release_resume_group w-100">
    <ul class="release_resume_list w-100">
      <li class="resume_logo">
        <a href="javascript:;" id="import" class="line_arrow_img_item">
          <div class="item_txt">
            <span class="f-left fs-3 fw-6 fc-dark">头像</span>
            <img class="item_img f-right" :src="resume_info.logo">
          </div>
          <span class="f-right fm-2 fw-6 fc-gray iconfont icon-previewright"></span>
        </a>
      </li>
      <li class="mt-3">
        <a href="javascript:;" class="line_input_item">
          <span class="f-left fw-6 fs-3 fc-dark">姓名</span>
          <input class="line_input fs-3 fw-6 fc-dark" v-model="consignee" type="text" placeholder="请输入姓名">
        </a>
      </li>
      <li class="mt-3">
        <a href="javascript:;" class="line_input_item">
          <span class="fs-3 fw-6 fc-dark">年龄</span>
          <input class="line_input fs-3 fw-6 fc-dark" v-model="age" type="text" placeholder="请输入年龄">
        </a>
      </li>
      <li class="resume_sex mt-3">
        <a href="javascript:;" class="cell_arrow_item" @click="clickHanlder(-1)">
          <div class="cell_txt">
            <span class="f-left fs-3 fw-6 fc-dark">性别</span>
            <span class="f-right fs-3 fw-6 fc-dark">{{sex_value}}</span>
          </div>
          <span class="cell_arrow fs-3 mt-1 fw-6 fc-gray iconfont icon-previewright"></span>
        </a>
      </li>
      <li class="mt-3">
        <a href="javascript:;" class="item_check">
          <div class="tel w-100">
            <span class="fw-6 fs-3 fc-dark">联系电话</span>
            <input class="line_input fs-3 fw-6 fc-dark" v-model="tel" maxlength="11" type="tel" placeholder="请输入联系电话">
          </div>
          <a href="javascript:;" class="check_btn_group w-30" @click="check_code = !check_code">
            <span class="check_btn iconfont icon-duihao bg-white mr-2" :class="check_code?'fc-blue br-blue':'br-dark fc-white'"></span>
            <span class="fs-3 fw-6 fc-dark">公开</span>
          </a>
        </a>
      </li>
      <li class="list_item mt-3 mb-3">
        <p class="fw-6 fs-3 fc-dark">自我评价</p>
        <yd-textarea class="fs-3 fw-6 fc-dark" v-model="infos" slot="right" placeholder="请输入自我评价（15-100字以内）" maxlength="100"></yd-textarea>
      </li>
      <li class="list_item" v-for="(item,i) in dataList" :key="i">
        <a href="javascript:;" class="item" @click="clickHanlder(i)">
          <span>{{item.title}}</span>
          <div class="item_date">
            <span :class="i==4?'fc-red':'fc-dark'">{{item.value?item.value:'请选择' | addrHandle}}</span>
            <span class="iconfont icon-previewright"></span>
          </div>
        </a>
      </li>
    </ul>
    <div class="work_experience w-100 mt-3 bg-white">
      <p class="fc-dark fw-6 fs-3">工作经验</p>
      <div class="work_experience_container w-100">
        <p class="fs-3 w-100 fc-gray fw-6 mt-3 mb-5 text-center" v-if="work_experience_list.length==0">-- 没有添加工作经历 --</p>
        <a href="javascript:;" class="work_experience_item w-100 mt-2 mb-2" v-for="(tmp,i) in work_experience_list" :key="i">
          <ul class="item_list w-100 pb-5 pt-1">
            <li class="item1">
              <router-link :to="{path:`/editor_experience/${i}`,query:{code:2}}" class="cell_arrow_item">
                <div class="cell_txt">
                  <span class="f-left fs-3 fw-6 fc-dark">{{tmp.company}}</span>
                  <span class="f-right fs-3 fw-6 fc-dark">{{tmp.time}}</span>
                </div>
                <span class="cell_arrow f-right fm-1 fw-6 fc-gray iconfont icon-previewright"></span>
              </router-link>
            </li>
            <li>
              <a href="javascript:;" class="line_item">
                <span class="f-left fs-3 fw-6 fc-gray">{{tmp.post}}</span>
              </a>
            </li>
            <li>
              <a href="javascript:;" class="line_item">
                <span class="f-left fs-3 fw-6 fc-gray break-wrap">{{tmp.detail}}</span>
              </a>
            </li>
          </ul>
        </a>
      </div>
      <router-link :to="{path:'/editor_experience/-1',query:{code:2}}" class="add_btn w-100 bg-white">
        <span class="fw-6 fc-dark">添加工作经历</span>
      </router-link>
    </div>
    <!-- 教育经历 -->
    <div class="education_list w-100 mt-3 bg-white">
      <p class="fc-dark fw-6 fs-3 mb-2 mt-3">教育经历</p>
      <div class="education__container w-100">
        <p class="fs-3 w-100 fc-gray fw-6 mt-3 mb-5 text-center" v-if="education_list.length==0">-- 没有添加教育经历 --</p>
        <a href="javascript:;" class="education_item w-100 mt-2 mb-2" v-for="(tmp,i) in education_list" :key="i">
          <ul class="item_list w-100 pb-5 pt-3">
            <router-link :to="{path:`/editor_education/${i}`,query:{code:2}}" class="cell_arrow_item">
              <div class="cell_txt">
                <span class="f-left fs-3 fw-6 fc-dark">{{tmp.name}}</span>
                <span class="f-right fs-3 fw-6 fc-dark">{{tmp.time}}</span>
              </div>
              <span class="cell_arrow f-right fm-1 fw-6 fc-gray iconfont icon-previewright"></span>
            </router-link>
            <li>
              <a href="javascript:;" class="line_item">
                <span class="f-left fs-3 fw-6 fc-gray">{{tmp.major}}</span>
                <span class="f-right fs-3 fw-6 fc-gray">{{tmp.education}}</span>
              </a>
            </li>
            <li>
              <a href="javascript:;" class="line_item">
                <span class="f-left fs-3 fw-6 fc-gray">{{tmp.detail}}</span>
              </a>
            </li>
          </ul>
        </a>
      </div>
      <router-link :to="{path:`/editor_education/-1`,query:{code:2}}" class="add_btn w-100 bg-white">
        <span class="fw-6 fc-dark">添加教育经历</span>
      </router-link>
    </div>
  </div>
  <a href="javascript:;" class="release_btn bg-blue w-100 mt-5" @click="do_release()">
    <span class="fc-white fm-2 fw-6">保存</span>
  </a>

  <!-- //弹框 -->
  <div class="modal_frame_group w-100">
    <div class="modal_plate w-100" :class="pageInfo.modal_code?'modal_plate_show':'modal_plate_hid'" @click="cancel()"></div>
    <div class="modal_list w-100" :class="pageInfo.modal_code ?'modal_up' : 'modal_down'">
      <ul class="data_list bg-white w-100" :style="autoHeight">
        <li class="list_item w-100" v-if="pageInfo.modalDataList.length==0">
          <a href="javascript:;" class="item w-100">
            <span class="iconfont icon-loading fw-6 fm-1 loading_icon" :style="loading_circle" v-if="loading_show"></span>
            <span class="fc-blue fw-6 fm-1">数据加载中</span>
          </a>
        </li>
        <li class="list_item w-100" v-for="(tmp,i) in pageInfo.modalDataList" :key="i">
          <a href="javascript:;" class="item w-100" @click="select_value(i)">
            <span class="fc-blue fw-6 fm-1">{{tmp.value}}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>

  <!-- 加载信息提示框 -->
  <self-load-frame></self-load-frame>
  <div>
    <input type="file" id="files" v-show="false" @change="imports()">
  </div>
</div>
</template>
<script>
const LoadFrame = ()=>import("../sub/loading_frame");
export default {
  data() {
    return {
      pageInfo: {
        header_title: "发布简历",
        token: "",
        modalDataList: [],
        modal_code: false,
        select_num: null
      },
      loading_show: false,
      sexModelList: [{
          value: "男",
          code: 1
        },
        {
          value: "女",
          code: 2
        },
        {
          value: "保密",
          code: 3
        }
      ],

      //参数信息
      radio_code: null,
      check_code: false,
      resume_info: {
        logo: "http://static.sxtian.com/imgs/add-pic.png"
      },
      loading_circle: "",
      consignee: "", //姓名
      upload_file: "http://static.sxtian.com/imgs/add-pic.png", //上传图片
      sex: 3, //性别
      age: "", //年龄
      tel: "", //电话号码
      telStatus: 2, //电话状态
      infos: "",
      resumeType: "全职",
      resumeTags: "",
      resumeStatus: "在职已提交离职手续",
      addressId: null,
      w_province: 210000,
      w_city: 210100,
      w_area: 210102,
      salary: "5K~10K",
      company: [],
      school: [],
      //地址信息
      addr1_code: 0,
      addr2_code: 0,
      addr3_code: 0,
      addr_data: [],
      addr_show: false,
      addr_provice: [],
      addr_city: [],
      addr_area: [],
      prvoice_value: "",
      prvoice_id: null,
      city_value: "",
      city_id: null,
      area_value: "",
      area_id: null,
      lon: null,
      lat: null,
      params: {},
      isSvaeCode: true,
      newIdStr: '',
      dataList: [{
          title: "求职类型",
          value: "全职",
          label: []
        },
        {
          title: "期望行业",
          value: "请选择类别",
          url: "/demand_group/4"
        },
        {
          title: "求职状态",
          value: "在职已提交离职手续",
          label: []
        },
        // { title: "工作城市", value: "", url: "/user_addr/resume" },
        {
          title: "工作城市",
          value: "",
          url: "/new_map_group"
        },
        {
          title: "期望薪资",
          value: "5K~10K",
          label: []
        }
      ],
      work_experience_list: [],
      education_list: [],
      autoHeight: {
        height: true,
        overflow: true
      }
    };
  },

  created() {
    this.pageInfo.header_title = '编辑简历';
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 0
    });

    this.getPageInfo();
    this.copyAddr();
  },

  mounted() {

    //绑定上传图片事件
    $(function() {
      $("#import").click(function() {
        $("#files").click();
      });
    });

    //头部导航栏添加左边按钮事件
    $(".header_left")
      .attr("href", "javascript:;")
      .click(() => {
        this.exit_btn();
      });

    //设置高度
    var h = document.documentElement.clientHeight;
    $(".select_addr_container").css("height", `${h * 0.7}px`);
    $(".container_item").css("height", `${h * 0.7 - 44}px`);
    $(".release_resume_group").css("height", `${h * 0.93}px`);
  },

  updated() {
    //do something after updating vue instance
    this.autoSizeModel()
  },

  destroyed() {
    $(".header_left")
      .attr("href", "javascript:history.go(-1)")
      .unbind("click");
    $(".header_right").unbind("click");
    $(".header_right>span").html("");
    this.saveData();
  },

  methods: {
    autoSizeModel() { //底部模态框尺寸
      var len = this.pageInfo.modalDataList.length;
      if (len <= 4) {
        this.autoHeight.height = "auto";
        this.autoHeight.overflow = "hidden";
      } else {
        this.autoHeight.height = "13.5rem";
        this.autoHeight.overflow = "auto";
      }
    },

    getLobal() {
      var info = this.getCache('select_data', 2);
      if (!info) info = {};
      if (!info.data) info.data = {};
      if (info.data.data1) {
        var newData = info.data.data1;
        var idStr = '';
        var strStr = '';
        newData.map((val, i) => {
          if (val.id) {
            idStr += `${val.id},`;
            if (val.label) {
              strStr += `${val.label}/`;
            }
          }
        });
        var newIdStr = idStr.substr(0, idStr.length - 1);
        var newStrStr = strStr.substr(0, strStr.length - 1);
        this.resumeTags = newIdStr;
        this.dataList[1].value = newStrStr;
      } else {
        this.resumeTags = this.newIdStr;
      }
    },

    copyAddr() { //另存地址
      var info = this.getSelectData();
      if (info && info.select_addr) {
        var value = info.select_addr;
        this.setCache("resume_addr", JSON.stringify(value));
      } else {
        var info = this.getCache("location", 2);
        var value = {
          addr: info.address,
          point: {
            lng: info.lon,
            lat: info.lat
          }
        };
        this.setCache("resume_addr", JSON.stringify(value));
      }
      var infoAddr = this.getCache("resume_addr", 2);
      this.dataList[3].value = infoAddr.addr;
    },

    getLocation(data) { //获取缓存数据
      this.showData(data, () => {
        this.getLobal();
        this.selfMainLoadClosed();
      });
    },

    getPageInfo() {
      this.pageInfo.token = this.getToken();
      var token = this.pageInfo.token;
      var latlon = this.getCache("location", 2);
      this.lat = latlon.lat;
      this.lon = latlon.lon;
      this.getResumeInfo(0, "resumeType");
      this.getResumeInfo(4, "resumeMoney");
      this.getResumeInfo(2, "resumeState");
      var data = this.getCache('RESUME_DATA', 2);
      this.selfMainLoadOpend();
      if (data) {
        this.getLocation(data);
      } else {
        this.getRelease(); //获取已有简历
      }
    },

    getRelease() { //获取简历详情
      var url = 'Resume-infoMemberResume';
      var params = this.getQuery();
      var that = this;
      that.__initAction(url, params, (res, s) => {
        if (s == 1) {
          var data = res.data.dataList;
          var RESUME = JSON.stringify(data);
          this.setCache('RESUME_DATA', RESUME);
          that.showData(data, () => {
            this.getLobal();
            this.selfMainLoadClosed();
          });
        };
      });
    },

    showData(data, callback) { //显示数据
      var path = data.portrait;
      var newPath = path.split('.com')[1];
      this.upload_file = newPath;
      this.resume_info.logo = data.portrait; //头像
      this.consignee = data.consignee; //姓名
      this.age = data.age; //年龄
      this.sex = data.sex; //性别
      this.tel = data.tel; //电话
      this.infos = data.infos; //自我评价
      if (data.telStatus) {
        this.telStatus = data.telStatus; //电话公开
      }
      this.dataList[0].value = data.resumeType; //求职类型
      this.dataList[1].value = data.resumeIndustry; // 期望行业
      this.newIdStr = data.ResumeIndustryExt; //行业id
      this.dataList[2].value = data.resumeStatus; //求职状态
      this.dataList[3].value = data.addressInfo; //工作城市
      this.dataList[4].value = data.salary; //期望薪资
      //工作经验
      this.work_experience_list = [];
      data.company.map((val, i) => {
        var obj = {
          companyIndex: i,
          company: val.corporateName,
          time: `${val.startTime}至${val.andtTime}`,
          post: val.positionName,
          detail: val.content,
          industry: val.industry,
          positionType: val.positionType,
          job: val.job,
          type: val.type
        };
        this.work_experience_list.push(obj);
      })

      //教育经历
      this.education_list = [];
      data.school.map((val, i) => {
        var obj = {
          schoolIndex: i,
          name: val.schoolName,
          time: `${val.openTime}至${val.shutTime}`,
          major: val.major,
          education: val.education,
          detail: val.showContent,
        }
        this.education_list.push(obj);
      })
      callback();
    },

    saveData() { //保存页面数据
      var data = {};
      data.upload_file = this.upload_file;
      data.portrait = this.resume_info.logo; //头像
      data.consignee = this.consignee; //姓名
      data.age = this.age; //年龄
      data.sex = this.sex; //性别
      data.tel = this.tel; //电话
      data.telStatus = this.telStatus; //电话公开
      data.infos = this.infos; //自我评价
      data.resumeType = this.dataList[0].value; //求职类型
      data.resumeIndustry = this.dataList[1].value; // 期望行业
      data.ResumeIndustryExt = this.newIdStr; //行业id
      data.resumeStatus = this.dataList[2].value; //求职状态
      data.addressInfo = this.dataList[3].value; //工作城市
      data.salary = this.dataList[4].value; //期望薪资

      //工作经验
      var workList = this.work_experience_list;
      var workListArr = [];
      workList.map((val, i) => {
        var timeArr = val.time.split('至');
        var startTime = timeArr[0];
        var andtTime = timeArr[0];
        var obj = {
          companyIndex: i,
          corporateName: val.company,
          startTime: startTime,
          andtTime: andtTime,
          positionName: val.post,
          content: val.detail,
          industry: val.industry,
          positionType: val.positionType,
          type: val.type,
          job: val.job
        }
        workListArr.push(obj);
      });
      data.company = workListArr;

      //教育经历
      var educationList = this.education_list;
      var educationListArr = [];
      educationList.map((val, i) => {
        var timeArr = val.time.split('至');
        var openTime = timeArr[0];
        var shutTime = timeArr[0];
        var obj = {
          schoolIndex: i,
          openTime: openTime,
          shutTime: shutTime,
          major: val.major,
          education: val.education,
          showContent: val.detail,
          schoolName: val.name
        }
        educationListArr.push(obj);
      })
      data.school = educationListArr;
      var RESUME = JSON.stringify(data);
      this.setCache('RESUME_DATA', RESUME);
    },

    getResumeInfo(code, type) { //获取模态框数据
      var token = this.pageInfo.token;
      var url = "Tools-getConfigData";
      this.__initAction(url, {
        token
      }, (res, s) => {
        if (s == 1) {
          var data = res.data.getList;
          if (data[type].value && data[type].value.length > 0) {
            var list = data[type].value;
            for (let it of list) {
              var arr = {};
              arr.value = it;
              this.dataList[code].label.push(arr);
            }
          } else {
            this.dataList[code].label = [];
          }
        }
      });
    },

    select_radio(x) {
      this.radio_code = x;
    },

    clickHanlder(x) {
      var list = this.dataList;
      this.pageInfo.select_num = x;
      if (x != -1) {
        if (list[x].url) {
          this.$router.push(list[x].url);
        } else if (list[x].label) {
          this.pageInfo.modal_code = true;
          this.pageInfo.modalDataList = this.dataList[x].label;
        } else if (x == 3) {
          this.select_addr();
        }
      } else if (x == -1) {
        this.pageInfo.modal_code = true;
        this.pageInfo.modalDataList = this.sexModelList;
      }
    },

    cancel() {
      this.pageInfo.modal_code = false;
    },

    select_value(i) { //弹出框选择事件
      var j = this.pageInfo.select_num;
      if (j == -1) {
        this.sex = this.sexModelList[i].code;
      } else {
        this.dataList[j].value = this.dataList[j].label[i].value;
      }
      this.pageInfo.modal_code = false;
    },

    imports() { // 上传头像
      var that = this;
      var f = "";
      var url = this.Global.baseURL + "/Tools-uploadsFileBs64.jsp";
      var token = this.pageInfo.token;
      var selectedFile = document.getElementById("files").files[0]; //获取读取的File对象
      var name = selectedFile.name; //读取选中文件的文件名
      var sss = name.split(".")[1]; //获取格式后缀
      var size = selectedFile.size; //读取选中文件的大小
      var reader1 = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
      reader1.readAsDataURL(selectedFile); //读取文件的内容
      reader1.onload = function(e) {
        //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
        f = this.result;
        // that.resume_info.logo = f;
        that.__UploadImg(f, sss, data => {
          that.upload_file = data.dir; //BUG  变量有问题
          var str = `${that.Global.baseLink}${data.dir}`;
          that.resume_info.logo = str;
        });
      };
    },

    exit_btn() {
      setTimeout(() => {
        window.history.go(-1);
      }, 300);
    },

    do_release() { //发布事件
      var token = this.pageInfo.token;
      var consignee = this.consignee;
      var portrait = this.upload_file;
      var resumeType = this.resumeType;
      var resumeIndustry = this.resumeTags;
      var resumeStatus = this.resumeStatus;
      var sex = this.sex;
      var age = this.age;
      var tel = this.tel;
      var telStatus = this.telStatus;
      var w_province = this.w_province;
      var w_city = this.w_city;
      var w_area = this.w_area;
      var addr_list = this.addr_list;
      var salary = this.salary;
      var infos = this.infos;
      var company = this.work_experience_list;
      var school = this.education_list;
      var lon = this.lon;
      var lat = this.lat;
      //验证信息
      if (!consignee) {
        this.$dialog.toast({
          mes: "请填写您的姓名...",
          timeout: 1500
        });
        return;
      }

      if (!age) {
        this.$dialog.toast({
          mes: "请填写您的年龄...",
          timeout: 1500
        });
        return;
      }

      if (!portrait) {
        this.$dialog.toast({
          mes: "头像不能为空...",
          timeout: 1500
        });
        return;
      }

      var re = this.Global.reg_phone;
      if (!this.checkPhone(tel, re)) {
        return;
      }
      if (!infos) {
        this.$dialog.toast({
          mes: "请填写自我描述...",
          timeout: 1500
        });
        return;
      }

      if (!resumeType) {
        this.$dialog.toast({
          mes: "请填写您的求职类型...",
          timeout: 1500
        });
        return;
      }

      if (!resumeIndustry) {
        this.$dialog.toast({
          mes: "请填写您的期望行业...",
          timeout: 1500
        });
        return;
      }

      if (this.dataList[0].data == "请选择分类") {
        this.$dialog.toast({
          mes: "分类不能为空...",
          timeout: 1500
        });
        return;
      }

      if (!resumeStatus) {
        this.$dialog.toast({
          mes: "请填写您的求职状态...",
          timeout: 1500
        });
        return;
      }

      if (!addr_list) {
        this.$dialog.toast({
          mes: "请填写您的工作城市...",
          timeout: 1500
        });
        return;
      }

      if (!salary) {
        this.$dialog.toast({
          mes: "请填写您的薪资范围...",
          timeout: 1500
        });
        return;
      }

      if (company.length == 0) {
        this.$dialog.toast({
          mes: "请填写您的工作经历",
          timeout: 1500
        });
        return;
      }

      var list = [];

      for (let i of company) {
        var arr = {};
        arr.corporateName = i.company;
        arr.industry = i.industry;
        var time = i.time.split('至');
        var start = time[0];
        var end = time[1];
        arr.startTime = start;
        arr.andtTime = end;
        arr.positionName = i.post;
        arr.positionType = i.positionType;
        arr.content = i.detail;
        // list.push(arr.toString());
        list.push(JSON.stringify(arr));
      }
      // console.log(345, list);
      var company = list.toString();
      // var company = JSON.stringify(list);

      if (school.length == 0) {
        this.$dialog.toast({
          mes: "请填写您的教育经历",
          timeout: 1500
        });
        return;
      }
      var list = [];
      for (let i of school) {
        var arr = {};
        var time = i.time.split('至');
        var start = time[0];
        var end = time[1];
        arr.schoolName = i.name;
        arr.education = i.education;
        arr.major = i.major;
        arr.openTime = start;
        arr.shutTime = end;
        arr.showContent = i.detail;
        list.push(JSON.stringify(arr));
      }
      var school = list.toString();
      // var school = JSON.stringify(list);
      // console.log(school);
      var params = {
        token,
        portrait,
        consignee,
        sex,
        age,
        tel,
        telStatus,
        infos,
        resumeType,
        resumeIndustry,
        resumeStatus,
        salary,
        company,
        school,
        w_province,
        w_city,
        w_area,
        lon,
        lat
      };
      var url = "Resume-addMemberResumes";
      this.__initAction(url, params, (res, s) => {
        if (s == 1) {
          if (res.status == 1) {
            var info = this.getSelectData();
            info.resume = null;
            info.data = null;
            this.setCache("select_data", JSON.stringify(info));
            this.dataList[0].data = "请选择分类";
            this.isSvaeCode = false;
            this._msg(res.info);
            setTimeout(() => {
              this.$router.back();
            }, 200)
          } else {
            this._msg(res.info);
          }
        }
        if (res.info == "请认证后操作！") {
          this.funError(res.info);
        } else if (res.info == "请求错误,账号类型不匹配！") {
          this.funError(res.info);
        } else if (res.info == "请用个人或军人账号发布") {
          this.funError(res.info);
        }
      });
    },

    funError(info) {
      this.$dialog.toast({
        mes: info,
        timeout: 1500,
        icon: "error"
      });
    }
  },
  watch: {

    loading_code() {
      var x = 0;
      this.loading_show = this.pageInfo.modal_code;
      var timer = setInterval(() => {
        x += 360;
        this.loading_circle = `transform:rotate(${x}deg)`;
      }, 1000);
      if (!this.pageInfo.modal_code) {
        clearInterval(timer);
      }
    },

    resumeTypeValue(val, oldVal) { //监听求职类型
      this.resumeType = val;
    },

    resumeStatusValue(val, oldVal) {
      this.resumeStatus = val;
    },

    resumeSalaryValue(val, oldVal) {
      this.salary = val;
    },



    check_code() { //监听性别选择
      if (this.check_code) {
        this.telStatus = 1;
      } else {
        this.telStatus = 2;
      }
    },

    telStatus() {
      if (this.telStatus == 1) {
        this.check_code = true;
      } else if (this.telStatus == 2) {
        this.check_code = false;
      }
    }
  },
  computed: {
    loading_code() {
      return this.pageInfo.modal_code;
    },
    resumeTypeValue() {
      return this.dataList[0].value;
    },
    resumeStatusValue() {
      return this.dataList[2].value;
    },
    resumeSalaryValue() {
      return this.dataList[4].value;
    },
    addr_list() { //监听地址选择
      return this.dataList[3].value;
    },
    sex_value() {
      var sex = this.sex;
      if (!sex) {
        return "请选择";
      } else if (sex == 1) {
        return "男";
      } else if (sex == 2) {
        return "女";
      } else if (sex == 3) {
        return "保密";
      }
    },
  },
  components: {
    "self-load-frame": LoadFrame,
  }
};
</script>
<style lang="scss">
.loading_icon {
    transition: all 1s;
}
.loading_circle {
    transform: rotate(540deg);
}
.line_item .break-wrap {
    width: 100%;
    overflow-wrap: break-word;
}
</style>
