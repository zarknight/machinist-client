const PREFIX_CATEGORY = 'wx_mc_cate'
const PREFIX_KW_POST = 'wx_mc_kwps'
const CACHE_TIME = 86400000 // 1000 * 60 * 60 * 24 (24hrs)

const setOp = (key, data) => {
  try {
    wx.setStorageSync(key, {
      t: (+new Date()),
      d: data
    })
  } catch (e) {
  }
}

const getOp = (key) => {
  const data = wx.getStorageSync(key) || null

  if (data) {
    const tstamp = data.t
    const offset = (+new Date()) - tstamp

    if (offset <= CACHE_TIME) {
      return data.d
    }
  }

  return null
}

const setSectionCategories = (id, categories) => {
  setOp(`${PREFIX_CATEGORY}_${id}`, categories)
}

const setKnowledgePost = (id, post) => {
  setOp(`${PREFIX_KW_POST}_${id}`, post)
}

const getSectionCategories = (id) => {
  return getOp(`${PREFIX_CATEGORY}_${id}`)
}

const getKnowledgePost = (id) => {
  return getOp(`${PREFIX_KW_POST}_${id}`)
}

module.exports = {
  setSectionCategories,
  setKnowledgePost,
  getSectionCategories,
  getKnowledgePost
}