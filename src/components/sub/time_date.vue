<template>
  <div class="time_date_modal w-100">
    <div
      class="time_data_plate w-100"
      :class="show?'time_modal_show':'time_modal_hidden'"
      @click.prevent="time_done(0)"
    ></div>
    <div class="time_data_container w-100 bg-white" :class="show?'time_modal_up':'time_modal_down'">
      <div class="time_btn_group w-100">
        <a
          href="javascript:;"
          class="pt-1 pb-1 pl-3 pr-3 br-dark bg-white"
          @click.prevent="time_done(0)"
        >
          <span class="fs-3 fw-6 fc-gray">取消</span>
        </a>
        <span class="select_time_value fs-3 fw-6 fc-dark">{{selectTimeValue}}</span>
        <a
          href="javascript:;"
          class="pt-1 pb-1 pl-3 pr-3 br-blue bg-blue"
          @click.prevent="time_done(1)"
        >
          <span class="fs-3 fw-6 fc-white">确定</span>
        </a>
      </div>
      <div class="time_data_list p-r w-100">
        <div class="select_plate p-a w-100"></div>
        <div class="list_item">
          <ul class="year_list" :style="yearStyle">
            <li v-for="(item,y) in year_date_list" :key="y">
              <a href="javascipt:;" class="item w-100" @click.prevent="select_year(y)">
                <span class="fs-3 fw-6 fc-dark">{{item.value}}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="list_item">
          <ul class="moth_list" :style="mothStyle">
            <li v-for="(it,m) in moth_date_list" :key="m">
              <a href="javascipt:;" class="item w-100" @click.prevent="select_moth(m)">
                <span class="fs-3 fw-6 fc-dark">{{it.value}}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="list_item">
          <ul class="day_list" :style="dayStyle">
            <li v-for="(tmp,d) in day_date_list" :key="d">
              <a href="javascipt:;" class="item w-100" @click.prevent="select_day(d)">
                <span class="fs-3 fw-6 fc-dark">{{tmp.value}}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      el_height: null,
      time_modal_code: true,
      year_code: 0,
      year_date_list: [],
      year_value: "",
      moth_code: 0,
      moth_date_list: [],
      moth_value: "",
      day_code: 0,
      day_date_list: [],
      day_value: ""
      // selectTimeValue: ""
    };
  },
  mounted() {
    var h = document.documentElement.clientHeight;
    this.el_height = h * 0.07;
    $(".time_data_container").css("height", `${h * 0.65}px`);
    $(".time_btn_group").css("height", `${h * 0.07}px`);
    $(".select_plate").css("height", `${h * 0.07}px`);
    $(".time_data_list").css("height", `${h * 0.643}px`);
    $(".list_item>ul>li").css("height", `${h * 0.07}px`);
    // var list = document.querySelector(".list_item");
    // list.addEventListener("scroll", this.handleScroll);
  },
  created() {
    this.createYearList();
    this.createMothList();
    this.createDayList(1990, 1);
  },
  methods: {
    isLeapYear(year) {
      var cond1 = year % 4 == 0;
      var cond2 = year % 100 != 0;
      var cond3 = year % 400 == 0;
      var cond = (cond1 && cond2) || cond3;
      if (cond) {
        return true; //是闰年
      } else {
        return false; //不是闰年
      }
    },
    createYearList() {
      var list = [];
      for (var i = 1970; i < 1970 + 100; i++) {
        var arr = {};
        arr.value = i;
        list.push(arr);
      }
      this.year_date_list = list;
    },
    createMothList() {
      var list = [];
      for (var i = 1; i <= 13; i++) {
        var arr = {};
        if (i <= 9) {
          var m = `0${i}`;
        } else {
          var m = i.toString();
        }
        arr.value = m;
        list.push(arr);
      }
      this.moth_date_list = list;
    },
    createDayList(year, moth) {
      var list = [];
      var moth = parseInt(moth);
      // console.log(year, moth);
      if (moth == 2) {
        var result = this.isLeapYear(parseInt(year));
        if (result) {
          var total = 30;
        } else {
          var total = 29;
        }
      } else {
        if (moth <= 7) {
          if (moth % 2 == 0) {
            var total = 31;
          } else if (moth % 2 == 1) {
            var total = 32;
          }
        } else {
          if (moth % 2 == 0) {
            var total = 32;
          } else if (moth % 2 == 1) {
            var total = 31;
          }
        }
      }
      for (var i = 1; i < total; i++) {
        var arr = {};
        if (i <= 9) {
          var d = `0${i}`;
        } else {
          var d = i.toString();
        }
        arr.value = d;
        list.push(arr);
      }
      this.day_date_list = list;
      // console.log(33, list);
    },
    select_year(y) {
      this.year_code = y;
      this.year_value = this.year_date_list[y].value;
      var year = this.year_value;
      var moth = this.moth_date_list[this.moth_code].value;
      this.moth_value = moth;
      this.createDayList(year, parseInt(moth));
      var code = this.day_code;
      var length = this.day_date_list.length;
      if (code > length) {
        this.day_code = 0;
      }
      this.day_value = this.day_date_list[this.day_code].value;
    },
    select_moth(m) {
      this.moth_code = m;
      this.moth_value = this.moth_date_list[m].value;
      var year = this.year_date_list[this.year_code].value;
      var moth = parseInt(this.moth_value);
      this.createDayList(year, moth);
      var code = this.day_code;
      var length = this.day_date_list.length;
      if (code > length) {
        this.day_code = 0;
      }
      this.day_value = this.day_date_list[this.day_code].value;
    },
    select_day(d) {
      this.day_code = d;
      this.day_value = this.day_date_list[d].value;
    },

    time_done(x) {
      var mark = this.mark;
      if (!this.year_value) {
        this.$dialog.toast({
          mes: "请选择年份",
          timeout: 1500
        });
        return;
      }
      var value = this.year_value + this.moth_value + this.day_value;
      var str =
        this.year_value + mark + this.moth_value + mark + this.day_value;
      this.$emit("callBack", x, str);
    }

    // handleScroll(x) {
    //   // console.log(x);
    //   var h = this.el_height;
    //   var y = document.querySelector(".list_item").scrollTop;
    //   var length = Math.ceil(y / h);
    //   this.year_code = length;
    // }
  },
  computed: {
    selectTimeValue() {
      var mark = this.mark;
      var str =
        this.year_value +
        " " +
        mark +
        " " +
        this.moth_value +
        " " +
        mark +
        " " +
        this.day_value;
      return str;
    },
    yearStyle() {
      var code = this.year_code - 0;
      var h = this.el_height;
      return `marginTop:${150 - h * code}px`;
    },
    mothStyle() {
      var code = this.moth_code - 0;
      var h = this.el_height;
      return `marginTop:${150 - h * code}px`;
    },
    dayStyle() {
      var code = this.day_code - 0;
      var h = this.el_height;
      return `marginTop:${150 - h * code}px`;
    }
  },
  props: ["v-model", "show", "mark"]
};
</script>
<style lang="scss">
.time_data_plate {
  position: fixed;
  top: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  transition: all 0.5s;
}
.time_data_container {
  position: fixed;
  transition: all 0.5s;
  z-index: 101;
  .time_btn_group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
  }
  .time_data_list {
    display: flex;
    flex-wrap: nowrap;
    .select_plate {
      top: 150px;
      left: 0;
      background: rgba(0, 0, 0, 0.2);
    }
    .list_item {
      width: 34%;
      height: 100%;
      overflow: scroll;
      ul {
        list-style: none;
        width: 100%;
        margin-top: 150px;
        transition: all 0.3s;
        li {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
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
  }
}
.time_modal_show {
  opacity: 1;
  z-index: 100;
}
.time_modal_hidden {
  opacity: 0;
  z-index: -1;
}
.time_modal_up {
  bottom: 0;
}
.time_modal_down {
  bottom: -100%;
}
</style>
