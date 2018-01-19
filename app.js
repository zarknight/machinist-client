import wafer from './vendor/wafer-client-sdk/index'
import config from './config'

App({
  onLaunch(options) {
    wafer.setLoginUrl(config.service.loginUrl)
  },

  onShow(options) {

  },

  onHide() {

  },

  onError(msg) {
    console.error("[APP ERROR]", msg)
  }
})
