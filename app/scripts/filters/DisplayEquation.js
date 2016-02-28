angular
        .module('printEquationsApp')
        .filter('displayEquation', displayEquation);

displayEquation.$inject = ['EquationService'];

function displayEquation(EquationService) {
    return function(equation) {
      return EquationService.formatEquation(equation);
    };
}
