<template>
  <div class="map">
    <div id="iCenter" style="height: 100vh;">
    </div>
    <div id="panel"></div>
  </div>
</template>
<script>
import {address as addressApi, brand as brandApi} from '@/api'
import pic from '../assets/images/new/officedefault.jpg'

const setOfficeMaker = function ({position, info, error, brand}) {
  let map = new window.AMap.Map('iCenter', {
    resizeEnable: true,
    zoom: 13,
    center: position
  })
  window.AMapUI.loadUI(['overlay/SimpleInfoWindow'], function (SimpleInfoWindow) {
    const marker = new window.AMap.Marker({
      map: map,
      zIndex: 9999999,
      position: position,
      draggable: false
    })
    const photo = '<div class="officeimg"><img src="' + pic + '"></div>'
    const infoWindow = new SimpleInfoWindow({
      infoTitle: '<span>"妙寄"全网站点: ' + info.name + '</strong>',
      infoBody: photo + '<div class="office-detail"><div class="first-line"><button type="" class="navigation-btn">导航</button><p class="office-detail__more">详细<span class="more"><span></span></span></p></div><div class="office-detail__content contenthide"><p>所在区域: ' + info.address + '</p><p>详细地址: ' + info.descript + '</p><p>电话号码: <a href="tel:' + info.mobile + '">' + info.mobile + '</a></p></p>' + brand + '</div></div>' + error,
      offset: new window.AMap.Pixel(0, -31)
    })
    function openInfoWin () {
      infoWindow.open(map, marker.getPosition())
    }
    function closeInfoWin () {
      infoWindow.close(map, marker.getPosition())
    }
    window.AMap.event.addListener(marker, 'click', function () {
      openInfoWin()
    })
    openInfoWin()
    const walking = new window.AMap.Walking({
      map: map,
      panel: 'panel'
    })
    // 给导航按钮添加事件, more按钮添加高度控制点击事件
    setTimeout(function () {
      const navBtn = window.document.getElementsByClassName('navigation-btn')[0]
      navBtn.addEventListener('touchstart', function (event) {
        event.stopPropagation()
        closeInfoWin()
        Navigation(position, map, walking)
      }, true)
      const detailmore = window.document.getElementsByClassName('office-detail__more')[0]
      const more = window.document.getElementsByClassName('more')[0]
      const contentDiv = window.document.getElementsByClassName('office-detail__content')[0]
      detailmore.addEventListener('touchstart', function (event) {
        event.stopPropagation()
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
}

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
      selfPosition = data.position
      // 定位成功后在 当前位置上打上标记
      let mymarker = new window.AMap.Marker({
        icon: 'http://cms.mingz-tech.com/cdn/marker_19x23.png',
        title: '我的位置',
        position: [selfPosition.lng, selfPosition.lat]
      })
      mymarker.setMap(map)

      walking.clear()
      // 本地经纬度，测试用
      // walking.search([121.345506, 31.222795], new window.AMap.LngLat(position[0], position[1]))
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
  created () {
  },
  async mounted () {
    window.document.title = '"妙寄"站点地图'
    const {userId} = this.$route.query
    if (!userId) {
      this.$vux.toast.show({
        text: '缺少关键数据， 无法查询站点地址',
        type: 'warn',
        width: '26rem'
      })
      return
    }
    try {
      const res = await this.$http({
        method: 'post',
        url: addressApi.officelocation,
        params: {
          userId
        }
      })
      if (res.status === 200) {
        const data = res.data
        this.province = data.province
        this.city = data.city
        this.district = data.district
        this.longitude = data.longitude
        this.latitude = data.latitude
        this.descript = data.descript
        this.name = data.name
        this.address = data.province + data.city + '市' + data.district
        const position = [this.longitude || 121.345506, this.latitude || 31.222795]
        const info = {
          name: this.name,
          address: this.address,
          descript: this.descript,
          mobile: data.mobile
        }
        let error = '</br>'
        if (!this.longitude && !this.latitude) {
          error = '</br><p>定位失败，为您定位到<a href="http://www.mijihome.cn/phone/index.html#/index">上海圈嘀科技公司</a></p>'
        }
        const brandRes = await this.$http({
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
        setOfficeMaker({position, info, error, brand})
      } else {
        this.$vux.toast.show({
          text: '获取站点信息失败',
          type: 'warn',
          width: '26rem'
        })
        return
      }
    } catch (e) {
      console.error(e)
      this.$vux.toast.show({
        text: '无法获取站点信息, 网络请求错误',
        type: 'warn',
        width: '25rem'
      })
    }
  },
  computed: {
  },
  data () {
    return {
      addressId: '',
      address: '',
      city: '',
      descript: '',
      district: '',
      latitude: 0,
      longitude: 0,
      name: '',
      province: ''
    }
  },
  methods: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../assets/styles/colors.less';

</style>
