'use strict';

angular.module('monApplication.addCar', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addCar', {
    templateUrl: 'voiture/ajoutV.html',
    controller: 'addCarCtrl'
  });
}])

.controller('addCarCtrl', ['$scope', function($scope) {
  $scope.car = {
    numero: '',
    type: '',
    marque: '',
    modele: '',
    puissance: ''
  };

  $scope.addCar = function() {
    firebase.firestore().collection('cars').add($scope.car)
      .then(function(docRef) {
        console.log('Car added with ID: ', docRef.id);
        $scope.car = { numero: '', type: '', marque: '', modele: '', puissance: '' };
        $scope.$apply();
      })
      .catch(function(error) {
        console.error('Error adding car: ', error);
        $scope.$apply();
      });
  };
}]);