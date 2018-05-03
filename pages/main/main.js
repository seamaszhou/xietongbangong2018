var sliderWidth = 96;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:["信息沉淀","任务分工"],
    activeIndex:0,
    sliderOffset:0,
    sliderLeft:0,
    input:'',
    todos:[],
    leftCount:0,
    allCompleted:false,
    logs:[],
    showSearch:false
  },

  save:function(){
    wx.setStorageSync('todo_list', this.data.todos)
    wx.setStorageSync('todo_logs',this.data.logs)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  load:function(){
    var todos = wx.getStorageSync('todo_list')
    if(todos){
      var leftCount = todos.filter(function(item){
        return !item.completed

      }).legnth
      this.setData({todos: todos, leftCount:leftCount})
    }
    var logs = wx.getStorageSync('todologs')
    if(logs){
      this.setData({logs: logs})
    }
  },
  
  tabClick:function(e){
    this.setData({
      sliderOffset:e.currentTarget.offsetLeft,
      activeIndex:e.currentTarget.id
    });
  },
  onLoad: function (options) {this.load();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sldierOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    
  },
  inputChangeHandle: function(e){
    this.setData({input : e.detail.value})
  },
  returnIndex: function(){
    wx.navigateTo({
      url: '../index/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  addTodoHandle: function(e){
    if(!this.data.input || !this.data.input.trim())return
    var todos = this.data.todos
    todos.push({name: this.data.input, completed : false})
    var logs = this.data.logs
    logs.push({timestamp:new Date(), action:'Add', name: this.data.input})
    this.setData({
      input:'',
      todos:todos,
      leftCount: this.data.leftCount + 1,
      logs:logs
    })
    this.save()
  },
  toggleTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    todos[index].completed = !todos[index].completed
    var logs = this.data.logs
    logs.push({
      timestamp: new Date(),
      action: todos[index].completed ? 'Finish' : 'Restart',
      name: todos[index].name
    })
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount + (todos[index].completed ? -1 : 1),
      logs: logs
    })
    this.save()
  },

  removeTodoHandle: function (e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    var remove = todos.splice(index, 1)[0]
    var logs = this.data.logs
    logs.push({ timestamp: new Date(), action: 'Remove', name: remove.name })
    this.setData({
      todos: todos,
      leftCount: this.data.leftCount - (remove.completed ? 0 : 1),
      logs: logs
    })
    this.save()
  },

  toggleAllHandle: function (e) {
    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos
    for (var i = todos.length - 1; i >= 0; i--) {
      todos[i].completed = this.data.allCompleted
    }
    var logs = this.data.logs
    logs.push({
      timestamp: new Date(),
      action: this.data.allCompleted ? 'Finish' : 'Restart',
      name: 'All todos'
    })
    this.setData({
      todos: todos,
      leftCount: this.data.allCompleted ? 0 : todos.length,
      logs: logs
    })
    this.save()
  },

  clearCompletedHandle: function (e) {
    var todos = this.data.todos
    var remains = []
    for (var i = 0; i < todos.length; i++) {
      todos[i].completed || remains.push(todos[i])
    }
    var logs = this.data.logs
    logs.push({
      timestamp: new Date(),
      action: 'Clear',
      name: 'Completed todo'
    })
    this.setData({ todos: remains, logs: logs })
    this.save()
  },
  showSearchbtn:function(){
    this.setData({
      showSearch:true
    })
  },
  hideSearchbtn:function(){
    this.setData({
      showSearch:false
    })
  }

  
})