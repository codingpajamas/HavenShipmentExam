'use strict';

angular.module('havenApp')
	.controller('voyagesCtrl', ['$scope', 'Voyage', function($scope, Voyage){

		$scope.voyages;
		$scope.dates = Voyage.getDates();
		$scope.eta = Voyage.getDates().minDate.format('MMMDD');
		$scope.etd = Voyage.getDates().maxDate.format('MMMDD');
		
		Voyage.get()
			.then(function(data){
				$scope.voyages = data;
			}, function(err){
				console.log(err);
			});
	}])