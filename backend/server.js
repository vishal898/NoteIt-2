const express =require('express');
const app = express();
const cors = require('cors')
const Note = require('./models/note')
const Tag = require('./models/tag')
const User = require('./models/user')
const dotenv = require('dotenv');
const dbConnection = require("./config/dbconnect");
 const mongoose = require('mongoose');

 dbConnection.db();

dotenv.config({ path: './config.env' });

// const DB  = process.env.DB;
const PORT = process.env.PORT;

// mongoose.connect(DB).then(()=>{
//     console.log('connected to database');
// }).catch((err)=>{
//     console.log('failed to connect');
// })



app.use(express.json());

app.use(cors());

app.get('/',(req,res)=>{
    res.send('API IS RUNNING');
})

app.get('/api/users',(req,res)=>{
    console.log('kala');
    // res.json(notes);
})
app.post('/api/users',(req,res)=>{
    // console.log(req.body);
    const { username,email } = req.body;
    User.findOne({username:username,email:email})
    .then((userDB)=>{
        if(userDB){
            return res.json({error:"existed"});
        }
        const user = new User({username,email});
        user.save().then(()=>{
            res.json({message:"user registered"});
        })
    }).catch((err)=>{
        console.log('kala123');
    })
})

app.get('/api/notes',(req,res)=>{
    console.log('kala');
    // res.json(notes);
})

app.post('/api/notes',(req,res)=>{
    console.log(req.body);
    const { userId,url,difficulty,title,createdTime,visitCnt  } = req.body;
    Note.findOne({userId:userId,difficulty:difficulty,title:title,createdTime:createdTime,visitCnt:visitCnt})
    .then((noteDB)=>{
        // if(userDB){
        //     return res.json({error:"existed"});
        // }
        const note = new Note({userId,url,difficulty,title,createdTime,visitCnt});
        note.save().then(()=>{
            res.json({message:"note submitted"});
        })
    }).catch((err)=>{
        console.log('note123');
    })
})

app.listen(PORT,console.log(`SERVER STARTED AT PORT ${PORT}`));