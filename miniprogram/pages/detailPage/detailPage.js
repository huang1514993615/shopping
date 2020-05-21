// miniprogram/pages/detailPage/detailPage.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:[],
    list:['图文详情','商品参数','购买须知'],
    currentData:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //根据获取到的id查询云数据库对应的数据
    var that = this
    const db = wx.cloud.database();
    const _ = db.command
    db.collection('shouye').where({
      Id:options.id
    }).get({
      success: res => {
        console.log(res.data,'++++++')
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        that.setData({
          content: res.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })


  },
  bt(){
    console.log(this.data.content[0].imgs[0],'========');
  },
  ontab:function(event){
    const that=this
    //  console.log(event.currentTarget.dataset.current)
     this.setData({
      currentData:event.currentTarget.dataset.current
     })
   },
    



  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  //写入缓存
  res: function(e) {
    const db = wx.cloud.database()
    db.collection('gouwuche').add({
      data: {
        img_url:this.data.content[0].img_url,
        title:this.data.content[0].title,
        price:this.data.content[0].price,
        id:this.data.content[0].Id,
        supplier: this.data.content[0].supplier,
        whether:false,
        amount: 1,
        shu:this.data.content[0].price,
        OPENID:app.globalData.openid


      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id

        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})