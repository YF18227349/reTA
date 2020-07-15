<template>
  <div class="select_addr_group w-100">
    <div
      class="select_addr_plate w-100"
      :class="addr_show?'addr_plate_show':'addr_plate_hidden'"
      @click="addr_cancel()"
    ></div>
    <div class="select_addr_container w-100" :class="addr_show?'addr_up':'addr_down'">
      <div class="w-100 select_value bg-white">
        <a class="addr_btn bg-white br-dark" href="javascript:;" @click="addr_cancel()">
          <span class="fc-dark fs-2 fw-6">取消</span>
        </a>
        <div class="value_list">
          <span>{{prvoice_value?prvoice_value:'未选择'}}</span>
          <span>{{city_value}}</span>
          <span>{{area_value}}</span>
        </div>
        <a class="addr_btn bg-blue" href="javascript:;" @click="addr_done()">
          <span class="fc-white fs-2 fw-6">确定</span>
        </a>
      </div>
      <div class="w-100 p-r addr_list_container bg-gray">
        <div class="p-a value_plate bg-black w-100"></div>
        <div class="container_item">
          <ul class="addr_list addr1" :style="skip1">
            <li class="addr_item" v-for="(add1,p) in addr_provice" :key="p">
              <a class="item" href="javascript:;" @click.prevent="select_provice(p)">
                <span class="fs-3 fw-6 fc-dark">{{add1.name}}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="container_item p-r">
          <ul class="addr_list addr2" :style="skip2">
            <li class="addr_item" v-for="(add2,c) in addr_city" :key="c">
              <a class="item" href="javascript:;" @click.prevent="select_city(c)">
                <span class="fs-3 fw-6 fc-dark">{{add2.name}}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="container_item p-r">
          <ul class="addr_list addr3" :style="skip3">
            <li class="addr_item" v-for="(add3,a) in addr_area" :key="a">
              <a class="item" href="javascript:;" @click.prevent="select_area(a)">
                <span class="fs-3 fw-6 fc-dark">{{add3.name}}</span>
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
      addr1_code: 0,
      addr2_code: 0,
      addr3_code: 0,
      addr_data: [],
      addr_show: true,
      addr_provice: [],
      addr_city: [],
      addr_area: [],
      prvoice_value: "",
      prvoice_id: null,
      city_value: "",
      city_id: null,
      area_value: "",
      area_id: null,
      lon: null,
      lat: null
    };
  },
  created() {
    this.select_addr();
  },
  methods: {
    select_addr() {
      // this.addr_show = true;
      var url = this.Global.baseURL + "/Area-listAll.jsp";
      this.axios.post(url).then(res => {
        // console.log(res.data.data);
        if (res.data.status == 1) {
          var data = res.data.data;
          this.addr_data = data;
          this.addr_provice = data;
          this.addr_city = data[0].findnemus;
          this.addr_area = data[0].findnemus[0].findnemus;
        }
      });
    },
    select_provice(p) {
      this.addr1_code = p;
      this.addr2_code = 0;
      this.addr3_code = 0;
      this.addr_city = this.addr_data[p].findnemus;
      this.addr_area = this.addr_city[0].findnemus;
      this.prvoice_value = this.addr_data[p].name;
      this.city_value = this.addr_city[0].name;
      this.area_value = this.addr_city[0].findnemus[0].name;
      this.prvoice_id = this.addr_data[p].id;
      this.city_id = this.addr_city[0].id;
      this.area_id = this.addr_city[0].findnemus[0].id;
    },
    select_city(c) {
      this.addr2_code = c;
      this.addr3_code = 0;
      this.addr_area = this.addr_city[c].findnemus;
      this.city_value = this.addr_city[c].name;
      this.area_value = this.addr_area[0].name;
      this.city_id = this.addr_city[c].id;
      this.area_id = this.addr_city[c].findnemus[0].id;
    },
    select_area(a) {
      this.addr3_code = a;
      this.area_value = this.addr_area[a].name;
      this.area_id = this.addr_area[a].id;
    },
    addr_cancel() {},
    addr_done() {}
  },
  watch: {},
  computed: {
    skip1() {
      var x = parseInt(this.addr1_code) - 0;
      var y = 150 - x * 44;
      return `marginTop:${y}px`;
    },
    skip2() {
      var x = parseInt(this.addr2_code) - 0;
      var y = 150 - x * 44;
      return `marginTop:${y}px`;
    },
    skip3() {
      var x = parseInt(this.addr3_code) - 0;
      var y = 150 - x * 44;
      return `marginTop:${y}px`;
    }
  }
};
</script>
<style lang="scss">
</style>
