'use strict';

/* Filters */

angular.module('tmApp.filters', []).
  filter('matchedsearch', function() {
        return function (input, searchStr) {
            var searchPattern = "(" + searchStr + ")";
            var regEx = new RegExp(searchPattern, "i");
            var rtnValue =  input.replace(regEx, '<span class="highlight">$1</span>');
            return rtnValue;

        }
  });