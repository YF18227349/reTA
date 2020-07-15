<template>
    <div class="myBill">
      <div class="header">
          <p @click="jumpBack" class="p1">返回</p>
          <div class="p2">我的余额</div>
      </div> 
      <div class="billcard">
          <div class="money">
              <div class="money-zd">
                  <div class="total-assets">
                      <p class="p1">总资产 (元)</p>
                      <p class="p2">999700...</p>
                  </div>
                  <div class="commis">
                      <p class="p3">佣金 (元)</p>
                      <p class="p4">0</p>
                  </div>
              </div>
              <div class="money-gn">
                  <a href="javascript:;">充值</a>
                  <a href="javascript:;">提现</a>
              </div>
          </div>
      </div>
    </div> 
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    jumpBack() {
      this.$router.back(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.myBill {
  width: 100%;
  height: 1000px;
  background: #fff;
}
.header {
  width: 100%;
  height: 47px;
  background: #2f9bfe;
  display: flex;
  padding: 13px 20px 10px 20px;
  color: #fff;
  .p1 {
    width: 10%;
    font-size: 0.8rem;
    margin: auto 0;
  }
  .p2 {
    width: 80%;
    font-size: 1rem;
    text-align: center;
  }
}
.billcard{
    width:100%;
    height:200px;
    background: linear-gradient(to right,#4384FE,#5958E9);
    .money{
        width:90%;
        height:100%;
        margin:0 auto;
        padding:20px 0 20px 0;
        color: #fff;
        .money-zd{
            display:flex;
            justify-content: space-around;
            width:100%;
            height:70%;
            .total-assets{
                width:50%;
                border-right:1px solid #fff;
                padding-left:20px;
                .p1{
                    font-size: 1.5rem;
                    font-weight: 200;
                }
                .p2{
                    font-size:1.5rem;
                    font-weight: 700;
                    margin-top:30px;
                }
            }
            .commis{
                width:50%;
                padding-left:20px;
                .p3{
                    font-size:1.5rem;
                    font-weight:200;
                }
                .p4{
                    font-size:1.5rem;
                    font-weight: 700;
                    margin-top:30px;
                }
            }
        }
        .money-gn{
            margin-top:10px;
            display: flex;
            justify-content: space-around;
            a{
                width:140px;
                height:40px;
                border:1px solid #fff;
                border-radius:20px;
                text-align: center;
                font-size:1rem;
                line-height:35px;
            }
        }
    }
}
</style>


