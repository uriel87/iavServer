/* ----------------------------------
 * connect to cinerama dataBase mongoose
-------------------------------------*/

const mongoose = require('mongoose');

config = {
	mongoUrl:'mongodb://iavserver:iavserver1@ds331198.mlab.com:31198/iavserver'
};

//The server option auto_reconnect is defaulted to true
const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	auto_reconnect:true
};

mongoose.connect(config.mongoUrl, options);
db = mongoose.connection; // a global connection variable

mongoose.set('useFindAndModify', false);

// Event handlers for Mongoose

db.on('error', function (err) {
	console.log('Mongoose: Error: ' + err);
});


db.on('open', function() {
	console.log('Mongoose: Connection established');
});


db.on('disconnected', function() {
	console.log('Mongoose: Connection stopped, recconect');
	mongoose.connect(config.mongoUrl, options);
});


db.on('reconnected', function () {
	console.info('Mongoose reconnected!');
});


require('../app/models/user.model');
require('../app/models/lastSeenMedia.model');


