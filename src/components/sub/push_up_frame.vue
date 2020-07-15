<template>
<div class="push_up_plate">
  <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
    <slot name="plate" slot="list"></slot>
    <!-- 数据全部加载完毕显示 -->
    <!-- <span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span> -->
    <!-- 加载中提示，不指定，将显示默认加载中图标 -->
    <!-- <span slot="loadingTip" class="pt-5 pb-5 fm-2 fc-dark">加载中</span> -->
  </yd-infinitescroll>
  <!-- <self-load-frame></self-load-frame> -->
</div>
</template>
<script>
const LoadFrame = ()=>import("./loading_frame");
export default {
  data() {
    return {
      param: null,
    };
  },
  props: ["pages", "ajaxUrl", "params"],
  created() {
    this.initCount();
    // this.param = this.pages;

    console.log(this.pages);
    console.log(this.ajaxUrl);
    console.log(this.params)
  },
  methods: {
    initCount() {
      this.param = this.pages;
      // console.log('param',this.param);
      // console.log('pages',this.pages);
      // if (this.params.count == 0) {
      //   this.__initAction(this.ajaxUrl, this.params, (res, s) => {
      //     if (s == 1) {
      //       this.param.count = res.count;
      //     }
      //   });
      // }
    },
    loadList() {
      // console.log("组件调用");
      // console.log(this.params.page);
      this.param.Max = Math.ceil(this.pages.count / this.pages.length);
      // console.log("param->>>>>>>>>>>>>>>>>>");
      // console.log(this.param);
      // this.selfLoadOpend({
      //   mes: "加载数据",
      //   font: 40,
      //   status: true,
      //   color: "fc-blue"
      // });
      // return false;
      // this.params.page 是请求参数的page
      // 这里面有2个可以用来判断的page,一个是总页数page,一个是limit(n,m)的page
      // 这样方便你选择判断的page
      // 我用的总页数page判断 ===> this.param.page
      if (this.param.page == this.param.Max) {
        this._msg("已经到底了", 200);
        setTimeout(() => {
          this.selfLoadClosed({
            mes: ""
          });
          // this.$emit("callback", false);
          return;
        }, 500);
      } else {
        // console.log(this.param.page + "<----->" + this.param.Max);
        this.__initAction(this.ajaxUrl, this.params, (res, s) => {
          // s==1为成功 有数据
          // console.log(res)
          if (s == 1) {
            this.param.page++;
            this.params.page++;
            this.$refs.infinitescrollDemo.$emit(
              "ydui.infinitescroll.finishLoad"
            );
            this.$emit("callback", res.data);
          }
        });
      }
    }
  },
  watch: {
    /**
     * 监听数据变化
     */
    count() {
      if (this.pages.count) {
        var MaxPage = Math.ceil(this.pages.count / this.pages.length);
        this.param.count = MaxPage;
      }
    }
  },
  computed: {
    count() {
      return this.pages.count;
    }
  },
  components: {
    "self-load-frame": LoadFrame
  }
};
</script>
<style lang="scss">
div.yd-list-loading {
    display: none;
}
</style>
