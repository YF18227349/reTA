<template>
  <div class="main_more_plate w-100">
    <div class="main_more bg-white w-100">
      <div class="icon-item" v-for="(item,i) in moreIconList" :key="i">
        <router-link :to="'/main_information/'+item.title+'/'+item.id+'/2'" class="item">
          <span class="item_logo mb-2">
            <img :src="item.logo" alt class="images">
          </span>
          <span>{{item.title}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "选择服务"
      },
      moreIconList: []
    };
  },
  created() {
    this.selfMainLoadOpend();
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 1
    });
    this.init();
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
      var param = {
        token: this.getToken()
      };
      this.__initAction("Index-getNavigationMore", param, (res, s) => {
        if (s == 1) {
          var data = res.data;
          if (data.length > 0) {
            for (let it of data) {
              var arr = {};
              arr.title = it.name;
              arr.id = it.id;
              arr.logo = it.icon;
              this.moreIconList.push(arr);
            }
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
</style>
