<template>
  <div class="get_list_more w-100">
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
      <div class="lists w-100" slot="list">
        <solt name="datas"></solt>
      </div>
      <span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span>
    </yd-infinitescroll>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 0
    };
  },
  props: ["page", "length", "count", "dataList"],
  methods: {
    loadList() {
      var MaxPage = Math.ceil(this.count / this.length);
      var test = this.page + 1;
      if (MaxPage > test) {
        this.page = test;
        this.getMore();
        this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
      } else {
        this._msg("没有更多数据了...");
      }
    },
    getMore() {
      var that = this;
      this.__initAction(
        "Invoice-listMemberInvoice",
        {
          token: this.getToken(),
          page: this.page,
          length: this.length,
          fields: this.fields,
          rules: this.rules
        },
        (res, s) => {
          if (s == 1) {
            for (let it of res.data) {
              var arr = {};
              arr.id = it.id;
              arr.title = it.invoiceTotal.invoiceTitle;
              arr.total = parseFloat(it.invoiceAmount);
              arr.time = it.update_time;
              this.userInvoiceList.push(arr);
            }
            this._log(this.param.page + "------" + this.param.length);
          } else {
            this._msg(res.info);
          }
        }
      );
    }
  }
};
</script>
<style lang="scss">
</style>
