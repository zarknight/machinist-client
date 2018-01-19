import kwService from '../../../services/knowledge.service'
import commonUtil from '../../../utils/common.util'

Page({

  data: {
    inputShowed: true,
    inputVal: "",
    items: []
  },

  onLoad: function (options) {
    commonUtil.$init(this)
  },

  showInput: function () {
    this.data.inputShowed = true
    commonUtil.$digest(this)
  },

  hideInput: function () {
    this.data.inputShowed = false
    this.data.inputVal = ''
    this.data.items = []
    commonUtil.$digest(this)
    wx.navigateBack()
  },

  clearInput: function () {
    this.data.inputVal = ''
    this.data.items = []
    commonUtil.$digest(this)
  },

  inputTyping: function (e) {
    this.data.inputVal = e.detail.value
    commonUtil.$digest(this)
  },

  doSearch: function (event) {
    const keyword = this.data.inputVal.trim()

    if (keyword) {
      wx.showLoading({
        title: '搜索中',
        mask: true
      })

      kwService.search(keyword).then((res) => {
        this.data.items = res
      }).catch((err) => {
        console.log("==> [ERROR]", err)
      }).then(() => {
        commonUtil.$digest(this)
        wx.hideLoading()
      })
    } else {
      this.clearInput()
    }
  }

})
