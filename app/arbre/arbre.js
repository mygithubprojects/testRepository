'use strict';

angular.module('modArbre', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/arbre', {
    templateUrl: 'arbre/arbre.html',
    controller: 'arbreCtrl'
  });
}])

.controller('arbreCtrl', [function() {

}]);