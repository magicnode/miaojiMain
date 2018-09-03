<template>
  <div class="map">
    <div class="ser-form">
      <div class="ser-con">
        <input
          v-model="snVal"
          type="search" 
          autocomplete="off" 
          autocorrect="off" 
          name="word"
          placeholder="输入站点名称搜索"
          class="ser-input" />
        <div class="ser-inner">
          <button class="ser-bn" type="submit" @click="btnSearch">点击搜索</button>
        </div>
      </div>

      <div class="index-box" v-show="showSearch">
        <div class="suggest-div">
          <div class="suggest-direct" style="display: none;"></div>
          <div class="suggest-panel">
            <div class="suggest-content">
              <div class="sug" v-for="item in searchBox" :key="item.id" @click="locateSite(item)">
                <button>{{item.name}}</button>
                <div class="sug-edit"></div>
                <div class="sug-searchicon"></div>
              </div>
            </div>
          </div>
          <div class="suggest-close" @click="snVal = null">关闭</div>
        </div>
      </div>
    </div>

    <div id="iCenter" style="height: 100vh;">
    </div>
    <div id="panel"></div>
  </div>
</template>
<script>
import axios from 'axios'
import _ from 'lodash'
import {mapGetters, mapActions} from 'vuex'
import {site as siteApi, brand as brandApi} from '@/api'
/* eslint-disable no-unused-vars */
import {getSite as getSiteService} from '@/services/site'
import {storage} from '@/util'
import pic from '../assets/images/new/officedefault.jpg'

// let instance = axios.create({
//   timeout: 2000
// })

// 导航按钮绑定事件
function Navigation (position, map, walking) {
  let selfPosition = ''
  map.plugin('AMap.Geolocation', function () {
    let geolocation = new window.AMap.Geolocation({
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
      noIpLocate: 0,
      convert: true,
      showButton: true,
      buttonPosition: 'LB',
      buttonOffset: new window.AMap.Pixel(10, 20),
      showMarker: false,
      showCircle: true,
      panToLocation: true,
      zoomToAccuracy: false,
      GeoLocationFirst: true
    })
    map.addControl(geolocation)
    geolocation.getCurrentPosition()
    window.AMap.event.addListener(geolocation, 'complete', function (data) {
      console.log('data', data)
      selfPosition = data.position
      walking.clear()
      walking.search(new window.AMap.LngLat(selfPosition.getLng(), selfPosition.getLat()), new window.AMap.LngLat(position[0], position[1]))
    })
    window.AMap.event.addListener(geolocation, 'error', function () {
      console.log('定位失败')
      alert('定位失败!')
    })
  })
}

function debounce (fn, delay) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

// 定义map, walking变量
let mapObj = {}
let walking = {}

export default {
  name: 'send',
  components: {
  },
  data () {
    return {
      dragendFunc: '',
      zoomendFunc: '',
      snVal: null,
      showSearch: false,
      searchBox: []
    }
  },
  mounted () {
    window.document.title = '选择寄件站点'
    const _this = this
    mapObj = new window.AMap.Map('iCenter', {
      resizeEnable: true,
      zoom: 14
    })
    walking = new window.AMap.Walking({
      map: mapObj,
      panel: 'panel'
    })
    mapObj.plugin('AMap.Geolocation', function () {
      // 实例化map 定位插件
      let geolocation = new window.AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
        noIpLocate: 0,
        convert: true,
        showButton: true,
        buttonPosition: 'LB',
        buttonOffset: new window.AMap.Pixel(10, 20),
        showMarker: false,
        showCircle: true,
        panToLocation: true,
        zoomToAccuracy: false,
        GeoLocationFirst: true
      })
      mapObj.addControl(geolocation)
      geolocation.getCurrentPosition()
      window.AMap.event.addListener(geolocation, 'complete', function (data) {
        // 定位成功后在 当前位置上打上标记
        const selfPosition = data.position
        let mymarker = new window.AMap.Marker({
          icon: 'http://cms.mingz-tech.com/cdn/marker_19x23.png',
          title: '我的位置',
          position: [selfPosition.lng, selfPosition.lat]
        })
        mymarker.setMap(mapObj)
        _this.getBounds()
      })
      window.AMap.event.addListener(geolocation, 'error', function () {
        console.log('定位失败')
      })
      window.AMap.event.addListener(mapObj, 'dragend', function () {
        clearTimeout(this.dragendFunc)
        this.dragendFunc = setTimeout(function () {
          console.log('start drag')
          _this.getBounds()
        }, 1100)
      })
      window.AMap.event.addListener(mapObj, 'zoomend', function () {
        clearTimeout(this.zoomendFunc)
        this.zoomendFunc = setTimeout(function () {
          console.log('start zoomend')
          _this.getBounds()
        }, 1100)
      })
    })
  },
  created () {
  },
  computed: {
    ...mapGetters({
      site: 'getSite',
      recent: 'getSiteRecent'
    })
  },
  updated () {
  },
  methods: {
    ...mapActions([
      'addSite'
    ]),
    async getSearchBox (val) {
      if (!val) {
        this.$vux.toast.show({
          text: '请输入站点名称!',
          type: 'warn',
          width: '20rem'
        })
        return
      }
      this.$vux.loading.show({
        text: '  '
      })
      const res = await getSiteService({
        name: val,
        pagination: 1,
        rownum: 6,
        superId: -1
      })
      this.$vux.loading.hide()
      if (res.code === 200) {
        const { obj } = res
        this.searchBox = obj
        this.showSearch = true
      }
    },
    clearSearchBox () {
      this.searchBox = []
      this.showSearch = false
    },
    btnSearch () {
      debounce(this.getSearchBox(this.snVal), 1500)
    },
    // 定位到站点
    locateSite (item) {
      const {latitude, longitude} = item
      if (latitude && longitude) {
        this.$vux.loading.show({
          text: '正在定位...'
        })
        this.snVal = null
        const position = [longitude, latitude]
        mapObj.setZoomAndCenter(14, position)
        this.getBounds(position)
        this.$vux.loading.hide()
      } else {
        return this.$vux.toast.show({
          text: '此站点坐标缺失，无法定位!',
          type: 'warn',
          width: '20rem'
        })
      }
    },
    // 定位或者 地图变化后 获取站点信息，并在地图上绘制站点标记
    async getBounds (openPosition) {
      console.log('开始获取站点')
      const _this = this
      let bounds = mapObj.getBounds()
      let southwestOb = bounds.getSouthWest()
      let southwest = []
      southwest[0] = southwestOb.lng
      southwest[1] = southwestOb.lat
      let northeastOb = bounds.getNorthEast()
      let northeast = []
      northeast[0] = northeastOb.lng
      northeast[1] = northeastOb.lat
      let params = new URLSearchParams()
      params.append('southwest', '[' + southwest + ']')
      params.append('northeast', '[' + northeast + ']')
      const res = await axios({
        url: siteApi.location,
        method: 'post',
        data: params,
        timeout: 20000,
        headers: {
          'content-Type': 'application/x-www-form-urlencoded'
        }
      })
      let data = res.data
      for (let i = 0, len = data.length; i < len; i++) {
        let info = data[i]
        const position = [info.longitude, info.latitude]
        let marker = new window.AMap.Marker({
          position,
          // offset: new window.AMap.Pixel(-17, -42),
          draggable: false
        })
        marker.setExtData({info: data[i]})
        marker.setMap(mapObj)
        const userId = info.userId
        // 定义信息窗打开事件
        let openInfoWin = null
        // 标记点击事件 打开信息窗
        window.AMap.event.addListenerOnce(marker, 'click', async function (data) {
          _this.getInfoWindow(userId, marker, position)
        })
        // 如果openPosition 和 position数据一直，则直接打开信息窗
        if (openPosition) {
          const arr = _.difference(openPosition, position)
          if (arr.length === 0) {
            this.getInfoWindow(userId, marker, position)
          }
        }
      }
    },
    // 加载信息窗, 并打开
    async getInfoWindow (userId, marker, position) {
      let {info} = marker.getExtData()
      const brandRes = await axios({
        method: 'get',
        url: brandApi.index,
        params: {
          id: userId
        }
      })
      let brand = ''
      if (brandRes.status !== 200) {
        brand = ''
      } else {
        let data = brandRes.data
        let brandList = []
        for (let i = 0, len = data.length; i < len; i++) {
          const item = data[i]
          brandList.push(item.brand)
        }
        brand = '<p class="pull-brand">接入品牌: ' + brandList + '</p>'
      }
      let officeBtnId = ''
      window.AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
        officeBtnId = 'userId' + info.userId
        const photo = '<div class="officeimg"><img src="' + pic + '"></div>'
        // takeState 上门取件 0 否 1支持
        let takeState = info.takeState || 0
        takeState = takeState === 0 ? '不支持上门取件' : '支持上门取件'
        const infoWindow = new SimpleInfoWindow({
          infoTitle: '<span>"妙寄"全网站点: ' + info.name || '' + '</span>',
          infoBody: photo + '<div class="office-detail"><div class="first-line"><button type="" id="navigation' + officeBtnId + '" class="navigation-btn">导航</button><p class="office-detail__more">详细<span class="more"><span></span></span></p></div><div class="office-detail__content contenthide"><p>详细地址: ' + info.descript + '</p><p>电话号码: <a href="tel:' + info.mobile + '">' + info.mobile + '</a></p></p>' + brand + '</div><p class="confirm-p">是否选择该站点为寄件站点?(' + takeState + ')</p><div class="confirm-btn-cont"><button type="button" id="' + officeBtnId + '" class="hide">确定</button><div></div>',
          offset: new window.AMap.Pixel(0, -31)
        })
        function openInfoWin () {
          infoWindow.open(mapObj, marker.getPosition())
        }
        function closeInfoWin () {
          infoWindow.close(mapObj, marker.getPosition())
        }
        window.AMap.event.addListener(marker, 'touchstart', function () {
          openInfoWin()
        })
        // 打开信息窗
        openInfoWin()
        // 清除导航内容
        walking.clear()
        setTimeout(function () {
          // 导航按钮
          const navBtn = window.document.getElementById('navigation' + officeBtnId)
          navBtn.addEventListener('touchstart', function (event) {
            event.stopPropagation()
            closeInfoWin()
            Navigation(position, mapObj, walking)
          }, true)
          // 详细按钮
          const detailmore = window.document.getElementsByClassName('office-detail__more')[0]
          const more = window.document.getElementsByClassName('more')[0]
          const contentDiv = window.document.getElementsByClassName('office-detail__content')[0]
          detailmore.addEventListener('touchstart', function (event) {
            event.stopPropagation()
            // event.preventdefault()
            const oldName = more.className
            const oldBrandName = contentDiv.className
            const isUpside = /upside/g
            if (isUpside.test(oldName)) {
              more.className = oldName.replace(isUpside, '')
              contentDiv.className += ' contenthide'
            } else {
              more.className += ' upside'
              contentDiv.className = oldBrandName.replace('contenthide', '')
            }
          }, true)
        }, 600)
      })
      // 设置按钮绑定事件
      setTimeout(function () {
        // 确认按钮
        const btn = window.document.getElementById(officeBtnId)
        btn.addEventListener('touchstart', function (event) {
          event.stopPropagation()
          info = JSON.stringify(info)
          // window.localStorage.removeItem('mjwx_addressInfo')
          storage({
            type: 'remove',
            key: 'addressInfo'
          })
          // window.localStorage.setItem('mjwx_addressInfo', info)
          storage({
            type: 'set',
            key: 'addressInfo',
            val: info
          })
          // window.history.go(-1)
          setTimeout(function () {
            window.wxvue.$router.push({
              path: '/send'
            })
          }, 300)
        }, true)
        btn.className = btn.className.replace(/hide/g, '')
      }, 1000)
      return
    }
  },
  watch: {
    snVal (val, oldval) {
      if (val) {
        debounce(this.getSearchBox(val), 1500)
      } else {
        this.clearSearchBox()
      }
    }
  },
  beforeDestroy () {
    this.$vux.loading.hide()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';

.map {
  .ser-form {
    height: 44px;
    margin: 0 16px;
    border: 1px solid #363636;
    -webkit-border-radius: 0;
    border-radius: 0;
    background: #fff;
    -webkit-box-shadow: initial;
    box-shadow: initial;
    position: absolute;
    top: 20px;
    z-index: 560;
    width: 92%;
    .ser-con {
      display: flex;
      width: 100%;
      .ser-input {
        height: 44px;
        overflow: hidden;
        height: 44px;
        margin: 0;
        padding: 7px 42px 7px 6px;
        font-family: Arial,Helvetica,sans-serif;
        line-height: 28px;
        border: none;
        -webkit-border-radius: 0;
        border-radius: 0;
        resize: none;
        display: block;
        font-size: 18px;
        -webkit-appearance: none;
        flex: 1;
      }
      .ser-inner {
        width: 81px;
        position: relative;
        margin: 0;
        padding: 0;
        .ser-bn {
          position: absolute;
          top: 0;
          right: 0;
          box-sizing: inherit;
          width: 60px;
          height: 44px;
          padding: 0 10px;
          border: 0;
          border-left: 1px solid #e8e8e8;
          font-size: 16px;
          font-weight: 700;
          line-height: 46px;
          white-space: nowrap;
          letter-spacing: -1px;
          color: #38f;
          border-top-right-radius: initial;
          border-bottom-right-radius: initial;
          background: #fff;
          text-shadow: none;
          user-select: none;
        }
      }
    }
    .index-box {
      background: white;
      .suggest-div {
        top: 10px!important;
        right: -17px;
        left: -17px;
        border: 0;
        border-top: 1px solid #f1f1f1;
        .suggest-panel {
          padding: 0 17px;
          .suggest-content {
            .sug {
              color: #878787;
              position: relative;
              padding-right: 40px;
              border-bottom: 1px solid #f1f1f1;
              font-size: 16px;
              line-height: 22px;
              text-align: left;
              word-break: break-all;
              -webkit-tap-highlight-color: rgba(0,0,0,0);
              button {
                margin-left: -10px;
                z-index: 2;
                padding: 10px 0 10px 37px;
                font-weight: 400;
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                margin: 0;
                border: 0;
                font-size: 16px;
                line-height: 22px;
                text-align: left;
                color: #333;
                background: none transparent;
                -webkit-appearance: none;
              }
              .sug-searchicon {
                position: absolute;
                top: 0;
                width: 34px;
                height: 100%;
                box-sizing: content-box;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: 15px 15px;
                z-index: 2;
                left: -10px;
                padding-left: 0;
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAAAUVBMVEUAAADNzc3Nzc3Nzc3MzMzMzMzMzMzNzc3Q0NDb29vNzc3Nzc3MzMzMzMzMzMzNzc3Nzc3Nzc3Ozs7Pz8/Q0NDMzMzOzs7Ozs7MzMzNzc3MzMyjngBVAAAAGnRSTlMA9Vgt/Nyjjg0H4FDOw7+2rYhiQCYeFXzjewzxqiMAAAEsSURBVEjHlZVZFoMgDEUDVIRirVOd9r/QGk5TrFgw78uDF3gJkMBBatF1IURR60VBWqos1p2KMjHhpddI+nXO2lasJxKtPYHHx+dv0/WDMUPfNZ/ZjzF2fF9RlbO73VzlB+/qCAs/LOEg6RcRv/joB58GIpmnX2ZvxnrPJZyq9N53BtsIjvA25FmgDfgrNCO+edfozPynDUalKR+4k4SEJBIq+KogqSrEhRfJpWmHV+xrRNg0bQVZmbaPBjJqNmiijHQ5uqOs1NtHn6P7DaopyCFHDxQmBmBytMFU8GieE16UvAyyTmfhnTzrVvFuLO81sF4a7xWzKgSv+jAq200yqibilyvyjfBL1V4Sfq2TEH6tSwU83wFjPEhN1F0nQgPuIK+Az8DAGTS4eXZvXiowQ7wpXsEAAAAASUVORK5CYII=);
              }
            }
          }
        }
        .suggest-close {
          margin: 0 -.17rem;
          margin-bottom: -1px;
          height: 38px;
          line-height: 38px;
          background: #f8f8f8;
          color: #555;
          text-align: center;
          font-size: 14px;
          z-index: 2;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          &::after {
            border: 0;
            line-height: 38px;
            color: #555;
          }
        }
      }
    }
  }
}

.amap-ui-smp-ifwn-container {
  max-width: 22rem;
  span {
    white-space: pre-wrap;
  }
  @media (max-width:320px) {
    max-width: 22rem;
  }
  @media (min-width:360px) {
    max-width: 42rem;
  }
  @media (min-width:400px) {
    max-width: 47rem;
  }
}

.confirm-p {
  padding-top: 1rem;
  padding-bottom: 0;
}

.amap-icon img {
  max-width: 19px!important;
  max-height: 33px!important;
}

</style>
