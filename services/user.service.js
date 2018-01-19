import requestUtil from '../utils/request.util'
import config from '../config'

let currentUser = null

/**
 * 获取当前用户信息
 */
const getCurrentUser = (force) => {
  if (force) {
    currentUser = null
  }

  if (currentUser) {
    return Promise.resolve(currentUser)
  }

  return requestUtil.exec({
    url: config.service.myUserUrl
  }).then((res) => {
    return currentUser = res
  })
}

/**
 * 清除缓存的当前用户信息
 */
const clearCurrentUser = () => {
  currentUser = null
}

module.exports = {
  DEFAULT_USER_INFO: {
    avatarUrl: '/assets/images/profile/default-avatar.png'
  },
  login: requestUtil.login,
  getCurrentUser,
  clearCurrentUser
}
