<template>
  <div class="mj">
    <transition name="">
      <router-view></router-view>
    </transition>
    <mj-footer></mj-footer>
  </div>
</template>
<script>
import MJFooter from '@/components/Footer'
import {storage} from '@/util'

export default {
  name: 'contains',
  created () {
    if (process.env.NODE_ENV === 'dev') {
      // 张子锐
      storage({
        type: 'set',
        key: 'headimgurl',
        val: 'http://wx.qlogo.cn/mmopen/zYCT2SFoRZOG0TpeMPnp88o8WiaT4TDxRsXKTRsKHSRXxEcd1iaGs8Oe1ghV2oMgrOtdw4FAcic3PsS7FlluSQDy5ZVTiaLWYDuH/0'
      })
      storage({
        type: 'set',
        key: 'nickname',
        val: '明华'
      })
      storage({
        type: 'set',
        key: 'openid',
        val: 'op41I0w1RqzUfG6C8W_okT3oGlG0'
      })
      // storage({
      //   type: 'set',
      //   key: 'mobile',
      //   val: '17602180495'
      // })
      storage({
        type: 'set',
        key: 'mobile',
        val: '17317272575'
      })
      // 本地
      // storage({
      //   type: 'set',
      //   key: 'userId',
      //   val: '13833'
      // })
      // 张子锐
      // storage({
      //   type: 'set',
      //   key: 'userId',
      //   val: '11834'
      // })
      storage({
        type: 'set',
        key: 'userId',
        val: '11860'
      })
      return
    }
  },
  components: {
    'mj-footer': MJFooter
  },
  data () {
    return {
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../assets/styles/colors.less';
.mj {
  min-height: 100vh;
  background-color: @bg-grey;
}

.bounce-enter-active {
  animation: bounce-in .4s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}

.expand-enter-active {
  animation: expand-in .9s;
}
.expand-leave-active {
  animation: expand-out 1.2s;
}
@keyframes expand-in {
  0% {
    margin-top: 1rem;
    transform: scale(.6) translateX(-1500px);
  }
  25% {
    margin-top: 1rem;
    transform: scale(.6) translateX(200px);
  }
  50% {
    margin-top: 1rem;
    transform: scale(.6) translateX(200px);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes expand-out {
  0% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(.6);
  }
  9% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(.6);
  }
  10% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(.6) translateX(100px);
  }
  25% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(.6) translateX(200px);
  }
  50% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(.6) translateX(250px);
  }
  75% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(.6) translateX(-1000px);
  }
  100% {
    margin-top: 1rem;
    transform: scaleX(.8) scaleY(0) translateX(-1000px);
  }
}

</style>
