<template>
  <div class="addaddress">
    <div class="checkaddress" v-show="afterPaste">
      请检查解析地址是否准确，如有遗漏请及时补充
    </div>
    <div class="addaddress-container">
      <group>
      </group>   
    </div>
  </div>
</template>
<script>
import { Flexbox, FlexboxItem, XInput, XSwitch, XTextarea, XAddress, ChinaAddressV4Data, Radio } from 'vux'
/* eslint-disable no-unused-vars */
import { getocrAccurate } from '@/services/baiduAI'
import { DICT_ARR } from '@/util/location'
import * as wxUtil from '@/util/wx'

export default {
  name: 'addaddress',
  components: {
    Flexbox,
    FlexboxItem,
    XInput,
    XSwitch,
    XAddress,
    Radio,
    XTextarea
  },
  created () {
  },
  async mounted () {
    window.document.title = '编辑图片'
  },
  data () {
    return {
      pagetype: 'add',
      addressData: ChinaAddressV4Data,
      name: '',
      telitem1: '',
      telitem2: '',
      mobile: '',
      postcode: '',
      location: [],
      address: '',
      value: false,
      pasteAddress: '',
      afterPaste: false,
      imageVal: ''
    }
  },
  computed: {
  },
  methods: {
    async saveAddress () {
      if (this.pagetype === 'add') {
        this.add()
      } else {
        this.edit()
      }
    },
    // 获取本地图片数据
    async handelPicPaste (event) {
    }
  },
  watch: {
  }
}
</script>
<!-- Add "scoped" attibute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../assets/styles/colors.less';
.addaddress {
  min-height: 100vh;
  background-color: @bg-grey;

  &-container {
    padding-bottom: 4rem;

  }
}

</style>
