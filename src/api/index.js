// wu cong fake url
// let url = 'http://1a699l6063.imwork.net/WeChatService/'
// wu cong 本地
let url = 'http://192.168.0.168:8088/WeChatService/'
// let url = 'http://192.168.0.66:8088/WeChatService/'
// online app 云端服务
// let url = 'http://app.quandikeji.com/WeChatService/'

if (process.env.NODE_ENV !== 'development') {
  url = 'http://app.quandikeji.com/WeChatService/'
}

export const pic = {
  qr: url + 'pic',
  pickupqr: url + 'signpic'
}

export const address = {
  index: url + 'findAddress',
  add: url + 'insertAddress',
  update: url + 'updateAddress',
  delete: url + 'deleteAddress',
  checked: url + 'checked',
  default: url + 'GETADDRESSDEFAULT',
  officelocation: url + 'FindStationInfo'
}

export const send = {
  index: url + 'findSend',
  create: url + 'insertSend',
  cancle: url + 'end_send'
}

export const brand = {
  index: url + 'allbrand'
}

export const site = {
  location: url + 'COORDINATES'
}

export const pickup = {
  sign: url + 'TAKECOURIERSIGN',
  wait: url + 'TAKECOURIER',
  all: url + 'ALLDELIVERY'
}

export const user = {
  gettoken: function (code, params) {
    return url + 'GetAccessToken?code=' + code + '&params=' + params
  },
  sendsms: url + 'GetRanCode',
  bindphone: url + 'Binding',
  getuserinfo: url + 'UserInfo',
  getwebopenid: url + 'UserOpenId'
}

export const wx = {
  webtoken1: function (AppId, secret, code) {
    const url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + AppId + '&secret=' + secret + '&code=' + code + '&grant_type=authorization_code'
    return url
  },
  webtoken: 'https://api.weixin.qq.com/sns/oauth2/access_token',
  jssdkInit: url + 'PayController/getWxConfig',
  wxpayInit: url + 'PayController/unifiedOrder'
}

export const express = {
  // url = url + 'brand=' + brand + '&orderSn=' + orderSn
  route: 'http://app.quandikeji.com:8088/quandiExpressSite1.4.0/Logistics/queryLogisticsInfoForJson',
  jdTrace: 'http://app.quandikeji.com:8288/JDService/order/orderTrace'
}

export const bug = {
  // ?param=5512341545454
  index: url + 'errorReport'
}
