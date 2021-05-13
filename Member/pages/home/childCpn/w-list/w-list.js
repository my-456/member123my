// pages/home/childCpn/w-list/w-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    member:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    listData: [
      { //申请的委员会列表
        "text": "智慧海洋专业委员会",
        "type": "个人会员"
      },
      {
        "text": "区块链专业委员会",
        "type": "单位会员"
      },
      {
        "text": "青年计算机专业委员会",
        "type": "个人会员"
      },
      {
        "text": "智慧医疗和健康专业委员会",
        "type": "个人会员"
      },
     
      
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
