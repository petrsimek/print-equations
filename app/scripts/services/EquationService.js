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
      sign = '&minus;';
    }
    return '<span class="eq-first">' + equation.first + '</span><span class="eq-action">' + sign + '</span><span class="eq-second">' + equation.second + '</span><span class="eq-eq">=</span><span class="eq-result">&nbsp;</span>';
  }



  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   * Using Math.round() will give you a non-uniform distribution!
   */
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateAllEquations(minResult, maxResult, limitEval) {
    var result = {equationsA : [], equationsS : []};
    for (var i = minResult; i < maxResult; i++) {
      for (var j = minResult; j < maxResult; j++) {
        if (i + j <= maxResult) {
          var eq =  {type: 'A', first: i, second: j};
          eq.eval = evaluateEquation(eq, limitEval);
          result.equationsA.push(eq);
        }

        if (i - j > minResult) {
          var eq =  {type: 'S', first: i, second: j};
          eq.eval = evaluateEquation(eq, limitEval);
          result.equationsS.push(eq);
        }

      }
    }
    return {equationsA: shuffle(result.equationsA), equationsS: shuffle(result.equationsS)};
  }

  function getEquations(minResult, maxResult, limitEval, cntAll) {
    var eqSet = generateAllEquations(minResult, maxResult, limitEval);
    var sets = {'A': { 0 : [], 1 : [], 2 : []},'S': { 0 : [], 1 : [], 2 : []}};
    for (var i = 0; i < eqSet.equationsA.length; i++) {
      sets.A[evaluateEquation(eqSet.equationsA[i], limitEval)].push(eqSet.equationsA[i]);
    }
    for (i = 0; i < eqSet.equationsS.length; i++) {
      sets.S[evaluateEquation(eqSet.equationsS[i], limitEval)].push(eqSet.equationsS[i]);
    }
    var counts = {'A': { 0 : 0, 1 : 0, 2 : 0},'S': { 0 : 0, 1 : 0, 2 : 0}};
    var cnt = Math.round(cntAll / 2);
    counts.A[0] = Math.round(cnt * 0.1);
    counts.A[1] = Math.round(cnt * 0.4);
    counts.A[2] = cnt - counts.A[0] -  counts.A[1];
    counts.S[0] = Math.round(cnt * 0.1);
    counts.S[1] = Math.round(cnt * 0.4);
    counts.S[2] = cntAll - counts.A[0] - counts.A[1] - counts.A[2]  - counts.S[0] - counts.S[1];

    var result = [];
    var subresult = extractListFromSet(sets.A[2], counts.A[2]);
    counts.A[1]+=counts.A[2]-subresult.length;
    result = result.concat(subresult);

    subresult = extractListFromSet(sets.A[1], counts.A[1]);
    counts.A[0]+=counts.A[1]-subresult.length;
    result = result.concat(subresult);

    subresult = extractListFromSet(sets.A[0], counts.A[0]);
    result = result.concat(subresult);

    subresult = extractListFromSet(sets.S[2], counts.S[2]);
    counts.S[1]+=counts.S[2]-subresult.length;
    result = result.concat(subresult);

    subresult = extractListFromSet(sets.S[1], counts.S[1]);
    counts.S[0]+=counts.S[1]-subresult.length;
    result = result.concat(subresult);

    subresult = extractListFromSet(sets.S[0], counts.S[0]);
    result = result.concat(subresult);

    return shuffle(result);
  }

  function extractListFromSet(subset,count) {
    var target = [];
    if (subset.length<count) {
      for (i = 0; i < subset.length; i++) {
        target.push(subset[i]);
      }
    }
    else {
      for (i = 0; i < count; i++) {
        target.push(subset[i]);
      }
    }
    return target;
  }

  function evaluateEquation(equation, limit) {
    var evaluation = 0;
    if (equation.first > limit) {
      evaluation++;
    }
    if (equation.second > limit) {
      evaluation++;
    }
    return evaluation;
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
