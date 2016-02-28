angular
  .module('printEquationsApp')
  .directive('equationsList', equationsList);

equationsList.$inject = [];

function equationsList() {
  return {
    restrict: 'E',
    scope: {
      list: '='
    },
    templateUrl: 'scripts/directives/equations-list.html',
    link: function(scope) {
      scope.$watch("list", function() {
        var cnt = 1;
        var groups = [];
        var temp = [];
        angular.forEach(scope.list,function (value, key) {
          temp.push(value);
          if (cnt % 5 === 0) {
            groups.push(temp);
            temp = [];
          }
          cnt++;
        });
        scope.groups = groups;
      });
    }
  };
}
