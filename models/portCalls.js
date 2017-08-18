var moment = require('moment');
var _ = require('lodash');
var arrCalls = require('./portCalls.json').calls;

var PortCalls = {
	getAll : function(){
		return createVoyagesFromCalls(arrCalls);
	},

	getByDates: function(eta, etd){
		var arrCallsFiltered = _.filter(arrCalls, function(objCall){ 
			// let's return the call object if its "eta and etd properties" are between "eta and etd params"
			return (moment(objCall.eta, "YYYY-MM-DD").isBetween(eta, etd, null, '[]') || objCall.eta == null) &&
					(moment(objCall.etd, "YYYY-MM-DD").isBetween(eta, etd, null, '[]') || objCall.etd == null);
		});

		return createVoyagesFromCalls(arrCallsFiltered);
	}
}

// let's convert the portcalls into voyage format so we can display them better in the UI
// route1) USS Starboard : [USOAK(Jan10-Jan12) -> SGSIN(Jan14-Jan16) -> HKHKG(Jan18-Jan20) -> USLAX(Jan22-N/A)]
function createVoyagesFromCalls(arrPortCalls){ 
	return _.chain(arrPortCalls)
			.map(function(val){
				return {
					"id": val.id,
		            "vessel": val.vessel,
		            "routeId": val.routeId,
		            "port": val.port,
		            "eta": moment(val.eta, "YYYY-MM-DD").isValid() ? moment(val.eta, "YYYY-MM-DD").format("MMMDD") : 'N/A',
		            "etd": moment(val.etd, "YYYY-MM-DD").isValid() ? moment(val.etd, "YYYY-MM-DD").format("MMMDD") : 'N/A'
				};
			})
			.groupBy(objCall => objCall.routeId)
			.value();
}

module.exports = PortCalls;