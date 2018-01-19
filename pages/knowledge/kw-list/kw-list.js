import config from '../../../config'
import { sectionMap } from '../../../consts/kw-sections.const'
import kwService from '../../../services/knowledge.service'
import cacheService from '../../../services/cache.service'
import commonUtil from '../../../utils/common.util'

Page({

  data: {
    theme: '#d98d9c',
    selectedCate: 0,
    selectedCateCount: 0,
    selectedCatePages: 1,
    selectedCatePage: 1,
    categories: [],
    posts: []
  },

  onLoad: function (options) {
    commonUtil.$init(this)

    this.sectionType = options.type
    this.data.sectionInfo = sectionMap[this.sectionType]

    wx.setNavigationBarTitle({
      title: this.data.sectionInfo.name,
    })

    wx.showLoading({
      title: '加载中',
      mask: true
    })

    this.loadCategories().then((obj) => {
      Object.assign(this.data, obj)
      return kwService.getPosts(obj.selectedCate)
    }).then((posts) => {
      this.data.posts = posts
    }).catch((err) => {
      console.log("==> [ERROR]", err)
    }).then(() => {
      commonUtil.$digest(this)
      wx.hideLoading()
    })
  },

  loadCategories: function () {
    const rootCateId = this.data.sectionInfo.data.cid
    const cachedCategories = cacheService.getSectionCategories(rootCateId)

    if (cachedCategories && cachedCategories.length > 0) {
      return new Promise((resolve, reject) => {
        resolve(this.processCategories(cachedCategories))
      })
    }

    return kwService.getCategories(rootCateId).then((res) => {
      const obj = this.processCategories(res || [])
      cacheService.setSectionCategories(rootCateId, obj.categories)
      return obj
    })
  },

  processCategories: function (categories) {
    const firstCate = categories[0]
    const selectedCate = firstCate ? firstCate.id : 0
    return Object.assign({
      theme: this.data.sectionInfo.icbg,
      categories: categories,
      selectedCate: selectedCate
    }, this.initPageInfo(firstCate.count))
  },

  initPageInfo: function (count) {
    return {
      selectedCateCount: count,
      selectedCatePages: Math.ceil(count / config.paging.postPageSize),
      selectedCatePage: 1
    }
  },

  selectCategory: function (event) {
    const categoryId = event.target.id
    const count = event.target.dataset.count

    Object.assign(this.data, {
      selectedCate: categoryId
    }, this.initPageInfo(count))

    wx.showLoading({
      title: '加载中',
      mask: true
    })

    kwService.getPosts(categoryId).then((posts) => {
      this.data.posts = posts
    }).catch((err) => {
      console.log("==> [ERROR]", err)
    }).then(() => {
      commonUtil.$digest(this)
      wx.hideLoading()
    })
  },

  onReachBottom: function () {
    if (!this.loading && this.data.selectedCatePage < this.data.selectedCatePages) {
      this.loading = true

      let categoryId = this.data.selectedCate
      let pageNo = this.data.selectedCatePage

      pageNo += 1

      wx.showLoading({
        title: '加载中',
        mask: true
      })

      kwService.getPosts(categoryId, pageNo).then((posts) => {
        this.data.posts = this.data.posts.concat(posts)
        this.data.selectedCatePage = pageNo
      }).catch((err) => {
        console.log("==> [ERROR]", err)
      }).then(() => {
        commonUtil.$digest(this)
        this.loading = false
        wx.hideLoading()
      })
    }
  }

})
