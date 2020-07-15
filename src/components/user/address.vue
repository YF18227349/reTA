<template>
  <div class="user_addr w-100">
    <self-load-plate v-if="load_show1"></self-load-plate>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" :scroll-top="true">
      <div class="user_addr_group w-100" slot="list">
        <ul class="user_addr_list w-100 bg-white mt-4 mb-4" v-for="(tmp,i) in dataList" :key="i">
          <li>
            <a href="javascript:;" class="line_item" @click="select_addr(i)">
              <span class="f-left fc-dark fw-6 fs-3 mr-2">姓名:</span>
              <span class="f-left fc-dark fw-6 fs-3">{{tmp.consignee}}</span>
              <span class="f-right fc-dark fw-6 fs-3">{{tmp.tel}}</span>
            </a>
          </li>
          <li>
            <a href="javascript:;" class="line_item" @click="select_addr(i)">
              <span class="f-left fc-gray fw-6 fs-3 mr-3">地 址:</span>
              <span class="f-left fc-gray fw-6 fs-3">{{tmp.province}}</span>
              <span class="f-left fc-gray fw-6 fs-3">{{tmp.city}}</span>
              <span class="f-left fc-gray fw-6 fs-3">{{tmp.area}}</span>
              <span class="f-left fc-gray fw-6 fs-3">{{tmp.address}}</span>
            </a>
          </li>
          <li>
            <a href="javascript:;" class="line_item">
              <a
                href="javascript:;"
                class="f-left default_btn"
                @click="selecet_default_btn(tmp.id)"
              >
                <span
                  class="item_radio iconfont icon-duihao4 fw-6 mr-2 fc-white"
                  :class="tmp.isDefault==1 ?'bg-blue br-blue':'bg-lightdark br-lightdark'"
                ></span>

                <span class="default_txt fw-6 fc-gray">设为默认</span>
              </a>
              <a href="javascript:;" class="addr_btn f-right ml-6" @click="update_addr(tmp.id)">
                <span class="item_icon iconfont icon-bianji1 fc-gray fw-6"></span>
                <span class="fc-gray ml-2">编辑</span>
              </a>
              <a
                href="javascript:;"
                class="addr_btn f-right"
                @click="remove_addr(tmp.id, tmp.consignee, i)"
              >
                <span class="item_icon iconfont icon-lajixiang1 fc-gray fw-6"></span>
                <span class="fc-gray ml-2">删除</span>
              </a>
            </a>
          </li>
        </ul>
      </div>

      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip" class="pb-5 pt-5 fc-dark fm-2"></span>
    </yd-infinitescroll>

    <div class="zhezhao" v-if="load_show"></div>
    <self-load-plate v-if="load_show" class="c1"></self-load-plate>

    <router-link to="/add_new_addr/-1" class="add_addr_btn bg-blue">
      <span class="fc-white fm-2">添加新地址</span>
      <!-- <span class="iconfont icon-jinakangbaoicons19 btn-icon fc-white fw-6 fm-2"></span> -->
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header_title: "地址列表",
      dataList: [], //地址列表
      param: this.initPage(),
      params: this.initParam(),
      load_show1: false,
      load_show: false,
      default_id: null,
      modal_value: "", //绑定选择地址
      select_code: null, //选中的编辑的地址index值
      show: false, //地址弹框开关
      id: null
    };
  },
  created() {
    this.selfMainLoadOpend();
    this.$store.commit("setHeaderStyle", {
      txt: this.header_title,
      type: 0
    });
    this.init();
  },
  methods: {
    init() {
      this.getPageInfo();
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
    },
    getPageInfo() {
      this.$dialog.loading.close();
      this.__initAction("Address-getList", this.params, (res, s) => {
        if (s == 1) {
          console.log(res.data);
          for (let it of res.data) {
            var arr = it;
            arr.createTime = it.create_time;
            arr.addr1 = it.province + " " + it.city + " " + it.area + " ";
            arr.addr2 = "" + it.address;
            this.dataList.push(arr);
            console.log(this.dataList, 800);
          }
          // this.param.count = res.count;
          // this.params.count = res.count;
        }
      });
    },

    //删除地址
    remove_addr(id, name, index) {
		console.log(id,name,index)
      var that = this;
      var params = {
        token: that.getToken(),
        id
      };
      this.$dialog.confirm({
        title: "删除",
        mes: `是否删除“${name}”地址`,
        opts: () => {
          this.__initAction("Address-getDelete", params, (res, s) => {
            if (s == 1) {
			  that.dataList.splice(index,1);
              that._msg("删除");
            }
          });
        }
      });
    },

    //加载更多
    loadList() {
      this.param.Max = Math.ceil(this.param.count / this.param.length);
      if (this.param.page == this.param.Max) {
        this._msg("已经到底了", 200);
        setTimeout(() => {
          this.selfLoadClosed({
            mes: ""
          });
        }, 500);
        return false;
      } else {
        this.param.page++;
        this.params.page++;
        this.getPageInfo();
        this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
      }
    },

    // 设置默认地址
    selecet_default_btn(id) {
      var param = {
        token: this.getToken(),
        id: id
      };
      this.__initAction("Address-getDefault", param, (res, s) => {
        if (s == 1) {
          this._msg(res.info, 1500, "success");
          this.realoade();
        }
      });
    },
    select_addr(i) {
      var type = this.getParams().type;
      var id = this.dataList[i].id;
      switch (type) {
        case "list":
          var addr = this.dataList[i].addr1 + this.dataList[i].addr2;
          console.log(addr);
          var info = this.getCache("invoice_fill_user_addr", 2);
          if (!info) {
            info = {};
          }
          info.id = id;
          info.addr = addr;
          this.setCache("invoice_fill_user_addr", JSON.stringify(info));
          window.history.go(-1);
          break;
        case "user":
          this.__Href("/add_new_addr/" + id);
          break;
        default:
          console.log(type);
          break;
      }
    },
    //更新跳转
    update_addr(id) {
      this.__Href("/add_new_addr/" + id);
    },

    realoade(time = 1000) {
      this.params.page = 0;
      this.param.page = 0;
      this.__Sleep(e => {
        this.dataList = [];
        this.getPageInfo();
      }, time);
    }
  }
};
</script>
<style lang="scss">
.yd-cityselect-content {
  margin-top: 10px;
}
.add_addr_btn {
  height: 3rem;
}
</style>
