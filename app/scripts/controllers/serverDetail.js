'use strict';

angular.module('kheoApp').controller('ServerDetailCtrl', ['$scope', '$resource', '$routeParams', 'configuration', '_', function ($scope, $resource, $routeParams, configuration, _) {    
    
    $scope.server = $resource(configuration.backend + '/servers/' + $routeParams.hostname).get();
    $scope.plugins = $resource(configuration.backend + '/plugins').query();
    $scope.pluginProperties = [];
    $scope.discovery = $scope.server.state === 'DISCOVERY';

    $scope.filterPluginProperties = function(plugin) {
        $scope.pluginProperties = _.filter($scope.server.serverProperties, function(property) {
          return _.contains(plugin.propertiesNames, property.type);
        });
    };

    $scope.getKeys = function(property) {
        return _.reject(_.keys(property), function(element) {
            return element === 'type' || element === '$$hashKey' || element === 'key' || element === '@kheo-type';
        });
    };

    $scope.stringValue = function(obj) {
        if(obj === null) {
            return 'no value';
        }
        var value = _.map(_.filter(_.keys(obj), function(item) {
            return item !== 'type' && item !== '@kheo-type';
        }), function(item) {
            return item + '=' + obj[item];
        });
        return value.join(', ');
    };

    $scope.refresh = function() {
        $scope.discovery = true;
        $scope.server = $resource(configuration.backend + '/servers/' + $routeParams.hostname + '/discover').get().$promise.then(function() { $scope.discovery = false; $scope.init(); });
    };

    $scope.init = function() {
      $scope.server = $resource(configuration.backend + '/servers/' + $routeParams.hostname).get();
      $scope.plugins = $resource(configuration.backend + '/plugins').query();
    };
}]);
