'use strict';

angular.module('havenApp')
	.filter('readableDate', function(){
		return function(input, format){
			return input ? moment(input, "YYYY-MM-DD").format(format) : 'N/A';
		}
	})