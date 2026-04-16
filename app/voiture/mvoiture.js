'use strict';

angular.module('monApplication.editCar', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/editCar/:carId', {
    templateUrl: 'voiture/mvoiture.html',
    controller: 'editCarCtrl',
    resolve: {
      carData: function($q, $route) {
        var deferred = $q.defer();
        var carId = $route.current.params.carId;
        firebase.firestore().collection('cars').doc(carId).get()
          .then(function(doc) {
            if (doc.exists) {
              deferred.resolve({ id: doc.id, ...doc.data() });
            } else {
              deferred.reject(new Error('Car not found'));
            }
          })
          .catch(function(error) {
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