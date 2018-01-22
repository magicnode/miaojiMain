<template>
  <div class="addaddress">
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
           <button type="" @click.stop="handelPasteAddressAlp">提交</button>
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
import { DICT, DICT_FIXED } from '@/util/location'

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
      pasteAddress: ''
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
    handelPasteAddressAlp () {
      // this.$vux.loading.show()
      let pasteAddress = this.pasteAddress
      pasteAddress = '妙寄小哥，13700000  000,徐州睢宁某某街道某某大厦001号写写'
      if (!pasteAddress) {
        this.$vux.toast.show({
          text: '请先输入地址!',
          width: '20rem',
          type: 'warn'
        })
        return
      }
      pasteAddress = pasteAddress.replace(/[\s|，|~|`|!|@|#|$|%|^|&|*|(|)|-|;|:|"|'|,|<|.|>|?]/g, '')
      console.log('pasteAddress', pasteAddress)
      const mobileReg = /1[1|3|4|5|7|8|9][0-9]\d{8}/g
      let mobile = pasteAddress.match(mobileReg)
      console.log('mobile', mobile)
      mobile = mobile ? mobile[0] : ''
      console.log('mobile', mobile)
      this.mobile = mobile
      pasteAddress = pasteAddress.replace(mobile, '')
      console.log('pasteAddress', pasteAddress)
      for (let i in DICT) {
        // const item = /${DICT[i]}/g
        let item = DICT[i]
        const itemR = item.replace(/['省'|'市'|'区'|'县']/g, '')
        // item = new RegExp(item, 'g')
        if (pasteAddress.includes(itemR)) {
          console.log('item', item)
        }
      }
      // console.log('DICT_FIXED', DICT_FIXED)
    },
    handelPasteAddress () {
      let pasteAddress = this.pasteAddress
      if (!pasteAddress) {
        return
      }
      // pasteAddress = '妙寄小哥，1370000000,上海市长宁区某某街道某某大厦001号'
      const {name, mobile, address, province, city, district} = this.handelAddressText(pasteAddress)
      this.name = name
      this.mobile = mobile
      this.address = address
      this.location = [province, city, district]
      this.$vux.toast.show({
        text: '解析成功!',
        width: '18rem',
        type: 'success'
      })
    },
    handelAddressText (text) {
      if (!text) {
        return null
      }
      text = text.replace(/，/g, ',').split(/,/)
      const name = text[0]
      const mobile = text[1]
      let location = text[2]
      location = location.split('区')
      const address = location[1]
      location = location[0] // '广东省深圳市龙口'
      let province = ''
      let city = ''
      let district = ''
      if (location.match(/省/)) {
        location = location.split('省')
        province = location[0] + '省'
        location = location[1]
        location = location.split('市')
        city = location[0] + '市'
        district = location[1] + '区'
      } else {
        location = location.split('市')
        province = location[0] + '市'
        location = location[1]
        city = '市辖区'
        district = location + '区'
      }
      return {
        name,
        mobile,
        province,
        city,
        district,
        address
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
  &-container {
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
