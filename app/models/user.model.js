

/* ----------------------------------
 * create user schema
-------------------------------------*/

const mongoose = require("mongoose"),
	schema = mongoose.Schema;

const userSchema = new schema( {

	name: String,

    email: { type:String,  unique:true},
    
    password: String,

	tel: String,

}, {collection: 'users'});

// Define schema name
mongoose.model('User',userSchema);