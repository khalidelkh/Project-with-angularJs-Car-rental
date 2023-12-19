var firebaseConfig = {
  apiKey: "AIzaSyCjkTQRw3cZavjc9AhX6O1tROlxyslTbXI",
  authDomain: "gestion-de-pharmacie-6a188.firebaseapp.com",
  projectId: "gestion-de-pharmacie-6a188",
  storageBucket: "gestion-de-pharmacie-6a188.appspot.com",
  messagingSenderId: "953207736253",
  appId: "1:953207736253:web:26f563699f0f28acc9b4d4",
  measurementId: "G-FJEJ36FJPH"
};
'use strict';
angular.module('myApp', ['firebase']);
angular.module('myApp', [
  'ngRoute',
  'myApp.cars',
  'myApp.clients',
  'myApp.garage',
  'myApp.addCar',
  'myApp.addClient',
  'myApp.editCar',
  'myApp.editClient',
  'myApp.location',


  

 

]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/cars'});
}]);