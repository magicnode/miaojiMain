import axios from 'axios'
import {send as sendApi, address as addressApi} from '@/api'
import {storage} from '@/util'
import request from '@/util/request'

import * as types from '../mutation-types'

let instance = axios.create({
  timeout: 6000
})

export const state = {
  data: {
    init: false,
    list: []
  },
  query: {
  },
  add: {
    brand: '',
    describe: '',
    note: '',
    office: '',
    order: '',
    receiptAddressId: '',
    sendAddressId: '',
    sum: '',
    type: ''
  },
  sendAddress: {
    name: '',
    mobile: '',
    address: ''
  },
  pickupAddress: {
    name: '',
    mobile: '',
    address: ''
  },
  switchtype: 'wait',
  result: {
    show: false,
    type: 'success',
    info: '成功'
  },
  qr_send: {}
}

// getters
export const getters = {
  getSend: state => state.data,
  getSendSwitch: state => state.switchtype,
  getSendAdd: state => state.add,
  getSendAddress: state => state.sendAddress,
  getPickupAddress: state => state.pickupAddress,
  getSendResult: state => state.result,
  getQrSend: state => state.qr_send
}

// function gettimestamp (time) {
//   const arr = time.split(/\s/)
//   time = arr[0] + ' ' + arr[1].replace(/-/g, ':')
//   return new Date(time).getTime()
// }

// actions
export const actions = {
  async setSend ({ commit }) {
    try {
      const userId = storage({
        type: 'get',
        key: 'userId'
      })
      const res = await request({
        url: sendApi.index,
        method: 'parampost',
        paramkey: 'param',
        data: JSON.stringify({userId: userId})
      })
      if (res.code === 200) {
        let resdata = res.obj
        let data = {}
        data.list = resdata
        data.init = true
        commit(types.SET_SEND, {data})
        return {
          text: '获取寄件列表成功',
          type: 'success'
        }
      }
      return {
        text: '获取寄件列表失败',
        type: 'warn'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取寄件列表失败',
        type: 'warn'
      }
    }
  },
  selectSendAddress ({ commit }, { sendAddressId }) {
    commit(types.SET_SEND_ADD, {sendAddressId})
  },
  selectPickUpAddress ({ commit }, {receiptAddressId}) {
    commit(types.SET_SEND_ADD, {receiptAddressId})
  },
  async setDefaultAddress ({commit}) {
    try {
      const userId = storage({
        type: 'get',
        key: 'userId'
      })
      const {data} = await instance.get(addressApi.default, {
        params: {userId}
      })
      commit(types.SET_SEND_DEFAULTADDRESS, {sendAddress: data.SendAddress, pickupAddress: data.receiptAddress})
    } catch (err) {
      console.error(err)
    }
  },
  setSendAddress ({commit}, {sendAddress}) {
    commit(types.SET_SEND_DEFAULTADDRESS, {sendAddress})
  },
  setPickupAddress ({commit}, {pickupAddress}) {
    commit(types.SET_SEND_DEFAULTADDRESS, {pickupAddress})
  },
  async createSend ({dispatch, commit}, {
        order,
        brand = state.add.brand,
        describe = state.add.describe,
        note = state.add.note,
        office = state.add.office,
        receiptAddressId = state.add.receiptAddressId,
        sendAddressId = state.add.sendAddressId,
        type = state.add.type }) {
    try {
      let paramData = {
        order,
        describe,
        note,
        officeId: office,
        receiptAddressId,
        sendAddressId,
        type,
        userId: storage({type: 'get', key: 'userId'}),
        sendType: 2,
        openid: storage({type: 'get', key: 'openid'})
      }
      if (brand) {
        paramData['brandId'] = brand
      }
      paramData = JSON.stringify(paramData)
      let param = new URLSearchParams()
      param.append('param', paramData)
      const res = await axios({
        url: sendApi.create,
        method: 'post',
        data: param,
        timeout: 10000,
        headers: {
          'content-Type': 'application/x-www-form-urlencoded'
        }
      })
      if (res.data) {
        const data = res.data
        commit(types.SET_SEND_RES, {show: true, type: 'success', info: '寄件成功'})
        await dispatch('setSend')
        return {
          code: data.code,
          mess: data.mess,
          obj: data.obj
        }
      } else {
        commit(types.SET_SEND_RES, {show: true, type: 'warn', info: '寄件失败'})
        return {
          code: 500,
          mess: '寄件失败'
        }
      }
    } catch (err) {
      console.error(err)
      commit(types.SET_SEND_RES, {show: true, type: 'warn', info: '寄件失败'})
      return {
        code: 500,
        mess: '寄件失败'
      }
    }
  },
  async cancleSend ({ dispatch, commit }, { id, type = 5 }) {
    try {
      const res = await axios.get(sendApi.cancle, {
        params: {
          id,
          type: 5
        }
      })
      if (res.data) {
        await dispatch('setSend')
        return {
          type: 'success',
          text: '取消寄件成功'
        }
      } else {
        return {
          type: 'warn',
          text: '取消寄件失败'
        }
      }
    } catch (err) {
      console.error(err)
      return {
        type: 'warn',
        text: '取消寄件失败'
      }
    }
  },
  async setSingleSend ({commit}, {id}) {
    try {
      const res = await request({
        url: sendApi.index,
        method: 'parampost',
        paramkey: 'param',
        data: JSON.stringify({id})
      })
      if (res.code === 200) {
        let data = res.obj[0]
        commit(types.SET_QR_SEND, {data})
        return {
          text: '获取寄件信息成功',
          type: 'success',
          width: '20rem'
        }
      }
      return {
        text: '获取寄件信息失败',
        type: 'warn',
        width: '20rem'
      }
    } catch (err) {
      console.error(err)
      return {
        text: '获取寄件信息失败, 网络错误',
        type: 'warn',
        width: '25rem'
      }
    }
  }
}

export const mutations = {
  [types.SET_SEND] (state, {data}) {
    state.data = data
  },
  [types.SET_SEND_SWITCH] (state, {switchtype}) {
    state.switch = switchtype
  },
  [types.SET_SEND_ADD] (state, {
     brand = state.add.brand,
     describe = state.add.describe,
     note = state.add.note,
     office = state.add.office,
     order = state.add.order,
     receiptAddressId = state.add.receiptAddressId,
     sendAddressId = state.add.sendAddressId,
     sum = state.add.sum,
     type = state.add.type }) {
    state.add = { brand, describe, note, office, order, receiptAddressId, sendAddressId, sum, type }
  },
  [types.SET_SEND_DEFAULTADDRESS] (state, {sendAddress = state.sendAddress, pickupAddress = state.pickupAddress}) {
    state.sendAddress = sendAddress
    state.pickupAddress = pickupAddress
  },
  [types.SET_SEND_RES] (state, {show = false, type, info}) {
    state.result.show = show
    state.result.type = type
    state.result.info = info
  },
  [types.SET_QR_SEND] (state, {data}) {
    state.qr_send = data
  }
}
