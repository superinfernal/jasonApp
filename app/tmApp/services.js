'use strict';

/* Services */

angular.module('tmApp.services', []).
    value('fbURL', 'https://rcjasonzhang.firebaseio.com/tmMeetings/').

    factory('meetingService', function($firebase, fbURL) {
        return $firebase(new Firebase(fbURL));
    }).

    factory('dataService', function($http, $q) {
        var cachedData = null;
        return {
            getMeetings: function() {
                var deferred = $q.defer();
                $http({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    url: '/app/data/meetingData.json',
                    method: "GET"

                }).success(
                    function(data, status, headers, config) {
                        deferred.resolve(data);
                        cachedData = data;
                    }).error(function(data, status, headers, config) {
                        deferred.reject(status);
                    });
                return deferred.promise;
            },

            getMeetingById : function(id) {
                var found = null;
                if (!cachedData) return null;

                for (var i = 0; i < cachedData.dataSet.length; i++) {
                    if (cachedData.dataSet[i].id == id) {
                        found = cachedData.dataSet[i];
                        break;
                    }
                }
                return found;
            }
        }
    });

