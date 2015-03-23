'use strict';

describe('Controller: ServerNewCtrl', function () {
  var $httpBackend, $rootScope, $resource, configuration, $controller, $location, _, ServerNewCtrl;
  var scope;

  // load the controller's module
  beforeEach(module('kheoApp'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $resource = $injector.get('$resource');
    $controller = $injector.get('$controller');
    $location = $injector.get('$location');
    configuration = $injector.get('configuration');
    _ = $injector.get('_');

    scope = $rootScope.$new();    
    ServerNewCtrl = $controller('ServerNewCtrl', {
      '$scope': scope,
      '$resource': $resource,
      '$location': $location,
      'configuration': configuration,
      '_': _
    });
    
    $httpBackend.when('GET', configuration.backend + '/plugins').respond(200, readJSON('test/mock/plugins.json'));
  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it('should retrieve plugins on initialization', function () {
    $httpBackend.expectGET(configuration.backend + '/plugins');
    $httpBackend.flush();
  });

  it('should not save server if it is undefined', function () {
    $httpBackend.expectGET(configuration.backend + '/plugins');
    scope.save();
    $httpBackend.flush();
  });

  it('should save server if it is defined', function () {
    $httpBackend.expectGET(configuration.backend + '/plugins');
    $httpBackend.when('POST', configuration.backend + '/servers').respond(201);
    $httpBackend.expectPOST(configuration.backend + '/servers');
    
    scope.server = {
      'host': 'localhost',
      'sshPort': 22,
      'user': 'mikael',
      'password': 'pass',
      'privateKey': '',
      'sudo': true
    };
    scope.save();
    $httpBackend.flush();
  });

  it('should initialize a new server discovery settings with available plugins', function () {
    $httpBackend.expectGET(configuration.backend + '/plugins');
    
    scope.server = {
      'host': 'localhost',
      'sshPort': 22,
      'user': 'mikael',
      'password': 'pass',
      'privateKey': '',
      'sudo': true
    };

    $httpBackend.flush();
    scope.initSettings();
    
    expect(scope.server.discoverySettings).toBeDefined();
    expect(scope.server.discoverySettings.ServicePlugin).toBeDefined();
    expect(scope.server.discoverySettings.ServicePlugin).toBe(true);
    expect(scope.server.discoverySettings.NetworkInterfacePlugin).toBeDefined();
    expect(scope.server.discoverySettings.NetworkInterfacePlugin).toBe(true);
  });

it('should not initialize an existing server discovery settings with available plugins', function () {
    $httpBackend.expectGET(configuration.backend + '/plugins');
    
    scope.server = {
      'host': 'localhost',
      'sshPort': 22,
      'user': 'mikael',
      'password': 'pass',
      'privateKey': '',
      'sudo': true,
      'discoverySettings': { 'MyService': true }
    };

    $httpBackend.flush();
    scope.initSettings();
    
    expect(scope.server.discoverySettings).toBeDefined();
    expect(scope.server.discoverySettings.ServicePlugin).not.toBeDefined();
    expect(scope.server.discoverySettings.MyService).toBe(true);
  });

it('should filter type hashkey and key fields from properties to display', function () {
    $httpBackend.expectGET(configuration.backend + '/plugins');
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
