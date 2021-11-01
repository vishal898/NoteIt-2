const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('../models/note');

// demo
router.get('/',(req,res)=>{
    res.send('hello');
});

// get read 
router.get('/getAllNotes',(req,res)=>{
    Note.find({ },(err,data)=>{
        if(err)throw error;
        res.json(data);
    });
});

router.get('/getNote/:url',(req,res)=>{
    const {url} = req.params;
    console.log(url);
    Note.find({_id:url},(err,data)=>{
        if(err)throw error;
        res.json(data);
    });
});


// post create 
router.post('/createNote/:userId',(req,res)=>{
    const {url,difficulty,title,createdTime,tags} = req.body;
    const {userId} = req.params;
    const newNote = new Note({
		userId:userId,
        url:url,
        difficulty:difficulty,
        title:title,
        createdTime:createdTime,
        tags:tags,
        visitCnt:visitCnt,
	});
    console.log(newNote);
    newNote.save();
});

// post update 
router.post('/updateNote',(req,res)=>{

});

// post delete 
router.post('/deleteNote',(req,res)=>{

});
router.get("/getTags",(req,res)=>{  
	const UID = req.user._id ;
    // console.log(req.user);
    // const UID = req.params.ID;
	User.findById({_id:UID},(err,data)=>{
        if(err)throw error;
        res.json(data.tags);
    });
});

module.exports = router ;