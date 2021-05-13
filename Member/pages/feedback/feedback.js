// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    makecode:"",// 验证码
    code: "",//生成的验证码
    headline:"",//标题
    path:'',
    filename:'',
    content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

 //验证码
 createCode() {
  var code;
  //首先默认code为空字符串
  code = '';
  //设置长度，这里看需求，我这里设置了4
  var codeLength = 4;
  //设置随机字符
  var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
  //循环codeLength 我设置的4就是循环4次
  for (var i = 0; i < codeLength; i++) {
    //设置随机数范围,这设置为0 ~ 10
    var index = Math.floor(Math.random() * 10);
    //字符串拼接 将每次随机的字符 进行拼接
    code += random[index];
  }
  //将拼接好的字符串赋值给展示的code
  this.setData({
    code: code
  })
},
 /**
   * 生命周期函数--监听页面初次渲染完成
   */

   //生成验证码
   onReady: function () {
    this.createCode();
  },
  getcode: function () {
    this.createCode();
  },
  submit(){
    if(this.data.content==""){
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if(this.data.makecode==""){
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
    }
   else if(this.data.makecode != this.data.code){
      wx.showToast({
        title: '验证码不正确',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.showToast({
      title: '已提交',
        icon: 'none',
        duration: 2000
      })

    }

  },
  //获取输入验证码
  makecodeInput: function (e) {
    this.setData({
      makecode: e.detail.value
    })
  },
content(e){
  this.setData({
    content:e.detail.value
    })
},

  phoneCall: function (e) {
    wx.makePhoneCall({
    phoneNumber: e.currentTarget.dataset.replyPhone,
    success: function () {
    console.log("成功拨打电话")
    },
    })
    },
     // 一键复制事件
  copyBtn: function (e) {
    wx.setClipboardData({
     //准备复制的数据
      data: "dlmunan",
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },

})