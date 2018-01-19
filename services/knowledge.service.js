import requestUtil from '../utils/request.util'
import config from '../config'

/**
 * 获取指定一级知识目录下的所有二级目录
 */
const getCategories = (categoryId) => {
  return requestUtil.exec({
    url: config.service.kwCatesUrl,
    data: {
      categoryId: categoryId
    }
  })
}

/**
 * 获取指定二级知识目录下的文章列表
 */
const getPosts = (categoryId, pageNo) => {
  return requestUtil.exec({
    url: config.service.kwPostsUrl,
    data: {
      categoryId: categoryId,
      pageNo: pageNo || 1,
      pageSize: config.paging.postPageSize
    }
  })
}

/**
 * 获取指定的文章信息
 */
const getPost = (id) => {
  return requestUtil.exec({
    url: `${config.service.kwPostsUrl}/${id}`
  })
}

const search = (keyword) => {
  return requestUtil.exec({
    url: config.service.kwSearchUrl,
    data: {
      keyword: keyword
    }
  })
}

const updateMyPostStarStatus = function (id, star) {
  return requestUtil.exec({
    method: 'POST',
    url: `${config.service.kwMyPostsUrl}/${id}/star`,
    data: {
      star: star
    }
  })
}

const getMyPostStarStatus = function (id) {
  return requestUtil.exec({
    url: `${config.service.kwMyPostsUrl}/${id}/star`
  })
}

const getMyStarPosts = function () {
  return requestUtil.exec({
    url: config.service.kwMyPostsUrl
  })
}

module.exports = {
  getCategories,
  getPosts,
  getPost,
  search,
  updateMyPostStarStatus,
  getMyPostStarStatus,
  getMyStarPosts
}
