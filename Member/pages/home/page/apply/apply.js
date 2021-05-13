// pages/home/page/apply/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*按钮*/
    btn_disabled: true,
    tab: true,
    currentData: 0,
    list: "",//勾选的内容
    flag:true,//禁止勾选
    isNull:"",
    sbm:true//禁止提交
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**相关协议 法律文件 */
  bindAgreeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      isAgree: e.detail.value.length,
    })
    if (e.detail.value.length == 1) {
      this.setData({
        btn_disabled: false,
      })
    } else {
      console.log(e.detail.value.length)
      this.setData({
        btn_disabled: true
      })
    }
  },


  submit() {
    this.setData({
      tab: false
    })
  },
  goOut1() {
    wx.navigateTo({
      url: '/pages/home/home',
    })

  },

  goOut() {
    this.setData({
      tab: true,
      btn_disabled: true,
    })
  },
  // --------------------------------------------------


  //获取多选框的值
  checkboxChange1: function (e) {
this.setData({
  flag:!this.data.flag,
 sbm:!this.data.sbm
})
  },
      //获取多选框的值
      checkboxChange: function (e) {
        this.setData({
          list: e.detail.value
        })
        console.log(this.data.list)
      },
  submit1() {//提交
    wx.showToast({
      title: '已提交',
      icon: 'none',
      duration: 2000
    })
    wx.setStorageSync('values', this.data.list)
    console.log(this.data.list)
    wx.navigateTo({
      url: '/pages/home/home',
    })
  }
})