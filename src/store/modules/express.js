import {express as expressApi} from '@/api'
import { decryptData } from '@/util'
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
        expressName: expCode,
        orderSn: expNo
      }
      data = JSON.stringify(data)
      const res = await request({
        method: 'parampost',
        url: expressApi.kdn,
        paramkey: 'param',
        data
      })
      const decryptRes = decryptData(res)
      if (decryptRes.code === 200 && decryptRes.obj) {
        let data = {}
        data.mess = decryptRes.mess
        data.reason = decryptRes.mess || ''
        let Traces = decryptRes.obj
        if (Traces.length > 0) {
          Traces = Traces.reverse()
        }
        data.parts = Traces
        commit(types.SET_EXPRESS_ROTUE, {data})
        return {
          type: 'success',
          text: '获取路由成功',
          width: '15rem'
        }
      }
      if (decryptRes.code === 201) {
        return {
          type: 'warn',
          text: decryptRes.mess,
          width: '15rem'
        }
      }
      return {
        type: 'warn',
        text: '获取路由失败',
        width: '15rem'
      }
    } catch (e) {
      console.error(e)
      return {
        type: 'warn',
        text: '获取路由失败',
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
