'use strict';

angular.module('havenApp')
	.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider){
			$routeProvider
				.when('/', {
					templateUrl: 'app/partials/home.html',
					controller: 'homeCtrl'
				})
				.when('/voyages', {
					templateUrl: 'app/partials/voyages.html',
					controller: 'voyagesCtrl'
				})

			$locationProvider.html5Mode(true); 
		}
	])