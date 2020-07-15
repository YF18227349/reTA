<template>
  <div class="post_label w-100">
    <!-- <header class="post_label_header bg-gray w-100">
      <a href="javascript:history.go(-1)" class="arrow-logo fc-dark fw-5 iconfont icon-previewleft"></a>
      <span class="header_title fc-dark">{{pageInfo.header_title}}</span>
      <a href="javascript:;" class="last">
        <span class="fw-5 fc-fark fs-3">保存</span>
      </a>
    </header>-->
    <!-- <div class="clear-fixed"></div> -->
    <ul class="post_label_selected bg-white w-100">
      <li class="item selected_title">
        <self-cell-item href="javascript:;" class="w-100">
          <span slot="left" class="fc-dark">已选行业</span>
          <span slot="right" class="selected_count fc-blue">{{selected_count}}</span>
        </self-cell-item>
      </li>
      <li class="item">
        <self-cell-item href="javascript:;" class="w-100">
          <span slot="left" class="selected_detail">请选择行业，最多选择3个</span>
        </self-cell-item>
      </li>
      <li class="item selected_item">
        <a href="javascript:;" class="line_item w-100">
          <span class="mr-3 pt-1 pb-1 pr-4 pl-4 bg-darkGray" v-if="selected_count==0">您还未选择行业</span>
          <span
            class="mr-3 pt-1 pb-1 pr-4 pl-4 bg-blue fc-white"
            v-for="(tmp,i) in select_label_list"
            :key="i"
            @click="cancel_label(i)"
          >{{tmp.label}}</span>
        </a>
      </li>
    </ul>
    <div class="clear_selected"></div>
    <div class="post_label_group w-100">
      <ul class="post_label_list bg-white">
        <li class="post_label_item" v-for="(item,i) in post_label_list" :key="i">
          <p class="fs-3 fw-6 mb-3">{{item.name}}</p>
          <div class="label_contanier">
            <span
              class="label_item pt-1 pb-1 pr-4 pl-4 mb-3 mr-4"
              v-for="(tmp,j) in item.tagList"
              :key="j"
              :class="tmp.code?'bg-blue fc-white':'fc-dark bg-darkGray'"
              @click="selected_lebal(i,j)"
            >{{tmp.name}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const CellItem = ()=>import("../../components/sub/cell_arrow_item");
export default {
  data() {
    return {
      pageInfo: {
        header_title: "岗位标签",
        token: "",
        path: ""
      },
      select_label_list: [],
      post_label_list: []
    };
  },
  mounted() {
    $(".header_right>span")
      .html("保存")
      .addClass("fw-6")
      .css("fontSize", "16px");

    $(".header_right").click(() => {
      this.do_save();
    });

    var h = document.documentElement.clientHeight;
    $(".post_label_selected").css("top", `${h * 0.07}px`);
  },
  created() {
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 0
    });
    this.pageInfo.token = this.getToken();
    this.getPostLabelList();
  },
  methods: {
    getPostLabelList() {
      var token = this.pageInfo.token;
      var info = this.getSelectData();
      // console.log(info);
      var url = this.Global.baseURL + "/Label-getListPost.jsp";
      this.axios
        .post(url, { token })
        .then(res => {
          // console.log(res.data.data);
          if (res.data.status == 1) {
            var data = res.data.data;
            for (let it of data) {
              for (let tmp of it.tagList) {
                tmp.code = false;
              }
            }
            if (info) {
              if (info.post) {
                if (info.post.label_list) {
                  var data_list = info.post.label_list;
                  this.select_label_list = data_list;
                  for (var i = 0; i < data_list.length; i++) {
                    var x = data_list[i].code_x;
                    var y = data_list[i].code_y;
                    data[x].tagList[y].code = true;
                  }
                }
              }
            }
            this.post_label_list = data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    selected_lebal(i, j) {
      var code = this.post_label_list[i].tagList[j].code;
      var list = this.select_label_list;
      var count = list.length;
      if (!code) {
        if (count == 3) {
          this.$dialog.toast({
            mes: "最做选择三个标签",
            timeout: 1500
          });
          return;
        } else {
          this.post_label_list[i].tagList[j].code = !code;
          var arr = {};
          arr.id = this.post_label_list[i].tagList[j].id;
          arr.label = this.post_label_list[i].tagList[j].name;
          arr.code_x = i;
          arr.code_y = j;
          list.push(arr);
        }
      } else {
        this.post_label_list[i].tagList[j].code = !code;
        for (var k = 0; k < count; k++) {
          if (list[k].code_x == parseInt(i) && list[k].code_y == parseInt(j)) {
            list.splice(k, 1);
          }
        }
      }
    },
    do_save() {
      var list = this.select_label_list;
      if (list.length == 0) {
        this.$dialog.toast({
          mes: "请选择标签...",
          timeout: 1500
        });
        return;
      }
      var info = this.getSelectData();
      if (!info) {
        var info = {};
      }
      if (!info.post) {
        info.post = {};
      }
      info.post.label_list = [];
      info.post.label_list = list;
      console.log(info.post);
      this.setCache("select_data", JSON.stringify(info));
      setTimeout(() => {
        window.history.go(-1);
      }, 300);
    },
    cancel_label(i) {
      var list = this.select_label_list;
      var x = list[i].code_x;
      var y = list[i].code_y;
      this.post_label_list[x].tagList[y].code = false;
      list.splice(i, 1);
    }
  },
  computed: {
    selected_count() {
      return this.select_label_list.length;
    }
  },
  destroyed() {
    $(".header_right>span").html("");
    $(".header_right").unbind("click");
  },
  components: {
    "self-cell-item": CellItem
  }
};
</script>

<style lang="scss">
</style>
