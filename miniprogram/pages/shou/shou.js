// miniprogram/pages/shou/shou.js
const db = wx.cloud.database({
  //这个是环境ID不是环境名称     
  env: 'text-c3v5d'
}) 
const cont = db.collection('river_data');
const count=0


Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:[
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586005391058&di=3e9ea7c40f96edbc18f4f2d54d56beaf&imgtype=0&src=http%3A%2F%2Fc2.haibao.cn%2Fimg%2F600_0_100_1%2F1584341849.6381%2F1a4c01cb161fdae4d2cdbb1f8c3db3a3.jpeg',
      },
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586005976493&di=cb2aa3f2262a64e7352b7e407b6f6c12&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F94o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fb7003af33a87e9503d24933111385343fbf2b4bf.jpg',
      },
      {
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586005976484&di=85f0a33c48fe58b3db733b5fdd960327&imgtype=0&src=http%3A%2F%2Fpic33.nipic.com%2F20130916%2F5387147_193926911000_2.jpg',
      }
    ],
    playlist:[],
    page:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.list()
   
    
  },
  list(){
    const that=this
    //1、引用数据库  
    wx.showLoading({
      title: '加载中...',
    });

    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('shouye').where({}).skip(this.data.page * 3).limit(3).get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        var arr = res.data
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        that.setData({
          playlist: that.data.playlist.concat(arr)
        })
        console.log(that.data.page)
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
  console.log('1')
    // this.setData({
    //   /**前面在页面刚载入的时候已经加载了5条数据（也就是一页），
    //     * 所以当页面上拉事件触发的时候,开始加载第二页的数据，故page得+1
    //     */
    //   page: this.data.page + 1
    // })
    // this.list()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})