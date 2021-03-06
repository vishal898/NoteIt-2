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

router.get('/check',(req,res)=>{
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
           // return 1;
             return (diffDays>=note.previousInterval && note.ankiOn==true); 
            
        });
        res.json(filtered);
    });
});


router.get('/getNote/:url',(req,res)=>{
    if(req.user === undefined)  res.send(['loginERR']);
    else{
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
    }
});

// post create 
router.post('/createNote',(req,res)=>{
   
    
    const {difficulty,title,tags,body,url,ankiOn} = req.body;
    const userId = req.user._id;
    const newNote = new Note({
		userId:userId,
        url:url,
        difficulty:difficulty,
        title:title,
        createdTime:new Date(),
        tags:tags,
        body:body,
        ankiOn:ankiOn,
	});
    newNote.lastRevisedDate=newNote.createdTime;
    console.log(newNote);
    newNote.save();
    console.log(newNote._id)
    console.log(typeof(userId))
    console.log(typeof(newNote._id))
   console.log(req.body);
    User.findById(userId,(err,user)=>{
        user.notes.push(newNote._id);
        user.urls.push(url);
        let newTags=user.tags;
        console.log(newTags);
        for(let i=0;i<newNote.tags.length;i++)
        {
            newTags.push(newNote.tags[i]);
        }
        
        let a2= Array.from(new Set(newTags));
        console.log(a2);
        user.tags=a2;
        user.save()
    });
    
});

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



        User.findById(req.user._id, (err, users)=> {
            if (err){
              console.log(err);
            }
            else
            {
                console.log("...........");
                console.log(users);
                let newTags=users.tags;
                console.log(newTags);
                for(let i=0;i<tags.length;i++)
                {
                        newTags.push(tags[i]);
                }
                let a2= Array.from(new Set(newTags));
                console.log(a2);
                users.tags=a2;
                notes.save();
                users.save();
                console.log(notes);
                res.json("success");
            }
       }); 
    }
    });
});



// post delete 
router.post('/deleteNote/:noteId',(req,res)=>{
    const NID = req.params.noteId;
   // const {userId}=req.body;
    console.log(NID);
    Note.findOneAndDelete({_id:NID},(err,data)=>{
        if(err)res.send(err);
        res.send(`DELETED ${NID}`);
        data.save();
        const userId=data.userId;
        User.findById(userId, (err, user)=> {
            if (err){
                console.log(err);
              }
              else{
            user.notes.pull(NID);
            user.save();}
        })
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