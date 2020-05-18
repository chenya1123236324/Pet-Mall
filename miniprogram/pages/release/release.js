const MAX_WORDS_NUM = 140; // 表示输入文字最大的个数
const MAX_IMG_NUM = 9; // 最大上传图片的数量
let context = ""; // 表示输入框中内容
let userInfo = {}; // 用户信息
Page({
  /**
   * 页面的初始数据
   */
  data: {
    images: [], // 表示用户选择的图片集合
    selectPhoto: true, //  表示选择图片是否显示
    isButton:true, // 表示 发布按钮是否可以点击
  },
  getValue: function (e) {
    context = e.detail.value;
    
    if (context.trim() == "") {
      this.setData({
        isButton:true
      })
    }else{
      this.setData({
        isButton:false
      })
    }
    // console.log("输入的内容=", e.detail.value);
  },
  // 处理上传图片
  onChooseImage() {
    // 因为选择图片是多次；每次数量是不一定的，总数做多选择为9 ---> 求还能选择几张图片
    let max = MAX_IMG_NUM - this.data.images.length;

    wx.chooseImage({
      count: max, // 最多可以选择的图片张数
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: (res) => {
        this.setData({
          images: this.data.images.concat(res.tempFilePaths),
        });
        // console.log(this.data.images);

        // 控制选择图片的显示隐藏的效果
        // 还能在选几张  当还能选择的图片数量小于等于0时候  -->选择图片隐藏 selectPhoto false 否则显示
        max = MAX_IMG_NUM - this.data.images.length;
        this.setData({
          selectPhoto: max <= 0 ? false : true,
        });
        // console.log(this.data.selectPhoto)
      },
      fail: () => {},
    });
  },
  // 点击x 删除图片
  onDelImage(event) {
    this.data.images.splice(event.target.dataset.index, 1);
    this.setData({
      images: this.data.images,
    });

    // 当删除图片后；显示选择图片效果
    if (this.data.images.length <= MAX_IMG_NUM) {
      this.setData({
        selectPhoto: true,
      });
    }
  },

  // 点击图片实现预览图片效果
  onPreviewImage(event) {
    var imgSrc = event.target.dataset.imgsrc;
    // 作用 配置预览图片 注意：在真机上，苹果手机上 有多少张图片的显示  安卓手机没有
    wx.previewImage({
      current: imgSrc, // 当前显示的图片；为点击的图片
      urls: this.data.images, // 预览图片集合
    });
  },

  // 发布
  send() {
    // 数据 ---> 云数据库中
    // 云数据库中内容 --> 内容 图片FILEIF oppenid 昵称  头像  博客的创建时间
    // 图片--->云存储中 --->返回fileId 云文件id

    wx.showLoading({
      title: "发布中...",
      mask: true, // 蒙层
    });

    let promiseArr = [];
    let fileIds = [];
    // 1 图片上传到云存储中 注意每次只能上传一个文件,当按名字冲突时候，后上传的会把之前图片覆盖
    // ---->注意：上传到云存储值；执行的是多个异步  ----> 等所有的异步执行完毕，获取fileid 数据 --->怎么可以知道所有的异步执行完毕？--->Promise.all
    this.data.images.forEach((imgSrc) => {
      let p = new Promise((resove, reject) => {
        // 文件扩展名增正则 匹配 .jpg .jpeg .png .xxxx
        let suffix = /\.\w+$/.exec(imgSrc)[0];
        wx.cloud.uploadFile({
          cloudPath:
            "articleImgs/" + Date.now() + "-" + Math.random() * 1000000 + suffix, // 文件在云存储中地址
          filePath: imgSrc,
          success: (res) => {
            // console.log(res);
            fileIds = fileIds.concat(res.fileID);
            // 上传成功时
            resove();
          },
          fail: () => {
            reject();
          },
        });
      });
      promiseArr.push(p);
    });

    // 等所有图片都上传到云存储中完毕时候;
    Promise.all(promiseArr).then((res) => {
      wx.cloud
        .callFunction({
          name: "article",
          data: {
            $url: "addArticle",
            data: {
              ...userInfo,
              content: context,
              img: fileIds,
              // createTime: db.serverDate(), // 服务器时间  服务器时间比客户端时间准
            },
          },
        })
        .then((res) => {
          // console.log(res);
          wx.hideLoading();
          wx.showToast({
            title: "发布成功",
          });
          wx.switchTab({url: '../petPark/petPark' });
        })
        .catch((err) => {
          console.log(err);
          wx.hideLoading();
          wx.showToast({
            title: "发布失败",
          });
        });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中...",
      mask: true,
    });
    userInfo = wx.getStorageSync("userInfo");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
