'use strict';

// Test du composant tableau
describe('Tableau : Test ', function () {
    beforeEach(function () {
        module('modTableau', [
               'ngTouch', 'ui.grid', 'ui.grid.cellNav', 
               'ui.grid.edit', 'ui.grid.resizeColumns', 
               'ui.grid.pinning', 'ui.grid.selection', 
               'ui.grid.moveColumns', 'ui.grid.exporter', 'ui.grid.importer', 
               'ui.grid.grouping']);
    });

    var controller, scope;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('TableauCtrl', {
            $scope: scope
        });
    }));

    it('initialistaion controlleur', function () {
        expect(controller).toBeDefined();
    });
});