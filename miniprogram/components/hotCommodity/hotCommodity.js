// components/hotCommodity/hotCommodity.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotCommodity:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hotGoodsHttpUrl:"https://img.boqiicdn.com/Data/Shop//", // 图片前缀
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goMoreHotGoods:function(){
      wx.navigateTo({url: '../../pages/moreHotGoodsList/goMoreHotGoods'});
    }
  }
})
