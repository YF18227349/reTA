<template>
<div class="resume_view w-100">
  <self-load-plate v-if="loading_status"></self-load-plate>
  <div class="resume_info w-100">
    <div class="resume_info_items">
      <div class="item1">
        <ul class="resume_title">
          <li class="resume_name fc-dark fw-6 fm-1">{{resumeInfoList.name}}</li>
          <li class="resume_post">
            <span class="post fc-gray fs-3 fw-5 mr-3" v-for="(item,i) in resumeInfoList.posts" :key="i">{{item}}</span>
          </li>
          <li class="resume_score">
            <span class="fs-3 fw-5 fc-dark">{{resumeInfoList.score}}信用分</span>

            <a href="javascript:;">
              <span class="fs-3 fw-5 fc-dark">[信用规则]</span>
            </a>
          </li>
          <li class="resume_count">
            <span class="fs-3 fw-5 fc-dark mr-3">活跃度</span>
            <span class="fs-3 fw-5 fc-dark">{{resumeInfoList.count}}</span>
          </li>
        </ul>
        <span class="item_logo">
          <img :src="resumeInfoList.logo" alt>
        </span>
      </div>
      <div class="item2">
        <ul class="item_detail">
          <li class="item2_title fs-3 fw-6 fc-dark">{{resumeInfoList.status}}</li>
          <li class="item2_list">
            <span class="item iconfont fs-3 fw-5 fc-dark" :class="it.icon" v-for="(it,i) in resumeInfoList.list" :key="i">&nbsp;{{it.txt}}</span>
          </li>
          <li class="item2_detail fs-3 fw-6 fc-gray">{{resumeInfoList.ability}}</li>
        </ul>
      </div>
      <div class="item3">
        <ul class="item3_list">
          <li class="item3_title p-r fs-3 fw-6 fc-dark">
            求职期望
            <span class="point p-a"></span>
          </li>
          <li class="item3_detail">
            <span class="item3_text fs-3 fc-dark fw-6">
              <span class="item3_job">{{resumeInfoList.job}}</span>
              <span class="item3_addr">{{resumeInfoList.addr}}</span>
            </span>
            <span class="item3_salary fc-red fw-6 fm-1">{{resumeInfoList.salary}}</span>
          </li>
          <li class="item3_industry fs-3 fc-dark fw-6">{{resumeInfoList.industry}}</li>
        </ul>
      </div>
      <div class="item4">
        <ul class="item4_list">
          <li class="item4_title p-r fs-3 fw-6 fc-dark">
            工作经历
            <span class="point p-a"></span>
          </li>
          <li class="w-100 text-center" v-if="!resumeInfoList.experience || resumeInfoList.experience.length==0">
            <p class="pt-2 pb-2 pl-4 pr-4 fc-dark fm-1 fc-gray fw-6">-- 没有填写工作经历 --</p>
          </li>
          <li class="item4_detail" v-for="(item,i) in resumeInfoList.experience" :key="i">
            <p class="experience_info">
              <span class="experience_title fs-3 fw-6 fc-dark">{{item.name}}</span>
              <span class="experience_time fs-3 fw-6 fc-gray">{{item.time}}</span>
            </p>
            <p class="experience_post fs-3 fc-dark fw-6">
              <span class="fs-3 fw-6 fc-gray">{{item.industry}}</span>
              <span class="fs-3 fw-6 fc-gray">{{item.post}}</span>
            </p>
            <p class="experience_txt fs-3 fc-gray fw-6">{{item.txt}}</p>
          </li>
        </ul>
      </div>
      <div class="item5">
        <ul class="education_list">
          <li class="education_title p-r fs-3 fw-6 fc-dark">
            教育经历
            <span class="point p-a"></span>
          </li>
          <li class="w-100 text-center" v-if="!resumeInfoList.education || resumeInfoList.education.length==0">
            <p class="pt-2 pb-2 pl-4 pr-4 fc-dark fm-1 fc-gray fw-6">-- 没有填写教育经历 --</p>
          </li>
          <li class="education_detail" v-for="(item,i) in resumeInfoList.education" :key="i">
            <p class="education_info">
              <span class="education_name fs-3 fc-dark fw-6">{{item.name}}</span>
              <span class="education_time fs-3 fc-gray fw-6">{{item.time}}</span>
            </p>
            <p class="education_text">
              <span class="education_degree fs-3 fc-gray fw-6">{{item.degree}}</span>
              <span class="education_major fs-3 fc-gray fw-6">{{item.major}}</span>
            </p>
            <p class="education_txt fs-3 fc-gray fw-6">{{item.txt}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<script>
const LoadPlate = ()=>import("../sub/load_data_plate");
export default {
  data() {
    return {
      pageInfo: {
        header_title: "简历预览"
      },
      loading_status: false,
      resumeInfoList: {
        name: "",
        logo: "",
        posts: [],
        score: "",
        count: 45,
        status: "随时到岗",
        list: [{
            icon: "icon-book1",
            txt: ""
          },
          {
            icon: "icon-jianzhi",
            txt: ""
          }
        ],
        // ability: "文案策划能手，熟练掌握创意方法，并在广告公司实习过，熟悉新媒体运营",
        ability: "",
        // job: "新媒体运营",
        job: "",
        salary: "",
        // addr: "西安",
        addr: "",
        // industry: "行业不限",
        industry: "",
        experience: [
          // {
          //   name: "小信电子商务有限公司",
          //   time: "2017.12-至今",
          //   post: "新媒体运营",
          //   txt:
          //     "因为有当兵的经历，所以具有独立分析的能力。习惯将编程规范化，标准化;有较强的事业心及责任感"
          // },
          // {
          //   name: "高薪电子商务有限公司",
          //   time: "2018.12-2019.01",
          //   post: "新媒体运营",
          //   txt:
          //     "因为有当兵的经历，所以具有独立分析的能力。习惯将编程规范化，标准化;有较强的事业心及责任感"
          // }
        ],
        education: [
          // {
          //   name: "陕西工业大学",
          //   time: "2010.9-2015.6",
          //   degree: "大专",
          //   major: "新媒体运营"
          // },
          // {
          //   name: "西安中学",
          //   time: "2008.9-2010.6",
          //   degree: "高中",
          //   major: ""
          // }
        ]
      }
    };
  },
  created() {
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 1
    });
    this.getPageInfo();
  },
  methods: {
    getPageInfo() {
      // this.selfMainLoadOpend();
      var token = this.getToken();
      var id = this.getUserInfo().uid;
      var url = 'Resume-listMemberResume';

      // var params = this.getQuery()
      // if (params.token) return;
      //获得简历详情
      var info = this.getSelectData();
      if (info) {
        if (!info.resume) return;
        if (!info.resume.infos) return;
        if (!info.data) return;
        var data1 = info.resume.infos;
        var data2 = info.resume;
        var value = this.resumeInfoList;
        value.name = data1.name;
        value.logo = data1.user_logo;

        if (info.data) {
          var list = info.data.data1;
          for (let it of list) {
            value.posts.push(it.label);
          }

          value.job = info.data.data1[2].label;
        };
        value.ability = data1.infos;
        value.salary = data2.salary;


        var work_experience = data2.work_experience;
        if (work_experience && work_experience.length > 0) {
          for (let it of work_experience) {
            var arr = {};
            arr.name = it[0].value;
            arr.time = it[2].value + " 至 " + it[3].value;
            arr.post = it[4].value;
            arr.industry = it[5].value;
            arr.txt = it[6].value;
            this.resumeInfoList.experience.push(arr);
          }
        }

        var education_list = data2.education_list;
        if (education_list && education_list.length > 0) {
          for (let it of education_list) {
            var arr = {};
            arr.name = it[0].value;
            arr.degree = it[1].value;
            arr.major = it[2].value;
            arr.time = it[3].value + " 至 " + it[4].value;
            arr.txt = it[5].value;
            this.resumeInfoList.education.push(arr);
          }
        }

        //获得用户学历
        var txtList = education_list[0];
        if (txtList) {
          for (let it of txtList) {
            if (it) {
              if (it.title == '学历') {
                this.resumeInfoList.list[0].txt = it.value;
              }
            }
          }
        };

        //获得工作年限
        var listDate = work_experience;
        if (listDate) {
          var Arr1 = []; //便利多维数据获得所有的时间，放进同一个数组中
          var Arr2 = [];
          for (let keys in listDate) {
            for (let key in listDate[keys]) {
              if (listDate[keys][key].title.indexOf("时间") >= 0) {
                Arr1.push(listDate[keys][key].value);
              };
            };
          };
          for (let i in Arr1) {
            let info = Date.parse(Arr1[i].replace(/-/g, "/"));
            Arr2.push(info);
          }
          Arr2.sort((a, b) => {
            return a - b;
          })
          var max, min, maxY, minY, maxM, minM, endYear, endMonth;
          max = new Date(Arr2[Arr2.length - 1]);
          min = new Date(Arr2[0]);
          maxY = max.getFullYear();
          minY = min.getFullYear();
          maxM = max.getMonth() + 1;
          minM = min.getMonth() + 1;
          endYear = maxY - minY;
          endMonth = maxM - minM;
          this.resumeInfoList.list[1].txt = `${endYear}年 ${endMonth == 0? "":`${endMonth}月`}`;
        }
      }
      this.selfMainLoadClosed();
    },

    getResumeInfo() {}
  },
  components: {
    "self-load-plate": LoadPlate
  }
};
</script>
<style lang="scss">
</style>
