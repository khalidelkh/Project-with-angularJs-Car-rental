'use strict';

angular.module('monApplication.editClient', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/editClient/:clientId', {
    templateUrl: 'clients/mClient.html',
    controller: 'editClientCtrl',
    resolve: {
      clientData: function($q, $route) {
        var deferred = $q.defer();
        var clientId = $route.current.params.clientId;
        firebase.firestore().collection('clients').doc(clientId).get()
          .then(function(doc) {
            if (doc.exists) {
              deferred.resolve({ id: doc.id, ...doc.data() });
            } else {
              deferred.reject(new Error('Client not found'));
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