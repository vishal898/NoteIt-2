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
<<<<<<< HEAD
    tags: [String],
=======
    tags:[String],
>>>>>>> 3a6d5a4b22232e1f9e86657cbca0a9320757bf82
    visitCnt:{
        type:Number,
    },



    body:{
        type:String,
        required: true,
    },
    ankiOn:{
        type:Boolean,
        default:false,
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