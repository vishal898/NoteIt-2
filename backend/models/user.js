const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
		type: String,
		required: true,
	},
    googleID: {
		type: String,
		required: true,
	},
    email:{
		type: String,
		required: true,
	},
    notes:[
        {
            type:Schema.Types.ObjectId,
            ref:'Note',
        },
    ],
    tags:[
       String
    ],
    urls:[
       String
    ]
});


const User = mongoose.model('User',userSchema);

module.exports = User ;
