
// A factory to get all devices and the current state to every device.

app.factory('allDevices', function($http, CONFIG, $localStorage, $q) {
  var obj = {};
      obj = function(zoneId){
        return $http.get('http://'+CONFIG.homey_ip + '/api/manager/devices/device/?zone='+zoneId, CONFIG.httpconfig)
}

      return obj;
});

app.factory('setDevice', function($http, CONFIG) {
  var obj = {};
      obj.onoff = function(currentId, cmd){
          return $http.put('http://'+CONFIG.homey_ip+'/api/manager/devices/device/'+currentId+'/state', {'onoff':cmd}, CONFIG.httpconfig);
      }
      obj.dim = function(currentId, dimValue){
        return $http.put('http://'+CONFIG.homey_ip+'/api/manager/devices/device/'+currentId+'/state', {'dim':dimValue}, CONFIG.httpconfig);
      }
   return obj;
});

// A factory to get all the zones known in Homey.
app.factory('allZones', function($http, CONFIG) {
  var obj = {};
      obj = function(){
          return $http.get('http://'+CONFIG.homey_ip + '/api/manager/zones/', CONFIG.httpconfig);
      }
   return obj;
});

// A factory to send speech to homey.
app.factory('sendSpeech', function($http, CONFIG) {
  var obj = {};
      obj = function(cmd){
          return $http.post('http://'+CONFIG.homey_ip + '/api/manager/speech-input/', {"transcript": cmd}, CONFIG.httpconfig);
      }
   return obj;
});


app.controller('mainController', function ($scope, $uibModal, $localStorage, $timeout, CONFIG, allDevices, allZones, setDevice, hmTouchEvents, sendSpeech) {
  //For testing purpose! Remove localstorage
  //$localStorage.$reset();
  $scope.defaultZone = {};
  $scope.$storage = $localStorage;

  //When OpenSettings() is called this opens the dialog for settings, notice that this dialog gets his own Controller!
  $scope.openSettings = function () {
    var settingsModal = $uibModal.open({
      templateUrl: 'settings_modal.html',
      controller: 'SettingsCtrl',
      size: 'lg'
    });
    settingsModal.result.then(function (saveId) {
      $scope.$storage.defaultZone = saveId;
      console.log('New default zone saved!');
    });
  };


  //Check if we have a defaultZone already, if not open the settings dialog.
  if(!$scope.$storage.defaultZone){
       console.log('No default zone found, showing dialog');
       $scope.openSettings();
     }
     else{
       console.log('Default zone found, showing devices in that zone! ' + $scope.$storage.defaultZone);
     }

     //Get zones and push to fronted.
     allZones().success(function(response){
         $scope.zones = response.result;
     });

     $scope.sidebarState = false;
     // Open sensors on swipe left
     $scope.swipe = function(direction){
       console.log('swiped ' + direction);
       if(direction === 'left'){
         //$scope.sidebarState = "show";
         $scope.sidebarState = true;
       }
       if(direction === 'right'){
         $scope.sidebarState = false;
       }
     }

     //Speech recognition
     if (annyang && CONFIG.homey_enablespeech) {
       // Let's define our first command. First the text we expect, and then the function it should call
       var commands = {
         'Oké Homey *cmd' : function(cmd){
           sendSpeech(cmd);
         }
       }




       // Add our commands to annyang
       annyang.addCommands(commands);
       annyang.setLanguage(CONFIG.homey_speechlanguage);

       // Start listening. You can call this here, or attach this call to an event, button, etc.
       annyang.debug();
       annyang.start({continuous: true, paused: false });
        };

});

// This controller controls the lights page
app.controller('lightsController', function ($scope, $uibModal, $localStorage, $timeout, CONFIG, allDevices, allZones, setDevice, hmTouchEvents) {

// Opens the device dimmer slider
  $scope.openDeviceSettings = function (thisdevice) {

    var deviceSettings = $uibModal.open({
      templateUrl: 'devicesettings_modal.html',
      controller: 'deviceSettings',
      size: 'md',
      resolve: {
        thisdevice: function () {
          return thisdevice;
        }
      }
    });
  };

       //Get alldevices within the default zone and push to frontend.
       allDevices($scope.$storage.defaultZone).then(function(response){
           $scope.devicelist = response.data.result;
       });

    // Set interval
    $scope.intervalFunction = _.debounce(function(){
      timer = $timeout(function() {
        //Get alldevices within the default zone and push to frontend.
        allDevices($scope.$storage.defaultZone).then(function(response){
            $scope.devicelist = {};
            $scope.devicelist = response.data.result;
        });
        $scope.intervalFunction();
      }, 1000)
    },300);

    // Check if controller still active, else destroy the timer.
    $scope.$on('$locationChangeStart', function(){
       $timeout.cancel(timer);
   });
    // Kick off the interval
    $scope.intervalFunction();


    // Control devices
    // Single tap icon event
    $scope.tap = function(currentId, cmd){
      setDevice.onoff(currentId, cmd);
    };
    $scope.press = function(thisdevice){
      $scope.openDeviceSettings(thisdevice);
    };


});


//Controller for the sensors page
app.controller('sensorsController', function ($scope, $uibModal, $localStorage, $timeout, CONFIG, allDevices, allZones, setDevice, hmTouchEvents) {



});


//Controller for the settingsmodal
app.controller('SettingsCtrl', function ($scope, $uibModalInstance, allZones) {
  //Get zones and push to fronted.
  allZones().success(function(response){
      $scope.zones = response.result;
  });
  $scope.saveSettings = function(saveId){
    $uibModalInstance.close(saveId);
  };

});

//Controller for the device settings modal
app.controller('deviceSettings', function ($scope, $uibModalInstance, thisdevice, setDevice) {
// Get the device from the main controller.

$scope.thisdevice = thisdevice;
$scope.isNumber = angular.isNumber;
$scope.setDimLevel = _.debounce(function(rangeValue) {
  setDevice.dim(thisdevice.id, parseFloat($scope.thisdevice.state.dim));
},300);
});




//Bootstrap angular to load config file
angular.element(document).ready(
    function() {
        var initInjector = angular.injector(['ng']);
        var $http = initInjector.get('$http');
        $http.get('config.json').then(
            function (response) {
               var config = response.data;
               // Add additional services/constants/variables to your app,
               // and then finally bootstrap it:
               config.httpconfig = {headers: {"Authorization": "Bearer "+response.data.homey_api, "Content-Type": "application/json"}};
               config.homey_ip = response.data.homey_ip;
               app.constant('CONFIG', config);
               console.log(config);
               angular.bootstrap(document, ['homeydash']);
            }
        );
    }
);
