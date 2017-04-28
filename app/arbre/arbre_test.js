'use strict';

describe('modArbre module', function() {

  beforeEach(module('modArbre'));

  describe('arbre controller', function(){

    it('L arbre est bien defni ....', inject(function($controller) {
      //spec body
      var arbreCtrl = $controller('arbreCtrl');
      alert("test  -----------");
      expect(arbreCtrl).toBeDefined();
    }));
  });
});



