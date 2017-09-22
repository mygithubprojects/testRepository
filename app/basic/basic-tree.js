'use strict';

angular.module('modBasicTree', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/basic-tree', {
    templateUrl: 'basic/basic-tree.html',
    controller: 'treeCtrl'
  });
}])

.controller('treeCtrl', ['$scope', function ($scope) {
           
    $scope.remove = function (scope) {
        scope.remove();
      };

      $scope.toggle = function (scope) {
        scope.toggle();
      };

      $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
      };

      $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
          nodes: []
        });
      };

      $scope.collapseAll = function () {
        $scope.$broadcast('angular-ui-tree:collapse-all');
      };

      $scope.expandAll = function () {
        $scope.$broadcast('angular-ui-tree:expand-all');
      };

      $scope.data = [{
        'id': 1,
        'title': 'A',
        'nodes': [
          {
            'id': 11,
            'title': 'A1',
            'nodes': []
          },
          {
            'id': 12,
            'title': 'A2',
            'nodes': []
          },
          {
            'id': 13,
            'title': 'A3',
            'nodes': []
          },
          {
            'id': 14,
            'title': 'A4',
            'nodes': []
          },
          {
            'id': 15,
            'title': 'A5',
            'nodes': []
          }

        ]
      }, {
        'id': 2,
        'title': 'B',
        'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
        'nodes': [
          {
            'id': 21,
            'title': 'TEST',
            'nodes': []
          },
          {
            'id': 22,
            'title': 'ABC',
            'nodes': []
          },
          {
            'id': 23,
            'title': 'VRT',
            'nodes': []
          },
          {
            'id': 24,
            'title': 'B4',
            'nodes': []
          }
        ]
      }, {
        'id': 3,
        'title': 'C',
        'nodes': [
          {
            'id': 31,
            'title': 'C1',
            'nodes': []
          },
          {
            'id': 32,
            'title': 'C2',
            'nodes': []
          },
          {
            'id': 33,
            'title': 'C3',
            'nodes': []
          }

        ]
      }, {
        'id': 4,
        'title': 'D',
        'nodes': [
          {
            'id': 41,
            'title': 'D1',
            'nodes': []
          },
          {
            'id': 42,
            'title': 'D2',
            'nodes': []
          },
          {
            'id': 43,
            'title': 'D3',
            'nodes': []
          }

        ]
      }
    ];

      

}]);