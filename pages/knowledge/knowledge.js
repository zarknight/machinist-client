import { sectionList } from '../../consts/kw-sections.const'
import commonUtil from '../../utils/common.util'

Page({

  data: {
    grids: sectionList
  },

  onLoad: function (options) {
    commonUtil.$init(this)
  },

  onShareAppMessage: function (options) {
    return {
      title: '爱摸车汽车知识手册'
    }
  }

})
