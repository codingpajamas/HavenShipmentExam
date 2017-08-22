var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('lodash');

var PortCalls = require('../../models/portCalls.js');
var TransshipmentFn = require('../../helpers/TransshipmentFn');

/* GET home page. */
router.get('/portcalls', function(req, res, next) { 

	var strEta = req.query.eta; // get the string value of "eta" param 
	var strEtd = req.query.etd; // get the string value of "etd" param 
	var strOrigin = req.query.origin; // get the string value of "eta" param 
	var strDestination = req.query.destination; // get the string value of "etd" param
	var intWaitingDays = req.query.wait; // get the string value of "etd" param

	var arrVoyages = {
		calls : {},
		all : {},
		direct : {},
		transshipment :{}
	}

	// check if date parameter exist and if those are valid dates
	if(strEta || strEtd)
	{
		// convert the string parameters into date format
		var dateEta = moment(strEta, "YYYY-MM-DD", true);
		var dateEtd = moment(strEtd, "YYYY-MM-DD", true);

		// both dates shoud be a valid dates, otherwise send an error
		if(!dateEta.isValid() || !dateEtd.isValid())
		{
			res.status(500).json('Start Date and End Date should be both a valid date');
		}

		// end date should be atleast greater than start date
		if(!moment(dateEta).isSameOrBefore(dateEtd))
		{
			res.status(500).json('Start Date should not be greater than End Date');
		}

		// if everything's fine, let's get the filtered portcalls
		arrVoyages.calls = PortCalls.getByDates(dateEta, dateEtd); 
		arrVoyages.all = PortCalls.groupCallsByRouteId(arrVoyages.calls);

		// now let's get voyages that has direct route from origin to destination
		if(strOrigin && strDestination)
		{
			arrVoyages.direct = PortCalls.getDirectRoutes(arrVoyages.all, strOrigin, strDestination);

			var portGroup = PortCalls.groupCallsByPort(arrVoyages.calls); 
			var arrTransshipmentRoutes = [];
	 		
	 		// TODO : use async/bluebird here
			_.forIn(arrVoyages.all, function(voyage, key){ 
				var startEdge = { from : voyage[0], to : voyage[1] };
				var transshipment = new TransshipmentFn(portGroup, arrVoyages.all, startEdge, strOrigin, strDestination, intWaitingDays);

				transshipment.availableRoute.forEach(function(route){
					arrTransshipmentRoutes.push(route)
				});
			});

			arrVoyages.transshipment = arrTransshipmentRoutes;





			res.json(arrVoyages);
		}
		else
		{
			res.json(arrVoyages);
		}
	}
	else
	{
		arrVoyages.calls = PortCalls.getAll() 
		arrVoyages.all = PortCalls.groupCallsByRouteId(arrVoyages.calls);
		res.json(arrVoyages);
	}
});

module.exports = router;
