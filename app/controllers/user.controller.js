const userSchema = require('mongoose').model('User'),
      lastSeenMediaSchema = require('mongoose').model('LastSeenMedia');


/* ----------------------------------
 * get user by email function
-------------------------------------*/


exports.getUser = function(req, res) {
	console.log('in controller getUser');
    console.log('req.body.email', req.body.email);
	
	var query = {
		email: req.body.params.email
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
 * add user function
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
			res.status(404).json({
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
                    res.status(404).json({
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



