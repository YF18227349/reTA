<template>
<div class="company-detail">
  <ul class="list-detail">
    <li class="list-d-item p-5">
      <div class="">
        <h1 class="fw-7 fm-1 mb-3">{{pageInfo.title}}</h1>
        <p>
          <span class="m-1 fc-gray fs-3">{{pageInfo.status}}</span>|
          <span class="m-1 fc-gray fs-3">{{pageInfo.city}}</span>|
          <span class="m-1 fc-gray fs-3">{{pageInfo.msg}}</span>
        </p>
      </div>
    </li>
    <li class="list-d-item p-5">
      <div class="item-left w-50">
        <div class="">
          <span class="font-50">{{pageInfo.com}}</span>
        </div>
        <div class="ml-3">
          <p class="mb-3">
            <yd-rate size="1rem" class="item_score" slot="right" v-model="pageInfo.star" color="#ff9c00" active-color="#ff9c00" readonly></yd-rate>
          </p>
          <span class="fc-gray fs-3">{{pageInfo.comNum}}</span>
        </div>
      </div>
      <div class="item-right w-50">
        <div class="">
          <h3 class="mb-3 fs-3">{{pageInfo.rate}}</h3>
          <span class="fc-gray fs-3">消息回复率</span>
        </div>
        <div class="ml-5">
          <h3 class="mb-3 fs-3">{{pageInfo.day}}</h3>
          <span class="fc-gray fs-3">报名处理速度</span>
        </div>
      </div>
    </li>
  </ul>

  <div class="details-content mt-3 p-5">
    <h1 class="fw-7 fm-1 mb-5">企业基本信息</h1>
    <ul>
      <li v-for="(it,i) of nameList" :key="i" class="mt-3 content-lists-item">
        <span class="fc-gray fw-5 fs-3" :class="i!=7?'':'w-40'">{{it.name}}：</span>
        <div :class="i!=7?'w-70':'w-60'">
          <span class="fw-5 fs-3">{{it.info}}</span>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
const Star = ()=>import("../sub/star");
export default {
  data() {
    return {
      goodsId: null,
      token: null,
      pageInfo: {
        title: "广州邦尼生物科技有限公司",
        status: '已认证',
        city: "广州",
        msg: "2个再招职位",
        com: 3.9,
        comNum: '895人评价',
        rate: '76%',
        day: "1-2天",
        star: 2,
      },
      nameList: [{
          name: "企业类型",
          info: null
        },
        {
          name: "经营状态",
          info: null
        },
        {
          name: "注册资本",
          info: null
        },
        {
          name: "行业类型",
          info: null
        },
        {
          name: "成立日期",
          info: null
        },
        {
          name: "注册地址",
          info: null
        },
        {
          name: "登记机关",
          info: null
        },
        {
          name: "社会信用同意代码",
          info: null
        },
        {
          name: "组织代码",
          info: null
        },
        {
          name: "经营范围",
          info: null
        }
      ]
    }
  },
  created() {
    this.selfMainLoadOpend();
    this.$store.commit("setHeaderStyle", {
      txt: "公司详情",
      type: 0
    });
    this.getPageInfo();
    this.getDataInfo();
  },

  methods: {
    getPageInfo() {
      this.goodsId = this.getQuery().gid;
      this.token = this.getToken();
    },

    getDataInfo() {
      var params = {
        id: this.goodsId,
        token: this.token
      };
      var url = "Quarters-infoMemberQuarters";
      this.__initAction(url, params, (res, s) => {
        if (s == 1) {
          var cInfo = res.data.companyInfo;
          console.log(cInfo)
          this.pageInfo.title =  cInfo.nameUnit;
          this.pageInfo.status = '已认证';
          this.pageInfo.city = "西安";
          this.pageInfo.msg = "2个在招职位";
          this.pageInfo.com = 3.9;
          this.pageInfo.comNum = '999人评价';
          this.pageInfo.rate = '76%';
          this.pageInfo.day = "1-2天";
          this.pageInfo.star = 4;
          this.nameList[0].info = cInfo.type;
          this.nameList[1].info = cInfo.validTime;
          this.nameList[2].info = cInfo.capital;
          this.nameList[3].info = "";
          this.nameList[4].info = cInfo.date;
          this.nameList[5].info = cInfo.address;
          this.nameList[6].info = cInfo.range;
          this.nameList[7].info = cInfo.code;
          this.nameList[8].info = "";
          this.nameList[9].info = "";

        }
        this.selfMainLoadClosed();
      })
    }

  },
  components: {
    "self-star": Star
  }
}
</script>
<style lang="scss" scoped>
.company-detail {

    .font-50 {
        font-size: 35px;
        font-weight: 700;
    }
    .list-detail {
        background: #fff;
        .list-d-item:last-child {
            border-top: 1px solid #ccc;
        }
        .list-d-item {
            display: flex;
            justify-content: space-between;
        }
        .item-left {
            text-align: center;
            display: flex;
            justify-content: left;
            align-items: center;
        }
        .item-right {
            text-align: center;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
    .details-content {
        background: #fff;
        .content-lists-item {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

        }
    }
}
</style>
