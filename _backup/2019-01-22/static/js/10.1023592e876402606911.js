webpackJsonp([10],{470:function(t,e,r){r(655);var a=r(0)(r(625),r(697),"data-v-121148dc",null);t.exports=a.exports},506:function(t,e,r){"use strict";r.d(e,"a",function(){return s}),r.d(e,"b",function(){return p}),r.d(e,"c",function(){return u});var a=r(6),n=r.n(a),i=r(5),o=r.n(i),d=r(38),c=r(8),s=function(){var t=o()(n.a.mark(function t(e){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",r.i(d.a)({url:c.g.jssdkInit,method:"get",data:e}));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),p=function(){var t=o()(n.a.mark(function t(e){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",r.i(d.a)({url:c.g.wxpayInit,method:"parampost",paramkey:"param",data:e}));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),u=function(){var t=o()(n.a.mark(function t(e){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",r.i(d.a)({url:c.g.shoppayInit,method:"parampost",paramkey:"param",data:e}));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},507:function(t,e,r){"use strict";r.d(e,"a",function(){return l}),r.d(e,"c",function(){return m}),r.d(e,"b",function(){return h});var a=r(56),n=r.n(a),i=r(6),o=r.n(i),d=r(5),c=r.n(d),s=r(177),p=r.n(s),u=r(506),f=r(94),l=(r.n(f),function(t){var e=this;return new p.a(function(){var a=c()(o.a.mark(function a(n,i){var d,c;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.i(u.a)({url:t||f.pro.jssdk.initUrl});case 2:if(d=e.sent,d.success||200===d.code){e.next=5;break}return e.abrupt("return",i({text:"获取微信jssdk配置失败",type:"warn",width:"18rem"}));case 5:return c=JSON.parse(d.obj),console.log("jssdk",c),window.wx.config({debug:!1,appId:f.pro.appid,timestamp:c.timestamp,nonceStr:c.nonceStr,signature:c.signature,jsApiList:["chooseImage","chooseWXPay","onMenuShareTimeline"]}),e.abrupt("return",n({text:"微信jssdk初始化成功",type:"success",width:"18rem"}));case 9:case"end":return e.stop()}},a,e)}));return function(t,e){return a.apply(this,arguments)}}())}),m=function(t){var e=this;return new p.a(function(){var a=c()(o.a.mark(function a(i,d){var s,p;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.appid=f.pro.appid,t.mch_id=f.pro.mch_id,t=n()(t),e.next=5,r.i(u.b)(t);case 5:if(s=e.sent,s.success){e.next=8;break}return e.abrupt("return",d({text:"提交失败",type:"warn",width:"16rem"}));case 8:p=s.obj,console.log("wxpayCon",p),window.wx.ready(function(){window.wx.chooseWXPay({timestamp:p.timeStamp,nonceStr:p.nonceStr,package:p.package,signType:"MD5",paySign:p.paySign,success:function(){function t(t){return e.apply(this,arguments)}var e=c()(o.a.mark(function t(e){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:i({text:"支付成功",type:"success",width:"16rem"});case 1:case"end":return t.stop()}},t,this)}));return t}(),cancel:function(){d({text:"支付失败, 已取消",type:"warn",width:"20rem"})},fail:function(t){console.error("errMsg",t),alert(n()(t)),d({text:"支付失败",type:"warn",width:"16rem"})}})});case 11:case"end":return e.stop()}},a,e)}));return function(t,e){return a.apply(this,arguments)}}())},h=function(t){var e=this;return new p.a(function(){var a=c()(o.a.mark(function a(i,d){var s,p;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.appid=f.pro.appid,t.mch_id=f.pro.mch_id,t.body="商城订单",t=n()(t),e.next=6,r.i(u.c)(t);case 6:if(s=e.sent,s.success){e.next=9;break}return e.abrupt("return",d({text:"提交失败",type:"warn",width:"16rem"}));case 9:p=s.obj,console.log("wxpayCon",p),window.wx.ready(function(){window.wx.chooseWXPay({timestamp:p.timeStamp,nonceStr:p.nonceStr,package:p.package,signType:"MD5",paySign:p.paySign,success:function(){function t(t){return e.apply(this,arguments)}var e=c()(o.a.mark(function t(e){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:i({text:"支付成功",type:"success",width:"16rem"});case 1:case"end":return t.stop()}},t,this)}));return t}(),cancel:function(){d({text:"支付失败, 已取消",type:"warn",width:"20rem"})},fail:function(t){console.error("errMsg",t),alert(n()(t)),d({text:"支付失败",type:"warn",width:"16rem"})}})});case 12:case"end":return e.stop()}},a,e)}));return function(t,e){return a.apply(this,arguments)}}())}},625:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(6),n=r.n(a),i=r(5),o=r.n(i),d=r(507);e.default={name:"shoppay",created:function(){var t=this;return o()(n.a.mark(function e(){var r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r=t.$route.query,t.payOptions=r;case 2:case"end":return e.stop()}},e,t)}))()},mounted:function(){function t(){return e.apply(this,arguments)}var e=o()(n.a.mark(function t(){var e;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return window.document.title="商城支付",t.next=3,d.a();case 3:e=this,window.wx.ready(function(){console.log("微信jssdk初始化成功"),e.wxPay()}),window.wx.error(function(t){console.log("res",t)});case 6:case"end":return t.stop()}},t,this)}));return t}(),computed:{},data:function(){return{payOptions:{}}},methods:{wxPay:function(){var t=this;return o()(n.a.mark(function e(){var r,a,i,o;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.payOptions,e.prev=1,e.next=4,d.b(r);case 4:a=e.sent,t.$vux.toast.show(a),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),console.error(e.t0),t.$vux.toast.show(e.t0);case 12:return e.prev=12,i=r.sp_order_id,o="http://shop.mijihome.cn/index.php/Mobile/User/order_detail/id/"+i+".html",console.log("url",o),setTimeout(function(){window.location.href=o},900),e.finish(12);case 18:case"end":return e.stop()}},e,t,[[1,8,12,18]])}))()}}}},633:function(t,e,r){e=t.exports=r(175)(),e.push([t.i,'.article[data-v-121148dc]{background-color:#fff;padding:2rem}.article-title[data-v-121148dc]{text-align:center;padding:1rem;font-size:2.1rem}.article-content[data-v-121148dc]{padding-bottom:1rem;text-align:justify;font-size:1.6rem}.article-content[data-v-121148dc]:last-child{padding-bottom:0}.article-content a[data-v-121148dc]{color:#2c3e50}.hide[data-v-121148dc]{display:none}.show[data-v-121148dc]{display:block}.show-important[data-v-121148dc]{display:block!important}.clearfixed[data-v-121148dc]:after{content:"";display:block;clear:both}.flex[data-v-121148dc]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.btg[data-v-121148dc]{border-bottom:1px solid #dedede}.btopg[data-v-121148dc]{border-top:1px solid #dedede}.officeimg[data-v-121148dc]{text-align:center;font-size:0;padding:.4rem .6rem}.officeimg img[data-v-121148dc]{width:100%;max-width:305px;height:auto;border:1px solid #dedede;box-sizing:border-box;border-radius:2px}.office-detail[data-v-121148dc]{padding:0 .6rem}.office-detail p[data-v-121148dc],.vux-tab .vux-tab-item[data-v-121148dc]{font-size:1.4rem}.fixed-fill[data-v-121148dc]{position:fixed;bottom:0;width:94%}.mj-switch[data-v-121148dc]{padding:10px 15px!important}.mj-switch .weui-cell__ft .weui-switch[data-v-121148dc]{width:40px!important;height:20px!important}.mj-switch .weui-cell__ft .weui-switch[data-v-121148dc]:checked{border-color:#ff6d40;background-color:#ff6d40}.mj-switch .weui-cell__ft .weui-switch[data-v-121148dc]:before{width:40px;height:20px}.mj-switch .weui-cell__ft .weui-switch[data-v-121148dc]:after{width:20px;height:18px}.express-router__link[data-v-121148dc]{position:absolute;top:1.8rem;right:1.8rem;text-align:center;border:1px solid #ff6d40;color:#ff6d40;background:#fff;padding:.2rem .8rem;font-size:1.3rem;border-radius:5px}.addaddress-container .weui-cell[data-v-121148dc]{font-size:1.5rem}.addaddress-container .weui-cell__bd.weui-cell__primary input[data-v-121148dc],.addaddress-container .weui-cell__bd textarea[data-v-121148dc]{text-align:right}.addaddress .quyu[data-v-121148dc]{font-size:1.5rem}.addaddress .quyu .vux-cell-box[data-v-121148dc]:before{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d9d9d9;color:#d9d9d9;transform-origin:0 0;transform:scaleY(.5);left:15px}.addaddress .quyu .weui-label[data-v-121148dc]{text-align:left;padding-left:.6rem}.addaddress .quyu .vux-popup-picker-select[data-v-121148dc]{color:#666}.addaddress .quyu .vux-popup-picker-select span[data-v-121148dc]{font-size:1.5rem}.contenthide[data-v-121148dc]{transform:scale(0);height:0}.navigation-btn[data-v-121148dc]{width:4.6rem;font-size:1.4rem;text-align:center;padding:.2rem .4rem;border-radius:5px;box-sizing:border-box;white-space:nowrap;color:#fff;border:none;background:#ff6d40}.map #panel[data-v-121148dc]{top:15px;z-index:999;position:absolute;background-color:#fff;max-height:100%;overflow-y:auto;right:14px;width:282px}.map .amap-marker img[data-v-121148dc]{max-width:19px;max-height:33px}.map .amap-ui-smp-ifwn-container[data-v-121148dc]{font-size:1.4rem}.map .amap-ui-smp-ifwn-def-tr-close[data-v-121148dc]{font-size:2.2rem}.map .h2rem[data-v-121148dc]{height:2rem;overflow:hidden}.map .hauto[data-v-121148dc]{height:auto}.office-detail[data-v-121148dc]{padding-top:.2rem}.office-detail__more[data-v-121148dc]{float:right}.office-detail__content[data-v-121148dc]{transition:all .2s ease;padding-top:1rem}.office-detail .upside[data-v-121148dc]{transform:rotate(180deg)}.office-detail .first-line span.more[data-v-121148dc]{float:right;width:0;height:0;border-width:1.7rem .8rem 0;border-style:solid;border-color:#ff6d40 transparent transparent;margin:.2rem .1rem;position:relative;transition:transform .6s}.normal-btn[data-v-121148dc]{width:5.6rem;font-size:1.4rem;text-align:center;padding:.2rem;border-radius:5px;box-sizing:border-box;white-space:nowrap}div.confirm-btn-cont[data-v-121148dc]{text-align:right;padding-top:10px}.confirm-btn[data-v-121148dc],div.confirm-btn-cont button[data-v-121148dc]{width:5.6rem;font-size:1.4rem;text-align:center;padding:.2rem;border-radius:5px;box-sizing:border-box;white-space:nowrap;color:#fff;border:none;background:#ff6d40}.confirm-btn[data-v-121148dc]{float:right}.pull-brand span.more[data-v-121148dc]{float:right;width:0;height:0;border-width:1.3rem .6rem 0;border-style:solid;border-color:#ff6d40 transparent transparent;margin:.2rem .1rem;position:relative;transition:transform .6s}button.pay[data-v-121148dc]{background:transparent;font-size:1.4rem;padding:1px 5px;border:1px solid #ff6d40;border-radius:3px;color:#ff6d40}.sendqr-img[data-v-121148dc]{border-bottom:1px solid #dedede;background:#fff;padding:1rem;padding-bottom:2.5rem}.sendqr-img--wait img[data-v-121148dc]{width:15rem}.sendqr-img--wait p[data-v-121148dc]{font-size:1.4rem;color:#999}.sendqr-img--sign img[data-v-121148dc]{padding:2.5rem;padding-bottom:.8rem;width:6rem;height:auto}.sendqr-img--sign p[data-v-121148dc]{font-size:1.8rem;color:#ff6d40}.sendqr-img button[data-v-121148dc]{text-align:center;border:none;background:#ff6d40;padding:0 .3rem;color:#fff;border-radius:5px;margin-left:6px}.sendqr-detail[data-v-121148dc]{border-top:1px solid #dedede;margin-top:1.17647059em;box-sizing:border-box}',""])},655:function(t,e,r){var a=r(633);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r(452)("d90c26e6",a,!0)},697:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"sendqr"},[r("div",{staticClass:"container"},[t._v("\n    正在支付...\n  ")])])}]}}});