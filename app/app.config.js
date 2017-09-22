'use strict';

angular.
module('tpAngular').
config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/basic-tree', {
            controller: 'treeCtrl',
            templateUrl: 'basic/basic-tree.html'
            })
            
        .otherwise('/tableau');
    }
]);




