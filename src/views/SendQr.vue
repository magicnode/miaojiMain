<template>
  <div class="sendqr">
    <div class="container">
      <div class="sendqr-img">
        <router-link :to="{path: '/express/route', query: {orderSn: data.order, brand: data.brandId}}" class="express-router__link" v-show="data.type === 2">查看路由</router-link>
        <div class="sendqr-img--wait" v-show="data.type === 1">
          <img :src="qr" />
          <p>寄件时，请向店员出示此二维码</p>
        </div>
        <div class="sendqr-img--sign" v-show="data.type === 2">
          <img src="../assets/images/new/rec_ico_rig.png" />
          <p>快递已经寄出</p>
        </div>
        <div class="sendqr-img--sign" v-show="data.type === 8">
          <img src="../assets/images/daipay.png" @click.stop="wxPay" />
          <p>点击下方付款按钮付款</p>
        </div>
        <div class="sendqr-img--sign" v-show="data.type === 7">
          <img src="../assets/images/refused_package.png" />
          <p>{{data.reason || '站点拒绝接单'}}</p>
        </div>
      </div>
      <div class="sendqr-detail">
        <div class="sendqr-detail-box">
          <div class="sendqr-detail-box__icon">
            <span class="bgblue">寄</span>
          </div>
          <div class="sendqr-detail-box__detail">
            <p>{{data.sendName + '   ' + data.sendMobile}}  {{data.sendTel}}</p>
            <p>{{data.sendProvince + data.sendDistrict + data.sendAddress}}</p>
          </div>
        </div>
        <div class="sendqr-detail-box">
          <div class="sendqr-detail-box__icon">
            <span class="bgyellow">收</span>
          </div>
          <div class="sendqr-detail-box__detail">
            <p>{{data.reciveName + '   ' + data.reciveMobile}}  {{data.reciveTel}}</p>
            <p>{{data.reciveProvince + data.reciveDistrict + data.reciveAddress}}</p>
          </div>
        </div>
        <div class="sendqr-detail-box">
          <span class="sendqr-detail-box__title">寄件站点</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.officeName}}</span>
          <img style="width: 1.4rem;padding: 0 1rem;position: absolute;right: 6px;" src="../assets/images/new/pic_ico_map.png" alt="地址" @click="watchOffice(data.officeId)">
        </div>
        <div class="sendqr-detail-box">
          <span class="sendqr-detail-box__title">快递品牌</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.brandId | brandtype}}</span>
        </div>
        <div class="sendqr-detail-box">
          <span class="sendqr-detail-box__title">快递类型</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.expresstype | pickupstate}}</span>
        </div>
        <div class="sendqr-detail-box" v-show="data.describe">
          <span class="sendqr-detail-box__title">物品描述</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.describe}}</span>
        </div>
        <div class="sendqr-detail-box" v-show="data.note">
          <span class="sendqr-detail-box__title">寄件备注</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.note}}</span>
        </div>
        <div class="sendqr-detail-box" v-show="data.pay_type">
          <span class="sendqr-detail-box__title">支付方式</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">{{data.pay_type | paytype}}</span>
        </div>
        <div class="sendqr-detail-box" v-show="data.price">
          <span class="sendqr-detail-box__title">支付金额</span>
          <span class="sendqr-detail-box__yin">:</span>
          <span class="sendqr-detail-box__content">
            {{'￥' + data.price}}
            <button class="pay" @click.stop="wxPay" v-show="data.type === 8">立即付款</button>
            <span class="pay" v-show="data.type !== 8">支付完成</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import {pic as picApi} from '@/api'
import {storage} from '@/util'
import * as wxUtil from '@/util/wx'

export default {
  name: 'sendqr',
  async created () {
    try {
      this.$vux.loading.show({text: ' '})
      let query = this.$route.query
      let id = query.id || ''
      this.id = id
      this.qr = picApi.qr + '?orderSn=' + '' + '&userId=' + id
      const result = await this.setSingleSend({id})
      if (result.type !== 'success') {
        this.$vux.toast.show(result)
      }
    } catch (err) {
      console.error(err)
    } finally {
      this.$vux.loading.hide()
    }
  },
  async mounted () {
    window.document.title = '寄件明细'
    await wxUtil.init()
    window.wx.ready(function () {
      console.log('微信jssdk初始化成功')
    })
    window.wx.error(function (res) {
      console.log('res', res)
    })
  },
  computed: {
    ...mapGetters({
      data: 'getQrSend'
    })
  },
  data () {
    return {
      qr: '',
      id: '',
      order: '',
      item: {},
      sendAddress: {},
      pickupAddress: {}
    }
  },
  methods: {
    ...mapActions([
      'setSingleSend'
    ]),
    watchOffice (userId) {
      this.$router.push({path: '/office/location', query: {userId}})
    },
    async wxPay () {
      const orderSn = this.data.order
      // const orderSn = '15008555555555'
      const money = this.data.price
      if (Number(money) === 0) {
        this.$vux.toast.show({
          text: '正在定价中，定价结束后会有微信模板消息通知',
          type: 'text',
          width: '22rem',
          time: 2500
        })
        return
      }
      let params = {
        id: this.id,
        openid: storage({key: 'openid'}),
        orderSn,
        total_fee: money,
        body: '妙寄快递包裹'
      }
      try {
        const wxPayRes = await wxUtil.pay(params)
        this.$vux.toast.show(wxPayRes)
      } catch (e) {
        console.error(e)
        this.$vux.toast.show(e)
      } finally {
        const _this = this
        const id = this.id
        setTimeout(function () {
          _this.setSingleSend({id})
          window.location.reload()
        }, 800)
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';
.bgblue {
  background-color: @light-blue;
}
.bgyellow {
  background-color: @dark-yellow;
}
.darkyellow {
  color: @dark-yellow;
}

.lightyellow {
  color: @red!important;
}

button.pay {
  background: transparent;
  font-size: 1.4rem;
  padding: 1px 5px;
  border: 1px solid @dark-yellow;
  border-radius: 3px;
  color: @dark-yellow;
}

.sendqr {
  .container {
  }
  &-img {
    .btg;
    background: white;
    padding: 1rem;
    padding-bottom: 2.5rem;
    &--wait {
      img {
        width: 15rem;
      }
      p {
        font-size: 1.4rem;
        color: @greyfont;
      }
    }
    &--sign {
      img {
        padding: 2.5rem;
        padding-bottom: 0.8rem;
        width: 6rem;
        height: auto;
      }
      p {
        font-size: 1.8rem;
        color: @dark-yellow;
      }
    }
    button {
      text-align: center;
      border: none;
      background: @dark-yellow;
      padding: 0 0.3rem;
      color: white;
      border-radius: 5px;
      margin-left: 6px;
    }
  }
  &-detail {
    .btopg;
    margin-top: 1.17647059em;
    box-sizing: border-box;
    &-box {
      .flex;
      .btg;
      background: white;
      padding: 1rem 2rem;
      &__icon {
        flex: 1;
        span {
          font-size: 1.8rem;
          width: 4rem;
          height: 4rem;
          line-height: 4rem;
          display: block;
          border-radius: 50%;
          color: white;
        }
      }
      &__detail {
        flex: 4;
        text-align: left;
        p {
          font-size: 1.4rem;
          width: 20rem;
          overflow: hidden;
          white-space: pre-line;
          text-overflow: ellipsis;
          @media (max-width:320px) {
            width: 16rem;
          }
          @media (min-width:400px) {
            width: 25rem;
          }
        }
      }
      &__title {
        font-size: 1.6rem;
        width: 7rem;
        text-align: left;
      }
      &__yin {
        font-size: 1.6rem;
      }
      &__content {
        font-size: 1.6rem;
        color: @dark-yellow;
        margin-left: 1rem;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
