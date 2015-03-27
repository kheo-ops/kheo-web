'use strict';

describe('Controller: ServerEditCtrl', function () {
  var $httpBackend, $rootScope, $resource, configuration, $controller, _, ServerEditCtrl;
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
    ServerEditCtrl = $controller('ServerEditCtrl', {
      '$scope': scope,
      '$resource': $resource,
      '$routeParams': { hostname: 'localhost' },
      'configuration': configuration,
      '_': _
    });

    $httpBackend.when('GET', configuration.backend + '/servers/localhost').respond(200, readJSON('test/mock/serverDetail.json'));
  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it('should retrieve server on initialization', function () {
    $httpBackend.expectGET(configuration.backend + '/servers/localhost');
    $httpBackend.flush();
  });

  it('should not save server if it is undefined', function () {
    $httpBackend.expectGET(configuration.backend + '/servers/localhost');
    scope.server = undefined;
    scope.save();    
    $httpBackend.flush();
  });

  it('should save server if it is defined', function () {
    $httpBackend.expectGET(configuration.backend + '/servers/localhost');
    $httpBackend.when('PUT', configuration.backend + '/servers/localhost').respond(200);
    $httpBackend.expectPUT(configuration.backend + '/servers/localhost');
    
    scope.server = readJSON('test/mock/sampleServer.json');
    scope.save();
    $httpBackend.flush();
  });

  it('should empty eventLog and serverProperties before saving a server', function () {
    $httpBackend.expectGET(configuration.backend + '/servers/localhost');
    $httpBackend.when('PUT', configuration.backend + '/servers/localhost').respond(200);
    $httpBackend.expectPUT(configuration.backend + '/servers/localhost');
    
    scope.server = readJSON('test/mock/sampleServer.json');
    scope.save();

    expect(scope.server.eventLog.length).toBe(0);
    expect(scope.server.serverProperties.length).toBe(0);
    $httpBackend.flush();
  });

  it('should filter type hashkey and key fields from properties to display', function () {
    $httpBackend.expectGET(configuration.backend + '/servers/localhost');
    $httpBackend.flush();

    var property = {
      'foo': 'bar',
      'type': 'type',
      '$$hashKey': 'foobar',
      'key': 'key'
    };
    
    var result = scope.getKeys(property);
    expect(result.length).toBe(1);
    expect(result[0]).toBe('foo');
  });
});
