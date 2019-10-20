const userController = require('../controllers/user.controller');

module.exports = function(app) {

	app.post('/getUser/', userController.getUser);	// get one user

	app.post('/addUser/', userController.addUser);	// get one user

	app.post('/AddMediaItemToUser/', userController.AddMediaItemToUser);	// add media to last search list
	
	app.post('/getLastMediaList/', userController.getLastMediaList);	// gett last media list of thr user

}; 