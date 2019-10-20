

/* ----------------------------------
 * create user schema
-------------------------------------*/

const mongoose = require("mongoose"),
	schema = mongoose.Schema;

const lastSeenMediaSchema = new schema( {

    email: { type:String,  unique:true},
    
	lastMediaId: [{
        lastSearch: String,
        count: { type: Number, default: 0 },
        date: String
    }]

}, {collection: 'lastSeenMedia'});

// Define schema name
mongoose.model('LastSeenMedia',lastSeenMediaSchema);




	
