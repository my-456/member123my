
import WxValidate from '../../utils/WxValidate'
//获取应用实例
const app = getApp()
// 验证字段的规则
const rules = {
  telephone: {
    required: true,
    tel: true,
  },
  email: {
    required: true,
    email: true,
  },
  name: {
    required: true,
  },
  sex: {
    required: true,
  },
  birthday: {
    required: true,
  },
  highestEducation: {
    required: true,
  },
  highestDegree: {
    required: true,
  },
  address: {
    required: true,
  },
  profession: {
    required: true,
  },
  technicalTitles: {
    required: true,
  },
  company: {
    required: true,
  },
  department: {
    required: true,
  },
  certificateNumber:{
    required: true,
    idcard:true
  },
  companyOffice:{
    required: true,
  }
}

// 验证字段的提示信息，若不传则调用默认的信息
const messages = {
  telephone: {
    required: '请填写您的手机号',
    tel: '请正确填写您的手机号',
  },
  email: {
    required: '请填写您的邮箱',

  },
  name: {
    required: '请填写您的姓名',
  },
  sex: {
    required: '请选择您的性别',
  },
  birthday: {
    required: '请选择您的出生年月',
  },
  highestEducation: {
    required: '请选择您的最高学历',
  },
  highestDegree: {
    required: '请选择您的最高学位',
  },
  address: {
    required: '请选择您的所属地区',
  },
  profession: {
    required: '请填写您的专业',
  },
  technicalTitles: {
    required: '请填写您的技术职称',
  },
  company: {
    required: '请填写您的工作单位',
  },
  department: {
    required: '请填写您的部门',
  },
  certificateNumber:{
    required: '请填写身份证号', 
  },
  companyOffice:{
    required: '请填填写单位任职',
  }

}

Page({
  data: {
    userList: {},
    cardType:['身份证','军官证','护照','其他'],
    partyList:['无','中国共产党','中国国民党革命委员会','中国民主同盟','中国民主建国会','中国民主促进会','中国农工民主党','中国致公党','九三学社','台湾民主自治同盟'],
    typeLists:["无","理事长","副理事长","常务理事","理事","监事长","监事","普通会员"],//会员类型
    position:0,
    partyGroupings:'',//党派
    sex:'',//性别
    date:'',
    region:'',//省市区
    highestDegree:'',//最高学位
    highestEducation:'',//最高学历
    certificateType:'',//证件类型
    technicalTitles:'',//技术职称
    addType:"",//会员类型
    companyOffice:'',//单位任职
    WxValidate : null,
    imgPath:'',//图片
    lastName:"",//姓
    firstName:"",//名
    postcode:"",
    
  },
  
  onLoad: function () {
    //this.checkToken()//验证是否已登录
    this.setData({//取出信息
        userList: wx.getStorageSync('userInfo')
    })
    //下拉选项
    let typeIndex = this.data.userList.certificateType ? this.data.cardType.indexOf(this.data.userList.certificateType) : ''
    let partyIndex = this.data.userList.partyGroupings ? this.data.partyList.indexOf(this.data.userList.partyGroupings): ''
    let addTypeIndex = this.data.userList.addType ? this.data.typeLists.indexOf(this.data.userList.addType): ''
    this.setData({
      //补全修改资料已有得用户信息
      partyGroupings: partyIndex,
      sex: this.data.userList.sex,
      date: this.data.userList.birthday?this.data.userList.birthday.slice(0,10) : '',
      certificateType: typeIndex,
      region: this.data.userList.address?this.data.userList.address.split(' ') :'',
      highestDegree: this.data.userList.highestDegree,
      highestEducation: this.data.userList.highestEducation,
      technicalTitles: this.data.userList.technicalTitles,
      companyOffice: this.data.userList.companyOffice,
      imgPath: this.data.userList.headPhoto,
      postcode:  this.data.userList.postcode,
      lastName:this.data.userList.familyNameSpell,
      firstName:this.data.userList.firstNameSpell, 

      addType:addTypeIndex
    })
    console.log(1111)
    //实例化验证插件
    this.WxValidate = new WxValidate(rules, messages)
  },
  checkToken: function(e) {//验证登陆状态
    if (!wx.getStorageSync('user')) {
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
  },
  goback: function(e) {//跳转到首页
    wx.navigateTo({
      url: '/pages/home/home'
    })
  },
  selectImg: function () {//上传图片
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        //res.tempFilePaths 返回图片本地文件路径列表
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          imgPath: tempFilePaths[0]
        })
        console.log(that.data.imgPath,'selectImg')
      }
    })
  },
  previewImg: function (e) {
    var img = this.data.imgPath;
    console.log(this.data.imgPath,'previewImg')
    // 设置预览图片路径
    wx.previewImage({
      current: img,
      urls: [img]
    })
  }, 



//设置时间格式
  formatTime(date) {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute, second].map(this.formatNumber).join(':')
  },
  formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
  },

  /** 
   * 时间戳转化为年 月 日 时 分 秒 
   * number: 传入时间戳 
   * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
  */
  formatTimeTwo(number, format) {
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];
    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(this.formatNumber(date.getMonth() + 1));
    returnArr.push(this.formatNumber(date.getDate()));
    returnArr.push(this.formatNumber(date.getHours()));
    returnArr.push(this.formatNumber(date.getMinutes()));
    returnArr.push(this.formatNumber(date.getSeconds()));
    for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
  },



//验证民族
  formSubmit: function (e) {
    if (!this.checkNation(e.detail.value.nation)) {
      wx.showToast({
        title: '民族不正确',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    var that = this;
    if (!this.WxValidate.checkForm(e.detail.value)) {
      const error = this.WxValidate.errorList[0]
      //弹窗
      wx.showModal({
        title: "保存失败",  // 标题
        content: `${error.msg} `,  // 内容
        showCancel:false,
        success: function(){
        }
      })
      return false
    }
    console.log(this.data.userList.headPhoto,this.data.imgPath)
    if (this.data.imgPath == this.data.userList.headPhoto) {
      this.requestNoPic(e)
      return
    }
    wx.uploadFile({//调用修改资料接口
      url: app.globalData.url + "/member/user/updateMemberUser",
      filePath: this.data.imgPath,
      name: "file",
      // 请求携带的额外form data
      formData: {
         "id": wx.getStorageSync('user'),
        "address": e.detail.value.address,
        "birthday": this.formatTime(e.detail.value.birthday),
        "certificateNumber": e.detail.value.certificateNumber,
        "certificateType": e.detail.value.certificateType,
        "company": e.detail.value.company,
        "companyAddress": e.detail.value.companyAddress,
        "companyOffice": e.detail.value.companyOffice,
        "addType":e.detail.value.addType,
        "companyTelephone": e.detail.value.companyTelephone,
        "department": e.detail.value.department,
        "email": e.detail.value.email,
        "familyNameSpell": e.detail.value.familyNameSpell,
        "fax": e.detail.value.fax,
        "firstNameSpell": e.detail.value.firstNameSpell,
        "highestDegree": e.detail.value.highestDegree,
        "highestEducation": e.detail.value.highestEducation,
        "name": e.detail.value.name,
        "nation": e.detail.value.nation,
        "partyGroupings": e.detail.value.partyGroupings,
        "postcode": e.detail.value.postcode,
        "profession": e.detail.value.profession,
        "sex": e.detail.value.sex,
        "technicalTitles": e.detail.value.technicalTitles,
        "telephone": e.detail.value.telephone,
        "weChatNumber": e.detail.value.weChatNumber,
      },
      header: {
        'Content-Type': 'multipart/form-data'
      },
      success: function (res) {
        console.log(res)
        if (JSON.parse(res.data)['code'] == '200') {
          console.log(res)
          wx.showToast({
            title: "保存成功！",
            icon: "",
            duration: 1500,
            mask: true
          });
          wx.setStorageSync('userInfo', JSON.parse(res.data)['data'])
          wx.navigateTo({
            url: '/pages/home/home'
          })
          return
        } else {
          wx.showModal({
            title: "保存失败",  // 标题
            content: JSON.parse(res.data)['msg'],  // 内容
            showCancel:false,
            success: function(){ 
            }
          })
        }
      },
      error: function (res) {
        wx.showToast({
          title: "保存失败，请检查网络或稍后重试。",
          icon: "none",
          duration: 1500,
          mask: true
        });
      }
    })
  },

//调用修改头像接口
  requestNoPic: function (e) {
    let _this = this
    wx.request({
      url: app.globalData.url + '/member/user/updateMemberUserNoHeadPhoto',
      data:{
        "id": wx.getStorageSync('user'),
        "address": e.detail.value.address,
        "birthday": e.detail.value.birthday,
        "certificateNumber": e.detail.value.certificateNumber,
        "certificateType": e.detail.value.certificateType,
        "company": e.detail.value.company,
        "companyAddress": e.detail.value.companyAddress,
        "companyOffice": e.detail.value.companyOffice,
        "companyTelephone": e.detail.value.companyTelephone,
        "department": e.detail.value.department,
        "email": e.detail.value.email,
        "familyNameSpell": e.detail.value.familyNameSpell,
        "fax": e.detail.value.fax,
        "firstNameSpell": e.detail.value.firstNameSpell,
        "highestDegree": e.detail.value.highestDegree,
        "highestEducation": e.detail.value.highestEducation,
        "addType":e.detail.value.addType,
        "name": e.detail.value.name,
        "nation": e.detail.value.nation,
        "partyGroupings": e.detail.value.partyGroupings,
        "postcode": e.detail.value.postcode,
        "profession": e.detail.value.profession,
        "sex": e.detail.value.sex,
        "technicalTitles": e.detail.value.technicalTitles,
        "telephone": e.detail.value.telephone,
        "weChatNumber": e.detail.value.weChatNumber,
        "headPhoto": this.data.imgPath,
      },
      method:"POST",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == '200') {
          wx.showToast({
            title: "保存成功！",
            icon: "",
            duration: 1500,
            mask: true
          });
          
          wx.setStorageSync('userInfo', res.data.data)
          wx.navigateTo({
            url: '/pages/home/home'
          })
          return
        } else {
          wx.showToast({
            title: "保存失败",
            icon: "",
            duration: 1500,
            mask: true
          });
        }
      }
    })
  },

  //获取输入框得值
  sexChange: function (e) {
    this.setData({
      sex:e.detail.value
    })
  },
  degreeChange: function (e) {
    this.setData({
      highestDegree:e.detail.value
    })
  },
  technicalTitlesChange: function (e) {
    this.setData({
      technicalTitles:e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  // bindPickerChange: function (e) {
  //   this.setData({
  //     socialOffice: e.detail.value
  //   })
  // },
  bindTypeChanges: function(e){
    this.setData({
      addType: e.detail.value
    })
  },
  // bindPickerChanges: function (e) {
  //   this.setData({
  //    job: e.detail.value
  //   })
  // },
  bindRegionChange: function (e) {
      this.setData({
        region: e.detail.value
      })
  },
  partyChange: function (e) {
      this.setData({
        partyGroupings: e.detail.value
      })
  },
  positionListChange: function (e) {
      this.setData({
        companyOffice: e.detail.value
      })
  },
  highestEducationChange: function (e) {
      this.setData({
        highestEducation: e.detail.value
      })
  },
  typeChange: function (e) {
      this.setData({
        certificateType: e.detail.value
      })
  },
  technicalChange: function (e) {
      this.setData({
        technicalTitles: e.detail.value
      })
  },

//民族验证
nation:function(e){
  let nation = e.detail.value
  let checkedNation = this.checkNation(nation)
  }, 
  checkNation: function (nation) {
  let str = /^[\u0391-\uFFE5]+$/
 if (str.test(nation)) {
 return true
} else {
return false 
}
  },

//验证邮编 
   formatNum(e) {  //正则验证金额输入框格式
    e.detail.value = e.detail.value.replace(/^(\-)*(\d+)\.(\d{6}).*$/, '$1$2.$3')
    e.detail.value = e.detail.value.replace(/[\u4e00-\u9fa5]+/g, ""); //清除汉字
    e.detail.value = e.detail.value.replace(/[^\d.]/g, ""); //清楚非数字和小数点
    e.detail.value = e.detail.value.replace(/^\./g, ""); //验证第一个字符是数字而不是  
    e.detail.value = e.detail.value.replace(/\./g, ""); //只保留第一个小数点, 清除多余的 
  },
postcode: function (e) {
  var that = this;
  that.formatNum(e);  
  let value= e.detail.value;
  console.log(value);
  //that.userList.postcode = value
  that.setData({
    postcode:value
  })    
},

  //  //验证姓
  lastName:function(e){
    var that = this;
    e.detail.value= e.detail.value.replace(/[^\a-\z\A-\Z]/g ,"")
    let value= e.detail.value;
    console.log(value),
    that.setData({
      lastName:value
    })  
  },
//验证名
  firstName:function(e){
    var that = this;
    e.detail.value= e.detail.value.replace(/[^\a-\z\A-\Z]/g ,"")
    let value= e.detail.value;
    console.log(value),
    that.setData({
      firstName:value
    })  
  },

})

