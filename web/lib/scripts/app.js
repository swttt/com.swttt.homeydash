var app = angular.module('homeydash', ['ui.bootstrap', "ngStorage", "ngRoute", "hmTouchEvents", "angular.filter", "ngAnimate" ]);

// allow DI for use in controllers, unit tests
  app.constant('_', window._)
  // use in views, ng-repeat="x in _.range(3)"
  app.run(function ($rootScope, CONFIG) {
     $rootScope._ = window._;
     $rootScope.config = CONFIG;
  });

  app.config(function($routeProvider) {
         $routeProvider

             // route for the lights
             .when('/', {
                 templateUrl : 'pages/lights.html',
                 controller  : 'lightsController'
             })

     });

app.filter('capability', function() {
  return function(name) {

    switch( name ) {
      case 'alarm_motion':
        return 'Motion alarm';
        break;
      case 'alarm_tamper':
        return 'Tamper alarm';
        break;
      case 'measure_temperature':
        return 'Temperature';
        break;
      case 'measure_luminance':
        return 'Luminance';
        break;
      case 'measure_battery':
        return 'Battery';
        break;
      case 'alarm_co':
        return 'CO Alarm';
        break;
      case 'alarm_smoke':
        return 'Smoke alarm';
        break;
      case 'alarm_battery':
        return 'Battery alarm';
        break;
      case 'target_temperature':
        return 'Target temperature';
        break;
      case 'alarm_contact':
        return 'Contact alarm';
        break;
      default:
        return name;
        break;
    }

  }
});
app.filter('output', function() {
  return function(name) {

    switch( name ) {
      case 'measure_temperature':
        return '°c';
        break;
      case 'measure_luminance':
        return 'Lux';
        break;
      case 'measure_battery':
        return '%';
        break;
      case 'target_temperature':
        return '°c';
        break;
    }

  }
});
