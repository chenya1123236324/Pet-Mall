// miniprogram/pages/moreHotGoodsList/goMoreHotGoods.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotGoodsList: [],
    hotGoodsHttpUrl: "https://img.boqiicdn.com/Data/Shop//",
    start: 0,
    count: 18,
    isShow: false,
  },
  getHotGoodsList: function () {
    wx.cloud
      .callFunction({
        name: "getHotGoods",
        data: {
          $url: "hotGoodsList",
          start: this.data.start,
          count: this.data.count,
        },
      })
      .then((res) => {
        this.setData({
          hotGoodsList: this.data.hotGoodsList.concat(res.result.data),
        });
        wx.hideLoading();
      })
      .catch((err) => console.log(err));
  },
  getHotGoodsListLength: function () {
    if (this.data.start == this.data.hotGoodsList.length) {
      this.setData({
        isShow: true,
      });
    } else {
      this.setData({
        start: this.data.hotGoodsList.length,
      });
      this.getHotGoodsList();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotGoodsList();
    wx.showLoading({
      title: "加载中...",
      mask: true,
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
  onReachBottom: function () {
    this.getHotGoodsListLength();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
