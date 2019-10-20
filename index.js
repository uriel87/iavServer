require('./config/mongoose')


// Load the module dependencies
// var mongoose = require('./config/mongoose'),
//     express = require('./config/express');

const express = require('./config/express');

// Create a new Mongoose connection instance
//var db = mongoose();

// Create a new Express application instance
const app = express();

// Use the Express application instance to listen to the port

app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port + ' ..');

});