// components/shoppingCart/shoppingCart.js

const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playlist: {
      type: Object
    },
    checkbox:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    cart:1,
  shu:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jia(){
     var num=this.data.cart
      num=num+1
      this.setData({
       cart:this.data.cart+1,
       shu:num*this.__data__.playlist.price
      })
      console.log(this.__data__.playlist.price)
    },
    jian() {
      if (this.data.cart>1){
        var num=this.data.cart
      num=num-1
        this.setData({
          cart: this.data.cart - 1,
          shu: num * this.__data__.playlist.price
        })
      }
      
    },
  }
})
