const express =require('express');
const app = express();
const path=require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/auth-routes");
const cookieSession = require("cookie-session");
const MongoStore = require("connect-mongo");
const dbConnection = require('./config/dbconnect');

const Note = require('./models/note');

const User = require('./models/user');
const mongoose = require('mongoose');

const noteRoutes = require('./routes/note-routes');


dbConnection.db();


const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(express.static(path.join(buildPath, "static")));


dotenv.config({ path: './config.env' });
const PORT  = process.env.PORT || 8000;
var corsOptions={origin:'http://localhost:3000',credentials:true}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));



app.get("*", function (req, res) {
	console.log(__dirname);

	// VERY VERY IMPORTANT
	res.sendFile(path.join(buildPath, "index.html"), function (err) {
		if (err) {
			res.status(500).send(err);
		}
	});
});




// Making cookie session
app.use(
	session({
		secret: "user",
		resave: false,
		saveUninitialized: false,
		rolling: true, // <-- Set `rolling` to `true`
		cookie: {
			httpOnly: true,
			maxAge: 8 * 60 * 60 * 1000,
		},
		store: MongoStore.create({
			mongoUrl: process.env.DB,
		}),
	})
);
// initialising session from passport
app.use(passport.initialize());
app.use(passport.session());

// setting up config for google auth
require("./config/auth-config")(passport);
// Listening for google authentication
app.use(authRoutes);

// all routes 

app.use(noteRoutes);

app.use(express.static("public"));

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
    res.json(notes);
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
