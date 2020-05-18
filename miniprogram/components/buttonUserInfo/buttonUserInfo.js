// components/buttonUserInfo/buttonUserInfo.js
const app =  getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo: function (e) {
      app.getUserInfo(e);
      this.setData({
        isShow:false
      })
      this.triggerEvent("close",this.data.isShow)
    },
    close:function(){
      this.setData({
        isShow:false
      })
      this.triggerEvent("close",this.data.isShow)
      wx.showToast({
        title: '授权失败',
      })
    },
    open:function(){
      this.setData({
        isShow:true
      })
    }
  }
})
