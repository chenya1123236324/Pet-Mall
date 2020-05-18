// miniprogram/pages/classificationDetails/classificationDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    species:'',
    classificationList:[]
  },

  getClassificationList:function(){
    wx.cloud.callFunction({
      name:"getGoodLists",
      data:{
        $url:"classification",
        species:this.data.species
      }
    })
    .then(res=>{
      this.setData({
        classificationList:this.data.classificationList.concat(res.result.data)
      })
      wx.hideLoading();
    })
    .catch(err=>console.log(err))
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中...",
      mask: true
    });
    this.setData({
      species:options.species
    })
    this.getClassificationList()
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