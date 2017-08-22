'use strict';

angular.module('havenApp')
	.controller('homeCtrl', ['$scope', '$location', 'Voyage', function($scope, $location, Voyage){
		$scope.title = 'Select Date';
		$scope.dates = Voyage.getDates();
		$scope.transOpt = Voyage.getTransOpt();
		$scope.transOpt.error = '';

		$scope.changeDate = function (modelName, newDate) {
			Voyage.setDates($scope.dates.minDate, $scope.dates.maxDate);
		}

		$scope.setTransshipmentOpt = function(){
			Voyage.setTransOpt(true, $scope.transOpt.origin, $scope.transOpt.destination, $scope.transOpt.waitDays);
		}

		$scope.cancelTransshipmentOpt = function(){
			Voyage.setTransOpt(false, $scope.transOpt.origin, $scope.transOpt.destination, $scope.transOpt.waitDays);
		}

		$scope.getVoyages = function(){
			if($scope.transOpt.isActive && (!$scope.transOpt.origin || !$scope.transOpt.destination))
			{
				$scope.transOpt.error = 'Origin and Destination are both required'
			}
			else
			{
				$scope.transOpt.error = '';
				$location.path('/voyages');
			}
		}
	}])