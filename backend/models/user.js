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
    notes:[String],
    tags:[String]
});


const User = mongoose.model('User',userSchema);

module.exports = User ;
