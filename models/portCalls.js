var moment = require('moment');
var _ = require('lodash');
var portCalls = require('./portCalls.json');

var PortCalls = {
	calls : portCalls.calls,

	getAll : function(){
		return _.groupBy(this.calls, objCall => objCall.routeId);
	},

	getByDates: function(eta, etd){
		var arrCallsFiltered = _.filter(this.calls, function(objCall){ 
			// let's return the call object if its "eta and etd properties" are between "eta and etd params"
			return (moment(objCall.eta, "YYYY-MM-DD").isBetween(eta, etd, null, '[]') || objCall.eta == null) &&
					(moment(objCall.etd, "YYYY-MM-DD").isBetween(eta, etd, null, '[]') || objCall.etd == null);
		});

		return _.groupBy(arrCallsFiltered, objCall => objCall.routeId);
	}
}

module.exports = PortCalls;