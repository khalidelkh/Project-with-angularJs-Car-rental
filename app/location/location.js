'use strict';

angular.module('monApplication.location', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/location/:carId', {
    templateUrl: 'location/location.html',
    controller: 'locationCtrl'
  }).when('/location', {
    templateUrl: 'location/location.html',
    controller: 'locationCtrl'
  });
}])

.controller('locationCtrl', ['$scope', '$location', '$rootScope', '$route', function($scope, $location, $rootScope, $route) {
  $scope.paymentType = 'cheque';
  $scope.car = {};
  $scope.client = {};

  var carId = $route.current.params.carId;
  if (carId) {
    firebase.firestore().collection('cars').doc(carId).get()
      .then(function(doc) {
        if (doc.exists) {
          $scope.car = { id: doc.id, ...doc.data() };
          $scope.$apply();
        }
      })
      .catch(function(err) {
        console.error('Erreur chargement voiture:', err);
      });
  }

  // دالة تحويل date لـ string مقروء
  function formatDate(val) {
    if (!val) return '';
    var d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString('fr-FR');
  }

  // دالة تحويل time لـ string مقروء
  function formatTime(val) {
    if (!val) return '';
    var d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  $scope.rentLocation = function() {
    var rentalData = {
      clientNumero: $scope.client.Numero,
      voitureNumero: $scope.car.numero,
      startDate: formatDate($scope.startDate),
      startTime: formatTime($scope.startTime),
      startKilometers: $scope.startKilometers,
      endDate: formatDate($scope.endDate),
      endTime: formatTime($scope.endTime)
    };

    firebase.firestore().collection('locations')
      .where('voitureNumero', '==', rentalData.voitureNumero)
      .where('endDate', '>', rentalData.startDate)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
          firebase.firestore().collection('locations').add(rentalData)
            .then(function(docRef) {
              console.log('Location rented with ID: ', docRef.id);
              firebase.firestore().collection('locations').doc(docRef.id).update({ status: 'rented' })
                .then(function() {
                  $rootScope.rentalData = rentalData;
                  $location.path('/success');
                  $scope.$apply();
                });
            })
            .catch(function(error) {
              console.error('Error renting location: ', error);
            });
        } else {
          alert('Cette voiture est déjà louée pour cette période!');
        }
      })
      .catch(function(error) {
        console.error('Error checking voiture availability: ', error);
      });
  };
}]);