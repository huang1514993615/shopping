// components/classify/classify.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      playlist:{
        type:Object
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    nva() {
      wx.navigateTo({
        url: `/pages/detailPage/detailPage?id=${this.data.playlist.Id}`
      });
      console.log(this.data.playlist.Id)
    },
  }
})
