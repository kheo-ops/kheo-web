'use strict';

angular.module('kheoApp')
  .controller('ServerEditCtrl', ['$scope', '$resource', '$routeParams', 'configuration', '_', function ($scope, $resource, $routeParams, configuration, _) {
    $scope.server = $resource(configuration.backend + '/servers/' + $routeParams.hostname).get();

    $scope.save = function() {
        if($scope.server === undefined) {
            return;
        }
        $scope.server.serverProperties = [];
        $scope.server.eventLog = [];

        $resource(configuration.backend + '/servers/:host', 
                  {host: '@host'}, 
                  {'update': { method: 'PUT'}})
        .update($scope.server);
    };

    $scope.getKeys = function(property) {
        return _.reject(_.keys(property), function(element) {
            return element === 'type' || element === '$$hashKey' || element === 'key';
        });
    };
    
}]);
