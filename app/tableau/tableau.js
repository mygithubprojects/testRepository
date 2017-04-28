
// Le controleur lié au tableau
'use strict';

angular.module('modTableau', [
               'ngTouch', 'ui.grid', 'ui.grid.cellNav', 
               'ui.grid.edit', 'ui.grid.resizeColumns', 
               'ui.grid.pinning', 'ui.grid.selection', 
               'ui.grid.moveColumns', 'ui.grid.exporter', 'ui.grid.importer', 
               'ui.grid.grouping'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/tableau', {
      templateUrl: 'tableau/tableau.html',
      controller: 'TableauCtrl'
    });
  }])
  .controller('TableauCtrl', 
        ['$scope', '$http', '$timeout', 
        '$interval', 'uiGridConstants', 'uiGridGroupingConstants',
 
 function ($scope, $http, $timeout, $interval, uiGridConstants, uiGridGroupingConstants) {

   var gridApi;
 
  $scope.gridOptions = {
    data: 'myData',
    enableCellEditOnFocus: true,
    enableColumnResizing: true,
    enableFiltering: true,
    enableGridMenu: true,
    showGridFooter: true,
    showColumnFooter: true,
    fastWatch: true,
    rowIdentity: getRowId,
    getRowIdentity: getRowId,
    importerDataAddCallback: function importerDataAddCallback( grid, newObjects ) {
      $scope.myData = $scope.data.concat( newObjects );
    },
    columnDefs: [
      { name:'id', width:50 },
      { name:'ChampA', width:100 },
      { name:'ChampB', width:100},
      { name:'ChampC', width:100 },
      { name:'ChampD', width:100 },
      { name:'indicateur1', width:150 },
      { name:'Modif1', width:150 },
      { name:'indicateur2', width:150 },
      { name:'Modif2', width:150 }
    ],
    onRegisterApi: function onRegisterApi(registeredApi) {
      gridApi = registeredApi;
    }
  };
 
  function getRowId(row) {
    return row.id;
  }
 
  $scope.toggleFilterRow = function() {
    $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
    gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
  };
 
  $scope.callsPending = 0;
 
  var i = 0;
  $scope.refreshData = function(){
    $scope.myData = [];
 
    var start = new Date();
    var sec = $interval(function () {
      $scope.callsPending++;
 
      $http.get('/data/tableau.json')
        .success(function(data) {
          $scope.callsPending--;
 
          data.forEach(function(row){
            row.id = i;
            i++;
            row.registered = new Date(row.registered)
            $scope.myData.push(row);
          });
        })
        .error(function() {
          $scope.callsPending--
        });
    }, 200, 10);
 
 
    var timeout = $timeout(function() {
       $interval.cancel(sec);
       $scope.left = '';
    }, 2000);
 
    $scope.$on('$destroy', function(){
      $timeout.cancel(timeout);
      $interval.cancel(sec);
    });
  };

      $scope.refreshData();

  }]);    