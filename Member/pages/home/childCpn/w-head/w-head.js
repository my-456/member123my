// pages/home/childCpn/w-head/w-head.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   name:String,
   photo:String,
   email:String, 
   tel:String,
   time:String,
   vipType: String,
   member:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    codeImg: "/assets/images/memberCode/memberCode.jpg", //会员码
    modalHidden: true, //二维码弹窗
  },
  /**
   * 组件的方法列表
   */
  methods: {

    getCode() {
      this.setData({
        modalHidden: false
      })
    },
 /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },
    /**
   * 点击取消
   */
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  }
})
