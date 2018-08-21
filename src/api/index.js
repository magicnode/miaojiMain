const NODE_ENV = process.env.NODE_ENV
let url

switch (NODE_ENV) {
  case 'dev':
    // wu cong fake url
    // let url = 'http://1a699l6063.imwork.net/WeChatService/'
    // wu cong 本地
    // url = 'http://192.168.0.168:8088/WeChatService/'
    // url = 'http://192.168.0.66:8088/WeChatService/'
    // url = 'http://192.168.231.50:8088/WeChatService/'
    // url = 'http://192.168.231.112:8088/WeChatService/'
    // online app 云端服务
    // url = 'http://app.quandikeji.com/WeChatService/'
    url = 'http://main.mijihome.cn/WeChatService/'
    break
  case 'pro':
    // url = 'http://app.quandikeji.com/WeChatService/'
    url = 'http://main.mijihome.cn/WeChatService/'
    break
  case 'taian':
    url = 'http://wechat.mijihome.cn/WeChatServiceTA/'
    break
  default:
    break
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
  wxpayInit: url + 'PayController/unifiedOrder',
  redirect: url + 'OAuth'
}

export const express = {
  // url = url + 'brand=' + brand + '&orderSn=' + orderSn
  route: 'http://app.quandikeji.com:8088/quandiExpressSite1.4.0/Logistics/queryLogisticsInfoForJson',
  jdTrace: 'http://app.quandikeji.com:8288/JDService/order/orderTrace',
  kdn: 'http://www.mijihome.cn:8088/ExpressCompany/ExpressOperation/queryExpreeRouteInfo'
}

export const bug = {
  // ?param=5512341545454
  index: url + 'errorReport'
}

export const baiduAI = {
  accessToken: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=yRRjUoBIOSnA0y4efZNPZWId&client_secret=7c1tXA8N0hPRcoMYIVxqreGT03GsL8dE&',
  ocr: 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic'
}
