import lodash from 'lodash'
import config from 'config'
import { Base64 } from 'js-base64'
import CryptoJS from 'crypto-js'
import { localPrefix } from './config'

// 连字符转驼峰
String.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
    }
  }
  return format
}

/**
 * [获取路径参数]
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * [对localStorage操作进行封装]
 * @param  {String}  key    [存储的字段名字]
 * @param  {String}  val    [存储的字段值]
 * @param  {Boolean} prefix [是否加前缀，默认为true]
 * @param  {String}  type   [localStorage的操作方式 get、set、remove、clear]
 * @return {String} res     [localStorage.getItem(key)时返回的值]
 */
const storage = function ({key = '', val = '', prefix = true, type = 'get'}) {
  // type为remove时候，允许key为数组
  if (prefix && !Array.isArray(key)) {
    key = localPrefix + key
  }
  const localStorage = window.localStorage
  let res = ''
  switch (type) {
    case 'get':
      res = localStorage.getItem(key)
      break
    case 'set':
      localStorage.setItem(key, val)
      break
    case 'remove':
      if (Array.isArray(key)) {
        for (let i = 0, len = key.length; i < len; i++) {
          let removeKey = localPrefix + key[i]
          localStorage.removeItem(removeKey)
        }
      } else {
        localStorage.removeItem(key)
      }
      break
    case 'removeexcept':
      if (Array.isArray(key)) {
        Object.keys(localStorage).forEach(lkey => {
          if (!key.some(item => (localPrefix + item) === lkey)) {
            localStorage.removeItem(lkey)
          }
        })
      }
      break
    case 'clear':
      localStorage.clear()
      break
    default:
      break
  }
  if (type === 'get') {
    return res
  }
}

/**
 * [从json中获取与传入条件相等的元素]
 * @param  {[Object]} obj [传入的json]
 * @param  {[String]} id  [需要的条件]
 * @return {[String]}     [description]
 */
const getNameById = function (obj, id) {
  let newobj = ''
  Object.keys(obj).forEach((elem, index) => {
    if (obj[elem]['id'] === Number(id)) {
      newobj = obj[elem]
    }
  })
  return newobj['name']
}

/**
 * [根据node环境获取config]
 * @param  {[type]} options.env [description]
 * @return {[type]}             [description]
 */
const getConfByEnv = function () {
  const NODE_ENV = process.env.NODE_ENV
  let conf
  switch (NODE_ENV) {
    case 'development':
      conf = config.dev
      break
    case 'production':
      conf = config.pro
      break
    case 'test':
      conf = config.test
      break
    default:
      conf = config.pro
      break
  }
  return conf
}

/**
 * [快速打印一个五分制的评分情况]
 * @param  {[type]} rating [description]
 * @return {[type]}        [description]
 */
function getRating (rating) {
  if (rating > 5 || rating < 0) throw new Error('数字不在范围内')
  return '★★★★★☆☆☆☆☆'.substring(5 - rating, 10 - rating)
}

/**
 * [解密]
 * @param  {[type]} data [description]
 * @return {[string]}        [description]
 */
function decryptData (data, type = 'normal') {
  let decData = ''
  if (type === 'str') {
    decData = data
  } else {
    delete data.message
    delete data.statusCode
    delete data.success
    for (let item in data) {
      decData += data[item]
    }
  }
  // 秘钥key
  // key不足24位自动以0(最小位数是0)补齐,如果多余24位,则截取前24位,后面多余则舍弃掉
  const key = 'NNcJxzQePoNP2V5E8tughsA0'
  const base64 = CryptoJS.enc.Utf8.parse(key)
  const iv = CryptoJS.enc.Utf8.parse('9dBgh0GS')
  let decrypt = CryptoJS.TripleDES.decrypt(decData, base64, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding
  })
  let parseData = CryptoJS.enc.Base64.stringify(decrypt)
  parseData = Base64.decode(parseData)
  // console.log('Base64 parseData String', parseData)
  if (parseData.indexOf('"obj":[') !== -1) {
    parseData = parseData.split(']}')[0]
    parseData += ']}'
  } else if (parseData.indexOf('"obj":{') !== -1) {
    parseData = parseData.split('}}')[0]
    parseData += '}}'
  } else if (parseData.indexOf('"}') !== -1) {
    parseData = parseData.split('"}')[0]
    parseData += '"}'
  } else {
    parseData = parseData.split('}')[0]
    parseData += '}'
  }
  // console.log('Base64 parseData pure String', parseData)
  parseData = JSON.parse(parseData)
  console.log('Base64 parseData JSON', parseData)
  return parseData
}

export {
  queryURL,
  queryArray,
  arrayToTree,
  getNameById,
  getConfByEnv,
  storage,
  getRating,
  decryptData
}
