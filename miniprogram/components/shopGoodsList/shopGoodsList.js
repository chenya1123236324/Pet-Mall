// components/shopGoodsList/shopGoodsList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this.getCarGoodsList();
      this.setData({
        isGoShopping:true
      })
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    carList: [], // 拿出缓存中的购物车列表数据
    newCarList: [], // 购物车列表数据 重组后的数据
    totalPrice: 0, // 选中商品的总价格
    isShopping:false, // 是否显示结算条
    isGoShopping: true, // 点击管理 是否显示清除
    isCheckbox: false, // 结算处得的全选
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取 缓存中的购物车列表数据
    getCarGoodsList: function () {
      let goosList = wx.getStorageSync("car");
      this.setData({
        carList: goosList,
        newCarList:[]
      });
      // console.log(goosList);
      if(goosList.length>0){
        this.onDataHandle();
        this.setData({
          isShopping:true,
        })
      }
    },
    // 重组购物车列表数据
    onDataHandle() {
      let list = [];
      let sum = 0; // 购物车商品数量
      this.data.carList.forEach((item, index) => {
        item.checked = false;
        var flag = true;
        sum += item.count;
        list.forEach((element) => {
          if (element.brand == item.brand) {
            element.list.push(item);
            flag = false;
          }
        });
        if (flag) {
          list.push({
            brand: item.brand,
            checked: false,
            list: [item],
          });
        }
      });
      this.setData({
        newCarList: list,
      });
      this.triggerEvent("getSum", { sum: sum }); // 将值传给父页面
      // console.log(sum);
      // console.log(list);
    },
    checkboxChange: function (e) {
      // console.log(e);
      // console.log(e.detail.value);
      // console.log(this.data.newCarList)
    },
    checkboxChildChange: function (e) {
      // console.log(e.detail.value);
    },
    // 点击管理
    management:function(){
      // console.log("管理被点击了")
      this.setData({
        isGoShopping:!this.data.isGoShopping
      })
      if(this.data.carList.length>0){
        if(this.data.isGoShopping){
          this.triggerEvent("modifyManagement", { management: "管理" });
        }else{
          this.triggerEvent("modifyManagement", { management: "完成" });
        }
      }
    },
    // 点击加号
    add: function (e) {
      // console.log(e.target.dataset.id)
      this.data.carList.forEach((item) => {
        if (item._id == e.target.dataset.id) {
          ++item.count;
        }
      });
      this.setData({
        totalPrice: 0,
        isCheckbox:false
      });
      wx.setStorageSync("car", this.data.carList); // 将得到的新数组存到缓存中
      this.getCarGoodsList();
    },
    // 点击减号
    sub: function (e) {
      this.data.carList.forEach((item) => {
        if (item._id == e.target.dataset.id) {
          if (item.count <= 1) {
            wx.showToast({
              title: "不能再减少了~~",
              icon: "none",
            });
          } else {
            --item.count;
          }
        }
      });
      this.setData({
        totalPrice: 0,
        isCheckbox:false
      });
      wx.setStorageSync("car", this.data.carList);
      this.getCarGoodsList();
    },
    // 点击商家店名前的小框  选择商品
    goodsListCheck: function (e) {
      // console.log(e.currentTarget.dataset);
      let trueNum = 0;
      this.data.newCarList.forEach((item) => {
        if (item.brand == e.currentTarget.dataset.brand) {
          item.checked = !item.checked;
          // console.log(item.checked);
          item.list.forEach((el) => {
            el.checked = item.checked;
          });
        }
        if (item.checked) {
          ++trueNum;
          // console.log(trueNum)
          // console.log(this.data.newCarList.length)
          if (trueNum != this.data.newCarList.length) {
            this.data.isCheckbox = false;
          } else {
            this.data.isCheckbox = true;
          }
        }
        this.getTotalPrice();
        this.setData({
          isCheckbox: this.data.isCheckbox,
          newCarList: this.data.newCarList,
        });
      });
    },
    // 点击商品前的小框  选择商品
    goodsCheck: function (e) {
      // console.log(e.currentTarget.dataset)
      // console.log(this.data.newCarList)
      let checkedNum = 0;
      this.data.newCarList.forEach((item) => {
        // console.log(item)
        if (e.currentTarget.dataset.brand == item.brand) {
          item.list.forEach((el) => {
            if (e.currentTarget.dataset.id == el._id) {
              el.checked = !el.checked;
            }
            // console.log(el)
          });
        }
        // 遍历所有商品内的checked 是否为true 来 改变店铺是否选中
        let trueNum = 0;
        item.list.forEach((i) => {
          if (i.checked) {
            // 商品选中
            ++trueNum;
            // console.log(trueNum)
            // console.log(item.list.length)
            if (trueNum != item.list.length) {
              item.checked = false;
            } else {
              item.checked = true;
            }
          } else {
            item.checked = false;
          }
        });
        if (item.checked) {
          ++checkedNum;
          // console.log(checkedNum)
          // console.log(this.data.newCarList.length)
          if (checkedNum != this.data.newCarList.length) {
            this.data.isCheckbox = false;
          } else {
            this.data.isCheckbox = true;
          }
        } else {
          this.data.isCheckbox = false;
        }
        this.getTotalPrice();
        // console.log(this.data.newCarList)
        this.setData({
          isCheckbox: this.data.isCheckbox,
          newCarList: this.data.newCarList,
        });
      });
    },
    // 点击全选
    allGoods: function () {
      this.data.isCheckbox = !this.data.isCheckbox;
      this.data.newCarList.forEach((item) => {
        item.checked = this.data.isCheckbox;
        item.list.forEach((el) => {
          el.checked = this.data.isCheckbox;
        });
      });
      this.setData({
        isCheckbox: this.data.isCheckbox,
        newCarList: this.data.newCarList,
      });
      this.getTotalPrice();
    },
    // 获取选中商品的总价格
    getTotalPrice: function () {
      let sumTotalPrice = 0;
      this.data.newCarList.forEach((item) => {
        item.list.forEach((el) => {
          if (el.checked) {
            sumTotalPrice += parseFloat(el.price) * parseFloat(el.count);
          }
        });
      });
      this.setData({
        totalPrice: sumTotalPrice,
      });
      // console.log(this.data.newCarList)
      // console.log(this.data.totalPrice)
    },
    // 点击结算按钮时 弹出状态框
    settlement: function () {
      wx.showModal({
        title: "提示",
        content: "支付体验暂未开启",
        showCancel: false,
      });
    },
    // 清空操作
    empty: function () {
      let emptyList=[];
      let sum = 0;
      wx.setStorage({
        key: 'car',
        data: emptyList
      })
      this.setData({
        isShopping:false,
        isCheckbox:false,
        isGoShopping:false
      })
      this.getCarGoodsList()
      this.getTotalPrice();
      this.triggerEvent("getSum", { sum: sum });
      this.triggerEvent("modifyManagement", { management: "管理" });
    },
    // 删除操作
    del: function () {
      let delList = []; // 待删除名单
      this.data.newCarList.forEach((item) => {
        item.list.forEach((el) => {
          if (el.checked) {
            delList.push(el);
          }
        });
      });

      for (var i = 0; i < delList.length; i++) {
        for (var j = 0; j < this.data.carList.length; j++) {
          if (this.data.carList[j] === delList[i]) {
            this.data.carList.splice(j, 1);
            j--;
          }
        }
      }
      this.setData({
      })
      let sum = 0;
      this.data.carList.forEach(item=>{
        sum += item.count
      })
      if(sum<1){
        this.setData({
          isShopping:false,
          isGoShopping:true
        })
        this.triggerEvent("modifyManagement", { management: "管理" });
      }
      // console.log(delList);
      // console.log(this.data.carList);
      wx.setStorage({
        key: 'car',
        data: this.data.carList
      })
      this.setData({
        carList:this.data.carList,
        isCheckbox:false
      })
      this.triggerEvent("getSum", { sum: sum });
      this.getTotalPrice();
      this.getCarGoodsList()
    },
    // 去首页
    goIndex:function(){
      wx.switchTab({
        url: '../../pages/index/index',
      });
    }
  },
  created: function (options) {},
  attached: function (options) {
    
  },
});
