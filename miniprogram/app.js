//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: "todaynews-bj9yd",
        traceUser: true,
      })
    }
    
    this.globalData = {}
  },
  getUserInfo:function(e){
    if(e.detail.userInfo){
      wx.cloud.callFunction({
        name:"login",
        data:{userInfo:e.detail.userInfo}
      })
      .then(res=>{
        // console.log(res)
        wx.showToast({ title: '授权成功', })
        wx.setStorageSync("openId", res.result.openId)
        wx.setStorageSync("userInfo", res.result)
      })
      .catch(err=>{
        wx.showToast({ title: '授权失败', })
      })
    }else{
      wx.showToast({ title: '授权失败', })
    }
    // console.log(e.detail.userInfo)
  }
})
