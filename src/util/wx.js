import {getJssdkConfig, getWxPayConfig} from '@/services/wx'
import {pro} from '../../config'

/**
 * [初始化wx jssdk]
 * @return {[type]} [description]
 */
export const init = function (url) {
  return new Promise(async (resolve, reject) => {
    const wxconfig = await getJssdkConfig({
      url: url || pro.jssdk.initUrl
    })
    if (!wxconfig.success && wxconfig.code !== 200) {
      return reject({
        text: '获取微信jssdk配置失败',
        type: 'warn',
        width: '18rem'
      })
    }
    const jssdk = JSON.parse(wxconfig.obj)
    console.log('jssdk', jssdk)
    window.wx.config({
      debug: false,
      appId: pro.appid,
      timestamp: jssdk.timestamp,
      nonceStr: jssdk.nonceStr,
      signature: jssdk.signature,
      jsApiList: [
        'chooseImage',
        'chooseWXPay',
        'onMenuShareTimeline'
      ]
    })
    return resolve({
      text: '微信jssdk初始化成功',
      type: 'success',
      width: '18rem'
    })
  })
}

/**
 * [pay 微信公众号付款]
 * @param  {[type]} options.initParams    [description]
 * @param  {[type]} options.successParams [description]
 * @return {[type]}                       [description]
 * example
 * let initParams = {
 *    openid: storage({key: 'openid'}),
 *    money: total,
 *    orderNo,
 *    body: '国际快递包裹',
 *    payType: 0
 * }
 * let successParams = {
 *   orderNo,
 *   total,
 *   paymentStatus: 1,
 *   payType: 0
 * }
 */
export const pay = function (params) {
  return new Promise(async (resolve, reject) => {
    params.appid = pro.appid
    params.mch_id = pro.mch_id
    params = JSON.stringify(params)
    const wxpayRes = await getWxPayConfig(params)
    if (!wxpayRes.success) {
      return reject({
        text: '提交失败',
        type: 'warn',
        width: '16rem'
      })
    }
    const wxpayCon = wxpayRes.obj
    console.log('wxpayCon', wxpayCon)
    window.wx.ready(function () {
      window.wx.chooseWXPay({
        'timestamp': wxpayCon.timeStamp,
        'nonceStr': wxpayCon.nonceStr,
        'package': wxpayCon.package,
        'signType': 'MD5',
        'paySign': wxpayCon.paySign,
        success: async function (res) {
          resolve({
            text: '支付成功',
            type: 'success',
            width: '16rem'
          })
        },
        cancel: function () {
          reject({
            text: '支付失败, 已取消',
            type: 'warn',
            width: '20rem'
          })
        },
        fail: function (errMsg) {
          console.error('errMsg', errMsg)
          alert(JSON.stringify(errMsg))
          reject({
            text: '支付失败',
            type: 'warn',
            width: '16rem'
          })
        }
      })
    })
  })
}
