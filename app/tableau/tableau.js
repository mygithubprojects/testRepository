
// Le controleur lié au tableau

angular.module('modTableau', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tableau', {
    templateUrl: 'tableau/tableau.html',
    controller: 'TableauCtrl'
  });
}])

.controller('TableauCtrl', [function() {

}]);    