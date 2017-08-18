'use strict';

angular.module('havenApp')
	.factory('Voyage', 
		['$http', '$q', function($http, $q){
			var VoyageFactory = {};
			var arrDates = {
				minDate : moment('2016-01-01'),
				maxDate : moment('2016-01-06').add(70, 'days')
			}

			VoyageFactory.get = function(){
				var strEta = arrDates.minDate.format('YYYY-MM-DD');
				var strEtd = arrDates.maxDate.format('YYYY-MM-DD');

				return $http({
						method: 'GET',
						url: 'http://localhost:3000/api/portcalls',
						params: {eta: strEta, etd:strEtd}
					})
					.then(function(response){ 
						return response.data;
					}, function(errResponse){
						$q.reject(errResponse);
					});
			}

			VoyageFactory.getDates = function(){
				return arrDates;
			}

			VoyageFactory.setDates = function(eta, etd){
				arrDates.minDate = eta;
				arrDates.maxDate = etd;
			}

			return VoyageFactory;
		}]
	)