var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('lodash');

var PortCalls = require('../../models/portCalls.js');

/* GET home page. */
router.get('/portcalls', function(req, res, next) { 

	var strEta = req.query.eta; // get the string value of "eta" param 
	var strEtd = req.query.etd; // get the string value of "etd" param 
	var arrPortCalls = {}; // portcalls array container var

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
		arrPortCalls = PortCalls.getByDates(dateEta, dateEtd); 
	}
	else
	{
		arrPortCalls = PortCalls.getAll();
	}

	res.json(arrPortCalls);
});

module.exports = router;
