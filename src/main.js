// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueScroller from 'vue-scroller'
import { WechatPlugin, Group, Cell, ConfirmPlugin, Tab, TabItem, ToastPlugin, LoadingPlugin } from 'vux'

import router from './router'
import store from './store'
import App from './App'
import AxiosPlugin from './plugins/axios'
import * as filters from './filters'
import Header from './components/Header.vue'
import PickupItem from './components/PickupItem.vue'
import SendItem from './components/SendItem.vue'
import MJSpinner from './components/MJSpinner.vue'
import {storage} from '@/util'

FastClick.attach(document.body)

Vue.use(VueScroller)
Vue.use(AxiosPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

Vue.config.productionTip = false

Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('tab', Tab)
Vue.component('tabItem', TabItem)
Vue.component('mj-header', Header)
Vue.component('mj-spinner', MJSpinner)
Vue.component('mj-pickupitem', PickupItem)
Vue.component('mj-senditem', SendItem)

router.beforeEach(function (to, from, next) {
  // login auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const openid = storage({
      type: 'get',
      key: 'openid'
    })
    const userid = storage({
      type: 'get',
      key: 'userId'
    })
    if (!openid || userid === '' || !userid) {
      const redirectUri = to.fullPath
      storage({
        key: 'redirect_uri',
        val: redirectUri,
        type: 'set'
      })
      return next({
        path: '/init'
      })
    }
  }
  // mobile auth
  if (to.matched.some(record => record.meta.requiresMobile)) {
    const mobile = storage({
      type: 'get',
      key: 'mobile'
    })
    if (!mobile || mobile === '') {
      const path = to.fullPath
      return next({
        path: '/bindphone',
        query: { path }
      })
    }
  }
  return next()
})

router.afterEach((to, from) => {
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
window.wxvue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
