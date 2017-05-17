
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
        showGridFooter: false,
        showColumnFooter: false,
        fastWatch: true,
        rowIdentity: getRowId,
        getRowIdentity: getRowId,
        importerDataAddCallback: function importerDataAddCallback(grid, newObjects) {
          $scope.myData = $scope.data.concat(newObjects);
        },
        columnDefs: [
          { name: 'id', width: 50, cellEditableCondition: false },
          { name: 'ChampA', width: 85, cellEditableCondition: false },
          { name: 'ChampB', width: 85, cellEditableCondition: false },
          { name: 'ChampC', width: 85, cellEditableCondition: false },
          { name: 'ChampD', width: 85, cellEditableCondition: false },
          { name: 'indicateur1', width: 90, cellEditableCondition: false },
          { name: 'Modif1', width: 85 },
          { name: 'indicateur2', width: 90, cellEditableCondition: false },
          { name: 'Modif2', width: 90 }
        ],
        onRegisterApi: function onRegisterApi(registeredApi) {
          gridApi = registeredApi;
        }
      };

      function getRowId(row) {
        return row.id;
      }

      $scope.toggleFilterRow = function () {
        $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
        gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
      };

      $scope.callsPending = 0;

      var i = 1;
      $scope.refreshData = function () {
        $scope.myData = [];

        var start = new Date();
        var sec = $interval(function () {
          $scope.callsPending++;

          $http.get('/data/tableau.json')
            .success(function (data) {
              $scope.callsPending--;

              data.forEach(function (row) {
                row.id = i;
                i++;
                row.registered = new Date(row.registered)
                $scope.myData.push(row);
              });
            })
            .error(function () {
              $scope.callsPending--
            });
        }, 200, 10);


        var timeout = $timeout(function () {
          $interval.cancel(sec);
          $scope.left = '';
        }, 250); // TODO : pourquoi il affiche 63 éléments ? au lieu de 7 

        $scope.$on('$destroy', function () {
          $timeout.cancel(timeout);
          $interval.cancel(sec);
        });
      };

      $scope.refreshData();


      // Sauvegarde des modifications
      $scope.hitoriques = [];
      function myElement(modifcation) {
        this.modifcation = modifcation;
      }

      $scope.valueModif = undefined;
      $scope.gridOptions.onRegisterApi = function (gridApi) {
      $scope.gridApi = gridApi;

        gridApi.edit.on.afterCellEdit($scope, function (row,colDef) {
          if (colDef.name == "Modif1") {
            $scope.valueModif = " id=" + row.id + " modif 1=" + row.Modif1 + " indicateur1=" + row.indicateur1;
          }
          else {
            $scope.valueModif = " id=" + row.id + " modif 2=" + row.Modif2 + " indicateur2=" + row.indicateur2;
          }
          $scope.hitoriques.push(new myElement($scope.valueModif));
        })
      }

      // Afficher l'histrique des modifcations dans une zone de text  
      $scope.historiqueModifications = function () {
        var zoneText = document.getElementById("historique");

        if ($scope.hitoriques.length == 0) {
          $scope.noModif();

        } else {
          $scope.showError = false;
          $scope.doFade = false;
          
          $scope.infoModif();
          zoneText.style.display = "block";
        }
      };

      // Affichage d'un bandeau qui disparaîtra au bout de 10 secondes 
      // dans le cas ou il y'a pas eu de modifications 

      $scope.showError = false;
      $scope.doFade = false;

      $scope.noModif = function () {

        //reset
        $scope.showError = false;
        $scope.doFade = false;

        $scope.showError = true;

        $scope.errorMessage = 'Il n\'y a pas eu de modifcations!';

        $timeout(function () {
          $scope.doFade = true;
        }, 5000);
      };
    
      // Affichage d'un bandeau qui disparaîtra au bout de 10 secondes 
      // dans le cas ou il y eu de modifications 

      $scope.showInfo = false;
      $scope.doInfoFade = false;

      $scope.infoModif = function () {

        //reset
        $scope.showInfo = false;
        $scope.doInfoFade = false;

        $scope.showInfo = true;

        $scope.infoMessage = 'Des modifciations on été apportées au tanleau de données';

        $timeout(function () {
          $scope.doInfoFade = true;
        }, 5000);
      };

    }]);




