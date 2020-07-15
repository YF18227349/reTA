<template>
<div class="editor_experience w-100">
  <!-- <header class="editor_experience_header bg-gray w-100">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
      <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
      <a href="javascript:;" class="last">
        <span class="fw-5 fc-fark fs-3">删除</span>
      </a>
    </header>-->
  <!-- <div class="clear-fixed"></div> -->
  <div class="editor_experience_group w-100">
    <ul class="editor_experience_list bg-white w-100">
      <li class="w-100">
        <a href="javascript:;" class="line_input_item">
          <span class="fs-3 fw-6 fc-dark">所在公司</span>
          <input type="text" v-model="dataList[0].value" class="line_input fs-3 fw-6 fc-dark" placeholder="请填写公司名称">
        </a>
      </li>
      <li>
        <a href="javascript:;" class="line_input_item">
          <span class="fs-3 fw-6 fc-dark">所在行业</span>
          <input type="text" v-model="dataList[1].value" class="line_input fs-3 fw-6 fc-dark" placeholder="请填写行业名称">
        </a>
      </li>
      <li>
        <a href="javascript:;" class="cell_arrow_item">
          <div class="cell_txt">
            <span class="f-left fs-3 fw-6 fc-dark">开始时间</span>
            <span class="f-right">
              <yd-datetime class="fc-dark fs-3 fw-6" type="date" v-model="dataList[2].value"></yd-datetime>
            </span>
          </div>
          <span class="cell_arrow f-right fm-1 fw-6 fc-gray iconfont icon-previewright"></span>
        </a>
      </li>
      <li>
        <a href="javascript:;" class="cell_arrow_item">
          <div class="cell_txt">
            <span class="f-left fs-3 fw-6 fc-dark">结束时间</span>
            <span class="f-right">
              <yd-datetime class="fc-dark fs-3 fw-6" type="date" v-model="dataList[3].value"></yd-datetime>
            </span>
          </div>
          <span class="cell_arrow f-right fm-1 fw-6 fc-gray iconfont icon-previewright"></span>
        </a>
      </li>
      <li>
        <a href="javascript:;" class="line_input_item">
          <span class="fs-3 fw-6 fc-dark">职位类型</span>
          <input type="text" v-model="dataList[4].value" class="line_input fs-3 fw-6 fc-dark" placeholder="请填写职位类型">
        </a>
      </li>
      <li>
        <a href="javascript:;" class="line_input_item">
          <span class="fs-3 fw-6 fc-dark">职位名称</span>
          <input type="text" v-model="dataList[5].value" class="line_input fs-3 fw-6 fc-dark" placeholder="请填写职位名称">
        </a>
        <!-- <a href="javascript:;" class="cell_arrow_item">
            <div class="cell_txt">
              <span class="f-left fs-3 fw-6 fc-dark">职位名称</span>
              <span class="f-right fs-3 fw-6 fc-dark">{{post_name}}</span>
            </div>
            <span class="f-right fm-1 fw-6 fc-gray iconfont icon-previewright"></span>
          </a>-->
      </li>
      <li class="item_infos">
        <p class="fc-fark fs-3 fw-6 mb-2">工作内容</p>
        <yd-textarea v-model="dataList[6].value" class="fs-3 fw-6 fc-dark" placeholder="请输入:" maxlength="100"></yd-textarea>
      </li>
    </ul>
    <a href="javascript:;" class="submitBtn btn-c w-100 bg-blue" @click="do_save()" v-if="pageInfo.code == -1">
      <span class="fc-white fm-2 fw-6">保存</span>
    </a>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "编辑工作经历",
        code: null
      },
      dataList: [{
          title: "公司名称",
          value: ""
        },
        {
          title: "行业名称",
          value: ""
        },
        {
          title: "开始时间",
          value: ""
        },
        {
          title: "结束时间",
          value: ""
        },
        {
          title: "职位名称",
          value: ""
        },
        {
          title: "职位类型",
          value: ""
        },
        {
          title: "工作描述",
          value: ""
        }
      ]
    };
  },

  mounted() {
    var type = this.getParams().code;
    if (type != -1) {
      $(".header_right>span")
        .html("删除")
        .addClass("fw-6")
        .css("fontSize", "16px");
      $(".header_right").click(() => {
        this.do_delete();
      });
    }
  },
  created() {
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 0
    });
    this.pageInfo.code = this.getParams().code;
    this.getPageInfo();
  },
  methods: {
    getPageInfo() {
      var code = this.getParams().code;
      var type = this.getQuery().code;
      var info = this.getSelectData();
      if (type == 1) {
        if (code != -1) {
          var data_list = info.resume.work_experience[code];
          this.dataList = data_list;
        }
      } else if (type == 2) {
        if (code != -1) {
          var data = this.getCache('RESUME_DATA', 2);
          var company = data.company;
          for (var key in company) {
            if (key == code) {
              var val = company[key];
              this.dataList[0].value = val.corporateName;
              this.dataList[1].value = val.job;
              var startTime = val.startTime.trim();
              this.dataList[2].value = startTime
              var endTime = val.andtTime.trim();
              this.dataList[3].value = endTime
              this.dataList[4].value = val.positionName;
              this.dataList[5].value = val.type;
              this.dataList[6].value = val.content;
            };
          }
        }
      }
    },
    do_delete() {
      var code = this.getParams().code;
      var type = this.getQuery().code;
      if (type == 1) {
        var list = this.dataList;
        var code = this.getParams().code;
        // for (let it of list) {
        //   it.value = "";
        // }
        var info = this.getSelectData();
        if (
          info.resume.work_experience &&
          info.resume.work_experience.length > 0
        ) {
          info.resume.work_experience.splice(code, 1);
        }
        this.setCache("select_data", JSON.stringify(info));
        setTimeout(() => {
          window.history.go(-1);
        }, 300);
      } else if (type == 2) {
        if (code != -1) {
          var list = this.dataList;
          var code = this.getParams().code;
          // for (let it of list) {
          //   it.value = "";
          // };
          var data = this.getCache('RESUME_DATA', 2);
          data.company.splice(code, 1);
          this.setCache("RESUME_DATA", JSON.stringify(data));
          setTimeout(() => {
            window.history.go(-1);
          }, 300);
        }
      }
    },

    do_save() {
      var type = this.getQuery().code;
      var code = this.getParams().code;
      if (type == 1) {
        var company_name = this.dataList[0].value;
        var industry_name = this.dataList[1].value;
        var start_time = this.dataList[2].value;
        var end_time = this.dataList[3].value;
        var post_name = this.dataList[4].value;
        var post_type = this.dataList[5].value;
        var infos = this.dataList[6].value;
        if (!company_name) {
          this.$dialog.toast({
            mes: "请填写所在公司名称",
            timeout: 1500
          });
          return;
        }
        if (!industry_name) {
          this.$dialog.toast({
            mes: "请填写所在行业名称",
            timeout: 1500
          });
          return;
        }
        if (!start_time) {
          this.$dialog.toast({
            mes: "请填写开始时间",
            timeout: 1500
          });
          return;
        }
        if (!end_time) {
          this.$dialog.toast({
            mes: "请填写结束时间",
            timeout: 1500
          });
          return;
        }
        if (!post_name) {
          this.$dialog.toast({
            mes: "请填写职位名称",
            timeout: 1500
          });
          return;
        }
        if (!post_type) {
          this.$dialog.toast({
            mes: "请填写职位类型",
            timeout: 1500
          });
          return;
        }
        if (!infos) {
          this.$dialog.toast({
            mes: "请填写工作描述",
            timeout: 1500
          });
          return;
        }

        var list = this.dataList;
        var info = this.getSelectData();
        if (!info) {
          info = {};
        }
        if (!info.resume) {
          info.resume = {};
        }
        if (!info.resume.work_experience) {
          info.resume.work_experience = [];
        }
        info.resume.work_experience.push(list);
        var select_data = JSON.stringify(info);
        // console.log(info);
        this.setCache("select_data", select_data);
        setTimeout(() => {
          window.history.go(-1);
        }, 300);
      } else if (type == 2) {
        if (code == -1) {
          var corporateName = this.dataList[0].value;
          var job = this.dataList[1].value;
          var startTime = this.dataList[2].value;
          var andtTime = this.dataList[3].value;
          var positionName = this.dataList[4].value;
          var type = this.dataList[5].value;
          var content = this.dataList[6].value;
          if (!corporateName) {
            this.$dialog.toast({
              mes: "请填写所在公司名称",
              timeout: 1500
            });
            return;
          }
          if (!job) {
            this.$dialog.toast({
              mes: "请填写所在行业名称",
              timeout: 1500
            });
            return;
          }
          if (!startTime) {
            this.$dialog.toast({
              mes: "请填写开始时间",
              timeout: 1500
            });
            return;
          }
          if (!andtTime) {
            this.$dialog.toast({
              mes: "请填写结束时间",
              timeout: 1500
            });
            return;
          }
          if (!positionName) {
            this.$dialog.toast({
              mes: "请填写职位名称",
              timeout: 1500
            });
            return;
          }
          if (!type) {
            this.$dialog.toast({
              mes: "请填写职位类型",
              timeout: 1500
            });
            return;
          }
          if (!content) {
            this.$dialog.toast({
              mes: "请填写工作描述",
              timeout: 1500
            });
            return;
          }
          var obj = {
            corporateName,
            job,
            startTime,
            andtTime,
            positionName,
            type,
            content
          }
          var data = this.getCache('RESUME_DATA', 2);
          data.company.push(obj);
          this.setCache('RESUME_DATA', JSON.stringify(data));
          setTimeout(() => {
            window.history.go(-1);
          }, 200);
        }
      }
    },

  },
  watch: {
    // startTime(val, oldVal) {
    //   this.dataList[2].value = val;
    // },
    // endTime(val, oldVal) {
    //   this.dataList[3].value = val;
    // }
  },
  destroyed() {
    $(".header_right>span").html("");
    $(".header_right").unbind("click");
  }
};
</script>
<style lang="scss">
</style>
