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

angular.module('myApp.addClient', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addClient', {
    templateUrl: 'clients/ajoutC.html',
    controller: 'addClientCtrl'
  });
}])

.controller('addClientCtrl', ['$scope',function($scope) {
  $scope.client = {
    nom: '',
    prenom: '',
    Numero: '',
    adresse: ''
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var firestore = firebase.firestore();
$scope.addClient = function() {
    firestore.collection('clients').add($scope.client)
    .then(function(docRef) {
        console.log('Client added with ID: ', docRef.id);
        $scope.client = {
            nom: '',
            prenom: '',
            Numero: '',
            adresse: ''
        };
        $scope.$apply();
    })
    .catch(function(error) {
        console.error('Error adding client: ', error);
        $scope.$apply();
    });}

}]);