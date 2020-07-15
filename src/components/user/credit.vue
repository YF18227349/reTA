<template>
<div class="credit w-100">
  <header class="credit_header bg-gray w-100 fc-dark">
    <a href="javascript:history.go(-1)" class="arrow-logo fc-dark iconfont icon-previewleft"></a>
    <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
    <a href="javascript:;" class="last"></a>
  </header>
  <!-- <div class="clear-fixed"></div> -->
  <div class="credit_group w-100">
    <div class="credit_bg w-100 shadow-dark p-r bg-white">
      <img :src="pageInfo.logo" alt class="credit_bg_img">
      <div class="credit_bg_tabbar bg-blue">
        <div class="tabbar_tab" v-for="(tmp,i) in pageInfo.tabbarList" :key="i" @click="tabbar_code = i">
          <span class="tab" :class="tabbar_code==i ?'bg-white fc-blue':'fc-white'">{{tmp.title}}</span>
        </div>
      </div>
      <div class="credit_info_card p-a">
        <div class="card_title">
          <div class="card_logo">
            <img :src="cardInfo.logo" alt>
          </div>
          <div class="card_detail">
            <span class="card_name">{{cardInfo.name}}</span>
            <yd-rate size="1rem" class="card_score" slot="left" v-model="cardInfo.score" :show-text="tipText" color="#ff9c00" active-color="#ff9c00" readonly></yd-rate>
          </div>
          <div class="card_evaluate">
            <span class="card_type" :class="cardInfo.type[cardInfo.score-1].class">{{cardInfo.type[cardInfo.score-1].title}}</span>
          </div>
        </div>
        <ul class="card_info">
          <li class="card_info_detail" v-for="(item,i) in cardInfo.detail" :key="i">
            <span clss="detail_count">{{item.count}}</span>
            <span class="detail_title fc-blue">{{item.title}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="credit_list w-100">
      <a href="javascript:;" class="list_item bg-white w-100" v-for="(tmp,i) in cardInfo.list" :key="i">
        <yd-cell-group class="items w-100">
          <yd-cell-item class="item w-100">
            <img slot="icon" :src="tmp.avatar" class="item_logo">
            <div slot="left" class="item_detail">
              <span class="item_name fc-dark fw-5">{{tmp.nickName}}</span>
              <span class="item_time fc-gray">{{tmp.time}}</span>
            </div>
            <yd-rate size="1rem" class="item_score" slot="right" v-model="tmp.star" color="#ff9c00" active-color="#ff9c00" readonly></yd-rate>
          </yd-cell-item>
          <yd-cell-item class="item">
            <span slot="left" class="item_txt">{{tmp.comment}}</span>
          </yd-cell-item>
        </yd-cell-group>
      </a>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      tabbar_code: 0,
      tipText: [
        '<span style="color:red;">$ 分</span>',
        '<span style="color:blue;">$ 分 </span>',
        '<span style="color:green;">$ 分 </span>',
        '<span style="color:black;">$ 分 </span>',
        '<span style="color:chartreuse;">$ 分 </span>'
      ],
      pageInfo: {
        header_title: "我的信用",
        logo: "./static/imgs/xinyong/xy_bg_logo.png",
        card_logo: "./static/imgs/xinyong/xy_card_logo.png",
        tabbarList: [{
          title: "对我的评价"
        }, {
          title: "对他人评价"
        }]
      },
      cardInfo: {
        logo: "./static/imgs/main/user_logo.png",
        name: "王小姐",
        score: 2,
        type: [{
            title: "信用很差",
            class: "bg-red"
          },
          {
            title: "信用一般",
            class: "bg-lightRed"
          },
          {
            title: "信用中等",
            class: "bg-yellow"
          },
          {
            title: "信用良好",
            class: "bg-blue"
          },
          {
            title: "信用满分",
            class: "bg-green"
          }
        ],
        detail: [{
            title: "资料完善",
            count: "90%"
          },
          {
            title: "认证完善",
            count: "已认证"
          },
          {
            title: "完成订单",
            count: "90"
          },
          {
            title: "违约订单",
            count: "0"
          }
        ],
        list: [{
            name: "张先生",
            score: 5,
            msg: "技术一流，服务到位！",
            time: "2019-01-01",
            logo: "./static/imgs/main/user_logo.png"
          },
          {
            name: "高小姐",
            score: 2,
            msg: "技术一流，服务到位！",
            time: "2019-01-01",
            logo: "./static/imgs/main/user_logo.png"
          },
          {
            name: "王女士",
            score: 4,
            msg: "技术一流，服务到位！",
            time: "2019-01-01",
            logo: "./static/imgs/main/user_logo.png"
          },
          {
            name: "王女士",
            score: 4,
            msg: "技术一流，服务到位！",
            time: "2019-01-01",
            logo: "./static/imgs/main/user_logo.png"
          },
          {
            name: "王女士",
            score: 4,
            msg: "技术一流，服务到位！",
            time: "2019-01-01",
            logo: "./static/imgs/main/user_logo.png"
          }
        ]
      }
    };
  },
  mounted() {
    var height = document.documentElement.clientHeight;
    var h1 = document.querySelector(".credit_bg").clientHeight;
    $(".credit_list").css("height", `${height - h1}px`);
  },
  created() {
    this.selfMainLoadOpend();
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 1
    });
    this.init();
  },

  beforeRouteLeave(to, from, next) {
    if (to.path == "/newusercenter") {
      to.meta.keepAlive = false;
    }
    next();
  },

  methods: {
    init() {
      this.getPageInfo();
      // 获取菜单数据
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },
    getPageInfo() {
      var token = this.getToken();
      var type = 2;
      var params = {
        token,
        type
      };
      var url = "Member-getCredit";
      // var url = "Member-myCredit";
      this.$dialog.loading.open("拼命加载中...");
      this.__initAction(url, params, (res, s) => {
        if (s == 1) {
          console.log(res.data);
          var data = res.data;
          this.cardInfo.logo = data.portrait;
          this.cardInfo.name = data.lastName;
          this.cardInfo.score = data.stars;
          this.cardInfo.detail[0].count = data.good;
          this.cardInfo.detail[1].count = data.Authentication;
          this.cardInfo.detail[2].count = data.orders;
          this.cardInfo.list = res.data.list;
          console.log(this.cardInfo.list);
          this.$dialog.loading.close();
        };
      });



      // this.$dialog.loading.open("拼命加载中...");
      // this.axios.post(url, params).then(res => {
      //   console.log(res.data);
      //   if (res.data.status == 1) {
      //     var data = res.data.data;
      //     this.cardInfo.logo = data.portrait;
      //     this.cardInfo.name = data.lastName;
      //     this.cardInfo.score = data.stars;
      //     this.cardInfo.detail[0].count = data.good;
      //     this.cardInfo.detail[1].count = data.Authentication;
      //     this.cardInfo.detail[2].count = data.orders;
      //     this.$dialog.loading.close();
      //   }
      // });
    }
  }
};
</script>
<style lang="scss" scoped>
img.item_logo {
    border-radius: 50%;
}
</style>
