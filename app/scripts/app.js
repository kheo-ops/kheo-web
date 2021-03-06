'use strict';

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._; //Underscore must already be loaded on the page
});

angular
    .module('kheoApp', [
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'services.config',
    'pasvaz.bindonce',
    'underscore',
    'angular-timeline'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .when('/servers', {
        templateUrl: 'views/server-list.html',
        controller: 'ServerListCtrl'
      })
      .when('/servers/new', {
        templateUrl: 'views/server-new.html',
        controller: 'ServerNewCtrl'
      })
      .when('/servers/:hostname/detail', {
        templateUrl: 'views/server-detail.html',
        controller: 'ServerDetailCtrl'
      })
      .when('/servers/:hostname/edit', {
        templateUrl: 'views/server-edit.html',
        controller: 'ServerEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
