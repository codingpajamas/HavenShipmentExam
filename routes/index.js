var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { 
	res.render('index', { title: 'Haven Engineering' });
});

/* GET voyger page. */
router.get('/voyages', function(req, res, next) { 
	res.render('index', { title: 'Haven Engineering' });
});

module.exports = router;
