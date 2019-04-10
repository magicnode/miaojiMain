import axios from 'axios'
import {pickup as pickupApi, send as sendApi} from '@/api'
import {storage, decryptData} from '@/util'
import request from '@/util/request'

import * as types from '../mutation-types'

let instance = axios.create({
  timeout: 6000
})

export const state = {
  pickup: {
    data: [],
    query: {
      page: 1,
      rows: 5
    }
  },
  send: {
    data: [],
    query: {
      page: 1,
      rows: 5
    }
  },
  switchtype: 'pickup'
}

// getters
export const getters = {
  getPackagePickUp: state => state.pickup.data,
  getPackagePickUpQuery: state => state.pickup.query,
  getPackageSend: state => state.send.data,
  getPackageSendQuery: state => state.send.query,
  getPackageType: state => state.switchtype
}

// actions
export const actions = {
  async initPackagePickUp ({ commit }, {query = {mobile: '', page: 1, rows: 5}}) {
    try {
      let res = await instance.get(pickupApi.all, {
        params: query
      })
      res = decryptData(res)
      if (res.code === 200) {
        const data = res.data
        query.page = query.page + 1
        commit(types.SET_PACKAGE_PICKUP, {data, query})
        return {
          text: '获取取件成功',
          type: 'success'
        }
      }
      return {
        text: '获取取件失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取取件失败, 网络错误',
        type: 'warn'
      }
    }
  },
  async addPackagePickUp ({ commit }, {query = {mobile: '', page: 1, rows: 5}}) {
    try {
      let res = await instance.get(pickupApi.all, {
        params: query
      })
      res = decryptData(res)
      if (res.code === 200) {
        let resdata = res.data
        let data = state.pickup.data
        if (resdata.length <= 0) {
          return {
            text: '没有数据了~',
            type: 'text',
            stop: true
          }
        }
        data = data.concat(resdata)
        query.page = query.page + 1
        commit(types.SET_PACKAGE_PICKUP, {data, query})
        return {
          text: '获取取件成功',
          type: 'success'
        }
      }
      return {
        text: '获取取件失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取取件失败, 网络错误',
        type: 'warn'
      }
    }
  },
  async initPackageSend ({ commit }, {query = {mobile: '', page: 1, rows: 5}}) {
    try {
      const userId = storage({
        type: 'get',
        key: 'userId'
      })
      let res = await request({
        url: sendApi.index,
        method: 'parampost',
        paramkey: 'param',
        data: JSON.stringify({userId: userId})
      })
      res = decryptData(res)
      if (res.code === 200) {
        const data = res.obj
        commit(types.SET_PACKAGE_SEND, {data, query})
        return {
          text: '获取寄件成功',
          type: 'success'
        }
      }
      return {
        text: '获取寄件失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取寄件失败, 网络错误',
        type: 'warn'
      }
    }
  },
  async addPackageSend ({ commit }, {query = {mobile: '', page: 1, rows: 5}}) {
    try {
      const userId = storage({
        type: 'get',
        key: 'userId'
      })
      let res = await request({
        url: sendApi.index,
        method: 'parampost',
        paramkey: 'param',
        data: JSON.stringify({userId: userId})
      })
      res = decryptData(res)
      if (res.code === 200) {
        let data = res.obj
        commit(types.SET_PACKAGE_SEND, {data, query})
        return {
          text: '获取寄件成功',
          type: 'success',
          stop: true
        }
      }
      return {
        text: '获取寄件失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取寄件失败, 网络错误',
        type: 'warn'
      }
    }
  }
}

export const mutations = {
  [types.SET_PACKAGE_PICKUP] (state, {data = state.pickup.data, query = state.pickup.query}) {
    state.pickup = {
      data,
      query
    }
  },
  [types.SET_PACKAGE_SEND] (state, {data = state.send.data, query = state.send.query}) {
    state.send = {
      data,
      query
    }
  },
  [types.SET_PACKAGE_TYPE] (state, {type = state.switchtype}) {
    state.switchtype = type
  }
}
