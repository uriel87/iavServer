const express = require('express'),
	bodyParser = require('body-parser');



module.exports = function() {

	const app = express();

    app.use(function(req, res, next) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		if(req.method === 'OPTIONS') {
			return res.sendStatus(200)
		}
		next();
	  });

	app.set('Content-Type', 'text/plain');
	app.set("json spaces", 4);
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


	// Load the routing files
	require('../app/routes/user.rout')(app);

	//Return the Express application instance
	return app;

};