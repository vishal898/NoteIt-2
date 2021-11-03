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
    },



    body:{
        type:String,
        required: true,
    },
    ankiOn:{
        type:Boolean,
    },
    repetitions:{
        type:Number,
        default:0,
    },
    previousEaseFactor:{
        type:Number,
        default:2.5,
    },
    previousInterval:{
        type:Number,
        default:0,
    },
    lastRevisedDate:{
        type:Date,
    }

});


const Note = mongoose.model('Note',noteSchema);

module.exports = Note ;