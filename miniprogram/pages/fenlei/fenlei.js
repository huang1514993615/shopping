// miniprogram/pages/fenlei/fenlei.js
const db = wx.cloud.database({
  //这个是环境ID不是环境名称     
  env: 'text-c3v5d'
}) 
const cont = db.collection('river_data');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:['美食','美妆','居家','洗护','勤杂'],
    currentData:0,
    playlist:[],
    nanzhuang:[],
    nvzhuang:[],
    yinshi:[],
    
  },

 ontab:function(event){
  const that=this
  //  console.log(event.currentTarget.dataset.current)
   this.setData({
    currentData:event.currentTarget.dataset.current
   })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.lists('咖啡','playlist')
this.lists('男装','nanzhuang')
this.lists('女装','nvzhuang')
this.lists('饮食','yinshi')
  },


  lists(a,b) {
    const that=this
    //1、引用数据库  
    wx.showLoading({
      title: '加载中...',
    });

    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('shouye').where({
      type_one:a
    }).limit(3).get({
      //如果查询成功的话    
      success: res => { 
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
       const play=b
        that.setData({
        [play]: res.data
        })
        console.log(play,'=====');
        console.log(that.data)
        wx.hideLoading();
      }
    })
  },
 

  sousuo:function(){
    wx.navigateTo({
      url: '../sousuo/sousuo',//跳转的路径
      success:function(a){
        console.log(a);
        
      }   ,     //成功后的回调；
      fail:function(e){
        console.log(e,'==');
        
      }     
  })
  console.log('成功');
  
  },

//双向绑定input内的值
 
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