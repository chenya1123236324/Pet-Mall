// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotGoodsHttpUrl:"https://img.boqiicdn.com/Data/Shop//", // 拼接图片的地址前缀
    bannerList:[],  // 轮播图
    icon:{search:"https://746f-todaynews-bj9yd-1301528089.tcb.qcloud.la/imgs/%E5%8A%9F%E8%83%BD%E5%9B%BE%E6%A0%87-17.png?sign=2d5248b31f1affb81cb2a290237eb1e7&t=1589726203"},  // 搜索图标地址
    classificationList:[],  // 分类列表
    hotGoodsList:[],  // 火爆商品列表
    randomGoodsList:[]  // 随机商品列表
  },
  search:function(){
    console.log("搜索被点击了")
  },
  bannerImg:function(e){
    console.log(e.target.dataset.name)
  },
  // 获取轮播图地址
  getBannerList:function(){
    wx.cloud.callFunction({
      name:"getImg",
      data:{
        $url:"banner"
      }
    })
    .then(res=>{
      this.setData({
        bannerList:res.result.data
      })
    })
    .catch(err=>console.log(err))
  },
  // 获取分类图片地址
  getClassificationList:function(){
    wx.cloud.callFunction({
      name:"getImg",
      data:{
        $url:"classification"
      }
    })
    .then(res=>{
      this.setData({
        classificationList:res.result.data
      })
      // console.log(res.result.data)
    })
    .catch(err=>console.log(err))
  },
  // 获取火爆商品列表
  getHotGoodsList:function(){
    wx.cloud.callFunction({
      name:"getHotGoods",
      data:{
        $url:"hotGoodsList",
        start:0,
        count:10
      }
    })
    .then(res=>{
      this.setData({
        hotGoodsList:res.result.data
      })
      // console.log(res.result.data)
    })
    .catch(err=>console.log(err))
  },

  // 获取随机食物商品列表
  getRandomGoodsList:function(){
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    wx.cloud.callFunction({
      name:"getGoodLists",
      data:{
        $url:"randomGoodsList",
        num:20 // 随机获取的条数
      }
    })
    .then(res=>{
      this.setData({
        randomGoodsList:this.data.randomGoodsList.concat(res.result.list)
      })
      wx.hideLoading();
      // console.log(res.result.list)
    })
    .catch(err=>console.log(err))
  },
  goClassificationDetails:function(e){
    // console.log(e.currentTarget.dataset.species)
    wx.navigateTo({
      url: `../../pages/classificationDetails/classificationDetails?species=${e.currentTarget.dataset.species}`
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getBannerList()
    this.getClassificationList()
    this.getHotGoodsList()
    this.getRandomGoodsList()
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
    this.getRandomGoodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})