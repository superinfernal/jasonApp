'use strict';

/* Controllers */
angular.module('tmApp.controllers', []).
    controller('MeetingListCtrl',
    function($scope, meetingService, $location) {

        $scope.meetings = meetingService;

        $scope.sortorder = "meetingDate";

        $scope.go = function (meeting) {
            console.log(meeting);
            console.log(meeting.$id);
            var path = "/meetingDetail/" + meeting.$id;
            $location.path(path);
        }

        $scope.hasSearchResult = function() {
            if ($scope.matchedEntries) {
                // console.log($scope.matchedEntries.length + " matched entries");
                return $scope.matchedEntries.length >= 1;
            }
        }
    }).
    controller('NewMeetingCtrl',
    function($scope, $location, $timeout, meetingService) {
        $scope.addMeeting = function() {
            meetingService.$add($scope.meeting, function() {
                $timeout(function() {
                    $location.path('/');
                });
            });
        };
    }).
    controller('MeetingDetailCtrl',
    function($scope, $location, $routeParams, $firebase, fbURL) {
        var meetingUrl = fbURL + $routeParams.id;
        $scope.meeting = $firebase(new Firebase(meetingUrl));

        $scope.destroy = function() {
            $scope.meeting.$remove();
            $location.path('/');
        };

        $scope.save = function() {
            $scope.meeting.$save();
            $location.path('/');
        };
        $scope.cancel = function() {
            $location.path('/');
        };
    }).
    controller('MainCtrl', function($scope) {

    });




