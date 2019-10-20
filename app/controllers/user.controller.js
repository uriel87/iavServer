const userSchema = require('mongoose').model('User'),
      lastSeenMediaSchema = require('mongoose').model('LastSeenMedia');


/* ----------------------------------
 * get user by email function
-------------------------------------*/


exports.getUser = function(req, res) {
	console.log('in controller getUser');
    console.log('req.body.email', req.body.email);
	const query = {
		email: (req.body.email).toLowerCase()
	}

	userSchema.findOne(query,function (err, userDoc) {
		if(err) {
			console.log(err);
			res.status(400).json({
				status: "404",
				msg: " Database error in function getUser, user.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getUser: " + userDoc);
			res.status(200).json(userDoc);
		}
	})

};



/* ----------------------------------
 * add user by email function
 -------------------------------------*/

 exports.addUser = function(req, res) {
    console.log('in controller addUser');
    console.log('req.body', req.body);


	var newUser = new userSchema({
		name: (req.body.email).toLowerCase(),
		email: req.body.email,
		password: req.body.password,
        tel: req.body.tel
	})

	// var option = {
	// 	upsert: true,
	// 	new: true,
	// 	runValidators: true
	// }

	newUser.save(function (err, userDoc) {
		if(err) {
			console.log(err);
			res.status(400).json({
				status: "404",
				msg: " Database error in function addUser, user.controller.js",
				err: err
			});
		}
		else {
            console.log('in controller newLastSeenMedia');

            var newLastSeenMedia = new lastSeenMediaSchema({
                email: userDoc.email
            })
            
            newLastSeenMedia.save(function (err, lastMedia) {
                if(err) {
                    console.log(err);
                    res.status(400).json({
                        status: "404",
                        msg: "Database error in function addUser, user.controller.js",
                        err: err
                    });
                }
                else {
                        console.log("controller addUser: " + lastMedia);
                    }
                });
            }
			res.status(200).json(userDoc);
    });
}



/* ----------------------------------
 * push Song To User function
-------------------------------------*/


exports.AddMediaItemToUser = function(req, res) {
	console.log("in controller AddMediaItemToUser req.body.mediaId", req.body.params);
	
	var query = {
		email: (req.body.params.email).toLowerCase()
	}

	var option = {
		upsert: true,
		new: true,
		runValidators: true
	}

	var update = {
		$addToSet:{
			lastMediaId: [{
				lastSearch: req.body.params.lastSearch,
				$inc: { count: 1},
				date: new Date().toISOString()
			}]
		}
	}

	lastSeenMediaSchema.findOneAndUpdate(query, update, option, function (err, lastMedia) {
		if(err) {
			console.log(err);
				res.status(400).json({
				status: "404",
				msg: " Database error in function AddMediaItemToUser, user.controller.js",
				err: err
			});
		} else {
			console.log("controller pushSongToUser: " + lastMedia);
			res.status(200).json(lastMedia);
		}
	})
		
}





/* ----------------------------------
 * add media search to user
 -------------------------------------*/

 exports.getLastMediaList = function(req, res) {
    console.log('in controller getLastMediaList');
    console.log('req.body', req.body);
/* 	var query = {
		email: req.body.email
	}

	var option = {
		upsert: true,
		new: true,
		runValidators: true
	}

	var update = {
		lastMediaId: [{
			mediaId: req.body.mediaId,
			$inc: { count: 1},
			date: new Date().toISOString()
		}]
	}
	
	lastSeenMediaSchema.findOneAndUpdate(query, update, option, function (err, lastMedia) {
		console.log("controller pushSongToUser: " + lastMedia);
		res.status(200).json(lastMedia);
	}) */
}

