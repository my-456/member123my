//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    titles:['单位会员','个人会员'],
    member:2,
  },

  //事件处理函数
  onLoad: function () {
    this.checkToken()

  },

//取出index
  handleTabClick(event){
    const index=event.detail.index;
   wx.setStorageSync('userIndex', index)
   if(index==0){
  this. member=2
  this.setData({
    member:this.member
  })
   }else if(index==1){
    this. member=1
    this.setData({
      member:this.member
    })
   }
   console.log(this.member)
   
  },
  
  //本地储存
  setUserInfo: function (data) {
    console.log(data)
    wx.setStorageSync('user', data.id)
    wx.setStorageSync('userInfo', data)
    wx.setStorageSync('time',data.createTime)
    console.log(data)
  },
  
  //跳转到首页
  goback: function (e) {
    wx.navigateTo({
      url: '/pages/home/home'
    })
  },

  ////跳转到注册页
  // goRegister() {
    
  //   wx.navigateTo({
  //     url: "/pages/register/register"
  //   })
  // },
  goForgetPassword(){
    wx.navigateTo({
      url: '/pages/forgetPassword/forgetPassword',
    })

  },
  //登陆验证
  checkToken: function (e) {
    if (wx.getStorageSync('user')) {
      //若已登录跳转到首页
      wx.navigateTo({
        url: '/pages/home/home'
      })
    }
  },

  //点击登录，调接口
  formSubmit(e) {

    if (!e.detail.value.name || !e.detail.value.password) {
      wx.showModal({
        title: "登录失败", // 标题
        content: '账号密码不能为空', // 内容
        showCancel: false,
        success: function () {}
      })
      return
    }
    let _this = this
    console.log(_this.data.member)
    wx.request({
      url: app.globalData.url+'/member/user/loginMemberUser',
      method: "POST",
      data: {
        'memberType': _this.data.member,
        'account': e.detail.value.name,
        'password': e.detail.value.password
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("res:"+res)
        if (res.data.code == 200) {
          //弹窗
          wx.showToast({
            title: '登录成功', // 标题
            icon: 'success', // 图标类型，默认success
            duration: 1500, // 提示窗停留时间，默认1500ms
            success: function () {
              console.log("res"+res)
              _this.setUserInfo(res.data.data)
              wx.navigateTo({
                url: '/pages/home/home'
              })
            }
            
          })
        } else {
          //弹窗
          wx.showModal({
            title: "登录失败", // 标题
            content: res.data.msg, // 内容
            showCancel: false,
            success: function () {

            }
          })
        }
      },
      fail: function () {
        //弹窗
        wx.showToast({
          title: '请求失败', // 标题
          icon: 'none', // 图标类型，默认success
          duration: 1500 // 提示窗停留时间，默认1500ms
        })
      }
    })
  },
})