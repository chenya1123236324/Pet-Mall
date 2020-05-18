// miniprogram/pages/mine/mine.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    functionsList: [],
    isShow: false, // 是否跳出登录
  },
  onGetUserInfo: function (e) {
    app.getUserInfo(e);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openId = wx.getStorageSync("openId");
    this.setData({
      functionsList: [
        {
          name: "收藏",
          icon: "icon-dianpu",
          color: "#1296DB",
          isId: false,
          tabBar: false,
          url: "2",
        },
        {
          name: "订单",
          icon: "icon-shangpin",
          color: "#ff6600",
          isId: true,
          tabBar: true,
          url: "/pages/shopCar/shopCar",
        },
        {
          name: "浏览记录",
          icon: "icon-zuji",
          color: "#a9b3b9",
          isId: true,
          tabBar: false,
          url: "/pages/browsingHistory/browsingHistory",
        },
        {
          name: "收货地址",
          icon: "icon-dizhi",
          color: "#754281",
          isId: false,
          tabBar: false,
          url: "4",
        },
        {
          name: "我的发布",
          icon: "icon-fabu1",
          color: "#33ccff",
          isId: false,
          tabBar: false,
          url: `/pages/personalCenter/personalCenter?openId=${openId}`,
        },
        {
          name: "设置",
          icon: "icon-shezhi",
          color: "bluer",
          isId: true,
          tabBar: false,
          url: "6",
        },
      ],
    });
  },
  goPage: function (e) {
    let openId = wx.getStorageSync("openId");
    // console.log(e.currentTarget.dataset.url)
    // console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset.tabbar) {
      // 如果是跳转到tabBar页面
      wx.switchTab({
        url: e.currentTarget.dataset.url,
        fail: () => {
          wx.showToast({
            title: "跳转失败",
          });
        },
      });
    } else {
      // 如果不是跳转到 tabBar 页面
      if (openId.length > 0) {
        wx.navigateTo({
          // url: "../shopCar/shopCar"
          url: e.currentTarget.dataset.url,
          fail: () => {
            wx.showToast({
              title: "跳转失败",
              icon: "none",
              duration: 1500,
            });
          },
        });
      } else if (e.currentTarget.dataset.isid) {
        wx.navigateTo({
          // url: "../shopCar/shopCar"
          url: e.currentTarget.dataset.url,
          fail: () => {
            wx.showToast({
              title: "跳转失败",
              icon: "none",
              duration: 1500,
            });
          },
        });
      } else {
        this.setData({
          isShow: true,
        });
        this.selectComponent("#getUserInfo").open();
      }
    }
  },
  // 获取登录状态
  getUserInfo: function (e) {
    // console.log(e.detail)
    this.setData({
      isShow: e.detail,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
