// components/articleList/articleList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleList: {
      type: Array,
    },
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      // console.log(this.properties);
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    // isDel:false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 删除文章
    delArticle: function (e) {
      let failList = [];
      wx.showLoading({
        title: "删除中...",
        mask: true,
      });
      // console.log(e.target.dataset)
      e.target.dataset.fileid.forEach((item) => {
        failList.push(item);
      });
      // console.log(failList)
      wx.cloud
        .callFunction({
          name: "article",
          data: {
            $url: "delArticle",
            id: e.target.dataset.id,
          },
        })
        .then((res) => {
          wx.hideLoading();
          wx.vibrateShort();
          wx.showToast({
            title: "删除成功",
            icon: "",
          });
          this.triggerEvent("refreshPage");
          wx.cloud
            .deleteFile({
              fileList: failList,
            })
            .then((res) => {
              // handle success
              // console.log(res.fileList)
            })
            .catch((error) => {
              // handle error
            });
        });
    },
    // 预览图片
    viewImg: function (e) {
      // console.log(e.target.dataset.imgsrc)
      // console.log(e.target.dataset.imgslist)
      wx.previewImage({
        current: e.target.dataset.imgsrc,
        urls: e.target.dataset.imgslist,
      });
    },
    // 去个人中心
    goPersonalCenter:function(e){
      // console.log(e.target.dataset.openid)
      wx.navigateTo({
        url: `../../pages/personalCenter/personalCenter?openId=${e.target.dataset.openid}`
      })
    },
  },
});
