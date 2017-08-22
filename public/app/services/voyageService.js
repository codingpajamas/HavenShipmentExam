'use strict';

angular.module('havenApp')
	.factory('Voyage', 
		['$http', '$q', 'portcallsUrl', function($http, $q, portcallsUrl){
			var VoyageFactory = {};
			var arrDates = {
				minDate : moment('2016-01-01'),
				maxDate : moment('2016-01-06').add(7, 'days')
			};
			var arrTransOpt = {
				isActive : false,
				origin : '',
				destination : '',
				waitDays : 0
			};

			VoyageFactory.get = function(){
				var strEta = arrDates.minDate.format('YYYY-MM-DD');
				var strEtd = arrDates.maxDate.format('YYYY-MM-DD');
				var arrParams = { eta: strEta, etd:strEtd };

				if(arrTransOpt.isActive)
				{
					arrParams['origin'] = arrTransOpt.origin;
					arrParams['destination'] = arrTransOpt.destination;
					arrParams['wait'] = arrTransOpt.waitDays;
				}

				return $http({
						method: 'GET',
						url: portcallsUrl,
						params: arrParams
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

			VoyageFactory.getTransOpt = function(){
				return arrTransOpt;
			}

			VoyageFactory.setTransOpt = function(isActive, origin, destination, waitDays){
				arrTransOpt.isActive = isActive;
				arrTransOpt.origin = origin;
				arrTransOpt.destination = destination;
				arrTransOpt.waitDays = waitDays;
			}

			return VoyageFactory;
		}]
	)