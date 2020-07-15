<template>
<div class="container">
  <ul>
    <!-- v-for="(item,index) in list " -->
    <li class="list-item " data-type="0">
      <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd">
        <img v-if="item.u_logo" class="list-img" :src="item.u_logo" alt="">
        <div class="list-content">
          <p class="title">
            <span v-if="item.u_title" v-text="item.u_title"></span>
            <span v-if="item.u_name">{{item.u_name | titleHidden}}</span>
            <span v-if="item.u_type" class="hot_mark_blue" v-text="item.u_type"></span>
          </p>
          <p v-if="item.u_msg" class="tips">
            <a href="javascript:;" class="content">
              <span v-for="(cell,o) in item.u_msg" :key="o">
                <span v-if="cell">
                  <span v-if="cell.text" v-text="cell.text"></span>
                  <img v-if="cell.url" class="content-image" :src="cell.url" alt="">
                </span>
              </span>
              <span v-if="item.u_msg.constructor === String">{{item.u_msg}}</span>
            </a>
          </p>
          <p v-if="item.u_time" class="time">{{item.u_time}}</p>
        </div>
      </div>
      <div class="delete" @click.stop="deClick" :data-index="index">删除</div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'index',
  props: ["item", "index"],
  data() {
    return {
      list: [
        // {
        //   u_title:
        //   u_name: 'Chrome更新了',
        //   u_logo: './static/images/Chrome.png',
        //   u_msg: '不再支持Flash视频播放',
        //   u_time: '上午 8:30',
        //   u_type: '联系',
        //   u_id:
        // }
      ],
      startX: 0,
      endX: 0,
    }
  },
  methods: {
    jumpLink() { //跳转
      alert(1);
    },
    touchStart(e) { //滑动开始
      // 记录初始位置
      this.startX = e.touches[0].clientX;
    },

    touchEnd(e) { //滑动结束
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement;
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;
      // 左滑
      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide();
        parentElement.dataset.type = 1;
      }
      // 右滑
      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide();
        parentElement.dataset.type = 0;
      }
      this.startX = 0;
      this.endX = 0;
    },

    checkSlide() { //判断当前是否有滑块处于滑动状态
      let listItems = document.querySelectorAll('.list-item');
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true;
        }
      }
      return false;
    },

    restSlide() { //复位滑动状态
      let listItems = document.querySelectorAll('.list-item');
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0;
      }
    },

    deClick() { //删除
      this.$emit('deleteClick');
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    overflow: hidden;
}
.page-title {
    text-align: center;
    font-size: 1rem;
    padding: 10px 15px;
    position: relative;
}
.page-title:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ccc;
    color: #ccc;
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    -moz-transform: scaleY(0.5);
    -o-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
}
.list-item {
    width: 100%;
    position: relative;
    height: 4.6rem;
    // transition: all 0.2s;
    transition: all 0.2s;
}
.list-item[data-type="0"] {
    transform: translate3d(0,0,0);
    -webkit-transform: translate3d(0,0,0);
    -moz-transform: translate3d(0,0,0);
    -o-transform: translate3d(0,0,0);
}
.list-item[data-type="1"] {
    transform: translate3d(-20%,0,0);
    -webkit-transform: translate3d(-20%,0,0);
    -moz-transform: translate3d(-20%,0,0);
    -o-transform: translate3d(-20%,0,0);
}
.list-item:after {
    content: " ";
    position: absolute;
    left: 0.2rem;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #ccc;
    color: #ccc;
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    -moz-transform: scaleY(0.5);
    -o-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
}
.list-box {
    padding: 0.2rem;
    padding-right: 1.1rem;
    background: #fff;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 0;
}
.list-item .list-img {
    display: block;
    margin-left: 12.2px;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
}
.list-item .list-content {
    padding: 0.1rem 0 0.1rem 0.2rem;
    position: relative;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
}
.list-item .title {
    display: block;
    color: #333;
    overflow: hidden;
    font-size: 1rem;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.list-item .tips {
    display: block;
    overflow: hidden;
    font-size: 12px;
    color: #999;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    .content {
        display: flex;
        justify-content: flex-start;
        align-items: start;
        margin-top: 0.25rem;
        margin-left: 0.25rem;
        .content-image {
            width: 22px;
            height: auto;
        }
    }
}
.list-item .time {
    display: block;
    font-size: 12px;
    position: absolute;
    right: 0;
    top: 0.1rem;
    color: #666;
}
.list-item .delete {
    width: 20%;
    background: #ff4949;
    font-size: 17px;
    color: #fff;
    text-align: center;
    position: absolute;
    top: 0;
    right: -20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
