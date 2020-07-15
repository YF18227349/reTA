<template>
<div class="editor_education w-100">
  <!-- <header class="editor_education_header bg-gray w-100">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
      <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
      <a href="javascript:;" class="last">
        <span class="fw-5 fc-fark fs-3">删除</span>
      </a>
    </header>-->
  <!-- <div class="clear-fixed"></div> -->
  <div class="editor_education_group w-100">
    <ul class="editor_education_list bg-white w-100">
      <li>
        <a href="javascript:;" class="line_input_item">
          <span class="fs-3 fw-6 fc-dark">所在学校</span>
          <input type="text" v-model="dataList[0].value" class="line_input fs-3 fw-6 fc-dark" placeholder="请填写学校名称">
        </a>
      </li>
      <li>
        <a href="javascript:;" class="line_input_item">
          <span class="fs-3 fw-6 fc-dark">最高学历</span>
          <input type="text" v-model="dataList[1].value" class="line_input fs-3 fw-6 fc-dark" placeholder="请填写学历">
        </a>
      </li>
      <li>
        <a href="javascript:;" class="line_input_item">
          <span class="fs-3 fw-6 fc-dark">所学专业</span>
          <input type="text" v-model="dataList[2].value" class="line_input fs-3 fw-6 fc-dark" placeholder="请填写专业">
        </a>
      </li>
      <li>
        <a href="javascript:;" class="cell_arrow_item">
          <div class="cell_txt">
            <span class="f-left fs-3 fw-6 fc-dark">开始时间</span>
            <span class="f-right">
              <yd-datetime class="fc-dark fs-3 fw-6" type="date" v-model="dataList[3].value"></yd-datetime>
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
              <yd-datetime class="fc-dark fs-3 fw-6" type="date" v-model="dataList[4].value"></yd-datetime>
            </span>
          </div>
          <span class="cell_arrow f-right fm-1 fw-6 fc-gray iconfont icon-previewright"></span>
        </a>
      </li>
      <li class="item_infos">
        <p class="fc-fark fs-3 fw-6 mb-2">学习经历</p>
        <yd-textarea v-model="dataList[5].value" class="fs-3 fw-6 fc-dark" placeholder="请输入:" maxlength="100"></yd-textarea>
      </li>
    </ul>
    <a href="javascript:;" class="submitBtn btn-c w-100 bg-blue" @click="do_save()" v-if="pageInfo.code == -1">
      <span class="fc-white fm-2 fw-7">保存</span>
    </a>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "编辑教育经历",
        code: null
      },
      dataList: [{
          title: "学校",
          value: ""
        },
        {
          title: "学历",
          value: ""
        },
        {
          title: "专业",
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
          title: "学习经历",
          value: ""
        }
      ]
    };
  },
  mounted() {
    if (this.getParams().code != -1) {
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
          var data_list = info.resume.education_list[code];
          this.dataList = data_list;
        }
      } else if (type == 2) {
        if (code != -1) {
          var data = this.getCache('RESUME_DATA', 2);
          var school = data.school;
          for (var key in school) {
            if (key == code) {
              var val = school[key];
              this.dataList[0].value = val.schoolName;
              this.dataList[1].value = val.education;
              this.dataList[2].value = val.major;
              this.dataList[3].value = val.openTime.trim();
              this.dataList[4].value = val.shutTime.trim();
              this.dataList[5].value = val.showContent;
            }
          }
        }
      }
    },
    do_delete() {
      var code = this.getParams().code;
      var type = this.getQuery().code;
      if (type == 1) {
        var list = this.dataList;
        // for (let it of list) {
        //   it.value = "";
        // }
        var info = this.getSelectData();
        if (info.resume.education_list && info.resume.education_list.length > 0) {
          info.resume.education_list.splice(code, 1);
        }
        this.setCache("select_data", JSON.stringify(info));
        setTimeout(() => {
          window.history.go(-1);
        }, 200);
      } else if (type == 2) {
        if (code != -1) {
          var list = this.dataList;
          var code = this.getParams().code;
          // for (let it of list) {
          //   it.value = "";
          // };
          var data = this.getCache('RESUME_DATA', 2);
          data.school.splice(code, 1);
          this.setCache("RESUME_DATA", JSON.stringify(data));
          setTimeout(() => {
            window.history.go(-1);
          }, 200);
        }
      }

    },
    do_save() {
      var type = this.getQuery().code;
      var code = this.getParams().code;
      if (type == 1) {
        var collage_name = this.dataList[0].value;
        var education_name = this.dataList[1].value;
        var major_name = this.dataList[2].value;
        var start_time = this.dataList[3].value;
        var end_time = this.dataList[4].value;
        var infos = this.dataList[5].value;
        if (!collage_name) {
          this.$dialog.toast({
            mes: "请填写所在学校名称",
            timeout: 1500
          });
          return;
        }
        if (!education_name) {
          this.$dialog.toast({
            mes: "请填写学历",
            timeout: 1500
          });
          return;
        }
        if (!major_name) {
          this.$dialog.toast({
            mes: "请填写专业名称",
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
        if (!infos) {
          this.$dialog.toast({
            mes: "请填写学习经历",
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
        if (!info.resume.education_list) {
          info.resume.education_list = [];
        }
        info.resume.education_list.push(list);
        var select_data = JSON.stringify(info);
        // console.log(info);
        this.setCache("select_data", select_data);
        setTimeout(() => {
          window.history.go(-1);
        }, 200);
      } else if (type == 2) {
        if (code == -1) {
          var schoolName = this.dataList[0].value;
          var education = this.dataList[1].value;
          var major = this.dataList[2].value;
          var openTime = this.dataList[3].value;
          var shutTime = this.dataList[4].value;
          var showContent = this.dataList[5].value;
          if (!schoolName) {
            this.$dialog.toast({
              mes: "请填写所在学校名称",
              timeout: 1500
            });
            return;
          }
          if (!education) {
            this.$dialog.toast({
              mes: "请填写学历",
              timeout: 1500
            });
            return;
          }
          if (!major) {
            this.$dialog.toast({
              mes: "请填写专业名称",
              timeout: 1500
            });
            return;
          }
          if (!openTime) {
            this.$dialog.toast({
              mes: "请填写开始时间",
              timeout: 1500
            });
            return;
          }
          if (!shutTime) {
            this.$dialog.toast({
              mes: "请填写结束时间",
              timeout: 1500
            });
            return;
          }
          if (!showContent) {
            this.$dialog.toast({
              mes: "请填写学习经历",
              timeout: 1500
            });
            return;
          }
          var obj = {
            schoolName,
            education,
            major,
            openTime,
            shutTime,
            showContent
          };
          var data = this.getCache('RESUME_DATA', 2);
          data.school.push(obj);
          this.setCache('RESUME_DATA', JSON.stringify(data));
          setTimeout(() => {
            window.history.go(-1);
          }, 200);
        }
      }
    }
  },
  destroyed() {
    $(".header_right>span").html("");
    $(".header_right").unbind("click");
  }
};
</script>
<style lang="scss">
</style>
