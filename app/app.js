var db = firebase.firestore();

angular.module('monApplication', [
  'ngRoute',
  'monApplication.cars',
  'monApplication.clients',
  'monApplication.garage',
  'monApplication.addCar',
  'monApplication.addClient',
  'monApplication.editCar',
  'monApplication.editClient',
  'monApplication.location',
  'monApplication.success'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/cars'});
}]);