angular.module('monApplication.garage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/garage', {
    templateUrl: 'garage/garage.html',
    controller: 'garageCtrl'
  });
}])

.controller('garageCtrl', ['$scope', function($scope) {
  $scope.voitures = [];
  $scope.locations = [];
  $scope.loading = true;

  // Charger toutes les voitures
  firebase.firestore().collection('cars').get()
    .then(function(snapshot) {
      var voitures = [];
      snapshot.forEach(function(doc) {
        voitures.push({ id: doc.id, ...doc.data() });
      });

      // Charger les locations actives
      firebase.firestore().collection('locations')
        .where('status', '==', 'rented')
        .get()
        .then(function(locSnapshot) {
          var locationsActives = [];
          locSnapshot.forEach(function(doc) {
            locationsActives.push(doc.data());
          });

          // Marquer chaque voiture comme disponible ou louée
          voitures.forEach(function(v) {
            var enLocation = locationsActives.find(function(l) {
              return l.voitureNumero == v.numero;
            });
            if (enLocation) {
             
              if (enLocation.startDate && enLocation.startDate.seconds) {
                enLocation.startDate = new Date(enLocation.startDate.seconds * 1000).toLocaleDateString('fr-FR');
              }
              if (enLocation.endDate && enLocation.endDate.seconds) {
                enLocation.endDate = new Date(enLocation.endDate.seconds * 1000).toLocaleDateString('fr-FR');
              }
            }
            v.statut = enLocation ? 'loue' : 'disponible';
            v.locationInfo = enLocation || null;
          });

          $scope.voitures = voitures;
          $scope.loading = false;
          $scope.$apply();
        });
    })
    .catch(function(err) {
      console.error(err);
      $scope.loading = false;
      $scope.$apply();
    });

  $scope.getNbDisponibles = function() {
    return $scope.voitures.filter(function(v) { return v.statut === 'disponible'; }).length;
  };

  $scope.getNbLouees = function() {
    return $scope.voitures.filter(function(v) { return v.statut === 'loue'; }).length;
  };
}]);