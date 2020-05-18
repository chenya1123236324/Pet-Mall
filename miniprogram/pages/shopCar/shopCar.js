// miniprogram/pages/convenienceStore/convenienceStore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopCarNum:0,  // 购物车内商品数量
    management:"管理"
  },
  // 点击管理时 触发事件
  management:function(){
    this.selectComponent("#shopGoodsList").management()
  },
  getSum(el){
    // console.log(el.detail.sum)
    this.setData({
      shopCarNum:el.detail.sum
    })
  },
  getManagement(el){
    this.setData({
      management:el.detail.management
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getSum()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})