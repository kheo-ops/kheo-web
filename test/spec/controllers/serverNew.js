'use strict';

describe('Controller: ServerNewCtrl', function () {

  // load the controller's module
  beforeEach(module('kheoApp'));

  var ServernewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServernewCtrl = $controller('ServerNewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {    
  });
});
