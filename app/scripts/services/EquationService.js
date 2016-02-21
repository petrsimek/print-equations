angular
  .module('printEquationsApp')
  .factory('EquationService', equationService);

equationService.$inject = [];

function equationService() {
  return {
    formatEquation: formatEquation,
    getEquations: getEquations
  };

  function formatEquations(equations) {
    var results = [];
    for (var i = 0; i < equations.length; i++) {
      results.push(formatEquation(equations[i]));
    }
    console.log(results);
    return results;
  }

  function formatEquation(equation) {
    var sign = '';
    if (equation.type === 'A') {
      sign = '+';
    }
    else {
      sign = '-';
    }
    return '<span class="eq-first">' + equation.first + '</span><span class="eq-action">' + sign + '</span><span class="eq-second">' + equation.second + '</span><span class="eq-eq">=</span><span class="eq-result">&nbsp;</span>';
  }


  function getEquations(total, minResult, maxResult) {
    var types = ['A', 'S'];
    var results = [];
    for (var i = 0; i < total; i++) {
      var chooseType = types[getRandomInt(0,1)];
      if (chooseType === 'A') {
        results.push(generateEquationAddition(minResult, maxResult));
      }
      else {
        results.push(generateEquationSubtraction(minResult, maxResult));
      }
    }
    console.log(results);
    return results;
  }

  function generateEquationAddition(minResult, maxResult) {
    var first = getRandomInt(minResult, maxResult);
    var second = getRandomInt(minResult, maxResult - first);
    return {type: 'A', first: first, second: second};
  }

  function generateEquationSubtraction(minResult, maxResult) {
    var first = getRandomInt(minResult, maxResult);
    var second = getRandomInt(minResult, first);
    return {type: 'S', first: first, second: second};
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
