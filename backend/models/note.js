const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    url:{
		type: String,
		required: true,
	},
    difficulty: {
		type: String,
		required: true,
	},
    title:{
		type: String,
		required: true,
	},
    createdTime:{
		type: Date,
		required: true,
	},
    tags:[
        {
            type:Schema.Types.ObjectId,
            ref:'Tag',
        },
    ],
    visitCnt:{
        type:Number,
    }
});


const Note = mongoose.model('Note',noteSchema);

module.exports = Note ;