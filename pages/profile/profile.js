import userService from '../../services/user.service'
import cacheService from '../../services/cache.service'
import promiseUtil from '../../utils/promise.util'
import commonUtil from '../../utils/common.util'

Page({

  data: {
    userInfoDefault: userService.DEFAULT_USER_INFO,
    cacheSize: 0,
    userInfo: null
  },

  onLoad: function (options) {
    commonUtil.$init(this)
  },

  onShow: function (options) {
    this.updateInfo()
  },

  updateInfo: function () {
    return Promise.all([
      this.updateUserInfo(),
      this.updateCacheInfo()
    ]).catch((err) => {
      console.log("==> [ERROR]", err)
    }).then(() => {
      commonUtil.$digest(this)
    })
  },

  updateUserInfo: function () {
    return userService.getCurrentUser().then((user) => {
      this.data.userInfo = user
    }).catch((err) => {
      this.data.userInfo = null
    })
  },

  updateCacheInfo: function () {
    return promiseUtil.promisify(wx.getStorageInfo)().then((res) => {
      const size = res.currentSize > 1 ? res.currentSize : 0
      this.data.cacheSize = size
    })
  },

  clearCache: function (event) {
    return promiseUtil.promisify(wx.showModal)({
      title: '提示',
      content: '确认要清空缓存数据么？'
    }).then((res) => res.confirm).then((isClear) => {
      if (isClear) {
        wx.clearStorageSync()
        return this.updateCacheInfo()
      }
    }).then(() => {
      commonUtil.$digest(this)
    })
  },

  openSettings: function (event) {
    promiseUtil.promisify(wx.openSetting)().then((res) => {
      if (!res.authSetting['scope.userInfo']) {
        userService.clearCurrentUser()
        wx.clearStorageSync()
      }
    }).then(() => this.updateInfo())
  },

  requestAuth: function (event) {
    if (event.detail.userInfo) {
      userService.clearCurrentUser()
      wx.clearStorageSync()
      this.updateInfo()
    }
  }

})
