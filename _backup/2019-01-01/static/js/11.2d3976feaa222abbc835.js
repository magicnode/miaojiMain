webpackJsonp([11],{454:function(e,t,a){a(653);var n=a(0)(a(609),a(695),"data-v-30c3e0ba",null);e.exports=n.exports},581:function(e,t,a){e.exports=a.p+"static/img/officedefault.ef70d8f.jpg"},601:function(e,t,a){"use strict";a.d(t,"a",function(){return c});var n=a(6),i=a.n(n),o=a(5),r=a.n(o),s=a(37),d=a(8),c=function(){var e=r()(i.a.mark(function e(t){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",a.i(s.a)({url:d.h.search,method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},609:function(e,t,a){"use strict";function n(e,t,a){var n="";t.plugin("AMap.Geolocation",function(){var i=new window.AMap.Geolocation({enableHighAccuracy:!0,timeout:1e4,maximumAge:0,noIpLocate:0,convert:!0,showButton:!0,buttonPosition:"LB",buttonOffset:new window.AMap.Pixel(10,20),showMarker:!1,showCircle:!0,panToLocation:!0,zoomToAccuracy:!1,GeoLocationFirst:!0});t.addControl(i),i.getCurrentPosition(),window.AMap.event.addListener(i,"complete",function(t){console.log("data",t),n=t.position,a.clear(),a.search(new window.AMap.LngLat(n.getLng(),n.getLat()),new window.AMap.LngLat(e[0],e[1]))}),window.AMap.event.addListener(i,"error",function(){console.log("定位失败"),alert("定位失败!")})})}function i(e,t){var a=null;return function(){var n=this,i=arguments;clearTimeout(a),a=setTimeout(function(){e.apply(n,i)},t)}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(56),r=a.n(o),s=a(6),d=a.n(s),c=a(5),p=a.n(c),l=a(19),u=a.n(l),f=a(10),m=a.n(f),g=a(97),b=a.n(g),h=a(20),w=a(8),x=a(601),v=a(9),z=a(581),k=a.n(z),A={},y={};t.default={name:"send",components:{},data:function(){return{dragendFunc:"",zoomendFunc:"",snVal:null,showSearch:!1,searchBox:[]}},mounted:function(){window.document.title="选择寄件站点";var e=this;A=new window.AMap.Map("iCenter",{resizeEnable:!0,zoom:14}),y=new window.AMap.Walking({map:A,panel:"panel"}),A.plugin("AMap.Geolocation",function(){var t=new window.AMap.Geolocation({enableHighAccuracy:!0,timeout:1e4,maximumAge:0,noIpLocate:0,convert:!0,showButton:!0,buttonPosition:"LB",buttonOffset:new window.AMap.Pixel(10,20),showMarker:!1,showCircle:!0,panToLocation:!0,zoomToAccuracy:!1,GeoLocationFirst:!0});A.addControl(t),t.getCurrentPosition(),window.AMap.event.addListener(t,"complete",function(t){var a=t.position;new window.AMap.Marker({icon:"http://cms.mingz-tech.com/cdn/marker_19x23.png",title:"我的位置",position:[a.lng,a.lat]}).setMap(A),e.getBounds()}),window.AMap.event.addListener(t,"error",function(){console.log("定位失败")}),window.AMap.event.addListener(A,"dragend",function(){clearTimeout(this.dragendFunc),this.dragendFunc=setTimeout(function(){console.log("start drag"),e.getBounds()},1100)}),window.AMap.event.addListener(A,"zoomend",function(){clearTimeout(this.zoomendFunc),this.zoomendFunc=setTimeout(function(){console.log("start zoomend"),e.getBounds()},1100)})})},created:function(){},computed:u()({},a.i(h.b)({site:"getSite",recent:"getSiteRecent"})),updated:function(){},methods:u()({},a.i(h.c)(["addSite"]),{getSearchBox:function(e){var t=this;return p()(d.a.mark(function n(){var i,o;return d.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(e){n.next=3;break}return t.$vux.toast.show({text:"请输入站点名称!",type:"warn",width:"20rem"}),n.abrupt("return");case 3:return t.$vux.loading.show({text:"  "}),n.next=6,a.i(x.a)({name:e,pagination:1,rownum:6,superId:-1});case 6:i=n.sent,t.$vux.loading.hide(),200===i.code&&(o=i.obj,t.searchBox=o,t.showSearch=!0);case 9:case"end":return n.stop()}},n,t)}))()},clearSearchBox:function(){this.searchBox=[],this.showSearch=!1},btnSearch:function(){i(this.getSearchBox(this.snVal),1500)},locateSite:function(e){var t=e.latitude,a=e.longitude;if(!t||!a)return this.$vux.toast.show({text:"此站点坐标缺失，无法定位!",type:"warn",width:"20rem"});this.$vux.loading.show({text:"正在定位..."}),this.snVal=null;var n=[a,t];A.setZoomAndCenter(14,n),this.getBounds(n),this.$vux.loading.hide()},getBounds:function(e){var t=this;return p()(d.a.mark(function a(){var n,i,o,r,s,c,l,u,f,g,h,x;return d.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log("开始获取站点"),n=t,i=A.getBounds(),o=i.getSouthWest(),r=[],r[0]=o.lng,r[1]=o.lat,s=i.getNorthEast(),c=[],c[0]=s.lng,c[1]=s.lat,l=new URLSearchParams,l.append("southwest","["+r+"]"),l.append("northeast","["+c+"]"),a.next=16,m()({url:w.h.location,method:"post",data:l,timeout:2e4,headers:{"content-Type":"application/x-www-form-urlencoded"}});case 16:for(u=a.sent,f=u.data,g=function(a,i){var o=f[a],r=[o.longitude,o.latitude],s=new window.AMap.Marker({position:r,draggable:!1});s.setExtData({info:f[a]}),s.setMap(A);var c=o.userId;if(window.AMap.event.addListenerOnce(s,"click",function(){var e=p()(d.a.mark(function e(t){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n.getInfoWindow(c,s,r);case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()),e){0===b.a.difference(e,r).length&&t.getInfoWindow(c,s,r)}},h=0,x=f.length;h<x;h++)g(h,x);case 20:case"end":return a.stop()}},a,t)}))()},getInfoWindow:function(e,t,i){var o=this;return p()(d.a.mark(function s(){var c,p,l,u,f,g,b,h,x,z;return d.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return c=t.getExtData(),p=c.info,o.next=3,m()({method:"get",url:w.a.index,params:{id:e}});case 3:if(l=o.sent,u="",200!==l.status)u="";else{for(f=l.data,g=[],b=0,h=f.length;b<h;b++)x=f[b],g.push(x.brand);u='<p class="pull-brand">接入品牌: '+g+"</p>"}return z="",window.AMapUI.loadUI(["overlay/SimpleInfoWindow"],function(e){function a(){d.open(A,t.getPosition())}function o(){d.close(A,t.getPosition())}z="userId"+p.userId;var r='<div class="officeimg"><img src="'+k.a+'"></div>',s=p.takeState||0;s=0===s?"不支持上门取件":"支持上门取件";var d=new e({infoTitle:'<span>"妙寄"全网站点: '+p.name||"</span>",infoBody:r+'<div class="office-detail"><div class="first-line"><button type="" id="navigation'+z+'" class="navigation-btn">导航</button><p class="office-detail__more">详细<span class="more"><span></span></span></p></div><div class="office-detail__content contenthide"><p>详细地址: '+p.descript+'</p><p>电话号码: <a href="tel:'+p.mobile+'">'+p.mobile+"</a></p></p>"+u+'</div><p class="confirm-p">是否选择该站点为寄件站点?('+s+')</p><div class="confirm-btn-cont"><button type="button" id="'+z+'" class="hide">确定</button><div></div>',offset:new window.AMap.Pixel(0,-31)});window.AMap.event.addListener(t,"touchstart",function(){a()}),a(),y.clear(),setTimeout(function(){window.document.getElementById("navigation"+z).addEventListener("touchstart",function(e){e.stopPropagation(),o(),n(i,A,y)},!0);var e=window.document.getElementsByClassName("office-detail__more")[0],t=window.document.getElementsByClassName("more")[0],a=window.document.getElementsByClassName("office-detail__content")[0];e.addEventListener("touchstart",function(e){e.stopPropagation();var n=t.className,i=a.className,o=/upside/g;o.test(n)?(t.className=n.replace(o,""),a.className+=" contenthide"):(t.className+=" upside",a.className=i.replace("contenthide",""))},!0)},600)}),setTimeout(function(){var e=window.document.getElementById(z);e.addEventListener("touchstart",function(e){e.stopPropagation(),p=r()(p),a.i(v.a)({type:"remove",key:"addressInfo"}),a.i(v.a)({type:"set",key:"addressInfo",val:p}),setTimeout(function(){window.wxvue.$router.push({path:"/send"})},300)},!0),e.className=e.className.replace(/hide/g,"")},1e3),o.abrupt("return");case 10:case"end":return o.stop()}},s,o)}))()}}),watch:{snVal:function(e,t){e?i(this.getSearchBox(e),1500):this.clearSearchBox()}},beforeDestroy:function(){this.$vux.loading.hide()}}},631:function(e,t,a){t=e.exports=a(171)(),t.push([e.i,'.article[data-v-30c3e0ba]{background-color:#fff;padding:2rem}.article-title[data-v-30c3e0ba]{text-align:center;padding:1rem;font-size:2.1rem}.article-content[data-v-30c3e0ba]{padding-bottom:1rem;text-align:justify;font-size:1.6rem}.article-content[data-v-30c3e0ba]:last-child{padding-bottom:0}.article-content a[data-v-30c3e0ba]{color:#2c3e50}.hide[data-v-30c3e0ba]{display:none}.show[data-v-30c3e0ba]{display:block}.show-important[data-v-30c3e0ba]{display:block!important}.clearfixed[data-v-30c3e0ba]:after{content:"";display:block;clear:both}.flex[data-v-30c3e0ba]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.btg[data-v-30c3e0ba]{border-bottom:1px solid #dedede}.btopg[data-v-30c3e0ba]{border-top:1px solid #dedede}.officeimg[data-v-30c3e0ba]{text-align:center;font-size:0;padding:.4rem .6rem}.officeimg img[data-v-30c3e0ba]{width:100%;max-width:305px;height:auto;border:1px solid #dedede;box-sizing:border-box;border-radius:2px}.office-detail[data-v-30c3e0ba]{padding:0 .6rem}.office-detail p[data-v-30c3e0ba],.vux-tab .vux-tab-item[data-v-30c3e0ba]{font-size:1.4rem}.fixed-fill[data-v-30c3e0ba]{position:fixed;bottom:0;width:94%}.mj-switch[data-v-30c3e0ba]{padding:10px 15px!important}.mj-switch .weui-cell__ft .weui-switch[data-v-30c3e0ba]{width:40px!important;height:20px!important}.mj-switch .weui-cell__ft .weui-switch[data-v-30c3e0ba]:checked{border-color:#ff6d40;background-color:#ff6d40}.mj-switch .weui-cell__ft .weui-switch[data-v-30c3e0ba]:before{width:40px;height:20px}.mj-switch .weui-cell__ft .weui-switch[data-v-30c3e0ba]:after{width:20px;height:18px}.express-router__link[data-v-30c3e0ba]{position:absolute;top:1.8rem;right:1.8rem;text-align:center;border:1px solid #ff6d40;color:#ff6d40;background:#fff;padding:.2rem .8rem;font-size:1.3rem;border-radius:5px}.addaddress-container .weui-cell[data-v-30c3e0ba]{font-size:1.5rem}.addaddress-container .weui-cell__bd.weui-cell__primary input[data-v-30c3e0ba],.addaddress-container .weui-cell__bd textarea[data-v-30c3e0ba]{text-align:right}.addaddress .quyu[data-v-30c3e0ba]{font-size:1.5rem}.addaddress .quyu .vux-cell-box[data-v-30c3e0ba]:before{content:" ";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d9d9d9;color:#d9d9d9;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5);left:15px}.addaddress .quyu .weui-label[data-v-30c3e0ba]{text-align:left;padding-left:.6rem}.addaddress .quyu .vux-popup-picker-select[data-v-30c3e0ba]{color:#666}.addaddress .quyu .vux-popup-picker-select span[data-v-30c3e0ba]{font-size:1.5rem}.contenthide[data-v-30c3e0ba]{-webkit-transform:scale(0);transform:scale(0);height:0}.navigation-btn[data-v-30c3e0ba]{width:4.6rem;font-size:1.4rem;text-align:center;padding:.2rem .4rem;border-radius:5px;box-sizing:border-box;white-space:nowrap;color:#fff;border:none;background:#ff6d40}.map #panel[data-v-30c3e0ba]{top:15px;z-index:999;position:absolute;background-color:#fff;max-height:100%;overflow-y:auto;right:14px;width:282px}.map .amap-marker img[data-v-30c3e0ba]{max-width:19px;max-height:33px}.map .amap-ui-smp-ifwn-container[data-v-30c3e0ba]{font-size:1.4rem}.map .amap-ui-smp-ifwn-def-tr-close[data-v-30c3e0ba]{font-size:2.2rem}.map .h2rem[data-v-30c3e0ba]{height:2rem;overflow:hidden}.map .hauto[data-v-30c3e0ba]{height:auto}.office-detail[data-v-30c3e0ba]{padding-top:.2rem}.office-detail__more[data-v-30c3e0ba]{float:right}.office-detail__content[data-v-30c3e0ba]{-webkit-transition:all .2s ease;transition:all .2s ease;padding-top:1rem}.office-detail .upside[data-v-30c3e0ba]{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.office-detail .first-line span.more[data-v-30c3e0ba]{float:right;width:0;height:0;border-width:1.7rem .8rem 0;border-style:solid;border-color:#ff6d40 transparent transparent;margin:.2rem .1rem;position:relative;-webkit-transition:-webkit-transform .6s;transition:-webkit-transform .6s;transition:transform .6s;transition:transform .6s,-webkit-transform .6s}.normal-btn[data-v-30c3e0ba]{width:5.6rem;font-size:1.4rem;text-align:center;padding:.2rem;border-radius:5px;box-sizing:border-box;white-space:nowrap}div.confirm-btn-cont[data-v-30c3e0ba]{text-align:right;padding-top:10px}.confirm-btn[data-v-30c3e0ba],div.confirm-btn-cont button[data-v-30c3e0ba]{width:5.6rem;font-size:1.4rem;text-align:center;padding:.2rem;border-radius:5px;box-sizing:border-box;white-space:nowrap;color:#fff;border:none;background:#ff6d40}.confirm-btn[data-v-30c3e0ba]{float:right}.pull-brand span.more[data-v-30c3e0ba]{float:right;width:0;height:0;border-width:1.3rem .6rem 0;border-style:solid;border-color:#ff6d40 transparent transparent;margin:.2rem .1rem;position:relative;-webkit-transition:-webkit-transform .6s;transition:-webkit-transform .6s;transition:transform .6s;transition:transform .6s,-webkit-transform .6s}.map .ser-form[data-v-30c3e0ba]{height:44px;margin:0 16px;border:1px solid #363636;border-radius:0;background:#fff;box-shadow:none;position:absolute;top:20px;z-index:560;width:92%}.map .ser-form .ser-con[data-v-30c3e0ba]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%}.map .ser-form .ser-con .ser-input[data-v-30c3e0ba]{overflow:hidden;height:44px;margin:0;padding:7px 42px 7px 6px;font-family:Arial,Helvetica,sans-serif;line-height:28px;border:none;border-radius:0;resize:none;display:block;font-size:18px;-webkit-appearance:none;-webkit-box-flex:1;-ms-flex:1;flex:1}.map .ser-form .ser-con .ser-inner[data-v-30c3e0ba]{width:81px;position:relative;margin:0;padding:0}.map .ser-form .ser-con .ser-inner .ser-bn[data-v-30c3e0ba]{position:absolute;top:0;right:0;box-sizing:inherit;width:60px;height:44px;padding:0 10px;border:0;border-left:1px solid #e8e8e8;font-size:16px;font-weight:700;line-height:46px;white-space:nowrap;letter-spacing:-1px;color:#38f;border-top-right-radius:0;border-bottom-right-radius:0;background:#fff;text-shadow:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.map .ser-form .index-box[data-v-30c3e0ba]{background:#fff}.map .ser-form .index-box .suggest-div[data-v-30c3e0ba]{top:10px!important;right:-17px;left:-17px;border:0;border-top:1px solid #f1f1f1}.map .ser-form .index-box .suggest-div .suggest-panel[data-v-30c3e0ba]{padding:0 17px}.map .ser-form .index-box .suggest-div .suggest-panel .suggest-content .sug[data-v-30c3e0ba]{color:#878787;position:relative;padding-right:40px;border-bottom:1px solid #f1f1f1;font-size:16px;line-height:22px;text-align:left;word-break:break-all;-webkit-tap-highlight-color:rgba(0,0,0,0)}.map .ser-form .index-box .suggest-div .suggest-panel .suggest-content .sug button[data-v-30c3e0ba]{margin-left:-10px;z-index:2;padding:10px 0 10px 37px;font-weight:400;position:relative;display:block;width:100%;height:100%;margin:0;border:0;font-size:16px;line-height:22px;text-align:left;color:#333;background:none transparent;-webkit-appearance:none}.map .ser-form .index-box .suggest-div .suggest-panel .suggest-content .sug .sug-searchicon[data-v-30c3e0ba]{position:absolute;top:0;width:34px;height:100%;box-sizing:content-box;background-position:50%;background-repeat:no-repeat;background-size:15px 15px;z-index:2;left:-10px;padding-left:0;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAAAUVBMVEUAAADNzc3Nzc3Nzc3MzMzMzMzMzMzNzc3Q0NDb29vNzc3Nzc3MzMzMzMzMzMzNzc3Nzc3Nzc3Ozs7Pz8/Q0NDMzMzOzs7Ozs7MzMzNzc3MzMyjngBVAAAAGnRSTlMA9Vgt/Nyjjg0H4FDOw7+2rYhiQCYeFXzjewzxqiMAAAEsSURBVEjHlZVZFoMgDEUDVIRirVOd9r/QGk5TrFgw78uDF3gJkMBBatF1IURR60VBWqos1p2KMjHhpddI+nXO2lasJxKtPYHHx+dv0/WDMUPfNZ/ZjzF2fF9RlbO73VzlB+/qCAs/LOEg6RcRv/joB58GIpmnX2ZvxnrPJZyq9N53BtsIjvA25FmgDfgrNCO+edfozPynDUalKR+4k4SEJBIq+KogqSrEhRfJpWmHV+xrRNg0bQVZmbaPBjJqNmiijHQ5uqOs1NtHn6P7DaopyCFHDxQmBmBytMFU8GieE16UvAyyTmfhnTzrVvFuLO81sF4a7xWzKgSv+jAq200yqibilyvyjfBL1V4Sfq2TEH6tSwU83wFjPEhN1F0nQgPuIK+Az8DAGTS4eXZvXiowQ7wpXsEAAAAASUVORK5CYII=)}.map .ser-form .index-box .suggest-div .suggest-close[data-v-30c3e0ba]{margin:0 -.17rem;margin-bottom:-1px;height:38px;line-height:38px;background:#f8f8f8;color:#555;text-align:center;font-size:14px;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0)}.map .ser-form .index-box .suggest-div .suggest-close[data-v-30c3e0ba]:after{border:0;line-height:38px;color:#555}.amap-ui-smp-ifwn-container[data-v-30c3e0ba]{max-width:22rem}.amap-ui-smp-ifwn-container span[data-v-30c3e0ba]{white-space:pre-wrap}@media (max-width:320px){.amap-ui-smp-ifwn-container[data-v-30c3e0ba]{max-width:22rem}}@media (min-width:360px){.amap-ui-smp-ifwn-container[data-v-30c3e0ba]{max-width:42rem}}@media (min-width:400px){.amap-ui-smp-ifwn-container[data-v-30c3e0ba]{max-width:47rem}}.confirm-p[data-v-30c3e0ba]{padding-top:1rem;padding-bottom:0}.amap-icon img[data-v-30c3e0ba]{max-width:19px!important;max-height:33px!important}',""])},653:function(e,t,a){var n=a(631);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(447)("0d66864f",n,!0)},695:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"map"},[a("div",{staticClass:"ser-form"},[a("div",{staticClass:"ser-con"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.snVal,expression:"snVal"}],staticClass:"ser-input",attrs:{type:"search",autocomplete:"off",autocorrect:"off",name:"word",autofocus:"autofocus",placeholder:"输入站点名称搜索"},domProps:{value:e.snVal},on:{input:function(t){t.target.composing||(e.snVal=t.target.value)}}}),e._v(" "),a("div",{staticClass:"ser-inner"},[a("button",{staticClass:"ser-bn",attrs:{type:"submit"},on:{click:e.btnSearch}},[e._v("点击搜索")])])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showSearch,expression:"showSearch"}],staticClass:"index-box"},[a("div",{staticClass:"suggest-div"},[a("div",{staticClass:"suggest-direct",staticStyle:{display:"none"}}),e._v(" "),a("div",{staticClass:"suggest-panel"},[a("div",{staticClass:"suggest-content"},e._l(e.searchBox,function(t){return a("div",{key:t.id,staticClass:"sug",on:{click:function(a){e.locateSite(t)}}},[a("button",[e._v(e._s(t.name))]),e._v(" "),a("div",{staticClass:"sug-edit"}),e._v(" "),a("div",{staticClass:"sug-searchicon"})])}))]),e._v(" "),a("div",{staticClass:"suggest-close",on:{click:function(t){e.snVal=null}}},[e._v("关闭")])])])]),e._v(" "),a("div",{staticStyle:{height:"100vh"},attrs:{id:"iCenter"}}),e._v(" "),a("div",{attrs:{id:"panel"}})])},staticRenderFns:[]}}});