'use strict';

angular.module('monApplication.success', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/success', {
    templateUrl: 'location/success.html',
    controller: 'successCtrl',
    resolve: {
      rentalData: function($rootScope) {
        return $rootScope.rentalData;
      }
    }
  });
}])

.controller('successCtrl', ['$scope', 'rentalData', function($scope, rentalData) {
  $scope.rentalData = rentalData || {};

  $scope.generatePDF = function() {
    // تحميل jsPDF ديناميكيا
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = function() {
      var data = $scope.rentalData;
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // Header
      doc.setFillColor(74, 111, 165);
      doc.rect(0, 0, 210, 35, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('CONTRAT DE LOCATION', 105, 18, { align: 'center' });
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Car Rental - Gestion de Voitures', 105, 28, { align: 'center' });

      // Date génération
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.text('Généré le: ' + new Date().toLocaleDateString('fr-FR'), 150, 45);

      // Ligne
      doc.setDrawColor(74, 111, 165);
      doc.setLineWidth(0.5);
      doc.line(20, 50, 190, 50);

      // Section Client
      doc.setTextColor(74, 111, 165);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('INFORMATIONS CLIENT', 20, 62);
      doc.setTextColor(50, 50, 50);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text('Numéro Client:', 20, 74);
      doc.setFont('helvetica', 'bold');
      doc.text(String(data.clientNumero || '-'), 80, 74);

      // Section Voiture
      doc.setTextColor(74, 111, 165);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('INFORMATIONS VOITURE', 20, 92);
      doc.setTextColor(50, 50, 50);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.text('Numéro Voiture:', 20, 104);
      doc.setFont('helvetica', 'bold');
      doc.text(String(data.voitureNumero || '-'), 80, 104);

      // Section Période
      doc.setTextColor(74, 111, 165);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('PÉRIODE DE LOCATION', 20, 122);

      var rows = [
        ['Date début:', data.startDate || '-'],
        ['Heure début:', data.startTime || '-'],
        ['Kilométrage début:', (data.startKilometers || '-') + ' km'],
        ['Date fin:', data.endDate || '-'],
        ['Heure fin:', data.endTime || '-'],
      ];

      var y = 134;
      rows.forEach(function(row) {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(50, 50, 50);
        doc.text(row[0], 20, y);
        doc.setFont('helvetica', 'bold');
        doc.text(String(row[1]), 80, y);
        y += 12;
      });

      // Signatures
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.3);
      doc.line(20, y + 20, 190, y + 20);
      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('Signature Client', 40, y + 30);
      doc.text('Signature Agence', 140, y + 30);
      doc.rect(20, y + 35, 70, 25);
      doc.rect(120, y + 35, 70, 25);

      // Footer
      doc.setFillColor(74, 111, 165);
      doc.rect(0, 280, 210, 17, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('Car Rental - Tous droits réservés', 105, 290, { align: 'center' });

      doc.save('contrat-location-' + (data.voitureNumero || 'X') + '.pdf');
    };

    // ila jsPDF deja محمول
    if (window.jspdf) {
      script.onload();
    } else {
      document.head.appendChild(script);
    }
  };
}]);