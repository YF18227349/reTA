<template>
<div class="interview_chat w-100">
  <header class="chat_header w-100">
    <a href="javascript:history.go(-1)" class="arrow-logo iconfont icon-previewleft"></a>
    <span class="header-title">{{page_title}}</span>
    <a class="phone-logo iconfont icon-xingzhuang"></a>
  </header>
  <div class="clear-interview-chat-fixed"></div>
  <div class="content">
    <router-view></router-view>
  </div>
  <div class="info-items" v-if="pid==10">
    <ul class="info-item bg-white" v-for="(item,i) in interviewerList" :key="i">
      <li class="item1">
        <span>{{item.title}}</span>
        <span>{{item.salary}}</span>
      </li>
      <li class="item2">
        <span>{{item.name}}</span>
      </li>
      <li class="item3">
        <span>{{item.addr}}</span>
        <span>{{item.experience}}</span>
        <span>{{item.education}}</span>
      </li>
      <li class="item4">
        <a href="javascript:;">发简历</a>
        <a href="javascript:;">不感兴趣</a>
      </li>
    </ul>
  </div>
  <div class="info-items" v-if="pid==11">
    <ul class="info-item bg-white" v-for="(item,i) in interviewList" :key="i">
      <li class="item1">
        <span>{{item.title}}</span>
        <span>{{item.salary}}</span>
      </li>
      <li class="item2">
        <span>{{item.name}}</span>
      </li>
      <li class="item3">
        <span>{{item.addr}}</span>
        <span>{{item.experience}}</span>
        <span>{{item.education}}</span>
      </li>
      <li class="item4">
        <a href="javascript:;">约面试</a>
        <a href="javascript:;">不感兴趣</a>
      </li>
    </ul>
  </div>
  <footer class="interview_chat_footer w-100">
    <span class="iconfont icon-wifi"></span>
    <input type="text">
    <span class="iconfont icon-children"></span>
    <span class="iconfont icon-jiahao1"></span>
  </footer>
</div>
</template>

<script>
export default {
  data() {
    return {
      pageInfo: {},
      pid: null,
      page_title: null,
      interviewerList: [{
          title: "UI设计师",
          salary: "5K-10K",
          name: "陕西XXX网络科技公司",
          addr: "西安市 未央区 运动公园",
          education: "大专",
          experience: "1-3年"
        },
        {
          title: "前端开发",
          salary: "5K-10K",
          name: "陕西XXX网络科技公司",
          addr: "西安市 未央区 运动公园",
          education: "大专",
          experience: "1-3年"
        }
      ],
      interviewList: [{
          title: "UI设计师",
          salary: "5K-10K",
          name: "陕西XXX网络科技公司",
          addr: "西安市 未央区 运动公园",
          education: "大专",
          experience: "1-3年"
        },
        {
          title: "前端开发",
          salary: "5K-10K",
          name: "陕西XXX网络科技公司",
          addr: "西安市 未央区 运动公园",
          education: "大专",
          experience: "1-3年"
        }
      ]
    };
  },
  created() {
    this.get_pageInfo();
  },
  methods: {
    get_pageInfo() {
      this.pageInfo = this.getParams();
      this.pid = this.pageInfo.pid;
      if (this.pageInfo.pid == 10) {
        this.page_title = "面试者";
      } else if (this.pageInfo.pid == 11) {
        this.page_title = "应聘者";
      } else if (this.pageInfo.pid == 0) {
        this.page_title = "张先生";
        this.$router.push("/robconfirmmodel/" + this.pageInfo.sid);
      }
    }
  }
};
</script>

<style lang="scss">
</style>
