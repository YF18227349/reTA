<template>
  <div class="detail w-100">
    <div class="detail_header_group w-100">
      <header class="detail_header bg-gray w-100">
        <a
          href="javascript:history.go(-1)"
          class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"
        ></a>
        <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
        <a href="javascript:;" class="last">
          <span class="iconfont icon-3 fc-dark fm-1 fw-5"></span>
        </a>
      </header>
      <!-- <div class="clear-fixed"></div> -->
      <div class="toast_btn_group w-100">
        <a class="btn-1" @click.prevent="do_show(0)">
          <span>智能筛选</span>
          <span class="iconfont icon-arrowdown"></span>
        </a>

        <a class="btn-2" @click.prevent="do_show(1)">
          <span>发布时间</span>
          <span class="iconfont icon-arrowdown"></span>
        </a>
        <a class="btn-3" @click.prevent="do_show(2)">
          <span>热度</span>
          <span class="iconfont icon-arrowdown"></span>
        </a>
      </div>
      <yd-actionsheet :items="toastItems" v-model="show" cancel="取消" masker-opacity="0.1"></yd-actionsheet>
    </div>
    <div class="clear_detail_fixed mb-2"></div>
    <div class="card_list w-100 bg-white">
      <router-link :to="'/servicedetail/'+pid+'/'+sid" class="cards w-100">
        <div class="card_logo">
          <img src="/static/imgs/main/user_logo.png" alt>
        </div>
        <ul class="card_info">
          <li class="card_title">
            <h3>小学习题卷该对错180薪</h3>
          </li>
          <li class="card_detail">
            <div class="detail1">
              <span>无聊的大螃蟹</span>
              <span class="iconfont icon-renzheng card_icon"></span>
            </div>
            <div class="detail2">
              <span>￥180</span>
              <span>/天</span>
            </div>
          </li>
          <li class="card_text">负责批改教育机构假期学生考试作业以及教材资料，工作内容：评阅小学1-6年级数学语文卷子，提供答案，评阅，评分，改对错！</li>
          <li class="card_img">
            <img src="/static/imgs/main/service_img_01.png" alt>
            <img src="/static/imgs/main/service_img_02.png" alt>
            <img src="/static/imgs/main/service_img_03.png" alt>
          </li>
          <li class="card_mark">
            <div class="w-25">
              <yd-icon name="discover"></yd-icon>
              <span></span>
            </div>
            <div class="w-25">
              <span></span>
              <span></span>
            </div>
            <div class="w-50">
              <span>2018-08-11</span>
            </div>
          </li>
        </ul>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "家政服务"
      },
      pid: null,
      sid: 1,
      isTabbarShow: false,
      show: false,
      showInfoList: [
        [
          { label: "热招岗位", mes: "咔擦，此人太帅" },
          { label: "高薪资", mes: "咔擦，此人太帅" },
          { label: "高福利", mes: "咔擦，此人太帅" }
        ],
        [
          { label: "一周内", mes: "咔擦，此人太帅" },
          { label: "二周内", mes: "咔擦，此人太帅" },
          { label: "三周内", mes: "咔擦，此人太帅" }
        ],
        [
          { label: "热", mes: "咔擦，此人太帅" },
          { label: "很热", mes: "咔擦，此人太帅" },
          { label: "好热", mes: "咔擦，此人太帅" }
        ]
      ],
      showInfo: [],
      toastItems: []
    };
  },
  created() {
    this.get_pid();
  },
  methods: {
    get_pid() {
      this.pid = this.getParams().pid;
      console.log(this.pid);
    },
    do_show(x) {
      this.show = true;
      this.showInfo = this.showInfoList[x];
      this.toastItems = [
        {
          label: this.showInfo[0].label,
          callback: () => {
            this.$dialog.toast({ mes: "咔擦，此人太帅！" });
            /* 注意： callback: function() {} 和 callback() {}  这样是无法正常使用当前this的 */
          }
        },
        {
          label: this.showInfo[1].label,
          callback: () => {
            this.$dialog.toast({ mes: "看到了不该看到的东西！" });
          }
        },
        {
          label: this.showInfo[2].label,
          callback: () => {
            this.$dialog.toast({ mes: "看到了不该看到的东西！" });
          }
        }
      ];
    }
  }
};
</script>

<style lang="scss">
.yd-back-icon:before,
.yd-next-icon:before {
  font-size: 17px;
  margin: 10px;
}

.detail .yd-actionsheet {
  width: 350px;
  left: 50%;
  margin-left: -175px;
  border-radius: 5px;
  overflow: hidden;
  background: none;
  z-index: 10000;
  a {
    width: 100%;
    height: 43px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #007aff;
    font-size: 17px;
  }
  :nth-child(3) {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  :last-child {
    margin: 10px 0 20px 0;
    border-radius: 5px;
    font-weight: 600;
  }
}
</style>
