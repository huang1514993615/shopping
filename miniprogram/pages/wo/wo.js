// miniprogram/pages/wo/wo.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    openid:""

  },
  login: function (e) {
    if (e.detail.userInfo) {
      this.remote(e.detail.userInfo);
      console.log(e.detail,'+++++');
      
    } else {
      wx.showModal({
        title: '授权失败',
        content: '请开启“使用我的用户信息”',
        confirmText: '去设置',
        success: res => {
          res.confirm && wx.openSetting({
            success: res => {
              res.authSetting['scope.userInfo'] && wx.getUserInfo({
                success: res => this.remote(res.userInfo)
              });
              console.log(res,'+++');
              
            }
          });
          console.log(res,'----');
          
        }
      });
    }
  },
  remote(user) {
    this.setData({ user: user});
    wx.login({
      success: res => {
        // 将res.code发送给服务器端，由服务器端再向微信发起获取openId和unionId的请求，
        // 随后颁发一个登录凭证返回到客户端，客户端将这个凭证保存到本地，作为用户登录的 
        // 凭证，具体代码大家自由去实现哦！
      }
    });
  },
  

  nva(e) {
    var index=e.currentTarget.dataset.index
    wx.navigateTo({
      url:"/pages/site/site"
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid:app.globalData.openid
    })
    console.log(app.globalData.openid,"=======");
    
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