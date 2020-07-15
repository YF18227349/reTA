<template>
  <div class="order w-100">
    <header class="order_header bg-blue" ref="oneBarEle">
      <a href="javascript:history.go(-1)" class="arrow-logo iconfont icon-previewleft"></a>
      <div class="header_title_group">
        <a
          href="javascript:;"
          class="header_title"
          v-for="(item,i) in pageInfo.header_title"
          :key="i"
          :class="header_code==i?'bg-white fc-dark':'bg-blue fc-white br-white'"
          @click="headerTopAction(i,item.type)"
        >{{item.title}}</a>
      </div>
      <a href="javascript:;" class="last"></a>
    </header>
    <div class="clear-fixed"></div>
    <div class="order_group w-100">
      <ul class="order_tabs bg-white" :style="towPosition" ref="towBarEle">
        <li v-for="(item,i) in midNavBarList" :key="i" class="tab_item">
          <a
            href="javascript:;"
            class="item"
            :class="tabCode==i?'selectTab':'unSelectTab'"
            @click="headerMiddleAction(i,item.ordersType)"
          >{{item.title}}</a>
        </li>
      </ul>
      <!-- 简历不展示列表    v-if="rid==2 || (ordersType!=2 || (ordersType==2 && type==2))" -->
      <ul
        class="demand_tabbar w-100"
        :style="threePosition"
        v-if="rid==2 || (ordersType!=3 || (ordersType==3 && type==2))"
        ref="threeBarEle"
      >
        <li
          class="tabbar_item w-100"
          :style="threeBarStyle"
          v-for="(item,i) in demandTabbarList"
          :key="i"
        >
          <a
            class="item"
            href="javascript:;"
            :class="item_code==i?'bg-white':''"
            @click="headerBottomAction(i,item.status)"
          >{{item.title}}</a>
        </li>
      </ul>
      <div class="w-100" :style="barFlexSize"></div>

      <div class="order_demand w-100">
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
          <div class="demand_list w-100 mt-5" slot="list">
            <a
              href="javascript:;"
              class="demand_list_item"
              v-for="(item,j) in order_data_list"
              :key="j"
            >
              <ul class="item_info w-100 bg-whtie" @click="regDoJump(item.pid,item.jumpCode)">
                <li class="item_title">
                  <span class="fw-6">{{item.title}}</span>
                </li>
                <li class="item_detail">
                  <div class="detail_info">
                    <span class="detail_name">{{item.title}}</span>
                    <span
                      class="item_icon iconfont"
                      :class="item.rid==1?'icon-renzheng fc-green':'icon-3qiyezhengxin83a638 fc-blue'"
                    ></span>
                  </div>
                  <div class="detail_salary">
                    <span class="salary fc-red fw-5">{{item.salary}}</span>
                  </div>
                </li>
                <li>
                  <div class>{{item.infos}}</div>
                </li>
                <!-- 简历 -->
                <li v-if="item.resumeId">
                  <router-link :to="`/resumeinfo/${item.resumeId}`" class="w-100">
                    <h1>
                      <span class="fs-3 fc-dark fw-4 mt-3">
                        <strong>投递人:</strong>
                      </span>
                      <span>{{item.rName}}</span>
                    </h1>
                    <p class="fs-3 fc-dark fw-4 mt-3">
                      <span>
                        <strong>简历详情:</strong>
                      </span>
                      <span>{{item.infos | headerHidden}}</span>
                    </p>
                  </router-link>
                </li>
                <li v-if="pageInfo.showListStr" class="item-jump">
                  <a href="javascript:;">{{pageInfo.showListStr}}</a>
                </li>
                <!-- 按钮 -->
                <li class="item_state">
                  <span class="detail_time">{{item.time}}</span>
                  <div class="type0" v-if="item.state==1">
                    <a href="javascript:;" class="bg-green fc-white br-green">确认完成</a>
                  </div>
                </li>
                <!-- 
                <div class="type0">
                  <a href="javascript:;" class="bg-green fc-white br-green">同意</a>
                  <a href="javascript:;" class="bg-red fc-white bg-red">拒绝</a>
                </div>

                <span class="detail_time">{{item.time}}</span>


                <div class="type0">
                  <a href="javascript:;" class="bg-green fc-white br-green">确认完成</a>
                </div>

                <span class="type1 fc-blue fs-3">待接受</span>

                <div class="type2">
                  <a href="javascript:;" class="bg-white fc-yellow br-yellow">待评价</a>
                </div>
                
                <div class="type0" >
                  <span class="type3 fc-gray fs-3">已结束</span>
                  <router-link  :to="`/evaluate/${item.id}`" class="bg-white fc-dark br-dark">去评价</router-link>
                </div>
                -->
              </ul>
            </a>
            <div v-if="order_data_list.length<=0" class="no-data-index">
              <self-no-data title="暂无数据..."></self-no-data>
            </div>
          </div>
        </yd-infinitescroll>
        <self-load-frame></self-load-frame>
      </div>
    </div>
  </div>
</template>

<script>
const NoData = ()=>import("../sub/noDataModel");
const LoadFrame = ()=>import("../sub/loading_frame");
export default {
  data() {
    return {
      header_code: 0, //顶部导航code
      tabCode: 0, //中间导航code
      item_code: 0, //底部导航code
      pageInfo: {
        header_title: [
          {
            title: "我的发布",
            type: 1
          },
          {
            title: "接受订单",
            type: 2
          }
        ],
        token: "",
        showListStr: ""
      },
      baseUid: "",
      rid: "",
      showBarDom: null, //类型导航栏控制
      type: 1, //订单分类
      ordersType: 0, //订单类型
      ordersStatus: 0, //订单状态
      page: 0, //分页页数
      length: 15, //分页长度
      count: null,
      tabList: [
        [
          {
            title: "兼职",
            ordersType: 0 //发布类型
          },
          {
            title: "技能",
            ordersType: 1 //发布类型
          },
          {
            title: "岗位",
            ordersType: 2 //发布类型
          }
        ],
        [
          {
            title: "兼职",
            ordersType: 0 //发布类型
          },
          {
            title: "技能",
            ordersType: 1 //发布类型
          },
          {
            title: "简历",
            ordersType: 3 //发布类型
          }
          // {
          //   title: "岗位",
          //   ordersType: 2 //发布类型
          // },
        ]
      ],
      demand_tabbar_list: [
        {
          title: "全部",
          status: 0 //订单状态
        },
        {
          title: "待接受",
          status: 1
        },
        {
          title: "进行中",
          status: 2
        },
        {
          title: "待确认",
          status: 3
        },
        {
          title: "已结束",
          status: 4
        }
      ],
      demand_tabbar_list1: [
        {
          title: "全部",
          status: 0 //订单状态
        },
        {
          title: "进行中",
          status: 2
        },
        {
          title: "待确认",
          status: 3
        },
        {
          title: "已结束",
          status: 4
        }
      ],
      threeBarStyle: {
        width: true
      },
      demandList: [
        {
          title: "小学生习题卷该对错180薪",
          name: "无聊的大螃蟹",
          type: 0,
          salary: 180,
          time: "2019-02-18",
          state: 1 //0--是否接单, 1--进行中，2--已完成，未评价，3--评价完成
        },
        {
          title: "小学生习题卷该对错180薪",
          name: "无聊的大螃蟹",
          type: 0,
          salary: 180,
          time: "2019-02-18",
          state: 0 //0--是否接单, 1--进行中，2--已完成，未评价，3--评价完成
        },
        {
          title: "小学生习题卷该对错180薪",
          name: "无聊的大螃蟹",
          type: 0,
          salary: 180,
          time: "2019-02-18",
          state: 2 //0--是否接单, 1--进行中，2--已完成，未评价，3--评价完成
        },
        {
          title: "小学生习题卷该对错180薪",
          name: "无聊的大螃蟹",
          type: 0,
          salary: 180,
          time: "2019-02-18",
          state: 3 //0--是否接单, 1--进行中，2--已完成，未评价，3--评价完成
        }
      ],
      barFlexSize: {
        height: true
      },
      towPosition: {
        top: true,
        left: 0
      },
      threePosition: {
        top: true,
        left: 0
      },
      postParams: null
    };
  },
  created() {
    this.selfMainLoadOpend();
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 0
    });
    this.init();
  },
  mounted() {
    //do something after mounting vue instance
    this.handleFlexSize(null);
  },
  destroyed() {
    //do something after destroying vue instance
    this.saveNavBar();
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
      //获得口令
      var info = this.getUserInfo();
      this.pageInfo.token = info.token;
      this.baseUid = info.uid;
      //根据用户类型更换不同的导航栏
      var infoExt = this.getCache("userInfoExt", 2);
      var rid = infoExt.rid;
      this.rid = rid;
      if (rid == 1) {
        this.showBarDom = 1;
      } else if (rid == 2) {
        this.showBarDom = 0;
      }
      var navBar = this.getCache("ORDER_INFO", 2);
      if (navBar) {
        this.header_code = navBar.headerCode;
        this.header_code == 0 ? (this.type = 1) : (this.type = 2);
        this.tabCode = navBar.tabCode;
        this.item_code = navBar.itemCode;
      }
      this.getDataList();
    },

    saveNavBar() {
      var headerCode = this.header_code;
      var tabCode = this.tabCode;
      var itemCode = this.item_code;
      var info = {
        headerCode,
        tabCode,
        itemCode
      };
      info = JSON.stringify(info);
      this.setCache("ORDER_INFO", info);
    },

    handleFlexSize(bool) {
      if (this.$refs.oneBarEle) {
        var oneHeight = this.$refs.oneBarEle.offsetHeight;
        this.towPosition.top = `${oneHeight}px`;
        if (this.$refs.towBarEle) {
          var towHight = this.$refs.towBarEle.offsetHeight;
          this.threePosition.top = `${oneHeight + towHight}px`;
          if (this.$refs.threeBarEle) {
            var threeHight = this.$refs.threeBarEle.offsetHeight;
            if (this.rid == 1) {
              if (this.header_code == 0 && this.tabCode == 2) {
                this.barFlexSize.height = `${towHight}px`;
              } else {
                this.barFlexSize.height = `${towHight + threeHight}px`;
              }
            } else if (this.rid == 2) {
              this.barFlexSize.height = `${towHight + threeHight}px`;
            }
          } else {
            this.barFlexSize.height = `${towHight}px`;
          }
        }
      }
    },

    regDoJump(pid, code) {
      var topCode = parseInt(this.type);
      var midCode = parseInt(this.ordersType);
      var query = this.postParams;
      query.pid = pid;
      switch (topCode) {
        case 1: // 我的发布
          if (this.rid == 1) {
            //-个人用户
            switch (midCode) {
              case 3: //简历
                if (code == 0) return this._msg("暂无相关");
                query.title = "相关岗位";
                query.sign = "quarters";
                setTimeout(() => {
                  this.$router.push({
                    path: "/orderdetail",
                    query
                  });
                }, 200);
                break;
            }
          } else if (this.rid == 2) {
            //-企业用户
            switch (midCode) {
              case 2:
                if (code == 0) return this._msg("暂无相关");
                query.title = "相关简历";
                query.sign = "quarters";
                setTimeout(() => {
                  this.$router.push({
                    path: "/orderdetail",
                    query
                  });
                }, 200);
                break;
              default:
            }
          }
          break;
        case 2: //接受订单
          if (this.rid == 1) {
            //-个人用户
            if (code == 0) return this._msg("暂无相关");
            query.title = "相关岗位";
            query.sign = "resume";
            setTimeout(() => {
              this.$router.push({
                path: "/orderdetail",
                query
              });
            }, 200);
          } else if (this.rid == 2) {
            //-企业用户
          }
          break;
      }
    },

    getDataList() {
      var token = this.getToken();
      this.headerTopAction(this.header_code, this.type);
    },

    /**
     *--顶部导航栏参数处理数据加载--
     *@param indexs: 0 = 我的发布 1 = 接受的订单
     *@type 1=我的发布 2=接受的订单
     */
    headerTopAction(indexs, types) {
      this.demandList = [];
      this.header_code = indexs;
      let index = indexs;
      let type = types;
      if (this.rid == 1) {
        if (index == 0) {
          this.showBarDom = 1;
        } else if (index == 1) {
          this.showBarDom = 0;
        }
      } else if (this.rid == 2) {
        if (index == 0) {
          this.showBarDom = 0;
        } else if (index == 1) {
          this.showBarDom = 1;
        }
      }
      //初始子导航、孙子导航状态
      var navBar = this.getCache("ORDER_INFO", 2);
      if (!navBar) {
        this.tabCode = 0;
        this.item_code = 0;
        this.ordersType = 0;
      } else {
        var ordersList = this.tabList[this.showBarDom];
        var ordersType = ordersList[this.tabCode].ordersType;
        this.ordersType = ordersType;
      }
      this.type = type;
      this.ordersStatus = 0;
      let param = {
        isRelease: this.type,
        ordersType: this.ordersType,
        ordersStatus: this.ordersStatus,
        page: this.page,
        length: this.length
      };
      this.getInfoList(param);
    },

    /**
     *--中间导航栏参数处理数据加载--
     *@param indexs 0 = 兼职， 1 = 技能，  2 = 岗位&简历；
     *@type ordersTypes 0 = 兼职，1 = 技能，2 =岗位，2 = 简历；
     */
    headerMiddleAction(indexs, ordersTypes) {
      this.demandList = [];
      let index = indexs;
      let ordersType = ordersTypes;
      //初始孙子导航状态
      this.tabCode = indexs;
      this.item_code = 0;
      this.ordersStatus = 0;
      this.ordersType = ordersType;
      let param = {
        isRelease: this.type,
        ordersType: this.ordersType,
        ordersStatus: this.ordersStatus,
        page: this.page,
        length: this.length
      };
      this.getInfoList(param);
    },

    /**
     *--底部导航栏参数处理数据加载--
     *@param indexs 0 = 全部， 1 = 待接受， 2 = 进行中， 3 = 已完成， 4 = 已结束；
     *@type ordersTypes 0 = 全部， 1 = 待接受， 2 = 进行中， 3 = 已完成， 4 = 已结束；
     */
    headerBottomAction(indexs, ordersStatuses) {
      this.demandList = [];
      this.item_code = indexs;
      let index = indexs;
      let ordersStatus = ordersStatuses;
      this.ordersStatus = ordersStatus;
      let param = {
        isRelease: this.type,
        ordersType: this.ordersType,
        ordersStatus: this.ordersStatus,
        page: this.page,
        length: this.length
      };
      this.getInfoList(param);
    },

    getInfoList(param) {
      this.selfLoadOpend({
        mes: "",
        color: "fc-blue",
        font: 30,
        status: true
      });
      var url = "Tloong-orderList";
      var token = this.getToken();
      var params = param;
      params.token = token;
      params.pid = 0;
      this.postParams = params; //save post info
      // console.log(this.ordersType, this.rid, this.type, 9000);
      this.__initAction(url, params, (res, s) => {
        if (s == 1) {
          let data = res.data;
          this.showData(data, this.ordersType, this.rid, this.type);
        } else {
          this.demandList = [];
          // this._msg(res.info);
          this.__Sleep(e => {
            this.selfMainLoadClosed();
          }, 1000);
        }
        this.selfLoadClosed();
        this.__Sleep(e => {
          this.selfMainLoadClosed();
        }, 1000);
        this.handleFlexSize(null);
      });
    },

    /**
     *@method showData  显示函数
     *@param{data}数据
     *@param{orderId}导航索引 0#兼职,1#技能,2#岗位
     *@param{rid}用户类型 1#个人用户,2#企业用户
     *@param{type}顶部导航 1#我的发布,2#接受订单
     *@sing  demands #兼职 skills #技能 quarters #岗位  resume #简历
     */
    showData(data, orderId, rid, type) {
      if (rid.constructor !== Number) {
        rid = parseInt(rid);
      }
      if (orderId.constructor !== Number) {
        orderId = parseInt(orderId);
      }
      switch (
        rid //用户类型
      ) {
        case 1: //--个人用户--
          if (type == 1) {
            // **我的发布**
            switch (orderId) {
              case 0: //兼职
                data.map((item, i) => {
                  let obj = {};
                  obj.title = item.title;
                  obj.name = item.lastName;
                  obj.salary =
                    item.money.indexOf("无保证金") != -1
                      ? `${item.money}`
                      : `￥${item.money}/天`;
                  obj.time = item.startTime;
                  obj.state = item.status;
                  obj.pid = item.id; //项目id
                  obj.uid = item.userId; //预约用户id
                  // obj.sign = item.goodType; //标识符
                  obj.sign = "demands"; //标识符
                  obj.type = item.rid; //项目类型
                  obj.id = item.id;
                  obj.type = item.role;
                  obj.infos = item.infos;
                  obj.createUid = item.createUid;
                  obj.jumpCode = item.preOrderCount;
                  this.demandList.push(obj);
                });
                this.pageInfo.showListStr = "";
                break;
              case 1: //技能
                data.map((item, i) => {
                  console.log(item);
                  let obj = {};
                  obj.title = item.title;
                  obj.name = item.lastName;
                  obj.salary = `${item.price}元/${item.unit}`;
                  // obj.salary = item.price + item.unit;
                  obj.time = item.startTime;
                  obj.state = item.status;
                  obj.pid = item.id; //项目id
                  obj.uid = item.userId; //预约用户id
                  // obj.sign = item.goodType; //标识符
                  obj.sign = "skills"; //标识符
                  obj.type = item.rid; //项目类型
                  obj.id = item.id;
                  obj.type = item.role;
                  obj.infos = item.infos;
                  obj.createUid = item.createUid;
                  obj.jumpCode = item.preOrderCount;
                  this.demandList.push(obj);
                });
                this.pageInfo.showListStr = "";
                break;
              case 2: //岗位
                data.map((item, i) => {
                  let obj = {};
                  obj.title = item.title;
                  obj.name = item.lastName;
                  obj.salary = "";
                  obj.time = item.startTime;
                  obj.state = item.status;
                  obj.pid = item.id; //项目id
                  obj.uid = item.userId; //预约用户id
                  // obj.sign = item.goodType; //标识符
                  obj.sign = "quarters"; //标识符
                  obj.type = item.rid; //项目类型
                  obj.id = item.id;
                  obj.type = item.role;
                  obj.infos = item.infos;
                  obj.createUid = item.createUid;
                  obj.jumpCode = item.preOrderCount;
                  this.demandList.push(obj);
                });
                this.pageInfo.showListStr = "";
                break;
              case 3: //简历
                data.map((item, i) => {
                  console.log(item);
                  let obj = {};
                  obj.title = item.consignee;
                  obj.name = item.lastName;
                  obj.salary = item.salary;
                  obj.time = item.startTime;
                  obj.state = item.status;
                  obj.pid = item.id; //项目id
                  obj.uid = item.userId; //预约用户id
                  // obj.sign = item.goodType; //标识符
                  obj.sign = "quarters"; //标识符
                  obj.type = item.rid; //项目类型
                  obj.id = item.id;
                  obj.type = item.role;
                  obj.infos = item.infos;
                  obj.createUid = item.createUid;
                  obj.jumpCode = item.preOrderCount;
                  this.demandList.push(obj);
                });
                this.pageInfo.showListStr = "点击查看相关岗位";
                break;
            }
          } else if (type == 2) {
            // **接受订单**
            switch (orderId) {
              case 0: //兼职
                console.log(data, "兼职");
                break;
              case 1: //技能
                console.log(data, "技能");
                break;
              case 2: //岗位
                console.log(data, "岗位");
                data.map((val, i) => {
                  var item = val;
                  console.log(item);
                  let obj = {};
                  obj.title = item.consignee;
                  obj.name = item.lastName;
                  obj.salary = item.salary;
                  obj.time = item.startTime;
                  obj.state = item.status;
                  obj.pid = item.id; //项目id
                  obj.uid = item.userId; //预约用户id
                  // obj.sign = item.goodType; //标识符
                  obj.sign = "quarters"; //标识符
                  obj.type = item.rid; //项目类型
                  obj.id = item.id;
                  obj.type = item.role;
                  obj.infos = item.infos;
                  obj.createUid = item.createUid;
                  obj.jumpCode = item.preOrderCount;
                  this.demandList.push(obj);
                });
                this.pageInfo.showListStr = "点击查看相关岗位";
                break;
            }
          }
          break;
        case 2: //--企业用户--
          if (type == 1) {
            // **我的发布**
            switch (orderId) {
              case 0: //兼职
                console.log(data, "兼职");
                data.map((item, i) => {
                  let obj = {};
                  obj.title = item.title;
                  obj.name = item.lastName;
                  obj.salary =
                    item.money.indexOf("无保证金") != -1
                      ? `${item.money}`
                      : `￥${item.money}/天`;
                  obj.time = item.startTime;
                  obj.state = item.status;
                  obj.pid = item.id; //项目id
                  obj.uid = item.userId; //预约用户id
                  // obj.sign = item.goodType; //标识符
                  obj.sign = "demands"; //标识符
                  obj.type = item.rid; //项目类型
                  obj.id = item.id;
                  obj.type = item.role;
                  obj.infos = item.infos;
                  obj.createUid = item.createUid;
                  obj.jumpCode = item.preOrderCount;
                  this.demandList.push(obj);
                });
                this.pageInfo.showListStr = "";
                break;
              case 1: //技能
                console.log(data, "技能");
                break;
              case 2: //岗位
                console.log(data, "岗位");
                data.map((item, i) => {
                  let obj = {};
                  obj.title = item.title;
                  obj.name = item.lastName;
                  obj.salary = "";
                  obj.time = item.startTime;
                  obj.state = item.status;
                  obj.pid = item.id; //项目id
                  obj.uid = item.userId; //预约用户id
                  // obj.sign = item.goodType; //标识符
                  obj.sign = "quarters"; //标识符
                  obj.type = item.rid; //项目类型
                  obj.id = item.id;
                  obj.type = item.role;
                  obj.infos = item.infos;
                  obj.createUid = item.createUid;
                  obj.jumpCode = item.preOrderCount;
                  this.demandList.push(obj);
                });
                this.pageInfo.showListStr = "点击查看相关简历";
                break;
            }
          } else if (type == 2) {
            // **接受订单**
            switch (orderId) {
              case 0: //兼职
                console.log(data, "兼职");
                break;
              case 1: //技能
                console.log(data, "技能");
                break;
              case 2: //岗位
                console.log(data, "岗位");
                break;
            }
          }
          break;
      }
    },

    loadList() {
      var count = this.count;
      var len = this.length;
      var MaxPage = Math.ceil(count / len);
      var next = this.page + 1;
      if (MaxPage == next) {
        this.selfLoadOpend({
          mes: "没有更多数据了",
          status: false
        });
        setTimeout(() => {
          this.selfLoadClosed();
        }, 1500);
        return;
      } else {
        this.selfLoadOpend({
          mes: "",
          color: "fc-blue",
          font: 30,
          status: true
        });
        this.getMore(next);
      }
    },

    getMore(page) {
      let param = {
        isRelease: this.type,
        ordersType: this.ordersType,
        ordersStatus: this.ordersStatus,
        page: page,
        length: this.length
      };
      this.getInfoList(param);
    },

    updatedStatus(i, gid, sign, index) {
      console.log(i, gid, sign, index);
      return;
      var goodsInfo = `${sign}|${gid}`;
      var c_status = i;
      var token = this.getToken();
      var url = "Tloong-getSwopUpd";
      var params = {
        goodsInfo,
        c_status,
        token
      };
      this._log(params);
      this.__initAction(url, params, (res, s) => {
        if (s == 1) {
          setTimeout(() => {
            this._msg("确认成功");
            if (i == 7) {
              //i == 7确认订单
              this.demandList[index].state = 3;
            } else if (i == 8) {
              //i == 7确认完成
              this.demandList[index].state = 4;
            }
          }, 500);
        }
      });
    }
  },

  computed: {
    order_data_list() {
      var code = this.item_code;
      return this.demandList;
    },

    demandTabbarList() {
      //计算三级导航
      var type = parseInt(this.type);
      var order = this.ordersType;
      switch (type) {
        case 1: //我的发布
          if (order == 0) {
            //兼职
            this.demand_tabbar_list[3].title = "待确认";
            this.threeBarStyle.width = `20%`;
            return this.demand_tabbar_list;
          } else if (order == 1) {
            //技能
            this.demand_tabbar_list[3].title = "待评价";
            this.threeBarStyle.width = `20%`;
            return this.demand_tabbar_list;
          } else if (order == 2) {
            //岗位
            this.demand_tabbar_list[3].title = "待确认";
            this.threeBarStyle.width = `20%`;
            return this.demand_tabbar_list;
          }
          break;
        case 2: //接受订单
          if (order == 0) {
            //兼职
            this.demand_tabbar_list[3].title = "待确认";
            this.threeBarStyle.width = `20%`;
            return this.demand_tabbar_list;
          } else if (order == 1) {
            //技能
            this.demand_tabbar_list[3].title = "待确认";
            this.threeBarStyle.width = `25%`;
            return this.demand_tabbar_list1;
          } else if (order == 2) {
            //岗位
            this.demand_tabbar_list[3].title = "待确认";
            this.threeBarStyle.width = `20%`;
            return this.demand_tabbar_list;
          } else if (order == 3) {
            this.threeBarStyle.width = `25%`;
            return this.demand_tabbar_list;
          }
          break;
      }
    },

    midNavBarList() {
      return this.tabList[this.showBarDom];
    }
  },

  components: {
    "self-no-data": NoData,
    "self-load-frame": LoadFrame
  }
};
</script>

<style lang="scss" scoped>
.order {
  .selectTab {
    color: #007aff;
    border-bottom: 2px solid #007aff;
  }
  .unSelectTab {
    color: #000;
    border-bottom: 2px solid transparent;
  }
  .no-data-index {
    margin-top: 5rem;
  }
  .order_group
    .order_demand
    .demand_list
    .demand_list_item
    .item_info
    li.item-jump {
    color: #09f;
    font-size: 14px;
    border-top: 1px solid #cccccc52;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
