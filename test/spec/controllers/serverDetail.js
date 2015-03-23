'use strict';

describe('Controller: ServerDetailCtrl', function () {
  var $httpBackend, $rootScope, $resource, configuration, $controller, _, ServerDetailCtrl;
  var scope;

  // load the controller's module
  beforeEach(module('kheoApp'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $resource = $injector.get('$resource');
    $controller = $injector.get('$controller');
    configuration = $injector.get('configuration');
    _ = $injector.get('_');    

    scope = $rootScope.$new();
    ServerDetailCtrl = $controller('ServerDetailCtrl', {
      '$scope': scope,
      '$resource': $resource,
      '$routeParams': { hostname: 'myserver' },
      'configuration': configuration,
      '_': _
    });

    $httpBackend.when('GET', configuration.backend + '/servers/myserver').respond(200, readJSON('test/mock/serverDetail.json'));
    $httpBackend.when('GET', configuration.backend + '/plugins').respond(200, readJSON('test/mock/plugins.json'));
  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it('should retrieve plugins and server on initialization', function () {
    $httpBackend.expectGET(configuration.backend + '/servers/myserver');
    $httpBackend.expectGET(configuration.backend + '/plugins');
    $httpBackend.flush();
  });
});