import promiseUtil from './promise.util'
import wafer from '../vendor/wafer-client-sdk/index'

const normalizeError = (e) => {
  const err = e || {}

  let code = 5000

  if (typeof err.code === 'number') {
    code = err.code
  } else if (err instanceof wafer.LoginError) {
    code = 50001
  } else if (err instanceof wafer.RequestError) {
    code = 50002
  }

  return {
    code: code,
    desc: err.errMsg || err.desc || err.message || ""
  }
}

const exec = (params) => {
  return new Promise((resolve, reject) => {
    if (typeof params.login === 'undefined' || params.login === null) {
      params.login = true
    }
    promiseUtil.promisify(wafer.request)(params).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(normalizeError(err))
    })
  })
}

const login = (params) => {
  return new Promise((resolve, reject) => {
    promiseUtil.promisify(wafer.login)(params).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(normalizeError(err))
    })
  })
}

module.exports = { exec, login }
