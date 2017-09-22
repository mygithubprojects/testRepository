'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('redirection automatique vers  /arbre si l url est vide', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/arbre");
  });


  describe('arbre', function() {

    beforeEach(function() {
      browser.get('index.html#!/arbre');
    });


    it('ouverture de  /arbre', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for arbre/);
    });

  });


  describe('tableau', function() {

    beforeEach(function() {
      browser.get('index.html#!/tableau');
    });


    it('ouverture de /tableau', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for tableau/);
    });

  });
});
