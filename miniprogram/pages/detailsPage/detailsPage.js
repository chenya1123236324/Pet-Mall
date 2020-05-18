// miniprogram/pages/detailsPage/detailsPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    good:{},
    shoppingCart:'加入购物车',
    isShow:false, // 是否跳出登录
  },

  // 根据ID 查询商品
  getGood:function(){
    wx.cloud.callFunction({
      name:"getGoodLists",
      data:{
        $url:"idGood",
        id:this.data.id
      }
    })
    .then(res=>{
      // console.log(res.result.data[0])
      this.setData({
        good:res.result.data[0]
      })
      wx.hideLoading();
      this.setStorage()
    })
    .catch(err=>console.log(err))
  },
  // 加入购物车
  addCar:function(e){
    let openId = wx.getStorageSync('openId'); // 获取缓存中 openId
    if(openId != 0){  // 已授权
      let carList = wx.getStorageSync("car"); // 获取缓存中 car
      // console.log(carList)
      // console.log(carList.length)
      if(carList.length != 0){  // 当缓存中有数据时
        /**
         * 过滤 缓存中有该商品
         * 有 carList 缓存中的商品 数量count 自增 并将该商品数据 赋值到 existGood
         * 没有 则existGood 为空 ==0 为true
         */
        let existGood = carList.filter((item)=>{
          if(item._id == this.data.good._id){ // 当缓存中有该商品 id时
            item.count = ++item.count;
            return true
          }
        })
        if(existGood.length == 0){ // 当缓存中没有该商品时
          carList.unshift({
            ...this.data.good,
            count:1
          })
        }
        wx.setStorageSync("car", carList);
        wx.showToast({
          title: '添加成功',
        })
      }else{  // 当缓存中没有有数据时
        let newCarList =[{
          ...this.data.good, 
          count:1
        }]
        wx.setStorageSync("car",newCarList)
        wx.showToast({
          title: '添加成功'
        })
      }
    }else{
      this.setData({
        isShow:true
      })
      this.selectComponent("#getUserInfo").open()
    }
  },
  // 获取登录状态
  getUserInfo:function(e){
    // console.log(e.detail)
    this.setData({
      isShow:e.detail
    })
  },
  // 将数据缓存，用作浏览记录
  setStorage:function(){
    let browsingHistory =  wx.getStorageSync('browsingHistory'); // 获取缓存中 browsingHistory
    // console.log(browsingHistory)
    if(browsingHistory != 0){ // 缓存中有 该缓存；如果没有 ==0 为 true
      let historyGood = browsingHistory.filter((item,index)=>{
        if(item._id == this.data.good._id){ // 当缓存中有该商品 id时
          browsingHistory.splice(index,1)  // 删除已存在的
          browsingHistory.unshift(item)  // 重新添加该数据 让他到最上面
          return true
        }
      })
      if(historyGood.length == 0){ // 当缓存中没有该商品时
        if(browsingHistory.length>=20){ // 限制最大缓存数
          browsingHistory.splice(19,1)
        }
        browsingHistory.unshift({...this.data.good})
      }
      wx.setStorageSync("browsingHistory", browsingHistory);
    }else{  // 缓存中没有 该缓存
      // console.log(this.data.good)
      let newGoodList =[{
        ...this.data.good, 
      }]
      wx.setStorageSync("browsingHistory",newGoodList)
    }
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
    this.setData({
      id:options.id
    })
    this.getGood()
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