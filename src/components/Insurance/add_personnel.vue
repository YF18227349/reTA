<template>
  <div class="add_personnel w-100">
    <header class="add_personnel_header bg-gray w-100 fc-dark">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
      <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
      <router-link to="/holder_info/1" class="last">
        <span class="mr-1">{{pageInfo.header_right}}</span>
        <span class="iconfont icon-jiahaoyou1"></span>
      </router-link>
    </header>
    <div class="clear-fixed"></div>
    <div class="add_personnel_group">
      <div v-for="(tmp,i) in addPersonnelInfo" :key="i" class="add_personnel_item w-100 bg-white">
        <yd-cell-item>
          <span slot="left" class="item_left">
            <a
              href="javascript:;"
              class="item_checkbox iconfont"
              :class="tmp.select_code?'br-blue':'br-dark'"
              @click="tmp.select_code = !tmp.select_code"
            >
              <span class="iconfont icon-right8" :class="tmp.select_code?' fc-blue':'fc-white'"></span>
            </a>
          </span>
          <div slot="left" class="item_mid">
            <span class="item_name">{{tmp.name}}</span>
            <div class="item_Id mt-3">
              <span slot="left">身份证:</span>
              <span slot="left">{{tmp.Id}}</span>
            </div>
          </div>
          <a href="javascript:;" slot="right" class="item_right">
            <span class="item_compose mui-icon mui-icon-compose"></span>
          </a>
        </yd-cell-item>
      </div>
    </div>
    <a href="javascript:;" class="submitBtn btn-c bg-blue">
      <span class="fc-white fw-5">确认</span>
    </a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "人员选择",
        header_right: "新增"
      },

      addPersonnelInfo: [
        { name: "张女士", Id: "612325***********1234", select_code: false },
        { name: "张女士", Id: "612325***********1234", select_code: false },
        { name: "张女士", Id: "612325***********1234", select_code: false }
      ]
    };
  }
};
</script>
<style lang="scss">
</style>
