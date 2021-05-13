//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    codeImg: "/assets/images/memberCode/memberCode.jpg", //会员码
    modalHidden: true, //二维码弹窗
    vipType: "", //vip图标
    flag: true,
    member: "", //会员类型
    code: "", //会员账号
    userList: null,
    // province: null,
    // city: null,
    tel: "", //电话号
    email: "", //邮箱
    photo: "", //会员证照片
    name: "未设置", //姓名
    pos: "未设置", //职务
    QRcode: "../../assets/images/home/QR1.png", //二维码
    time: "", //有效时间
    imgSrc: "", //会员证图片
    sex: "", //性别
    birthday: "", //出生日期
    profession: "", //专业
    technicalTitles: "", //职称
    company: "", //工作单位
    job: "", //单位任职
    type:"",//新增的会员类型选项
  },

  onLoad() {
   // this.checkToken() //判断是否已登陆
    this.getData()
  },
  onShow(option) {
    //判断会员类型
    let index = wx.getStorageSync('userIndex')
    if (index == 0) { //单位会员
      this.setData({
        vipType: "/assets/images/home/vip.png",
        member: "单位会员",
        code: "DLCSQ001",
      })
    } else if (index == 1) { //个人会员
      this.setData({
        vipType: "/assets/images/home/personage.png",
        member: "个人会员",
        code: "DLCSG001",
      })
    }
   
  },
  onReady() {
    this.downloadImage() //下载图片
  },

  //数据初始化
  getData() {
    //取出userInfo中的值
    console.log(wx.getStorageSync('userInfo'))
    this.setData({
      userList: wx.getStorageSync('userInfo'),
    })
    let str1 = this.data.userList.birthday ? this.data.userList.birthday.slice(0, 10) : '' //生日
    let str2 = this.data.userList.address ? this.data.userList.address.split(' ')[0] : '' //城市
    let str3 = this.data.userList.address ? this.data.userList.address.split(' ')[1] : '' //区域
    let str4 = this.data.userList.name //名字
    if (this.data.userList.headPhoto == null) {
      this.pos = ""
    }
    let str5 = this.data.userList.headPhoto //头像
    let str6 = this.data.userList.socialOffice //
    let str7 = this.data.userList.createTime ? this.data.userList.createTime.split("T")[0] : "" //创建时间
    let str8 = this.data.userList.telephone //电话号
    let str9 = this.data.userList.email //邮箱
    let str10 = this.data.userList.sex //性别
    let str11 = this.data.userList.profession
    let str12 = this.data.userList.technicalTitles
    console.log(str12)
    if (str12 == 2) {
      this.setData({
        technicalTitles: "副高级"
      })
    } else if (str12 == 3) {
      this.setData({
        technicalTitles: "中级"
      })
    } else if (str12 == 4) {
      this.setData({
        technicalTitles: "初级"
      })
    } else {
      this.setData({
        technicalTitles: "正高级"
      })
    }
    let str13 = this.data.userList.company
    let str15 = this.data.userList.addType
    let str16 =this.data.userList.companyOffice
    //设置默认值
    if (str5 == null) {
      str5 = "../../assets/images/home/user.jpg"
      times = ""
      str6 = "未设置"
    }
    let createTime = wx.getStorageSync('time') //获取创建时间
    //截取，并设置时间格式
    let str0 = createTime ? createTime.split("T")[0] : "";
    let timestamp = new Date(str0).getTime() + 31536000000; //设置时间间隔
    let util = require("./utils/util.js");
    let times = util.js_date_time(timestamp);
   
    //把取出的值赋予对应字段
    this.setData({
      time: times,
      birthday: str1,
      province: str2,
      city: str3,
      name: str4,
      photo: str5,
      pos: str6,
      tel: str8,
      email: str9,
      sex: str10,
      birthday: str1,
      profession: str11,
      company: str13,
      job: str16,
      type: str15,
    })
    //存储头像
    wx.setStorageSync('img', str5)
  },
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

  //下载图片
  downloadImage() {
    //取出头像
    let img = wx.getStorageSync('img')
    console.log("图片" + img)
    //下载头像
    wx.downloadFile({
      url: img,
      success: (res) => {
        if (res.statusCode === 200) {
          wx.getImageInfo({ //获取图片信息
            src: res.tempFilePath, //服务器返回的图片地址
            success: (res) => {
              console.log(res)
              wx.showToast({
                title: '正在加载...',
                icon: 'loading',
                duration: 1000
              });
              //res.path是网络图片的本地路径
              console.log("本地地址" + res.path)
              wx.setStorageSync('imgs', res.path)
            },
            fail: (res) => {
              //失败回调
            }
          });
        } else {
          console.log('响应失败', res.statusCode)
        }
      },
    })
  },

  //画个人证书
  getPersonal(res) {
    //适配
    let rpx = 1;
    wx.getSystemInfo({
      success: (res) => {
        rpx = res.windowWidth / 375;
      },
    })
    const ctx = wx.createCanvasContext('myCanvas')
    //取出本地路径
    let path = wx.getStorageSync('imgs')
    console.log("1234:" + path)
    //获取网络图片本地路径
    ctx.setFontSize(7 * rpx)
    ctx.drawImage('/assets/images/home/222.png', 5 * rpx, 30 * rpx, 340 * rpx, 460 * rpx)
    ctx.drawImage('/assets/images/home/DLCS.png', 80 * rpx, 63 * rpx, 190 * rpx, 80 * rpx)
    ctx.drawImage('/assets/images/home/logo.png', 240 * rpx, 390 * rpx, 77 * rpx, 77 * rpx)//印章图片
    ctx.drawImage("/assets/images/home/user.jpg", 90 * rpx, 195 * rpx, 85 * rpx, 100 * rpx)//默认头像
    ctx.drawImage(path, 90 * rpx, 195 * rpx, 85 * rpx, 100 * rpx)
    ctx.fillText("会员证号：" + this.data.code, 150 * rpx, 180 * rpx)
    ctx.fillText("姓名：" + this.data.name, 195 * rpx, 212 * rpx)
    ctx.fillText("性别：" + this.data.sex, 195 * rpx, 227 * rpx)
    ctx.fillText("出生日期：" + this.data.birthday, 195 * rpx, 244 * rpx)
    ctx.fillText("专业：" + this.data.profession, 195 * rpx, 260 * rpx)
    ctx.fillText("职称：" + this.data.technicalTitles, 195 * rpx, 275 * rpx)
    ctx.fillText("会员类型：" + this.data.type, 195 * rpx, 290 * rpx)
    ctx.fillText("工作单位：" + this.data.company, 112 * rpx, 337 * rpx)
    ctx.fillText("职务：" +this.data.job , 112 * rpx, 352 * rpx)
    ctx.fillText("发证单位：大连市计算机学会", 200 * rpx, 445 * rpx)
    ctx.fillText("会员证有效日期" + this.data.time, 200 * rpx, 460 * rpx)
    wx.showToast({
      title: '正在加载...',
      icon: 'loading',
      duration: 1000
    });
    ctx.draw(true, setTimeout(() => {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: (res) => {
          console.log(res.tempFilePath)
          this.data.tmpPath = res.tempFilePath
        },
      })
    }, 1000));
    clearTimeout()
  },

  //画企业证书
  getUnit() {
    //适配
    let rpx = 1;
    wx.getSystemInfo({
      success(res) {
        rpx = res.windowWidth / 375;
      },
    })
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.drawImage('/assets/images/home/1234.png', 0 * rpx, 130 * rpx, 350 * rpx, 250 * rpx)
    ctx.drawImage('/assets/images/home/DLCS.png', 52 * rpx, 160 * rpx, 260 * rpx, 90 * rpx)
    ctx.drawImage('/assets/images/home/logo.png', 260 * rpx, 290 * rpx, 70 * rpx, 70 * rpx)
    ctx.setFontSize(7 * rpx)
    ctx.fillText("会员证号：" + this.data.code, 30 * rpx, 168 * rpx)
    ctx.fillText("会员单位：" + this.data.company, 120 * rpx, 270 * rpx)
    ctx.fillText("会员类型：" + this.data.type, 120 * rpx, 290 * rpx)
    ctx.fillText("发证单位：" + "大连市计算机学会", 210 * rpx, 340 * rpx)
    ctx.fillText("会员证有效期：" + this.data.time, 210 * rpx, 355 * rpx)
    ctx.draw()
  },
  
  //自动登录
  checkToken: function (e) {
    if (!wx.getStorageSync('user')) {
      wx.reLaunch({
        url: '/pages/login/login'
      })
      return
    }
  },


//打印会员证
buttonTap() {
  let index = wx.getStorageSync('userIndex')
  console.log("会员类型："+index)
  if (index == 0) { //单位会员
    this.getUnit()
  } else if (index == 1) { //个人会员
    this.getPersonal()
  }
},


   //执行保存图片
   SaveCard() {
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.canvas_width, //画布宽高
      height: that.canvas_height,
      destWidth: that.canvas_width * wx.getSystemInfoSync().pixelRatio, //画布宽高*dpr 以iphone6为准
      destHeight: that.canvas_height * wx.getSystemInfoSync().pixelRatio,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath) //生成的临时图片路径
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res);
            wx.showToast({
              title: '保存成功',
            })
            that.closeMask()
          },
          fail(err) {
            if (err.errMsg && !res.authSetting['scope.writePhotosAlbum']) { //重新授权弹框确认
              wx.showModal({
                title: '提示',
                content: '您好,请先授权，在保存此图片。',
                showCancel: false,
                success(res) {
                  if (res.confirm) { //重新授权弹框用户点击了确定
                    wx.openSetting({ //进入小程序授权设置页面
                      success(res) {
                        if (res.authSetting['scope.writePhotosAlbum']) { //用户打开了保存图片授权开关
                          wx.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: function (data) {
                              wx.showToast({
                                title: '保存成功',
                                icon: 'success',
                                duration: 2000
                              })
                            },
                          })
                        } else { //用户未打开保存图片到相册的授权开关
                          wx.showModal({
                            title: '温馨提示',
                            content: '授权失败，请稍后重新获取',
                            showCancel: false,
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          }
        })
      },
    })
  },
  
})