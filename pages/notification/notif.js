//index.js
//获取应用实例
const app = getApp()

var x, y, x1, y1, x2, y2, index, currindex, n, yy;
var arr1 = [{ desc: '1234', content: "group1", id: 1 }, { desc: '123', content: 'group2', id: 2 }, { desc: '123', content: 'group3', id: 3 }, { desc: '123', content: 'group4', id: 4 }, { desc: '123',content: 'group5', id: 5 }];
Page({
  data: {
    /*drag*/
    mainx: 0,
    content: [{ desc: '1234', content: 'group1', id: 1 }, { desc: '123', content: 'group2', id: 2 }, { desc: '123', content: 'group3', id: 3 }, { desc: '123', content: 'group4', id: 4 }, { desc: '123',content: 'group5', id: 5 }],
    start: { x: 0, y: 0 },
    /*drag*/
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
  return: function(){
    wx.navigateTo({
      url: '../index/index',
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
  },
  /*drag*/
  movestart: function (e) {
    currindex = e.target.dataset.index;
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
    x1 = e.currentTarget.offsetLeft;
    y1 = e.currentTarget.offsetTop;
  },


  move: function (e) {
    yy = e.currentTarget.offsetTop;
    x2 = e.touches[0].clientX - x + x1;
    y2 = e.touches[0].clientY - y + y1;
    this.setData({
      mainx: currindex,
      opacity: 0.7,
      start: { x: x2, y: y2 }
    })
  },


  moveend: function () {
    if (y2 != 0) {
      var arr = [];
      for (var i = 0; i < this.data.content.length; i++) {
        arr.push(this.data.content[i]);
      }
      var nx = this.data.content.length;
      n = 1;
      for (var k = 2; k < nx; k++) {
        if (y2 > (52 * (k - 1) + k * 2 - 26)) {
          n = k;
        }
      }
      if (y2 > (52 * (nx - 1) + nx * 2 - 26)) {
        n = nx;
      }
      console.log(arr);
      console.log(arr1)
      arr.splice((currindex - 1), 1);
      arr.splice((n - 1), 0, arr1[currindex - 1]);
      arr1 = [];
      for (var m = 0; m < this.data.content.length; m++) {
        console.log(arr[m]);
        arr[m].id = m + 1;
        arr1.push(arr[m]);
      }
      // console.log(arr1);
      this.setData({
        mainx: "",
        content: arr,
        opacity: 1
      })
    }
  }


})
