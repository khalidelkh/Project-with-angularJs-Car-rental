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

angular.module('myApp.clients', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/clients', {
    templateUrl: 'clients/clients.html',
    controller: 'clientsCtrl',
    resolve: {
      clientData: function($q) {
        var deferred = $q.defer();
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        firebase.firestore().collection('clients').get()
          .then(function(querySnapshot) {
            var clients = [];
            querySnapshot.forEach(function(doc) {
              clients.push({ id: doc.id, ...doc.data() });
            });
            deferred.resolve(clients);
          })
          .catch(function(error) {
            console.error('Error fetching client data: ', error);
            deferred.reject(error);
          });
        return deferred.promise;
      }
    }
  });
}])

.controller('clientsCtrl', ['$scope', 'clientData', function($scope, clientData) {
  $scope.clients = clientData;

  $scope.deleteClient = function(client) {
    // Delete the client document from Firestore
    firebase.firestore().collection('clients').doc(client.id).delete()
      .then(function() {
        console.log('Client deleted successfully');
        // Remove the client from the clients array
        var index = $scope.clients.indexOf(client);
        if (index !== -1) {
          $scope.clients.splice(index, 1);
        }
      })
      .catch(function(error) {
        console.error('Error deleting client: ', error);
      });
  };
}]);
