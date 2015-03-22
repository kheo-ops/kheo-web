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
  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it('should retrieve plugins on initialization', function () {
    $httpBackend.when('GET', configuration.backend + '/plugins').respond(200, []);
    $httpBackend.expectGET(configuration.backend + '/plugins');
    $httpBackend.flush();
  });

  it('should not save server if it is undefined', function () {
    $httpBackend.when('GET', configuration.backend + '/plugins').respond(200, []);
    $httpBackend.expectGET(configuration.backend + '/plugins');
    
    scope.save();
    $httpBackend.flush();
  });

  it('should save server if it is defined', function () {    
    $httpBackend.when('GET', configuration.backend + '/plugins').respond(200, []);
    $httpBackend.expectGET(configuration.backend + '/plugins');
    
    $httpBackend.when('POST', configuration.backend + '/servers').respond(201);
    $httpBackend.expectPOST(configuration.backend + '/servers');
    
    scope.server = {
      'id': '78ce12f4-c378-4afb-b3ea-d2a2b886652b',
      'host': 'localhost',
      'sshPort': 22,
      'user': 'mikael',
      'password': 'pass',
      'privateKey': '',
      'sudo': true,
      'sshConnectionValidity': true,
      'state': 'READY'
    };
    scope.save();
    $httpBackend.flush();
  });
});
