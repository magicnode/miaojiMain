/**
 * 微信配置，微信pay
 */
import request from '@/util/request'
import { wx as wxApi } from '@/api'

/**
 * [获取微信jssdk配置]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export async function getJssdkConfig (data) {
  return request({
    url: wxApi.jssdkInit,
    method: 'get',
    data
  })
}

/**
 * [获取微信pay参数]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export async function getWxPayConfig (data) {
  return request({
    url: wxApi.wxpayInit,
    method: 'parampost',
    paramkey: 'param',
    data
  })
}

/**
 * [获取商城微信pay参数]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export async function getShopPayConfig (data) {
  return request({
    url: wxApi.shoppayInit,
    method: 'parampost',
    paramkey: 'param',
    data
  })
}
