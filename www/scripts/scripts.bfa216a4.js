"use strict";function fetchData(){var a=angular.injector(["ng","ngStorage"]),b=a.get("$http"),c=a.get("$window"),d=a.get("$localStorage");return b.get("/api/app/com.swttt.homeydash/config.json",d.httpHeaders).then(function(a){var b=a.data.result;b.httpconfig={headers:{Authorization:"Bearer "+a.data.result.bearertoken,"Content-Type":"application/json"}},"undefined"===b.general.idletime&&(console.log("no idletime found"),b.general.idletime=5),d.httpHeaders=b.httpconfig,angular.module("homeydashV3App").constant("CONFIG",b),angular.module("homeydashV3App").run(["$rootScope","CONFIG",function(a,b){a.CONFIG=b}]),console.log(b)},function(a){401===a.status&&(c.location.href="/manager/users/?redirect_uri=%2Fapp%2Fcom.swttt.homeydash%2F"),403===a.status&&(delete d.httpHeaders,c.location.reload())})}function bootstrapApplication(){angular.element(document).ready(function(){angular.bootstrap(document,["homeydashV3App"])})}fetchData().then(bootstrapApplication),angular.module("homeydashV3App",["ngAnimate","ngResource","ngSanitize","ngMaterial","ui.router","ngTouch","ngScrollbars","ngStorage","ngIdle","ui.sortable"]).config(["$mdThemingProvider","$mdDialogProvider","IdleProvider","KeepaliveProvider","CONFIG",function(a,b,c,d,e){e.general.idletime&&c.idle(e.general.idletime),c.timeout(!1),a.theme("default").primaryPalette("orange").accentPalette("orange"),b.addPreset("addPage",{options:function(){return{templateUrl:"views/dialogaddpage.html",controller:"DialogaddpageCtrl",autoWrap:!1,clickOutsideToClose:!0,escapeToClose:!1}}}),b.addPreset("tokenError",{options:function(){return{templateUrl:"views/tokenerror.html",controller:"TokenerrorCtrl",autoWrap:!1,clickOutsideToClose:!0,escapeToClose:!1}}})}]).run(["$rootScope","alldevices","CONFIG","socket","$sce","$mdDialog","Idle",function(a,b,c,d,e,f,g){c.general.idletime&&g.watch(),b().then(function(b){a.devicelist=b.data.result},function(a){f.show(f.tokenError())}).then(function(){angular.forEach(c.pages,function(b,c){angular.forEach(b.widgets,function(b,c){angular.forEach(b.capability,function(c,e){d.on(c,b.deviceid,function(d){a.devicelist[b.deviceid].state[c]=d,a.$apply()})})})})})}]).run(["$rootScope","$state","$localStorage",function(a,b,c){c.defaultPage||(c.defaultPage=!1),a.$on("$stateChangeStart",function(d,e,f){e.redirectTo&&(d.preventDefault(),b.go(e.redirectTo,f,{location:"replace"})),"main.page"===e.name&&(a.CONFIG.pages.filter(function(a){return a.pagename==f.pagename}).length||(d.preventDefault(),console.log("Page not found!"),b.go("main"))),"main"===e.name&&c.defaultPage&&a.CONFIG.pages.filter(function(a){return a.pagename==c.defaultPage}).length&&(d.preventDefault(),console.log("default page found"),b.go("main.page",{pagename:c.defaultPage},{location:"replace"}))})}]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("setup",{url:"/setup",templateUrl:"views/setup.html",redirectTo:"setup.general"}).state("setup.general",{url:"/general",templateUrl:"views/setup-general.html",data:{selectedTab:0}}).state("setup.pages",{url:"/pages",templateUrl:"views/setup-pages.html",data:{selectedTab:1}}).state("setup.pages.page",{url:"/:pagename",templateUrl:"views/setup-widgetsview.html",data:{selectedTab:1}}).state("setup.plugins",{url:"/plugins",templateUrl:"views/setup-plugins.html",data:{selectedTab:2}}).state("main",{url:"/",templateUrl:"views/main.html"}).state("main.page",{url:"page/:pagename",templateUrl:"views/device-page.html"})}]),angular.module("homeydashV3App").controller("MainCtrl",["Idle","$window","$scope","$stateParams","device","socket","alldevices","$rootScope","CONFIG","$sce","$mdToast",function(a,b,c,d,e,f,g,h,i,j,k){c.params=d,c.hideOverlay=!1,c.$on("IdleStart",function(){c.hideOverlay=!0,c.$apply()}),c.$on("IdleEnd",function(){c.hideOverlay=!1,c.$apply()}),c.getIdbyAtrr=function(a,b,c){for(var d=0;d<a.length;d++)if(a[d].hasOwnProperty(b)&&a[d][b]===c)return d;return-1},i.general.hidesidebar?c.sidebarWidth=!1:c.sidebarWidth=!0,0===Object.keys(h.CONFIG.pages).length?c.noPages=!0:c.noPages=!1;var l=b.innerHeight-110;$(window).resize(function(){l=b.innerHeight-110,c.$apply(function(){c.config={autoHideScrollbar:!1,theme:"minimal-dark",advanced:{updateOnContentResize:!0},setHeight:l,scrollInertia:0}})}),c.config={autoHideScrollbar:!1,theme:"minimal-dark",advanced:{updateOnContentResize:!0},setHeight:l,scrollInertia:0},h.$on("$stateChangeStart",function(a,b,c,d,e){g().then(function(a){h.devicelist=a.data.result,console.log("Updated devicelist!")})}),c.socketurl=j.trustAsResourceUrl("//"+i.homeyip+"/socket.io/socket.io.js"),c.onoff=function(a,b){b?e.onoff(a,!1).then(function(a){},function(b){b&&(k.show(k.simple().textContent("ERROR: "+b.statusText).position("top right").hideDelay(3e3)),h.devicelist[a].state.onoff=!0)}):e.onoff(a,!0).then(function(a){},function(b){b&&(k.show(k.simple().textContent("ERROR: "+b.statusText).position("top right").hideDelay(3e3)),h.devicelist[a].state.onoff=!1)})}}]),angular.module("homeydashV3App").controller("SetupCtrl",["$scope","$rootScope","$mdDialog","$mdToast","savesettings","$localStorage",function(a,b,c,d,e,f){a.storage=f,a.getIdbyAtrr=function(a,b,c){for(var d=0;d<a.length;d++)if(a[d].hasOwnProperty(b)&&a[d][b]===c)return d;return-1},a.dimmingvalues=[5,10,15,30,60,120,300,600,900],a.$on("$stateChangeSuccess",function(b,c){a.currentTab=c.data.selectedTab}),a.addpage=function(){c.show(c.addPage())},a.saveSettings=function(){e.save(b.CONFIG),console.log("New settings saved!")},a.sortableOptions={update:function(a,c){e.save(b.CONFIG)},axis:"y"},a["delete"]=function(a,b,d){c.show({templateUrl:"views/dialogremovepage.html",controller:"DialogremovepageCtrl",autoWrap:!1,clickOutsideToClose:!0,locals:{pagename:a}})},a.addwidget=function(a){c.show({templateUrl:"views/dialogaddwidget.html",controller:"DialogaddwidgetCtrl",autoWrap:!1,clickOutsideToClose:!0,escapeToClose:!1,locals:{pageid:a}})},a.deleteWidget=function(a,b,d,e){console.log(a,b,d,e),c.show({templateUrl:"views/dialogremovewidget.html",controller:"DialogremovewidgetCtrl",autoWrap:!1,clickOutsideToClose:!0,locals:{pageid:e,pagename:a,widgetname:b,widgetid:d}})}}]),angular.module("homeydashV3App").factory("alldevices",["CONFIG","$http",function(a,b){var c={};return c=function(){return b.get("/api/manager/devices/device/",a.httpconfig)}}]),angular.module("homeydashV3App").factory("device",["CONFIG","$http",function(a,b){var c={};return c.onoff=function(c,d){return b.put("/api/manager/devices/device/"+c+"/state",{onoff:d},a.httpconfig)},c.dim=function(c,d){return b.put("/api/manager/devices/device/"+c+"/state",{dim:d},a.httpconfig)},c}]),angular.module("homeydashV3App").factory("socket",["CONFIG",function(a){return{on:function(a,b,c){var d=io.connect("/realtime/device/"+b+"/",{transports:["websocket","polling"]});d.on(a,c)}}}]),angular.module("homeydashV3App").factory("savesettings",["CONFIG","$http",function(a,b){var c={};return c.save=function(c){return b.post("/api/app/com.swttt.homeydash/savesettings",c,a.httpconfig)},c}]),angular.module("homeydashV3App").controller("DialogaddpageCtrl",["$scope","$rootScope","$mdToast","$mdDialog","savesettings",function(a,b,c,d,e){a.saveNewpageDialog=function(a){var f=[];b.CONFIG.pages.push({pagename:a,widgets:f}),console.log(b.CONFIG.pages),e.save(b.CONFIG).then(function(a){c.show(c.simple().textContent("Page saved!").position("top right"))},function(a){c.show(c.simple().textContent("ERROR: "+a).position("top right"))}),d.hide()},a.closeNewpageDialog=function(){d.cancel()}}]),angular.module("homeydashV3App").controller("DialogremovepageCtrl",["$state","$scope","$rootScope","$mdToast","$mdDialog","savesettings","pagename",function(a,b,c,d,e,f,g){b.pagename=g,b.removePageDialog=function(b,g){c.CONFIG.pages.splice(g,1),a.go("setup.pages"),f.save(c.CONFIG).then(function(a){},function(a){d.show(d.simple().textContent("ERROR: "+a).position("top right"))}),e.hide()},b.closePageDialog=function(){e.cancel()}}]),angular.module("homeydashV3App").controller("DialogremovewidgetCtrl",["$scope","$rootScope","$mdToast","$mdDialog","savesettings","widgetname","pagename","widgetid","pageid",function(a,b,c,d,e,f,g,h,i){a.widgetname=f,a.pagename=g,a.widgetid=h,a.pageid=i,a.removeWidgetDialog=function(){b.CONFIG.pages[i].widgets.splice(h,1),e.save(b.CONFIG).then(function(a){c.show(c.simple().textContent("Widget removed!").position("top right"))},function(a){c.show(c.simple().textContent("ERROR: "+a).position("top right"))}),d.hide()},a.closeWidgetDialog=function(){d.cancel()}}]),angular.module("homeydashV3App").controller("DialogaddwidgetCtrl",["$scope","$rootScope","$mdToast","$mdDialog","savesettings","pageid",function(a,b,c,d,e,f){a.devicelist=b.devicelist,a.saveNewwidgetDialog=function(a,g,h,i){console.log(a,g,h,f),b.CONFIG.pages[f].widgets.push({name:a,widgettype:h,capability:Object.keys(b.devicelist[g].capabilities),deviceid:g}),console.log(b.CONFIG.pages[f]),e.save(b.CONFIG).then(function(a){},function(a){c.show(c.simple().textContent("ERROR: "+a).position("top right"))}),d.hide()},a.closeNewwidgetDialog=function(){d.cancel()}}]),angular.module("homeydashV3App").controller("TokenerrorCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("homeydashV3App").run(["$templateCache",function(a){a.put("views/device-page.html",'<div layout-padding flex="100" flex-xs="100" flex-xs="100" style="position:relative"> <h2 style="display:inline;color:white;text-transform:uppercase;font-weight:300">{{params.pagename}}</h2> <md-icon ng-if="!CONFIG.general.hideicon" ng-click="null" style="color:white;position:absolute;top:0px;right:10px;cursor:pointer" ui-sref="setup">settings</md-icon> </div> <widget ng-repeat="widget in CONFIG.pages[getIdbyAtrr(CONFIG.pages, \'pagename\', params.pagename)].widgets" ng-include="\'views/\' + widget.widgettype + \'.html\'" flex="25" flex-sm="50" flex-xs="100"> </widget>'),a.put("views/dialogaddpage.html",'<md-dialog aria-label="Add new page"> <md-dialog-content class="md-dialog-content" aria-label="Add new page"> <h2 class="md-title">What should be the name of the page?</h2> <md-input-container style="width:100%"> <label>Pagename</label> <input ng-model="newpagename"> </md-input-container> </md-dialog-content> <md-dialog-actions> <md-button ng-click="closeNewpageDialog()" class="md-warn"> Cancel </md-button> <md-button ng-click="saveNewpageDialog(newpagename)" class="md-primary"> Save </md-button> </md-dialog-actions> </md-dialog>'),a.put("views/dialogaddwidget.html",'<md-dialog aria-label="Add new widget"> <md-dialog-content class="md-dialog-content" aria-label="Add new page"> <h2 class="md-title">Add new widget</h2> <p>You are about to add a new widget to {{pagename}}.</p> <md-select style="width:100%" ng-model="devicetoadd" placeholder="Select a device"> <md-option ng-if="device.capabilities.onoff" ng-value="device" ng-repeat="device in devicelist">{{ device.name }} <small style="color:rgba(0,0,0,0.4)">{{device.zone.name}}</small></md-option> </md-select> <md-select style="width:100%" ng-model="capability" placeholder="Select a capability"> <md-option value="onoff">onoff</md-option> </md-select> </md-dialog-content> <md-dialog-actions> <md-button ng-click="closeNewwidgetDialog()" class="md-warn"> Cancel </md-button> <md-button ng-click="saveNewwidgetDialog(devicetoadd.name, devicetoadd.id, capability, pagename)" class="md-primary"> Save </md-button> </md-dialog-actions> </md-dialog>'),a.put("views/dialogremovepage.html",'<md-dialog aria-label="Remove page"> <md-dialog-content class="md-dialog-content" aria-label="Remove page"> <h2 class="md-title">Remove page</h2> <p>You are about to remove the page <b>{{pagename}}</b>. <br>Are you sure?</p> </md-dialog-content> <md-dialog-actions> <md-button ng-click="closePageDialog()" class="md-warn"> No </md-button> <md-button ng-click="removePageDialog(pagename)" class="md-primary"> Yes </md-button> </md-dialog-actions> </md-dialog>'),a.put("views/dialogremovewidget.html",'<md-dialog aria-label="Remove page"> <md-dialog-content class="md-dialog-content" aria-label="Remove page"> <h2 class="md-title">Remove widget from page</h2> <p>You are about to remove the widget <b>{{widgetname}}</b>. <br>Are you sure?</p> </md-dialog-content> <md-dialog-actions> <md-button ng-click="closeWidgetDialog()" class="md-warn"> No </md-button> <md-button ng-click="removeWidgetDialog(pagename,widgetname,idx)" class="md-primary"> Yes </md-button> </md-dialog-actions> </md-dialog>'),a.put("views/hdlight.html",'<md-card> <md-card-content layout="row" layout-wrap style="padding:0;margin:0"> <md-list flex="100" style="padding:0;margin:0"> <md-list-item class="md-2-line" style="padding:0;margin:0"> <img ng-if="data.cb1 == true || data.slider > 0" ng-src="../images/icons/light_on.a7fbcd5d.png" class="md-avatar" alt="icon"> <img ng-if="data.cb1 == false || data.slider == 0" ng-src="../images/icons/light_off.2a03f53e.png" class="md-avatar" alt="icon"> <div class="md-list-item-text" layout="column" style="margin-botton:0px"> <h3>Staande lamp</h3> <h4>Woonkamer</h4> </div> </md-list-item> </md-list> <div flex="100" layout-align="center start" style="min-height:48px;height:48px;max-height:48px;margin:0px 20px 0px 20px"> <md-switch ng-show="type == \'switch\'" style="max-width:80px;margin:0 auto" ng-model="data.cb1" aria-label="Switch 1"> <span ng-if="data.cb1">On</span> <span ng-if="!data.cb1">Off</span> </md-switch> <md-slider ng-show="type == \'slider\'" style="margin:0 auto" ng-model="data.slider" flex min="0" max="100" aria-label="dim"> </md-slider> </div> </md-card-content> </md-card>'),a.put("views/main.html",'<div ng-if="hideOverlay" class="idleoverlay"> </div> <div class="sidebar md-whiteframe-5dp" ng-class="{\'sidebar-width\':sidebarWidth}" style="padding-top:15px"> <center><img src="images/logo.350fc2f6.png" style="padding:5px"></center> <md-list id="sidebar" flex ng-scrollbars ng-scrollbars-config="config"> <md-list-item class="md-1-line" ng-click="null" ng-repeat="page in CONFIG.pages" ui-sref="main.page({pagename: \'{{page.pagename}}\'})"> <div class="md-list-item-text" layout="column" md-scroll-y> {{page.pagename}} </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> </md-list> </div> <md-content flex layout="row" layout-padding layout-wrap layout-align="start start" md-scroll-y style="background-color:rgba(255, 255, 255, 0);padding-top:15px" ui-view> <div layout-padding flex="100" flex-xs="100" flex-xs="100" style="position:relative"> <h2 ng-if="!noPages" style="color:white;text-transform:uppercase;font-weight:300"><md-icon style="color:white">keyboard_arrow_left</md-icon> Open a page in the sidebar on the left </h2> <h2 ng-if="noPages" style="color:white;text-transform:uppercase;font-weight:300">No pages found!</h2> <p ng-if="noPages" style="color:white"> Press the <md-icon style="color:white">settings</md-icon> on the top right to go to the setup.</p> <md-icon ng-if="!CONFIG.general.hideicon" ng-click="null" style="color:white;position:absolute;top:0px;right:10px;cursor:pointer" ui-sref="setup">settings</md-icon> </div> </md-content>'),a.put("views/onoff.html",'<md-card> <md-card-content layout="row" layout-wrap style="padding:0;margin:0"> <md-list flex="100" style="padding:0;margin:0"> <md-list-item class="md-2-line" style="padding:0;margin:0"> <img ng-if="devicelist[widget.deviceid].state.onoff" ng-src="images/icons/light_on.a7fbcd5d.png" class="md-avatar" alt="icon"> <img ng-if="!devicelist[widget.deviceid].state.onoff" ng-src="images/icons/light_off.2a03f53e.png" class="md-avatar" alt="icon"> <div class="md-list-item-text" layout="column" style="margin-botton:0px"> <h3>{{devicelist[widget.deviceid].name}}</h3> <h4 ng-if="!CONFIG.general.hidezonename">{{devicelist[widget.deviceid].zone.name}}</h4> </div> </md-list-item> </md-list> <div flex="100" layout-align="center start" style="min-height:48px;height:48px;max-height:48px;margin:0px 20px 0px 20px"> <md-switch ng-click="onoff(widget.deviceid, devicelist[widget.deviceid].state.onoff)" style="max-width:80px;margin:0 auto" ng-model="devicelist[widget.deviceid].state.onoff" aria-label="Switch 1"> <span ng-if="devicelist[widget.deviceid].state.onoff">On</span> <span ng-if="!devicelist[widget.deviceid].state.onoff">Off</span> </md-switch> <div style="width:100%;text-align:right;font-size:10px" ng-if="devicelist[widget.deviceid].state.meter_power && !CONFIG.general.hidekwh">{{devicelist[widget.deviceid].state.meter_power}} kwh</div> </div> </md-card-content> </md-card>'),a.put("views/setup-general.html",'<md-list style="width:100%"> <md-subheader class="md-no-sticky" style="background-color:white">General</md-subheader> <md-list-item> <p>Set a default page</p> <md-select class="md-secondary" ng-model="storage.defaultPage"> <md-option ng-value="false"><em>None</em></md-option> <md-option ng-repeat="page in CONFIG.pages" ng-value="page.pagename"> {{page.pagename}} </md-option> </md-select> </md-list-item> <md-list-item> <p>Set dashboard screen dimming time (requires page refresh)</p> <md-select class="md-secondary" ng-change="saveSettings()" ng-model="CONFIG.general.idletime"> <md-option ng-value="0">Disable</md-option> <md-option ng-repeat="value in dimmingvalues" ng-value="value"> {{value}} sec </md-option> </md-select> </md-list-item> <md-subheader class="md-no-sticky" style="background-color:white">Look and feel</md-subheader> <md-list-item> <p>Hide the setup icon on your dashboard</p> <md-checkbox ng-change="saveSettings()" class="md-secondary" ng-model="CONFIG.general.hideicon"></md-checkbox> </md-list-item> <md-list-item> <p>Hide zone name on widget cards</p> <md-checkbox ng-change="saveSettings()" class="md-secondary" ng-model="CONFIG.general.hidezonename"></md-checkbox> </md-list-item> <md-list-item> <p>Hide the sidebar on page reload</p> <md-checkbox ng-change="saveSettings()" class="md-secondary" ng-model="CONFIG.general.hidesidebar"></md-checkbox> </md-list-item> <md-list-item> <p>Hide kwh on capable widget cards</p> <md-checkbox ng-change="saveSettings()" class="md-secondary" ng-model="CONFIG.general.hidekwh"></md-checkbox> </md-list-item> </md-list>'),a.put("views/setup-pages.html",'<div flex="30"> <md-list-item> <md-button style="width:100%" class="md-raised" ng-click="addpage()">add new page</md-button> </md-list-item> <md-list class="md-dense" ui-sortable="sortableOptions" ng-model="CONFIG.pages"> <md-list-item ng-repeat="page in CONFIG.pages" ui-sref-active="active" style="margin-left:7px;margin-right:7px" class="md-2-line" ui-sref="setup.pages.page({pagename: \'{{page.pagename}}\'})"> <div class="md-list-item-text"> <h3>{{page.pagename}}</h3> <p>{{page.widgets.length || \'0\'}} widgets</p> </div> <md-button class="md-secondary md-icon-button md-warn" ng-click="delete(key)"> <md-icon>delete</md-icon> </md-button> <md-divider ng-if="!$last"></md-divider> </md-list-item> </md-list> </div> <div flex="70" style="margin-top:5px;position:relative" layout="row" layout-wrap ui-view> <h3 style="font-weight:300;width:100%;text-align:center">Select a page on the left to add widgets to. <br>Then click the plus icon in the right top corner to add a widget.</h3> </div>'),a.put("views/setup-plugins.html","<p>This is the setup-plugins view.</p>"),a.put("views/setup-widgetsview.html",'<md-button class="md-fab" style="position:absolute;top:-20px;right:0" aria-label="Add" ng-click="addwidget(getIdbyAtrr(CONFIG.pages, \'pagename\', params.pagename))"> <md-icon>add</md-icon> </md-button> <div style="padding:10px" ng-repeat="widget in CONFIG.pages[getIdbyAtrr(CONFIG.pages, \'pagename\', params.pagename)].widgets" flex="25"> <div style="background-color:rgba(255,152,0,1);padding:5px;font-weight:200;color:white" class="md-whiteframe-3dp"> <p style="color:black"><b>{{devicelist[widget.deviceid].name}}</b> <br> {{devicelist[widget.deviceid].zone.name}}</p> <p> <small> {{widget.capability}} {{widget.devicetype}} </small> </p> <div style="text-align:right;margin-top:-25px"> <md-button ng-click="deleteWidget(params.pagename,widget.name, page.widgets.indexOf(widget), CONFIG.pages.indexOf(page))" class="md-warn md-fab md-mini"> <md-icon>delete</md-icon> </md-button> </div> </div> </div>'),a.put("views/setup.html",'<div style="width:100%;height:100%" layout="row" layout-wrap layout-align="center center" ng-controller="SetupCtrl"> <md-card flex="90" style="height:90%"> <md-tabs md-stretch-tabs="always" style="background-color:rgba(82, 82, 82, 0.1)" md-selected="currentTab"> <md-tab ui-sref="setup.general" label="General"></md-tab> <md-tab ui-sref="setup.pages" label="Pages"></md-tab> <md-tab ui-sref="setup.plugins" label="Plugins"></md-tab> </md-tabs> <md-card-content md-scroll-y style="overflow:auto" ui-view layout="row" layout-wrap layout-align="start start"> </md-card-content> <md-card-footer style="text-align:right"> <md-button ui-sref="main">Back to the dashboard</md-button> </md-card-footer> </md-card> </div>'),a.put("views/temperature.html",'<md-card> <md-card-content layout="row" layout-wrap style="padding:0;margin:0"> <md-list flex="100" style="padding:0;margin:0"> <md-list-item class="md-2-line" style="padding:0;margin:0"> <img ng-src="../images/icons/temperature.a0375e2c.png" class="md-avatar" alt="icon"> <div class="md-list-item-text" layout="column" style="margin-botton:0px"> <h3>Thermostaat</h3> <h4>Woonkamer</h4> </div> </md-list-item> </md-list> <div flex="100" layout-align="center start" style="min-height:48px;height:48px;max-height:48px;margin:0px 20px 0px 20px"> <h3 style="font-weight:200;margin:0 auto;text-align:center">20.8 °C</h3> </div> </md-card-content> </md-card>'),a.put("views/tokenerror.html",'<md-dialog aria-label="Token error"> <md-dialog-content class="md-dialog-content" aria-label="Token error"> <h2 class="md-title">Error</h2> <p>It looks like you forgot to enter your bearer token in the settings or entered a wrong token.</p> </md-dialog-content> <md-dialog-actions> <md-button ng-href="/manager/settings/#homey:app:com.swttt.homeydash" class="md-primary"> Go to settings </md-button> </md-dialog-actions> </md-dialog>')}]);