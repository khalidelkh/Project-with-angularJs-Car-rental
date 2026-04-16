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

angular.module('myApp.addCar', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addCar', {
    templateUrl: 'voiture/ajoutV.html',
    controller: 'addCarCtrl'
  });
}])

.controller('addCarCtrl',[ '$scope',function($scope) {
  $scope.car = {
    numero: '',
    type: '',
    marque: '',
    modele: '',
    puissance:''
  };
 
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}



  $scope.addCar = function() {
    firebase.firestore().collection('cars').add($scope.car)
      .then(function(docRef) {
        console.log('Car added with ID: ', docRef.id);
        $scope.car = {
          numero: '',
          type: '',
          marque: '',
          modele: '',
          puissance:''
        };
        $scope.$apply();
      })
      .catch(function(error) {
        console.error('Error adding car: ', error);
        $scope.$apply();
      });
  };
}]);