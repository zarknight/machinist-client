const baseUrl = 'https://api.moredist.com/machinist/wx'

module.exports = {

  paging: {
    postPageSize: 10
  },

  service: {
    loginUrl: `${baseUrl}/uac/login`,
    myUserUrl: `${baseUrl}/profile/my`,
    kwCatesUrl: `${baseUrl}/knowledge/categories`,
    kwPostsUrl: `${baseUrl}/knowledge/posts`,
    kwMyPostsUrl: `${baseUrl}/knowledge/my/posts`,
    kwSearchUrl: `${baseUrl}/knowledge/search`
  }

}
