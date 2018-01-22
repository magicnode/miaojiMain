<template>
  <div class="map">
    <div id="iCenter" style="height: 100vh;">
    </div>
    <div id="panel"></div>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import {site as siteApi, brand as brandApi} from '@/api'
import {storage} from '@/util'
import pic from '../assets/images/new/officedefault.jpg'

let instance = axios.create({
  timeout: 2000
})

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

export default {
  name: 'send',
  components: {
  },
  mounted () {
    window.document.title = '选择寄件站点'
    let mapObj = new window.AMap.Map('iCenter', {
      resizeEnable: true,
      zoom: 14
    })
    const walking = new window.AMap.Walking({
      map: mapObj,
      panel: 'panel'
    })
    mapObj.plugin('AMap.Geolocation', function () {
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
      async function getBounds (selfPosition) {
        let bounds = mapObj.getBounds()
        let southwestOb = bounds.getSouthWest()
        let southwest = []
        southwest[0] = southwestOb.lng
        southwest[1] = southwestOb.lat
        let northeastOb = bounds.getNorthEast()
        let northeast = []
        northeast[0] = northeastOb.lng
        northeast[1] = northeastOb.lat
        const res = await instance.get(siteApi.location, {
          params: {southwest: '[' + southwest.toString() + ']', northeast: '[' + northeast.toString() + ']'}
        })
        let data = res.data
        for (let i = 0, len = data.length; i < len; i++) {
          let info = data[i]
          let marker = new window.AMap.Marker({
            position: [info.longitude, info.latitude],
            // offset: new window.AMap.Pixel(-17, -42),
            draggable: false
          })
          marker.setExtData({info: data[i]})
          marker.setMap(mapObj)
          const userId = info.userId
          const position = [info.longitude, info.latitude]
          // 标记点击事件
          window.AMap.event.addListenerOnce(marker, 'click', async function (data) {
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
          })
        }
      }
      window.AMap.event.addListener(geolocation, 'complete', function (data) {
        // 定位成功后在 当前位置上打上标记
        const selfPosition = data.position
        let mymarker = new window.AMap.Marker({
          icon: 'http://oxou6bzgv.bkt.clouddn.com/marker_19x23.png',
          title: '我的位置',
          position: [selfPosition.lng, selfPosition.lat]
        })
        mymarker.setMap(mapObj)
        getBounds(selfPosition)
      })
      window.AMap.event.addListener(geolocation, 'error', function () {
        console.log('定位失败')
      })
      window.AMap.event.addListener(mapObj, 'dragend', function () {
        clearTimeout(this.dragendFunc)
        this.dragendFunc = setTimeout(function () {
          console.log('start drag')
          getBounds()
        }, 1100)
      })
      window.AMap.event.addListener(mapObj, 'zoomend', function () {
        clearTimeout(this.zoomendFunc)
        this.zoomendFunc = setTimeout(function () {
          console.log('start zoomend')
          getBounds()
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
  data () {
    return {
      dragendFunc: '',
      zoomendFunc: ''
    }
  },
  methods: {
    ...mapActions([
      'addSite'
    ])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../assets/styles/colors.less';
@import '../assets/styles/helpers.less';

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
