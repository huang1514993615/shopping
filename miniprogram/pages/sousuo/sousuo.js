// miniprogram/pages/sousuo/sousuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    playlist:[],
    page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  mohu(){
    var that=this
    let key = this.data.inputValue;
    
    console.log("查询的内容", key)
    const db = wx.cloud.database();
    const _ = db.command
    db.collection('shouye').where(_.or([{
        type_one: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        type_two: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        title: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        supplier: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
    ])).get({
      success: res => {
        that.setData({
          playlist: res.data
          })
      },
      fail: err => {
        console.log(err)
      }
    })
  },



  mohus() {
    var that = this
    let key = this.data.inputValue;

    console.log("查询的内容", key)
    const db = wx.cloud.database();
    const _ = db.command
    db.collection('shouye').where(_.or([{
      type_one: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      type_two: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      title: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    {
      supplier: db.RegExp({
        regexp: '.*' + key,
        options: 'i',
      })
    },
    ])).skip(this.data.page * 10).limit(10).get({
      success: res => {
        console.log(res.data)
        var arr = res.data
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        that.setData({
          playlist: that.data.playlist.concat(arr)
        })
        console.log(that.data.page)
        wx.hideLoading();
      },
      fail: err => {
        console.log(err)
      }
    })
  },


  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  //点击跳转页面

  shouye:function(){
  wx.switchTab({
    url: '../shou/shou',//跳转的路径    
})

},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.mohus()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})