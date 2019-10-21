const userController = require('../controllers/user.controller');

module.exports = function(app) {

	app.post('/getUser/', userController.getUser);	// get user

	app.post('/addUser/', userController.addUser);	// add user

}; 