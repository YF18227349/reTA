<template>
<div class="special_talents w-100">
  <header class="special_talents_header bg-gray w-100">
    <a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
    <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
    <a href="javascript:;" class="last"></a>
  </header>
  <div class="clear-fixed"></div>
  <div class="tabs w-100 bg-gray">
    <a href="javascript:;" class="tabs_item" v-for="(tmp,i) in pageInfo.tabList" :key="i" @click="select_tabs(i)">
      <span class="item_label fc-dark fw-5 fs-3">{{tmp.title}}</span>
      <span class="item_arrow iconfont icon-arrowdown fc-dark fw-5"></span>
    </a>
  </div>
  <div class="clear-fixed"></div>
  <!-- <div class="clear-fixed"></div> -->
  <div class="special_talents_group">
    <yd-search v-model="search_value" :on-submit="submitHandler"></yd-search>
    <ul class="special_talents_list">
      <li class="list_item bg-white mb-4" v-for="(tmp,i) in specialTalentsList" :key="i">
        <a href="javascript:;" class="item">
          <div class="item_img">
            <img :src="tmp.logo" alt>
          </div>
          <ul class="item_info">
            <li>
              <span>{{tmp.name}}</span>
            </li>
            <li>
              <span>{{tmp.post}}</span>
            </li>
            <li class="details">
              <span class="detail-content">{{tmp.detail}}</span>
            </li>
            <li class="item_btns" style="justify-content:flex-end;">
              <!-- <a href="javascript:;" class="btn bg-white br-dark">
                  <span class="fc-dark fs-1 fw-5">立即预约</span>
                </a>-->
              <a href="javascript:;" class="btn bg-blue" @click="goInfo(tmp.id)">
                <span class="fc-white fs-1 fw-5">查看详情</span>
              </a>
            </li>
          </ul>
        </a>
      </li>
    </ul>
  </div>
  <div class="modal_frame_group w-100">
    <div class="modal_plate w-100" v-if="pageInfo.modal_code" :class="pageInfo.modal_code?'modal_plate_show':'modal_plate_hid'" @click="cancel()"></div>
    <div class="modal_list w-100" :class="pageInfo.modal_code ?'modal_up' : 'modal_down'" :style="pageInfo.tab_code==2?'background:#fff':''">
      <ul class="data_list bg-white w-100" v-if="pageInfo.tab_code !=2" :style="modelHeight">
        <li class="list_item w-100" v-for="(tmp,i) in pageInfo.modalDataList" :key="i">
          <a href="javascript:;" class="item w-100">
            <span class="fc-blue fw-5 fm-1">{{tmp.title}}</span>
          </a>
        </li>
      </ul>
      <!-- <a href="javascript:;" class="cancel_btn bg-white w-100" @click="cancel()" v-if="pageInfo.tab_code !=2">
        <span class="fc-blue fw-9 fm-1">取消</span>
      </a> -->
      <ul class="data_list2 bg-white" v-if="pageInfo.tab_code ==2">
        <li v-for="(item,i) in pageInfo.modalDataList" :key="i">
          <p class="fs-3 fw-5 list-item-title">{{item.title}}</p>
          <div class="item_detail">
            <span class="item_detail_text pt-1 pb-1 pl-3 pr-3" v-text="it" v-for="(it,o) of item.label" :key="o" @click="handelClick(o)" :class="activeCode == o?'active':''"></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "高级人才",
        tabList: [{
            title: "智能筛选",
            label: [{
              title: "推荐"
            }, {
              title: "最新"
            }]
          },
          {
            title: "发布时间",
            label: [{
                title: "当天"
              },
              {
                title: "三天"
              },
              {
                title: "当天"
              },
              {
                title: "一月"
              }
            ]
          },
          {
            title: "专家领域",
            label: [{
              title: "专家领域",
              label: [
                "全部",
                "电子商务",
                "游戏",
                "电子商务",
                "游戏",
              ]
            }]
          }
        ],
        tab_code: null,
        modal_code: false,
        modalDataList: []
      },
      activeCode: 0,
      search_value: "",
      specialTalentsList: [],
      param: this.initPage(),
      params: this.initParam(),
      map: {
        hot: 0,
        releaseTime: 4,
        regionIds: ""
      },
      modelHeight: {
        height: true,
        overflow: true
      }
    };
  },
  created() {
    this.selfMainLoadOpend();
    this.init();
  },
  mounted() {
    this.autoSizeModel();
  },
  methods: {
    init() {
      this.getDataList();
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },

    autoSizeModel() {
      var len = this.pageInfo.modalDataList.length;
      if (len <= 4) {
        this.modelHeight.height = "auto";
        this.modelHeight.overflow = "hidden";
      } else {
        this.modelHeight.height = "13.5rem";
        this.modelHeight.overflow = "auto";
      };
    },

    getDataList() {
      this.params.hot = this.map.hot;
      this.params.releaseTime = this.map.releaseTime;
      this.params.regionIds = this.map.regionIds;

      this.__initAction("Expert-getList", this.params, (res, s) => {
        if (s == 1) {
          var data = res.data;
          if (data.length > 0) {
            for (let it of data) {
              var arr = {};
              arr.id = it.id;
              arr.logo = it.image;
              arr.post = it.occ;
              arr.detail = it.description;
              arr.name = it.realname;
              this.specialTalentsList.push(arr);
            }
          }
          // {
          //   logo: "http://static.sxtian.com/imgs/main/service_img_03.png",
          //   name: "路女士",
          //   post: "资深视觉设计师",
          //   detail:
          //     "知名大学国学与企业管理培训客座教授：曾获邀担当清华大学、北京大学、中国人民大学、厦门大学、吉林大学、浙江大学等多所一流院校总裁班特聘讲师，给本科和硕士研究生讲授国学课程，连续4年授课评分名列前茅。"
          // }
        }
      });
    },

    handelClick(i) {
      this.activeCode = i;
    },

    goInfo(id) {
      this.__Href("/SpecialTalentsInfo/" + id);
    },

    submitHandler(value) {
      this.$dialog.toast({
        mes: `搜索相关领域：${value}`
      });
    },

    select_tabs(i) {
      this.pageInfo.tab_code = i;
      this.pageInfo.modal_code = true;
      this.pageInfo.modalDataList = this.pageInfo.tabList[i].label;
    },

    cancel() {
      this.pageInfo.modal_code = false;
    }

  }
};
</script>
<style lang="scss" scoped>
.yd-input > input {
    margin-bottom: 0;
    background: #fff;
    font-size: 14px;
    color: #333;
    text-align: left;
    font-weight: bold;
}
.special_talents {
    .special_talents_group {
        .details {
            width: 100%;
            height: 61%;
            line-height: 1rem;
            text-align: justify;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            display: -moz-box;
            -webkit-box-orient: vertical;
            -moz-box-orient: vertical;
            -moz-line-clamp: 9;
            -webkit-line-clamp: 9;
            .detail-content {
                height: 100%;
                line-height: 1rem;
                text-align: justify;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                display: -moz-box;
                -webkit-box-orient: vertical;
                -moz-box-orient: vertical;
                -moz-line-clamp: 9;
                -webkit-line-clamp: 9;
            }
        }
    }

}
.list-item-title {
    color: #8f8f94;
}
.item_detail_text {
    margin-bottom: 5px;
    margin-right: 5px;
    padding: 0.25rem 1rem;
}
.item_detail_text.active {
    color: #fff;
    background: #007aff;
    border-radius: 3px;
}
</style>
