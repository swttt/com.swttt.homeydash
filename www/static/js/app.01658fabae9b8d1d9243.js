webpackJsonp([1],{0:function(e,t,n){function r(e){n(149)}var o=n(6)(n(88),n(948),r,null,null);e.exports=o.exports},149:function(e,t){},150:function(e,t){},151:function(e,t){},154:function(e,t,n){e.exports=n.p+"static/img/logo.7837035.svg"},58:function(e,t,n){"use strict";var r=n(15),o=n.n(r),i=n(14),a=n.n(i),s=n(3),c=n(955),l=n(942),u=n.n(l),f=n(941),d=n.n(f),h=n(944),p=n.n(h),m=n(945),v=n.n(m),x=n(943),g=n.n(x),w=this;s.default.use(c.a);var y=new c.a({routes:[{path:"",component:u.a,children:[{path:"",name:"Home",component:p.a},{path:"spotify",name:"Spotify",component:v.a},{path:"devices",name:"Devices",component:g.a}]},{path:"/auth",name:"Auth",component:d.a}]});y.beforeEach(function(){var e=a()(o.a.mark(function e(t,n,r){var i,a,s;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,localStorage.getItem("auth");case 3:if((i=e.sent)||"Auth"===t.name){e.next=8;break}r("/auth"),e.next=36;break;case 8:if(window.Homey||!i){e.next=35;break}console.log("Auth found, but no Homey object!"),e.next=16;break;case 13:a=e.sent,e.next=19;break;case 16:return e.next=18,y.app.$http.get("/api/app/com.swttt.homeydash/auth?token="+i);case 18:a=e.sent;case 19:s={},e.next=26;break;case 23:s=e.sent,e.next=29;break;case 26:return e.next=28,AthomAPI.HomeyAPI.forCurrentHomey(a.body.result);case 28:s=e.sent;case 29:return e.next=31,s;case 31:window.Homey=e.sent,r(),e.next=36;break;case 35:r();case 36:e.next=42;break;case 38:e.prev=38,e.t0=e.catch(0),console.error(e.t0),y.app.$notify.error({title:"Error",message:e.t0.statusText});case 42:case"end":return e.stop()}},e,w,[[0,38]])}));return function(t,n,r){return e.apply(this,arguments)}}()),t.a=y},60:function(e,t){},61:function(e,t){},64:function(e,t,n){function r(e){n(150)}var o=n(6)(n(89),n(950),r,null,null);e.exports=o.exports},88:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3),o={};t.default={name:"icon",props:{name:{type:String,validator:function(e){return e?e in o||(r.default.util.warn('Invalid prop: prop "icon" is referring to an unregistered icon "'+e+'".\nPlesase make sure you have imported this icon before using it.',this),!1):null}},scale:[Number,String],spin:Boolean,inverse:Boolean,flip:{validator:function(e){return"horizontal"===e||"vertical"===e}},label:String},data:function(){return{x:!1,y:!1,childrenWidth:0,childrenHeight:0,outerScale:1}},computed:{normalizedScale:function(){var e=this.scale;return e=void 0===e?1:Number(e),isNaN(e)||e<=0?(r.default.util.warn('Invalid prop: prop "scale" should be a number over 0.',this),this.outerScale):e*this.outerScale},clazz:function(){return{"fa-icon":!0,"fa-spin":this.spin,"fa-flip-horizontal":"horizontal"===this.flip,"fa-flip-vertical":"vertical"===this.flip,"fa-inverse":this.inverse}},icon:function(){return this.name?o[this.name]:null},box:function(){return this.icon?"0 0 "+this.icon.width+" "+this.icon.height:"0 0 "+this.width+" "+this.height},ratio:function(){if(!this.icon)return 1;var e=this.icon,t=e.width,n=e.height;return Math.max(t,n)/16},width:function(){return this.childrenWidth||this.icon&&this.icon.width/this.ratio*this.normalizedScale||0},height:function(){return this.childrenHeight||this.icon&&this.icon.height/this.ratio*this.normalizedScale||0},style:function(){return 1!==this.normalizedScale&&{fontSize:this.normalizedScale+"em"}}},mounted:function(){var e=this;if(!this.icon){this.$children.forEach(function(t){t.outerScale=e.normalizedScale});var t=0,n=0;this.$children.forEach(function(e){t=Math.max(t,e.width),n=Math.max(n,e.height)}),this.childrenWidth=t,this.childrenHeight=n,this.$children.forEach(function(e){e.x=(t-e.width)/2,e.y=(n-e.height)/2})}},register:function(e){for(var t in e){var n=e[t];n.paths||(n.paths=[]),n.d&&n.paths.push({d:n.d}),n.polygons||(n.polygons=[]),n.points&&n.polygons.push({points:n.points}),o[t]=n}},icons:o}},89:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"app",data:function(){return{}},mounted:function(){},methods:{}}},90:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(15),o=n.n(r),i=n(14),a=n.n(i);t.default={data:function(){return{form:{}}},mounted:function(){},methods:{auth:function(e){var t=this;return a()(o.a.mark(function n(){var r,i,a;return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:n.prev=0,n.next=7;break;case 4:r=n.sent,n.next=10;break;case 7:return n.next=9,t.$http.get("/api/app/com.swttt.homeydash/auth?token="+e);case 9:r=n.sent;case 10:return n.next=12,r.body.result;case 12:i=n.sent,a={},n.next=20;break;case 17:a=n.sent,n.next=23;break;case 20:return n.next=22,AthomAPI.HomeyAPI.forCurrentHomey(i);case 22:a=n.sent;case 23:window.Homey=a,localStorage.setItem("auth",e),t.$router.push({path:"/"}),t.$notify.success({title:"Authorized",message:"Authorized succesfully."}),n.next=33;break;case 29:n.prev=29,n.t0=n.catch(0),t.$notify.error({title:"Error",message:n.t0}),console.log(n.t0);case 33:case"end":return n.stop()}},n,t,[[0,29]])}))()}}}},91:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(957),o=n.n(r),i=n(946),a=n.n(i);t.default={data:function(){return{widgets:o.a.widget}},components:{sidebar:a.a},beforeMount:function(){},methods:{}}},92:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(15),o=n.n(r),i=n(14),a=n.n(i);t.default={data:function(){return{zones:{},loading:!0}},components:{},mounted:function(){var e=this;return a()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.Homey.zones.getZones({recursive:!0});case 2:e.zones=t.sent,e.loading=!1;case 4:case"end":return t.stop()}},t,e)}))()},methods:{}}},93:function(e,t){},94:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(15),o=n.n(r),i=n(14),a=n.n(i);t.default={data:function(){return{info:{},loading:!0}},components:{},mounted:function(){var e=this;return a()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getInfo();case 2:e.loading=!1;case 3:case"end":return t.stop()}},t,e)}))()},methods:{getInfo:function(){var e=this;return a()(o.a.mark(function t(){var n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(window.Homey),t.next=3,window.Homey.system.getInfo();case 3:n=t.sent,e.info=n;case 5:case"end":return t.stop()}},t,e)}))()}}}},941:function(e,t,n){var r=n(6)(n(90),n(947),null,null,null);e.exports=r.exports},942:function(e,t,n){function r(e){n(151)}var o=n(6)(n(91),n(952),r,null,null);e.exports=o.exports},943:function(e,t,n){var r=n(6)(n(92),n(953),null,null,null);e.exports=r.exports},944:function(e,t,n){var r=n(6)(n(93),n(951),null,null,null);e.exports=r.exports},945:function(e,t,n){var r=n(6)(n(94),n(949),null,null,null);e.exports=r.exports},946:function(e,t,n){var r=n(6)(n(95),n(954),null,null,null);e.exports=r.exports},947:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-row",[r("el-col",{attrs:{span:10,offset:7}},[r("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"20%"}},[r("center",[r("img",{staticClass:"logo",attrs:{src:n(154)}})]),e._v(" "),r("el-form",{ref:"form",attrs:{"label-position":"top",model:e.form,"label-width":"120px"}},[r("p",[e._v("\n          You need to authorize this client first to use Homeydash, you can find the authorization code in the app settings.\n        ")]),e._v(" "),r("el-form-item",[r("el-input",{staticStyle:{"font-size":"24px"},attrs:{size:"large",type:"text",placeholder:"Authorization code"},model:{value:e.form.token,callback:function(t){e.form.token=t},expression:"form.token"}})],1),e._v(" "),r("el-button",{staticStyle:{width:"100%","margin-top":"15px"},attrs:{type:"primary"},on:{click:function(t){e.auth(e.form.token)}}},[e._v("Authorize")])],1)],1)],1)],1)},staticRenderFns:[]}},948:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("svg",{class:e.clazz,style:e.style,attrs:{version:"1.1",role:e.label?"img":"presentation","aria-label":e.label,x:e.x,y:e.y,width:e.width,height:e.height,viewBox:e.box}},[e._t("default",[e.icon&&e.icon.paths?e._l(e.icon.paths,function(t){return n("path",e._b({},"path",t))}):e._e(),e._v(" "),e.icon&&e.icon.polygons?e._l(e.icon.polygons,function(t){return n("polygon",e._b({},"polygon",t))}):e._e(),e._v("\b\n    "),e.icon&&e.icon.raw?[n("g",{domProps:{innerHTML:e._s(e.icon.raw)}})]:e._e()])],2)},staticRenderFns:[]}},949:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}]},[n("h1",[e._v(e._s(e.info))])])},staticRenderFns:[]}},95:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{}},mounted:function(){}}},950:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},951:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-col",{attrs:{span:24}},[n("el-col",{attrs:{span:10}},[n("el-card",{staticClass:"box-card widget"},[n("div",{staticClass:"title"},[n("h3",[e._v("Security")])]),e._v(" "),n("div",{staticClass:"content"},[n("el-col",{staticClass:"item",attrs:{span:8}},[n("center",[n("icon",{attrs:{name:"devices",scale:"3"}}),n("br"),e._v(" "),n("span",{staticClass:"small"},[e._v("4 windows are open")])],1)],1),e._v(" "),n("el-col",{staticClass:"item",attrs:{span:8}},[n("center",[n("icon",{attrs:{name:"sign-in",scale:"3"}}),n("br"),e._v(" "),n("span",{staticClass:"small"},[e._v("No doors open")])],1)],1),e._v(" "),n("el-col",{staticClass:"item",attrs:{span:8}},[n("center",[n("icon",{attrs:{name:"shield",scale:"3"}}),n("br"),e._v(" "),n("span",{staticClass:"small"},[e._v("ARMED")])],1)],1)],1)])],1)],1)},staticRenderFns:[]}},952:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-row",{staticStyle:{"overflow-x":"hidden"}},[n("el-col",{staticStyle:{width:"70px",float:"left!important"}},[n("sidebar")],1),e._v(" "),n("el-col",{staticStyle:{"margin-left":"70px",width:"auto","min-width":"0",float:"none"}},[n("el-row",{staticStyle:{"padding-left":"10px","padding-top":"20px","max-height":"100vh","overflow-y":"scroll","overflow-x":"hidden"},attrs:{gutter:20}},[n("router-view",{staticStyle:{overflow:"scroll-y"}})],1)],1)],1)},staticRenderFns:[]}},953:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}]},[n("h1",[e._v(e._s(e.zones))])])},staticRenderFns:[]}},954:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-menu",{staticStyle:{"min-height":"100vh"},attrs:{theme:"",router:!0,"default-active":e.$route.path,id:"sidebar"}},[n("el-menu-item",{attrs:{index:"/"}},[n("icon",{attrs:{name:"home"}})],1),e._v(" "),n("el-menu-item",{attrs:{index:"/spotify"}},[n("icon",{attrs:{name:"headphones"}})],1),e._v(" "),n("el-menu-item",{attrs:{index:"/devices"}},[n("icon",{attrs:{name:"devices"}})],1)],1)},staticRenderFns:[]}},957:function(e,t){e.exports={widget:"homey"}},958:function(e,t){},96:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(60),o=(n.n(r),n(61)),i=(n.n(o),n(62)),a=(n.n(i),n(59)),s=n.n(a),c=(n(63),n(0)),l=n.n(c),u=n(3),f=n(64),d=n.n(f),h=n(58),p=n(65);u.default.config.productionTip=!1,u.default.use(s.a),u.default.use(p.a),u.default.component("icon",l.a),l.a.register({devices:{width:100,height:90,raw:'<path xmlns="http://www.w3.org/2000/svg" d="M57.8,77.6l2-15.9c8.7-2,15.2-8.8,15.2-16.9V23.3h-6.6V4.7c0-2-1.9-3.6-4.2-3.6c-2.3,0-4.2,1.6-4.2,3.6v18.5H43.1V4.7   c0-2-1.9-3.6-4.2-3.6c-2.3,0-4.2,1.6-4.2,3.6v18.5h-7v21.5c0,8.2,6.6,15.1,15.5,17l1.6,15.9H57.8z"/>'}}),new u.default({el:"#app",router:h.a,template:"<App/>",components:{App:d.a}})}},[96]);
//# sourceMappingURL=app.01658fabae9b8d1d9243.js.map