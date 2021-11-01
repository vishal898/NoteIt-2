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


router.put('/ankiUpdate/:idA/:qualityA', (req, res) => {

      let repetitionn; 
      let previousEaseFactorn;
      let previousIntervaln; 
      var id = req.params.idA;
      Note.findById(id, (err, notes)=> {
      if (err){
        console.log(err);

      }
      else{
        console.log("Result : ", notes);

        repetitionn=notes.repetitions;
        previousEaseFactorn=notes.previousEaseFactor;
        previousIntervaln=notes.previousInterval;
      }
     
      
       let quality=req.params.qualityA; // take from frontend 
       let easeFactor;
       let interval;
       

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
    
        notes.repetition=repetitionn;
        notes.previousInterval=interval;
        notes.previousEaseFactor=easeFactor;

        Note.save(err => {
        if (err) {
  
          res.send(err);
        }
        res.json({message: 'Updated '});
      });
  
    });
  });



module.exports = router ;