const MAX_COUNT_NUM = 20;
var isDelShow = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:"",
    userInfo:{},
    articleList:[]
  },
  // 获取该用户信息
  getUserInfo:function(){
    wx.cloud.callFunction({
      name:"getUser",
      data:{
        $url:"getUser",
        openId:this.data.openId
      }
    })
    .then(res=>{
      // console.log(res.result.data[0])
      this.setData({
        userInfo:res.result.data[0]
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },
  // 获取文章列表
  getArticleList:function(){
    wx.cloud.callFunction({
      name:"article",
      data:{
        $url:"openIdArticleList",
        data:{
          openId:this.data.openId,
          start:this.data.articleList.length,
          count:MAX_COUNT_NUM
        }
      }
    })
    .then(res=>{
      res.result.data.forEach(element => {
        element.isDel=isDelShow
      });
      this.setData({
        articleList:this.data.articleList.concat(res.result.data)
      })
      wx.hideLoading();
    })
    .catch(err=>{console.log(err)})
  },
  refreshPage:function(){
    this.setData({
      articleList:[]
    })
    this.getArticleList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    // console.log(options)
    let openIdStorage = wx.getStorageSync("openId")
    if(openIdStorage==options.openId&&openIdStorage!=''&&options.openId!=''){
      isDelShow=true
    }
    this.setData({
      openId:options.openId
    })
    this.getUserInfo()
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
    this.setData({
      articleList:[]
    })
    this.getArticleList()
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
    this.setData({
      articleList:[]
    })
    this.getArticleList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getArticleList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})