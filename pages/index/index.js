//index.js
//获取应用实例

const app = getApp()
var ns = 0;
var x, y, x1, y1, x2, y2, index, currindex, n, yy;
var arr1 = [{ desc: '此处会显示最新的日程事项', content: "Group Name", id: 1 }];

Page({
  data: {
    /*添加群组*/
    input: '',
    groups: [],
    leftCount: 0,
    allCompleted: false,
    logs: [],
    /*search*/
    inputShowed : false,
    inputValue:"",
    showSearch:false,
    /*modal*/
    showModal: false,
    /*drag*/
    mainx: 0,
    content: [{ desc: '此处会显示最新的日程事项', content: 'Group Name', id: 1 }],
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
  workTap: function(){
    wx.navigateTo({
      url: '../main/main',
    })
  },
  notif: function(){
    wx.navigateTo({
      url: '../notification/notif',
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
    this.load()
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
    console.log(x);
    y = e.touches[0].clientY;
    x1 = e.currentTarget.offsetLeft;
    y1 = e.currentTarget.offsetTop;
  },


  move: function (e) {
    yy = e.currentTarget.offsetTop;
    x2 = e.touches[0].clientX - x + x1;
    y2 = e.touches[0].clientY - y + y1;
    console.log(x2);
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
      
      arr.splice((currindex - 1), 1);
      arr.splice((n - 1), 0, arr1[currindex - 1]);
      arr1 = [];
      for (var m = 0; m < this.data.content.length; m++) {
       
        arr[m].id = m + 1;
        arr1.push(arr[m]);
      }
     
      this.setData({
        mainx: "",
        content: arr,
        opacity: 1
      })
    }
  },
  /*添加小组*/
  /*添加按钮弹窗*/
  openPop : function(){
    wx.showModal({
      title:'创建群组',
      content:'输入群组名称',
      confirmText:'确定',
      cancelText:"取消"
    })
  },
  /**
   * 弹窗
   */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  showSearchBtn: function () {
    this.setData({
      showSearch: true,
      
    })
  },
  hideSearchBtn: function () {
    this.setData({
      showSearch: false,

    })
  },
 onHide: function(){
   this.hideSearchBtn();
 },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  }
  ,
  /*搜索框 */
  showInput: function(){
    this.setData({
      inputShowed:true
    });
  },
      hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  /*添加群组*/

  save: function () {
    wx.setStorageSync('group_list', this.data.groups)
    wx.setStorageSync('todo_logs', this.data.logs)
  },

  load: function () {
    var groups = wx.getStorageSync('group_list')
    if (groups) {
      var leftCount = groups.filter(function (item) {
        return !item.completed
      }).length
      this.setData({ groups: groups, leftCount: leftCount })
    }
    var logs = wx.getStorageSync('todo_logs')
    if (logs) {
      this.setData({ logs: logs })
    }
  },

  

  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value })
  },

  addTodoHandle: function (e) {
    if (!this.data.input || !this.data.input.trim()) return
    var groups = this.data.groups
    groups.push({ group: this.data.input, completed: false })
    var logs = this.data.logs
    logs.push({ timestamp: new Date(), action: 'Add', group: this.data.input })
    this.setData({
      input: '',
      groups: groups,
      leftCount: this.data.leftCount + 1,
      logs: logs
    })
    this.save()
  },



  removeTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var groups = this.data.groups
    var remove = groups.splice(index, 1)[0]
    var logs = this.data.logs
    logs.push({ timestamp: new Date(), action: 'Remove', group: remove.group})
    this.setData({
      groups: groups,
      leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
      logs: logs
    })
    this.save()
  },


  


})
