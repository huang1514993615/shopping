// miniprogram/pages/gouwuche/gouwuche.js
const db = wx.cloud.database({
  //这个是环境ID不是环境名称     
  env: 'text-c3v5d'
})
const cont = db.collection('river_data');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    checkbox:false ,   // 全选状态，默认全选
    cart:1
  },
  jia(e){
    var index=e.currentTarget.dataset.index//对应的索引值
    var types = e.currentTarget.dataset.types;//加减的数据
    var carts=this.data.carts//数组数据
    var list=this.data.carts;
    
    if(types=='minus'){
    var amounts=carts[index].amount
    
      if(amounts>1){
        carts[index].amount--;
        carts[index].shu=carts[index].amount*carts[index].price;
        console.log(carts[index].amount,'===');
        
        this.setData({
          carts:carts
        })

        
      }else{
      }
      
    }else if(types=="add"){
        carts[index].amount++
        carts[index].shu=carts[index].amount*carts[index].price;
        console.log(carts[index].amount,'------');
        
        this.setData({
          carts:carts
        })
      
    }

    var list=this.data.carts;
    if(list[index].whether==true){
      var lists=this.data.carts
      var totalPrice=0;
    for(var i=0; i<lists.length; i++){
      console.log(lists[i]);
      if(lists[i].whether==true){
        totalPrice+=lists[i].price*lists[i].amount
        console.log(totalPrice,"---");
        
      }
    }
    this.setData({
      totalPrice:totalPrice
    })
    }

   },
  

//计算总价格
totalPrice(e){
  var list=this.data.carts;
  var index=e.currentTarget.dataset.index
   

  
  
  if(list[index].whether==false){
    list[index].whether=true
    this.setData({
      carts:list
    })
  }else  if(list[index].whether==true){
    list[index].whether=false
    this.setData({
      carts:list
    })
  }
  console.log(this.data.carts[index].whether,'++')
  var lists=this.data.carts
  var totalPrice=0;
for(var i=0; i<lists.length; i++){
  console.log(lists[i]);
  if(lists[i].whether==true){
    totalPrice+=lists[i].price*lists[i].amount
    console.log(totalPrice,"---");
    
  }
}
this.setData({
  totalPrice:totalPrice
})
},

//在勾选之后,加减购物车更新总价格


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
 
  check(e){
    const set=this.data.carts
    if(this.data.checkbox==true){
      this.setData({
        checkbox:false
      })
      for(var y=0; y<this.data.carts.length;y++){
         set[y].whether=false
      }
      this.setData({
        carts:set
      })
    }else{
      this.setData({
        checkbox:true
      })
      for(var y=0; y<this.data.carts.length;y++){
        console.log('准备');
        
        set[y].whether=true
        console.log(this.data.carts[y].whether,'成功')

    }
    this.setData({
      carts:set
    })
    }
      var lists=this.data.carts
      var totalPrice=0;
    for(var i=0; i<lists.length; i++){
      console.log(lists[i]);
      if(lists[i].whether==true){
        totalPrice+=lists[i].price*lists[i].amount
        console.log(totalPrice,"---");
        
      }
    }
    this.setData({
      totalPrice:totalPrice
    })

  },
  

//删除
delete: function() {
  var that=this
  var del=this.data.carts;
  for(let i=0;i<del.length;i++){
    if (del[i].whether==true) {
      db.collection('gouwuche').doc(that.data.carts[i]._id).remove({
        success: res => {
          wx.showToast({
            title: '删除成功',
          })
          //删除成功从新执行或取云函数的函数
         that.list()
        },
        fail: err => {
          wx.showToast({
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', that.data.carts[i].id)
        }
      })
    }
  }
  },
  

  list() {
    const that = this
    //1、引用数据库  
    wx.showLoading({
      title: '加载中...',
    });

    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('gouwuche').where({
      _openid:app.globalData.openid
    }).get({
      //如果查询成功的话    
      success: res => {
        if (res.data.length>0){
          that.setData({
            carts: res.data,
            hasList: true
          })
        } else if( res.data.length ==0){
          that.setData({
            hasList: false
          })
        }
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
       
        console.log(that.data.carts)
        wx.hideLoading();
      }
    })
  },




  set(e){
    if(this.data.checkbox==true){
      this.setData({
        checkbox:false
      })
      
    }
  },


  //跳转到商品页面
  nva(e) {
    var index=e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/detailPage/detailPage?id=${this.data.carts[index].id}`
    });
  },
/**
   * 生命周期函数--监听页面显示
*/
  onShow: function (e) {
    this.list()
   this.set(e)
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
