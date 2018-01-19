import WxParse from '../../../vendor/wxParse/wxParse.js'
import kwService from '../../../services/knowledge.service'
import cacheService from '../../../services/cache.service'
import commonUtil from '../../../utils/common.util'

Page({

  data: {
    title: '',
    isStar: false
  },

  onLoad: function (options) {
    commonUtil.$init(this)

    this.postId = options.id

    wx.showLoading({
      title: '加载中',
      mask: true
    })

    Promise.all([
      this.loadPost(this.postId), 
      kwService.getMyPostStarStatus(this.postId)
    ]).then(([post, status]) => {
      const title = post.title.rendered
      const content = post.content.rendered
      const fmtDate = commonUtil.formatDate(new Date(post.modified))

      this.data.title = title
      this.data.date = fmtDate
      this.data.isStar = status.star

      WxParse.wxParse('article', 'html', content, this, 5)
    }).catch((err) => {
      console.log("==> [ERROR]", err)
    }).then(() => {
      setTimeout(() => commonUtil.$digest(this), 100)
      wx.hideLoading()
    })
  },

  loadPost: function (id) {
    const cachedPost = cacheService.getKnowledgePost(id)
    return (cachedPost ? Promise.resolve(cachedPost) : kwService.getPost(id).then((post) => {
      cacheService.setKnowledgePost(post.id, post)
      return post
    }))
  },

  toggleStar: function (event) {
    this.saveStarStatus(!this.data.isStar)
  },

  saveStarStatus: function (isStar) {
    if (!this.processing) {
      this.processing = true

      wx.showToast({
        title: isStar ? '已收藏' : '已取消收藏',
      })

      kwService.updateMyPostStarStatus(this.postId, isStar).then(() => {
        this.data.isStar = isStar
        commonUtil.$digest(this)
      }).catch((err) => {
        console.log("==> [ERROR]", err)
      }).then(() => {
        this.processing = false
      })
    }
  },

  wxParseTagATap: function (event) {
    const src = event.currentTarget.dataset.src

    if (src && src.indexOf('tel:') === 0) {
      wx.makePhoneCall({
        phoneNumber: src.substr(4),
      })
    }
  },

  onShareAppMessage: function (options) {
    return {
      title: `爱摸车知识 - ${this.data.title}`,
      path: `/pages/knowledge/kw-item/kw-item?id=${this.postId}`
    }
  }

})
