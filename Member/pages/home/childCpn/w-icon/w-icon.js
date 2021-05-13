// pages/home/childCpn/w-icon/w-icon.js
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

  },
  /**
   * 组件的方法列表
   */
  methods: {

    //修改密码
    changePassword: function(e) {
    wx.navigateTo({
      url: '/pages/changePsw/changePsw'
    })
  },

  //个人资料
  userEdit: function(e) {
    wx.navigateTo({
      url: '/pages/personal/personal'
    })
  },

      //退出登录
    gotoLogin(){

      wx.showModal({
        title: '',
        content: '确定要退出登录吗?',
        success: function (res) {
          if (res.confirm) {  
            console.log('点击确认回调')
            wx.clearStorage({
              complete: (res) => {  
              },
            })
            wx.navigateTo({
              url:"/pages/login/login"
            })
          } else {   
            console.log('点击取消回调')
          }
        }
      })

    
    },
    goAbout(){
      wx.navigateTo({
        url:"/pages/about/about"
      })
    },

    goFeed(){
      wx.navigateTo({
        url:"/pages/feedback/feedback"
      })

    },
    goInform(){
      wx.navigateTo({
        url:"/pages/inform/inform"
      })
    },
    goNotice(){
      wx.navigateTo({
        url:"/pages/notice/notice"
      })

    },
    updatTle(){
      wx.navigateTo({
        url:"/pages/change/change"
      })


    }

  },
  

})
