import {express as expressApi} from '@/api'
import request from '@/util/request'

import * as types from '../mutation-types'

export const state = {
  data: {}
}

// getters
export const getters = {
  getExpressRoute: state => state.data
}

// actions
export const actions = {
  async setExpressRoute ({commit}, {orderSn}) {
    try {
      orderSn = 'VT39702515053'
      let data = {
        order_sn: orderSn
      }
      data = JSON.stringify(data)
      const res = await request({
        method: 'parampost',
        url: expressApi.jdTrace,
        paramkey: 'param',
        data
      })
      if (res.code === 200 && res.obj) {
        let data = {}
        data.mess = res.mess
        let obj = res.obj
        if (obj.length > 0) {
          obj = obj.reverse()
        }
        data.parts = res.obj
        commit(types.SET_EXPRESS_ROTUE, {data})
        return {
          type: 'success',
          info: '获取路由成功',
          width: '15rem'
        }
      }
      return {
        type: 'warn',
        info: '获取路由失败',
        width: '15rem'
      }
    } catch (e) {
      console.error(e)
      return {
        type: 'warn',
        info: '获取路由失败',
        width: '15rem'
      }
    }
  }
}

export const mutations = {
  [types.SET_EXPRESS_ROTUE] (state, {data}) {
    state.data = data
  }
}
