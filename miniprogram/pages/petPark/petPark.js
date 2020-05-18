const MAX_COUNT_NUM=20
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false, // 是否跳出登录
    articleList:[], // 文章列表
  },
  // 去发布页面
  goRelease:function(){
    let openId = wx.getStorageSync('userInfo').openId
    console.log(openId)
    if(openId!=undefined){
      wx.navigateTo({
        url: `../release/release`
      })
    }else{
      this.setData({
        isShow:true
      })
      this.selectComponent("#getUserInfo").open()
    }
  },
  // 获取文章列表
  getArticleList:function(){
    wx.cloud.callFunction({
      name:"article",
      data:{
        $url:"articleList",
        data:{
          start:this.data.articleList.length,
          count:MAX_COUNT_NUM
        }
      }
    })
    .then(res=>{
      res.result.data.forEach(element => {
        element.isDel=false
      });
      this.setData({
        articleList:this.data.articleList.concat(res.result.data)
      })
      wx.hideLoading();
      // console.log(this.data.articleList)
    })
    .catch(err=>{console.log(err)})
  },
  // 获取登录状态
  getUserInfo:function(e){
    // console.log(e.detail)
    this.setData({
      isShow:e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
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