//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    time: (new Date()).toString(),
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    a: 1,
    b: 2,
    c: 3,
    W: '1248124',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //图片切换
    listInfo: [
      
      {
        //title: '效果二',
        imgUrl: '../../images/like.png',
        curUrl: '../../images/like_fill.png',
      },
      
    ],
    imgHoverIndex: 0
  },
  //事件处理函数
  bindViewTap: function(){
    wx.navigateTo({
      url: '../search/searchbar',
    })
  },
  //图片切换
  chooseImg: function (e) {
    this.setData({
      curIdx: e.currentTarget.dataset.current
    })
    //  console.log(e)
    //  console.log(this.data.curIdx) 
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
