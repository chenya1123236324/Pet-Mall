// components/getUserInfo/getUserInfo.js
let app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {},
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this.getStorageOpenId();
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
    isShow: true, // 是否显示该组件
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close: function () {
      this.setData({
        isShow: false,
      });
    },
    // 从缓存中获取 openId
    getStorageOpenId: function () {
      wx.getStorage({
        key: "openId",
        success: (result) => {
          // console.log(result);
          this.setData({
            isShow: false,
          });
        },
        fail: (err) => {
          // console.log(err);
        },
        complete: () => {},
      });
    },
    onGetUserInfo: function (e) {
      app.getUserInfo(e);
      this.setData({
        isShow: false,
      });
    },
  },
});