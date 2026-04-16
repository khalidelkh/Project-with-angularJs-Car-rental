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

angular.module('myApp.cars', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/cars', {
    templateUrl: 'voiture/voiture.html',
    controller: 'carsCtrl',
    resolve: {
      carData: function($q) {
        var deferred = $q.defer();
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        firebase.firestore().collection('cars').get()
          .then(function(querySnapshot) {
            var cars = [];
            querySnapshot.forEach(function(doc) {
              cars.push({ id: doc.id, ...doc.data() });
            });
            deferred.resolve(cars);
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

.controller('carsCtrl', ['$scope', 'carData', function($scope, carData) {
  $scope.cars = carData;

  $scope.deleteCar = function(car) {
    // Delete the car document from Firestore
    firebase.firestore().collection('cars').doc(car.id).delete()
      .then(function() {
        console.log('Car deleted successfully');
        // Remove the car from the cars array
        var index = $scope.cars.indexOf(car);
        if (index !== -1) {
          $scope.cars.splice(index, 1);
        }
      })
      .catch(function(error) {
        console.error('Error deleting car: ', error);
      });
  };
}]);
