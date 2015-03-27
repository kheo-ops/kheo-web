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

  it('should filter properties function of plugin', function() {
    $httpBackend.flush();
    scope.filterPluginProperties(scope.plugins[0]);
    expect(scope.pluginProperties.length).toBe(3);
  });

  it('should filter keys to exclude type $$hashKey key and @kheo-type', function() {
    $httpBackend.flush();
    var filtered = scope.getKeys(scope.pluginProperties[0]);
    expect(filtered.hasOwnProperty('type')).toBe(false);
    expect(filtered.hasOwnProperty('@kheo-type')).toBe(false);
    expect(filtered.hasOwnProperty('$$hashKey')).toBe(false);
  });

  it('should give string value for a plugin property', function() {
    $httpBackend.flush();    
    var stringValue = scope.stringValue(scope.server.serverProperties[0]);
    expect(stringValue).toBe('key=logo, description=logo');
  });

});