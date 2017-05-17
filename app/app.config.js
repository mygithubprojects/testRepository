'use strict';

angular.
    module('tpAngular').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider
                .when('/tableau', {
                    controller: 'TableauCtrl',
                    templateUrl: 'tableau/tableau.html'
                })
             .otherwise('/tableau');
        }
    ]);




