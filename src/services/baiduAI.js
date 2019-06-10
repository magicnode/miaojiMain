/**
 * 百度AI
 */
import axios from 'axios'
import { storage } from '@/util'
import request from '@/util/request'
import { baiduAI as baiduAIApi } from '@/api'

/**
 * [获取百度AI access token]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export async function getAccessToken () {
  return request({
    url: baiduAIApi.accessToken,
    method: 'post'
  })
}

/**
 * [使用百度ocr接口]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export async function getOcr (data) {
  let url = baiduAIApi.ocr
  const token = storage({
    key: 'baiduai_token'
  })
  url = url + '?access_token=' + token
  return request({
    url,
    method: 'parampost',
    paramkey: 'param',
    data
  })
}

/**
 * [使用百度ocr接口]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export async function getocrAccurate (formData) {
  let instance = axios.create({
    baseURL: 'http://mydanzhao.com',
    // baseURL: 'http://www.batman.com:8300',
    timeout: 20000,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return instance.post('/api/baidu/ocr', formData)
}
