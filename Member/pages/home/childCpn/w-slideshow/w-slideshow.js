// pages/home/childCpn/w-slideshow/w-slideshow.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
 
  },

  /**
   * 组件的初始数据
   */
  data: {
    listImg:[
      {
        id:1,
        src:"/assets/images/home/close.png"
      },
      {
        id:1,
        src:"/assets/images/home/manpower.png"
      }
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goInvoice(){
      wx.navigateTo({
        url: '/pages/home/page/invoice/invoice',
      })
    },
    goCost(){
      wx.navigateTo({
        url: '/pages/home/page/cost/cost',
      })
    }
  }
})
