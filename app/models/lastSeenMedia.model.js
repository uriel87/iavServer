

/* ----------------------------------
 * create user schema
-------------------------------------*/

const mongoose = require("mongoose"),
	schema = mongoose.Schema;

const lastSeenMediaSchema = new schema( {

    email: { type:String,  unique:true},
    
	lastMediaSearches: [{
        lastSearch: String,
        date: String
    }]

}, {collection: 'lastSeenMedia'});

// Define schema name
mongoose.model('LastSeenMedia',lastSeenMediaSchema);




	
