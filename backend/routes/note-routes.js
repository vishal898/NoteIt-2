const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('../models/note');
const User = require('../models/user');

// demo
router.get('/',(req,res)=>{
    res.send('hello');
});

// get read 
router.get('/getAllNotes',async(req,res)=>{
    const uid=req.user._id;
    console.log(uid);
    Note.find({userId:uid},(err,data)=>{
        if(err)throw error;
        res.json(data);
        // console.log(data);
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







// // get by nodeid
// router.get('/getNote/:idA',(req,res)=>{
//       let id = req.params.idA;
//       console.log(id);
//       Note.findById(id, (err, notes)=> {
//       if (err){
//         console.log(err);

//       }
//       else{
//         console.log("Result : ", notes);
//         res.json(notes);
//       }
// });


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
// router.post('/updateNote/:idA',(req,res)=>{

//     const {url,difficulty,title,createdTime,tags,body} = req.body;
//       let id = req.params.idA;
//       console.log(id);
//       Note.findById(id, (err, notes)=> {
//       if (err){
//         console.log(err);
//       }
//       else{
//         console.log("Result : ", notes);

//         notes.body=body;
//         notes.tags=tags;
//         // all other atribute 
//        notes.save();
//        res.send("sucess");
//      }
//     });
// });


// post delete 
router.post('/deleteNote/:noteId',(req,res)=>{
    const NID = req.params.noteId;
    console.log(NID);
    Note.findOneAndDelete({_id:NID},(err,data)=>{
        if(err)res.send(err);
        res.send(`DELETED ${NID}`);
    });
    console.log('hit delete api');
});

router.get("/getTags",(req,res)=>{  
	const UID = req.user._id ;
    console.log(req.user.tags);
    // const UID = req.params.ID;
	User.findById({_id:UID},(err,data)=>{
        if(err)throw error;
        res.json(data.tags);
    });
});


router.put('/ankiUpdate/:idA/:qualityA', (req, res) => {

      let repetitionn; 
      let previousEaseFactorn;
      let previousIntervaln; 
      let id = req.params.idA;
      console.log(id);
      Note.findById(id, (err, notes)=> {
      if (err){
        console.log(err);

      }
      else{
        console.log("Result : ", notes);

        repetitionn=notes.repetitions;
        previousEaseFactorn=notes.previousEaseFactor;
        previousIntervaln=notes.previousInterval;
      
     
      
       let quality=req.params.qualityA; // take from frontend 
       let easeFactor;
       let interval;
       console.log(quality);

       if(quality>=3)
       {
           if(repetitionn==0)
               interval=1;
           else if(repetitionn==1)
               interval=6;
           else if(repetitionn>1)
               interval=previousIntervaln * previousEaseFactorn;
           interval=Math.round(interval);
           repetitionn++;
           easeFactor=previousEaseFactorn* (0.1 - (5 - quality) * (0.08 + (5 - quality ) * 0.02))
       }
       else if(quality<3)
       {
           repetitionn=0;
           interval=1;
           easeFactor=previousEaseFactorn;
       }
       
       if(easeFactor<1.3)
           easeFactor=1.3;
       
       console.log(interval);
    
        notes.repetitions=repetitionn;
        notes.previousInterval=interval;
        notes.previousEaseFactor=easeFactor;

        notes.save();
        var date = new Date();
        
       res.send("sucess");
      
     }
  
    });
  });



module.exports = router ;