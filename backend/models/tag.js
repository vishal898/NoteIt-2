const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tagName:{
        type:String,
        required:true,
    },
    notes:[
        {
            type:Schema.Types.ObjectId,
            ref:'Note',
        },
    ]
});


const Tag = mongoose.model('Tag',tagSchema);

module.exports = Tag ;
