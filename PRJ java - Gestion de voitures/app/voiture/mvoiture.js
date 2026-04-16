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

angular.module('myApp.editCar', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/editCar/:carId', {
    templateUrl: 'voiture/mvoiture.html',
    controller: 'editCarCtrl',
    resolve: {
      carData: function($q, $route) {
        var deferred = $q.defer();
        var carId = $route.current.params.carId;
        
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
 
        firebase.firestore().collection('cars').doc(carId).get()
          .then(function(doc) {
            if (doc.exists) {
              var car = { id: doc.id, ...doc.data() };
              deferred.resolve(car);
            } else {
              deferred.reject(new Error('Car not found'));
            }
          })
          .catch(function(error) {
            console.error('Error fetching car data: ', error);
            deferred.reject(error);
          });
        return deferred.promise;
      }
    }
  });
}])

.controller('editCarCtrl', ['$scope', 'carData', function($scope, carData) {
  $scope.car = carData;

  $scope.editCar = function() {
    firebase.firestore().collection('cars').doc($scope.car.id).update($scope.car)
      .then(function() {
        console.log('Car edited successfully');
      })
      .catch(function(error) {
        console.error('Error editing car: ', error);
      });
  };
}]);
