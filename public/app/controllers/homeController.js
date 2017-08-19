'use strict';

angular.module('havenApp')
	.controller('homeCtrl', ['$scope', 'Voyage', function($scope, Voyage){
		$scope.title = 'Select Date';
		$scope.dates = Voyage.getDates();

		$scope.changeDate = function (modelName, newDate) {
			Voyage.setDates($scope.dates.minDate, $scope.dates.maxDate);
		}
	}])