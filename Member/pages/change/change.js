
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId:"",
    userList:"",
    name:'',//姓名
    phone:'',//手机号
    code:'',//验证码
    iscode:null,//用于存放验证码接口里获取到的code
    codename:'获取验证码',

    oldphone:""
  },


  onLoad: function () {
      this.setData({
         userList:wx.getStorageSync('userInfo')
         
      })
      console.log( this.data.userList)
      this.setData({
        userId:this.data.userList.id,
        oldphone:this.data.userList.telephone

      })
      console.log( this.data. oldphone)
      console.log( this.data.userId)
  },
  //获取input输入框的值
  getNameValue:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  getPhoneValue:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  getCode(){
    const that=this
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (that.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(that.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else{
      console.log("调用验证码")
      wx.request({
        method:"GET",
        data: {
          phoneNum:that.data.phone
        },
        'url': "https://www.jomqt.cn/xgj/message/verificationCode",
        success:(res)=> {
          console.log(res.data.data)
          that.setData({
            iscode: res.data.data
          })
          var num = 61;
          var timer = setInterval(function () {
            num--;
            if (num <= 0) {
              clearInterval(timer);
              that.setData({
                codename: '重新发送',
                disabled: false
              })
  
            } else {
              that.setData({
                codename: num + "s"
              })
            }
          }, 1000)
        }
      })
       
    }
     
     
  },
  //获取验证码
  getVerificationCode() {
    const that=this
    this.getCode();
    that.setData({
      disabled: true
    })
  },
  //提交表单信息
  complete(){

    console.log("111")
    //  const that=this
     var ids = wx.getStorageSync('user')
    // console.log(ids)
    // console.log(that.data.phone)
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if(this.data.phone == ""){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
     
    }else if(!myreg.test(this.data.phone)){
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if(this.data.code == ""){
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else if(this.data.code != this.data.iscode){
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1000
      })
      return false;
    }else{
     
      wx.showModal({
        title: '',
        content: '确定修改手机号吗?',
        success:(res)=>{
          wx.request({
            method: "POST",
            url: app.globalData.url + '/member/user/updateMemberUser', 
            
            data: {
              id: ids,
              telephone:this.data.phone
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset:UTF-8' 
            },
            success:(res)=> {
              console.log(res.data)
              wx.showModal({
            
                content: '修改成功',  // 内容
                showCancel:false,
                success:()=>{
                 
                }
              })
              wx.navigateTo({
                url:"/pages/login/login"
              })
            }
          })
  
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
    }

  },

  // 更改用户信息
  save() {

    // var that=this

    // var ids = wx.getStorageSync('user')
    // console.log(ids)
    // console.log(that.data.phone)
    // var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
      // if(this.data.phone == ""){
      //   wx.showToast({
      //     title: '手机号不能为空',
      //     icon: 'none',
      //     duration: 1000
      //   })
      //   return false;
      // }else if(!myreg.test(this.data.phone)){
      //   wx.showToast({
      //     title: '请输入正确的手机号',
      //     icon: 'none',
      //     duration: 1000
      //   })
      //   return false;
      // // }
      // // if(this.data.code == ""){
      // //   wx.showToast({
      // //     title: '验证码不能为空',
      // //     icon: 'none',
      // //     duration: 1000
      // //   })
      // //   return false;
      // // }else if(this.data.code != this.data.iscode){
      // //   wx.showToast({
      // //     title: '验证码错误',
      // //     icon: 'none',
      // //     duration: 1000
      // //   })
      // //   return false;
      // }else{
  
   


   
  }
})