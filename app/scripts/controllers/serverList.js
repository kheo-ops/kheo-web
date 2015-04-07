'use strict';

angular.module('kheoApp').controller('ServerListCtrl', ['$scope', '$resource', 'configuration', function ($scope, $resource, configuration) {
    $scope.servers = [];

    $scope.init = function() {
        $scope.servers = $resource(configuration.backend + '/servers').query();
    };

    $scope.delete = function(serverHostname) {
        $resource(configuration.backend + '/servers/' + serverHostname).delete().$promise.then(function() { $scope.init(); });
    };

    $scope.refresh = function(serverHostname) {
        $resource(configuration.backend + '/servers/' + serverHostname + '/discover').get().$promise.then(function() { $scope.init(); });
    };

    $scope.init();
}]);
