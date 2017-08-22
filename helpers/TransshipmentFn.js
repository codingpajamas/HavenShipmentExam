'use strict';
var moment = require('moment');
var _ = require('lodash');

// *create a start edge
// *add "startedge" to "queueRoute"
// *loop on "queueRoute" to see if there are pending routes to be checked
// 	*if there are items, remove and get the "topQueueRoute" with array.shift()
// 	*get "lastCall" of "topQueueRoute"
// 	*get all "availableVessels" on that port where the "lastCall" is ("lastCall" will be included in the result)
// 	*loop on "availableVessels" as "aVessel" and check if there is "nextCall" on its voyage
//  *create a "newRoute" which is a duplicate of "topQueueRoute"
// 	*if "nextCall" exist, 
// 		*push "aVessel" and "nextCall" to "newRoute" 
// 	 	 (if "lastCall.routeId" == "nextCall.routeId", only push the "nextCall")
// 	 	*push "newRoute" to "queueRoute"
// 	*else "nextCall" doesn't exist, 
//  	* create "arrTrimmedRoutes" and push "arrTrimmedRoutes" to "availableRoute"
// -gg

function TransShipment(objPortGroup, objVyageGroup, objStartEdge, strOrigin, strDestination, intWaitingDays){
	this.queueRoute = [];
	this.availableRoute = [];
	this.portGroup = objPortGroup;
	this.voyageGroup = objVyageGroup;
	this.origin = strOrigin;
	this.destination = strDestination;
	this.waitingDays = intWaitingDays;
	this.setStartEdge(objStartEdge)
}

TransShipment.prototype.setStartEdge = function(objStartEdge)
{
	this.queueRoute.push([objStartEdge.from, objStartEdge.to]);
	this.checkQueue();
}

TransShipment.prototype.checkQueue = function()
{
	while(this.queueRoute.length > 0)
	{
		var topQueueRoute = this.queueRoute.shift(); 
		var lastCall = topQueueRoute[topQueueRoute.length-1];
		var availableVessels = this.findVesselsOnPort(lastCall); 

		for(var v=0; v < availableVessels.length; v++)
		{
			var aVessel = availableVessels[v];
			var nextCall = this.getVesselNextRoute(aVessel); 
			var newRoute = _.clone(topQueueRoute);

			if(nextCall)
			{
				if(lastCall['routeId'] != nextCall['routeId'])
				{
					newRoute.push(aVessel);
				}

				newRoute.push(nextCall); 
				this.queueRoute.push(newRoute); 
			}
			else
			{
				var arrTrimmedRoutes = this.getTrimmedRoutes(newRoute);

				if((lastCall['id'] == aVessel['id']) && 
					arrTrimmedRoutes && 
					this.checkNumberOfRoutes(arrTrimmedRoutes)
				)
				{
					this.availableRoute.push(arrTrimmedRoutes);
				}
			}
		} 
	}
}

TransShipment.prototype.getTrimmedRoutes = function(objRoute)
{
	var arrTrimmedRoutes = null
	var intOriginIndex = _.findIndex(objRoute, ['port', this.origin]);
	var intDestinationIndex = _.findIndex(objRoute, ['port', this.destination]);

	if((intOriginIndex > -1) && 
		(intDestinationIndex > -1) &&
		(intOriginIndex < intDestinationIndex)
	)
	{
		// TODO : don't trim on the transferring port
		arrTrimmedRoutes = objRoute.slice(intOriginIndex, intDestinationIndex+1);
		var firstCall = _.head(arrTrimmedRoutes);
		var lastCall = _.last(arrTrimmedRoutes);

		var originDate = firstCall.eta ? firstCall.meta : firstCall.metd;
		var destinationDate = lastCall.eta ? lastCall.meta : lastCall.metd;
		arrTrimmedRoutes = moment(originDate).isBefore(destinationDate) ? arrTrimmedRoutes : null;
	}

	return arrTrimmedRoutes;
}


TransShipment.prototype.checkNumberOfRoutes = function(objRoute)
{
	// if route is only one, that means it didn't transfer to other vessel
	var routeGroup = _.groupBy(objRoute, 'routeId');
	return _.size(routeGroup) != 1;
}

TransShipment.prototype.findVesselsOnPort = function(lastCall){
	var currentPort = lastCall['port'];
	var waitingDate = {
		min : moment(lastCall.meta).subtract(this.waitingDays, 'days'),
		avg : lastCall.meta,
		max : moment(lastCall.meta).add(this.waitingDays, 'days')
	}
	var vessels = [];
	 
	this.portGroup[currentPort].forEach(function(vessel){
		// check if vessel's (arrival is between min and max date)
		// and vessel's (departure is between avg and max date) 
		if(moment(vessel.meta).isBetween(waitingDate.min, waitingDate.max, null, '[]')  
			&& moment(vessel.metd).isBetween(waitingDate.avg, waitingDate.max, null, '[]'))
		{
			vessels.push(vessel);
		}
	});

	return vessels;
}

TransShipment.prototype.getVesselNextRoute = function(aVessel){
	var voyage = this.voyageGroup[aVessel['routeId']];
	var nextCall = _.chain(voyage)
					.filter(function(call){ 
						return moment(call.meta).isAfter(aVessel.metd);
					})
					.head()
					.value();

	return nextCall;
}

module.exports = TransShipment;