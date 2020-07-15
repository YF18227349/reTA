<template >
<div class="order-detail">
  <ul class="list w-100">
    <li class="item w-100 mt-5" v-for="(item,i) of list" :key='i'>
      <a href="javascript:;" @click="jumpChatroom(item.sign, item.gid, item.toUid)">
        <h4 class="item-title w-100 mt-2">
          <img v-if="item.pic" :src="item.pic" alt="" class="mr-3">
          <span>
            <span v-text="item.title"></span>
          </span>
        </h4>

        <div class="item-label w-100 mt-2">
          <div class="label-left fc-gray w-50">
            <span v-text="item.label"></span>
          </div>
          <div class="label-right fc-red w-50">
            <span v-text="item.salary"></span>
          </div>
        </div>

        <div class="item-content w-100 mt-3">
          <div class="item-addr fc-gray w-100">
            <span class="title">地址：</span>
            <span class="content">{{item.addr}}</span>
          </div>
          <div class="item-info mt-2 w-100">
            <span class="title">描述：</span>
            <span class="content">{{item.info | contentHidden}}</span>
          </div>
        </div>
      </a>

      <div class="item-btns mt-3 w-100 mt-2">
        <div class="item-btns-box pt-4">
          <!-- 提示 -->
          <div class="box-info">
            <!-- <span>s</span> -->
          </div>
          <!-- 按钮 -->
          <div class="box-btns">
            <!-- status[ 2=>已同意, 5=>同意拒绝, 7=>等待双方完成 ] -->
            <!--2=>已同意-->
            <span v-if="item.status==2 || (item.code == 0)" @click="handelArgee(item.orderIds,i)" class="btn mr-3 mar-none">完成订单</span>
            <!--5=>同意拒绝-->
            <span v-else-if="item.status==5 || (item.code == -1)" class="mr-3 mar-none fc-blue fs-3">{{item.btnMsg}}</span>
            <!--7=>等待双方完成-->
            <span v-else-if="item.status==7 || (item.code == 2)" @click="jumpComment(item.btnMsg,item.gid)" class="mr-3 mar-none fc-blue fs-3" style="color:#272525; font-weight: 600;">{{item.btnMsg}}</span>
          </div>
        </div>
      </div>
    </li>
  </ul>
  <self-no-data v-if="list.length==0" :title="`暂无数据...`"></self-no-data>
</div>
</template>
<script>
const NoData = ()=>import("../sub/noDataModel");
export default {
  data() {
    return {
      rid: null,
      pageInfo: {
        headerTitle: ''
      },
      params: {
        isRelease: '',
        length: 15,
        ordersStatus: '',
        ordersType: '',
        page: '',
        pid: '',
        sign: '',
        title: '',
        token: ''
      },
      list: [
        // {
        //   title: item.title,
        //   pic: item.portrait,
        //   label: item.quartersType,
        //   salary: item.prices,
        //   info: item.infos,
        //   addr: item.addressInfo,
        //   status: val.buttonStatus.communicateStatus,
        //   btnMsg: val.buttonStatus.msg,
        //   gid: val.goodId,
        //   sign: val.goodType,
        //   toUid: val.userId,
        //   orderIds: val.orderId
        // }
      ]
    }
  },
  created() {
    //do something after creating vue instance
    this.selfMainLoadOpend();
    this.getPostInfo();
  },
  methods: {
    getPostInfo() {
      var query = this.getQuery();
      this.params = query;
      this.pageInfo.header_title = query.title;
      this.$store.commit("setHeaderStyle", {
        txt: this.pageInfo.header_title,
        type: 1
      });
      var rid = this.getCache('userInfoExt', 2).rid;
      this.rid = rid;
      this.getPageInfo()
    },

    getPageInfo() {
      var url = 'Tloong-orderList';
      var params = this.params;
      this.__initAction(url, params, (res, s) => {
        if (s == 1) {
          var data = res.data;
          this.list = [];
          this.showData(data);
        } else {
          this.selfMainLoadClosed()
        }
      })
    },

    showData(data) {
      var sign = this.params.sign;
      try {
        var str = sign.toString();
      } catch (e) {
        if (!str) {
          console.error(e);
          this.$router.back(-1);
        } else {
          str = sign
        }
      }

      switch (str) {
        case 'quarters':
          if (this.rid == 1) {
            data.map((val, i) => {
              var item = val.goodInfo;
              var obj = {};
              obj.title = item.title;
              obj.pic = item.portrait;
              obj.label = item.quartersType;
              obj.salary = item.prices;
              obj.info = item.infos;
              obj.addr = item.addressInfo;
              obj.toUid = item.userId;
              obj.status = val.buttonStatus.communicateStatus;
              obj.orderIds = val.buttonStatus.orderId;
              obj.btnMsg = val.buttonStatus.msg;
              obj.code = val.buttonStatus.communicateCode
              obj.gid = val.goodId;
              obj.sign = val.goodType;
              this.list.push(obj);
            })
          } else if (this.rid == 2) {
            data.map((val, i) => {
              var item = val.goodInfo;
              var obj = {};
              obj.title = item.consignee;
              obj.pic = item.portrait;
              obj.label = item.resumeIndustry;
              obj.salary = item.salary;
              obj.info = item.infos;
              obj.addr = item.addressInfo;
              obj.toUid = item.userId;
              obj.status = val.buttonStatus.communicateStatus;
              obj.orderIds = val.buttonStatus.orderId;
              obj.btnMsg = val.buttonStatus.msg;
              obj.code = val.buttonStatus.communicateCode
              obj.gid = val.goodId;
              obj.sign = val.goodType;
              this.list.push(obj);
            })
          }
          break;
        case 'resume':
          if (this.rid == 1) {
            data.map((val, i) => {
              var item = val.goodInfo;
              var obj = {};
              obj.title = item.title;
              obj.pic = item.portrait;
              obj.label = item.quartersType;
              obj.salary = item.prices;
              obj.info = item.infos;
              obj.addr = item.addressInfo;
              obj.toUid = item.userId;
              obj.status = val.buttonStatus.communicateStatus;
              obj.orderIds = val.buttonStatus.orderId;
              obj.btnMsg = val.buttonStatus.msg;
              obj.code = val.buttonStatus.communicateCode
              obj.gid = val.goodId;
              obj.sign = val.goodType;
              this.list.push(obj);
            })
          } else if (this.rid == 2) {

          }
          break;
      };
      this.selfMainLoadClosed()
    },

    jumpChatroom(sign, gid, toUid) {
      var query = {
        sign,
        gid,
        toUid
      };
      if (this.rid == 1) {
        this.$router.push({
          path: `/interviewer_chat/${gid}`,
          query
        });
      } else if (this.rid == 2) {
        this.$router.push({
          path: `/interview_chat/${gid}`,
          query
        });
      }
    },

    jumpComment(str, gid) {
      if (str == '已完成请评价') {
        this.$router.push(`/evaluate/${gid}`)
      }
    },

    handelArgee(orderIds, i) {
      var that = this;
      that.$dialog.confirm({
        title: '订单完成',
        mes: '是否确认完成订单',
        opts: () => {
          that.sendArgee(orderIds);
        }
      });
    },

    sendArgee(orderIds) {
      var token = this.getToken();
      var ordersId = orderIds;
      var uppInfo = 1;
      var params = {
        token,
        ordersId,
        uppInfo
      };
      var url = 'Tloong-orderUpp';
      var that = this;
      that.__initAction(url, params, (res, s) => {
        if (s == 1) {
          this.getPageInfo()
        } else {

        }
      })
    }

  },

  components: {
    'self-no-data': NoData
  }
}
</script>
<style lang="scss" scoped>
.order-detail {
    .list {
        font-size: 14px;
    }
    .item {
        padding: 15px;
        background: #fff;
        a {
            width: 100%;
            display: inline-block;
        }
    }
    .item-title {
        font-size: 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        align-self: center;
        img {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 50%;
            border: 1px solid #ccc;
        }
    }
    .item-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-self: center;
    }
    .label-left {
        text-align: left;
        span {
            border-radius: 0.1rem;
            background: #efe9e9;
            padding: 0 0.5rem;
        }
    }
    .label-right {
        text-align: right;
        span {
            font-size: 14px;
            font-weight: 600;
        }
    }
    .item-addr {
        display: flex;
        .title {
            font-size: 14px;
            font-weight: 600;
            color: #000;
            width: 13.2%;
        }
        .content {
            display: inline-block;
            width: 86.8%;
        }
    }
    .item-info {
        display: flex;
        .title {
            font-size: 14px;
            font-weight: 600;
            color: #000;
            min-width: 12.2%;
            max-width: 13.2%;
        }
        .content {
            display: inline-block;
            min-width: 86.8%;
            max-width: 87.8%;
        }
    }
    .item-btns {
        border-top: 1px solid #cccccc52;
    }
    .item-btns-box {
        display: flex;
        justify-content: space-between;
        .box-info {
            text-align: left;
        }
        .box-btns {
            display: flex;
            justify-content: flex-end;
            .btn {
                height: 1.7rem;
                padding: 0 20px;
                border-radius: 0.3rem;
                color: #fff;
                background: #2f9bfe;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
        .box-btns .mar-none:last-child {
            margin-right: 0;
        }
    }
}
</style>
