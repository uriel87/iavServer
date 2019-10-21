const userController = require('../controllers/lastSeenMedia.controller');

module.exports = function(app) {

	app.post('/AddMediaItemToUser/', userController.AddMediaItemToUser);	// add media to last search list
	
	app.post('/getLastMediaList/', userController.getLastMediaList);	// gett last media list of thr user

}; 