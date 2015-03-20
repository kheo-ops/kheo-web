'use strict';

describe('Controller: ServerListCtrl', function () {
  var $httpBackend, $rootScope, $resource, configuration, $controller, ServerListCtrl;
  var scope;

  // load the controller's module
  beforeEach(module('kheoApp'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $resource = $injector.get('$resource');    
    $controller = $injector.get('$controller');
    configuration = $injector.get('configuration');    

    scope = $rootScope.$new();    
    ServerListCtrl = $controller('ServerListCtrl', {
      '$scope': scope,
      '$resource': $resource,
      'configuration': configuration
    });    
  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it('should retrieve servers on initialization', function () {

    var mockData = [{
        'id': '78ce12f4-c378-4afb-b3ea-d2a2b886652b',
        'host': 'localhost',
        'sshPort': 22,
        'user': 'mikael',
        'password': 'pass',
        'privateKey': '',
        'sudo': true,
        'sshConnectionValidity': true,
        'state': 'READY'
    }];

    $httpBackend.when('GET', configuration.backend + '/servers').respond(200, mockData);
    $httpBackend.expectGET(configuration.backend + '/servers');
    $httpBackend.flush();

    expect(scope.servers.length).toBe(1);
    expect(scope.servers[0].id).toBe('78ce12f4-c378-4afb-b3ea-d2a2b886652b');
    expect(scope.servers[0].host).toBe('localhost');
    expect(scope.servers[0].sshPort).toBe(22);
    expect(scope.servers[0].user).toBe('mikael');
    expect(scope.servers[0].password).toBe('pass');
    expect(scope.servers[0].privateKey).toBe('');
    expect(scope.servers[0].sudo).toBe(true);
    expect(scope.servers[0].sshConnectionValidity).toBe(true);
    expect(scope.servers[0].state).toBe('READY');
  });

  it('should retrieve servers after deletion', function () {

    var mockData = [{
        'id': '78ce12f4-c378-4afb-b3ea-d2a2b886652b',
        'host': 'localhost',
        'sshPort': 22,
        'user': 'mikael',
        'password': 'pass',
        'privateKey': '',
        'sudo': true,
        'sshConnectionValidity': true,
        'state': 'READY'
    }];

    $httpBackend.when('GET', configuration.backend + '/servers').respond(200, mockData);
    $httpBackend.expectGET(configuration.backend + '/servers');

    $httpBackend.when('DELETE', configuration.backend + '/servers/myserver').respond(204);
    $httpBackend.expectDELETE(configuration.backend + '/servers/myserver');
    
    scope.delete('myserver');        
    $httpBackend.flush();    
  });

});
