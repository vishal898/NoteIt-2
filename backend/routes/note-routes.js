const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const { findOneAndUpdate } = require("../models/note");
const Note = require('../models/note');
const User = require('../models/user');

// demo
router.get('/',(req,res)=>{
    res.send('hello');
});


// get read id 
router.get('/getUid',async(req,res)=>{
    const uid=req.user._id;
    console.log(uid);
    // Note.find({userId:uid},(err,data)=>{
    //     if(err)throw error;
    //     res.json(data);
    //     // console.log(data);
    // });
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


router.get('/getAnkiNotes',async(req,res)=>{
    const uid=req.user._id;
    console.log(uid);
    Note.find({userId:uid},(err,data)=>{
        if(err)throw error;

        var filtered = data.filter(function(note) {

            let date1=note.lastRevisedDate;
            let date2 = new Date();
            
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            console.log(diffDays + " days");
            //return 1;
             return (diffDays>=note.previousInterval && note.ankiOn==true); 
        });
        res.json(filtered);
    });
});




// router.get('/getNoteCount',async(req,res)=>{
//     const uid=req.user._id;
//     console.log(uid);
//     Note.find({userId:uid},(err,data)=>{
//         if(err)throw error;

       

//         res.json(note.length);
//         // console.log(data);
//     });
// });









router.get('/getNote/:url',(req,res)=>{
    const userId = req.user._id;
    const {url} = req.params;
    console.log('getnote started');
    console.log(url);
    console.log(userId);
    console.log('getnote finished');
    Note.find({url:url,userId:userId},(err,data)=>{
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
router.post('/createNote',(req,res)=>{
   
    
    const {difficulty,title,body,createdTime,url,tags,ankiOn} = req.body;
    const userId = req.user._id;
    const newNote = new Note({
		userId:userId,
        url:url,
        difficulty:difficulty,
        title:title,
        createdTime:createdTime,
        tags:tags,
        body:body,
        ankiOn:ankiOn,
	});
    newNote.lastRevisedDate=newNote.createdTime;
    console.log(newNote);
    newNote.save();
    console.log(newNote._id);
});


// post update 
// router.post('/updateNote/:idA',(req,res)=>{

//     const {difficulty,title,tags,body} = req.body;
//       let id = req.params.idA;
//       console.log(id);
//     //   const {url,difficulty,title,createdTime,tags} = req.body;
//     // const userId = req.user._id;
//     // const newNote = new Note({
// 	// 	userId:userId,
//     //     url:url,
//     //     difficulty:difficulty,
//     //     title:title,
//     //     createdTime:createdTime,
//     //     tags:tags,
//     //     visitCnt:visitCnt,
// 	// });
//     // console.log(newNote);
//     // newNote.save();
     
//      Note.findOneAndUpdate(
//         { id: id },
//         { $set: { tags:tags,difficulty:difficulty,title:title,body:body } },
//         (err, data) => {
//             if(err) throw err;
//             else{
//             console.log(data);   
//          console.log('success');}
//          });
         
     
// });



router.post('/updateNote/:idA',(req,res)=>{

    const {difficulty,title,tags,ankiOn,body} = req.body;
      let id = req.params.idA;
      console.log(id);
      Note.findById(id, (err, notes)=> {
      if (err){
        console.log(err);
      }
      else{
        console.log("Result : ", notes);

        if(notes.ankiOn==false && ankiOn==true)
        {
            notes.repetitions=0;
            notes.previousEaseFactor=2.5;
            notes.previousInterval=0;
            notes.lastRevisedDate=new Date();
        }
        notes.title=title;
        notes.tags=tags;
        notes.difficulty=difficulty;
        notes.ankiOn=ankiOn;
        notes.body=body;

        
       notes.save();
        
       console.log(notes);
       res.send("success");
     }
    });
});



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


router.post('/ankiUpdate/:idA/:qualityA', (req, res) => {

      let repetitionn; 
      let previousEaseFactorn;
      let previousIntervaln; 
      let id = req.params.idA;
    //   console.log(`ankiupdate - ${id}`);
      
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
    //    console.log(`ankiupdate - ${quality}`);

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
        notes.lastRevisedDate=new Date();
        console.log(repetitionn);
        notes.save();
        var date = new Date();
        
       res.send("sucess");
      
     }
  
    });
  });



module.exports = router ;