
// pages/register/register.js
// 城市选择器
const app = new getApp()
import WxValidate from '../../utils/WxValidate'
Page({
  data: {
    WxValidate:null,
    name: "",
    email: "",
    phone: "",
    job: "",
    password: "",
    apassword: "",
    inputValue: "",
    // 地区选择器
    region:["北京","北京","东城区"],
    makecode:"",// 验证码
    code: "",
    tel:"手机",
    member:""//类型
  },

  onLoad: function () {
    this.initValidate();
    var index=wx.getStorageSync('userIndex')
    if(index==0){
       this.tel="法人电话"
       this.member=2
       this.setData({
        tel:this.tel,
        member:this.member
      })
   }else if(index==1){
      this.tel="个人电话"
      this. member=1
      this.setData({
        tel:this.tel,
        member:this.member
      })
   } 

   console.log(this.tel+this.member)
  },

  //验证规则
  initValidate(){
    const rules = {
      field:this.password,
      email:{
        required:true,
        email:true
      },
      phone:{
        required:true,
        tel:true
      },
      name:{
        required:true
      },
      job:{
        required:true
      },
      password:{
        required:true,
        rangelength:[6,16]
      },
      apassword:{
        required:true,
        equalTo:"password"
      },
      makecode:{
        required:true,
  
      },
    }
    const messages= {
      email:{
        required:"请填写邮箱",
        email:"请填写正确邮箱"
      },
      phone:{
        required:"请填写手机号",
        tel:"请填写正确手机号"
      },
      name:{
        required:"请填写姓名"
      },
    
      job:{
        required:"请填写工作"
      },
      password:{
        required:"请填写密码"
      },
      apassword:{
        required:"请确认密码",
        equalTo:"密码错误"
      },
      makecode:{
        required:"请输入验证码",
      },
    
    }
    this.WxValidate = new WxValidate(rules, messages)
    },
     /**
   * 生命周期函数--监听页面加载
   */
  

  //城市选择器
  bindRegionChange (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
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
  onReady() {
    this.createCode();
  },
  getcode () {
    this.createCode();
  },
 
  //注册按钮点击事件
  formSubmit(e){
    
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params=e.detail.value
    //验证信息
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      //弹窗
      wx.showModal({
        title: "注册失败",  // 标题
        content: `${error.msg} `,  // 内容
        showCancel:false,
        success: function(){  
        }
      })   
    }else if (this.data.makecode != this.data.code) {
        wx.showToast({
          title: '验证码不正确',
          icon: 'none',
          duration: 2000
        })
      }
    else {
      
      //调用接口
      wx.request({
        url: app.globalData.url + '/member/user/createMemberUser', //接口名称  
        header: {
          'content-type': "application/json"  // 默认值（固定，我开发过程中还没有遇到需要修改header的）     
        },
        method: 'post',
        data: {
          name: this.data.name,
          province: this.data.region[1],
          city: this.data.region[2],
          company: this.data.job,
          password: this.data.password,
          email: this.data.email,
          telephone: this.data.phone,
          memberType:this.data.member
        },
        success:(res)=>{
          console.log("数据"+res)
          wx.setStorageSync('member',this.data.member)
          console.log("注册的会员类型："+this.data.member)
          if (res.data.success) {
            console.log(res)
            console.log(res.data.msg)   //成功之后的回调   
            wx.navigateTo({
              url: '/pages/login/login',
            })
            wx.showToast({
              title: res.data.msg,
            })
          } else {
            console.log(res)
            wx.showToast({
              title: res.data.msg,
              icon: "none"
            })
          }
        }
      })
    }
  },

  //获取输入框内容
  makecodeInput: function (e) {
    this.setData({
      makecode: e.detail.value
    })
  },
  getInputPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  getInputAffirmPassword: function (e) {
    this.setData({
      apassword: e.detail.value
    })
  },
  
  getName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  getEmail: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  getPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getJob: function (e) {
    this.setData({
      job: e.detail.value
    })
  },
  goback(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }


  
})