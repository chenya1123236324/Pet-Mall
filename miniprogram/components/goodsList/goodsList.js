// components/goodsList/goodsList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsList:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgHttpUrl:"https://img.boqiicdn.com/Data/Shop//", // 图片前缀
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetailsPage:function(even){
      // console.log(even.currentTarget.id)
      wx.navigateTo({
        url: `../../pages/detailsPage/detailsPage?id=${even.currentTarget.id}`
      })
    }
  }
})
