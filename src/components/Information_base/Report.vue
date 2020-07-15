<template>
<div class="report">
  <div class="mt-3 w-100 bg-white pt-3 pb-3 pl-2 pr-2 border-bottom">
    <yd-icon name="feedback" size="1rem" color="#ff685d"></yd-icon>
    <span class="fw-6 fs-3">情况说明</span>
  </div>
  <div class="text-content">
    <div>
      <textarea maxlength="200" class="text-cell" cols="200" rows="10" placeholder="请尽量详细反映情况，以便我们即使正确处理你的举报（最多200字）" v-model="textContent" :style="textStyle"></textarea>
      <p class="f-right fc-gray pr-1">
        <span>{{textNum}}/200</span>
      </p>
    </div>
  </div>

  <!-- 联系方式 -->
  <div class="mt-3 w-100">
    <ul class="tel">
      <li class="tel-item">
        <span class="tel-icon-logo">
          <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5679">
            <path
              d="M825.6 64H198.4A134.4 134.4 0 0 0 64 198.4v627.2A134.4 134.4 0 0 0 198.4 960h627.2a134.4 134.4 0 0 0 134.4-134.4V198.4A134.4 134.4 0 0 0 825.6 64zM166.016 795.584H64.384v-59.776h101.632v59.776z m0-119.52H106.24v-59.776h59.776v59.776z m0-119.552H64.384v-59.776h101.632v59.776z m0-119.552H106.24v-59.776h59.776v59.776z m0-119.52H64.384V257.664h101.632V317.44z m571.232 477.696c-74.304 0-224.928-76.32-297.184-148.576-72.256-72.288-148.608-222.912-148.608-297.184 0 0 56.928-91.712 94.08-91.712s148.608 111.456 111.456 148.608c-37.152 37.12-74.304 37.12-74.304 74.272 0 37.152 37.152 74.272 74.304 111.456 37.152 37.152 74.304 74.304 111.456 74.304s37.152-37.152 74.304-74.304 148.608 74.304 148.608 111.456c-0.032 37.152-94.112 91.68-94.112 91.68z"
              fill p-id="5680"></path>
          </svg>
        </span>
        <span class="fw-6 fs-3">你的联系方式</span>
      </li>
      <li class="tel-item">
        <input type="tel" placeholder="请输入您的联系方式" v-model="phone">
      </li>
    </ul>
  </div>

  <div class="list_item item_photo mt-3">
    <p class="fs-3 fc-dark fw-6 mt-1 mb-2">添加图片</p>
    <div class="photo_container">
      <a href="javascript:;" class="photos bg-gray mr-2" v-for="(tmp,i) in photoList" :key="i">
        <span class="del-img" v-if="!tmp.code" @click="delImage(i)">
          <span class="iconfont icon-error fc-dark"></span>
        </span>
          <img class="showImg" :src="tmp.logo" alt>
          <input v-if="photo_count < 4" type="file" :id="'files'+i" class="file_input" @click="do_add()" @change="imports(i)" accept="image/*">
      </a>
    </div>
  </div>

  <a href="javascript:;" class="reprot_btn bg-blue w-100 mt-5" @click="doReport()">
    <span class="fc-white fm-2 fw-6">举报</span>
  </a>

</div>
</template>

<script>
export default {
  data() {
    return {
      pageInfo: {
        header_title: "举报职位"
      },
      textContent: "",
      textNum: 0,
      textStyle: {
        readonly: true
      },
      photo_count: 1,
      showImg:true,
      photoList: [{
        logo: "static/imgs/add-pic.png",
        code: "val"
      }],
      phone: ""
    };
  },
  created() {
    this.selfMainLoadOpend();
    this.init();
  },
  mounted() {
    this.$store.commit("setHeaderStyle", {
      txt: this.pageInfo.header_title,
      type: 1
    });
  },
  watch: {
    textContent() {
      var len = this.textContent.length;
      if (len < 200) {
        this.textNum = len;
        this.textStyle.readonly = false;
      } else if (len > 200) {
        console.log("err");
        this.textNum = 200;
        this.textStyle.readonly = true;
      }
    }
  },
  methods: {
    init() {
      this.__Sleep(e => {
        this.selfMainLoadClosed();
      }, 1000);
      this.getPageInfo();
    },

    getPageInfo() {
      // console.log(1);
    },

    doReport() {
      var url = "Report-addReport";
      var token = this.getToken();
      var remarks = this.textContent;
      var type = this.getParams().type;
      var tiemId = this.getParams().id;
      var images = this.handleImage();
      var phone = this.phone;
      if (!remarks) return this._msg("请输入举报内容");
      if (!phone) return this._msg("请输入联系电话");
      if (!(/^1[3456789]\d{9}$/.test(phone))) return this._msg("您的号码有误!");
      if (!images) return this._msg("请提供相关图片");
      var params = {
        token,
        remarks,
        type,
        tiemId,
        images,
        phone
      };
      this.__initAction(url, params, (res, s) => {
        if (s == 1) {
          this._msg(res.info);
        } else {
          this._msg(res.info);
        }
      })
    },

    handleImage() {
      var data = this.photoList;
      var len = data.len;
      var str = "";
      for (var key in data) {
        var f = data[key].files
        if (f) {
          str += `${data[key].files}|`
        }
      }
      if (str) {
        return str.substr(0, str.lastIndexOf("|"));
      } else {
        return null;
      }

    },

    //删除已选中的图片
    delImage(i) {
      var arr = this.photoList;
      arr.splice(i, 1);
      // this.photo_count = false;
      this.photo_count--;
      // var isCode = true;
      var obj = {
        logo: "static/imgs/add-pic.png",
        code: "val"
      };
      if (arr.length == 2 && this.isUpImgCode && arr[arr.length - 1].files) {
        this.isUpImgCode = false;
        // setTimeout(() => {
        //   this.isUpImgCode = true;
        // },1000);
        var obj = {
          logo: "static/imgs/add-pic.png",
          code: "val"
        };
        this.photoList.push(obj);
      } else {
        this.isUpImgCode = true;
      }
    },

    imports(i) {
      if (this.photo_count == 4) {
        return;
      }
      var id = "files" + i;
      var that = this;
      var selectedFile = document.getElementById(`${id}`).files[0]; //获取读取的File对象
      if (!selectedFile) {
        this._msg("请选择图片");
        return;
      }
      var name = selectedFile.name; //读取选中文件的文件名
      var file_type = name.split(".")[1]; //获取后缀
      var size = selectedFile.size; //读取选中文件的大小

      var reader = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
      reader.readAsDataURL(selectedFile); //读取文件的内容
      reader.onload = function(e) {
        // console.log(this.result); //当读取完成之后会回调这个函数，然后此时文件的内容存储到了result中。直接操作即可。
        var f = this.result;
        var list = that.photoList;
        var len = list.length;
        that.photo_count++;
        var item = {};
        item.logo = f;
        // item.code = i;
        that.photoList.splice(len - 1, 0, item);
        var baseData = e.target.result;
        that.__UploadImg(baseData, file_type, data => {
          that.photoList[i].files = data.dir; //BUG  变量有问题
        });
        if (that.photoList.length == 4) {
          that.photoList.pop();
          return;
        }
      };
    },

    do_add() {
      $(".file_input").change();
      // this.ishowFile = false;
      if (this.photo_count == 5) {
        return;
      }
    },
    



  }
};
</script>

<style lang="scss" scoped>
.report {
    .text-content {
        width: 100%;
        height: 9rem;
        background: #fff;
        div {
            padding: 0.5rem;
        }
        .text-cell {
            width: 100%;
            height: 7rem;
            font-size: 0.9rem;
            border: 0;
        }
    }
    .border-bottom {
        border-bottom: 1px solid #ccc;
    }
}
.yd-textarea > textarea {
    font-size: 1rem;
}
.reprot_btn {
    width: 95%;
    height: 44px;
    position: absolute;
    bottom: 0;
    left: 2.5%;
    display: flex;
    justify-content: center;
    margin: 15px auto;
    align-items: center;
    border-radius: 44px;
}
.report {
    .item_photo {
        width: 100%;
        background: #fff;
        padding: 15px 17px;
        border-bottom: 1px solid #e7e7e7;
        .photo_container {
            display: flex;
            flex-flow: wrap;
            position: relative;
            outline: 0;
            .photos {
                width: 60px;
                height: 60px;
                position: relative;
                .showImg {
                    height: 60px;
                    width: 60px;
                    border: 0;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                .addImg {
                    height: 60px;
                    width: 60px;
                    border: 0;
                    position: absolute;
                    left: 60px;
                    top: 0;
                }
                .del-img {
                    color: #333;
                    font-size: 14px;
                    font-weight: 500;
                    position: absolute;
                    top: 0;
                    right: 0.1rem;
                    z-index: 100;
                }
                .file_input {
                    width: 60px;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                }
            }
        }
    }
    .tel {
        width: 100%;
        background-color: #fff;
        padding: 5px 15px;
    }
    .tel .tel-item {
        width: 100%;
        padding: 5px 0;
    }
    .tel .tel-item:first-child {
        border-bottom: 1px solid #ccc;
    }
    .tel .tel-item input {
        padding: 0.5rem 0;
        font-size: 14px;
        font-weight: 600;
        color: #333;
        border: 0;
        outline: none;
    }
    .tel-icon-logo {
        font-size: 1rem;
        color: #e96900;
    }
}
</style>
