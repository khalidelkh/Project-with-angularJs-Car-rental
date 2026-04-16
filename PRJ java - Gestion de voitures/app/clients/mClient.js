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
  
  angular.module('myApp.editClient', ['ngRoute'])
  
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/editClient/:clientId', {
      templateUrl: 'clients/mClient.html',
      controller: 'editClientCtrl',
      resolve: {
        clientData: function($q, $route) {
          var deferred = $q.defer();
          var clientId = $route.current.params.clientId;
          
         
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
 
          firebase.firestore().collection('clients').doc(clientId).get()
            .then(function(doc) {
              if (doc.exists) {
                var client = { id: doc.id, ...doc.data() };
                deferred.resolve(client);
              } else {
                deferred.reject(new Error('Client not found'));
              }
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
  
  .controller('editClientCtrl', ['$scope', 'clientData', function($scope, clientData) {
    $scope.client = clientData;
  
    $scope.editClient = function() {
      firebase.firestore().collection('clients').doc($scope.client.id).update($scope.client)
        .then(function() {
          console.log('Client edited successfully');
        })
        .catch(function(error) {
          console.error('Error editing client: ', error);
        });
    };
  }]);
  