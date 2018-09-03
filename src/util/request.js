import axios from 'axios'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'

const fetch = (options) => {
  let {
    method = 'get',
    data,
    paramkey,
    params,
    url,
    config
  } = options

  const cloneData = lodash.cloneDeep(data)

  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    console.error(e.message)
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios({
        url,
        method: 'get',
        params: cloneData || params,
        timeout: 5000
      })
    case 'delete':
      return axios({
        url,
        method: 'delete',
        params: cloneData || params,
        timeout: 5000
      })
    case 'parampost':
      let param = new URLSearchParams()
      param.append(paramkey, cloneData)
      return axios({
        url,
        method: 'post',
        data: param,
        timeout: 15000,
        headers: {
          'content-Type': 'application/x-www-form-urlencoded'
        }
      })
    case 'post':
      return axios({
        url,
        method: 'post',
        data: cloneData,
        params,
        timeout: 5000,
        config
      })
      // return axios.post(url, params, config)
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request (options) {
  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = response.data
    return {
      success: true,
      message: statusText,
      statusCode: status,
      fulldata: data,
      ...data
    }
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = '网络错误'
    }
    return { success: false, statusCode, message: msg }
  })
}
