import config from '../../../config'
import kwService from '../../../services/knowledge.service'
import commonUtil from '../../../utils/common.util'

Page({

  data: {
    posts: []
  },

  onLoad: function (options) {
    commonUtil.$init(this)
  },

  onShow: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    kwService.getMyStarPosts().then((posts) => {
      this.data.posts = posts
    }).catch((err) => {
      console.log("==> [ERROR]", err)
    }).then(() => {
      commonUtil.$digest(this)
      wx.hideLoading()
    })
  }

})
