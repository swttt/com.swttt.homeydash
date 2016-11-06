angular.module('homeydash')
  .controller('MainCtrl', function ($scope, $cookies) {
    $scope.token = $cookies.get('bearer_token');
  });
