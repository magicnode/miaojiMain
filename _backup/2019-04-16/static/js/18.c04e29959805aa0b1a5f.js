webpackJsonp([18],{502:function(e,a,t){t(703);var i=t(1)(t(663),t(742),"data-v-36a95ae9",null);e.exports=i.exports},663:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=t(8),d=t.n(i),r=t(7),n=t.n(r),o=t(23),s=t.n(o),l=t(24),c=t(9);a.default={name:"senddetail",created:function(){var e=this.$route.query.type,a=t.i(c.a)({type:"get",key:"senddetail_switch_type"});this.show=e||a||"wait"},mounted:function(){window.document.title="寄件列表"},computed:s()({},t.i(l.b)({data:"getSend",switchtype:"getSendSwitch"})),data:function(){return{show:"wait",showList:[{type:"all",cnName:"全部"},{type:"wait",cnName:"待寄件"},{type:"ready",cnName:"待收货"},{type:"cancle",cnName:"已完成"}],typeShowList:{all:[],wait:[1,8],ready:[2,3],cancle:[4]}}},methods:s()({},t.i(l.c)(["setSend","cancleSend"]),{changeShow:function(e){t.i(c.a)({type:"set",key:"senddetail_switch_type",val:e.type}),this.show=e.type},handleIsShow:function(e){var a=this.typeShowList[this.show];return 5!==e&&(0===a.length||-1!==a.indexOf(Number(e)))},showToast:function(e){this.$vux.toast.show({text:e.text||"出错啦",type:e.type||"warn",width:"20rem"})},goPath:function(e,a){this.$router.push({path:"qr",query:e})},cancle:function(e){var a=this;return n()(d.a.mark(function t(){var i;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:i=a,a.$vux.confirm.show({title:"确定取消这一订单吗?",onCancel:function(){},onConfirm:function(){var a=this;return n()(d.a.mark(function t(){var r;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a.$vux.loading.show({text:"正在取消"}),t.next=3,i.cancleSend({brand:e.brand,describe:e.describe,note:e.note,office:e.officeId,order:e.order,receiptAddressId:e.receiptAddressId,sendAddressId:e.sendAddressId,sum:e.sum,type:5});case 3:r=t.sent,i.$vux.loading.hide(),i.showToast(r);case 6:case"end":return t.stop()}},t,a)}))()}});case 2:case"end":return t.stop()}},t,a)}))()},showOffice:function(e){var a=e.province,t=void 0===a?"":a,i=e.city,d=void 0===i?"":i,r=e.district,n=void 0===r?"":r,o=e.descript,s=void 0===o?"":o,l=t+d+n+s;this.showToast({text:l,type:"text"})},refresh:function(e){var a=this;setTimeout(n()(d.a.mark(function t(){var i;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.setSend();case 2:i=t.sent,"success"!==i.type&&a.showToast(i),e(!0);case 5:case"end":return t.stop()}},t,this)})),1200)},infinite:function(e){var a=this;setTimeout(n()(d.a.mark(function t(){var i;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.setSend();case 2:i=t.sent,"success"!==i.type&&a.showToast(i),e(!0);case 5:case"end":return t.stop()}},t,this)})),1500)}}),watch:{}}},680:function(e,a,t){a=e.exports=t(185)(),a.push([e.i,'.article[data-v-36a95ae9]{background-color:#fff;padding:2rem}.article-title[data-v-36a95ae9]{text-align:center;padding:1rem;font-size:2.1rem}.article-content[data-v-36a95ae9]{padding-bottom:1rem;text-align:justify;font-size:1.6rem}.article-content[data-v-36a95ae9]:last-child{padding-bottom:0}.article-content a[data-v-36a95ae9]{color:#2c3e50}.hide[data-v-36a95ae9]{display:none}.show[data-v-36a95ae9]{display:block}.show-important[data-v-36a95ae9]{display:block!important}.clearfixed[data-v-36a95ae9]:after{content:"";display:block;clear:both}.flex[data-v-36a95ae9]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.btg[data-v-36a95ae9]{border-bottom:1px solid #dedede}.btopg[data-v-36a95ae9]{border-top:1px solid #dedede}.officeimg[data-v-36a95ae9]{text-align:center;font-size:0;padding:.4rem .6rem}.officeimg img[data-v-36a95ae9]{width:100%;max-width:305px;height:auto;border:1px solid #dedede;box-sizing:border-box;border-radius:2px}.office-detail[data-v-36a95ae9]{padding:0 .6rem}.office-detail p[data-v-36a95ae9],.vux-tab .vux-tab-item[data-v-36a95ae9]{font-size:1.4rem}.fixed-fill[data-v-36a95ae9]{position:fixed;bottom:0;width:94%}.mj-switch[data-v-36a95ae9]{padding:10px 15px!important}.mj-switch .weui-cell__ft .weui-switch[data-v-36a95ae9]{width:40px!important;height:20px!important}.mj-switch .weui-cell__ft .weui-switch[data-v-36a95ae9]:checked{border-color:#ff6d40;background-color:#ff6d40}.mj-switch .weui-cell__ft .weui-switch[data-v-36a95ae9]:before{width:40px;height:20px}.mj-switch .weui-cell__ft .weui-switch[data-v-36a95ae9]:after{width:20px;height:18px}.express-router__link[data-v-36a95ae9]{position:absolute;top:1.8rem;right:1.8rem;text-align:center;border:1px solid #ff6d40;color:#ff6d40;background:#fff;padding:.2rem .8rem;font-size:1.3rem;border-radius:5px}.addaddress-container .weui-cell[data-v-36a95ae9]{font-size:1.5rem}.addaddress-container .weui-cell__bd.weui-cell__primary input[data-v-36a95ae9],.addaddress-container .weui-cell__bd textarea[data-v-36a95ae9]{text-align:right}.addaddress .quyu[data-v-36a95ae9]{font-size:1.5rem}.addaddress .quyu .vux-cell-box[data-v-36a95ae9]:before{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d9d9d9;color:#d9d9d9;transform-origin:0 0;transform:scaleY(.5);left:15px}.addaddress .quyu .weui-label[data-v-36a95ae9]{text-align:left;padding-left:.6rem}.addaddress .quyu .vux-popup-picker-select[data-v-36a95ae9]{color:#666}.addaddress .quyu .vux-popup-picker-select span[data-v-36a95ae9]{font-size:1.5rem}.contenthide[data-v-36a95ae9]{transform:scale(0);height:0}.navigation-btn[data-v-36a95ae9]{width:4.6rem;font-size:1.4rem;text-align:center;padding:.2rem .4rem;border-radius:5px;box-sizing:border-box;white-space:nowrap;color:#fff;border:none;background:#ff6d40}.map #panel[data-v-36a95ae9]{top:15px;z-index:999;position:absolute;background-color:#fff;max-height:100%;overflow-y:auto;right:14px;width:282px}.map .amap-marker img[data-v-36a95ae9]{max-width:19px;max-height:33px}.map .amap-ui-smp-ifwn-container[data-v-36a95ae9]{font-size:1.4rem}.map .amap-ui-smp-ifwn-def-tr-close[data-v-36a95ae9]{font-size:2.2rem}.map .h2rem[data-v-36a95ae9]{height:2rem;overflow:hidden}.map .hauto[data-v-36a95ae9]{height:auto}.office-detail[data-v-36a95ae9]{padding-top:.2rem}.office-detail__more[data-v-36a95ae9]{float:right}.office-detail__content[data-v-36a95ae9]{transition:all .2s ease;padding-top:1rem}.office-detail .upside[data-v-36a95ae9]{transform:rotate(180deg)}.office-detail .first-line span.more[data-v-36a95ae9]{float:right;width:0;height:0;border-width:1.7rem .8rem 0;border-style:solid;border-color:#ff6d40 transparent transparent;margin:.2rem .1rem;position:relative;transition:transform .6s}.normal-btn[data-v-36a95ae9]{width:5.6rem;padding:.2rem}div.confirm-btn-cont[data-v-36a95ae9]{text-align:right;padding-top:10px}.confirm-btn[data-v-36a95ae9],div.confirm-btn-cont button[data-v-36a95ae9]{width:5.6rem;padding:.2rem;width:6.6rem;font-size:1.4rem;text-align:center;padding:.5rem .4rem;border-radius:5px;box-sizing:border-box;white-space:nowrap;color:#fff;border:none;background:#ff6d40}.confirm-btn[data-v-36a95ae9]{float:right}.pull-brand span.more[data-v-36a95ae9]{float:right;width:0;height:0;border-width:1.3rem .6rem 0;border-style:solid;border-color:#ff6d40 transparent transparent;margin:.2rem .1rem;position:relative;transition:transform .6s}.scroll-container[data-v-36a95ae9]{padding:0 1rem}.office-info[data-v-36a95ae9]{font-size:1.5rem;width:15rem;display:inline-block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;vertical-align:bottom}.border-bottom-grey[data-v-36a95ae9]{border-bottom:1px solid #dedede}.send-icon[data-v-36a95ae9]{border-radius:50%;background:#beb9b9;color:#fff;margin-right:1rem;width:3rem;height:3rem;font-size:1.3rem;line-height:3rem;text-align:center}.sum-money[data-v-36a95ae9]{font-size:1.4rem;color:#ff6d40}.normal-btn[data-v-36a95ae9]{width:6.6rem;padding:.5rem .4rem;border-radius:5px}.cancle-btn[data-v-36a95ae9],.normal-btn[data-v-36a95ae9]{font-size:1.4rem;text-align:center;box-sizing:border-box;white-space:nowrap}.cancle-btn[data-v-36a95ae9]{border-radius:5px;color:#999;margin-right:.3rem;border:1px solid #999;background:transparent}.cancle-btn[data-v-36a95ae9],.gosend-btn[data-v-36a95ae9]{width:5.6rem;padding:.2rem;width:6.6rem;padding:.5rem .4rem}.gosend-btn[data-v-36a95ae9]{font-size:1.4rem;text-align:center;border-radius:5px;box-sizing:border-box;white-space:nowrap;color:#fff;border:none;background:#ff6d40;border:1px solid #ff6d40}.senddetail-container-tab[data-v-36a95ae9]{position:fixed;width:100%;z-index:1000}.senddetail-cell-status[data-v-36a95ae9]{font-size:1.6rem;text-align:left;padding:1rem;padding-bottom:0}.senddetail-cell-detail[data-v-36a95ae9]{background:#fff;text-align:justify;padding:0 15px;margin:1rem 0}.senddetail-cell-detail--box[data-v-36a95ae9]{padding:.5rem 0}.senddetail-cell-detail__title[data-v-36a95ae9]{font-size:1.6rem}.senddetail-cell-detail__title img[data-v-36a95ae9]{width:auto;height:2rem;vertical-align:top}.senddetail-cell-detail p[data-v-36a95ae9]{font-size:1.4rem;padding:.2rem 0}.senddetail-cell-detail .middle-box[data-v-36a95ae9]{color:#999}.senddetail-cell-detail .wait-senddetail[data-v-36a95ae9]{float:right;color:#ff6d40;padding-top:.3rem}.senddetail-cell-detail .already-senddetail[data-v-36a95ae9]{float:right;color:#999;padding-top:.3rem}.senddetail-cell-detail .time[data-v-36a95ae9]{font-size:1.2rem;color:#333}.senddetail-scroller[data-v-36a95ae9]{padding-top:44px}',""])},703:function(e,a,t){var i=t(680);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);t(487)("3cd2b4c5",i,!0)},742:function(e,a){e.exports={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"senddetail"},[t("div",{staticClass:"senddetail-container"},[t("div",{staticClass:"senddetail-container-tab"},[t("tab",{attrs:{"active-color":"#ff750f"}},e._l(e.showList,function(a){return t("tab-item",{key:a.type,attrs:{selected:e.show===a.type},on:{"on-item-click":function(t){e.changeShow(a)}}},[e._v("\n          "+e._s(a.cnName)+"\n        ")])}))],1),e._v(" "),t("div",{staticClass:"senddetail-cell"},[t("scroller",{ref:"my_scroller_senddetail",staticClass:"senddetail-scroller",attrs:{"on-refresh":e.refresh,"on-infinite":e.infinite}},[t("mj-spinner",{attrs:{slot:"refresh-spinner",type:"line"},slot:"refresh-spinner"}),e._v(" "),e._l(e.data.list,function(a){return t("div",{directives:[{name:"show",rawName:"v-show",value:e.handleIsShow(a.type),expression:"handleIsShow(item.type)"}],key:a.id,staticClass:"senddetail-cell-detail"},[t("mj-senditem",{attrs:{item:a}})],1)}),e._v(" "),t("mj-spinner",{attrs:{slot:"infinite-spinner",type:"circle"},slot:"infinite-spinner"})],2)],1)])])},staticRenderFns:[]}}});