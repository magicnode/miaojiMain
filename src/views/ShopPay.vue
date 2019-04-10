<template>
  <div class="sendqr">
    <div class="container">
      正在支付...
    </div>
  </div>
</template>
<script>
import * as wxUtil from '@/util/wx'

export default {
  name: 'shoppay',
  async created () {
    // this.$vux.loading.show({text: ' '})
    let query = this.$route.query
    // let { orderSn, openid, out_trade_no, total_fee } = query
    this.payOptions = query
  },
  mounted: async function () {
    window.document.title = '商城支付'
    await wxUtil.init()
    const _this = this
    window.wx.ready(function () {
      console.log('微信jssdk初始化成功')
      _this.wxPay()
    })
    window.wx.error(function (res) {
      console.log('res', res)
    })
  },
  computed: {
  },
  data () {
    return {
      payOptions: {}
    }
  },
  methods: {
    async wxPay () {
      const params = this.payOptions
      try {
        const wxPayRes = await wxUtil.shopPay(params)
        this.$vux.toast.show(wxPayRes)
      } catch (e) {
        console.error(e)
        this.$vux.toast.show(e)
      } finally {
        // 无论结果如何都要返回原来的网页
        // /index.php/Mobile/User/order_detail/id/1053.html
        const _id = params.sp_order_id
        const url = 'http://shop.mijihome.cn/index.php/Mobile/User/order_detail/id/' + _id + '.html'
        console.log('url', url)
        setTimeout(function () {
          window.location.href = url
        }, 900)
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';

button.pay {
  background: transparent;
  font-size: 1.4rem;
  padding: 1px 5px;
  border: 1px solid @dark-yellow;
  border-radius: 3px;
  color: @dark-yellow;
}

.sendqr {
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
  }
}
</style>
