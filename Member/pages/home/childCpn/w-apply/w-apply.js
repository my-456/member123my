// pages/home/childCpn/w-apply/w-apply.js
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
    flag: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goApply() {
      wx.navigateTo({ //跳转申请会员
        url: "/pages/home/page/apply/apply"
      })
    },
    

  showMask: function () { //打开保存图片弹窗
    this.setData({
      flag: false
    })
  },

  closeMask: function () { //关闭保存图片弹窗
    this.setData({
      flag: true
    })
  },

 
  }
})
