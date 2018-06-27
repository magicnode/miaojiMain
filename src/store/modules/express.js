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
  async setExpressRoute ({commit}, {expNo, expCode}) {
    try {
      let data = {
        expCode,
        expNo
      }
      data = JSON.stringify(data)
      const res = await request({
        method: 'parampost',
        url: expressApi.kdn,
        paramkey: 'param',
        data
      })
      if (res.code === 200 && res.obj) {
        let data = {}
        data.mess = res.mess
        data.reason = res.obj.Reason || ''
        let Traces = res.obj.Traces
        if (Traces.length > 0) {
          Traces = Traces.reverse()
        }
        data.parts = Traces
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
