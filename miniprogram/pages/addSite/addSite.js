// miniprogram/pages/addSite/addSite.js
var app=getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
checkbox:false,
input1:'',
input2:'',
input3:'',
input4:'',
OPENID:"",
list:""
  },

check(){
  if(this.data.checkbox==false){
    this.setData({
      checkbox:true
    })
  }else{
    this.setData({
      checkbox:false
    })
  }
  console.log(this.data.checkbox);
  
},
//时刻更新数据
Input1: function (e) {
 console.log(e)
  this.setData({
    input1: e.detail.value
  })
},
Input2: function (e) {
  console.log(e)
   this.setData({
    input2: e.detail.value
   })
 },
Input3: function (e) {
  console.log(e)
   this.setData({
    input3: e.detail.value
   })
 },
Input4: function (e) {
  console.log(e)
   this.setData({
     input4: e.detail.value
   })
 },




 res: function(e) {
   var that =this.data
  
  console.log(this.data.OPENID);
  
 if(that.checkbox==true){
  wx.cloud.callFunction({
    // 需调用的云函数名
    name: 'default',
    // 传给云函数的参数
    // 成功回调
    complete: console.log("成功")
  })
 }
 db.collection('site').add({
  data: {
    name:that.input1,
    number:that.input2,
    province:that.input3,
    site:that.input4,
    default:that.checkbox
  },
  success: res => {
    // 在返回结果中会包含新创建的记录的 _id

    wx.showToast({
      title: '新增地址成功',
    })
    console.log('[数据库] [新增记录] 成功，记录 _id: ', res)
  },
})
  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      OPENID:app.globalData.openid
    })


    //查询所有site openid 且 为true的值
    db.collection('site').where({
      _openid: this.data.OPENID,
      default:true
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data,'+++')
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