<template>
  <div class="addaddress">
    <div class="checkaddress" v-show="afterPaste">
      请检查拆分地址是否准确，如有遗漏请及时补充
    </div>
    <div class="addaddress-container">
      <group>
         <x-input @on-focus="fixBtn" @on-blur="removeFixBtn" title="姓名" v-model="name" :max="20" placeholder="请填写您的真实姓名" required></x-input>
         <x-input @on-focus="fixBtn" @on-blur="removeFixBtn" title="手机" v-model="mobile" placeholder="手机、座机不可同时为空"></x-input>
         <x-input @on-focus="fixBtn" @on-blur="removeFixBtn" title="座机" v-model="tel" placeholder="手机、座机不可同时为空"></x-input>
         <x-address 
           @on-focus="fixBtn" 
           @on-blur="removeFixBtn" 
           v-if="pagetype === 'add'"
           class="quyu"
           required
           title="地区"
           v-model="location"
           raw-value
           :list="addressData"
           placeholder="请选择省市区"></x-address>
         <x-address
           class="quyu"
           v-if="pagetype === 'edit'"
           required
           title="地区" 
           raw-value 
           v-model="location" 
           :list="addressData" 
           placeholder="请选择省市区"></x-address>
         <x-textarea @on-focus="fixBtn" @on-blur="removeFixBtn" type="text" title="地址" :max="80" placeholder="请详细到门牌号 (限80字)" :show-counter="false" v-model="address" :rows="1" :height="address.length + 22" required>
         </x-textarea>
         <x-input @on-focus="fixBtn" @on-blur="removeFixBtn" title="邮编" v-model="postcode" placeholder="请输入邮编"></x-input>
       </group>
       <group>
         <x-switch title="设为默认地址" class="mj-switch" v-model="value"></x-switch>
       </group>
       <div class="ai-text">
         <p class="title">智能地址填写</p>
         <div class="text">
           <textarea v-model="pasteAddress" name="aitext" :placeholder="aitextOptions['placeholder']"></textarea>
         </div>
         <div class="submit">
           <button type="" @click.stop="handelPasteAddress">提交</button>
         </div>
       </div>
       <div class="addaddress-container-add">
         <p class="addaddress-container-add--btn" @click.stop="saveAddress">保存</p>
       </div>
    </div>
  </div>
</template>
<script>
import { XInput, XSwitch, XTextarea, XAddress, ChinaAddressV4Data, Radio, Value2nameFilter as value2name } from 'vux'
import { mapActions } from 'vuex'
/* eslint-disable no-unused-vars */
import { DICT_ARR } from '@/util/location'

export default {
  name: 'addaddress',
  components: {
    XInput,
    XSwitch,
    XAddress,
    Radio,
    XTextarea
  },
  created () {
    const query = this.$route.query
    this.pagetype = query.pagetype || 'add'
    if (this.pagetype === 'edit') {
      this.id = query.id
      this.name = query.name
      this.mobile = query.mobile
      this.tel = query.tel
      this.address = query.address
      this.location = [query.province, query.city, query.district]
      if (query.checked === 1) {
        this.value = true
      }
    }
  },
  mounted () {
    let title = '添加地址'
    if (this.pagetype !== 'add') {
      title = '编辑地址'
    }
    window.document.title = title
  },
  data () {
    return {
      pagetype: 'add',
      addressData: ChinaAddressV4Data,
      name: '',
      mobile: '',
      tel: '',
      postcode: '',
      location: [],
      address: '',
      value: false,
      pasteAddress: '',
      afterPaste: false
    }
  },
  computed: {
    aitextOptions () {
      return {
        placeholder: '粘贴整段地址，自动识别姓名、电话和地址 例：妙寄小哥，13700000000，上海市长宁区某某街道某某大厦001号'
      }
    }
  },
  methods: {
    ...mapActions([
      'addAddress',
      'eidtAddress'
    ]),
    checkMobile (num) {
      const reg = /^1[1|3|4|5|7|8|9][0-9]\d{8}$/
      return reg.test(num)
    },
    checkTel (tel) {
      const telReg = /^0\d{2,3}-?\d{7,8}$/
      return telReg.test(tel)
    },
    edit () {
      const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
      this.$vux.confirm.show({
        title: '确定修改地址吗?',
        onCancel () {
        },
        async onConfirm () {
          const rel = value2name(_this.location, ChinaAddressV4Data).split(' ')
          const checked = _this.value ? 1 : 2
          let {addressType} = _this.$route.query
          if (!_this.name || !_this.address || !_this.location) {
            _this.$vux.toast.show({
              text: '请将信息填写完整',
              width: '20rem',
              type: 'warn'
            })
            return
          }
          if (!_this.tel && !_this.mobile) {
            _this.$vux.toast.show({
              text: '手机号，座机号不能同时为空',
              type: 'warn',
              width: '24rem'
            })
            return
          }
          if (_this.mobile) {
            if (!_this.checkMobile(_this.mobile)) {
              _this.$vux.toast.show({
                text: '手机号格式不对，请重新填写',
                type: 'warn',
                width: '30rem'
              })
              return
            }
          }
          if (_this.tel) {
            if (!_this.checkTel(_this.tel)) {
              _this.$vux.toast.show({
                text: '座机格式不对，请重新填写',
                type: 'warn',
                width: '30rem'
              })
              return
            }
          }
          _this.eidtAddress({id: _this.id, address: _this.address, province: rel[0], city: rel[1], district: rel[2], mobile: _this.mobile, tel: _this.tel, name: _this.name, checked, addressType})
          _this.$router.go(-1)
        }
      })
    },
    async add () {
      const rel = value2name(this.location, ChinaAddressV4Data).split(' ')
      const checked = this.value ? 1 : 2
      let {type} = this.$route.query
      type = type === 'pickup' ? 2 : 1
      if (!this.name || !this.address || !this.location) {
        this.$vux.toast.show({
          text: '请将信息填写完整',
          type: 'warn',
          width: '20rem'
        })
        return
      }
      if (!this.tel && !this.mobile) {
        this.$vux.toast.show({
          text: '手机号，座机号不能同时为空',
          type: 'warn',
          width: '24rem'
        })
        return
      }
      if (this.mobile) {
        if (!this.checkMobile(this.mobile)) {
          this.$vux.toast.show({
            text: '手机号格式不对，请重新填写',
            type: 'warn',
            width: '30rem'
          })
          return
        }
      }
      if (this.tel) {
        if (!this.checkTel(this.tel)) {
          this.$vux.toast.show({
            text: '座机格式不对，请重新填写',
            type: 'warn',
            width: '30rem'
          })
          return
        }
      }
      const res = await this.addAddress({address: this.address, province: rel[0], city: rel[1], district: rel[2], mobile: this.mobile, tel: this.tel, name: this.name, checked, addressType: type})
      if (res.type !== 'success') {
        return this.$vux.toast.show(res)
      }
      this.$router.go(-1)
    },
    async saveAddress () {
      if (this.pagetype === 'add') {
        this.add()
      } else {
        this.edit()
      }
    },
    fixBtn () {
      const Btn = window.document.getElementsByClassName('addaddress-container-add')[0]
      const classname = Btn.className
      setTimeout(function () {
        Btn.className = classname.replace(/fixed-fill/g, '')
        Btn.className += ' fixed-fill'
      }, 500)
    },
    removeFixBtn () {
      const Btn = window.document.getElementsByClassName('addaddress-container-add')[0]
      const classname = Btn.className
      setTimeout(function () {
        Btn.className = classname.replace(/fixed-fill/g, '')
      }, 500)
    },
    /**
     * 1. 使用 string.match(/1[1|3|4|5|7|8|9][0-9]\d{8}$/g) 解析出 手机号码
     * 2. 从文本中剔除手机号，然后解析出省市区
     * 3. 解析出详细地址
     * 4. 从剩余的文本中选出名字
     * 如果有省一级，则从省 自上而下查询，如果只有区一级，则从区自下而上查询
     */
    handelAddressText (text) {
      // text = '妙寄小哥，13700000  000,上海长宁绥宁路980号'
      if (!text) {
        this.$vux.toast.show({
          text: '请先输入地址!',
          width: '20rem',
          type: 'warn'
        })
        return
      }
      this.$vux.loading.show()
      const _this = this
      setTimeout(function () {
        _this.$vux.loading.hide()
        _this.afterPaste = true
      }, 1200)
      text = text.replace(/[\s|，|~|`|!|@|#|$|%|^|&|*|(|)|-|;|:|"|'|,|<|.|>|?|省|市|区|县]/g, '')
      // get mobile
      let mobile = ''
      const mobileReg = /1[1|3|4|5|7|8|9][0-9]\d{8}/g
      mobile = text.match(mobileReg)
      mobile = mobile ? mobile[0] : ''

      // get locaion 省 市 区/县
      let location = []
      let locationResult = []
      text = text.replace(mobile, '')
      for (let i in DICT_ARR) {
        const item = DICT_ARR[i]
        let count = 0
        for (let j = 0; j < item.length; j++) {
          const iitem = item[j]
          const itemR = iitem.replace(/['省'|'市'|'区'|'县'|\s|,]/g, '')
          if (text.includes(itemR)) {
            count++
          } else {
            continue
          }
        }
        if (count > 0) {
          locationResult.push({
            count,
            value: item
          })
        }
      }
      locationResult = locationResult.sort(function (a, b) {
        return b.count - a.count
      })
      location = locationResult[0]['value']
      // get address 详细地址
      let address = ''
      let preIndex = 0
      let nextIndex = 0
      let indexlist = []
      for (let ii = 0; ii < location.length; ii++) {
        let item = location[ii]
        item = item.replace(/[省|市|区|县]/g, '')
        const reg = new RegExp(item, '')
        const index = text.match(reg)
        if (index) {
          indexlist.push({
            preIndex: index['index'],
            nextIndex: (index['index'] + item.length - 1)
          })
        }
      }
      indexlist = indexlist.sort(function (a, b) {
        return a.preIndex - b.preIndex
      })
      preIndex = indexlist[0]['preIndex']
      nextIndex = indexlist.pop()['preIndex']
      const addressPart1 = text.substring(0, preIndex)
      const addressPart2 = text.substring(nextIndex, text.length)
      let addressIndex = addressPart2.match(/[号|幢|栋|室|房]/)
      if (addressIndex) {
        addressIndex = addressIndex['index'] + 1
      }
      address = addressPart2.substring(0, addressIndex)

      // get name
      let name = ''
      if (addressPart2.length > addressIndex) {
        name = addressPart2.substring(addressIndex, addressPart2.length)
      } else {
        name = addressPart1
      }
      return {
        mobile,
        location,
        name,
        address
      }
    },
    handelPasteAddress () {
      try {
        let text = this.pasteAddress
        const {name, mobile, location, address} = this.handelAddressText(text)
        const locationCity = location[1]
        let locationR = []
        if ((locationCity === '北京市') || (locationCity === '上海市') || (locationCity === '天津市') || (locationCity === '重庆市')) {
          locationR[0] = location[0] + '市'
          locationR[1] = '市辖区'
          locationR[2] = location[2]
        } else {
          locationR = location
        }
        this.name = name
        this.mobile = mobile
        this.location = locationR
        this.address = address
      } catch (err) {
        console.error(err)
      }
    }
  },
  watch: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/styles/colors.less';
.addaddress {
  min-height: 100vh;
  background-color: @bg-grey;
  .checkaddress {
    padding: .4rem 0;
    font-size: 1.4rem;
    color: @dark-yellow;
    background: #d9d9d9;
  }
  &-container {
    padding-bottom: 4rem;
    &-add {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      p {
        font-size: 1.6rem;
        padding: .8rem 0;
        width: 100%;
        color: white;
        background: @dark-yellow;
        border-radius: 0;
      }
    }
    .g-radio {
      padding: 1rem;
      padding-right: 0;
      &:before {
        content: " ";
        margin-bottom: .7rem;
        display: block;
        width: 100%;
        height: 1px;
        border-top: 1px solid #D9D9D9;
        color: #D9D9D9;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
    }
    .ai-text {
      margin-top: 1rem;
      padding: 1rem 15px 1rem 18px;
      padding-bottom: 2.6rem;
      background: white;
      .title {
        text-align: left;
        font-size: 1.5rem;
        padding: 1rem 0;
      }
      .text {
        textarea {
          width: 90%;
          height: 100px;
          padding: 10px 10px;
        }
      }
      .submit {
        padding-right: .5rem;
        text-align: right;
        button {
          padding: .2rem 1.2rem;
          color: @dark-yellow;
          border: 1px solid @dark-yellow;
          background: transparent;
          border-radius: 3px;
        }
      }
    }
  }
}

</style>
