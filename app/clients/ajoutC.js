'use strict';

angular.module('monApplication.addClient', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addClient', {
    templateUrl: 'clients/ajoutC.html',
    controller: 'addClientCtrl'
  });
}])

.controller('addClientCtrl', ['$scope', function($scope) {
  $scope.client = {
    nom: '',
    prenom: '',
    Numero: '',
    adresse: ''
  };

  $scope.addClient = function() {
    firebase.firestore().collection('clients').add($scope.client)
      .then(function(docRef) {
        console.log('Client added with ID: ', docRef.id);
        $scope.client = { nom: '', prenom: '', Numero: '', adresse: '' };
        $scope.$apply();
      })
      .catch(function(error) {
        console.error('Error adding client: ', error);
        $scope.$apply();
      });
  };
}]);