'use strict';

/* Controllers */
var myUser  = "Jason zhang"
angular.module('myApp.controllers', []).
  controller('UserListCtrl', function($scope, dataService, $location) {
        //$scope.data = dataService.getUsers();

        //## callback handling
        /*dataService.getUsers(function(result) {
            $scope.data = result;
        });*/


        dataService.getUsers().then(function(data) {
                $scope.data = data;
            }, function(status) {
                // error handling for the status
            });


        $scope.sortorder = "name";

        $scope.go = function ( person ) {
            console.log(person);
            var path = "/userDetail/" + person.id;
            $scope.$parent.xUser =  person.name;
            $location.path( path );


        }

        $scope.hasSearchResult = function() {
            console.log($scope.matchedEntries.length + " matched entries");
            return $scope.matchedEntries.length >= 1;
        }


  })
  .controller('UserDetailCtrl', ['$scope', '$routeParams', 'dataService', function(s, r, d) {
        var selectedId = r.id;
        var user = d.getUserById(selectedId);
        s.person = user;


  }])
  .controller('NewUserCtrl', function($scope,  dataService, $location, $window) {
        $scope.addUser = function() {
           dataService.addUser($scope.name, $scope.occupation, $scope.hobby, $scope.email);
           //$location.path("/view1");
            $window.history.back();
        }

  })
  .controller('MainCtrl', function($scope) {
        $scope.summary = "Contact list Jason";
        $scope.desc = "This is a place to describe what to do Jason";
        $scope.xUser = myUser       ;

  });