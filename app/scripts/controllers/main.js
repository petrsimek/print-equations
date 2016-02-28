'use strict';

/**
 * @ngdoc function
 * @name printEquationsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the printEquationsApp
 */
angular.module('printEquationsApp')
  .controller('MainCtrl', mainCtrl);

mainCtrl.$inject = [
  '$scope', 'EquationService'
];

function mainCtrl($scope, EquationService) {
  $scope.totalEquations = 60;
  $scope.minResult = 0;
  $scope.maxResult = 10;
  $scope.evalLimit = 5;

  $scope.getEquations = function() {
    $scope.equationsList = EquationService.getEquations($scope.minResult, $scope.maxResult, $scope.evalLimit, $scope.totalEquations);
  }
}
