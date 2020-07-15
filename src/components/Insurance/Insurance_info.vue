<template>
  <div class="insurance_info">
    <header class="insurance_info_header bg-gray w-100 fc-dark">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark iconfont icon-previewleft"></a>
      <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
      <a href="javascript:;" class="last"></a>
    </header>
    <div class="clear-fixed"></div>
    <div class="insurance_info_group w-100">
      <ul class="insurance_info_list w-100">
        <li class="item">
          <yd-cell-item>
            <span slot="left" class="item_title">保险期间</span>
            <span slot="right" class="item_txt">{{insuranceInfo.term}}</span>
          </yd-cell-item>
        </li>
        <li class="item">
          <yd-cell-item>
            <span slot="left" class="item_title">起保时间</span>
            <span slot="right" class="item_txt">{{insuranceInfo.startTime}}</span>
          </yd-cell-item>
        </li>
        <li class="item">
          <yd-cell-item>
            <span slot="left" class="item_title">终保时间</span>
            <span slot="right" class="item_txt">{{insuranceInfo.endTime}}</span>
          </yd-cell-item>
        </li>
        <li class="item">
          <router-link to="/holder_info/0">
            <yd-cell-item arrow>
              <span slot="left" class="item_title">投保人</span>
              <span slot="right" class="item_txt mr-3">请选择</span>
            </yd-cell-item>
          </router-link>
        </li>
        <li class="item">
          <router-link to="/add_personnel">
            <yd-cell-item>
              <span slot="left" class="item_title">被保人</span>
              <span slot="right" class="item_txt mr-3">添加</span>
              <span slot="right" class="iconfont icon-tianjiahaoyou fc-blue"></span>
            </yd-cell-item>
          </router-link>
        </li>
        <li class="item">
          <yd-cell-item>
            <a href="javascript:;" slot="left" class="item_trash mui-icon mui-icon-trash"></a>
            <span slot="left" class="item_txt">
              <ul>
                <li>
                  <yd-cell-item>
                    <span slot="left" class="item_label">被保人:</span>
                    <span slot="left" class="item_detail">{{insuranceInfo.holdedInfo.name}}</span>
                  </yd-cell-item>
                </li>
                <li>
                  <yd-cell-item>
                    <span slot="left" class="item_label">身份证:</span>
                    <span slot="left" class="item_detail">{{insuranceInfo.holdedInfo.Id}}</span>
                  </yd-cell-item>
                </li>
                <li>
                  <yd-cell-item>
                    <span slot="left" class="item_label">手机号:</span>
                    <span slot="left" class="item_detail">{{insuranceInfo.holdedInfo.telNum}}</span>
                  </yd-cell-item>
                </li>
              </ul>
            </span>
            <span slot="right" class="item_br mr-5"></span>
            <span slot="right" class="item_count">{{insuranceInfo.count}}份</span>
          </yd-cell-item>
        </li>
        <li class="item">
          <a href="javascript:;" @click="pageInfo.open_modal = !pageInfo.open_modal">
            <yd-cell-item arrow>
              <span slot="left" class="item_title">投保关系</span>
              <span slot="right" class="item_txt mr-2">{{insuranceInfo.relate}}</span>
            </yd-cell-item>
          </a>
        </li>
      </ul>
    </div>
    <div class="insurance_info_footer w-100">
      <div class="footer_text bg-white w-70">
        <span class="insurance_total fc-red fw-5">199.00</span>
      </div>
      <router-link to="/insurance_order" class="footer_Btn bg-blue w-30">
        <span class="fc-white fw-5 fm-1">提交订单</span>
      </router-link>
    </div>
    <div class="modal_frame_group w-100">
      <div
        class="modal_plate w-100"
        v-if="pageInfo.open_modal"
        @click="pageInfo.open_modal= !pageInfo.open_modal"
      ></div>
      <div class="modal_list w-100" :class="pageInfo.open_modal?'modal_up':'modal_down'">
        <ul class="modal_text bg-white w-100">
          <li class="modal_item w-100" v-for="(tmp,i) in modalTextList" :key="i">
            <a href="javascript:;" class="modal_label w-100" @click="select_value(i)">
              <span class="fc-blue fm-1">{{tmp.label}}</span>
            </a>
          </li>
        </ul>
        <a
          href="javascript:;"
          class="cancel_btn w-100 bg-white mt-4"
          @click="pageInfo.open_modal= !pageInfo.open_modal"
        >
          <span class="fm-1 fc-blue fw-8">取消</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "投保信息",
        open_modal: false
      },
      insuranceInfo: {
        term: "1年",
        startTime: "2018-12-7",
        endTime: "2019-12-7",
        count: 1,
        relate: "请选择",
        holdedInfo: {
          name: "张先生",
          Id: 612401199001010990,
          telNum: 13899887865
        }
      },
      modalTextList: [
        { label: "劳务关系" },
        { label: "投资关系" },
        { label: "亲属关系" },
        { label: "夫妻关系" }
      ]
    };
  },
  methods: {
    select_value(i) {
      this.insuranceInfo.relate = this.modalTextList[i].label;
      this.pageInfo.open_modal = !this.pageInfo.open_modal;
    }
  }
};
</script>
<style lang="scss">
.modal_text {
  border-radius: 5px;
  padding: 0 15px;
}
.modal_item {
  border-bottom: 1px solid #e4e4e4;
}
.modal_label {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
</style>
