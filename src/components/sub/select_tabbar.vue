<template>
  <div class="select_tabbar_plate w-100" :style="tabbar_style">
    <ul class="select_tabbar_list w-100">
      <li v-for="(tmp,i) in list" :key="i" class="list_items">
        <a href="javascript:;" class="item" @click="select_tab(i)">
          <span class="fw-6" :style="font_style">
            {{tmp.title}}
            <span class="iconfont icon-arrowdown fc-gray fw-6" v-if="arrow_style"></span>
          </span>
        </a>
      </li>
    </ul>
    <self-modal-frame
      :modalShow="modal_show"
      :dataList="modal_list"
      @callBack="click"
      :code="false"
    ></self-modal-frame>
  </div>
</template>
<script>
const ModalFrame = ()=>import("./modal_frame");
export default {
  data() {
    return {
      tab_code: 0,
      value: "",
      modal_show: false,
      modal_list: []
    };
  },
  props: ["list", "arrow", "height", "bgcolor", "color", "active", "font"],
  mounted() {},
  created() {
    this.modal_show = false;
    // this.modal_data = this.list[0].labels;
  },
  methods: {
    click(v) {
      this.value = v;
      this.modal_show = false;
      this.$emit("callBack", this.value);
    },
    select_tab(i) {
      this.tab_code = i;
      if (this.list[i].labels && this.list[i].labels.length > 0) {
        this.modal_list = this.list[i].labels;
        this.modal_show = true;
      } else {
        this.$router.push(this.list[i].url);
      }

      // this.$emit("callBack", this.value);
    }
  },
  computed: {
    //计算返回选择导航栏的样式
    tabbar_style() {
      //返回高度
      if (this.height) {
        var h = parseInt(this.height);
      } else {
        var h = 45;
      }
      //返回背景色
      if (this.bgcolor) {
        var bg = this.bgcolor;
      } else {
        var bg = "#fff";
      }
      var height = `height:${h}px`;
      var bgcolor = "background:" + bg;
      var style = height + ";" + bgcolor;
      return style;
    },

    //返回字体样式
    font_style() {
      if (this.color) {
        var fc = this.color;
      } else {
        var fc = "#333";
      }

      if (this.font) {
        var size = this.font;
      } else {
        var size = "14px";
      }

      var color = "color:" + fc;
      var font = "font-size:" + size;
      var style = color + ";" + font;
      return style;
    },

    //返回箭头样式
    arrow_style() {
      if (this.arrow) {
        return true;
      } else {
        return false;
      }
    },

    //返回底部弹框的数据
    modal_data() {
      var code = this.tab_code;
      return;
    }
  },
  components: {
    "self-modal-frame": ModalFrame
  }
};
</script>
<style lang="scss">
.select_tabbar_plate {
  position: fixed;
  .select_tabbar_list {
    height: 100%;
    list-style: none;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    .list_items {
      padding: 0 10px;
      height: 100%;
      .item {
        height: 100%;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
