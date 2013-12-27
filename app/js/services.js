'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1').

    factory('dataService', function($http  ) {
        return {
            getUsers: function(callback) {

                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        url: '/app/data/data.json',
                        method: "GET"

                    }).success(function(data, status, headers, config) {
                        callback(data);
                    }).error(function(data, status, headers, config) {

                    });
            }
        }
    }).
    factory('dataService', function($http, $q) {
        var cachedData = null;
        return {
            getUsers: function() {
                    var deferred = $q.defer();

                    $http({
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        url: '/app/data/data.json',
                        method: "GET"

                    }).success(function(data, status, headers, config) {
                       deferred.resolve(data);
                       cachedData = data;
                    }).error(function(data, status, headers, config) {
                       deferred.reject(status);
                    });
                    return deferred.promise;
            },

            getUserById : function(id) {
                var found = null;
                if (!cachedData) return null;

                for (var i=0; i<cachedData.dataSet.length; i++) {
                    if (cachedData.dataSet[i].id == id) {
                        found = cachedData.dataSet[i];
                        break;
                    }
                }
                return found;
            }
        }
    });

