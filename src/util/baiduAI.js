import { getAccessToken, getOcr } from '@/services/baiduAI'
import { storage } from '@/util'

const NODE_ENV = process.env.NODE_ENV

/**
 * [获取百度AI access token]
 * {
 * "refresh_token": "25.b55fe1d287227ca97aab219bb249b8ab.315360000.1798284651.282335-8574074",
 * "expires_in": 2592000,
 * "scope": "public wise_adapt",
 * "session_key": "9mzdDZXu3dENdFZQurfg0Vz8slgSgvvOAUebNFzyzcpQ5EnbxbF+hfG9DQkpUVQdh4p6HbQcAiz5RmuBAja1JJGgIdJI",
 * "access_token": "24.6c5e1ff107f0e8bcef8c46d3424a0e78.2592000.1485516651.282335-8574074",
 * "session_secret": "dfac94a3489fe9fca7c3221cbf7525ff"
 * }
 * @return {[Promise]} [description]
 */
export const getToken = function (url) {
  return new Promise(async (resolve, reject) => {
    const baiduconfig = await getAccessToken()
    console.log('baiduconfig', baiduconfig)
    if (baiduconfig.error) {
      return reject({
        text: '获取百度AI配置失败',
        type: 'warn',
        width: '18rem'
      })
    }
    storage({
      type: 'set',
      key: 'baiduai_token',
      val: baiduconfig.access_token
    })
    let expiresTime = new Date().getTime()
    expiresTime = expiresTime + Number(baiduconfig.expires_in)
    storage({
      type: 'set',
      key: 'baiduai_expiretime',
      val: expiresTime
    })
    return resolve({
      text: 'baiduAI token获取成功',
      type: 'success',
      width: '18rem'
    })
  })
}

/**
 * [判断百度AI access token是否过期]
 * @return {[Boolean]} [true 过期 or false 没过期]
 */
export const handelIsExpire = function () {
  const expireTime = storage({
    key: 'baiduai_expiretime'
  })
  const nowTime = new Date().getTime()
  if (expireTime >= nowTime) {
    return false
  } else {
    return true
  }
}

/**
 * [调用百度 文字识别接口]
 * @return {[json]} []
 */
export const useOcr = async function (data) {
  // 判断 token 是否过期
  switch (NODE_ENV) {
    case 'dev':
      storage({
        type: 'set',
        key: 'baiduai_token',
        val: '24.9de28eb86da43466382ef0b574a5eb81.2592000.1537089498.282335-11681404'
      })
      break
    case 'pro':
      const isExpire = handelIsExpire()
      if (isExpire) {
        await getToken()
      }
      break
    default:
      break
  }
  const ocrData = getOcr(data)
  console.log(ocrData)
}
