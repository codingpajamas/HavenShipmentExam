var moment = require('moment');
var _ = require('lodash');
var portCalls = require('./portCalls.json');

// let's assume that this is our ODM
var PortCalls = {
	calls : function(){
		// let's add a new property "meta" and "metd" that will help us in time query
		// sort of simulating db time query
		return _.each(portCalls.calls, function(call){
			// "meta and metd" are "eta and etd" in momentjs format
			call.meta = moment(call.eta, "YYYY-MM-DD");
			call.metd = moment(call.etd, "YYYY-MM-DD");
			return call;
		});
	},

	getAll : function(){
		return this.calls();
	},

	getByDates: function(eta, etd){
		return _.filter(this.calls(), function(objCall){ 
			// let's return the call object if its "eta and etd properties" are between "eta and etd params"
			return (moment(objCall.meta).isBetween(eta, etd, null, '[]') || objCall.eta == null) &&
					(moment(objCall.metd).isBetween(eta, etd, null, '[]') || objCall.etd == null);
		});
	},

	getDirectRoutes: function(voyages, origin, destination){
		return _.filter(voyages, function(objVoyage){
			var objOrigin = _.find(objVoyage, _.matchesProperty('port', origin));
			var objDestination = _.find(objVoyage, _.matchesProperty('port', destination));

			// check if both origin and destination exist
			if((objOrigin && objDestination))
			{
				var originDate = objOrigin.eta ? objOrigin.meta : objOrigin.metd;
				var destinationDate = objDestination.eta ? objDestination.meta : objDestination.metd;

				// then check if vessel is going from origin to destination by comparing their dates
				if(moment(originDate).isBefore(destinationDate))
				{
					return objVoyage;
				}
			}
		});
	},

	groupCallsByRouteId: function(arrCalls){
		return _.groupBy(arrCalls, objCall => objCall.routeId);
	},

	groupCallsByPort: function(arrCalls){
		return _.groupBy(arrCalls, objCall => objCall.port);
	}
}

module.exports = PortCalls;