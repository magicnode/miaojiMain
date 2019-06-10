import Vue from 'vue'
import Router from 'vue-router'

import Container from '@/views/Container'

Vue.use(Router)

const usercenter = r => require.ensure([], () => r(require('@/views/UserCenter')), 'Usercenter')
const send = r => require.ensure([], () => r(require('@/views/Send')), 'Send')
const pickup = r => require.ensure([], () => r(require('@/views/PickUp')), 'PickUp')
const pickuptest = r => require.ensure([], () => r(require('@/views/PickUpTest')), 'PickUpTest')
const address = r => require.ensure([], () => r(require('@/views/Address')), 'Address')
const addaddress = r => require.ensure([], () => r(require('@/views/AddAddress')), 'AddAddress')
const showpic = r => require.ensure([], () => r(require('@/views/ShowPic')), 'ShowPic')
const editaddress = r => require.ensure([], () => r(require('@/views/EditAddress')), 'EditAddress')
const pickupdetail = r => require.ensure([], () => r(require('@/views/PickUpDetail')), 'PickUpDetail')
const senddetail = r => require.ensure([], () => r(require('@/views/SendDetail')), 'SendDetail')
const sendqr = r => require.ensure([], () => r(require('@/views/SendQr')), 'SendQr')
const sendend = r => require.ensure([], () => r(require('@/views/SendEnd')), 'SendEnd')
const smslogin = r => require.ensure([], () => r(require('@/views/SmsLogin')), 'SmsLogin')
const hallmap = r => require.ensure([], () => r(require('@/views/HallMap')), 'HallMap')
const login = r => require.ensure([], () => r(require('@/views/Login')), 'Login')
const bindphone = r => require.ensure([], () => r(require('@/views/BindPhone')), 'BindPhone')
const redirect = r => require.ensure([], () => r(require('@/views/Redirect')), 'Redirect')
const test = r => require.ensure([], () => r(require('@/views/Test')), 'Test')
const officelocation = r => require.ensure([], () => r(require('@/views/OfficeLocation')), 'OfficeLocation')
const userpackage = r => require.ensure([], () => r(require('@/views/UserPackage')), 'UserPackage')
const customerservice = r => require.ensure([], () => r(require('@/views/CustomerService')), 'CustomerService')
const shopPay = r => require.ensure([], () => r(require('@/views/ShopPay')), 'ShopPay')

export default new Router({
  // mode: 'history',
  base: __dirname,
  routes: [{
    path: '/',
    name: 'Container',
    component: Container,
    children: [{
      path: '/index',
      name: 'Index',
      component: require('@/views/Index')
    }, {
      path: '/usercenter',
      name: 'UserCenter',
      component: usercenter,
      meta: {
        scrollToTop: true,
        requiresAuth: true,
        requiresMobile: true
      }
    }, {
      path: '/send',
      name: 'Send',
      component: send,
      meta: {
        scrollToTop: true,
        requiresAuth: true,
        requiresMobile: true
      }
    }, {
      path: '/pickup',
      name: 'PickUp',
      component: pickup,
      meta: {
        requiresAuth: true,
        requiresMobile: true
      }
    }, {
      path: '/pickuptest',
      name: 'PickUpTest',
      component: pickuptest
    }]
  }, {
    path: '/address',
    name: 'Address',
    component: address,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/address/add',
    name: 'AddAddress',
    component: addaddress,
    meta: { scrollToTop: true }
  }, {
    path: '/address/showpic',
    name: 'ShowPic',
    component: showpic,
    meta: { scrollToTop: true }
  }, {
    path: '/address/edit',
    name: 'EditAddress',
    component: editaddress,
    meta: { scrollToTop: true }
  }, {
    path: '/pickup/detail',
    name: 'PickUpDetail',
    component: pickupdetail,
    meta: { scrollToTop: true }
  }, {
    path: '/send/detail',
    name: 'SendDetail',
    component: senddetail
  }, {
    path: '/send/qr',
    name: 'SendQrOld',
    component: sendqr
  }, {
    path: '/sendqr',
    name: 'SendQr',
    component: sendqr
  }, {
    path: '/send/end',
    name: 'SendEnd',
    component: sendend
  }, {
    path: '/smslogin',
    name: 'SmsLogin',
    component: smslogin
  }, {
    path: '/hallmap',
    name: 'HallMap',
    component: hallmap
  }, {
    path: '/login',
    name: 'Login',
    component: login
  }, {
    path: '/bindphone',
    name: 'BindPhone',
    component: bindphone
  }, {
    path: '/redirect',
    name: 'Redirect',
    component: redirect
  }, {
    path: '/test',
    name: 'Test',
    component: test
  }, {
    path: '/init',
    name: 'Init',
    component: require('@/views/Init')
  }, {
    path: '/office/location',
    name: 'OfficeLocation',
    component: officelocation
  }, {
    path: '/nouser',
    name: 'NoUser',
    component: require('@/views/NoUser')
  }, {
    path: '/user/package',
    name: 'UserPackage',
    component: userpackage
  }, {
    path: '/customer/service',
    name: 'CustomerService',
    component: customerservice
  }, {
    path: '/express/route',
    name: 'ExpressRoute',
    component: require('@/views/ExpressRoute'),
    meta: {
      intro: '快递路由信息'
    }
  }, {
    path: '/shopmijihomepay',
    name: 'shopPay',
    component: shopPay
  }]
})
