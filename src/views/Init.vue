<template>
  <div id="app">
    <router-view></router-view>
    <transition name="pic">
      <img class="loading-img" v-show="isJump" :src="jumpSrc" alt="">
    </transition>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import config from 'config'
import { Loading } from 'vux'
import { mapState, mapActions, mapGetters } from 'vuex'
import {storage} from '@/util'
import { wx } from '@/api'

const NODE_ENV = process.env.NODE_ENV
console.log('111', NODE_ENV)
let appid = config[NODE_ENV].appid
// let redirectUri = 'http://171u9555b3.iask.in/'
let redirectUri = wx.redirect

export default {
  name: 'app',
  async created () {
    this.$vux.toast.show({
      type: 'text',
      width: '18rem',
      time: '1500',
      text: '正在为您跳转，请稍候'
    })
    // 从localstorage中获取openid
    const openid = storage({
      type: 'get',
      key: 'openid'
    })
    if (openid) {
      // 通过openid从数据库中查询用户数据
      await this.getUserInfoByOpenid({openid})
    } else {
      // 获取openid失败, 跳转到授权页面
      const state = 'web'
      const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirectUri + '&response_type=code&scope=snsapi_base&state=' + state + '#wechat_redirect'
      window.location.href = url
      return
    }
  },
  data () {
    return {
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      isJump: state => state.isJump,
      jumpSrc: state => state.jumpSrc
    }),
    ...mapGetters({
      'openid': 'getOpenId'
    })
  },
  methods: {
    ...mapActions([
      'setOpenid',
      'setUserInfo'
    ]),
    async getUserInfoByOpenid ({openid}) {
      const userinfo = await this.setUserInfo({openid})
      if (userinfo.type === 'text') {
        // 用户未绑定手机， 跳转绑定手机页面
        this.$router.push({path: '/bindphone'})
        return
      } else if (userinfo.type === 'success') {
        // 获取用户信息成功, 根据page跳转页面
        this.$vux.toast.show({
          type: 'success',
          text: '登录成功',
          width: '16rem'
        })
        let path = storage({key: 'redirect_uri'}) || '/usercenter'
        path = path === '/init' ? '/usercenter' : path
        this.$router.push({path})
        return
      } else {
        storage({
          type: 'remove',
          key: 'openid'
        })
        return this.$router.push({path: '/nouser'})
      }
    }
  }
}
</script>

<style lang="less">
</style>
