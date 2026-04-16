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

 angular.module('myApp.location', ['ngRoute'])
 
 .config(['$routeProvider', function($routeProvider) {
   $routeProvider.when('/location/:carId', {
     templateUrl: 'location/location.html',
     controller: 'locationCtrl'
   })
  .when('/success', {
    templateUrl: 'location/success.html',
    controller: 'successCtrl',
    resolve: {
      rentalData: function($rootScope) {
        return $rootScope.rentalData;
      }
    }
  });
 }])
 
 
 .controller('locationCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
   $scope.rentLocation = function() {
    var clientNumero = $scope.client.Numero;
    var voitureNumero = $scope.car.numero;
    var startDate = $scope.startDate;
    var startTime = $scope.startTime;
    var startKilometers = $scope.startKilometers;
    var endDate = $scope.endDate;
    var endTime = $scope.endTime;
 
     var rentalData = {
      clientNumero: clientNumero,
      voitureNumero: voitureNumero,
      startDate: startDate,
      startTime: startTime,
      startKilometers: startKilometers,
      endDate: endDate,
      endTime: endTime
     };
     if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
     // Check if the voiture is available for the specified rental period
         // Check if the voiture is available for the specified rental period
    firebase.firestore().collection('locations')
    .where('voitureNumero', '==', voitureNumero)
    .where('endDate', '>', startDate)
    .get()
    .then(function(querySnapshot) {
      if (querySnapshot.empty) {
        // No conflicting rentals found, proceed with the rental
        firebase.firestore().collection('locations').add(rentalData)
          .then(function(docRef) {
            console.log('Location rented with ID: ', docRef.id);

            // Complete the rental process
            if ($scope.paymentType === 'carte') {
              // Process credit card payment
              var cardNumber = $scope.cardNumber;
              var cardName = $scope.cardName;
              var cardExpiration = $scope.cardExpiration;

              // Perform payment processing here
              // ...

              // Assuming payment is successful, update the rental status
              firebase.firestore().collection('locations').doc(docRef.id).update({ status: 'rented' })
                .then(function() {
                  console.log('Rental process completed successfully');
                  $location.path('/success');
                })
                .catch(function(error) {
                  console.error('Error updating rental status: ', error);
                });
            } else {
              // For cheque payment, directly update the rental status
              firebase.firestore().collection('locations').doc(docRef.id).update({ status: 'rented' })
                .then(function() {
                  console.log('Rental process completed successfully');
                  $location.path('/success');
                })
                .catch(function(error) {
                  console.error('Error updating rental status: ', error);
                });
            }
          })
          
          .catch(function(error) {
            console.error('Error renting location: ', error);
          });
      } else {
        // Conflicting rental found, display an error message
        console.error('This voiture is already rented for the specified period.');
      }
    })
    .catch(function(error) {
      console.error('Error checking voiture availability: ', error);
    });

    // Assuming the rental process is successful, store the rental data in $rootScope
    $rootScope.rentalData = rentalData;

    // Navigate to the success page
    $location.path('/success');
};
}])
.controller('successCtrl', ['$scope', 'rentalData', function($scope, rentalData) {
  $scope.rentalData = rentalData;
}])