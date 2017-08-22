'use strict';

angular.module('havenApp')
	.controller('voyagesCtrl', ['$scope', 'Voyage', function($scope, Voyage){
		$scope.title = 'Available Voyages';
		$scope.voyages;
		$scope.dates = Voyage.getDates();
		$scope.eta = Voyage.getDates().minDate.format('MMMDD');
		$scope.etd = Voyage.getDates().maxDate.format('MMMDD');
		$scope.transOpt = Voyage.getTransOpt();

		$scope.colors = {
			"1" : 'label-primary',
			"2" : 'label-success',
			"3" : 'label-info',
			"4" : 'label-warning' 
		}

		$scope.getColor = function(asd){
			return $scope.colors[asd]
		}

		$scope.isTransfer = function(vIndex, pIndex){
			var boolIsTransfer = false;
			var currentCall = $scope.voyages.transshipment[vIndex][pIndex];
			var nextCall = $scope.voyages.transshipment[vIndex][pIndex+1];

			if(nextCall && (currentCall.routeId != nextCall.routeId))
			{
				boolIsTransfer = true;
			}

			return boolIsTransfer; 
		}
		
		Voyage.get()
			.then(function(data){
				$scope.voyages = data; 
			}, function(err){
				console.log(err);
			});
	}])