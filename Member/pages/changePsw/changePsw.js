//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //this.checkToken()
  },
  clearUserInfo(){
    app.globalData.userInfo = null
    wx.setStorageSync('user', '')
  },
  goback: function(e) {
    wx.navigateTo({
      url: '/pages/home/home',
    })
  },
  checkToken: function(e) {
    if (!wx.getStorageSync('user')) {
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
  },
  
  formSubmit(e) {
    if (e.detail.value.password != e.detail.value.repassword) {
      wx.showModal({
        title: "修改密码失败",  // 标题
        content: '两次密码不一致',  // 内容
        showCancel:false,
        success: function(){
          
        }
      })
      return
    }
    let _this = this
    wx.request({
      url: app.globalData.url + '/member/user/updateMemberUserPasswordById',
      data:{'oldPassword': e.detail.value.oldPassword, 'password': e.detail.value.password, 'id':wx.getStorageSync('user')},
      method:"POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var date = res.data;
        
        if (res.data.code == 200) {
          _this.clearUserInfo()
          //弹窗
          wx.showToast({
            title: '修改成功',  // 标题
            icon: 'success',   // 图标类型，默认success
            duration: 2000,   // 提示窗停留时间，默认1500ms
            success: function(){
              wx.reLaunch({
                url: '/pages/login/login'
              })
            }
          })
        } else {
          wx.showModal({
            title: "修改失败",  // 标题
            content: res.data.msg,  // 内容
            showCancel:false,
            success: function(){
              
            }
          })
        }
      },
      fail: function () {
        //弹窗
        wx.showToast({
            title: '请求失败',  // 标题
            icon: 'none',   // 图标类型，默认success
            duration: 1500   // 提示窗停留时间，默认1500ms
        })
      }
    })
  },
})
