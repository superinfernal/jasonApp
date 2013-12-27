'use strict';


// Declare app level module which depends on filters, and services
angular.module('tmApp', [
    'ngRoute',
    'ngSanitize',
    'firebase',
    'tmApp.filters',
    'tmApp.services',
    'tmApp.directives',
    'tmApp.controllers'
]).
    config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/meetingList', {
        templateUrl: 'meetingList.html',
        controller: 'MeetingListCtrl'
    });
    $routeProvider.when('/meetingDetail/:id', {
        templateUrl: 'meetingDetail.html',
        controller: 'MeetingDetailCtrl'
    });
    $routeProvider.when('/newMeeting', {
        templateUrl: 'newMeeting.html',
        controller: 'NewMeetingCtrl'});
    $routeProvider.otherwise({
        redirectTo: '/meetingList'
    });

}]);
