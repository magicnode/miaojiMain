import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import * as user from './modules/user'
import * as send from './modules/send'
import * as pickup from './modules/pickup'
import * as address from './modules/address'
import * as userpackage from './modules/package'
import * as express from './modules/express'
import {brand as brandApi} from '@/api'

Vue.use(Vuex)

let instance = axios.create({
  timeout: 6000
})

const store = new Vuex.Store({
  modules: {
    user,
    send,
    pickup,
    address,
    userpackage,
    express
  },
  state: {
    title: '妙寄',
    isLoading: false,
    isJump: false,
    jumpSrc: 'http://112.74.34.241:3000/pics/random?show=1',
    toast: {
      show: false,
      type: 'success',
      info: 'show'
    },
    brand: [],
    page: 'usercenter'
  },
  actions: {
    async setAllBrand ({commit}, {id}) {
      try {
        const result = await instance.get(brandApi.index, {
          params: {id}
        })
        if (result.data) {
          const brand = []
          const data = result.data
          for (let i = 0, len = data.length; i < len; i++) {
            const item = data[i]
            // if (item['brand'] === '京东') {
            //   brand.push(item)
            // }
            brand.push(item)
          }
          brand.push({
            brand: '空',
            brandId: null
          })
          commit('SET_BRAND', {brand: brand})
          return {
            text: '获取快递品牌成功',
            type: 'success',
            width: '18rem'
          }
        }
        return {
          text: '获取快递品牌失败',
          type: 'warn',
          width: '18rem'
        }
      } catch (err) {
        console.error(err)
        return {
          text: '网络请求错误',
          type: 'warn',
          width: '18rem'
        }
      }
    }
  },
  getters: {
    getAllBrand: state => state.brand,
    getPage: state => state.page
  },
  mutations: {
    SET_TITLE (state, { title }) {
      state.title = title
    },
    SET_PAGE (state, { page }) {
      state.page = page
    },
    SET_BRAND (state, { brand }) {
      state.brand = brand
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateJumpStatus (state, payload) {
      state.isJump = payload.isJump
    },
    updateJumpSrc (state, payload) {
      state.jumpSrc = payload.jumpSrc
    }
  }
})

export default store
