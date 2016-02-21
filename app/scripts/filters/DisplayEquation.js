angular
        .module('printEquationsApp')
        .filter('displayEquation', displayEquation);

displayEquation.$inject = ['EquationService'];

function displayEquation(EquationService) {
    return function(equation) {
      console.log("DISPL",equation,EquationService.formatEquation(equation));
      return EquationService.formatEquation(equation);
    };
}
