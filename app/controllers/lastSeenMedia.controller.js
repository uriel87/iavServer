const lastSeenMediaSchema = require('mongoose').model('LastSeenMedia');


/* ----------------------------------
 * add media To last search of the User function
------------------------------------- */


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
			lastMediaSearches: [{
				lastSearch: req.body.params.lastSearch,
				date: new Date().toISOString()
			}]
		}
	}

	lastSeenMediaSchema.findOneAndUpdate(query, update, option, function (err, lastMedia) {
		if(err) {
			console.log(err);
				res.status(404).json({
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
 * get last media search of the  user
 -------------------------------------*/

 exports.getLastMediaList = function(req, res) {
    console.log('in controller getLastMediaList');
    console.log('req.body', req.body.email);

	var query = [
		{
			$match: {
				email: (req.body.params.email).toLowerCase()
			}
		},
		{
			$project:
			{
				lastSearch: {
					$slice: [
						"$lastMediaSearches.lastSearch", -10
					]
				}
			}
		}
	]
	
			
	lastSeenMediaSchema.aggregate(query, function (err, lastMediaListRes) {	
		if(err) {
			console.log(err);
			res.status(404).json({
				status: "404",
				msg: " Database error in function getLastMediaList, user.controller.js",
				err: err
			})
		} else {
			console.log("controller getLastMediaList lastMediaListRes: " + lastMediaListRes);
			res.status(200).json(lastMediaListRes);
		}
	})
}

